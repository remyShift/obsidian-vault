---
updated: 24-06-2026
project: olis-lab
tags: [meta, hot-cache]
---

# Hot Cache — olis-lab

## Dernière mise à jour
24-06-2026 — Fix slug livré (Products + Subcategories, int 20/20). Nouveau fil : **RFC "Role-based access in Payload CMS"** rédigée (doc Notion, prête à coller). 3 fils en planif toujours ouverts (top banner, bulk-add, SKU).

## État du projet
- **RFC RBAC Payload (rédigée, à coller)** : doc EN `~/.claude/plans/j-aimerais-crire-un-doc-squishy-dusk.md`, approuvé. RFC technique "case + direction" pour l'équipe dev. Reco = modèle de rôles minimal (`roles` sur `Users` : select hasMany saveToJWT) + helpers `apps/cms/src/access/` (`isAdmin`/`hasRole`) réutilisés collection/field access **et** endpoints, migration incrémentale (étape 1 = tout admin par défaut → zéro lock-out), pilote = champ `slug`.
- **Slug fix (implémenté, à pousser)** : Products + Subcategories, double chemin (override hook async au save + arg `slugify` au bouton) via resolver partagé `slugifyProduct/Subcategory`. Int 20/20 + unit 29/29 verts. Message PR EN prêt, pas commité ni vérifié en live.
- **Top banner montant dynamique (planif)** : plan EN approuvé, **option non tranchée**. Reco Option 3 = token `{freeShippingThreshold}` + helper pur `@olis-lab/shared`, injection front.
- **Bulk-add Products→Edit (planif)** : plan EN, `Edits.products` (`hasMany`) existe → pas de schéma. Corps = Approche B (composant + endpoint). `join` = companion découplé (YAGNI).
- **TASK-1115 (SKU)** : PR auto-regen revertée (SKU live → out-of-stock BigBlue). Brief EN prêt, décision attendue meeting Michele/Diego.
- Chantiers checkout/footer (sessions 22-23/06) toujours en attente.

## Faits récents importants
- **Pas de RBAC** : `Users` auth nu, tous = admin. Protections de champs ad-hoc UI-only (`sku` readOnly, `notionId`/`legacyId` hidden) — ne sécurisent PAS l'API. Global `TradingPlan` + endpoints de sync (`if (!req.user)` seul) ouverts à tout user authentifié. PostHog = couche end-user client-side, distincte de l'accès admin Payload.
- **Slug** : `slugField` = 2 chemins (hook save + bouton via `slugifyHandler`/`field.custom.slugify`). Le `generateSlug` par défaut n'`await` PAS le slugify async → override obligatoire. `fieldToUse` déprécié → `useAsSlug`. Slug = clé URL PDP `/products/:slug`.
- **SKU = clé BigBlue** (read-only, jamais poussé). Muter un SKU live → out-of-stock.
- **Banner** : seuil = contexte client (Jotai), Payload sans templating → injection au render front.

## Décisions actives
- RBAC : RFC = case+direction (design complet = ticket séparé) ; rôles minimaux, helpers réutilisables, incrémental ; honnêteté assumée = sûreté opérationnelle pas anti-malveillant.
- Slug : les DEUX chemins (override async + arg), override NON redondant. Migration subcategory non découplée (figer ou non = à trancher).
- Banner : ticket ouvert, Option 3 (token front). Bulk-add : Approche B, `join` découplé. SKU : découpler duplicate (D) / correction (B), RBAC différé.

## Prochaines étapes
- RFC RBAC : coller dans Notion (entre les marqueurs), faire trancher l'équipe (set de rôles, pilote slug vs collection), puis ouvrir le ticket d'implémentation (TDD).
- Slug : ouvrir la PR + vérif live du bouton Generate ; décider figer la migration ou non.
- Banner : trancher l'option. Bulk-add : décider l'implé B + répondre à Diego. SKU : meeting Michele/Diego.
