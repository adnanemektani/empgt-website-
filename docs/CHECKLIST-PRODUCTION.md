# ✅ CHECKLIST PRODUCTION — E-MPGT

À passer au vert avant la mise en ligne. Chaque ligne est actionnable seule.

---

## 1. SANITY — passer au plan **Growth** (15 $/siège/mois)

### Pourquoi c'est nécessaire

| Besoin | Free | **Growth** |
|---|---|---|
| **Traduction automatique dans le Studio** (AI Assist) | ❌ | ✅ |
| **Plusieurs Functions** | 5 (fréquence *daily*) | **10 (fréquence *hourly*)** |
| Rôles **Editor / Developer / Contributor** | ❌ (2 rôles) | ✅ (5 rôles) |
| **Commentaires + Tasks** (pour la review A→Z) | ❌ | ✅ |
| **Scheduled drafts** (planifier une publication) | ❌ | ✅ |
| **Dataset privé** (ex. `staging`) | ❌ (public only) | ✅ |
| Journal d'activité | 3 jours | **90 jours** |
| Documents / requêtes / stockage | 10k / 250k / 100 Go | 25k / 250k / 100 Go |

> ⚠️ **Ton plan actuel = Free.** Tu as 2 membres (donc pas de rôle Editor
> possible : impossible d'inviter un responsable marketing avec des droits
> limités, ni de laisser des commentaires sur le contenu).

### Ce que ça débloque concrètement

1. **Traduction automatique** : dans le Studio, sur n'importe quel champ
   `localeString` / `localeText` → bouton IA → « Traduire en EN / AR / ZH / PT ».
   Zéro saisie manuelle.
2. **Commentaires** : Emmanuel peut annoter un contenu directement dans le
   Studio pendant la review.
3. **Dataset `staging`** : tester les modifs de contenu sans toucher la prod.

### Comment faire

1. sanity.io/manage → projet **E-MPGT** → **Plan / Billing** → **Upgrade to Growth**
2. Choisir le nombre de sièges (1 = Emmanuel, 2 = + un éditeur)
3. **Ajouter un siège** : Sanity → **Members** → inviter `adnanemektani02@gmail.com`
   (ou l'email de l'éditeur) avec le rôle **Editor**
4. Activer l'AI : Studio → un champ `localeString` → icône IA → vérifier que
   « Translate » apparaît

> 💡 L'AI Assist consomme les **AI Credits** (1 000/mois inclus dans les deux
> plans, 0,05 $/crédit supplémentaire au-delà).

---

## 2. RESEND — vérifier le domaine `e-mpgt.com`

### Pourquoi

La clé API actuelle est limitée : elle n'autorise l'envoi que via
`onboarding@resend.dev`, et **uniquement vers l'email du compte**
(adnanemektani02@gmail.com). Dès que le domaine est vérifié, on peut envoyer
vers n'importe qui, avec l'expéditeur `@e-mpgt.com`.

### Comment faire

1. resend.com → **Domains** → **Add Domain** → `e-mpgt.com`
2. Resend affiche 2 à 3 enregistrements DNS (SPF + DKIM, parfois DMARC)
3. Les ajouter chez ton registrar DNS (OVH / hoster / Cloudflare / Gandi ?)
   → **dis-moi lequel, ou envoie-moi une capture de l'écran Resend, et je te
   dis exactement quoi coller où**
4. Attendre la vérification (quelques min → quelques heures)
5. Une fois ✅ :
   ```env
   MAIL_FROM=E-MPGT <contact@e-mpgt.com>
   CONTACT_TO_EMAIL=contact@e-mpgt.com
   ```
6. Re-tester le formulaire → l'email doit arriver dans la boîte
   `contact@e-mpgt.com`

### Test à faire maintenant (déjà fait ✅)

| Test | Résultat |
|---|---|
| `onboarding@resend.dev` → `adnanemektani02@gmail.com` | ✅ 200, email reçu |
| `contact@e-mpgt.com` | ❌ 403, domaine non vérifié |
| Formulaire complet (site → Sanity → Resend) | ✅ 201, `emailed: true` |

