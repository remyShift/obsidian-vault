---
tags: [SoftwareCraft, DDD]
---

## Définition

Concept issu du [[Domain-Driven Design]] formalisé par Eric Evans en 2003. Un Value Object représente un aspect descriptif du domaine **sans identité propre**. Il est entièrement défini par ses valeurs, pas par un identifiant unique.

> "An object that represents a descriptive aspect of the domain with no conceptual identity." - Eric Evans

---

## Les deux caractéristiques fondamentales

### 1. Pas d'identité

Deux Value Objects ayant les mêmes valeurs sont considérés comme **identiques**. Il n'existe pas d'ID pour les distinguer.

```typescript
const price1 = new Money(100, 'EUR');
const price2 = new Money(100, 'EUR');
// price1 et price2 sont interchangeables
```

### 2. Immutabilité

Une fois créé, un Value Object ne change pas. Si une modification est nécessaire, on crée un **nouvel objet** avec les nouvelles valeurs.

```typescript
// ❌ mutation directe
price1.amount = 200;
// ✅ nouvel objet
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

---

## Pourquoi s'en servir

### Résoudre la [[Code Smells|Primitive Obsession]]

La primitive obsession, c'est représenter des concepts métier avec des types primitifs (`string`, `number`) au lieu de types explicites.

```typescript
// ❌ primitif — rien n'empêche de confondre userId et productId
function createOrder(userId: string, amount: number, currency: string) {}

// ✅ Value Objects — les types parlent du domaine
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

Dans un contexte [[CQRS]], les Value Objects apparaissent naturellement dans les payloads des Commands et des Events, immuables par nature, comme les messages qu'ils transportent.
