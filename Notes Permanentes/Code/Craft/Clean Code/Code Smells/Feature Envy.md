---
tags: [SoftwareCraft, CleanCode, Refactoring]
---
Une méthode qui utilise massivement les données ou méthodes d'une autre classe plutôt que celles de la sienne. La méthode est physiquement dans la mauvaise classe : elle "envie" les données de sa voisine.

```js
// ❌ Feature Envy — calculateShippingCost est dans Order mais travaille sur Address
class Order {
  calculateShippingCost() {
    const country = this.shippingAddress.country;      // données de Address
    const city = this.shippingAddress.city;            // données de Address
    const postalCode = this.shippingAddress.postalCode; // données de Address

    if (country === 'FR') {
      if (postalCode.startsWith('75')) return 3.99;
      return 5.99;
    }
    return 12.99;
  }
}
```

La méthode ignore presque toutes les données de `Order` et passe son temps dans `shippingAddress`. C'est le signal qu'elle devrait vivre dans `Address` (ou dans une classe dédiée au shipping).

```js
// ✅ Move Method — la logique va là où vivent les données
class Address {
  calculateShippingCost() {
    if (this.country === 'FR') {
      if (this.postalCode.startsWith('75')) return 3.99;
      return 5.99;
    }
    return 12.99;
  }
}

class Order {
  calculateShippingCost() {
    return this.shippingAddress.calculateShippingCost(); // délègue simplement
  }
}
```

La règle générale : une méthode devrait vivre avec les données qu'elle manipule le plus. Si elle manipule surtout des données d'une autre classe, c'est qu'elle est au mauvais endroit.

Exception : si la méthode utilise des données de plusieurs classes de manière équilibrée, elle peut légitimement rester où elle est, ou mériter sa propre classe de service dédiée.

**Fix :** `Move Method` vers la classe dont les données sont le plus utilisées.

**Signal d'identification :** méthode qui commence par plusieurs accès à `this.autreObjet.propriete`, ratio élevé d'accès aux données d'un objet externe vs propres données, méthode dont le nom décrit quelque chose qui appartient à une autre classe.
