---
date: 2026-01-28
type: meeting
projet: Oli's Lab
tags:
  - code-review
  - architecture
  - testing
  - api
  - olis-lab
participants:
  - Diego
  - Michele
  - Remy
lien: https://olislab.slack.com/docs/T06E4T3H87M/F0ABWGFLT7B
---

# Huddle : Code Review PR Checkout API - Tests & Architecture

---

## Contexte

Code review de la PR de Diego sur le nouveau backend API (checkout). Rémy a ouvert plusieurs fils de discussion sur l'organisation des fichiers, les tests, et l'architecture. Michele intervient pour arbitrer et recadrer.

---

## Sujet 1 : Organisation des fichiers de test

### Position de Rémy
- Les fichiers de test sont actuellement au même niveau que les fichiers de feature (ex. `cart.controller.ts` + `cart.controller.test.ts`)
- Rémy propose de les mettre dans un sous-dossier `__tests__/` dans chaque dossier de feature
- Argument : sans standard établi maintenant, chaque nouveau développeur fera différemment et ça grossira sans cohérence

### Position de Diego
- C'est un choix stylistique, pas de la dette technique. On peut toujours réorganiser plus tard avec des imports absolus, effort minimal.
- Pas opposé, mais pas bloquant

### Décision
Michele valide : déplacer les tests dans un sous-dossier est acceptable et peu coûteux. Diego fait le changement dans la PR.

---

## Sujet 2 : Vitest vs Jest

### Position de Rémy
- Le projet monorepo a déjà Jest configuré sur `server` et `web-client`. Pourquoi introduire Vitest sur le nouveau backend ?

### Position de Diego
- Vitest est un wrapper autour de Jest, la migration dans l'autre sens est triviale
- On n'étendra pas les tests sur la CRA ni sur le serveur legacy de toute façon : tout va vers Next.js

### Décision
Résolu, pas de blocage. Vitest reste pour le nouveau backend.

---

## Sujet 3 : Localisation des schémas MongoDB

### Problème
Les schémas Mongoose sont définis dans les fichiers repository (ex. `cart.repository.ts`). Rémy trouve que ça pollue le repository et que les schémas/types devraient être dans le package `@shared`.

### Débat
- Diego : pour partager un type inféré depuis un schéma Mongoose, il faut que le schéma soit dans un endroit importable par les deux apps (server et web-client). On ne peut pas exporter depuis une app vers un package partagé.
- Rémy : ce qu'on partage c'est l'interface (le type inféré), pas le schéma lui-même
- Diego : pour inférer le type depuis le schéma et l'avoir dans `@shared`, il faut déplacer le schéma dans `@shared`

### Décision
Diego déplace les schémas `Product` et `Cart` dans le package `@shared`. Cela a du sens tant que les deux APIs coexistent.

---

## Sujet 4 : Injection de dépendance et mocking pour les tests unitaires

C'est le débat le plus long et le plus important de la session.

### Position de Rémy
- Actuellement, les services importent directement les repositories MongoDB. Impossible de tester la logique métier sans appeler MongoDB.
- Rémy veut introduire l'injection de dépendances (passer le repository en paramètre) + des factories de test pour mocker les données
- Avantages :
  1. En TDD, le test exprime le comportement sans se soucier de l'implémentation
  2. Quand un test échoue, on sait que c'est la logique métier qui est en cause, pas MongoDB ou Mongoose
  3. Meilleure isolation, code plus maintenable à long terme

### Position de Diego
- Le pattern actuel : `load` (appel DB) → `execute` (business logic) → `return`. La business logic dans `execute` ne doit pas appeler la DB.
- Pour tester : MongoDB en mémoire (via la lib Mongoose test) coûte presque rien, pas besoin de factories
- Factories = maintenance supplémentaire : si on ajoute un champ à un modèle, il faut mettre à jour la factory
- On n'a pas encore de vraie business logic complexe. Créer des factories pour du code futur hypothétique = sur-ingénierie

### Position de Michele (arbitrage)
- Les deux points sont valides, mais le contexte est un startup avec des contraintes de livraison
- Priorité : migrer tout dans la nouvelle API proprement. Des tests perfectionnés peuvent attendre.
- Proposition hybride : mocker quand c'est naturel et utile, ne pas forcer pour du code qui n'existe pas encore
- Pour les nouvelles features significatives : budgéter du temps supplémentaire pour les faire correctement avec les bons patterns de test
- Vision long terme de Michele : dans 1-2 ans, selon les besoins business, le backend e-commerce pourrait migrer vers Shopify. Ne pas over-engineer ce qui sera peut-être remplacé.

### Décision finale
- Rémy ouvre une **PR séparée** démontrant l'approche injection de dépendances + factories. Si convaincant, ça peut être intégré feature par feature.
- La PR actuelle de Diego est mergée avec les ajustements mineurs (organisation fichiers, déplacement schémas).
- Les débats d'architecture futurs se font en PR ou en session dédiée, pas en commentaires de code.

---

## Sujet 5 : Catégories et sous-catégories dynamiques (Rémy)

En fin de session, Rémy mentionne qu'il a ouvert une PR pour :
- Fetcher les catégories et sous-catégories dynamiquement (au lieu des valeurs hardcodées)
- Utiliser les clés de traduction dynamiquement (au lieu de clés hardcodées)

Michele valide : désormais tout changement de catégorie/sous-catégorie sera reflété automatiquement.

---

## Points de process retenus

- **Règle PR** : les discussions d'architecture doivent se faire en amont (document Notion, réunion), pas dans les commentaires de code une fois le code écrit
- **Règle PR bis** : si une suggestion est trop grosse pour être intégrée dans la PR en cours, ouvrir une PR séparée qui démontre l'approche
- **Philosophie startup** : choisir le "bon assez" plutôt que l'idéal. La migration vers la nouvelle API prime sur la perfection des tests maintenant.

---

## Actions

- [ ] **Rémy** - Ouvrir une PR séparée démontrant l'injection de dépendances + factories pour les tests unitaires
- [ ] **Diego** - Déplacer les schémas `Product` et `Cart` dans le package `@shared`
- [ ] **Diego** - Réorganiser les fichiers de test dans des sous-dossiers `__tests__/`
- [ ] **Équipe** - Évaluer les patterns de test feature par feature lors des prochains développements
