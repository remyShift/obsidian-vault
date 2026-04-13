Environment map est une image de ce qui entoure notre scène, ça permets d'ajouter de la réflection, réfraction et de la lumière à nos objets en plus de nos actuels `DirectionLight`et `AmbientLight`.
- Ça peut aussi servir uniquement en tant que background.

```js
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
```

**NB :** Une grosse environment map peut influer sur les performances.

L'environment map est compatible avec le **MeshLambertMaterial** et le **MeshPhongMaterial**.

Il existe 2 moyens de loads notre environment map et ça dépends de comment on l'a télécharger :

- En tant que cube texture :
```js
const cubeTextureLoader = new THREE.CubeTextureLoader();

const environmentMap = cubeTextureLoader.load([
	'/environmentMaps/0/px.png',
	'/environmentMaps/0/nx.png',
	'/environmentMaps/0/py.png',
	'/environmentMaps/0/ny.png',
	'/environmentMaps/0/pz.png',
	'/environmentMaps/0/nz.png',
]);

scene.background = environmentMap;
scene.environment = environmentMap;
```

- En tant que fichier hdr :
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
- HDR = High Dynamic Range --> plus d'informations sur chaque pixel de notre image donc meilleur rendu,
	- RBGE = Red Blue Green Exponent --> exponent = la luminosité,
		- RBGE = Version encodé de HDR,
	- assez lourd à charger et à render
		- Pour régler ça on peut load plutôt une plus petite résolution que du 2k,

- En tant que fichier JPEG :
```js
const environmentMap = textureLoader.load(
	'/environmentMaps/blockadesLabsSkybox/example.jpg'
);

environmentMap.mapping = THREE.EquirectangularReflectionMapping;
environmentMap.colorSpace = THREE.SRGBColorSpace;

scene.background = environmentMap;
```

---

On peut tweak différentes propriétés sur notre environment map comme :
- l'intensité de la lumière de notre environment map et donc la réflection sur nos objets avec :
```js
scene.environmentIntensity = 4;
gui.add(scene, 'environmentIntensity')
	.min(0)
	.max(10)
	.step(0.001)
	.name('Environment Intensity');
```
- l'effet de blur du background :
```js
scene.backgroundBlurriness = 0;

gui.add(scene, 'backgroundBlurriness')
	.min(0)
	.max(1)
	.step(0.001)
	.name('Background Blurriness');
```
- l'éclairage / la luminosité du background :
```js
scene.backgroundIntensity = 1;

gui.add(scene, 'backgroundIntensity')
	.min(0)
	.max(10)
	.step(0.001)
	.name('Background Intensity');
```
- la rotation de notre environment map sur l'axe qu'on veut :
```js
gui.add(scene.environmentRotation, 'y')
	.min(0)
	.max(Math.PI * 2)
	.step(0.001)
	.name('Environment Rotation');

gui.add(scene.backgroundRotation, 'y')
	.min(0)
	.max(Math.PI * 2)
	.step(0.001)
	.name('Background Rotation');
```
**NB :** `environmentRotation` va tourner l'éclairage de la scène tandis que `backgroundRotation`va tourner l'image de fond.

---

Blender est aussi très bien pour faire des environment maps.

Dans un premier temps il faut changer le mode de rendu de notre scène est bien être sur `Cycles` ainsi que réduire le `samples` du viewport et du render :
![[Pasted image 20250608111616.png]]
**NB :** les `samples` sont le nombre de rayons qui sont envoyé pour tester les couleurs.

Dans la section `World` il faut changer la couleur de la surface pour qu'elle soit noir // qu'il n'y en ait pas, sinon on aura une scène / un rendu un peu teinté :
![[Pasted image 20250608111956.png]]

Puis on va changer la résolution de notre output :
![[Pasted image 20250608112110.png]]

Une fois qu'on a ajouté un peu tout autour du centre on peut ajouter notre caméra pour tester et pour la placer comme il faut, on peut appuyer sur `N` après l'avoir ajoutée pour ouvrir ce menu et choisir les valeurs qu'on veut :
![[Pasted image 20250608113436.png]]

Dans l'area des propriétés on peut ensuite changer le type de la caméra sur `panoramic` ainsi que le panorama type sur `equirectangular` :
![[Pasted image 20250608113538.png]]

Après avoir ajouté une lumière à notre scène et l'avoir rendu visible sur le render on peut générer notre rendu final avec `F12`.

Une fois le rendu fins on peut le sauvegarder où on veut avec `opt` + `s`, lors de la sauvegarde il faut bien choisir le format comme HDR :
![[Pasted image 20250608114721.png]]

Et on peut ensuite l'utiliser dans notre code comme environment map !
