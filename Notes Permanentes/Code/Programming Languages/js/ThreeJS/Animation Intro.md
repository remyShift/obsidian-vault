---
tags: [LangagesDeProgs, ThreeJS, Framework]
---

Faire de l'animation en ThreeJS est comme faire du *stop motion* --> les animations seront 60 images qui se succéderont en 1 seconde (// FPS | fréquence gérer par notre ordinateur)
- Le but est que nos animations soient les mêmes peu importe le framerate.
- On a besoin donc de render nos objets et camera sur chaque frame, ce qui va nous être permis grâce à `window.requestAnimationFrame()`.
	- **NB :** Cette fonction va exécuter une callback sur la prochaine frame uniquement, il faut donc un peu de recursion pour avoir une boucle infini qui s'exécute toutes les ms.

```js
// Animation

const tick = () => {
	console.log('tick');

	// Update Object
	mesh.rotation.y += 0.01;
	mesh.rotation.x += 0.01;

	// Render
	renderer.render(scene, camera);

	// Recursion pour avoir une animation sur notre framerate
	window.requestAnimationFrame(tick);
};

tick();
```

⚠️ Le problème ici est que plus un ordinateur aura un framerate élevé plus l'animation sera rapide.
- Pour pallier à ça on va utiliser la différence entre le temps de la première frame avec celle qui suis afin de multiplier ce delta avec la valeur par laquelle on va déplacer nos objets et donc lisser la vitesse d'animation indépendamment du framerate.

```js
// Animation

let time = Date.now()

const tick = () => {
	console.log('tick');

	// Time
	const currentTime = Date.now();
	const deltaTime = currentTime - time;
	time = currentTime;

	// Update Object
	mesh.rotation.y += 0.01; * deltaTime;
	mesh.rotation.x += 0.01; * deltaTime;

	// Render
	renderer.render(scene, camera);

	// Recursion pour avoir une animation sur notre framerate
	window.requestAnimationFrame(tick);
};

tick();
```


- On peut utiliser aussi une `Clock` qui est un outil built-in de ThreeJS nous permettant de pallier à ce problème qui est une solution plus courante et propre.

```js
// Clock

const clock = new THREE.Clock();

// Animation

const tick = () => {
	console.log('tick');

	// Clock
	const elapsedTime = clock.getElapsedTime();

	// Update Object
	mesh.rotation.y = elapsedTime;
	mesh.rotation.x = elapsedTime;

	// Render
	renderer.render(scene, camera);

	// Recursion pour avoir une animation sur notre framerate
	window.requestAnimationFrame(tick);
};

tick();
```

- `mesh.position.y = Math.sin(elapsedTime)` ==> va faire osciller notre cube de haut en bas,
- `mesh.position.x = Math.cos(elapsedTime)` ==> va faire osciller notre cube de droite à gauche,
	- Les 2 combinés permettre de faire faire des cercles à notre cube.

Une alternative à la `Clock` est le `Timer` :
```js
import { Timer } from 'three/addons/misc/Timer.js'

const timer = new Timer();

const tick = () => {
	// Timer
	timer.update()
	const elapsedTime = timer.getElapsedTime();
}
```
- Le timer fait sensiblement la même chose que la clock, mais viens régler quelques soucis qu'il pouvait y avoir avec la clock
### GSAP :

GSAP est une librairie qui permets de gérer des animations et qui en plus possède son propre tick ce qui simplifie grandement les choses.

#### Setup :

```
npm install --save gsap@3.5.1
```

```js
import { gsap } from 'gsap'
```

Pour animer avec GSAP on peut simplement utiliser `gsap.to` avec différents arguments :
- l'objet qu'on veut animer par exemple `mesh.position`,
- ensuite un objet avec différents attributs possible comme la durée, le délai et la destination (sur un axe donné) :
	- `duration`,
	- `delay`,
	- `x`

Exemple :
```js
gsap.to(mesh.position, { duration: 1, delay: 1, x: 2})
```
