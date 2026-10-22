import nodemailer, { type Transporter } from "nodemailer";

/**
 * Envoi d'e-mails (serveur uniquement).
 *
 * Transports :
 *  - `resend` : envoi réel via l'API Resend (https://api.resend.com) ;
 *  - `smtp`   : envoi réel via un relais SMTP ;
 *  - `log`    : journalise le destinataire et l'objet sans envoyer (dev).
 *
 * Un échec d'envoi ne doit JAMAIS faire échouer la demande de contact :
 * la demande reste enregistrée dans Sanity, l'e-mail est « au mieux ».
 */

export type ContactMailPayload = {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
  locale?: string;
};

const DEFAULT_TO = "contact@e-mpgt.com";
const DEFAULT_FROM = "E-MPGT <contact@e-mpgt.com>";

/** Libellé lisible du sujet, repris des fichiers de traduction. */
async function getSubjectLabel(subjectKey: string, locale?: string): Promise<string> {
  const lang = locale && ["fr", "en", "ar", "zh", "pt"].includes(locale) ? locale : "fr";
  try {
    const messages = (await import(`../messages/${lang}.json`)).default as {
      Contact: { subjects: Record<string, string> };
    };
    return messages.Contact.subjects[subjectKey] ?? subjectKey;
  } catch {
    return subjectKey;
  }
}

let transporter: Transporter | undefined;

/** Échappe le HTML : le contenu du formulaire est saisi par l'utilisateur. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getTransport() {
  if (transporter) return transporter;
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "localhost",
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD }
      : undefined,
  });
  return transporter;
}

/** Adresse de destination : variable d'env > document Sanity `contact` > défaut. */
export function resolveRecipient(sanityContactEmail?: string | null): string {
  return (
    process.env.CONTACT_TO_EMAIL || sanityContactEmail || DEFAULT_TO
  ).trim();
}

function buildText(
  payload: ContactMailPayload,
  to: string,
  subjectLabel: string
): string {
  return [
    `Nouvelle demande de contact E-MPGT`,
    ``,
    `Nom      : ${payload.name}`,
    `E-mail   : ${payload.email}`,
    `Société  : ${payload.company || "—"}`,
    `Sujet    : ${subjectLabel}`,
    `Langue   : ${payload.locale || "—"}`,
    ``,
    `Message :`,
    payload.message,
    ``,
    `Envoyée automatiquement depuis le formulaire du site (destinataire : ${to}).`,
  ].join("\n");
}

function buildHtml(
  payload: ContactMailPayload,
  to: string,
  subjectLabel: string
): string {
  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:8px 16px 8px 0;color:#5a6678;font-size:13px;white-space:nowrap;vertical-align:top">${label}</td>
      <td style="padding:8px 0;color:#13223d;font-size:14px;font-weight:600">${escapeHtml(value)}</td>
    </tr>`;

  return `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><title>Nouvelle demande E-MPGT</title></head>
<body style="margin:0;padding:32px;background:#f5f7fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#13223d">
  <div style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #e1e6ee;border-radius:16px;overflow:hidden">
    <div style="background:#2a3579;padding:24px 32px">
      <p style="margin:0;color:#68b245;font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase">Nouvelle demande</p>
      <h1 style="margin:6px 0 0;color:#fff;font-size:20px;font-weight:700">E-MPGT — formulaire de contact</h1>
    </div>
    <table style="width:100%;border-collapse:collapse;padding:16px 32px">
      ${row("Nom", payload.name)}
      ${row("E-mail", payload.email)}
      ${row("Société", payload.company || "—")}
      ${row("Sujet", subjectLabel)}
      ${row("Langue", payload.locale || "—")}
    </table>
    <div style="padding:8px 32px 28px">
      <p style="margin:0 0 8px;color:#5a6678;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase">Message</p>
      <p style="margin:0;padding:16px;background:#f5f7fa;border-radius:12px;font-size:14px;line-height:1.7;white-space:pre-wrap">${escapeHtml(payload.message)}</p>
    </div>
    <div style="padding:16px 32px 28px;border-top:1px solid #e1e6ee">
      <p style="margin:0;color:#5a6678;font-size:12px">Envoyé automatiquement depuis le formulaire du site (destinataire : ${to}).</p>
    </div>
  </div>
</body></html>`;
}

/**
 * Envoie la notification e-mail d'une demande de contact.
 * Retourne `true` si l'e-mail a bien été remis au relais SMTP, `false` sinon
 * (l'appelant ne doit pas échouer dans ce cas).
 */
export async function sendContactMail(
  payload: ContactMailPayload,
  to: string
): Promise<boolean> {
  const transport = process.env.MAIL_TRANSPORT || "smtp";
  const from = process.env.MAIL_FROM || DEFAULT_FROM;
  const subjectLabel = await getSubjectLabel(
    payload.subject,
    payload.locale
  );
  const subject = `[E-MPGT] ${subjectLabel} — ${payload.name}${
    payload.company ? ` (${payload.company})` : ""
  }`;

  if (transport === "log") {
    console.log(
      `[mail:log] à ${to} — ${subject}\n${buildText(payload, to, subjectLabel)}`
    );
    return true;
  }

  if (transport === "resend") {
    return sendViaResend({
      from,
      to,
      subject,
      text: buildText(payload, to, subjectLabel),
      html: buildHtml(payload, to, subjectLabel),
      replyTo: payload.email,
    });
  }

  try {
    await getTransport().sendMail({
      from,
      to,
      subject,
      text: buildText(payload, to, subjectLabel),
      html: buildHtml(payload, to, subjectLabel),
    });
    console.log(`[mail] envoyé à ${to} — ${subject}`);
    return true;
  } catch (error) {
    console.error(
      `[mail] échec d'envoi vers ${to} :`,
      error instanceof Error ? error.message : error
    );
    return false;
  }
}

/* ───────────────────────────── Resend ───────────────────────────── */

type ResendMessage = {
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
};

/** Envoi via l'API HTTP Resend (aucune dépendance supplémentaire). */
async function sendViaResend(message: ResendMessage): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[mail] RESEND_API_KEY manquant — envoi impossible.");
    return false;
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: message.from,
        to: [message.to],
        subject: message.subject,
        text: message.text,
        html: message.html,
        ...(message.replyTo ? { reply_to: message.replyTo } : {}),
      }),
    });

    const body = (await response.json().catch(() => ({}))) as {
      id?: string;
      message?: string;
      name?: string;
    };

    if (!response.ok) {
      console.error(
        `[mail] Resend a refusé l'envoi (${response.status}) :`,
        body.message || body.name || "erreur inconnue"
      );
      return false;
    }

    console.log(
      `[mail] Resend OK → ${message.to} (id ${body.id}) — ${message.subject}`
    );
    return true;
  } catch (error) {
    console.error(
      "[mail] échec de l'appel Resend :",
      error instanceof Error ? error.message : error
    );
    return false;
  }
}
