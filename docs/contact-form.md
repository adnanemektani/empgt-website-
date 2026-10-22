# Formulaire de contact — E-MPGT

Le formulaire de la page `/contact` enregistre chaque demande **dans Sanity** et
**envoie un e-mail** de notification. Tally a été retiré.

## Chaîne complète

```
Navigateur  →  POST /api/contact  →  Zod (validation)      → 400 si invalide
                                            ↓
                                   Sanity  (contactSubmission)   ← toujours en premier
                                            ↓
                                   SMTP   (notification e-mail)   ← « au mieux », n'échoue jamais
```

Si l'e-mail échoue, la demande **reste enregistrée** dans Sanity et le
formulaire n'affiche pas d'erreur.

## Fichiers

| Fichier | Rôle |
|---|---|
| `app/[locale]/contact/contact-form.tsx` | Formulaire (react-hook-form + zod) |
| `app/api/contact/route.ts` | Endpoint POST : validation, écriture, e-mail |
| `lib/sanity-write.ts` | Client Sanity **write-only** (serveur) |
| `lib/sanity.ts` → `fetchSanityContact()` | Lit le document unique `contact` |
| `lib/mail.ts` | Envoi e-mail (SMTP) + génération du sujet traduit |
| `studio/schemaTypes/contactSubmission.ts` | Type Sanity des demandes reçues |
| `studio/scripts/seed-contact.mjs` | Crée le document `contact` |
| `studio/scripts/list-submissions.mjs` | Liste (et purge) les demandes |
| `tools/dev-mailbox.mjs` | Boîte mail de développement (SMTP + inbox web) |

## Configuration

`.env.local` (racine) — voir `.env.example`.

| Variable | Rôle |
|---|---|
| `SANITY_API_TOKEN` | Token Sanity **d'écriture** (serveur uniquement) |
| `CONTACT_TO_EMAIL` | Destinataire. Si vide → document Sanity `contact` |
| `MAIL_TRANSPORT` | `smtp` (envoi réel) ou `log` (console uniquement) |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_SECURE` | Relais SMTP |
| `SMTP_USER` / `SMTP_PASSWORD` | Identifiants SMTP |
| `MAIL_FROM` | Expéditeur |

> ⚠️ `SANITY_API_TOKEN` n'est **jamais** exposé au navigateur (pas de
> préfixe `NEXT_PUBLIC_`). Le module `lib/sanity-write.ts` lève une erreur
> s'il est importé depuis un composant client.

## Tester en local sans SMTP

```bash
npm run dev:mail     # SMTP sur 1025 + inbox web sur http://localhost:8025
npm run dev          # le site
```

Puis dans `.env.local` :

```
MAIL_TRANSPORT=smtp
SMTP_HOST=localhost
SMTP_PORT=1025
SMTP_SECURE=false
```

Les e-mails arrivent dans l'inbox web (ils ne partent pas vers Gmail).

## Déployer

1. `node studio/scripts/seed-contact.mjs` avec `SANITY_TOKEN` → crée le
   document `contact` (email, téléphone, WhatsApp, Calendly, adresse, réseaux).
2. `cd studio && npm run deploy` → publie le type `contactSubmission` dans le
   Studio (les demandes apparaissent dans l'onglet « Demandes de contact »).
3. Sur l'hébergeur (Vercel) : définir `SANITY_API_TOKEN`, `CONTACT_TO_EMAIL`
   et les variables SMTP.

## Correspondance des sujets

Les clés `btp`, `materiel`, `logistique`, `partenariat`, `autre` correspondent
à `Contact.subjects.*` dans `messages/{locale}.json`. Le libellé traduit est
récupéré côté serveur pour l'objet de l'e-mail.
