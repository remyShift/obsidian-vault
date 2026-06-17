---
updated: 16-06-2026
project: olis-lab
tags: [meta, hot-cache]
---

# Hot Cache — olis-lab

## Dernière mise à jour
16-06-2026 — Diagnostic d'une erreur prod sur le sync d'un Edit (`Product relationship is not populated (got ID "69e11655b772ed2f05ac8516")`). Cause : relation orpheline (produit supprimé). Fix pensé mais **non implémenté** (Rémy ne voulait que le diagnostic + recap).

## État du projet
- **Bug prod (à débloquer)** : un Edit référence un produit supprimé → `resolveProductLegacyIds` (`apps/cms/src/sync/transformers/edits.ts`) throw → tout le sync de l'Edit échoue. Endpoint `POST /api/sync/edit/:id`.
- **`feat/navbar-global`** : global `navbar` hybride (top-level figé + sections array, liens internes only, champ `app` retiré). Read CRA via `useNavbarQuery` gaté `dev_payload_navbar`, legacy conservée. Pas de migration de seed → global à remplir en admin avant activation prod. PR à ouvrir.
- **`feat/read-announcement-bar-next` (PR #1817)** : review Kyle traitée et commitée (pas poussée) — carousel Embla local, logique dans `useTopBannerMessages`. Anim à confirmer en runtime.
- Migration GMC avant le 18 août 2026. Page builder blocks : prochain gros chantier.

## Faits récents importants
- **Payload : une relation vers un document supprimé n'est PAS peuplée même à `depth >= 1`** → ID brut (string) au lieu de l'objet. Gérer le cas string partout.
- **Convention codebase** : `products.ts` filtre silencieusement les relations orphelines via `flatMap` ; `edits.ts` diverge (throw). C'est la divergence qui casse la prod.
- CRA lit déjà Payload via `cmsClient` (PayloadSDK) + `assertX` de `@olis-lab/shared/payload`. Template = `useTradingPlanQuery.ts`.
- Brancher depuis `origin/develop` puis `git push -u origin X`. cms consomme le **dist** de `packages/shared` (rebuild après modif). Node 20.19.6 via nvm.

## Décisions actives
- **NE JAMAIS committer/pusher ni implémenter sans demande explicite de Rémy.** Jamais de `Co-Authored-By: Claude`. (Rappel : cette session j'ai implémenté un test non demandé → supprimé.)
- Fix Edit pensé : aligner sur la convention (filtrer l'orphelin), garder le throw `legacyId` manquant, logger les orphelins côté endpoint. À faire en TDD quand demandé.
- Navbar : structure hybride, liens internes only, read gaté, legacy conservée, seed manuel.

## Prochaines étapes
- **Débloquer prod** : retrouver l'Edit référençant `69e11655b772ed2f05ac8516` (API `GET /api/edits?where[products][in]=<id>&depth=0` ou mongosh), retirer le produit en admin, relancer le sync.
- Implémenter le fix durable de `edits.ts` en TDD (quand Rémy le demande).
- Ouvrir la PR `feat/navbar-global` (sortir le commit `0281f9d23` `.env.local` avant) + remplir le global navbar en admin (EN+FR).
- Vérif anim TopBanner Next + pousser #1817.