---

## 3. DÉPLOIEMENT DU SITE

### Variables sur l'hébergeur (Vercel recommandé)

| Variable | Valeur |
|---|---|
| `SANITY_API_TOKEN` | token Sanity **d'écriture** |
| `MAIL_TRANSPORT` | `resend` |
| `RESEND_API_KEY` | `re_…` |
| `MAIL_FROM` | `E-MPGT <contact@e-mpgt.com>` (après vérif. domaine) |
| `CONTACT_TO_EMAIL` | `contact@e-mpgt.com` (après vérif. domaine) |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `wwzbgktd` |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |

- **Build** : `npm run build` · **Output** : `.next` (runtime Node)
- ⚠️ Ne **jamais** mettre le token dans une variable `NEXT_PUBLIC_*`

---

## 4. REVIEW A→Z (Emmanuel)

### Parcours à tester — 5 langues × 3 formats

Pour **chaque** langue (`/fr`, `/en`, `/ar`, `/zh`, `/pt`) :

| # | Page / action | Ce qu'il faut vérifier |
|---|---|---|
| 1 | **Accueil** | Hero (carrousel 3 images), Intro, Expertises, Écosystème (3 cartes + boutons), Partenaires (5 logos + liens), Missions (scroll), Actualités, CTA final |
| 2 | **Nav** | Menu déroulant « Accueil » (6 sous-liens), les 4 liens, le sélecteur de langue, bouton Calendly |
| 3 | **/expertises** | 4 blocs + CTA |
| 4 | **/nos-missions** | Barre de recherche + 7 filtres + galeries + lightbox (clavier : ←/→/Échap) |
| 5 | **/technologies** | Liste des 6 technologies |
| 6 | **/profils** | 2 catégories + CTA |
| 7 | **/irve** | 4 items |
| 8 | **/a-propos** | Hero + contenu + les 5 implantations |
| 9 | **/contact** | Les 3 cartes d'infos, **envoi réel du formulaire**, écran de succès |
| 10 | **/cgu** et **/cgu-partenaires** | Texte, **date de mise à jour** (actuellement 31/01/2026 → à corriger) |
| 11 | **Footer** | 11 liens, 3 boutons sociaux, 3 liens plateformes, CGU |

### Formats à tester

| Format | Test |
|---|---|
| **Mobile** (375 px) | Menu burger, carrousel missions, formulaire (clavier !) |
| **Tablette** (768 px) | Grilles 2 colonnes, galeries 3 colonnes |
| **Desktop** (1440 px) | Grilles 4 colonnes, lightbox, effet 3D du hero |
| **Arabe (RTL)** | Tout le site inversé, icônes, formulaires |

### Points techniques à valider

- [ ] Le **formulaire** part bien et l'email arrive
- [ ] Le **Sélecteur de langue** bascule bien (URL + contenu + direction RTL)
- [ ] Les **3 liens plateformes** (`.example`) → **morts** → à remplacer ou désactiver
- [ ] Les **photos de stock Unsplash** du hero → à remplacer par de vraies photos E-MPGT
- [ ] Les **boutons Calendly / LinkedIn / Affiliation** pointent où tu veux
- [ ] Les **5 liens partenaires** (institutia.ai, there.do, bazalt.one, ELTO, 13 MAI) → le dernier n'a pas de lien

---

## 5. CORRECTIFS TECHNIQUES RESTANTS

### 🟠 Bloquants (30 min)

