> [!info]- Tags
> #SoftwareCraft #CleanCode #Refacto 


L’extraction permets de palier à plusieurs besoins comme :
- découper le code en plus petites portions,
- permettre de nommer un bloc de code,
- renforcer les abstractions,
- réduire la duplication,

Toutes ces choses permettre d’exprimer au mieux l’intention tout en rendant le code plus évolutif / maintenable.

Lorsqu’on extrait il faut faire attention au raccourcis de nommage fait par notre IDE qui seront souvent pas appropriée.

Comme on a vu depuis le début et cela s’applique aussi à l’extraction c’est un processus itératif.

#### Code dupliqué :

Il est courant de trouver des portions de code qui se répètent ou qui sont ressemblantes. Si on doit en changer la logique à un endroit est ce qu’on doit le faire partout ? Si oui il faut alors refactor et extraire cette portion de code pour réduire la duplication.

En générale si une règle métier apparaît à plusieurs endroit du code c’est généralement un « *smells* ». D’autant plus si la règle métier ne change pas selon les endroits où on la trouve —> duplication non justifié et nécessite de refactor.

Il faut faire attention à bien jauger et ne pas vouloir refactor toutes les duplicités, c’est généralement utile mais ça peut aussi rendre le code moins facile à comprendre et donc moins évolutif.

Il faut aussi dissocier duplication ≠ ressemblance, 2 morceau de code peuvent être très similaires mais avoir leur subtilité. On pourrait être tenter d’y extraire mais on génèrera plus de bugs qu’autre chose. 

Il se peut aussi que des morceau de codes soient identiques mais agissent à des niveau différents ( /environnement / contexte différent). Si on les extrait ça n’aura pas vraiment de sens et rendra le tout moins compréhensible.

On ne veut pas réduire la duplication au maximum (/ réduire les lignes de codes) mais avoir un ensemble compréhensible et évolutif.

#### Cas particulier : magic value

Dans notre code on ne devrait pas avoir de valeurs arbitraires qui viennent plus rajouter du bruit à la compréhension qu’autre chose.

```js
if (label.length > 40) {
  // handle error
}
```

Par exemple ici on ne comprends pas vraiment pourquoi 40 ? Alors qu’avec :

```js
if (label.length > MAX_LABEL_LENGTH) {
  // handle error
}
```

On sait directement que c’est la taille maximum de `label`.

Les IDE facilite grandement cette méthode.

**NB :** On aurait très bien pu l’extraire en une méthode / variable / constante ou fonction selon le besoin et la portée et réutilisabilité nécessaire.
