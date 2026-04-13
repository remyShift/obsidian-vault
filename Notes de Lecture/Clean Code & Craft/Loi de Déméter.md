> [!info]- Tags
> #SoftwareCraft

# Loi de Déméter

**Source :** Ian Holland (1987), repris par Uncle Bob dans *Clean Code*

---

## Définition

La **Loi de Déméter** (Law of Demeter, LoD) est aussi appelée **principe de la moindre connaissance**.

> « Ne parle qu'à tes amis immédiats. »

Une méthode d'un objet `A` ne devrait appeler que les méthodes de :
1. **`A` lui-même** (`this`)
2. **Les objets passés en paramètre** à la méthode
3. **Les objets créés** dans le corps de la méthode
4. **Les attributs directs** de `A`

Elle ne devrait **pas** naviguer à travers un objet pour en atteindre un autre.

---

## Le problème : les chaînes de messages

```js
// Violation de Déméter — "train wreck"
const city = user.getAddress().getCity().getName();

// Ou en notation pointée JS
const discount = order.customer.loyaltyProgram.tier.discountRate;
```

Pourquoi c'est un problème :
- `Order` connaît maintenant la structure interne de `Customer`, `LoyaltyProgram`, et `Tier`.
- Si `LoyaltyProgram` change sa structure → `Order` casse.
- Le **couplage** entre des classes qui n'ont rien à faire ensemble explose.

---

## La règle concrète

```
// Interdit
a.getB().getC().doSomething()

// Autorisé
a.doSomethingThatInternallyUsesB()
```

L'objet `A` doit encapsuler la navigation. L'appelant ne doit pas avoir à connaître la structure interne.

---

## Exemple concret

```js
// ❌ Avant — violation
class OrderService {
  applyDiscount(order) {
    const rate = order.customer.loyaltyProgram.tier.discountRate;
    return order.total * (1 - rate);
  }
}

// ✅ Après — Déméter respectée
class Customer {
  getDiscountRate() {
    return this.loyaltyProgram.tier.discountRate; // navigation encapsulée ici
  }
}

class OrderService {
  applyDiscount(order) {
    const rate = order.customer.getDiscountRate(); // une seule "zone de confiance"
    return order.total * (1 - rate);
  }
}
```

---

## Exceptions légitimes

La loi s'applique aux **objets avec comportement**. Elle ne s'applique pas strictement aux :
- **Data Transfer Objects (DTO)** — structures de données sans logique, accès direct aux champs est acceptable.
- **Value Objects** — ex : `address.city` si `Address` est un simple objet de valeur.

La distinction clé : **objet (comportement + état)** vs **structure de données (état seul)**.

---

## Lien avec les autres principes

| Principe | Relation |
|---|---|
| SRP | Si une méthode navigue dans 3 objets, elle connaît trop de choses → trop de responsabilités |
| OCP | Une chaîne de navigation = dépendance aux détails internes = fragile à l'extension |
| DIP | La loi de Déméter pousse à dépendre d'abstractions, pas d'implémentations concrètes enchaînées |
| Code Smell | Violation = **Message Chains** smell → Fix : **Hide Delegate** |

---

## À retenir

La Loi de Déméter est un guide pour réduire le **couplage structural**. Plus les objets se parlent à travers d'autres objets, plus le code devient fragile. Le signal d'alerte : toute ligne avec plusieurs `.` enchaînés sur des objets à comportement.
