---
tags:
  - LangagesDeProgs
  - JS
---

## Objeect.freeze(obj)

Gèle un objet : empêche la modification des propriétés existantes et l'ajout de nouvelles propriétés.

```js
const obj = { a: 1 };
Object.freeze(obj);
obj.a = 2; // Erreur en mode strict, sinon ignoré
```

## Object.seal(obj)

Scelle un objet : empêche l'ajout de nouvelles propriétés mais permet la modification des propriétés existantes.

```js
const obj = { a: 1 };
Object.seal(obj);
obj.a = 2; // Fonctionne
obj.b = 3; // Erreur en mode strict, sinon ignoré
```
