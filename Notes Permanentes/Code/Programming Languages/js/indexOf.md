> [!info]- Tags
> #LangagesDeProgs #JS #ManipStr #ManipArr 

## indexOf(searchValue, fromIndex)

Retourne l'index de la première occurrence de `searchValue`, ou -1 si non trouvé.

```js
let str = "Hello World";
let index = str.indexOf("World"); // 6
```

Marche aussi pour un tableau :

```js
let arr = [1, 2, 3, 2];
let index = arr.indexOf(2); // 1
```

## lastIndexOf(searchValue, fromIndex)

Retourne l'index de la dernière occurrence de `searchValue`, ou -1 si non trouvé.

```js
let str = "Hello World World";
let index = str.lastIndexOf("World"); // 12
```

Marche aussi pour un tableau :

```js
let arr = [1, 2, 3, 2];
let lastIndex = arr.lastIndexOf(2); // 3
```
