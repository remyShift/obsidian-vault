> [!info]- Tags
> #LangagesDeProgs #JS #Async 

## setTimeout(callback, delay)

Exécute une fonction après un délai spécifié (en millisecondes).
```js
setTimeout(() => {
    console.log('Cette fonction est exécutée après 2 secondes');
}, 2000);
```

### clearTimeout(timeoutId)

Annule une opération de délai précédemment établie par `setTimeout`.

```js
const timeoutId = setTimeout(() => {
    console.log('Cette fonction ne sera pas exécutée');
}, 2000);

clearTimeout(timeoutId);
```
