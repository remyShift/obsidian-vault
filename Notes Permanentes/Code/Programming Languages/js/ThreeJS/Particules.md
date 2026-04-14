---
tags: [LangagesDeProgs, ThreeJS, Framework]
---

Les particules peuvent être utilisées pour créer des étoiles, de la fumée, de la pluie, de la poussière, du feu, etc etc ... On peut en avoir des milliers avec un frame rate raisonnable et donc elles impactent peu les performances si elles sont bien implements.

Chaque particules est composées d'un `plane` (donc 2 triangles) qui regarde toujours la caméra.

Créer des particules ressemble grandement à créer un `Mesh`.
- Il nous faut une `geometry` et un `material` qui seront utilisés pour créer un `Points` plutôt qu'un `Mesh`.
	- **NB :** Chaque geometry à un nombre de vertex et donc chacun de ses vertex deviendra une particules.

```js
const particlesGeometry = new THREE.SphereGeometry(1, 32, 32)
const particlesMaterial = new THREE.PointsMaterial({
	size: 0.02,
	sizeAttenuation: true
})

const particles = new THREE.Points(particlesGeometry, particlesMaterial)
```

**NB :** `sizeAttenuation` permets de mettre de la perspective, une particule loin sera plus petite que une particule près de la caméra.

On peut donc aussi utiliser des `geometry` custom :

```js
const particlesGeometry = new THREE.BufferGeometry()
const count = 5000
const positions = new Float32Array(count * 3)

for(let i = 0; i < count * 3; i++) {
	positions[i] = (Math.random() - 0.5) * 10;
}

particlesGeometry.setAttribute(
	'position',
	new THREE.BufferAttribute(positions, 3)
)

const particlesMaterial = new THREE.PointsMaterial({
	size: 0.1,
	sizeAttenuation: true
})

const particles = new THREE.Points(particlesGeometry, particlesMaterial)

scene.add(particles)
```

On peut évidemment appliquer des textures à notre `material`.