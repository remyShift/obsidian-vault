---
tags:
---
## Origine

Concept issu du **Domain-Driven Design (DDD)** formalisé par Eric Evans dans son livre *Domain-Driven Design: Tackling Complexity in the Heart of Software* (2003). Popularisé également par Martin Fowler.

---

## Définition

Un Value Object est un objet qui représente un aspect descriptif du domaine **sans identité propre**. Il est entièrement défini par ses valeurs, pas par un identifiant unique.

> "An object that represents a descriptive aspect of the domain with no conceptual identity." - Eric Evans

---

## Les deux caractéristiques fondamentales

### 1. Pas d'identité
Deux Value Objects ayant les mêmes valeurs sont considérés comme **identiques**. Il n'existe pas d'ID pour les distinguer.

```typescript
const price1 = new Money(100, 'EUR');
const price2 = new Money(100, 'EUR');
// price1 === price2 au sens fonctionnel : ils sont égaux
```

### 2. Immutabilité
Une fois créé, un Value Object ne change pas. Si une modification est nécessaire, on crée un **nouvel objet** avec les nouvelles valeurs.

```typescript
// Mauvais : mutation
price1.amount = 200;

// Correct : nouvel objet
const updatedPrice = new Money(200, 'EUR');
```

---

## Entity vs Value Object

| | Entity | Value Object |
|---|---|---|
| Identité | Oui (ID unique) | Non |
| Mutabilité | Peut changer | Immutable |
| Égalité | Par ID | Par valeurs |
| Exemples | User, Order, Product | Money, Address, DateRange, Email |

**Important** : la classification dépend du domaine. Une adresse peut être un Value Object dans un système e-commerce (on ne la "suit" pas dans le temps), mais une Entity dans un système de livraison (chaque adresse a un historique).

---

## Pourquoi s'en servir

### Résoudre la "Primitive Obsession"
La primitive obsession c'est quand on représente des concepts métier avec des types primitifs (`string`, `number`) au lieu de types explicites.

```typescript
// Primitive obsession : on ne sait pas ce que c'est
function createOrder(userId: string, amount: number, currency: string) {}

// Avec Value Objects : le type parle de lui-même
function createOrder(userId: UserId, price: Money) {}
```

### Encapsuler les invariants du domaine
Un Value Object valide ses propres règles à la création. Un objet invalide ne peut pas exister.

```typescript
class Email {
  private constructor(private readonly value: string) {}

  static create(input: string): Email {
    if (!input.includes('@')) throw new Error('Email invalide');
    return new Email(input.toLowerCase());
  }
}
// Impossible de créer un Email invalide
```

### Réduire les bugs
On ne peut pas passer un `price` là où une `quantity` est attendue si ce sont deux types distincts.

---

## Exemple TypeScript complet

```typescript
class Money {
  private constructor(
    public readonly amount: number,
    public readonly currency: string
  ) {}

  static create(amount: number, currency: string): Money {
    if (amount < 0) throw new Error('Le montant ne peut pas être négatif');
    if (!currency) throw new Error('La devise est requise');
    return new Money(amount, currency);
  }

  equals(other: Money): boolean {
    return this.amount === other.amount && this.currency === other.currency;
  }

  add(other: Money): Money {
    if (this.currency !== other.currency) throw new Error('Devises incompatibles');
    return Money.create(this.amount + other.amount, this.currency);
  }
}
```

---

## Ce que ça change en pratique

- Le code devient auto-documenté : les types parlent du domaine
- Les règles métier sont centralisées dans l'objet, pas dispersées dans les services
- Les tests sont plus simples : on teste le Value Object une seule fois, pas à chaque endroit où il est utilisé

---

## Lien avec d'autres concepts

- Fait partie du **DDD tactical design** avec les Entities, Aggregates, Repositories
- Complémentaire au **CQRS** : les Value Objects sont souvent utilisés dans les Commands et Events

---

## Sources

- Livre : *Domain-Driven Design* - Eric Evans
- https://wempe.dev/blog/domain-driven-design-entities-value-objects
- https://www.milanjovanovic.tech/blog/value-objects-in-dotnet-ddd-fundamentals
- https://learn.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/implement-value-objects
