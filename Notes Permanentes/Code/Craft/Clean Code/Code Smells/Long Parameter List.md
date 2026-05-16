---
tags: [SoftwareCraft, CleanCode, Refactoring]
---
Au-delà de 2-3 paramètres, une fonction devient difficile à appeler correctement et à faire évoluer. Souvent le signal que des données qui vont ensemble ne sont pas encore regroupées dans un objet.

```js
// ❌ trop de paramètres — ordre arbitraire, erreurs faciles
function createUser(firstName, lastName, email, age, role, isActive) {
  // ...
}

createUser('Rémy', 'Martin', 'remy@example.com', 25, 'admin', true);
// Si tu inverses deux strings, aucune erreur, comportement silencieusement faux
```

Le problème avec de nombreux paramètres : l'ordre est arbitraire, les types peuvent être confondus (surtout entre deux `string` ou deux `boolean`), et ajouter un paramètre oblige à modifier tous les appels.

```js
// ✅ Parameter Object — les données vont ensemble, on les regroupe
function createUser({ firstName, lastName, email, age, role, isActive }) {
  // ...
}

createUser({
  firstName: 'Rémy',
  lastName: 'Martin',
  email: 'remy@example.com',
  age: 25,
  role: 'admin',
  isActive: true,
});
// L'ordre ne compte plus, les clés documentent les données
```

Si plusieurs fonctions partagent le même groupe de paramètres, c'est un signal fort de [[Data Clumps]] : ces données méritent leur propre classe ou objet.

**Fix :** `Introduce Parameter Object`. Si les paramètres représentent un concept métier, envisager un [[Value Object]].

**Signal d'identification :** plus de 3 paramètres, paramètres du même type qui pourraient être confondus, même groupe de paramètres qui réapparaît dans plusieurs fonctions.
