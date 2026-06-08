---
updated: 08-06-2026
project: olis-lab
tags: [meta, hot-cache]
---

# Hot Cache — olis-lab

## Dernière mise à jour
08-06-2026 — Util de validation de lien `isValidLink` extrait (`lib/validateLink.ts`), appliqué sur AnnouncementBar + TradingPlan ; plan complet du futur global `navbar` validé. Plus tôt le même jour : fixes review announce bar (Kyle) ; hook SKU bascule Design A + suppression bouton ; admin label localisé subcategories.

## État du projet
- **Validation lien mutualisée (commité + poussé, `56d4c03ae` sur `origin/feat/announce-bar-global`)** : `apps/cms/src/lib/validateLink.ts` → `isValidLink(value, { required })` (format `/` ou `http(s)://`, pas d'espace). Appliqué : AnnouncementBar segment `link` (required si `type === 'link'`), TradingPlan `ctaLink` (required). Typecheck cms vert.
- **Navbar (futur global Payload)** : plan complet validé (`~/.claude/plans/`), PAS encore implémenté. Hybride (top-level figé + sections array), liens explicites + `app`, fin scan produits, validate `path` via `isValidLink`, tout localisé CMS. Branchera depuis `feat/announce-bar-global`.
- **Hook SKU (PR `feat/sku-hook-products-collection`)** : Design A en working tree (non commité), tests verts. À commiter + vérif admin + review PR #1793.
- **Subcategories admin label (PR `feat/subcategories-payload-admin-label`)** : champ `adminLabel` localisé + hook + migration backfill (38 locales jouées local). Standalone sur develop.
- **Announce bar (PR #1784, `feat/announce-bar-global`)** : fixes review Kyle appliqués (RowLabel, atoms, extraction `TopBannerContainer`, inversion fetch). Typecheck verts, non commité. **3 arbitrages en attente de Rémy** : `satisfies Condition/Validate`, asserter front `assertAnnouncementBar`, `flagsReady` gate app-level. Question : sortir `useGiftProductQuery` du builder.
- En parallèle : trading plan (contenu prod EN+FR bloquant).
- Migration Content API v2.1 → Merchant API avant le 18 août 2026.

## Faits récents importants
- Type juste pour un `validate` Payload sur champ `text` = `string | null | undefined` (pas `string` : null/undefined si vide ; pas `unknown` : trop défensif). Après le garde `value == null`, TS narrow → `typeof` inutile.
- Pas de dossier `fields/`/`validation/` cms : helpers inline par collection (`requiredUnlessBrand`, `uniquePerCategory`). `lib/validateLink.ts` inaugure le util de validation partagé.
- Navbar : top-level (`shop`/`your-lab`/`learn`/`brands`) codé en dur UI (`TNavItemType`) → figé côté CMS aussi. Champ `app` route next/legacy pendant migration. Pattern global : `TradingPlan.ts`.
- SKU : champ `required` Payload ne peut PAS être rempli par un hook serveur seul (validation required côté client avant envoi) → `validate` custom relâche à la création. L'asserter ne sert qu'à ce que le type Payload ne peut exprimer, pas aux drafts vides.
- Node 20.19.x → `nvm use 20`. `rm` aliasé `-i` → `/bin/rm -f`. importMap.js gitignoré. `@olis-lab/ui`/`shared` en dist → rebuild après modif.

## Décisions actives
- Validation lien mutualisée via `isValidLink`, appliquée announce-bar + trading-plan, navbar branchera dessus. `#` retiré de la regex par Rémy.
- Navbar : Hybride, top-level NON éditable cette itération (arbitrage Michele : ça retarde), liens explicites + `app`, fin scan produits (à confirmer Michele), validate léger `path`.
- SKU : Design A (required + validate + type `string`), bouton supprimé, hook `beforeValidate` inchangé.
- Subcategories : standalone sur develop, séparateur ` > `, lectures en draft.

## Prochaines étapes
- Navbar : `isValidLink` déjà commité (`56d4c03ae`) sur announce-bar. Reste à brancher la navbar depuis `feat/announce-bar-global` puis implémenter le global (`Navbar.ts` + register + types). Branche pas encore créée (qui la crée = en attente de Rémy).
- Navbar : confirmer impact « fin scan produits » avec Michele ; re-poster fil commentaires sur la bonne task.
- Announce bar : Rémy tranche les 3 arbitrages + sortie gift query ; commiter + répondre Kyle.
- SKU : commiter Design A + vérif admin + review PR #1793 (reco option 1 resolveBrand).
- Subcategories : répondre review ; conflit `migrations/index.ts` au merge produit ; backfill prod post-merge.
