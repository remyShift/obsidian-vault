---
tags:
  - LangagesDeProgs
  - JS
---

## Object.assign(target, source)

Copie les valeurs de toutes les propriétés propres (énumérables) d'un ou plusieurs objets source vers un objet cible. Retourne l'objet cible.

```js
const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };
const result = Object.assign(target, source); // { a: 1, b: 4, c: 5 }
```
