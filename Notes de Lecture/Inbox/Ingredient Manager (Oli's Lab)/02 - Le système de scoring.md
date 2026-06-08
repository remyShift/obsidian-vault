---
created: 2026-06-08
type: project-notes
status: to-process
tags:
  - OlisLab
  - IngredientManager
  - Scoring
---

# Ingredient Manager — Le système de scoring (10 règles)

## Le principe

Un produit part d'un score et on lui applique **10 règles**. Les unes ajoutent (bonus), les autres retirent (malus). Le total = la note du produit. Les barèmes diffèrent entre **skincare** et **bodycare** (mappés dans `rules-maestro.json`).

## Les 10 règles (R01 → R10)

| Règle | Nom | Sens | Max (skin / body) | Ce que ça mesure |
|---|---|---|---|---|
| **R01** | Active Ingredient Positioning | bonus | 50 / 50 | Position des actifs dans la liste INCI. Plus un actif est haut (= concentration plus forte), plus il rapporte. Pénalise les actifs **après le parfum** (souvent traces). |
| **R02** | Excipients Proportion | bonus | 30 / 30 | Proportion d'excipients vs ingrédients classifiables. Barème par tier. |
| **R03** | Synergistic Formulation | bonus | 20 / 20 | Nombre de **fonctions actives uniques** → récompense une formule qui combine des familles d'actifs (synergie). |
| **R04** | Special Ingredient Bonuses | bonus | 15 / 15 | Bonus pour ingrédients "spéciaux" / naturels détectés. |
| **R05** | Skin Irritation & Sensitiveness | malus | 10 / 10 | Pénalise irritants / allergènes. *(2 versions : 1.0.0 et 1.1.0)* |
| **R06** | Antagonistic Ingredients | malus | 10 / 10 | Paires d'actifs **antagonistes** (qui s'annulent / se déstabilisent). |
| **R07** | Carcinogenicity | malus | 40 / 30 | Ingrédients cancérigènes. Malus le plus lourd. Modulé par position. |
| **R08** | Endocrine Disruptors | malus | 20 / 15 | Perturbateurs endocriniens. |
| **R09** | Reproductive & Development Toxicity | malus | 20 / 15 | Toxicité reproductive / développementale (DRT). |
| **R10** | First Ingredient Different from Water | bonus | 10 | Récompense un produit dont le **premier ingrédient n'est pas de l'eau** (= plus concentré en actifs). *(2 versions)* |

Les malus de toxicité (R07/R08/R09) sont **modulés par la position** dans la liste : un cancérigène en tête pèse plus qu'en trace en fin de liste.

## Anatomie d'un évaluateur (exemple R01)

`evaluateR01(context, config) → result` — fonction pure. Logique :

1. `X = max_points / nombre_d'actifs` → chaque actif vaut une part égale du max.
2. Chaque actif reçoit un **multiplicateur selon sa position** (bucketing) :
   - Liste **≥ 15 ingrédients** → découpage en **tiers** (top / middle / bottom).
   - Liste **< 15** → découpage en **moitiés** (first / second).
3. Un actif **après le parfum** → multiplicateur **0** (considéré en trace).
4. Les ingrédients dans la liste d'**exceptions** (`rule_1_exceptions@1.0.0.json`) → points pleins quoi qu'il arrive.
5. Verdict : `pass` (≥ 50) / `partial` (> 0) / `unknown` (0 actif).

Le résultat embarque `observed_inputs` : le **détail de chaque actif** (index, bucket, points attribués), les exceptions appliquées, la version du dataset utilisé. → **traçabilité complète** d'un score, on peut auditer pourquoi un produit a eu sa note.

## Les datasets de support

Le scoring s'appuie sur des listes de référence (dans `data/datasets/`, chargées et normalisées dans `src/data/index.ts`, mises en `Set` pour lookup O(1)) :

- `rule_1_exceptions@1.0.0.json` — actifs toujours crédités plein.
- `allergens-post-parfum@…` — allergènes tolérés après le parfum.
- `essential_oils@1.0.0.json` — huiles essentielles.
- `rinse_off_subcategories@1.0.0.json` — produits rincés (règles adaptées).

Chaque dataset est **versionné** (`@1.0.0`) → cohérent avec le versioning des règles.

## Endpoints de scoring

```
POST /api/scoring/:source/rules/all/evaluate        → score complet d'un produit
POST /api/scoring/:source/rules/all/evaluate-batch   → batch
POST /api/scoring/:source/rules/:ruleId/evaluate     → une seule règle
GET  /api/scoring/:source/score/:productId           → lire le score
GET  /api/scoring/rules/meta                          → métadonnées des règles
POST /api/scoring/:source/skin-type-suitability       → adéquation type de peau
```

## À retenir
- 10 règles = **6 bonus + 4 malus**, barème skincare/bodycare distinct.
- Le cœur de la valeur : **bucketing par position** (R01) + **modulation par position** des toxicités.
- Chaque score est **auditable** (`observed_inputs` + versions de datasets).
- Datasets + règles **versionnés** : on peut faire évoluer la science sans réécrire le code.
