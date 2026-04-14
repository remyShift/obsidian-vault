---
tags: [LangagesDeProgs, JS, Async]
---

Les mots-clés `async` et `await` permettent de travailler avec des promesses de manière plus lisible et structurée.

## async function

Déclare une fonction asynchrone, qui retourne une promesse.

```js
async function fetchData() {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    return data;
}

fetchData().then(data => {
    console.log(data);
}).catch(error => {
    console.error('Erreur:', error);
});
```

### await

Pause l'exécution de la fonction asynchrone et attend la résolution d'une promesse.

```js
async function example() {
    console.log('Début');

    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log('Fin après 2 secondes');
}

example();
```
