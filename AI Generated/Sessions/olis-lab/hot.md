---
updated: 29-05-2026
project: olis-lab
tags: [meta, hot-cache]
---

# Hot Cache — olis-lab

## Derniere mise a jour
29-05-2026 — Integration trading plan CMS -> web_client (CRA) terminee et PR mergee : SDK Payload, hook React Query + schema Zod, prop-ification des composants Home/Shop, image CMS cablee, feature flag PostHog.

## Etat du projet
- Feed GMC : operationnel
- Feed Klaviyo : operationnel
- Feed Meta : pas encore implemente
- Bug S3 double declaration XML : toujours ouvert (bloquant avant automatisation)
- Migration Content API v2.1 -> Merchant API avant le 18 aout 2026
- Guards Payload : PR `feat/payload-type-inference-issue` fixee, 60/60 tests
- Trading plan CMS -> web_client : **PR mergee** ; contenu CMS prod a remplir + flag a activer
- Page builder blocks : plan approuve, prochain gros chantier

## Faits recents importants
- `@payloadcms/sdk` marche dans le CRA (fetch, pas de dep Node) ; `payload` non
- Feature flag CRA = PostHog via `useFeatureFlags` (`dev_payload_trading_plan`), pas env var
- Types props trading plan derives du schema Zod `TTradingPlanViewData` (THeroBanner, TTiles, TBrandOfMonth, TPopularCategories)
- `tradingPlanSchema.ts` = temporaire, potentiellement remplace par l'asserter
- Image CMS cablee via CSS var `var(--bg-img, url('fallback'))` + set inline conditionnel
- Gating flag a la source par ternaire (`flag ? data?.x : undefined`) — jamais `flag && x ?? fallback` (precedence casse les types)
- `typeof image === 'string'` cote Payload = ID non peuple -> retourner `''`
- Payload retourne les groupes non remplis comme `{}` (pas `null`)
- Le `dist/` de `packages/shared` peut devenir stale — rebuilder apres changement de schema

## Decisions actives
- Trading plan : composants dumb (props), pages gerent CMS + fallback i18n, flag explicite dans la page
- Image heroBanner/tiles/brandOfMonth : CSS var avec fallback asset local (zero regression si CMS vide ou flag off)
- `curationSettingsFields` : constante partagee ; throw (pas warn) sur refs non peuplees
- `cartProductSchema.translations.en` et `.fr` requis

## Prochaines etapes
- Remplir le trading plan dans le CMS prod (valeurs EN/FR fournies) + uploader images
- Activer le flag PostHog `dev_payload_trading_plan` en prod une fois le contenu valide
- Tester sync `curationSettings` end-to-end + verifier sync cartProduct en/fr
- Page builder blocks (prochain gros chantier)
- Retirer le `console.log(cmsHome)` residuel si pas deja fait
