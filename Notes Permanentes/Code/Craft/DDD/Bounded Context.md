---
tags: [SoftwareCraft, DDD]
---

Concept issu du [[Domain-Driven Design]]. Un Bounded Context est une **frontière explicite** à l'intérieur de laquelle un modèle de domaine est cohérent et sans ambiguïté. Hors de cette frontière, le même mot peut vouloir dire autre chose.

C'est le concept central du DDD stratégique. Il précède et conditionne tous les choix tactiques.

---

## Le problème qu'il résout

Dans un système qui grossit, le même terme finit par signifier des choses différentes selon les équipes. "Produit" pour le catalogue e-commerce n'est pas le même objet que "Produit" pour le moteur de scoring scientifique. Si les deux partagent le même modèle, ce modèle finit par être un compromis qui ne convient vraiment à personne.

Un Bounded Context dit clairement : à l'intérieur de cette frontière, voilà ce que les mots veulent dire et voilà les règles qui s'appliquent.

---

## Ce que ça délimite concrètement

Un Bounded Context a :
- Son propre [[Ubiquitous Language]]
- Ses propres modèles de domaine ([[Entity|Entities]], [[Value Object|Value Objects]], [[Aggregate|Aggregates]])
- Sa propre logique métier
- Potentiellement sa propre base de données ou collection

Deux contextes peuvent utiliser le même terme (`Product`, `Customer`) pour des objets différents. C'est normal et attendu.

---

## Application concrète chez Oli's Lab

Oli's Lab a au moins deux Bounded Contexts clairement identifiables :

```
┌─────────────────────────────────────┐   ┌──────────────────────────────────────────┐
│         Contexte E-commerce         │   │         Contexte Scientifique            │
│                                     │   │                                          │
│  Product (SKU, price, stock, slug)  │   │  Product (ingredients, rating, concerns) │
│  Cart, Order, PromoCode             │   │  SkinProfile, CompatibilityScore         │
│  Customer (adresse, historique)     │   │  Customer (profil peau, concerns)        │
│  Bundle, ShippingMethod             │   │  ScientificIngredient, Active            │
└─────────────────────────────────────┘   └──────────────────────────────────────────┘
```

`Product` dans le contexte e-commerce est un objet avec un prix, un stock, un slug, une image. `Product` dans le contexte scientifique est un objet avec des ingrédients, un score de compatibilité, des actifs. Ce sont deux modèles distincts qui servent deux besoins distincts. Les forcer dans un seul modèle crée un objet gonflé qui n'est parfaitement adapté à aucun des deux usages.

Dans la base de données d'Oli's Lab, ça se traduit par les deux namespaces déjà en place : collections `shop_*` pour l'e-commerce, collections scientifiques pour le domaine scientifique. C'est une séparation de Bounded Contexts qui existe déjà, même si elle n'est pas formalisée comme telle.

---

## Communication entre Bounded Contexts

Les contextes ne s'ignorent pas : une recommandation scientifique doit pouvoir déclencher un ajout au panier. La question est : comment ils communiquent sans se coupler directement ?

Deux approches principales :

**Anti-Corruption Layer (ACL) :** une couche de traduction qui empêche les concepts d'un contexte de "contaminer" l'autre. Le contexte e-commerce ne connaît pas `CompatibilityScore` : il reçoit une liste de `ProductId` recommandés, c'est tout.

```typescript
// ACL : le contexte e-commerce reçoit uniquement ce dont il a besoin
interface RecommendationService {
  getRecommendedProductIds(customerId: CustomerId): Promise<ProductId[]>
}
// L'implémentation est dans le contexte scientifique
// Le contexte e-commerce ignore totalement SkinProfile, CompatibilityScore, etc.
```

**Domain Events :** un contexte émet un événement, l'autre réagit sans couplage direct.

```typescript
// Le contexte scientifique émet
{ type: 'SkinProfileCompleted', customerId: '123', concerns: ['acne', 'sensitivity'] }

// Le contexte e-commerce écoute et réagit sans connaître les détails du profil
onSkinProfileCompleted(event) {
  this.recommendationCache.invalidate(event.customerId)
}
```

---

## Pourquoi définir les Bounded Contexts avant le tactique

Sans cette étape, les Aggregates, Entities et Value Objects que tu crées peuvent appartenir au mauvais contexte. Tu te retrouves avec un `Product` qui fait tout, des services qui traversent les frontières sans qu'on le sache, et une logique métier qui s'éparpille.

Le DDD stratégique dit d'abord "où sont les frontières ?". Le DDD tactique dit ensuite "comment modéliser à l'intérieur de ces frontières ?".

---

## Lien avec l'architecture

Un Bounded Context peut correspondre à un module, un package, ou même un microservice selon l'échelle du système. Chez Oli's Lab avec la migration en cours, ça se traduit par une séparation claire des routes, services et collections entre le domaine e-commerce et le domaine scientifique, même si tout tourne sur le même serveur.
