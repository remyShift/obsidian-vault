---
updated: 09-06-2026
project: olis-lab
tags: [meta, hot-cache]
---

# Hot Cache — olis-lab

## Dernière mise à jour
09-06-2026 — Rédigé `PAYLOAD_FRONTEND_TYPING_RFC.md` (racine, EN) pour le call Kyle/Diego sur le non-scaling des guards/asserter (PR #1784, commentaire Kyle `r3373942208`). Plus tôt : tranché les 2 PRs adminLabel (garder, abandonner Nested Docs de Michele).

## État du projet
- **RFC typage Payload→frontend (`PAYLOAD_FRONTEND_TYPING_RFC.md`, untracked)** : périmètre = asserter runtime only. Root cause = `apps/cms` déployé séparé → 2 fronts (`web` Next + `web_client` CRA) sur `@payloadcms/sdk` HTTP → union `string|T` non narrow (ni SDK ni Local API, limitation universelle). 6 options, axe de décision = wrapper client (Opt 3) vs DTO serveur (Opt 4). Reco : wrapper SDK typé (depth par méthode) + Zod interne + lint. Éviter wrapper `as`-only.
- **adminLabel (2 PRs)** : `feat/subcategories-payload-admin-label` (#1798) + `feat/edits-product-picker-admin-label`, champ `adminLabel` dénormalisé + `useAsTitle`. Correctes, indépendantes, à merger. Nested Docs abandonné.
- **Hook SKU (PR `feat/sku-hook-products-collection`)** : Design A en working tree (non commité), tests verts.
- **isValidLink** commité/poussé (`56d4c03ae` sur `origin/feat/announce-bar-global`). **Navbar** plan validé, pas implémenté. **Announce bar (PR #1784)** fixes Kyle non commités, 3 arbitrages en attente.

## Faits récents importants
- L'union `string|T` des relations Payload n'est narrow NI par le SDK NI par la Local API, quelle que soit la depth (la depth est runtime, pas typée). D'où le PR communautaire ouvert.
- Local API = in-process uniquement (app qui possède `payload.config.ts`). Supprime la frontière HTTP + le besoin d'asserter partagé (narrow inline co-localisé), pas le typage de l'union.
- Donnée traversant le réseau (HTTP) → validation runtime défensive plus justifiée → wrapper `as`-only à proscrire.
- Picker relationship Payload cherche sur un seul champ (`useAsTitle`) → label dénormalisé = réponse idiomatique. Nested Docs = hiérarchie dans une collection, orthogonal.

## Décisions actives
- RFC = doc de discussion, pas de décision figée ; trancher au call (Opt 3 vs Opt 4 ; Zod comme standard ; horizon migration ; rollout guard-by-guard vs spike Product).
- Garder adminLabel, abandonner Nested Docs ; workflow bulk multi-select = action custom `admin.components` en task séparée.

## Prochaines étapes
- Partager le RFC à Kyle/Diego, préparer le call. Avant partage : vérifier l'argument migration Merchant API (18 août) + trancher périmètre reshaping du wrapper.
- Décider si on illustre l'Option 1 du RFC (fil-piège type-level `KnownProductKeys` + `Exclude`).
- Merger les 2 PRs adminLabel + poster réponse à Michele.
- SKU : commiter Design A + vérif admin + review PR #1793.
- Brancher la navbar depuis `feat/announce-bar-global` ; announce bar — trancher les 3 arbitrages + commit.
