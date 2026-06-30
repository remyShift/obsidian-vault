---
tags:
  - LangagesDeProgs
  - JS
---

## setInterval(callback, interval)

Exécute une fonction de manière répétée à des intervalles de temps spécifiés (en millisecondes).

```js
const intervalId = setInterval(() => {
    console.log('Cette fonction est exécutée toutes les secondes');
}, 1000);

// Pour arrêter l'intervalle
clearInterval(intervalId);
```

### clearInterval(intervalId)

Annule une opération d'intervalle précédemment établie par `setInterval`.

```js
const intervalId = setInterval(() => {
    console.log('Cette fonction ne sera plus exécutée');
}, 1000);

clearInterval(intervalId);
```
