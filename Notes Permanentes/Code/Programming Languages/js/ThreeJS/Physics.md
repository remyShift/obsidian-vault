---
tags:
  - LangagesDeProgs
  - ThreeJS
---

On pourrait se coder la physique à la main et faire nous même nos calculs etc, mais si on veut un résultat plus réaliste avec de la friction, de la tension, des contraintes etc etc c'est plus pratique d'utiliser une librairie.

Mais il faut déjà comprendre comment marche la physique :

- Le principe est d'avoir une réplique de notre scène 3D non visible à laquelle la physique est existante (gérée par la librairie) et où sur chaque frame la position de nos objets s'update. Il nous reste plus qu'à prendre la position de notre objet update du rendu avec physique pour l'appliquer dans notre scène threejs.

Il faut se demander dans un premier temps si on a besoin d'un librairie **3D** ou **2D**, sachant que de la **2D** sera moins gourmandes en performances et si on a l'occasion de le faire c'est souvent la meilleure solution.

En **3D** on a le choix entre `Ammo.js` (la plus utilisée), `Cannon.js` (plus facile à implémenter et comprendre), `Oimo.js` et en **2D** `Matter.js`, `P2.js`, `Planck.js`, `Box2D.js` … plein d'autres sur le net.

On va donc utiliser **Cannon.js** !

```
npm i --save cannon
```

```js
import CANNON from 'cannon'
```

On va donc ensuite créer notre *physic world* :

```js
const world = new CANNON.World()
```

Il nous faut maintenant ajouter la gravité car pour le moment nous avons seulement un autre monde sans rien de plus.

```js
world.gravity.set(0, -9.82, 0);
```

**NB :** dans ce cas la gravité est un vec3 et `9.82` est une approximation de la constante de gravité.

- vec3 = cannonjs || vecteur3 = threejs

Il faut désormais ajouter les objets qu'on a dans notre rendu ThreeJS dans notre `world` ainsi crée.

- Contrairement au rendu ThreeJS composé de mesh, le `world` CANNON sera lui composé de `Body`.
	- Un `body` est un objet qui peut tomber et rentrer en collision avec les autres `body`.

Tout comme le `Mesh` a besoin d'un `Geometry` en ThreeJS le `Body`lui a besoin d'une `Shape`.

```js
const sphereShape = new CANNON.Sphere(0.5) // meme radius que notre sphere sur le rendu threejs
```

Une fois qu'on a la shape on peut créer notre `Body` sans oublier de l'ajouter à notre `world` :

```js
const sphereBody = new CANNON.Body({
	mass: 1,
	position: new CANNON.Vec3(0, 3, 0),
	shape: sphereShape
})

world.addBody(sphereBody)
```

**NB :** `mass: 0` veut dire que l'objet est statique, utile pour un sol, mur …

Pour update notre `world` ainsi créer il va nous falloir utiliser la méthode `step` qui prends 3 paramètres, dans notre tick function :

```js
world.step(
	1/60, // Une fréquence d'images
	deltaTime, // Delta entre le tick actuel et l'ancien
	3 // ?
)
```

Une fois que notre `world` s'actualise bien on peut appliquer les coordonnées de notre `bodySphere` à la sphère de notre rendu ThreeJS :

```js
sphere.position.x = sphereBody.position.x
sphere.position.y = sphereBody.position.y
sphere.position.z = sphereBody.position.z

// Ou plus simplement :

sphere.position.copy(sphereBody)
```

On peut ensuite ajouter le sol pour éviter que la sphere tombe à l'infinis :

```js
const floorShape = new CANNON.Plane() // NB : le plane ici est infinis et n'a pas besoin de longueur

const floorBody = new CANNON.Body()
floorBody.mass = 0
floorBody.addShape(floorShape)

floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(-1, 0, 0), Math.PI * 0.5)

world.addBody(floorBody)
```

## Appliquer une force

Maintenant qu'on a une environnement soumis à la physique, on veut appliquer des forces sur nos différents objets qui le compose afin de les déplacer et interragir avec.

Pour ce faire on a différentes méthodes qui viennent avec `CannonJS` :

- `applyForce` : applique une force depuis un point précis du rendu avec de la physique, pas forcément depuis ou sur la surface d'un `body`,
- `applyImpulse` : comme le précédent mais plutôt que d'ajouter de la force on ajoute de la vélocité,
- `applyLocalForce` : ce coup ci la force sera appliqué depuis le centre d'un `Body`,
- `applyLocalImpulse` : comme le précédent mais avec de la vélocité,

```js
sphereBody.applyLocalForce(new CANNON.Vec3(150, 0, 0), new CANNON.Vec3(0, 0, 0))
```

- 1er paramètres la direction dans laquelle pousser (+ la valeur sera élevé plus l'intensité le sera),
- 2nd paramètre depuis où pousser (0,0,0 étant le centre du body dans le cas de localforce)

```js
sphereBody.applyForce(new CANNON.Vec3(-0.5, 0, 0), sphereBody.position)
```

## Optimisation

```js
world.broadphase = new CANNON.SAPBroadphase(world)

world.allowSleep = true
```

Permets de changer le système de calcul de collision de `CannonJS`, car par défaut à chaque nouvelle objet ajouté et en permanence il va calculer si les objets sont en collisions tous entre eux peu importe la distance.

---

On peut aussi se faire un bouton pour reset et supprimer les objets dans nos 2 mondes :

```js
debugObject.reset = () => {
	for(const object of objectsToUpdate) {
		object.body.removeEventListener('collide', playHitSound)
		world.removeBody(object.body)

		scene.remove(object.mesh)
	}

	objectsToUpdate.splice(0, objectsToUpdate.length)
}
```

**NB :** Ne pas oublier de retirer l'event listener.
