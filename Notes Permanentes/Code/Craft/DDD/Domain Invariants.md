---
tags: [SoftwareCraft, DDD]
---
Un invariant de domaine est une règle qui doit **toujours être vraie**, quel que soit le chemin d'exécution, quel que soit l'appelant.

Pas "généralement vraie". Pas "vraie si on y pense". Toujours vraie.

```
Une commande ne peut pas avoir zéro items.
Un code promo ne peut pas être appliqué deux fois sur la même commande.
Un stock ne peut pas être négatif.
Un score de compatibilité est toujours entre 0 et 100.
```

Ces règles ne vivent pas dans les services. Elles vivent dans les objets qui les concernent : [[Entity|Entities]], [[Aggregate|Aggregates]], [[Value Object|Value Objects]]. Si elles en sont absentes, n'importe quel code peut créer un état invalide, et il le fera.

---

## Où encoder les invariants

### Dans les Value Objects : à la création

Un Value Object invalide ne doit pas pouvoir exister. La validation se fait dans la factory method, jamais dans le constructeur public.

```typescript
class CompatibilityScore {
  private constructor(private readonly value: number) {}

  static create(value: number): CompatibilityScore {
    if (value < 0 || value > 100) {
      throw new DomainError(`CompatibilityScore must be between 0 and 100, got ${value}`)
    }
    return new CompatibilityScore(value)
  }

  add(other: CompatibilityScore): CompatibilityScore {
    return CompatibilityScore.create(
      Math.min(100, this.value + other.value)
    )
  }
}
```

### Dans les Aggregates : à chaque transition d'état

Chaque méthode qui modifie l'état d'un Aggregate vérifie que l'état résultant est valide.

```typescript
class Order {
  addItem(item: OrderItem): void {
    if (this.status !== OrderStatus.Pending) {
      throw new DomainError(`Cannot add items to an order with status ${this.status}`)
    }
    this.items.push(item)
  }

  confirm(): void {
    if (this.items.length === 0) {
      throw new DomainError('Cannot confirm an empty order')
    }
    if (this.status !== OrderStatus.Pending) {
      throw new DomainError(`Cannot confirm order with status ${this.status}`)
    }
    this.status = OrderStatus.Confirmed
  }

  applyPromoCode(promo: PromoCode): void {
    if (this.promoCode !== null) {
      throw new DomainError('A promo code has already been applied to this order')
    }
    if (!promo.isValid()) {
      throw new DomainError(`Promo code ${promo.code} is expired or invalid`)
    }
    this.promoCode = promo
  }
}
```

---

## Domain Exceptions

Les erreurs qui viennent du domaine ne sont pas des erreurs techniques. Elles expriment une violation d'une règle métier et doivent être nommées dans l'[[Ubiquitous Language]].

```typescript
// Erreur générique : perd l'information métier
throw new Error('Invalid state')

// Domain Exception : parle le même langage que le métier
throw new DomainError('Cannot confirm an empty order')
throw new DomainError(`Promo code ${code} has already been used by this customer`)
throw new DomainError('Skin profile must have at least one concern to generate recommendations')
```

Une hiérarchie simple suffit dans la plupart des cas :

```typescript
class DomainError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'DomainError'
  }
}

class NotFoundError extends DomainError {
  constructor(resource: string) {
    super(`${resource} not found`)
    this.name = 'NotFoundError'
  }
}
```

L'[[Application Service]] attrape ces erreurs et les traduit en réponses HTTP appropriées. Le domaine ne sait pas ce qu'est un status code HTTP.

```typescript
// Dans le controller ou un middleware d'erreur
if (error instanceof DomainError) {
  return res.status(422).json({ error: error.message })
}
if (error instanceof NotFoundError) {
  return res.status(404).json({ error: error.message })
}
```

---

## Identifier les invariants d'un domaine

Les invariants se trouvent dans les règles métier qui sont toujours non-négociables. Pour les identifier, poser ces questions aux experts métier :

- "Est-ce qu'il peut y avoir une commande sans articles ?" Non jamais.
- "Peut-on appliquer deux promos sur la même commande ?" Non.
- "Un score peut-il être négatif ?" Non, il est entre 0 et 100.

Chaque "non, jamais" est un invariant à encoder dans le code.

---

## Lien avec les tests

Les invariants sont exactement ce que les tests unitaires du domaine doivent vérifier. Un test par invariant, sur l'objet qui le porte.

```typescript
describe('Order', () => {
  it('should throw when confirming an empty order', () => {
    const order = Order.create(new CustomerId('c1'))
    expect(() => order.confirm()).toThrow('Cannot confirm an empty order')
  })

  it('should throw when applying a second promo code', () => {
    const order = orderWithOnePromo()
    const anotherPromo = PromoCode.create('PROMO2', ...)
    expect(() => order.applyPromoCode(anotherPromo))
      .toThrow('A promo code has already been applied')
  })
})
```

Ces tests ne nécessitent aucune infrastructure. Pas de base de données, pas de mocks. C'est le signe que les invariants sont bien placés dans le domaine.

---

### Erreurs classiques

**Invariants dans les services :** `if (order.items.length === 0) throw new Error(...)` dans un `OrderService`. Rien n'empêche un autre service de ne pas faire cette vérification. L'invariant doit être dans `Order.confirm()`.

**Validation du format confondue avec l'invariant métier :** valider qu'un email est bien formé c'est de la validation de format, elle va dans le [[Value Object]] `Email`. Valider qu'un client ne peut pas commander plus de X fois par jour c'est un invariant métier, il va dans l'Aggregate ou un [[Domain Service]].

**Laisser un état invalide se persister :** si un Aggregate peut être sauvegardé dans un état qui viole un invariant, l'invariant n'est pas correctement protégé. Le [[Repository]] ne valide pas les règles métier, il suppose que l'Aggregate qu'il reçoit est déjà valide.
