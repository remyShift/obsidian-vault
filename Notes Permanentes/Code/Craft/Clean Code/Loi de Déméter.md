---
tags: [SoftwareCraft, CleanCode]
---
La **Loi de Déméter** (Law of Demeter) est aussi appelée **principe de la moindre connaissance**.

> « Ne parle qu'à tes amis immédiats. »

Une méthode d'un objet `A` ne devrait appeler que les méthodes de : `A` lui-même, les objets passés en paramètre, les objets créés dans le corps de la méthode, et les attributs directs de `A`. Elle ne devrait **pas** naviguer à travers un objet pour en atteindre un autre.

---

## Le problème : les chaînes de messages

```js
// Violation — "train wreck"
const rate = order.customer.loyaltyProgram.tier.discountRate;
```

`Order` connaît maintenant la structure interne de `Customer`, `LoyaltyProgram`, et `Tier`. Si l'un d'eux change, `Order` casse. Le [[Coupling & Cohesion|couplage]] entre des classes qui n'ont rien à faire ensemble explose. C'est aussi le smell [[Code Smells|Message Chains]].

Fix : `Hide Delegate` — l'objet encapsule la navigation.

```js
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

La loi s'applique aux **objets avec comportement**. Elle ne s'applique pas aux :
- **Data Transfer Objects (DTO)** — structures sans logique, accès direct aux champs acceptable
- **Value Objects** — `address.city` si `Address` est un simple objet de valeur

La distinction clé : **objet (comportement + état)** vs **structure de données (état seul)**.

---

## Liens

- [[Coupling & Cohesion]] — la LoD est une règle concrète pour réduire le couplage structural
- [[Les Principes SOLID]] — DIP pousse dans la même direction : dépendre d'abstractions, pas de chaînes concrètes
- [[Structurer le code]] — pas de chaînes d'appels à travers plusieurs objets
- [[Code Smells]] — Message Chains → Hide Delegate
