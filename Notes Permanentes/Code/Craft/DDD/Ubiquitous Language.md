---
tags: [SoftwareCraft, DDD]
---

Concept issu du [[Domain-Driven Design]]. L'Ubiquitous Language est un langage commun, partagé entre développeurs et experts métier, utilisé partout sans exception : dans les conversations, les tickets, et le code.

C'est le concept le plus important du DDD. Et le plus négligé.

---

## Le problème qu'il résout

Dans la plupart des projets, il existe deux langages parallèles : celui du métier et celui du code. Les experts parlent de "recommandations produit selon le profil peau", les développeurs codent un `UserProductMatcher` avec un `scoreEngine`. La traduction entre les deux est permanente, coûteuse, et source d'erreurs.

Résultat concret : quand un bug apparaît ou qu'une nouvelle règle métier doit être ajoutée, personne ne sait exactement où regarder dans le code.

---

## Ce que ça change dans le code

L'Ubiquitous Language se voit directement dans les noms de classes, méthodes, variables, et events.

```typescript
// Pas d'Ubiquitous Language : langage technique déconnecté du métier
class UserProductMatcher {
  computeScore(userId: string, productId: string): number { ... }
  processItems(items: string[], threshold: number): string[] { ... }
}

// Avec Ubiquitous Language : le code parle le même langage qu'Olivia
class ProductRecommendationEngine {
  scoreProductForSkinProfile(product: Product, profile: SkinProfile): CompatibilityScore { ... }
  filterCompatibleProducts(products: Product[], profile: SkinProfile): Product[] { ... }
}
```

La deuxième version, un expert métier peut la lire et valider que la logique correspond à ce qu'il attend.

---

## Application concrète chez Oli's Lab

Oli's Lab a deux domaines distincts avec leur propre vocabulaire :

**Domaine e-commerce :** `Cart`, `Order`, `Checkout`, `PromoCode`, `Bundle`, `ShippingAddress`

**Domaine scientifique :** `SkinProfile`, `CompatibilityScore`, `ScientificIngredient`, `SkinConcern`, `ProductRating`

Ces deux vocabulaires ne doivent pas se mélanger. Une méthode qui calcule un score de compatibilité n'a rien à faire dans une classe `Cart`. C'est exactement le signal qu'il faut un [[Bounded Context]] séparé.

```typescript
// Le vocabulaire du domaine apparaît dans les events aussi
type DomainEvent =
  | { type: 'OrderPlaced'; orderId: OrderId; customerId: CustomerId }
  | { type: 'SkinProfileCompleted'; customerId: CustomerId; concerns: SkinConcern[] }
  | { type: 'ProductRated'; productId: ProductId; score: CompatibilityScore }
```

Quand Patrick (dev scientifique) et Rémy (checkout) parlent du même `customerId`, ils utilisent le même terme. Mais la logique métier autour de ce client est différente dans chaque contexte. L'Ubiquitous Language rend cette frontière explicite.

---

## Les erreurs classiques

**Nommer selon l'implémentation, pas le domaine :** `processData`, `handleRequest`, `updateItem`. Ces noms ne disent rien de ce que fait le code du point de vue métier.

**Utiliser des abréviations ou acronymes internes :** `calcCompScore`, `sciIngr`. Ça force une traduction mentale permanente.

**Laisser le vocabulaire dériver dans le temps :** le métier évolue, et si le code ne suit pas, les deux langages se désynchronisent. Un refactoring de nommage n'est pas cosmétique, c'est de la maintenance de l'Ubiquitous Language.

---

## Lien avec les autres concepts DDD

L'Ubiquitous Language est la base sur laquelle tout repose. Sans lui, les [[Bounded Context|Bounded Contexts]] n'ont pas de frontières claires, les [[Entity|Entities]] ont des noms flous, et les [[Domain Event|Domain Events]] ne correspondent pas aux faits réels du domaine.
