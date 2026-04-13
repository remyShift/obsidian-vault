> [!info]- Tags
> #LangagesDeProgs #ThreeJS #Framework 

Ajouter des lumières à une scène est tout aussi simple que d'y ajouter un mesh. On instantie avec la bonne classe et y ajoute à la scène.

Il existe différentes classes liées aux lights comme :
- **AmbientLight** : qui applique une lumière omnidirectionnelle // qui vient de partout,
	- Ça peut être très utile pour simuler la réflection de la lumière,
	- Lors de son initialisation elle prends 2 paramètres une couleur et une intensité.
```js
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)

// or

const ambientLight = new THREE.AmbientLight()

ambientLight.color = new THREE.Color(0xffffff)
ambientLight.intensity = 0.5
```

- **DirectionalLight** : appliquer une lumière qui vient d'en haut semblable à des rayons de soleils (des rayons parallèles qui viennent depuis le ciel).
	- Tout comme l'`AmbientLight` la `DirectionalLight` à besoin d'un couleur et d'une intensité pour être initialisé,
```js
const directionalLight = new THREE.DirectionalLight()
directionalLight.color = new THREE.Color(0x00fffc)
directionalLight.intensity = 0.3
```
- 
	- Mais on peut aussi changer la direction depuis laquelle elle vient en jouant avec sa position. (*par défaut elle vient depuis tout en haut mais on peut l'incliner*),
		- **NB :** Peut importe où on déplace la lumière elle visera toujours le centre de notre scène.
```js
directionalLight.position.set(1, 0.25, 0)
```

- **HemisphereLight** : Ressemble à l'`AmbientLight` mais avec une couleur venant du ciel et une venant du sol. Ça permets d'avoir un rendu plus réaliste et une impression de réflection de la lumière,
	- La première valeur est la couleur venant du ciel et la deuxième du sol,
	![[HemisphereLight Example.png]]
```js
const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3)
```

- **PointLight** : Permets d'avoir une seule source de lumière venant d'un point infiniment petit, et la lumière se dispersera dans toutes les directions depuis ce point.
	- **NB :** on ne peut pas voir le point lumineux depuis lequel la lumière se disperse.
	- On peut contrôler à partir de quel distance la lumière de notre `PointLight` sera moins efficace pour avoir un rendu plus réaliste car par défaut peu importe la distance la lumière aura la même intensité. On peut faire ça grâce à 2 paramètres :
		- `decay` : à quelle vitesse l'intensité de la lumière diminue,
		- `distance` : à partir de quel distance le decay s'applique
	![[PointLightExample.png]]

```js
const pointLight = new THREE.PointLight(0xff9000, 0.5)
pointLight.position.set(1, - 0.5, 1)
```

- **ReactAreaLight** : l'idée de cette lumière est d'avoir un rectangle qui illumine comme lors d'un shooting photo,
	- Comme toutes les lumières on a besoin d'une couleur et d'une intensité mais aussi des dimensions de notre rectangle (`width`puis `height`),
	- **NB :** Cette lumière ne marche que avec le `MeshStandardMaterial` et le `MeshPhysicalMaterial`.
- ![[ReactAreaLight Example.png]]

```js
const rectAreaLight = new THREE.RectAreaLight(0x4c00ff, 2, 1, 1)
```

- **SpotLight** : Fonctionne comme une lampe torche, on a donc un cone de lumière démarrant à une position qui est orienté dans une certaine direction,
	- Dans l'ordre en paramètre on a besoin de : 
		- `color`, 
		- `intensity`, 
		- `distance` : distance jusqu'à laquelle la lumière est diffusée, 
		- `angle` : angle d'ouverture du cone, 
		- `penumbra` : effet de fade aux extrémités de notre cone, si c'est à 0 il n'y aura pas de transition et d'effet de *fade*, 
		- `decay`,
	- **NB :** pour tourner notre spotlight il faut ajouter sa propriété `target` à la scène sans quoi la spotlight ne bougera pas.
```js
const spotLight = new THREE.SpotLight(0x78ff00, 1.5, 10, Math.PI * 0.1, 0.25, 1)
spotLight.position.set(0, 2, 3)
scene.add(spotLight)

spotLight.target.position.x = - 1.5
scene.add(spotLight.target)
```

### Performances

Les lumières peuvent être assez vite gourmandes en termes de performances.
- Pour ce faire il faut essayer de mettre le moins de lumières que possible et des lumières qui ne sont pas gourmandes en ressources (comme l'`AmbientLight` et l'`HemispherLight`).
	-  Il y a des lumières modérément gourmandes comme la `DirectionalLight` et la `PointLight`,
	- Et pour finir les lumières qui sont très demandeuses en ressources : la `SpotLight` et la `RectAreaLight`,

Une solution est d'intégrer les lumières et ombre dans nos texture pour ne pas avoir à en mettre en ThreeJS pour économiser de la ressource.

### Helpers

Les **Helpers** sont là pour nous aider à positionner les lights, car on ne voit que la projection de lumière mais pas la source en tant que tel.

```js
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)

scene.add(directionalLightHelper)
```

Malgré le fait de mettre de la lumière on n'a pas encore d'[[Shadows|ombres]]. Ce qu'il nous manque c'est les *drop shadows* (les ombres portées des objets).