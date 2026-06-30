---
tags: [SoftwareCraft, CleanCode, Refactoring]
---

Une suite d'appels enchaînés où chaque appel retourne un objet sur lequel on appelle une autre méthode : `a.getB().getC().doSomething()`. C'est une violation de la [[Loi de Déméter]] : le code connaît la structure interne de toute la chaîne, pas juste son voisin direct.

```js
// ❌ Message Chains — le code sait que User a une Address qui a un Country qui a un Code
function getShippingRate(user) {
  return user.getProfile().getAddress().getCountry().getCode();
}
```

Si la structure change (ex: `Address` n'a plus de `Country` mais un `Location`), tu dois retrouver et modifier tous les endroits où cette chaîne est écrite. Et il y en a partout parce que tout le code a appris cette structure.

```js
// ✅ Hide Delegate — User expose ce dont les appelants ont besoin
class User {
  getCountryCode() {
    return this.profile.address.country.code;
  }
}

function getShippingRate(user) {
  return user.getCountryCode();
}
```

Le code extérieur ne sait plus rien de la structure interne. Si demain `User` change comment il stocke le pays, seule la méthode `getCountryCode()` change. Tous les appelants sont protégés.

Nuance : le **method chaining** (pattern fluent / builder) n'est pas un Message Chain au sens smell. `query.where('active').orderBy('name').limit(10)` opère toujours sur le même objet ou sur le même type, c'est une API intentionnelle. Le smell, c'est traverser une hiérarchie d'objets différents.

**Fix :** `Hide Delegate` — ajouter une méthode sur l'objet de départ qui expose directement ce que l'appelant veut, sans lui faire traverser la chaîne.

**Signal d'identification :** plus de deux niveaux d'appels enchaînés sur des types différents, code qui "navigue" dans un graphe d'objets pour atteindre une valeur, tests qui doivent construire des mocks imbriqués pour tester une seule chose.
