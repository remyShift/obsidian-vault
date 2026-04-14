---
tags: [SoftwareCraft, CodeLegacy]
---

Lorsqu’on observe du code legacy il est facile de voir des morceaux de code facilement « refactorable » (beaucoup de duplication à mettre dans une méthode / fonction, des extractions évidentes …).
- Si on se jette tête baissé dans cette refactorisation de lecture on risque de passer à côté de duplication de plus haut niveau.
	- Ou encore on peut passer à côté de duplication qui ne sont pas visible au premier abord au vu de comment est écrit le code.
- On ne veut pas faire du refactoring satisfaisant mais plutôt s’aventurer plus en profondeur ==> reculer pour mieux sauter.


## Dégrader le code temporairement :

Dans cet idée de reculer pour mieux sauter on va accepter de dégrader le code temporairement même si cela peut paraître contre intuitif au premier abord : il faut parfois augmenter la duplication pour mieux faire apparaître des structures communes.
- Il se peut qu’on soit face à de la duplication sans le voir —> il faut qu’elle nous saute aux yeux, pour se faire on peut :
	- normer le formatage du code (comme toujours mettre des accolades pour les instructions conditionnelles),
	- désextraire certains bout de code (il se peut que les devs avant nous ont fait du optimum local sans penser global),
	- réduire la complexité des conditions.

Pour ce faire on va commencer par les branches les plus profondes.
- 2ème partie de la quote de Sandro Manusco.
- Les branches profondes auront moins de code et seront par conséquent plus facilement extraites.

Néanmoins il faut veiller à ne pas vouloir en faire trop et cherche la réécriture parfaite.
- On oublie pas d’où on est partis et ce qu’on obtient.
	- un code plus lisible,
	- un code plus évolutif et maintenable,
	- de la sécurité grâce aux tests,
Si la nouvelle feature demandé est facilement implantable et testable c’est qu’on a fait du bon travail.