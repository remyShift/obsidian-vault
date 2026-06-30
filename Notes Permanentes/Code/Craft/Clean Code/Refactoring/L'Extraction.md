---
tags:
  - SoftwareCraft
  - CleanCode
  - Refactoring
---

L'extraction permet de pallier à plusieurs besoins comme :

- découper le code en plus petites portions,
- permettre de nommer un bloc de code,
- renforcer les abstractions,
- réduire la duplication,

Toutes ces choses permettent d'exprimer au mieux l'intention tout en rendant le code plus évolutif / maintenable.

Lorsqu'on extrait il faut faire attention aux raccourcis de nommage faits par notre IDE qui seront souvent pas appropriés.

Comme on a vu depuis le début et cela s'applique aussi à l'extraction c'est un processus itératif.

## Code dupliqué

Il est courant de trouver des portions de code qui se répètent ou qui sont ressemblantes. Si on doit en changer la logique à un endroit est-ce qu'on doit le faire partout ? Si oui il faut alors refactorer et extraire cette portion de code pour réduire la duplication.

En général si une règle métier apparaît à plusieurs endroits du code c'est généralement un [[Code Smells|smell]]. D'autant plus si la règle métier ne change pas selon les endroits où on la trouve —> duplication non justifiée et nécessite de refactorer.

Il faut faire attention à bien jauger et ne pas vouloir refactorer toutes les duplicités, c'est généralement utile mais ça peut aussi rendre le code moins facile à comprendre et donc moins évolutif.

Il faut aussi dissocier duplication ≠ ressemblance, 2 morceaux de code peuvent être très similaires mais avoir leur subtilité. On pourrait être tenté d'extraire mais on générera plus de bugs qu'autre chose.

Il se peut aussi que des morceaux de code soient identiques mais agissent à des niveaux différents (environnement / contexte différent). Si on les extrait ça n'aura pas vraiment de sens et rendra le tout moins compréhensible.

On ne veut pas réduire la duplication au maximum (/ réduire les lignes de code) mais avoir un ensemble compréhensible et évolutif.

## Cas particulier : magic value

Dans notre code on ne devrait pas avoir de valeurs arbitraires qui viennent rajouter du bruit à la compréhension plutôt qu'autre chose.

```js
if (label.length > 40) {
  // handle error
}
```

Par exemple ici on ne comprend pas vraiment pourquoi 40 ? Alors qu'avec :

```js
if (label.length > MAX_LABEL_LENGTH) {
  // handle error
}
```

On sait directement que c'est la taille maximum de `label`.

Les IDE facilitent grandement cette méthode.

**NB :** On aurait très bien pu l'extraire en une méthode / variable / constante ou fonction selon le besoin, la portée et la réutilisabilité nécessaire.
