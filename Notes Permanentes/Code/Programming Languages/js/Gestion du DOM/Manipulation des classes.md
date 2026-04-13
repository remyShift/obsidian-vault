> [!info]- Tags
> #LangagesDeProgs #JS #ManipDOM

## element.classList.add(className)

Ajoute une ou plusieurs classes à un élément.

```js
const element = document.getElementById('myId');
element.classList.add('nouvelleClasse');
```

## element.classList.remove(className)

Supprime une ou plusieurs classes d'un élément.

```js
const element = document.getElementById('myId');
element.classList.remove('ancienneClasse');
```

## element.classList.toggle(className)

Ajoute une classe si elle n'est pas présente, la supprime si elle l'est.

```js
const element = document.getElementById('myId');
element.classList.toggle('toggleClasse');
```


## element.classList.contains(className)

Vérifie si un élément contient une classe.

```js
const element = document.getElementById('myId');
const hasClass = element.classList.contains('maClasse');
console.log(hasClass);
```
