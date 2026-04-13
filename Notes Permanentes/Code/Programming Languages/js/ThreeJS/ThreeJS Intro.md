> [!info]- Tags
> #LangagesDeProgs #ThreeJS #Framework 

ThreeJS est une librairie Javascript qui permets de créer des expériences 3D dans le web.
- Sous le capot ça utilise WebGL qui est une API Javascript permettant justement de faire de la 3D
	- WebGL va juste render des triangles à des vitesses différentes et extrêmement rapide afin de donner l'aspect de différentes textures et shapes en utilisant notre GPU. Néanmoins WebGL peut être verbeux, compliqué et nécessité beaucoup de configuration et d'optimisation.
		- ThreeJS vient permettre de s'abstraire de ça tout en gardant une flexibilité, ThreeJS est juste au dessus de WebGL ce qui nous permets de créer nos propres shaders etc.
	- **NB :** On peut aussi très bien faire de la 2D avec WebGL aussi.

## Setup :

```
npm install three
```

Pour créer une scène basique on a besoin de plusieurs éléments essentiels :
- Une scène,
- Un / Des objet(s) => **un mesh**,
	- **Un mesh** est la combinaison de 2 choses : une géométrie (pour sa forme) et un material (pour sa texture / ce quoi il ressemble), 
		- On peut aussi [[Import Modèle|importer des modèles]] pour ne pas avoir à créer la geometry et le material et avoir des formes complexes déjà faites facilement,
- Une camera,
	- C'est le point de vue théorique utilisé lors du rendu (POV),
- Un renderer
	- C'est la vue qui va être affiché depuis notre caméra, cette dernière va être rendu dans un *canva*,
		- Le renderer peut gérer lui la création de canva ou alors on peut les créer nous même.


```js
import * as THREE from 'three'

const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({color: 'red'});
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

// Sizes

const sizes = {
	width: 800;
	height: 600;
}

// Camera

const cam = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);

camera.position.z = 3;

scene.add(camera);

// Renderer

const renderer = new THREE.WebGLRenderer({
	canvas: canvas
});

renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera)

```

De plus pour avoir un cube avec des faces de couleurs différentes et les arrêtes marquées :
```js
/**
* Object
*/

const geometry = new THREE.BoxGeometry(1, 1, 1);
const materials = [
	new THREE.MeshBasicMaterial({ color: 0xff0000 }), // Face 1
	new THREE.MeshBasicMaterial({ color: 0x00ff00 }), // Face 2
	new THREE.MeshBasicMaterial({ color: 0x0000ff }), // Face 3
	new THREE.MeshBasicMaterial({ color: 0xffff00 }), // Face 4
	new THREE.MeshBasicMaterial({ color: 0xff00ff }), // Face 5
	new THREE.MeshBasicMaterial({ color: 0x00ffff }), // Face 6
];

const mesh = new THREE.Mesh(geometry, materials);
scene.add(mesh);

// Add edges
const edges = new THREE.EdgesGeometry(geometry);
const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
const line = new THREE.LineSegments(edges, lineMaterial);
scene.add(line);
```

**NB :** pour voir les triangles qui composent une geometry / un mesh on peut utiliser `wireframe: true` dans le `material` pour y afficher.

Lorsqu'on code en ThreeJS on va souvent avoir des valeurs avec lesquelles on aimerait jouer afin d'avoir un rendu qui nous plait, pour ce faire on peut utiliser une [[Debug UI]] pour nous simplifier la tâche. Ça permettra même d'avoir des rendus insoupçonné.

En ThreeJS on va avoir différents objets comme [[Les Caméras]] ou des formes qu'on va pouvoir [[Manip d'Objet|manipuler]] et [[Animation Intro|animer]].
- Ces formes sont appelées [[Geometries]] et il en existe différente avec chacune leur propriétés.
	- On peut appliquer sur ces dernières des [[Textures]] qui va être une image appliquée sur notre geometry.
	- Les textures n'étant qu'une image ne réagissant pas à son environnement on va pouvoir être plus précis que ça afin d'avoir des rendus selon un style particulier que l'on souhaite grâce aux [[Materials]].

On peut aussi intégrer de la [[Lights|lumières]] pour plus de réalisme.

Aussi on peut wrapper / entourer notre scène de d'une image appelé [[Environment map]].

Plusieurs techniques peuvent nous aider à obtenir un [[Rendu Réaliste]].

Au delà de formes (// geometries) on peut aussi avoir envie d'avoir du [[3D Text]].

On peut aussi, à l'aide de librairie annexe, ajouter de la [[Physics|physique]] à nos environnement 3D.

De plus quelques tips pour gérer le [[FullScreen & Resizing]] en ThreeJS !
