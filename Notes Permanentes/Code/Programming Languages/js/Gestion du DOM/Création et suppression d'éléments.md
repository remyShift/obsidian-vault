 > [!info]- Tags
> #LangagesDeProgs #JS #ManipDOM

## document.createElement(tagName)

Crée un nouvel élément HTML avec le tag spécifié.

```js
const newElement = document.createElement('div');
newElement.textContent = 'Nouvel élément';
document.body.appendChild(newElement);
```

## element.appendChild(childElement)

Ajoute un enfant à la fin de la liste des enfants d'un élément parent.

```js
const parent = document.getElementById('parentId');
const child = document.createElement('div');
child.textContent = 'Enfant';
parent.appendChild(child);
```

## element.removeChild(childElement)

Supprime un enfant de la liste des enfants d'un élément parent.

```js
const parent = document.getElementById('parentId');
const child = document.getElementById('childId');
parent.removeChild(child);
```

## element.insertBefore(newElement, referenceElement)

Insère un nouvel élément avant un élément de référence enfant d'un élément parent.

```js
const parent = document.getElementById('parentId');
const newElement = document.createElement('div');
newElement.textContent = 'Nouvel élément';
const referenceElement = document.getElementById('referenceId');
parent.insertBefore(newElement, referenceElement);
```
