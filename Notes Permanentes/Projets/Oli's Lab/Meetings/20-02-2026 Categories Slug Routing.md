---
date: 2026-02-20
type: meeting
projet: "Oli's Lab"
tags:
  - olis-lab
participants:
  - Diego
  - Remy
lien: https://olislab.slack.com/docs/T06E4T3H87M/F0AFR85FQR5
---

## Huddle : Categories & Slug Routing (Payload)

---

### Contexte

Rémy avait avancé sur l'intégration des catégories/sous-catégories depuis Payload CMS. Diego fait un point rapide sur l'architecture et déblocage.

---

### Ce que Rémy avait fait

- Ajout de nouveaux champs dans le schéma `shop_products` pour les catégories/sous-catégories
- Script pour peupler ces nouveaux champs
- Création de méthodes dans le service categories : récupération par slug, par ID, résolution des subcategories d'un produit

---

### Architecture décidée : slug-based routing

#### Flow complet

1. **Front-end** : au chargement de la page `/category`, fetch toutes les catégories et sous-catégories depuis le **Payload SDK** directement (pas via le backend). C'est le SDK qui est la source de vérité pour les slugs.
2. **Navigation** : quand l'utilisateur clique sur une catégorie, le front envoie le **slug** au backend (pas l'ID).
3. **Backend** : reçoit le slug → appelle Payload pour récupérer l'**ID** correspondant au slug → filtre les produits par cet ID.

#### Pourquoi passer par le slug et non l'ID directement ?

- L'ID Payload est un UUID, moins lisible dans les URL
- Le slug est plus verbeux et explicite (`/skincare` vs `/?id=abc123`)
- Le backend garde la responsabilité de la résolution slug → ID, ce qui est plus propre

#### Nouvelle route à créer

- Diego : ne pas modifier la route existante, **créer une nouvelle route** qui accepte le slug comme query param
- Cette nouvelle route sera wrappée dans un **feature flag** côté front-end
- Si feature flag activé → nouvelle route slug-based, sinon → ancienne route

---

### Points techniques

#### API call en boucle (ligne 103)

- Rémy boucle des appels API pour récupérer des catégories une par une
- Diego : il devrait exister une méthode pour passer plusieurs IDs en une seule requête. À vérifier dans la doc Payload.

#### Validation côté front

- Rémy proposait de valider le slug sur le front avant d'envoyer la requête backend (puisque le front connaît tous les slugs valides)
- Diego : **happy path d'abord**. Ne pas implémenter la validation front maintenant. Si le slug est invalide, ça échouera côté backend. On ajoutera la validation plus tard si nécessaire.

#### Filtrage des produits sur Shop All

- Diego rappelle : ne pas se préoccuper pour l'instant du filtrage des produits sur la page Shop All. Hors scope de cette itération.

---

### Actions

- [ ] **Rémy** - Créer une nouvelle route backend qui accepte le slug comme query param (ne pas modifier l'existante)
- [ ] **Rémy** - Implémenter le feature flag côté front pour basculer entre ancienne et nouvelle route
- [ ] **Rémy** - Front-end : fetcher catégories/sous-catégories depuis le Payload SDK, envoyer le slug au backend au clic
- [ ] **Rémy** - Backend : méthode pour convertir un slug en ID Payload, puis filtrer les produits par cet ID
- [ ] **Rémy** - Vérifier la doc Payload pour passer plusieurs IDs en un seul appel API (éviter la boucle)
