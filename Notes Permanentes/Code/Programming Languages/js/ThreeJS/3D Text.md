> [!info]- Tags
> #LangagesDeProgs #ThreeJS #Framework 

Pour faire du texte en 3D avec ThreeJS nous devons utiliser la classe `TextBufferGeometry` ainsi qu'un type de font en particulier appelée *typeface*.
- **NB :** On peut convertir la plupart des font en font typeface.

On peut aussi utiliser les fonts fournis par ThreeJS qu'on peut trouver dans `/node_modules/three/examples/fonts/`, on peut ensuite soit les importer directement soit les mettre dans notre dossier `static`.
```js
import typefaceFont from 'three/examples/fonts/helvetiker_regular.typeface.json'
```

Mais tout comme les textures on a accès à un loader dédié pour importer/load notre font `FontLoader`.

```js
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry} from 'three/examples/jsm/geometries/TextGeometry.js'

const fontLoader = new FontLoader()

fontLoader.load(
	'/fonts/helvetiker_regular.typeface.json',
	(font) => {
		const textGeometry = new TextGeometry(
			'Hello Three.JS',
			{
				font: font,
				size: 0.5, // taille de la font
				depth: 0.2, // profondeur de la font
				curveSegments: 12,
				bevelEnabled: true, // active les bords arrondit
				bevelThickness: 0.03, // gere l'épaisseur des bords arrondis
				bevelSize: 0.02, // leur taille
				bevelOffset: 0, // leur décalage
				bevelSegments: 5 // en combien de segments ils sont découpés
			}
		)
	}
)
```

Ceci nous permets d'avoir un texte en 3D (dans notre cas *Hello Three.JS*) avec un `bevel` qui est un effet de bord arrondi.
- `bevelThickness` : Contrôle l’**épaisseur du chanfrein** vers l’intérieur. Plus la valeur est grande, plus la transition entre le bord extérieur et la face du texte est prononcée.
- `bevelSize` : Définit à quel point le chanfrein **déborde vers l’extérieur** du contour du texte. Cela donne du relief visible sur les arêtes du texte.
- `bevelOffset` : Décale le chanfrein **vers l’intérieur ou l’extérieur**. C’est comme un ajustement de position du biseau par rapport au contour du texte d’origine.
- `bevelSegments` : Le **nombre de segments** utilisés pour créer le chanfrein, ce qui influe sur sa **douceur**. Plus la valeur est élevée, plus le biseau sera lisse.

Le soucis qu'on a est que notre text est pas centré. On peut dans un premier temps s'afficher les axes pour nous aider à le centrer.
```js
const axesHelper = new THREE.AxesHelper()  

scene.add(axesHelper)
```

Par le centrer permets j'entends **redéfinir** son centre, pour que si à terme on a envie de faire des rotations, ses dernières soient autour d'un axe bien placé (plutôt que juste décaler notre mesh).
- Pour ce faire on va utiliser le **bounding** de notre texte.
	- Le **bounding** est l'information associé à l'espace pris par notre geometry. Ça permets à ThreeJS de savoir quels objets sont visible et doivent être calculés / affichés.
		- **NB :** Par défaut ThreeJS utilise une sphère en tant que bounding.
- Pour avoir accès à la bounding box de notre objet il nous faut la calculer :
```js
const textGeometry = new TextGeometry(
	debugObject.text,
	debugObject.textParameters
)

textGeometry.computeBoundingBox();
```

Plutôt que de déplacer le mesh on va déplacer la geometry avec `translate(...)`.
```js
textGeometry.translate(
	- textGeometry.boundingBox.max.x / 2,
	- textGeometry.boundingBox.max.y / 2,
	- textGeometry.boundingBox.max.z / 2
)
```

Le `-` est parce qu'on déplace de la moitié de la longueur sur chaque axe. Néanmoins ça ne l'est pas totalement à cause des `bevel`, plus précisément à cause du `bevelThickness` et `bevelSize` qui nous rajoute une épaisseur non prise en compte dans la bounding box.

```js
textGeometry.computeBoundingBox();
textGeometry.translate(
	- (textGeometry.boundingBox.max.x - debugObject.textParameters.bevelSize) / 2,
	- (textGeometry.boundingBox.max.y - debugObject.textParameters.bevelSize) / 2,
	- (textGeometry.boundingBox.max.z - debugObject.textParameters.bevelThickness) / 2
)
```

Sinon on peut juste utiliser la méthode `.center()` qui le fait pour nous.
```js
textGeometry.center()
```

