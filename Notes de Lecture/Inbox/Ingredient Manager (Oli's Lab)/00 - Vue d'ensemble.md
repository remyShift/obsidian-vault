---
created: 2026-06-08
type: project-notes
status: to-process
tags:
  - OlisLab
  - IngredientManager
  - Scoring
  - Architecture
---
## Le but du projet

C'est l'outil **interne** d'Oli's Lab qui note les produits cosmétiques à partir de leur liste d'ingrédients (INCI). Concrètement il répond à une question : **"ce produit est-il bien formulé, oui ou non, et avec quel score ?"**

Le score sert ensuite côté e-commerce (la note affichée au client, le tri "meilleurs produits"). Ici on est sur le **back-office** qui produit cette donnée, pas sur la boutique.

Trois briques métier :

1. **Référentiel COSING** — la base officielle européenne des ingrédients cosmétiques. C'est la vérité terrain : chaque ingrédient connu y a une entrée (nom INCI, fonctions, restrictions).
2. **Matching** — relier le texte brut d'une liste d'ingrédients (ce qui est écrit sur le packaging) à une entrée COSING. C'est sale : fautes, alias, synonymes, formulations.
3. **Scoring** — une fois tout matché, appliquer **10 règles** (R01 à R10) qui donnent des bonus/malus → un score total.

## Comment ça marche (le flow)

```
Produit (liste INCI brute)
        │
        ▼
 [1] Split / nettoyage des ingrédients
        │
        ▼
 [2] Matching → chaque ingrédient pointe vers un cosingId
        │   (auto via string-similarity, ou match manuel dans l'UI)
        ▼
 [3] Classification (active / excipient / non_ingredient …)
        │
        ▼
 [4] Scoring — gate : TOUS les ingrédients scorables doivent être matchés
        │   sinon HTTP 422 "All ingredients must be matched before scoring"
        ▼
 [5] Évaluation des 10 règles → persistance du score + détail par règle
```

Point clé du gate (étape 4) : on **refuse de scorer** un produit tant qu'il reste des ingrédients non matchés (hors `non_ingredient`). C'est volontaire — un score sur des données incomplètes serait faux et trompeur. La validation est dans `validateMatchesBeforeScoring` ([scoring.service.ts](../../../../../Desktop/everything/Code/ingredient-manager/src/services/scoring.service.ts)).

## Les multiples "sources"

Le système ne note pas que les produits du shop. Il y a une notion de **source** (`SourceKey`) :

- `shop` — les produits Oli's Lab eux-mêmes.
- `ewg` — produits importés de l'EWG (Environmental Working Group, base US de référence skincare).
- `lancome` — produits d'un concurrent (Lancôme), scrapés pour benchmark.

`ewg` et `lancome` sont regroupés sous l'étiquette **"ext"** (external) dans le code. Cette dualité **shop vs ext** est la tension architecturale centrale du projet → voir [[03 - Critique archi - Clean Code & DDD]].

Intérêt business : pouvoir **comparer** le score des produits maison à des références externes avec exactement la même grille de notation.

## Stack

- **Backend** : Express 5 + TypeScript, MongoDB (driver natif, pas de Mongoose), Zod pour la validation.
- **Frontend** : Next.js 14 + MUI + React Query, servi **par le même process Express** (`app.ts` monte Next via `nextApp.getRequestHandler()`).
- **Scripts** : toute une batterie de scripts batch (`script:ext:*`) pour migrer, re-matcher, re-classifier, recalculer les scores en masse.

## À retenir
- Outil interne = pipeline **données → matching → scoring**, pas une app client.
- La donnée la plus précieuse n'est pas le score, c'est le **matching INCI ↔ COSING** correct.
- Voir [[01 - Architecture en place]], [[02 - Le système de scoring]], [[03 - Critique archi - Clean Code & DDD]].
