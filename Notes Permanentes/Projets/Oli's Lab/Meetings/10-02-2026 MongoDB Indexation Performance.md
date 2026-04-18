---
date: 2026-02-10
type: meeting
projet: Oli's Lab
tags:
  - mongodb
  - indexing
  - performance
  - database
  - olis-lab
participants:
  - Diego
  - Patrick
  - Michele
  - Remy
lien:
---

# Huddle : MongoDB - Indexation et performance des requêtes

---

## Contexte

Session pédagogique initiée par Diego pour aligner Rémy et Patrick sur les concepts d'indexation MongoDB, les outils de monitoring de performance disponibles dans Atlas, et un bug d'index identifié sur la collection `brands`.

---

## Concepts clés : indexation

### Pourquoi indexer
Sans index, MongoDB scanne toute la collection pour trouver un document (collection scan). Avec un index sur un champ, il accède directement aux documents concernés.
- Par défaut, le champ `_id` est toujours indexé → `findById()` est toujours rapide
- Pour les recherches fréquentes par `brand`, `category`, `subcategory`, il faut créer des index dédiés

### Pourquoi ne pas tout indexer
Chaque index a un coût :
- **Mémoire** : un index prend de la place en RAM
- **Performance en écriture** : chaque insert/update doit mettre à jour tous les index de la collection
- Trop d'index peut dégrader les performances de lecture sur d'autres colonnes

Règle : indexer uniquement les champs qu'on interroge fréquemment, là où le gain est mesurable.

### Index composites (compound indexes)
Un seul index peut couvrir plusieurs champs. Exemple : filtrer par `category` ET `subcategory`.

**L'ordre des champs dans un index composite est critique :**
- Commencer par le champ le plus sélectif (celui qui filtre le plus de documents)
- Exemple correct : `brand` avant `category` si les marques sont plus distinctives que les catégories
- Exemple logique : `category` avant `subcategory` (hiérarchie naturelle, pas de sens de filtrer d'abord par subcategory)
- Analogie Patrick : `lastName` avant `firstName` pour une recherche de personne (les noms de famille sont plus discriminants)

---

## Outils de monitoring MongoDB Atlas

### Query Insights
- Section dans l'UI Atlas → Clusters → Query Insights
- Affiche les requêtes les plus coûteuses sur les 7 derniers jours
- Métriques clés :
  - **Execution time** : objectif < 1s, acceptable jusqu'à 2-3s
  - **Documents examined** : **plus important que l'execution time**. Si on examine 91k documents pour retourner 10 résultats, c'est un signe que la requête est mal construite ou qu'un index manque.

### Profiler
- Détail requête par requête
- Utile pour identifier d'où vient une requête suspecte
- Diego a identifié via le profiler que la collection `brands` subissait 1400+ appels de création d'index sur 7 jours

### `.explain()` en développement
Mongoose expose une méthode `.explain()` sur les queries et aggregations :
```ts
await Model.find(condition).explain('executionStats')
```
Retourne le détail de chaque phase de la requête : nombre de documents scannés, temps par étape, utilisation des index, etc. À utiliser ponctuellement lors du développement pour valider qu'une nouvelle query est correctement optimisée.

---

## Bug identifié : recréation d'index sur `brands` à chaque démarrage Lambda

### Symptôme
1400+ appels de création d'index sur la collection `brands` en 7 jours, détectés via le Profiler Atlas.

### Cause
- Le serveur tourne sur Lambda (serverless), qui s'arrête et redémarre fréquemment
- À chaque démarrage, Mongoose enregistre tous les schémas (`model registration`)
- Quand Mongoose enregistre un schéma avec des champs `unique: true` ou des index explicites, il appelle `ensureIndexes()` qui recrée les index
- Résultat : les index de `brands` sont recréés à chaque cold start

### Pourquoi uniquement `brands` et pas les autres collections ?
Hypothèse : il y a une requête au démarrage (probablement le fetch du menu/catégories) qui touche `brands` en premier, déclenchant l'enregistrement du schéma. Les autres collections ne sont touchées que plus tard.
Note : le cache React Query sur les brands a été déployé cette semaine, ce qui devrait réduire la fréquence des appels.

### Solution possible
Désactiver `autoIndex` dans la config Mongoose → les index ne sont plus recréés automatiquement à chaque connexion. Contrepartie : il faut synchroniser manuellement les index quand on en ajoute ou modifie un. Diego n'a pas encore implémenté ça.

---

## Requêtes ingredients (Patrick)

Patrick a identifié des problèmes de performance sur les requêtes liées aux ingrédients (projet scientifique) :
- Des améliorations sont possibles sans toucher au schéma de données
- Problème pour les index : certains champs sont stockés en string mais devraient être en ObjectId pour que les index fonctionnent correctement. Convertir les strings en ObjectId est nécessaire mais risqué (impact sur la product recommendation qui est en prod).

**Décision :** Patrick prépare un document Notion détaillant la stratégie :
- Quelles requêtes sont concernées
- Quels changements de schéma sont nécessaires
- Impact sur la product recommendation feature
- Plan de migration (via scripts sauvegardés dans le repo, pas via Mongo Compass directement)

---

## Règles rappelées

- **Pas de scripts exécutés depuis Mongo Compass** : utiliser des scripts sauvegardés dans le repo et les exécuter de façon traçable
- **Tout changement impactant la DB en prod** : document Notion de stratégie d'abord, review en équipe, puis exécution

---

## Actions

- [ ] **Patrick** - Créer un document Notion avec la stratégie d'optimisation des requêtes ingredients (quelles requêtes, quels index, impact product recommendation, plan de migration)
- [ ] **Diego** - Investiguer et corriger la recréation d'index au démarrage Lambda (désactiver `autoIndex` + sync manuel)
- [ ] **Diego + Patrick** - Review du document Notion avant d'exécuter quoi que ce soit en prod
- [ ] **Rémy + Patrick** - Utiliser `.explain('executionStats')` lors du développement de nouvelles queries coûteuses
