---
tags:
  - LangagesDeProgs
  - ThreeJS
---

Notre objet camera et notre objet mesh hérite de la classe `Object3D` en ThreeJS, ce qui veut dire qu'on a plusieurs possibilitées pour les transformer au travers de ces propriétés :

- `position`
	- ~ des vecteurs de positions (`vector3`),
		- l'axe x (horizontal) || l'axe y (vertical) || l'axe z (la profondeur),
		- on peut `set` en une fois la position de ces "vecteurs",
Ex :

```js
mesh.position.set(x, y, z);
```

- De plus une autre méthode utile est `normalize` que nos vecteurs aient une taille de 1,
- On peut aussi aussi récupérer la distances entre 2 objets (2 `Object3D`) grâce à `distanceTo`,
Ex :

```js
mesh.position.distanceTo(camera.position);
```

- Un point de pain est que le fait de représenter des objets dans l'espaces sans voir les axes est un peu compliqué mais on peut afficher les différents axes avec `AxesHelper` :

```js
const axesHelper = new THREE.AxesHelper(axesSizeHereIfNeeded);
// dont forget to add it to the scene
scene.add(axesHelper);
```

- `scale`
	- aussi gérer et définis par des `vector3` et nos axes,
		- par défaut la valeur est de 1 pour chaque axes
		- étant donné que ces un `vector3` comme position on a accès aux même méthodes (`set`, `normalize` …)

- `rotation` & `quaternion` :
	- tout comme les autres ils sont gérer par des `vector3`
		- il faut penser à sur quelle axe on veut faire la rotation et étant donné que les axes peuvent bouger dans l'espace on peut être amener à avoir des comportements non voulus si on continue à se baser sur des axes qui sont dans l'ordre par défaut
			- c'est pourquoi on peut utiliser `reorder` pour changer l'ordre des axes pour avoir une rotation plus cohérente
Ex :

```js
mesh.rotation.reorder('YXZ');
```

- pour faire une moitié de tour c'est avec `Math.PI` et c'est ce sur quoi on va se baser pour faire nos rotations,
- lorsqu'on update `rotation` on update aussi `quaternion` ils sont liés car ils gèrent tout les deux la rotation néanmoins `quaternion` est une manière plus mathématique de gérer la rotation.

Ces propriétés sont ensuite compilées dans des **matrices**.

De plus sur les `Object3D` on peut aussi utilisé `lookAt` pour diriger le facing / par exemple sur quoi le centre de la caméra doit être aligné :

```js
// Dans ce cas le centre de la caméra sera le centre de notre mesh
camera.lookAt(mesh.position)
```

Aussi on peut créer des `Group` qui sont des regroupement d'objets afin de les repositionner plus facilement étant donné que `Group` hérite aussi de `Object3D`.

Ex :

```js
const group = new THREE.Group()
scene.add(group);

const cube1 = new THREE.Mesh(
	new THREE.BoxGeometry(1, 1, 1),
	new THREE.MeshBasicMaterial({ color: 'red'})
)

cube1.position.set(0.6, 0.6, 0);
group.add(cube1);

const cube2 = new THREE.Mesh(
	new THREE.BoxGeometry(1, 1, 1),
	new THREE.MeshBasicMaterial({ color: 'green'})
)

cube2.position.set(-0.6, 0.6, 0);
group.add(cube2);

const cube3 = new THREE.Mesh(
	new THREE.BoxGeometry(1, 1, 1),
	new THREE.MeshBasicMaterial({ color: 'blue'})
)

cube3.position.set(0, -0.6, 0);
group.add(cube3);

// A partir de la on peut deplacer tout notre groupe (donc nos 3 cubes) plus simplement que le faire 1 par 1

group.scale.set(0.5, 0.5, 0.5);
```
