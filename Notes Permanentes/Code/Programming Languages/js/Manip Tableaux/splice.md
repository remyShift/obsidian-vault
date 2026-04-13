> [!info]- Tags
> #LangagesDeProgs #JS #ManipArr

## splice(start, deleteCount, item1, item2, ..., itemN)

Modifie le contenu d'un tableau en supprimant ou en remplaçant des éléments existants et/ou en ajoutant de nouveaux éléments. `start` étant l'index de départ, `deleteCount` le nombre d'éléments à supprimer et `item1, item2, ..., itemN` : Éléments à ajouter au tableau à partir de l'indice `start` (optionnel). Si aucun élément n'est spécifié, `splice()` ne fera que supprimer des éléments.

Suppression d'éléments :

```js
let arr = [1, 2, 3, 4, 5];
let removed = arr.splice(2, 2); // arr devient [1, 2, 5], removed contient [3, 4]
```

Ajout d'éléments :

```js
let arr = [1, 2, 3, 4, 5];
arr.splice(2, 0, 'a', 'b'); // arr devient [1, 2, 'a', 'b', 3, 4, 5]
```

Remplacement d'éléments :

```js
let arr = [1, 2, 3, 4, 5];
arr.splice(2, 2, 'a', 'b'); // arr devient [1, 2, 'a', 'b', 5]
```
