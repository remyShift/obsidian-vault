> [!info]- Tags
> #LangagesDeProgs #ThreeJS #Framework 

Un **Raycaster** est un rayon envoyé dans une direction précise et va tester quels objets il va traverser ainsi. Ça permets différentes choses :
- Savoir si il y a un mur en face d'un joueur,
- Tester si un laser gun touche quelques choses,
- Tester si quelques choses et survolé par la souris,
- Avoir un message d'alerte si le vaisseau se rapproche trop proche d'une planète,
- ...

Pour créer notre **raycaster** on peut juste l'instancier comme tel étant une classe par défaut de ThreeJS :
```js
const raycaster = new THREE.Raycaster()
```

Étant un rayon qui parcours une direction il a besoin d'une origine et de cette fameuse direction :
```js
const rayOrigin = new THREE.Vector3(-3, 0, 0)
const rayDirection = new THREE.Vector3(10, 0, 0)
rayDirection.normalize()

raycaster.set(rayOrigin, rayDirection)
```

**NB :** `rayDirection` a besoin d'être normalisé donc il ne faut pas oublier de le faire.

On peut désormais appeler :
- `intersectObject` pour tester si notre **raycaster** le traverse (*l'objet passé en paramètre*) :
```js
const intersect = raycaster.intersectObject(object2)
```
Si `object2` est traversé par notre `raycaster` on aura donc accès à un tableau d'objets avec différentes propriétés. Ces derniers représentent le nombre de fois que notre `raycaster` à traversé notre objet.

- `intersectObjects` pour tester si notre **raycaster** LES traverse (*les objets du tableau passé en paramètres*) :
```js
const intersects = raycaster.intersectObjects([object1, object2, object3])
```
Pour chaque objet qui seront traversés on aura le même objets que `intersect`.

Cet objet contient différentes informations comme :
- `distance` : distance entre l'origine du `raycaster` et le point de collision,
- `face` : quel face de la geometry est touché par notre rayon,
- `faceIndex` : l'index de cette face,
- `object`: quel objet est concerné par la collision,
- `point` : un **Vector3** du point exact de la collision entre le rayon et notre objet,
- `uv` : les coordonnées UV de la collision sur notre geometry,

**NB :** le raycaster est quelques choses d'assez lourd en terme de performances il faut donc avoir en tête de le faire le moins de fois possible.

## Mouse Event and Raycaster

Avec les **raycaster** on peut aussi tester si avec notre souris nous sommes en train de survoler des objets en particuliers. Pour ce faire il faut avoir les coordonnées de notre souris.
- Mais pas en pixel comme on pourrait le récupérer avec le mouseEvent et le client. Il nous faut des valeurs qui vont de -1 à 1 sur l'axe horizontale et verticale.

```js
const mouse = new THREE.Vector2();

window.addEventListener('mousemove', (event) => {
	mouse.x = (event.clientX / sizes.width) * 2 - 1;
	mouse.y = -(event.clientY / sizes.height) * 2 + 1;
});
```

**NB :** C'est un `Vector2` car c'est seulement les coordonnées sur 2 axes qu'on veut.

Pour ensuite savoir si notre `mouse` survole un objet sur ce plan 2D on peut faire en sorte que notre `raycaster` soit envoyé depuis notre camera donc depuis notre POV :

```js
raycaster.setFromCamera(mouse, camera);

const intersects = raycaster.intersectObjects([object1, object2, object3]);

allObject.forEach((object) => {
	object.material.color.set('#ff0000');
});

intersects.forEach((intersect) => {
	intersect.object.material.color.set('#000fff');
});
```

Ainsi dès qu'on survole un objet de notre scène avec notre curseur il passera en bleu sinon il sera rouge.

On peut aussi retrouver le comportement d'un `mouseEnter` et `mouseLeave` pour avoir l'information de quand notre curseur rentre sur l'objet et quand il le quitte :
```js
if (intersects.length) {
	if ((currentIntersect === null)) {
		console.log('mouse enter');
	}
	currentIntersect = intersects[0];
} else {
	if (currentIntersect) {
		console.log('mouse leave');
	}
	currentIntersect = null;
}
```
 **NB :** En ayant cette partie dans notre fonction tick et en déclarant notre `currentIntersect` à l'extérieur de cette dernière.

On peut aussi avoir l'information de si on a cliqué sur un objet :
```js
window.addEventListener('click', () => {
	if (currentIntersect) {
		console.log('click on a sphere');
	}
});
```

On peut aussi utiliser `raycaster` sur des [[Import Modèle]].
