---
tags:
  - LangagesDeProgs
  - JS
---

## find(callback)

Retourne la première valeur trouvée dans le tableau qui satisfait la fonction de test fournie. Sinon, retourne `undefined`.

```js
let arr = [1, 2, 3, 4];
let found = arr.find(x => x > 2); // 3
```

### findIndex(callback)

Retourne l'index de la première valeur trouvée dans le tableau qui satisfait la fonction de test fournie. Sinon, retourne -1.

```js
let arr = [1, 2, 3, 4];
let index = arr.findIndex(x => x > 2); // 2
```
