---
updated: 26-06-2026
project: olis-lab
tags: [meta, hot-cache]
---

# Hot Cache — olis-lab

## Dernière mise à jour
26-06-2026 — Deux chantiers ce jour : (1) review IA de Diego traitée sur PR #1853 (unlock sku/ean/slug) ; (2) fix du bug navbar/announcement bar CMS toujours `null` (apps/web, branche `feat/next-read-payload-navbar`, PR #1839).

## État du projet
- **Navbar PR #1839 (`feat/next-read-payload-navbar`, apps/web)** : bug `getServerFeatureFlag` → `null` → CMS jamais fetché, **corrigé**. Root cause = `distinctId` lu dans un cookie posthog jamais posé (posthog-js en `opt_out_capturing_by_default: true` + `cookieless_mode: 'on_reject'`). Fix : éval serveur avec id constant `'server-side'`, retrait de `onlyEvaluateLocally`, `sendFeatureFlagEvents: false` ; mock rebranché sur `NODE_ENV === 'development'` via helper partagé `getLocalFlagFallback` (serveur + client). Rémy a ajouté un early-return dev (court-circuite PostHog en local). 4 fichiers touchés, tsc+eslint verts, **pas vérifié en live** (env Node cassé). Pas commité.
- **PR #1853 (`refactor/unlock-availability-ean-sku-fields`, TASK-1125, OUVERTE)** : `LockableTextField` (sku+ean), lock = `_status === 'published'`, Generate SKU masqué si `status === 'Live'`. Review IA de Diego traitée (5 findings), réponse EN à poster, pas vérifié en live.

## Faits récents importants
- posthog-node + `onlyEvaluateLocally: true` → `undefined` si définitions pas encore pollées (race cold start). Retirer l'option = self-heal via endpoint distant.
- Coupler un flag posthog au cookie de consentement = anti-pattern pour du contenu public ; éval serveur avec id constant = déterministe, idéal pour interrupteur on/off de migration.
- `NEXT_PUBLIC_FEATURE_FLAGS_SECURE_API_KEY` = personal API key **fuite dans le bundle client** (préfixe `NEXT_PUBLIC_`). À renommer server-only + coordonner Amplify.
- Deux statuts produit : `_status` (Payload draft/published, lock) vs `status` (`Live`/`Staged`/`Offline`, blocage regen SKU). Repo = `olis-lab/web-app`, reviews IA de Diego en issue comments.

## Décisions actives
- Navbar : Option 1 (découpler CMS du flag par-cookie, éval id constant). Mock = fallback dev only ; prod sans clé → `null`/defer legacy (plus de mock `true` en prod).
- SKU non régénérable si `status === 'Live'` (Generate masqué) ; pas de migration des SKU accentués.
- Garder `LockableTextField` (fork du `SlugField` `@experimental`, visibilité via commentaire d'en-tête).

## Prochaines étapes
- Navbar #1839 : vérifier en live (Node 20), commit + push (`posthog-server.ts`, `feature-flags.ts`, `useFeatureFlags.ts`, `SiteHeader.tsx`), poster commentaire EN sur la PR, renommer la clé API exposée (avec Amplify).
- PR #1853 : poster réponse EN à Diego, vérif visuelle admin, commit + push, trancher gel total SKU si Live.
- En attente : slug #1850 (fix CI + rebuild conteneur), top banner, bulk-add, TASK-1115 SKU (meeting), RFC RBAC, checkout/footer.
