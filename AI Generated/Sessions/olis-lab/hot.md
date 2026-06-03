---
updated: 02-06-2026
project: olis-lab
tags: [meta, hot-cache]
---

# Hot Cache — olis-lab

## Dernière mise à jour
02-06-2026 — Fix du flickering trading plan (Home/Shop) implémenté, typecheck/lint verts ; vérif runtime + commit restants. Plus tôt : picker Edits via Option A (`adminLabel`) + migration backfill, recherche lente.

## État du projet
- **Flickering trading plan** : fix codé sur 3 fichiers (`useTradingPlanQuery.ts`, `Home.tsx`, `Shop.tsx`), pas encore commité ni vérifié en runtime.
- **Picker Edits (Option A)** : champ caché `adminLabel` + hook `computeAdminLabel` + `useAsTitle=adminLabel` + migration backfill via `payload.update`. Tourne en local, picker fonctionnel mais **recherche lente** (label à réduire). Branche `feat/edits-product-picker-admin-label`, rien commité. Option B (composant custom) abandonnée mais gardée.
- Trading plan CMS -> web_client : PR mergée ; contenu CMS prod à remplir + flag PostHog `dev_payload_trading_plan` à activer.
- Feed GMC + Klaviyo : opérationnels. Feed Meta : pas implémenté. Bug S3 double XML : ouvert.
- Migration Content API v2.1 -> Merchant API avant le 18 août 2026.
- Page builder blocks : plan approuvé, prochain gros chantier.

## Faits récents importants
- Flickering = `false` surchargé dans `useFeatureFlags` (loading vs off indistinguables). Fix = 3 états via fonction pure `resolveTradingPlanReady` + fetch eager (retrait `enabled:flag`) + gate `isReady` avec `LoadingComponent`.
- `useActiveFeatureFlags()` renvoie `undefined` tant que PostHog n'a pas résolu (signal du 3e état). PostHog cache les flags en localStorage → flash seulement au 1er load.
- MongoDB : migrations = backfill data only (schemaless, manuel). Standalone = pas de transaction → skip OK ; replica set prod = transaction → un skip abort tout.
- `payload.db.updateOne` n'écrit PAS les versions ni les hooks ; avec `drafts:true` l'admin lit la version `latest` → besoin de `payload.update` (qui revalide tout le doc).
- Local API ne propage pas `locale` à `req.locale` (toujours `en`).

## Décisions actives
- Fix flickering : gate toute la page, fetch eager, `LoadingComponent` pendant l'attente, fonction pure nommée (refus du ternaire chaîné), pas de tests. Erreur CMS → `isReady=true` → fallback i18n.
- Picker Option A : `adminLabel` fixe EN, tous champs cherchables + status, `useAsTitle` changé partout. Collectibles = schéma zod partiel, identifiés par ID.
- Produits qui échouent la validation Payload → log + skip.

## Prochaines étapes
- Vérif runtime du fix flickering (fenêtre privée + throttle, flag on/off/erreur CMS sur `/` et `/shop`) puis commit (3 fichiers).
- Réduire la taille de `adminLabel` + fixer la lenteur de recherche du picker.
- Gérer les produits skippés (data invalide) pour la prod ; réconcilier `migrate:status`.
- Brancher/commiter `feat/edits-product-picker-admin-label`.
