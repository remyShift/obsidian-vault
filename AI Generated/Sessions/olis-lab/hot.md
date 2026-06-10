---
updated: 10-06-2026
project: olis-lab
tags: [meta, hot-cache]
---

# Hot Cache — olis-lab

## Dernière mise à jour
10-06-2026 — Session 2 : 3 micro-fixes QA finale PDP Next (avant event 13:00) implémentés + typecheck vert, non commités. Session 1 plus tôt : fix délai CRA→PDP (PR #1804).

## État du projet
- **QA finale PDP Next (`apps/web`, non commité)** — 3 micro-fixes prêts, branche `fix/delay-between-cra-pdp` :
  1. Section "Sélection personnalisée" (Your Lab) réactivée → `navbarSections.ts` (retrait `sectionDisabled`+badge `comingSoon`).
  2. `cursor-pointer` ajouté au `NavItem` navbar (fix curseur "MARQUES") → `NavItem.tsx`.
  3. Unité de livraison localisée ("2-3 days"→"2-3 jours") → `ShippingEstimate.tsx` + clé `daysUnit` dans `public/locales/{en,fr}.json`.
  - `tsc --noEmit` web vert. Message de PR (template) déjà rédigé. **À relire par Rémy puis commit/push/PR.**
- **PR #1804 `fix/delay-between-cra-pdp`** (session 1) — fix délai sans feedback clic produit→PDP Next. `web_client` : `isNavigatingAtom` (`stores/Loading.tsx`) set avant `window.location.replace`, `LoadingComponent` plein écran racine `App.tsx`. `web` : `loading.tsx` dans `app/[locale]/products/[id]/`. `cache()` sur `getProduct` reverté (Kyle veut valider).
- Vrai chemin PDP Next = `apps/web/app/[locale]/products/[id]/`.

## Faits récents importants
- Piège `engines.node` : `pnpm --filter ... typecheck` échoue (Node v25 vs 20.19.x) → `./node_modules/.bin/tsc --noEmit` direct, ou `pnpm typecheck` depuis le dossier de l'app.
- Bug locale "stuck on switch" (topbanner/navbar/footer FR sous EN) : rien de hardcodé, cause = `NextIntlClientProvider` dans le root layout (cookie), pas de `[locale]/layout.tsx` → pas re-rendu au `router.replace`. Fix = `router.refresh()` dans `Footer/LanguageSelector.tsx`. **Délégué à Kyle.**
- `deliveryTime` backend toujours en anglais ("2-3 days") ; legacy parsait/traduisait l'unité.
- Images Slack non téléchargeables via le MCP (URLs authentifiées).
- **Jamais de `Co-Authored-By: Claude`** dans commits/PRs.

## Décisions actives
- 3 micro-fixes = hotfix minimal avant event ; icônes non touchées (Kyle), bug locale chez Kyle.
- `cache()` getProduct retiré de #1804 → dedup dans une PR séparée après validation Kyle.
- Atom de navigation dédié, overlay monté racine App.tsx.

## Prochaines étapes
- Relecture Rémy des 3 fixes PDP → commit + push + ouvrir la PR (confirmer "brand" = item MARQUES navbar, image non vue).
- Vérif manuelle des 3 fixes (Your Lab actif / hover MARQUES pointer / PDP FR "2-3 jours").
- Vérif en vrai du fix délai #1804 (`pnpm dev`, flag `isDevProductPageV2Enabled`, clic carte listing+Home).
- Threads en attente : tests `computeCartSnapshot` (`feat/cms-test-cart-hook`, à commiter), bulk-add Products→Edit (append vs replace), RFC typage Payload→frontend (call Kyle/Diego), 2 PRs adminLabel, SKU Design A, announce bar #1784.
