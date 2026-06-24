---
updated: 24-06-2026
project: olis-lab
tags: [meta, hot-cache]
---

# Hot Cache — olis-lab

## Dernière mise à jour
24-06-2026 — **Fix slug implémenté** (Products + Subcategories) : le bouton "Generate" du CMS produisait des slugs malformés (`face--body-serum`), car `slugField` a 2 générateurs et TASK-1087 n'en corrigeait qu'un. Fix = override checkbox async (save) + arg `slugify` (bouton), tous deux via un resolver partagé. Int 20/20 + unit 29/29 verts, PR pas encore poussée. (Matin : planning banner + bulk-add + SKU.)

## État du projet
- **Slug fix (implémenté, à pousser)** : `computeProductSlug.ts` (`composeProductSlug` pur + `slugifyProduct` async + hook `generateProductSlugHook`) câblé via `slugField({ useAsSlug, slugify, overrides })` = arg slugify (bouton) + override hook async (save). Idem Subcategories. Message PR EN prêt. Pas vérifié en live, pas commité.
- **Top banner montant dynamique (planif)** : plan EN approuvé, **option non tranchée**. Reco Option 3 = token `{freeShippingThreshold}` + helper pur `@olis-lab/shared`, injection front, pas de schéma.
- **Bulk-add Products→Edit (planif)** : plan EN, `Edits.products` (`hasMany`) existe → pas de schéma. Corps = Approche B (composant + endpoint custom). `join` field = companion découplé (YAGNI).
- **TASK-1115 (SKU)** : PR auto-regen revertée (SKU live → out-of-stock BigBlue). Brief EN prêt, décision attendue meeting Michele/Diego.
- Chantiers checkout/footer (sessions 22-23/06) toujours en attente.

## Faits récents importants
- **Slug** : `slugField` Payload = 2 chemins. (1) hook checkbox serveur au save ; (2) bouton client + preview → `slugifyHandler` qui lit `field.custom.slugify`, alimenté SEULEMENT par l'arg `slugify`. Override ne touche que (1). Slugify défaut Payload = pas de collapse de tirets ni NFD. `fieldToUse` déprécié → `useAsSlug`.
- **Banner** : seuil = contexte client (Jotai). Payload sans templating → injection au render front obligatoire.
- **Bulk-add** : pivot = append vs replace. Bulk-edit natif = PATCH qui remplace + force `_status:published`. `join` = read-only.
- **SKU = clé BigBlue** (read-only, jamais poussé). Pas de RBAC (Users auth nu). Gel SKU sur "valeur existe" au lieu de "engagé downstream".

## Décisions actives
- Slug : les DEUX chemins (override checkbox async pour save + arg `slugify` pour bouton), un resolver partagé. Le hook `generateSlug` par défaut de Payload n'`await` PAS le slugify async → override obligatoire. Migration subcategory NON découplée (slugify corrigé sur env neuf) — figer ou non = à trancher. Test pré-existant corrigé (`vitamin-c-e`), test produit supprimé par Rémy.
- Banner : ticket ouvert, Option 3 (token front) recommandée.
- Bulk-add : Approche B = corps du plan ; `join` découplé (YAGNI).
- SKU : découpler duplicate (Option D) et correction (Option B) ; RBAC différé.

## Prochaines étapes
- Slug : pousser/ouvrir la PR ; vérifier le bouton Generate en live ; décider figer la migration ou non.
- Banner : trancher l'option ; si Option 3 → helper + test TDD, câbler les 2 hooks, admin description.
- Bulk-add : décider l'implé B ; répondre à Diego sur le join.
- SKU : brief EN au meeting ; trancher A vs B + RBAC avec Michele/Diego.
