---
updated: 05-06-2026
project: olis-lab
tags: [meta, hot-cache]
---

# Hot Cache — olis-lab

## Dernière mise à jour
05-06-2026 — Hook Payload d'auto-génération du SKU produit (branche `feat/sku-hook-products-collection`, **PR ouverte**) : fonction pure `buildSku` en TDD, hook `beforeValidate`, endpoint + bouton admin, champ `sku` read-only/auto, guard shared mis à jour. Session précédente du jour : announce bar (PR #1784).

## État du projet
- **Hook SKU (PR ouverte, `feat/sku-hook-products-collection`)** : implémenté + testé. Reproduit la formule Notion. Reste 1 test shared rouge (`cartProduct > ZodError`, conflit wrapper) à arbitrer + double-assertion `brand` redondante à nettoyer + vérif end-to-end admin (Mongo).
- **Announce bar (PR #1784, `feat/announce-bar-global`)** : fixes review appliqués + intégration CRA sous flag `dev_announcement_bar`. À commiter/répondre aux commentaires (état session 15:55).
- Migration Content API v2.1 → Merchant API avant le 18 août 2026.

## Faits récents importants
- SKU : champ `sku` désormais `sku?: string | null` (required retiré) → `assertProduct` doit asserter sa présence (`assert.required`). 15 tests shared étaient déjà rouges à HEAD (wrapper `catch` jetait le message interne dans `cause`) → corrigé (inclusion `error.message`), reste 1.
- SKU : génération en `beforeValidate` (pas `beforeChange`, validation des champs après). Garde = « pas de SKU existant » (lit `data.sku || originalDoc?.sku`), pour couvrir le flow drafts (required bypass en draft).
- SKU : exception Oli's Lab Collectibles détectée par ID (`OLIS_LAB_COLLECTIBLES_BRAND_ID`), section marque forcée `0OLIS`. `importMap.js` gitignoré (régénéré au build).
- Script `lint` du monorepo cassé (Next 15 a retiré `next lint`). Node 20.19.x obligatoire → `source $HOME/.nvm/nvm.sh && nvm use 20`. `rm` aliasé `-i` → `/bin/rm -f`.
- `@olis-lab/ui` et `@olis-lab/shared` consommés en `dist` (gitignoré) → rebuild après modif.

## Décisions actives
- SKU : déclencheur save + bouton "Generate SKU", champ 100% auto/read-only, `buildSku` source de vérité unique (hook + endpoint). `TEST-PRODUCT`/`Bought?` et bundles hors scope.
- Pas de Zod pour les guards Payload (asserter `createAsserter` only).

## Prochaines étapes
- SKU : arbitrer test ZodError (option A test→`cause`, ou B no-wrap) ; retirer double assertion `brand` ; vérif end-to-end admin ; répondre review PR.
- Announce bar : commit + répondre aux 3 commentaires + re-review.
