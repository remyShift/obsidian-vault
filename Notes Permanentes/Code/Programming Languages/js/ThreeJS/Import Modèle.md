> [!info]- Tags
> #LangagesDeProgs #ThreeJS #Framework 

Les modèles permettent d'avoir accès à des formes plus complexes que juste des cubes et des sphères.
- On peut soit faire nous même nos propres modèles sur un logiciel 3D soit utiliser des modèles déjà fait qu'on importe.

Il existe différents type de format pour avoir les fichiers de modèles 3D et ça dépends grandement des besoins qu'on a, que ça soit en terme de poids de fichier, de données stockées, etc ...
- Un des plus populaires et plus utilisé c'est le **GLTF** (et même au sein de ce dernier on a différents formats).

Pour utiliser un modèles 3D avec des fichiers GLTF il nous faut commencer par importer le loader et instancier le loader :
```js
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const gltfLoader = new GLTFLoader()
```

On peut ensuite load nos modèles :
```js
gltfLoader.load(
	'/models/Duck/glTF/Duck.gltf',
	(gltf) => {
		console.log(gltf, 'success')
	},
	(progress) => {
		console.log(progress, 'progress')
	},
	(error) => {
		console.log(error, 'error')
	}
)
```

**NB :** tout comme le texture loader on a accès à 4 paramètres :
- le path du fichier à load,
- 3 fonction de callback pour respectivement : le cas de `success` de load, le `progress` et l'`error`

Pour l'ajouter dans notre scène ensuite on a plusieurs options comme ajouter uniquement l'objet 3D en tant que tel avec toutes les infos qu'il contient (comme la scale appliquées sur l'objet mais aussi la position etc etc ) :

```js
gltfLoader.load(
	'/models/Duck/glTF/Duck.gltf',
	(gltf) => {
		console.log(gltf, 'success')
		scene.add(gltf.scene.children[0])
},
```

---

Comme dit précédemment au sein même de GLTF on a différents format de fichier comme le `Draco` qui est une version bien plus compressé, légère et donc plus optimisée.

Pour l'utiliser tout comme le GLTF il nous faut son loader :

```js
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/') // Permets d'optimiser le decodage grace a web assembly || ce dossier viens de `nodes_modules/three/examples/jsm/libs/draco` et nécessite de copier coller le dossier draco dans notre dossier static
```

On peut ensuite dire à notre `gltfLoader` d'utiliser le `dracoLoader` ainsi crée :
```js
const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)
```

Le fait d'utiliser le draco loader et les fichiers compressé ainsi n'est pas forcément une situation win-win.
- On doit load la classe `DracoLoader`,
- On doit load le dossier `/draco/`,
- Le fait de décompresser des fichiers compressés est assez lourd pour notre ordi,

On load beaucoup de choses pour peu d'optimisation car dans notre cas les fichiers restent relativement léger.

Ça dépends du projet et objectifs de rendu et performances de ce dernier.

### Animate Model

Dans les données GLTF on a justement une propriété `animation` qui est un tableaux de plusieurs `AnimationClip` pour chaque animation.

Pour les utiliser il nous faut utiliser un `AnimationMixer` qui va agir comme un *player* :
```js
mixer = new THREE.AnimationMixer(gltf.scene)
```

On peut maintenant prendre notre *clip* (// `AnimationClip`) et l'ajouter à notre *player* (// `mixer`) ce qui nous donne une *action* --> `AnimationAction` :
```js
const action = mixer.clipAction(gltf.animations[0])
```

Ce qui nous donne accès à une méthode `play` :
```js
action.play()
```

Il faut maintenant dans notre tick function dire au mixer de s'update sur notre delta time :
```js
if (mixer) {
	mixer.update(deltaTime)
}
```

full example :

```js
let mixer = null

gltfLoader.load(
	'/models/Fox/glTF/Fox.gltf',
	(gltf) => {
		console.log(gltf, 'success')
		gltf.scene.scale.set(0.025, 0.025, 0.025)
		scene.add(gltf.scene)

		mixer = new THREE.AnimationMixer(gltf.scene)
		const action = mixer.clipAction(gltf.animations[1])
		action.play()
	},
	(progress) => {
		console.log(progress, 'progress')
	},
	(error) => {
		console.log(error, 'error')
	}
)
```

---

On peut aussi [[Custom Models|créer nos propres modèles 3D]].