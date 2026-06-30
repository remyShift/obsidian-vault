---
created: 2026-06-08
type: project-notes
status: to-process
tags:
  - IngredientManager
  - olis-lab
---

> Verdict global : **base saine, intention archi correcte, mais l'implémentation des repos a dérivé en God files et l'abstraction par source fuit.** Rien de bloquant, mais des points à traiter avant que ça devienne ingérable.

## ✅ Ce qui est bien

- **Évaluateurs = fonctions pures.** `evaluateR0X(context, config)` sans effet de bord. Testables, prévisibles. C'est la partie la plus propre du code.
- **Règles & datasets data-driven + versionnés.** Faire évoluer la science (barèmes, listes) sans toucher au code. Excellent.
- **Couches respectées** : route → controller → service → repo. Pas de Mongo dans les controllers.
- **TypeScript strict + Zod** sur les entrées. Validation centralisée par middleware.
- **Factory/Adapter par source** : la bonne idée pour gérer shop/ewg/lancome derrière une interface commune.

## ⚠️ Les problèmes

### 1. God files dans les repos (le plus urgent)

```
ext-scoring.repo.ts   → 3314 lignes
scoring.repo.ts       → 1625 lignes
ext-products.repo.ts  →  702 lignes
cosing/page.tsx       → 1104 lignes (front)
```

**`ext-scoring.repo.ts` à 3314 lignes est un signal rouge.** Un fichier de cette taille mélange forcément plusieurs responsabilités : requêtes Mongo, transformation de données, orchestration des évaluateurs, persistance, helpers. C'est le genre de fichier que **personne n'ose plus toucher**.

→ **Action** : découper par responsabilité (lecture / écriture / mapping / orchestration). Les `*.repo.helpers.ts` montrent que l'extraction a commencé — il faut la pousser beaucoup plus loin.

### 2. L'abstraction par source **fuit** (leaky abstraction)

Le but de la factory, c'est que le service **ne sache plus** s'il parle au shop ou à ext. Or dans `scoring.service.ts`, `validateMatchesBeforeScoring` fait exactement l'inverse :

```ts
if (source === SourceKeyEnum.SHOP) {
  // requête sur la collection `matches` …
} else {
  // requête quasi identique sur `extMatches` …
}
```

Le `if/else` par source **remonte dans la couche service**. Du coup :

- La factory ne tient pas sa promesse (le service connaît encore les détails de chaque source).
- Cette logique de gate est **dupliquée** : même intention, deux branches presque identiques.

→ **Action DDD** : ce `validateMatches` devrait être **une méthode du port** (`scoringRepo.assertAllMatched(productId)`), implémentée différemment dans chaque adapter. Le service appelle une seule fois, sans savoir quelle source.

### 3. Duplication shop / ext

Le pattern `shared-*.repo.ts` essaie de factoriser, mais à côté on a deux mondes parallèles complets (`products.repo` / `ext-products.repo`, `scoring.repo` / `ext-scoring.repo`). La règle métier (les 10 règles) est commune, **seul l'accès aux données diffère**. Pourtant `ext-scoring.repo` fait 2× la taille de `scoring.repo` → il y a de la logique métier qui a fui dans la couche data, **dupliquée** entre les deux.

→ **Action** : la **logique de scoring** (orchestration des règles, calcul du total) ne devrait exister **qu'une fois**, dans le service/domaine. Les repos ne devraient faire que **lire/écrire**. Aujourd'hui le repo orchestre — c'est l'inversion qui crée la duplication.

### 4. Logique métier dans la couche data

`normalizeNameRule1` est importé **depuis `scoring.repo`** par l'évaluateur R01 :

```ts
import { normalizeNameRule1 } from '../../repos/scoring.repo';
```

Un évaluateur (domaine pur) qui dépend d'un **repo** (infrastructure) = **dépendance dans le mauvais sens** au regard de la Clean Architecture. La normalisation de texte est une **règle de domaine**, elle n'a rien à faire dans un repo Mongo.

→ **Action** : déplacer les helpers de normalisation INCI dans un module domaine (`scoring/inci-cleaner.ts` existe déjà — c'est là que ça doit vivre, pas dans le repo).

### 5. Modèle de données pas unifié

Deux schémas Mongo distincts (`matches.cosingId` côté shop vs `extMatches.cosing_id` côté ext — note même le **camelCase vs snake_case**). Cette divergence de nommage est ce qui **force** le `if/else` du point 2. Un **modèle de domaine unifié** (un seul `Match` avec un mapping en entrée/sortie de chaque adapter) supprimerait une grosse partie de la duplication.

### 6. Détails clean code

- Commentaires-fantômes : `scoring.service.ts` commence par `// src/source-scoring.service.ts` (mauvais nom de fichier en commentaire) → bruit, signe de copier-coller.
- `console.warn` / `console.error` dans `rule-registry.ts` alors que **Pino** est la stack de log officielle → incohérence.
- Fichiers résiduels à la racine : `test-optimized-function.js` (1 octet, vide), `postman-collection.json` versionné.
- Magic numbers dans les évaluateurs (`maxPointsFallback = 50`, seuil `15` parfois en dur, parfois via config). À centraliser dans la config JSON pour rester cohérent avec l'approche data-driven.

## 🎯 Plan de refacto priorisé

1. **Sortir la logique de scoring des repos** vers le domaine/service (tue la duplication shop/ext, fait dégonfler les God files). ← gros impact
2. **Faire de `assertAllMatched` une méthode du port** → supprimer le `if/else` source du service.
3. **Unifier le modèle `Match`** (mapping dans les adapters) pour réconcilier `cosingId` / `cosing_id`.
4. Découper `ext-scoring.repo.ts` (3314 l.) en sous-modules par responsabilité.
5. Remonter `normalizeNameRule1` du repo vers `scoring/inci-cleaner.ts`.
6. Nettoyage : logs Pino partout, virer fichiers résiduels, commentaires obsolètes.

> **À garder en tête** (réflexe mission Oli's Lab) : pas de "on refactorera plus tard". Le point 1 est le seul vrai chantier ; les autres sont du nettoyage incrémental qu'on peut faire au fil des touches. Le risque réel ici, c'est `ext-scoring.repo.ts` qui continue de grossir.
