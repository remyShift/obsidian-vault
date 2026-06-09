---
updated: 09-06-2026
project: olis-lab
tags: [meta, hot-cache]
---

# Hot Cache — olis-lab

## Dernière mise à jour
09-06-2026 — Tests d'intégration du hook `computeCartSnapshot` (8 US) sur `feat/cms-test-cart-hook` + branchement du schéma Zod `cartProductSchema`. Plus tôt : bulk-add Products→Edit (plan), RFC typage Payload→frontend, 2 PRs adminLabel.

## État du projet
- **Tests `computeCartSnapshot` (branche `feat/cms-test-cart-hook`)** : 8 US en **tests d'intégration purs** (`tests/int/computeCartSnapshot.int.spec.ts`), vrai `payload.update`, suite int verte (15/15). Factory DB `tests/factories/product.ts` (`createPublishedProduct`/`createDraftProduct`/`createBilingualPublishedProduct`, média inséré en brut). Hook : `cartProductSchema.parse` hors try (snapshot invalide → bloque save ; infra error → log+skip) + `createAsserter`. `cartProductSchema` exporté (runtime) depuis shared ; `validate` `== null` sur le field json ; `LOCALES` extrait dans `src/lib/locales.ts`. **Non commité** (D unit spec, M int spec, M factory). 2 commits déjà sur la branche (refactor + tests). `typescriptSchema` abandonné (mismatch zod 3 shared / zod 4 cms).
- **Bulk-add Products→Edit (en planification)** : `Edits.products` (`hasMany`) existe déjà. Plan EN dans `~/.claude/plans/en-suivant-le-template-rustling-toucan.md`. A vs B pas tranché (pivot = append vs replace). Slots list view dans `SelectionProvider`. Image : `~/Desktop/products-slots-annotated.png`.
- **RFC typage Payload→frontend (`PAYLOAD_FRONTEND_TYPING_RFC.md`, racine, untracked)** : asserter runtime. Root cause = `apps/cms` déployé séparé → `web`+`web_client` HTTP → union `string|T` non narrow. Reco : wrapper SDK typé + Zod interne + lint.
- **adminLabel (2 PRs)** : `feat/subcategories-payload-admin-label` (#1798) + `feat/edits-product-picker-admin-label`. À merger. Nested Docs abandonné.
- **Hook SKU** (`feat/sku-hook-products-collection`, Design A non commité). **Announce bar (PR #1784)** fixes Kyle non commités, 3 arbitrages. **Navbar** plan validé non implémenté.

## Faits récents importants
- **Piège récurrent** : le `dist` de `@olis-lab/shared` est gitignored → après checkout/pull, rebuild (`pnpm --filter @olis-lab/shared build` ou turbo) sinon `cartProductSchema undefined`. `--filter ... build` bute sur `engines.node` → fallback `npx tsc` dans `packages/shared`.
- Mongoose pluralise les collections : `product-media` → `product-medias` (insert/delete DB brut).
- `initPayload` est déjà un singleton mémoïsé → `beforeAll` = 1 boot/fichier, optimal. Coût par test = fixtures, pas l'init.
- Hook `beforeChange` reçoit le doc **fusionné** (data.brand/mainImage présents même si non touchés). Validation des fields tourne **avant** `beforeChange` → garde runtime = `parse()` dans le hook, pas le field `validate`.
- Bulk-add : pivot = append vs replace ; bulk-edit natif ne fait que remplacer.

## Décisions actives
- Tests hook = 100% intégration, comportement des US (pas du code) ; un échec = bug du hook à corriger.
- Média de test = insert DB brut (pas d'upload réel) ; config prod intacte.
- Bulk-add : attendre arbitrage append/replace. adminLabel à merger, Nested Docs abandonné. RFC = doc de discussion (call Kyle/Diego).

## Prochaines étapes
- `feat/cms-test-cart-hook` : relecture Rémy puis commit des changements (tests intégration). Rappeler le rebuild shared avant `test:int`.
- Trancher bulk-add (append → B : endpoint `POST /api/edits/:id/add-products` + `AddToEditButton.tsx`).
- Merger les 2 PRs adminLabel + répondre à Michele.
- Partager le RFC à Kyle/Diego, préparer le call (Opt 3 vs Opt 4).
- SKU : commiter Design A + review PR #1793. Announce bar : trancher 3 arbitrages + commit. Brancher navbar.
