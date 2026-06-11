---
created: 2026-06-08
type: project-notes
status: to-process
tags:
  - OlisLab
  - IngredientManager
  - Architecture
  - LayeredArchitecture
---

# Ingredient Manager — Architecture en place

## Architecture en couches (Layered)

Le backend suit une **architecture en couches** classique, bien découpée par dossiers

```
routes/        → définition des endpoints Express (/api/...)
   │
controllers/   → parse la requête, appelle le service, formate la réponse
   │
services/      → logique métier (orchestration, règles, gates)
   │
repos/         → accès aux données MongoDB (couche data access)
   │
schemas/       → validation Zod (entrée) — middleware `validate`
types/         → types & enums partagés (SourceKey, ProductType…)
data/          → règles métier en JSON (R01…R10) + datasets
```

Le flux d'une requête : `route → middleware validate(zod) → asyncHandler → controller → service → repo → Mongo`. Propre et lisible, chaque couche a une responsabilité claire.

## Le pattern central : Factory par source

C'est **l'idée architecturale forte** du projet. Comme il y a plusieurs sources (`shop`, `ewg`, `lancome`), le code ne veut pas répéter `if source === 'shop' … else …` partout. Solution : des **factories** qui retournent le bon repo selon la source.

```ts
// product.repo.factory.ts
export function productsRepoFactory(source: SourceKey): ProductRepo {
  if (source === SourceKeyEnum.SHOP) return shopProductsAdapter;
  return extProductsAdapter; // ewg + lancome
}
```

Il existe une factory par domaine :
- `product.repo.factory.ts`
- `match.repo.factory.ts`
- `scoring.repo.factory.ts`

Chacune expose une **interface commune** (`ProductRepo`, `MatchRepo`, `ScoringRepo`) que les deux mondes (shop / ext) implémentent. C'est un **port** au sens hexagonal (voir [[Hexagonal Architecture]]), et les `*-adapter.ts` sont les adapters.

```
                  ┌──────────────────────┐
   service ─────▶ │  interface ProductRepo│ (port)
                  └──────────┬───────────┘
                  factory choisit
            ┌────────────────┴────────────────┐
   shopProductsAdapter                 extProductsAdapter
        │                                     │
   shared-products.repo                shared-products.repo
   + products.repo (shop)              + ext-products.repo (ext)
```

Les `shared-*.repo.ts` (`shared-products.repo`, `shared-matches.repo`) factorisent ce qui est commun aux deux sources. Bonne intention.

## Le scoring : moteur de règles data-driven

La partie la plus intéressante côté design.

- Les **règles sont des données**, pas du code : `data/rules/R01/1.0.0.json`, etc. Chaque JSON décrit les paramètres de la règle (seuils, barèmes, max_points par type de produit).
- Un fichier `active-versions.json` dit quelle version de chaque règle est active → **versioning des règles** (R05 et R10 ont déjà une `1.0.0` et une `1.1.0`). Tu peux faire évoluer un barème sans casser l'historique.
- `rules-maestro.json` mappe quelles règles s'appliquent à quel **type de produit** (`skincare` vs `bodycare`).
- Chaque règle a un **évaluateur** = une **fonction pure** : `evaluateR01(context, config) → result`. Pas d'effet de bord, pas d'accès DB. Elle reçoit le contexte (liste INCI nettoyée, actifs, exceptions) et la config (le JSON), et retourne un résultat détaillé (`points_awarded`, `verdict`, `observed_inputs`).
- `rule-registry.ts` charge toutes les règles actives au démarrage dans un registre.

C'est un vrai **moteur de règles versionnées**, traçable (chaque score garde le détail des inputs observés). Très bon pattern.

## Frontend

- Next.js 14 (app router) dans `src/app/`, servi par Express.
- Organisé par **onglets** par source (`TABS_BY_SOURCE` dans `types/global.ts`) : Products / Scoring / Unmatched pour le shop, etc.
- React Query pour le cache des appels API.
- Composants lourds : `MatchingTab`, `UnmatchedTab`, `FunctionsTab`, `cosing/page.tsx` (1100 lignes).

## À retenir
- **Layered** côté couches + **Factory/Adapter par source** côté abstraction = colonne vertébrale.
- Le scoring est **data-driven + versionné + fonctions pures** : la vraie réussite du design.
- La faiblesse est dans l'**implémentation** des repos, pas dans l'intention → [[03 - Critique archi - Clean Code & DDD]].
