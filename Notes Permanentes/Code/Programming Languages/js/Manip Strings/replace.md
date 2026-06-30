---
tags:
  - LangagesDeProgs
  - JS
---

## replace(searchValue, newValue)

Remplace les occurrences de `searchValue` par `newValue`. `searchValue` peut être une chaîne ou une expression régulière.

```js
let str = "Hello World";
let newStr = str.replace("World", "Everyone"); // "Hello Everyone"
```

## replaceAll(searchValue, newValue)

Remplace toutes les occurrences de `searchValue` par `newValue`. `searchValue` doit être une chaîne ou une expression régulière globale.

```js
let str = "Hello World World";
let newStr = str.replaceAll("World", "Everyone"); // "Hello Everyone Everyone"
```
