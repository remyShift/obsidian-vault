---
tags: [LangagesDeProgs, JS, ManipObj]
---


## Object.defineProperty(prop)

Ajoute ou modifie une propriété sur un objet, avec des options supplémentaires (configurabilité, énumérabilité, valeur, writable).

```js
const obj = {};
Object.defineProperty(obj, 'a', {
  value: 1,
  writable: false
});
obj.a = 2; // Erreur en mode strict, sinon ignoré
```

### Object.defineProperties(props)

Ajoute ou modifie plusieurs propriétés sur un objet.

```js
const obj = {};
Object.defineProperties(obj, {
  'a': { value: 1, writable: false },
  'b': { value: 2, writable: true }
});
obj.a = 2; // Erreur en mode strict, sinon ignoré
obj.b = 3; // Fonctionne
```
