---
updated: 25-06-2026
project: olis-lab
tags: [meta, hot-cache]
---

# Hot Cache — olis-lab

## Dernière mise à jour
25-06-2026 — Fix slug **finalisé** : génération déplacée dans un hook collection `beforeValidate` (un hook de champ async ne marche pas, Payload valide les champs en parallèle), comportement stabilisé, test de régression int ajouté. CI debug (collision nom de brand unique). Reste à commit/push + redéployer le conteneur périmé.

## État du projet
- **Slug fix (commité `5a283e721`, fix CI non commité)** : génération via hooks collection `beforeValidate` (`ensureProductSlug`/`ensureSubcategorySlug`, comme `generateProductSku`). Checkbox slugField neutralisée, arg `slugify` gardé pour le bouton. Stabilisé (génère au create, jamais de régen auto). Test int `productSlug.int.spec.ts`. Fix CI (nom brand unique) dans le test, **pas encore commité**.
- **Top banner (planif)** : option non tranchée ; reco Option 3 (token `{freeShippingThreshold}` + helper `@olis-lab/shared`).
- **Bulk-add Products→Edit (planif)** : Approche B (composant + endpoint), `join` découplé (YAGNI).
- **TASK-1115 (SKU)** : PR auto-regen revertée (SKU live → out-of-stock BigBlue). Décision meeting Michele/Diego.
- **RFC RBAC** : doc EN rédigé, à coller dans Notion + faire trancher l'équipe.
- Chantiers checkout/footer toujours en attente.

## Faits récents importants
- **Slug = hook collection `beforeValidate`, JAMAIS hook de champ** : Payload valide les champs en parallèle (`Promise.all`), donc un générateur de champ **async** (résout marque/catégorie via `findByID`) perd la course contre la validation `required` du champ slug → `400 "Slug invalid"`. Le natif s'en sort car synchrone. Ordre Payload : collection beforeValidate → field beforeValidate → field beforeChange+validate (parallèle) → collection beforeChange.
- `/app` dans une stacktrace = build standalone conteneurisé (Dockerfile) → un fix non redéployé reste périmé (la 1ʳᵉ erreur `Promise cast` venait de là, commit cassé `c1b516f18`).
- Index Mongo `unique: true` parfois non appliqué en test local (DB fraîche) mais appliqué en CI → divergence (a causé la CI rouge : test créait 2 brands homonymes).
- Angle mort tests : factory fournissait un slug + draft saute la validation `required` → la génération-au-create n'était pas testée.

## Décisions actives
- Slug stabilisé (`if (data.slug || originalDoc?.slug) return`, comme SKU) ; changement = unlock + bouton Generate.
- Génération en collection beforeValidate ; checkbox neutralisée ; arg `slugify` pour le bouton (awaité par `slugifyHandler`).
- Test de régression int conservé (seul filet pour cette classe de bug).
- Migration subcategory non découplée (slugify corrigé sur env neuf) — figer ou non = à trancher.

## Prochaines étapes
- Commit + push du fix CI (test brand) → CI verte ; finaliser PR #1850.
- Rebuild/redéployer le conteneur CMS depuis le HEAD corrigé.
- Vérifier le bouton "Generate" en live dans le CMS.
- Trancher : figer la migration subcategory ou non.
- Reprendre banner / bulk-add / SKU / RFC RBAC.
