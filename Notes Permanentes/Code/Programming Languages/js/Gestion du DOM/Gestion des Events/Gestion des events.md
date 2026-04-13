> [!info]- Tags
> #LangagesDeProgs #JS #ManipDOM

Les événements sont des actions qui sont déclenché lors d'une interaction avec le user depuis notre page web *(clique sur un bouton, envoie d'un formulaire etc ...)*.

## element.addEventListener(event, callback)

Ajoute un gestionnaire d'événements pour un type d'événement spécifié.

```js
const button = document.getElementById('myButton');
button.addEventListener('click', () => {
    alert('Bouton cliqué !');
});
```

## element.removeEventListener(event, callback)

Supprime un gestionnaire d'événements pour un type d'événement spécifié.

```js
const button = document.getElementById('myButton');
const handleClick = () => {
    alert('Bouton cliqué !');
};
button.addEventListener('click', handleClick);
button.removeEventListener('click', handleClick);
```
