---
updated: 24-06-2026
project: olis-lab
tags: [meta, hot-cache]
---

# Hot Cache — olis-lab

## Dernière mise à jour
24-06-2026 — Deux fils : (1) plan bulk-add "Add selected Products to an Edit" affiné (Approche B retenue) + évaluation du `join` field suggéré par Diego ; (2) plus tôt, cadrage de TASK-1115 (régénération SKU), à trancher en meeting.

## État du projet
- **Bulk-add Products→Edit (en planification)** : plan EN `~/.claude/plans/en-suivant-le-template-rustling-toucan.md`. `Edits.products` (`hasMany`) existe déjà → aucun changement de schéma. Corps du plan = **Approche B** (composant `admin.components` + endpoint custom). Pas encore implémenté. Image des slots : `~/Desktop/products-slots-annotated.png`. Paragraphe "Companion" join + 2 micro-ajustements rédigés, **pas encore appliqués** au fichier.
- **TASK-1115 (SKU)** : PR auto-regen-on-brand-change (`f3ab29959`) revertée (`46a14fbf`) car changer un SKU live → out-of-stock BigBlue. Brief de cadrage rédigé. Décision attendue en meeting Michele/Diego.
- Chantiers checkout/footer (sessions 22-23/06) toujours en attente.

## Faits récents importants
- **Bulk-add** : le pivot du choix = **append vs replace**, pas la direction de relation. Bulk-edit natif Payload = PATCH qui **remplace** + force `_status:published` → ne sait pas append, d'où le code custom. Tous les slots list view sont dans le `SelectionProvider` (`useSelection` partout) ; aucun slot public dans la barre native de sélection.
- **`join` field** = virtuel, `access: { create:never, update:never }` → **non écrivable** ; `allowCreate` ne crée qu'un nouvel Edit, n'ajoute pas un existant, pas de bulk → **ne fait pas** le bulk-add. Sa valeur = visibilité inverse Produit→Edits sans duplication = réponse idiomatique au smell + tue le dernier pro de l'Approche A.
- **SKU = clé BigBlue** (read-only, jamais poussé). Pas de RBAC (`Users` auth nu, tous = admin). Gel SKU déclenché sur "valeur existe" au lieu de "engagé downstream".

## Décisions actives
- Bulk-add : Approche B = corps du plan ; `join` gardé mais **découplé** (feature sœur visibilité inverse, hors scope du write, avec porte de décision YAGNI).
- SKU : découpler duplicate (Option D adminLabel+clear) et correction (Option B action manuelle downstream-aware) ; RBAC différé.

## Prochaines étapes
- Bulk-add : décider de lancer l'implémentation B ; appliquer (ou non) le paragraphe join + micro-ajustements au plan ; répondre à Diego ; trancher si la visibilité inverse est un vrai besoin contenu.
- SKU : amener le résumé EN au meeting ; trancher A vs B + besoin RBAC avec Michele/Diego.
