---
tags: [SoftwareCraft, DDD]
---

Concept issu du [[Domain-Driven Design]] formalisé par Eric Evans en 2003. Un Value Object représente un aspect descriptif du domaine **sans identité propre**. Il est entièrement défini par ses valeurs, pas par un identifiant unique.

> "An object that represents a descriptive aspect of the domain with no conceptual identity." - Eric Evans

---

## Les deux caractéristiques fondamentales

### 1. Pas d'identité

Deux Value Objects ayant les mêmes valeurs sont considérés comme **identiques**. Il n'existe pas d'ID pour les distinguer.

```typescript
const price1 = Money.create(100, 'EUR')
const price2 = Money.create(100, 'EUR')
// price1 et price2 sont interchangeables
price1.equals(price2) // true
```

### 2. Immutabilité

Une fois créé, un Value Object ne change pas. Si une modification est nécessaire, on crée un **nouvel objet** avec les nouvelles valeurs.

```typescript
// Pas de mutation
const discounted = price1.applyDiscount(0.1)  // retourne un nouveau Money
// price1 est inchangé
```

---

## Entity vs Value Object

| | [[Entity]] | Value Object |
|---|---|---|
| Identité | Oui (ID unique) | Non |
| Mutabilité | Peut changer | Immuable |
| Égalité | Par ID | Par valeurs |
| Exemples | Order, Customer, Product | Money, Address, Email, CompatibilityScore |

La question à se poser : "est-ce que deux instances avec les mêmes données représentent la même chose ?" Si oui, c'est un Value Object.

---

## Pourquoi s'en servir

### Résoudre la Primitive Obsession ([[Code Smells]])

La primitive obsession, c'est représenter des concepts métier avec des types primitifs (`string`, `number`) au lieu de types explicites.

```typescript
// Primitifs : rien n'empêche de confondre les arguments entre eux
function createOrder(customerId: string, productId: string, amount: number, currency: string) {}

// Value Objects : les types parlent du domaine, le compilateur protège
function createOrder(customerId: CustomerId, productId: ProductId, price: Money) {}
```

### Encapsuler les invariants du domaine

Un Value Object valide ses propres règles à la création. Un objet invalide ne peut pas exister.

```typescript
class Email {
  private constructor(private readonly value: string) {}

  static create(input: string): Email {
    const normalized = input.trim().toLowerCase()
    if (!normalized.includes('@')) throw new DomainError('Invalid email format')
    return new Email(normalized)
  }

  toString(): string { return this.value }
}
```

### Réduire les bugs

On ne peut pas passer un `price` là où une `quantity` est attendue si ce sont deux types distincts. TypeScript attrape ça à la compilation.

---

## Application concrète chez Oli's Lab

Le domaine e-commerce d'Oli's Lab est riche en Value Objects naturels :

```typescript
class Money {
  private constructor(
    public readonly amount: number,
    public readonly currency: string
  ) {}

  static create(amount: number, currency: string): Money {
    if (amount < 0) throw new DomainError('Amount cannot be negative')
    if (!currency) throw new DomainError('Currency is required')
    return new Money(amount, currency)
  }

  static zero(currency: string): Money {
    return new Money(0, currency)
  }

  add(other: Money): Money {
    if (this.currency !== other.currency) {
      throw new DomainError(`Cannot add ${this.currency} and ${other.currency}`)
    }
    return new Money(this.amount + other.amount, this.currency)
  }

  applyDiscount(rate: number): Money {
    if (rate < 0 || rate > 1) throw new DomainError('Discount rate must be between 0 and 1')
    return new Money(Math.round(this.amount * (1 - rate)), this.currency)
  }

  multiply(factor: number): Money {
    return new Money(Math.round(this.amount * factor), this.currency)
  }

  equals(other: Money): boolean {
    return this.amount === other.amount && this.currency === other.currency
  }
}

class Quantity {
  private constructor(public readonly value: number) {}

  static create(value: number): Quantity {
    if (!Number.isInteger(value)) throw new DomainError('Quantity must be an integer')
    if (value <= 0) throw new DomainError('Quantity must be positive')
    return new Quantity(value)
  }

  add(other: Quantity): Quantity {
    return new Quantity(this.value + other.value)
  }
}

class CompatibilityScore {  // Value Object dans le domaine scientifique
  private constructor(public readonly value: number) {}

  static create(value: number): CompatibilityScore {
    if (value < 0 || value > 100) {
      throw new DomainError('Compatibility score must be between 0 and 100')
    }
    return new CompatibilityScore(value)
  }

  isCompatible(): boolean { return this.value >= 70 }
  isCautious(): boolean { return this.value >= 40 && this.value < 70 }
  isIncompatible(): boolean { return this.value < 40 }
}
```

---

## Ce que ça change en pratique

- Le code devient auto-documenté : les types parlent du domaine
- Les règles métier sont centralisées dans l'objet, pas dispersées dans les services
- Les tests sont plus simples : on teste le Value Object une seule fois, pas à chaque endroit où il est utilisé

Dans un contexte [[CQRS]], les Value Objects apparaissent naturellement dans les payloads des Commands et des Events, immuables par nature, comme les messages qu'ils transportent.
