---
tags: [LangagesDeProgs, JS, ManipDOM]
---

## document.getElementBy
### document.getElementById(id)

Retourne l'élément avec l'ID spécifié.

```js
const element = document.getElementById('myId');
console.log(element);
```

### document.getElementByClassName(className)

Retourne une collection d'éléments ayant la classe spécifiée.

```js
const elements = document.getElementsByClassName('myClass');
console.log(elements);
```

### document.getElementByTagName(tagName)

Retourne une collection d'éléments ayant le tag spécifié.

```js
const elements = document.getElementsByTagName('div');
console.log(elements);
```

## document.querySelector

### document.querySelector(selector)

Retourne le premier élément correspondant au sélecteur CSS spécifié.

```js
const element = document.querySelector('.myClass');
console.log(element);
```

### document.querySelectorAll(selector)

Retourne une collection de tous les éléments correspondant au sélecteur CSS spécifié.

```js
const elements = document.querySelectorAll('.myClass');
console.log(elements);
```
