---
updated: 04-06-2026
project: olis-lab
tags: [meta, hot-cache]
---

# Hot Cache — olis-lab

## Dernière mise à jour
04-06-2026 — Flag `dev_payload_trading_plan` supprimé (trading plan 100% Payload), SCSS/assets/i18n nettoyés, puis migration du view-model Zod vers l'asserter partagé `assertTradingPlan`. Rien commité.

## État du projet
- **Trading plan** : flag retiré (useFeatureFlags, query, Home/Shop). Flow `isLoading→LoadingComponent`, `isError||!data→ErrorPage`, sinon data Payload. Plus aucun fallback en dur (code, SCSS `var(--bg-img)` sans fallback, assets `home-*.png`/`popular-category-*.png` supprimés, clés i18n orphelines retirées 4 locales). View-model Zod `tradingPlanSchema.ts` **supprimé** → `assertTradingPlan` (`packages/shared/src/payload/guardTradingPlan.ts`, forme résolue imbriquée, TDD 8/8). 9 composants lisent `image.url`/`brand.slug`. Branche `refactor/remove-old-tradingplan-integration`, non commité.
- **Announce bar** : global créé, PR ouverte. Câblage front (2 TopBanner) = tickets de suivi.
- **Navbar (global Payload)** : plan Hybride validé, PAS implémenté.
- **Picker Edits** : `adminLabel` raccourci, migration à rejouer, branche non commitée.
- Migration Content API v2.1 → Merchant API avant le 18 août 2026. Page builder blocks : prochain gros chantier.

## Faits récents importants
- **web_client + cms consomment le `dist` de `packages/shared`** → rebuild obligatoire après modif (`pnpm --filter @olis-lab/shared build`).
- **Node 20.19.x obligatoire** (engines) → `nvm use 20` avant toute commande pnpm, sinon `ERR_PNPM_UNSUPPORTED_ENGINE`.
- Pattern asserter repo : `createAsserter(entity)` → `.populated/.required/.media` ; `assertMedia` garantit `url`. Un asserter par entité, type `ReturnType<typeof assert...>`, appelé dans le fetch.
- CSS custom properties : `as React.CSSProperties` requis (un seul cast) ; sans cast → TS2559 via framer-motion (MotionStyle weak type).
- `ctx_read` peut servir du cache périmé → `fresh=true` si incohérence avec `ctx_search`.
- Convention Rémy : props nommées explicites, jamais de spread JSX.

## Décisions actives
- Trading plan : erreur CMS → `ErrorPage` (data censée toujours bonne), zéro fallback. Asserter renvoie la forme **résolue imbriquée** (pas d'aplatissement UI dans `shared`).
- Announce bar : segments structurés, pas de Zod partagé. Navbar : top-level figé, liens explicites + `app`.

## Prochaines étapes
- **Bloquant** : remplir le global `trading-plan` prod (EN+FR) avant merge.
- Vérif runtime `/` et `/shop` (loading, erreur image non peuplée → ErrorPage) + backgrounds desktop/mobile ; commit.
- Archiver flag `dev_payload_trading_plan` (PostHog).
- Traiter les 15 échecs pré-existants `guardProduct.test.ts` (spawn task posée).
- Implémenter le global navbar ; confirmer « fin scan produits » avec Michele.
- Picker : rejouer migration + commiter.
