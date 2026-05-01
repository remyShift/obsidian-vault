---
date: 2026-04-29
type: meeting
projet: Oli's Lab
tags:
  - search
  - cra
  - next-js
  - ux
  - analytics
  - olis-lab
participants:
  - Diego
  - Michele
  - Kyle
  - Ante
  - Remy
lien: https://www.notion.so/olislab/34a4bf4c7fa1806b8f5cd0042a130a8d?pvs=189#34a4bf4c7fa1804ab585e477b28884b2
---

# Huddle : Search Page - Stratégie & Décision

---

## Contexte

La search est une dépendance de la navbar, déjà migrée sur Next.js. La migration des PDP est presque terminée, les PLP sont la prochaine étape. Sur deux pages aussi importantes, ne pas avoir la search disponible devient problématique. L'équipe se réunit pour décider comment la porter proprement.

Le sujet : page dédiée vs modal, et dans quelle app le faire.

---

## Décision principale : page de recherche dans le CRA

L'équipe choisit de construire une **page de recherche dédiée dans le CRA** plutôt que de porter l'expérience modale vers Next.js.

### Pourquoi
- Le CRA a déjà tous les endpoints, la logique de recherche, et le bon shape de données
- Aucune dépendance sur Payload pour l'instant (toutes les collections ne sont pas encore dessus, mixer deux bases serait compliqué)
- Path of least resistance : évite de réécrire la search avec le shape Payload alors que ce n'est pas encore stabilisé
- Le code de la modale actuelle est très messy (notamment `expand.tsx` lié au checkout), mieux vaut construire from scratch

### Comportement attendu
- Les deux navbars (CRA et Next.js) linkeront vers cette page search du CRA
- Au clic sur l'icône search, redirection vers la page (pas d'ouverture d'une modale)
- La page sera construite from scratch, pas en modifiant la modale existante

---

## Fonctionnalités requises

### Entités searchables
- Minimum 3 entités : products, bundles, brands
- Articles à ajouter rapidement après (priorité haute)
- Actives à ajouter ensuite (priorité plus basse)
- Les résultats doivent être segmentés par type
- L'utilisateur doit pouvoir filtrer par type d'entité

### Champs de recherche
- Titre (priorité haute dans le compound index)
- Description
- Ingredient list (cas d'usage important : rechercher par ingrédient)
- L'index compound MongoDB gère déjà la pondération par ordre de déclaration

### UX
- Input auto-focus au chargement de la page
- Input centré initialement, remonte quand l'utilisateur tape
- Suggestions affichées pendant la frappe
- Résultats en grille de cards, organisés par type
- Mobile : expérience full-page
- Décision à prendre sur le banner : le supprimer pour simplifier ou le garder

---

## Analytics & monitoring

- Events search à intégrer selon la documentation Google Analytics existante
- Historique des recherches à tracker pour comprendre ce que cherchent les utilisateurs
- Intégration PostHog pour les heat maps et l'analyse qualitative des interactions

---

## Hors scope pour ce projet

- POC search via Payload (à explorer plus tard)
- Migration vers Next.js de la search
- Exploration MongoDB Atlas Search / vectors (noté pour itérations futures)

---

## Organisation

- **Rémy** lead l'implémentation
- Prochaine étape avant de coder : Rémy construit un skeleton / plan de haut niveau
- Kyle aide sur l'outlining des tâches et reviewera les PRs
- Mini grooming session à planifier avant de lancer
- Timeline ajustée après cette session de grooming

---

## Actions

- [ ] **Rémy** - Construire un skeleton / high-level plan avant l'implémentation
- [ ] **Rémy** - Mener l'implémentation de la page search
- [ ] **Kyle** - Aider sur l'outlining des tâches
- [ ] **Kyle** - Reviewer les PRs
- [ ] **Michele** - Attacher les mocks Figma au projet
- [ ] **Ante** - Reviewer les mocks Figma pour identifier ce qui manque
- [ ] **Team** - Décider si on retire ou garde le banner sur la search page
- [ ] **Team** - Planifier la mini session de grooming
- [ ] **Team** - Ajuster le timeline après le grooming selon le breakdown des tâches
