---
tags: [SoftwareCraft, Performance, FunctionalProgramming]
---

Memoize = mettre en cache le résultat d'une fonction pour un ensemble d'arguments donnés. Si la fonction est appelée à nouveau avec les mêmes arguments, on retourne le résultat en cache au lieu de recalculer.

Ce n'est pas de l'optimisation prématurée si c'est appliqué là où c'est justifié : fonctions **pures** avec calcul **coûteux** et **arguments répétitifs**.

---

## Implémentation basique

```js
function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

const expensiveCalc = memoize((n) => {
  // calcul lourd
  return n * n;
});

expensiveCalc(10); // calcule
expensiveCalc(10); // retourne depuis le cache
```

`JSON.stringify` pour la clé est simple mais limité : ne gère pas les fonctions, les objets circulaires, les `undefined`. Pour des cas plus complexes, utiliser une librairie comme `lodash.memoize` ou une clé custom.

---

## Condition sine qua non : la pureté

Memoize ne fonctionne correctement que sur des fonctions **pures** : même entrée = même sortie, aucun effet de bord. Sur une fonction impure, le cache renverrait un résultat périmé sans le savoir.

```js
// ❌ memoize ici est dangereux — Date.now() change à chaque appel
const getTimestamp = memoize(() => Date.now());

// ✅ candidat légitime — calcul déterministe
const fibonacci = memoize((n) => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});
```

La récursion avec memoize sur Fibonacci est l'exemple canonique : sans cache, la complexité est exponentielle. Avec, elle devient linéaire.

---

## Gestion de la mémoire

Un cache qui grossit indéfiniment est un memory leak. Sur des fonctions appelées avec beaucoup d'arguments différents, il faut borner le cache.

Stratégies courantes : **LRU** (Least Recently Used — on évicte la valeur la moins récemment utilisée quand on atteint la limite), TTL (time-to-live, on invalide après un délai). La plupart des librairies de memoize sérieuses proposent ces options.

```js
// lodash — cache par défaut est une Map sans limite, à utiliser avec précaution
import memoize from 'lodash/memoize';

const cached = memoize(fetchUserData, (userId) => userId);
cached.cache = new memoize.Cache(); // reset possible
```

---

## Memoize vs Cache applicatif

Memoize est du cache **en mémoire, au niveau de la fonction, pour la durée de vie du process**. C'est différent d'un cache Redis, d'un CDN, ou d'un cache HTTP.

| Niveau | Durée | Shared entre instances ? |
| ------ | ----- | ----------------------- |
| Memoize (in-process) | Durée du process | Non |
| Redis / Memcached | Configurable | Oui |
| Cache HTTP | Configurable | Oui (par le client) |

En Node.js, deux instances du même service ne partagent pas le même memoize. Si la cohérence entre instances compte, il faut un cache distribué.

---

## Dans React

`useMemo` et `useCallback` sont des implémentations de memoize au niveau des composants, avec le tableau de dépendances comme clé de cache. La règle de pureté s'applique aussi : `useMemo` ne doit pas avoir d'effets de bord.

La plupart du temps, la vraie optimisation à faire est ailleurs (architecture, requêtes, algorithmes). Ne pas memoize par défaut — profiler d'abord.
