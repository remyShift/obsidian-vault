---
updated: 24-06-2026
project: olis-lab
tags: [meta, hot-cache]
---

# Hot Cache — olis-lab

## Dernière mise à jour
24-06-2026 — Trois fils planifiés (aucun code) : (1) nouveau ticket "montant dynamique dans la top banner CMS" — plan EN au template, 5 options pros/cons/faisabilité, **option non tranchée** ; (2) bulk-add "Add selected Products to an Edit" affiné (Approche B) + `join` field évalué ; (3) cadrage TASK-1115 (régénération SKU).

## État du projet
- **Top banner montant dynamique (en planification)** : plan EN `~/.claude/plans/dans-ma-top-banner-lexical-willow.md`, approuvé. Ticket **ouvert, option pas encore choisie**. La banner a une **double source** via flag `isDevAnnouncementBarEnabled` : flag ON → segments CMS (`announcement-bar`, text/link, statique) ; flag OFF → fallback hardcodé qui contient DÉJÀ le message free-shipping dynamique. Reco = Option 3 (token `{freeShippingThreshold}` + helper pur partagé `@olis-lab/shared`, câblé dans les 2 `useTopBannerMessages`, `admin.description` sur le champ `text`). Pas de changement de schéma.
- **Bulk-add Products→Edit (en planification)** : plan EN `~/.claude/plans/en-suivant-le-template-rustling-toucan.md`. `Edits.products` (`hasMany`) existe déjà → aucun changement de schéma. Corps = Approche B (composant `admin.components` + endpoint custom). `join` field = companion découplé (YAGNI). Pas implémenté. Image slots : `~/Desktop/products-slots-annotated.png`.
- **TASK-1115 (SKU)** : PR auto-regen-on-brand-change (`f3ab29959`) revertée (`46a14fbf`) car changer un SKU live → out-of-stock BigBlue. Brief EN prêt. Décision attendue meeting Michele/Diego.
- Chantiers checkout/footer (sessions 22-23/06) toujours en attente.

## Faits récents importants
- **Banner** : seuil résolu côté **client** (web `useFreeShippingThreshold()` number, défaut 70, par pays + service ; web_client `selectedService?.freeshipping`). Dépend d'atoms Jotai → contexte client. Payload **n'a aucun built-in templating/merge-tags** : stockage CMS et hook `afterRead` exclus (valeur dynamique + ISR cache 3600s), injection au render front obligatoire. Global `announcement-bar` = `messages[]` → `segments[]` (text|link), champ `text` localisé plain text (pas de richText).
- **Bulk-add** : pivot du choix = append vs replace. Bulk-edit natif Payload = PATCH qui remplace + force `_status:published`. `join` field = virtuel/read-only → ne fait pas le write, valeur = visibilité inverse Produit→Edits.
- **SKU = clé BigBlue** (read-only, jamais poussé). Pas de RBAC (`Users` auth nu, tous = admin). Gel SKU déclenché sur "valeur existe" au lieu de "engagé downstream".

## Décisions actives
- Banner : ticket ouvert, option à trancher ; Option 3 (token front) recommandée, token `{freeShippingThreshold}`, scope web + web_client.
- Bulk-add : Approche B = corps du plan ; `join` gardé mais **découplé** (feature sœur visibilité inverse, hors scope du write, YAGNI).
- SKU : découpler duplicate (Option D adminLabel+clear) et correction (Option B action manuelle downstream-aware) ; RBAC différé.

## Prochaines étapes
- Banner : trancher l'option d'implémentation ; si Option 3 → helper + test (TDD), câbler les 2 hooks, ajouter l'admin description.
- Bulk-add : décider de lancer l'implémentation B ; appliquer (ou non) le paragraphe join + micro-ajustements au plan ; répondre à Diego.
- SKU : amener le résumé EN au meeting ; trancher A vs B + besoin RBAC avec Michele/Diego.
