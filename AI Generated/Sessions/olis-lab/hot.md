---
updated: 02-07-2026
project: olis-lab
tags: [hot-cache]
---

# Hot Cache — olis-lab

## Dernière mise à jour
02-07-2026 — Localisation du champ `name` de `ProductActives` (en/fr) + migration d'auto-traduction EN→FR via resolver OpenAI. PR #1870 ouverte, migration **pas encore exécutée**.

## État du projet
- **ProductActives.name localisé, PR #1870 ouverte** (`refactor/cms-add-localized-name-products-actives` → develop). 3 fichiers : `ProductActives.ts` (`localized: true`), migration `20260702_110143_localize_product_active_name.ts`, `migrations/index.ts`. Typecheck + eslint verts, `payload-types.ts` inchangé.
- Migration = lecture brute Mongo natif → normalisation EN → traduction batch EN→FR (resolver `openai`) → écriture FR. Fallback copie EN si échec OpenAI ; try/catch par doc pour collisions d'unicité ; logs mapping `[fr] "EN" -> "FR"` par doc + compteurs.
- **Pas exécutée** : aucune écriture DB ni appel OpenAI faits par Claude.

## Faits récents importants
- Après flip `localized: true`, l'ancien scalaire est **orphelin, illisible via l'API dans TOUTES les locales (en compris)** → migration obligatoire, lecture brute `payload.db.collections['product-actives'].collection.find().toArray()`.
- `translateOperation` inutilisable (lit la source depuis la base orpheline) → appel `resolver.resolve({localeFrom, localeTo, req:{payload}, texts})` direct, batché. Resolvers dans `payload.config.custom.translator.resolvers`, key `'openai'`.
- Fallback `true` + defaultLocale `en` : read `fr` vide → sert `en` (aussi sur relations `depth>0`). Déclencheur = null/absent, pas `""`. `fallbackLocale:'none'` désactive ; `locale:'all'` → `{en,fr}` brut.

## Décisions actives
- Auto-traduction OpenAI (choix Rémy) malgré risque INCI ; FR à corriger dans l'admin ensuite.
- `down` = no-op documenté (champ `required` → vider FR échoue) ; vrai rollback = retirer `localized:true`.
- Unicité par locale ; collision FR = warn + skip, jamais d'abort.

## Prochaines étapes
- **Exécuter la migration sur `cms_local` localhost** (`migrate:status` → `migrate`, `OPENAI_API_KEY` chargée), lire le mapping, vérifier admin EN/FR, traiter les `skipped`, corriger les trads douteuses. Puis review + merge #1870.
- Curated PLP : backfiller `cartProduct` (prérequis PLP) + trancher drop-post-pagination + review/merge PR curated.
- Cart #1859 (9/9 int verts) → CI + review Diego + merge, puis guard `beforeValidate` legacyId (bruit Sentry/CI).
- Navbar #1839 (fix posthog server flag) : vérif live Node 20 + commit/push + renommer clé API exposée. PR #1853 SKU/EAN : réponse Diego + vérif admin + commit. Plan globals `apps/cms` (Task 2→1→4→3).
