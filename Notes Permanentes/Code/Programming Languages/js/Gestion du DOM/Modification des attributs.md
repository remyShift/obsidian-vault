> [!info]- Tags
> #LangagesDeProgs #JS #ManipDOM 

## element.getAttribute(attributeName)

Obtient la valeur d'un attribut de l'élément spécifié.

```js
const element = document.getElementById('myId');
const value = element.getAttribute('data-value');
console.log(value);
```

## element.setAttribute(attributeName, value)

Définit la valeur d'un attribut de l'élément spécifié.

```js
const element = document.getElementById('myId');
element.setAttribute('data-value', 'nouvelle valeur');
```

## element.removeAttribute(attributeName)

Supprime un attribut de l'élément spécifié.

```js
const element = document.getElementById('myId');
element.removeAttribute('data-value');
```
