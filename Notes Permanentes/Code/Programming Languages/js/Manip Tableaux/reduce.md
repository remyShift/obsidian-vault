---
tags: [LangagesDeProgs, JS, ManipArr]
---

## reduce(callback)

Applique une fonction sur un accumulateur et chaque valeur du tableau (de gauche à droite) pour le réduire à une seule valeur.

```js
let arr = [1, 2, 3, 4];
let sum = arr.reduce((acc, x) => acc + x, 0); // 10
```

### reduceRight(callback)

Applique une fonction sur un accumulateur et chaque valeur du tableau (de droite à gauche) pour le réduire à une seule valeur.

```js
let arr = [1, 2, 3, 4];
let sum = arr.reduceRight((acc, x) => acc + x, 0); // 10
```

![[Pasted image 20251215202033.png]]