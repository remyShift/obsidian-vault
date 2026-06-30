---
tags:
  - LangagesDeProgs
  - ThreeJS
---

`Camera` est une classe abstraite dont on a pas besoin d'utiliser. Toutes les cameras de ThreeJS hériteront de celle-ci, comme :

- `ArrayCamera` qui permets de render la scène depuis plusieurs cameras sur des portions spécifiques du render,
- `StereoCamera`qui permets de render la scène à travers 2 caméras qui vont mimer des yeux pour créer un effet de profondeur / parallax ==> très utile pour de la VR,
- `CubeCamera` qui va faire 6 renders où chacun va faire face à une direction différente, ce qui va permettre de créer des map d'environnement, de la reflection, refraction, shadows etc,
- `OrthographicCamera` render la scène mais sans perspective / sans profondeur,
- `PerspectiveCamera` au contraire celle ci render la scène avec de la profondeur / perspective,

## PerspectiveCamera

La `PerspectiveCamera` utilise différents paramètres, dans l'ordre on a :

- **le FOV (Field Of Vue)** : Exprimé en degrés c'est ce qui correspond à l'ouverture verticale du champ de vision ↕️, **NB :** le fov peut créer de la distortion si il n'est pas approprié (entre 45 et 75 c'est suffisant en général),
- **Aspect Ratio** : c'est la width de notre render divisé par sa height mais ça peut changer dans des situations bien spécifiques,
- **Near and Far** : c'est 2 valeurs représentent la range dans laquelle les éléments seront visibles ==> un objet inférieur au near ne sera pas visible et un objet supérieur au far non plus,

```js
const camera = new THREE.PerspectiveCamera(
	75,
	sizes.width / sizes.height,
	0.1,
	100
);
```

## OrthographicCamera

À la différence de la `PerspectiveCamera` les objets observés par la `OrthographicCamera` auront toujours la même taille peu importe la distance avec la caméra.

Elle prends aussi différents paramètres qui dans l'ordre sont Left, Right, Top et Bottom qui définisse la taille du "carré" / de la "box" dans laquelle on observera nos objets.

- Cette caméra prends aussi un Near et un Far.

```js
const aspectRatio = sizes.width / sizes.height;
const camera = new THREE.OrthographicCamera(
	-1 * aspectRatio,
	1 * aspectRatio,
	1,
	-1,
	0.1,
	100
);
```

## Camera Controls

ThreeJS a des contrôles built-in pour déplacer la caméra :

- **Device Orientation Controls** : permets de trouver l'orientation de notre device et adapter notre caméra à cette dernière (si notre OS / browser l'autorise),
	- Permets de créer des expériences immersives notamment pour de la VR,
- **Fly Controls** : permets de bouger la caméra comme si on était dans un avion / vaisseau spacial.
	- On peut tourner autour des 3 axes, avancer et reculer,
- **First Person Controls** : permets de faire comme le fly controls mais avec un axe `y` de verrouillé,
	- ⚠️ Ne fonctionne pas comme une vue FPS,
- **Pointer Lock Controls** : utilise la `pointer lock Javascript API` --> permets de déplacer la caméra en fonction du pointer,
- **Orbit Controls** : permets de bouger la caméra en fonction de du *grab* de la souris,
	- On ne peut dépasser le sol, et le ciel // faire de 360 vertical,
	- *Exemple below*,
- **TrackBall Controls** : fonctionne comme la Orbit Controls mais sans de limite d'angle,
- **Transform Controls** : permets de déplacer les objets sur des axes comme dans un éditeur,
	- N'a rien à voir avec la caméra,
- **Drag Controls** : permets de déplacer des objets en les grabbant sur une surface plane,
	- N'a rien à voir aussi avec la caméra,

Pour utiliser Orbit Controls il faut déjà l'importer :

```js
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
```

Ensuite pour l'utiliser lors de son instantiation il faut lui donner en paramètre la caméra à update et notre canva / un élément de notre page où écouter les événements de la souris :

```js
const controls = new OrbitControls(camera, canvas);
```

Ensuite on peut ajouter du **Damping** qui va reproduire un effet d'accélération / friction ==> un contrôle plus smooth :

```js
controls.enableDamping = true;
```

et pour être sur que ça se mette bien à jour il faut update notre `controls` dans notre fonction `tick` :

```js
controls.update();
```