| # | Problème | Correctif |
|---|---|---|
| 1 | `npm run lint` → **exit 1** (bundles de `studio/dist` lintés) | `eslint.config.mjs` : ajouter `"studio/dist/**"` (1 ligne) |
| 2 | 3 URL plateformes en `.example` (CTA cliquables → dead links) | remplacer par les vraies URLs ou désactiver le CTA |
| 3 | `next.config.ts` : `images.qualities` manquant → 3 heroes en `quality={100}`降级 à 75 + warning runtime | ajouter `images: { qualities: [75, 100] }` |
| 4 | `studio/scripts/migrate-data.mjs` : **ordre des slugs ≠ `lib/mission-slugs.ts`** → relancer la migration corrompt 4 noms de sections sur 7 | réaligner le script sur `MISSION_SLUGS` |
| 5 | `public/images/missions/renovation-bureaux/COTENTIN EIFFAGE.jpg_` (1,9 Mo, extension `.jpg_`) → projet **invisible** sur le site | renommer en `.jpg` + ré-uploader dans Sanity |
| 6 | `News.tsx` : `<Image>` avec une URL venue du Sheet / `externalImage` → **crash runtime** si le host n'est pas dans `remotePatterns` | whitelist ou fallback `<img>` |

### 🟡 Qualité (1-2 h)

| # | Problème |
|---|---|
| 7 | `MissionGallery.tsx` : aria-labels **en dur en français** (« Fermer », « Précédent », « Suivant ») → pas i18n |
| 8 | `LocaleSwitcher` : noms de langues en dur + pas d'`aria-label` (les clés `Locale.*` existent et sont inutilisées) |
| 9 | `#68b245` en dur dans `CTA.tsx` + `contact-section.tsx` → changer `--accent` ne propage pas |
| 10 | `useCdn: false` + fetch **côté client** → chaque visiteur tape l'API Sanity, aucun cache |
| 11 | `lib/missions.ts` : `readdirSync` à chaque requête (14 listings/page) → `unstable_cache` |
| 12 | L'Excel `missions_e-mpgt.xlsx` n'est pas exploité : il contient **Année / Localisation / Client / Type de mission** pour 23 projets, et **2 projets n'ont aucune photo** (*Rénovation Bâtiment CHOPIN* — Colombes 2024, *Kiosques Parc Eurodisney* — 2024-25) |

### 🟢 Nettoyage (optionnel)

- Code mort : `components/layout/Logo.tsx`, `YouTubeIcon`, type `Platform`, 5 classes CSS
- Assets morts : `next.svg`, `vercel.svg`, `file.svg`, `globe.svg`, `window.svg`, `public/hero/*.png`
- Deps inutilisées : `class-variance-authority`, `clsx`, `tailwind-merge`, `tailwindcss-animate`
- Clés i18n mortes : bloc formulaire `Contact.*`, `News.readMore`, `News.placeholder`, `Intro.stepNote`
- `README.md` = boilerplate create-next-app
- Pas de `.env.example` dans le repo racine → **fait** (`.env.example` ajouté)

---

## 6. GO / NO-GO

Le site est **prêt pour la production** quand :

- [ ] Plan Sanity **Growth** actif + siège Editor pour Emmanuel
- [ ] Domaine `e-mpgt.com` vérifié dans Resend + `MAIL_FROM` / `CONTACT_TO_EMAIL` basculés
- [ ] Site déployé avec les 7 variables d'environnement
- [ ] Formulaire testé **en production** (email reçu dans `contact@e-mpgt.com`)
- [ ] Review A→Z faite sur les 5 langues × 3 formats
- [ ] Les 6 correctifs 🟠 traités
- [ ] `npm run build` + `npm run lint` verts

---

## 7. RÉCAP DE CE QUI EST DÉJÀ FAIT ✅

| Domaine | État |
|---|---|
| Site | 9 pages × 5 langues = 45 pages statiques, build vert, typecheck vert |
| i18n | FR/EN/AR/ZH/PT, **225 clés**, parité vérifiée, RTL arabe |
| Sanity | Studio déployé (`empgt.sanity.studio`), schéma `contactSubmission`, document `contact`, 73 photos, 3 actualités |
| Formulaire | Natif (Tally retiré) → Zod → Sanity → e-mail (Resend/SMTP), anti-spam, rate-limit |
| E-mail | **Testé en réel** : 201 + email reçu dans Gmail |
| Git | `e0214ef` — 21 fichiers, arbre propre, zéro secret commité |
| Livraison | `LIVRAISON/` (site + studio + 3 ZIP + README) |
