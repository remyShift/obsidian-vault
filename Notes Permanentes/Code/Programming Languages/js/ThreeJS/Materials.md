---
tags:
  - LangagesDeProgs
  - ThreeJS
---

Les **Materials** servent a mettre de la couleur sur chaque *pixel* visible de notre `geometry`. Les algos qui permettent de calculer et savoir quelle couleur mettre sur chaque pixel sont appelés **shaders**.

- ThreeJS vient déjà avec plusieurs **shaders** built-in.

Ils existent de nombreux `materials` différents comme :

- **MeshBasicMaterial** : le material le plus basique qui dispose de plusieurs options,
	- `map` : qui permets d'appliquer une texture comme une "carte" et donc qui risque d'être étiré si la geometry ne correspond pas,
	- `color` : qui applique une couleur de manière uniforme sur toutes les faces,
		- **NB :** on peut combiner `color` et `map` pour teinté le `map`.
	- `wireframe` : permets de voir les triangles qui composent un `geometry` avec une ligne d'1px
	- `opacity` & `transparent` : pour jouer avec l'opacité (valeur allant de 0 à 1) de notre material il faut d'abord set la `transparent` sur `true`,
	- `alphaMap` : permets d'utiliser des textures alpha,
	- `side` : permets d'afficher au besoins chaque face séparément d'un `geometry` ou les 2 en même temps avec `THREE.Front/Back/DoubleSide`,
		- **NB** : par défaut les textures load sont en `FrontSide` sauf celles export de blender qui seront en `DoubleSide`.
	- **NB** : la plupart de ces propriétés sont communes à tout les `material` / la plus part.
- **MeshNormalMaterial** : lié à la texture *normal* et est très utile pour debuger les *normals*.
	- Les *normals* sont des informations encodées dans chaque vertex de notre geometry permettant de savoir dans quel direction part chaque vertex et la couleur permets est affichée selon lesquels sont face caméra || lesquels sont à l'extérieur. C'est notamment util pour calculer comment la lumière va interagir avec notre geometry.
	- `flatShading` : qu'on peut mettre sur `true` pour avoir une surface plate,
- **MeshMatcapMaterial** : ce material nous permets d'avoir un super résultat en plus d'être très performant. Pour fonctionner il a besoin d'une texture ressemblant à une sphère et va en fonction des *normals* de notre `geometry` prendre les bonnes couleurs de pixel de la texture fournit en fonction de l'orientation par rapport à la caméra.
	- **NB** : permets de donner une illusion de lumière dans une scène mais ça reste une illusion, la lumière proviendra toujours de la caméra --> une solution à ça est de bloquer la rotation de la caméra à l'utilisateur.
	- `matcap` : qui est la propriété permettant d'appliquer la texture,
- **MeshDepthMaterial** : permets d'avoir un rendu différent de notre texture selon si on est proche ou loin de la caméra,
- **MeshLambertMaterial** : le premier et le plus performant material qui a besoin de lumière ! Il a les même propriétés que le `MeshBasicMaterial` mais à aussi des propriétés liées aux lumières,
- **MeshPhongMaterial** : fonctionne un peu comme le `MeshLambertMaterial` mais est moins performant tout en permettant d'avoir accès à plus de features,
	- `shininess` : permets de controller l'intensité de la réflection de la lumière,
	- `specular` : permets de controller la couleur de réflection,
- **MeshToonMaterial** : Il ressemble au `MeshLambertMaterial` au niveau de ses propriétés mais un style plus "cartoon".
	- `gradientMap` : On a par défaut 2 parts de colorées, une pour l'ombre et l'autre pour le côté éclairé. Néanmoins on peut ajouter plus de part avec `gradientTexture` sur la propriété `gradientMap`.
		- **NB :** ne pas oublier le mipmapping avec `min et magFilter` à set sur `Three.NearestFilter` et de le désactiver avec `gradientTexture.generateMipmaps = false` pour réduire la charge sur notre GPU.
- **MeshStandardMaterial** : Utilise un rendu physiquement basé sur les *PBR* (cf textures). Il réagit aux lumières de manière plus réaliste utilisant des algos pour et de meilleurs paramètres comme la *roughness* et la *metalness*.
	- **NB :** il est appelé *standard* car le PBR est devenu un standard aujourd'hui dans la plupart des logiciels / libraries. Ça permets qu'avec les mêmes inputs d'entrée on à le même résultat de sortie peu importe le logiciel.
	- Sans lumière on ne peux rien voir.

```js
const material = new THREE.MeshStandardMaterial();
material.side = THREE.DoubleSide
material.metalness = 0.45
material.roughness = 0.65

gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material, 'roughness').min(0).max(1).step(0.0001)
```

- **MeshPhysicalMaterial** : C'est la même chose que le **MeshStandardMaterial** mais car c'est une version étendu de ce dernier avec plus de propriétés :
	- `clearcoat` : simule une couche ultra fine de *vernis* sur notre material. Il a ses propres propriétés de réflection.
		- **NB :** assez mauvais niveau performances.
	- `sheen` : éclaire le material quand il est vu depuis un angle étroit. Permets d'avoir un effet *fluffy* sur des "fabric textures".
	- `iridescence` : permets de créer des artéfacts de couleurs comme lorsque de l'essence coule sur le sol etc.
	- `transmission` : permets de faire en sorte que les lumières passent à travers notre material mais plus détaillé que juste de la transparence avec l'opacité car les objets / environnement derrière notre objet seront déformés.
	- **NB :** IOR = **I**ndex **O**f **R**efraction et il dépends sur le type de material que je veux simuler. (Diamant = 2.417 // Eau = 1.333 // Air = 1.000293). De plus ce mesh est le pire en terme de performances.

## Environment map

Environment map est une image de ce qui entoure notre scène, ça permets d'ajouter de la réflection, réfraction et de la lumière à nos objets en plus de nos actuels `DirectionLight`et `AmbientLight`.

```js
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
```

**NB :** Une grosse environment map peut influer sur les performances.

```js
const rgbeloader = new RGBELoader();

rgbeloader.load('/textures/environmentMap/2k.hdr',
	(environmentMap) => {
		environmentMap.mapping = THREE.EquirectangularReflectionMapping

		scene.background = environmentMap
		scene.environment = environmentMap
	}
)
```

L'environment map est compatible avec le **MeshLambertMaterial** et le **MeshPhongMaterial**.

Plus d'info ici [[Environment map]].
