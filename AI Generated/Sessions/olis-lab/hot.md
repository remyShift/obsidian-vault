---
updated: 22-06-2026
project: olis-lab
tags: [meta, hot-cache]
---

# Hot Cache — olis-lab

## Dernière mise à jour
22-06-2026 — read navbar CMS dans `apps/web` (Next) + infra PostHog server-side réutilisable (éval locale, gate serveur navbar + announcement bar), tout commité sur `feat/next-read-payload-navbar`.

## État du projet
- **`feat/next-read-payload-navbar`** (branche du jour, commitée) : read navbar CMS dans Next gaté par `dev_payload_navbar` (fetch server-side `getNavbar` dans `lib/api/cms.ts` + gate). Infra serveur `apps/web/lib/posthog-server.ts` (`getServerFeatureFlag`, posthog-node éval locale, `distinct_id` du cookie `ph_*`, `null` = défère au client). Même gate serveur sur l'announcement bar. Module partagé `apps/web/lib/feature-flags.ts` (`TFeatureFlag` + `LOCAL_DEV_MOCKS`) client+serveur. Commits : `df469abf9`, `975c1a550`, `a6b84e945`, `d73d28c2e`. Working tree actuellement sur `feat/cms-test-cart-hook` → checkout la branche navbar pour voir les fichiers.
- **`feat/cms-test-cart-hook`** : tests d'intégration `computeCartSnapshot` réparés (19/19 verts), fix factory bilingue + `legacyId` ; statut commit à reconfirmer.
- Reste en attente : Footer global (plan validé, pas codé), `fix/payload-slugs-generation` (slugify + migration + 27 redirects).

## Faits récents importants
- posthog-node pinné **`^4.18.0`** : la v5 exige Node `>=20.20`, repo pinné **20.19.5** → pnpm refuse Node 21, forcer le node mise (`~/.local/share/mise/installs/node/20.19.5/bin`) en tête de PATH pour install/typecheck/lint.
- Clé requise pour l'éval locale = **feature flags secure API key (`phs_`)**, project-specific, dans PostHog → Project Settings → onglet Feature Flags. Pas la personal key account-wide (`phx_`). Va dans l'env serveur **`NEXT_POSTHOG_PERSONAL_API_KEY`** (renommée commit `d73d28c2e`, reste server-only). Host serveur EU = `https://eu.i.posthog.com`.
- Config PostHog client : `cookieless_mode: 'on_reject'` + opt-out par défaut + consentement `olislab_consent` → cookie `ph_*` (donc `distinct_id`) seulement pour les consentis → éval serveur ne couvre que ce segment, le reste défère au client (`null`).
- Champ `app` des nav items apps/web : `'legacy'` (`<a>` full-page, CloudFront route) choisi pour les paths CMS internes ; `'next'` = `<Link>`.
- Doc PostHog confirme notre pattern : singleton `lib/posthog-server`, `distinct_id` du cookie, ne jamais inventer d'UUID, defer si absent.

## Décisions actives
- Architecture : fetch server-side + gate client (idiomatique apps/web, mirror `getAnnouncementBar`). Labels top-level CMS quand flag ON. Pas de tests sur ce port.
- Gate **strict `=== true`** (edit Rémy) : fetch seulement si serveur confirme ON ; mock local serveur compense la DX dev.
- NE JAMAIS committer/pusher sans demande explicite. Jamais de `Co-Authored-By: Claude`.

## Prochaines étapes
- Créer la secure key `phs_` côté PostHog + l'ajouter en env Amplify stage/prod (`NEXT_POSTHOG_PERSONAL_API_KEY`, + `POSTHOG_API_HOST` si proxy).
- Trancher `sendFeatureFlagEvents` (commenté → défaut `true`, events sans flush peu fiables en serverless).
- `build` complet + vérif live (CMS `:4000`, navbar publié, cookie consenti).
- Pousser `feat/next-read-payload-navbar` + PR quand Rémy le décide.
