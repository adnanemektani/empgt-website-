import { NextResponse } from "next/server";
import { z } from "zod";
import { createContactSubmission } from "@/lib/sanity-write";
import { fetchSanityContact } from "@/lib/sanity";
import { resolveRecipient, sendContactMail } from "@/lib/mail";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SUBJECTS = [
  "btp",
  "materiel",
  "logistique",
  "partenariat",
  "autre",
] as const;

const LOCALES = ["fr", "en", "ar", "zh", "pt"] as const;

const ContactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.email().max(200),
  company: z.string().trim().max(160).optional(),
  subject: z.enum(SUBJECTS),
  message: z.string().trim().min(10).max(4000),
  locale: z.enum(LOCALES).optional(),
  // Pot de miel : invisible pour l'utilisateur, rempli par les robots.
  // Validé comme une chaîne normale, puis filtré manuellement plus bas.
  website: z.string().max(200).optional(),
});

/**
 * Limiteur de débit « best effort » en mémoire (5 envois / 10 min / IP).
 * Suffisant pour un site vitrine ; à remplacer par un vrai store
 * (Upstash, Vercel KV…) si le volume de spam augmente.
 */
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_LIMIT_MAX;
}

function getIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = ContactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "invalid_payload",
        fields: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const data = parsed.data;

  // Pot de miel rempli → on répond 200 sans rien écrire (anti-spam).
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  if (isRateLimited(getIp(request))) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  try {
    const doc = await createContactSubmission({
      name: data.name,
      email: data.email,
      company: data.company,
      subject: data.subject,
      message: data.message,
      locale: data.locale,
    });

    // Notification e-mail : « au mieux ». Un échec d'envoi ne doit pas
    // faire perdre la demande (elle est déjà enregistrée dans Sanity).
    // Le document Sanity `contact` n'est relu que si aucune adresse
    // n'est définie dans l'environnement (CONTACT_TO_EMAIL).
    let sanityContactEmail: string | null = null;
    if (!process.env.CONTACT_TO_EMAIL) {
      sanityContactEmail = (await fetchSanityContact())?.email ?? null;
    }
    const to = resolveRecipient(sanityContactEmail);
    const emailed = await sendContactMail(
      {
        name: data.name,
        email: data.email,
        company: data.company,
        subject: data.subject,
        message: data.message,
        locale: data.locale,
      },
      to
    );

    return NextResponse.json(
      { ok: true, id: doc._id, emailed, to },
      { status: 201 }
    );
  } catch (error) {
    console.error("[contact] échec d'écriture Sanity :", error);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

export function GET() {
  return NextResponse.json({ error: "method_not_allowed" }, { status: 405 });
}
