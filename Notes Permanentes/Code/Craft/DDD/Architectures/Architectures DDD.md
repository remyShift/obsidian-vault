---
tags: [SoftwareCraft, DDD, Architecture]
---
Le DDD définit *quoi* modéliser et *comment* nommer les choses. L'architecture définit *où* les mettre et *comment* les connecter. Les deux sont complémentaires, mais distincts.

Un bon modèle de domaine dans une mauvaise architecture finit couplé à la base de données et impossible à tester. Une bonne architecture sans modèle de domaine reste du CRUD bien organisé.

Ce qui est commun à toutes les architectures ci-dessous : **la logique métier ne dépend jamais de l'infrastructure**. C'est la règle fondamentale. Ce qui varie, c'est comment les couches sont nommées, découpées, et organisées.

---

## Les architectures

### [[Layered Architecture]]
L'architecture en couches classique : Presentation, Application, Domain, Infrastructure. Chaque couche ne dépend que de la couche en dessous. Point de départ de la plupart des codebases, et première étape avant d'aller plus loin.

### [[Hexagonal Architecture]]
Ports & Adapters. Le domaine est au centre, entouré de ports (interfaces) et d'adapters (implémentations). Tout ce qui est externe (HTTP, base de données, services tiers) est un adapter. Le domaine ne sait rien du monde extérieur.

### [[Clean Architecture]]
Variante de l'hexagonale formalisée par Uncle Bob avec des couches concentriques explicites : Entities, Use Cases, Interface Adapters, Frameworks & Drivers. La règle de dépendance est stricte : les cercles intérieurs ne connaissent jamais les cercles extérieurs.

### [[Vertical Slice Architecture]]
Organisation par feature plutôt que par couche technique. Chaque feature (PlaceOrder, ApplyPromoCode, ScoreProduct) est un slice vertical qui traverse toutes les couches. Réduit le couplage horizontal entre features.

---

## Comment choisir

| Architecture | Quand | Risque principal |
|---|---|---|
| Layered | Point de départ, équipe junior, domaine simple | Couplage infrastructure-domaine si mal appliquée |
| Hexagonale | Domaine complexe, besoin de testabilité, plusieurs adapteurs | Sur-engineering sur un domaine simple |
| Clean | Équipe structurée, règles strictes souhaitées | Verbosité, overhead organisationnel |
| Vertical Slice | App avec beaucoup de features indépendantes | Duplication si les features partagent beaucoup de logique |

Chez Oli's Lab, l'architecture hexagonale est la cible naturelle : deux contextes distincts, plusieurs adapteurs externes (Payload CMS, Stripe, BigBlue, Klaviyo), et un besoin de testabilité sans infrastructure réelle.
