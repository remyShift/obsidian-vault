---
date: 2026-01-22
type: meeting
projet: Oli's Lab
tags: [categories, schema, refactoring, migration, olis-lab]
participants: [R\u00e9my, Diego]
notion:
---

# Huddle : Planification - Migration Catégories/Sous-catégories

---

## Contexte

Courte session de planification sur la migration des catégories et sous-catégories depuis le champ `translation` (hardcodé) vers une vraie collection MongoDB dédiée.

---

## Plan en PRs

### PR 1 : Schémas et script
- Créer le schéma pour `shop_products` avec le nouveau champ categories/subcategories
- Créer les schémas pour les collections `categories` et `subcategories`
- Script pour peupler la nouvelle collection

### PR 2 : Backend
- Modifier le backend pour utiliser le nouveau champ dans les réponses API
- Ne pas encore supprimer l'ancien champ dans les translations, juste ajouter le nouveau
- Garder l'ancienne logique en parallèle pendant la transition

### PR 3 : Frontend + cleanup
- Remplacer les usages de l'ancien champ `translation.categories` par le nouveau dans le frontend
- Supprimer l'ancienne référence

---

## Question ouverte : comment gérer la création de nouveaux produits ?

Si les catégories/sous-catégories ne sont plus dans le champ `translation` mais dans une collection dédiée, que se passe-t-il quand on crée un nouveau produit via Notion ?

- Rémy : dans l'automation Make, quand Notion envoie le nom d'une catégorie (ex. "Skincare"), on fait un lookup par nom dans la nouvelle collection `categories` et on récupère l'ObjectId.
- Le nom dans Notion doit donc correspondre exactement au nom dans la collection (stable, pas censé changer souvent).

Diego explore aussi l'idée de triggers DB (comme les listeners Postgres) pour déclencher automatiquement la mise à jour des catégories liées quand un produit est modifié. Idée jetée sans être actionnée maintenant.

---

## Décision clé avant de commencer la PR 2

Diego : avant de se lancer dans la migration frontend/backend, faire un **audit complet** de tous les endroits où les catégories/sous-catégories sont lues dans le code (backend, frontend, automation Make).

- Si c'est ~20 endroits : faisable en 2-3 PRs
- Si c'est ~1000 endroits : revoir l'approche

Rémy fait cet audit avant d'ouvrir la PR 2.

---

## Actions

- [ ] **Rémy** - PR 1 : créer les schémas shop_products, categories, subcategories + script de population
- [ ] **Rémy** - Audit complet des endroits qui lisent categories/subcategories (backend, frontend, Make automation)
- [ ] **Diego + Rémy** - Définir la stratégie de la PR 2 en fonction des résultats de l'audit
