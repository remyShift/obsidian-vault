---
tags: [LangagesDeProgs, JS, ManipArr]
---

## flat(deepth)

Crée un nouveau tableau avec tous les éléments des sous-tableaux concaténés récursivement jusqu'à la profondeur spécifiée.

```js
let arr = [1, [2, [3, 4], 5]];
let flat = arr.flat(2); // [1, 2, 3, 4, 5]
```


### flatMap(callback)

Map chaque élément en utilisant une fonction de mapping, puis aplati le résultat en un nouveau tableau.

```js
let arr = [1, 2, 3];
let flatMapped = arr.flatMap(x => [x, x * 2]); // [1, 2, 2, 4, 3, 6]
```
