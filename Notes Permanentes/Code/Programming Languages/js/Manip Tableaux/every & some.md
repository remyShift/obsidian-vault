---
tags:
  - LangagesDeProgs
  - JS
---

## every(callback)

Teste si tous les éléments du tableau passent le test implémenté par la fonction fournie. Retourne `true` ou `false`.

```js
let arr = [1, 2, 3, 4];
let allAboveZero = arr.every(x => x > 0); // true
```

## some(callback)

Teste si au moins un élément du tableau passe le test implémenté par la fonction fournie. Retourne `true` ou `false`.

```js
let arr = [1, 2, 3, 4];
let someAboveTwo = arr.some(x => x > 2); // true
```
