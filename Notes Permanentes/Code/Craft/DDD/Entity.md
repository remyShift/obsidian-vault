---
tags: [SoftwareCraft, DDD]
---
Une Entity est un objet du domaine défini par son **identité**, pas par ses attributs. Deux entités avec les mêmes attributs mais des IDs différents sont deux objets distincts. L'identité persiste dans le temps, même si tous les autres attributs changent.

Un utilisateur qui change d'adresse email reste le même utilisateur. Une commande dont on modifie la quantité reste la même commande. C'est leur identifiant qui les définit, pas leur état courant.

```typescript
class Order {
  constructor(
    private readonly id: OrderId,  // identité immuable
    private items: OrderItem[],    // état qui peut évoluer
    private status: OrderStatus
  ) {}

  equals(other: Order): boolean {
    return this.id.equals(other.id)  // égalité par ID, pas par valeurs
  }
}
```

---

## Entity vs Value Object

| | Entity | [[Value Object]] |
|---|---|---|
| Identité | Oui (ID unique) | Non |
| Mutabilité | Peut changer | Immuable |
| Égalité | Par ID | Par valeurs |
| Cycle de vie | Persiste dans le temps | Créé et remplacé |
| Exemples | Order, Customer, Product | Money, Address, Email, CompatibilityScore |

La question à se poser : "est-ce que deux instances avec les mêmes données représentent la même chose ou deux choses différentes ?"
- Si c'est la même chose, c'est un Value Object.
- Si elles peuvent être distinctes malgré des données identiques, c'est une Entity.

---

Une Entity ne doit pas être un simple conteneur de données avec des getters et setters. C'est l'anti-pattern du [[Domain Model|Modèle Anémique]]. La logique qui concerne une Entity appartient à cette Entity.

```typescript
// Modèle anémique : l'Entity est un sac de données, la logique est ailleurs
class Order {
  status: string
  items: OrderItem[]
}

class OrderService {
  confirm(order: Order) {
    if (order.items.length === 0) throw new Error('...')
    order.status = 'confirmed'  // manipulation directe de l'état interne
  }
}

// Modèle riche : la logique appartient à l'objet
class Order {
  private status: OrderStatus
  private items: OrderItem[]

  confirm(): void {
    if (this.items.length === 0) {
      throw new Error('Cannot confirm an empty order')
    }
    if (this.status !== OrderStatus.Pending) {
      throw new Error(`Order cannot be confirmed from status ${this.status}`)
    }
    this.status = OrderStatus.Confirmed
  }

  addItem(item: OrderItem): void {
    if (this.status !== OrderStatus.Pending) {
      throw new Error('Cannot add items to a non-pending order')
    }
    this.items.push(item)
  }
}
```

La deuxième version protège ses propres invariants. Il est impossible de confirmer une commande vide ou d'ajouter un produit à une commande déjà confirmée, peu importe d'où l'appel vient.

---

## Ce que ça implique pour les repositories

Une Entity est récupérée et sauvegardée via un [[Repository]] et il garantit qu'une Entity avec un ID donné est reconstruite de façon cohérente depuis la persistance, et que ses modifications sont bien persistées en une seule opération.

```typescript
interface OrderRepository {
  findById(id: OrderId): Promise<Order | null>
  save(order: Order): Promise<void>
}
```

---

### Les Erreurs classiques

**Exposer l'état interne via des setters publics :** ça court-circuite les invariants et replace la logique dans les services. L'état ne doit être modifiable que via des méthodes métier explicites.

**Créer des Entities pour tout :** si un objet n'a pas besoin de persistance dans le temps ni d'identité propre, c'est probablement un [[Value Object]].

**Laisser un service externe décider si les transitions d'état sont valides :** ces règles appartiennent à l'Entity elle-même.
