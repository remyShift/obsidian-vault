Pour créer des models custom 3D on a un large éventail de logiciel :
- Cineme 4D,
- Maya,
- 3DS Max,
- Blender,
- ZBrush,
- Marmoset Toolbag,
- Substance Painter,
- ...

Qui répondent chacun plus ou moins à différents besoins que ça soit pour leur UX, leur performances, leur features, leur prix etc etc.

C'est pourquoi on va utiliser **Blender**. Il est gratuit, à de bonnes performances, léger, marche sur tout les OS, a beaucoup de features car une grande communauté l'utilise.

# Blender
## Areas

Blender se compose de différentes *areas* :

#### 3D Viewport 
![[Cube Blender.png]]

C'est ce qui prends le plus de place de blender et c'est notre scène 3D.

- On peut tourner la caméra avec le `click molette`,
	- On peut se déplacer horizontalement et verticalement avec `shift` + `click molette` (truck & pedestal),
	- Zoomer et dézoomer `scroll molette` (dolly),
		- pour s'affranchir des limites : `shift` + `ctrl` + `click molette`,
	- Pour avoir la caméra fixe mais juste la tourner comme pour regarder autour de sois (comme une tête) il faut passer en walk mode : `shift` + `backquote`,
- Sélectionner un objet avec `click gauche` et en sélectionner plusieurs avec `shift` + `click gauche`,
	- Celui qui aura les contours le plus clair // brillant sera l'objet actif (le dernier sélectionné),
	- Pour revenir sur la sélection précédente `cmd` + `z`,
	- `shift` + `click gauche` pour unselect (si c'est l'objet actif),
	- `a` permets de tout sélection et double `a` tout déselectionner,
	- on peut aussi sélectionner une zone avec `b` et entourer la zone,
	- `c` pour sélectionner en cercle // painting,
- Passer d'une view perspective à une orthographique avec `numpad 5` // icone de terrain quadrillé à droite,
- Passer dans la vue depuis la caméra de notre scène qu'on a placé `numpad 0` // icône de camera à droite,
- Pour retrouver la scène `shift`+ `c`,
- Pour avoir le focus et se rapprocher d'un ou plusieurs objets le sélectionner puis `numpad .` // `numpad ,`,
	- Pour avoir le focus et se rapprocher d'un ou plusieurs objets et cacher les autres éléments non sélectionnés `numpad /`,
- pour ajouter quelques choses à notre scène `shift` + `a`,
- supprimer un objet sélectionner avec `x`,
- dupliquer un objet avec `shift` + `d`,
- cacher un objet sélectionner avec `h` et re-afficher tout les objets avec `opt` + `h`,
	- pour cacher tout les objets non sélectionner `shift` + `h`,

**NB :** Dans blender le top axis est considéré comme étant le **Z** et non le **Y**.

On peut aussi déplacer les objets en les sélectionnant puis :
- `G` pour le déplacer,
	- on peut aussi sélectionner un axe par sa lettre (`x`, `y`, `z`) pour déplacer notre objet uniquement sur cet axe,
		- pour le déplacer sur 2 axes et pas un autre on peut faire `shift` + l'axe qu'on veut exclure,
- `R` pour le tourner (rotation),
	- on peut aussi sélectionner un axe par sa lettre (`x`, `y`, `z`) pour tourner notre objet spécifiquement sur cet axe,
- `S` pour l'agrandir (scale),
	- same ici pour avoir un scale dans une direction précise,

Dans cette vue on peut aussi switcher entre différent mode avec `ctrl` + `tab` :
- Dans le *mode edit* on peut changer les choses qu'on veut déplacer sur notre objet comme :
	- les vertices de notre geometry avec la touche `1` (en haut des lettres),
	- les edges (les arrêtes) avec `2`,
	- les faces avec `3`,
- **NB :** Par défaut on est sur le *object mode*.
	- Quand on veut grossir un objet le faire depuis le *mode edit* plutôt que via le scale classique.

On peut aussi switch sur le mode de *shading* avec `z` où on a 4 options :
- `Solid` : mode par défaut avec le même material pour chaque objets,
- `Material` : comme le `solid` mais avec une preview du material qui sera utilisé sur nos objets,
- `Wireframe`,
- `Renderer` : rendue réaliste en basse qualité (mais moins performants),

**NB :** Pour toggle le menu / pannel a gauche de la viewport on peut appuyer sur `t`

Pour générer un render de notre scène il faut appuyer sur `f12`.

#### Timeline
![[Blender Timeline.png]]

Juste en dessous de notre viewport on a la timeline pour faire des animation.

#### Outliner
![[Blender Scene Collection.png]]

Dans le coin haut droit, c'est notre la structure de notre scène et la liste des objet qui la compose.

On peut :
- Masquer un objet qui la compose avec l'oeil (ce qui va la désafficher de notre viewport),
- Désactiver le rendu de l'objet dans le `renderer` avec l'icône de caméra


#### Properties
![[Blender Properties.png]]

Situé en bas à droite cette area va contenir les informations comme les coordonnées de nos objets, leur rotation, leur scale etc etc et on va pouvoir les tweak depuis cette area.
- Quasiment toutes les propriétés de notre scène et nos objets sont ici et on peut les tweaks.

## Shortcuts

[Blender 2.8 - Shortcuts - Google Docs](https://docs.google.com/document/d/1wZzJrEgNye2ZQqwe8oBh54AXwF5cYIe56EGFe2bb0QU/edit?tab=t.0)

Ce google doc contient pas mal de usefull shortcut à apprendre.