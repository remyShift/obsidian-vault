> [!info]- Tags
> #LangagesDeProgs #ThreeJS #Framework 

Geometries = tout ce qui est composé de *vertices* (point de coordonnées dans un espace 3D) et de faces (triangles de webgl qui relie les vertices pour créer de la surface),
- Les geometries peuvent être utiliser pour les mesh mais aussi pour les particules,
- On peut y stocker plus de données que juste les positions (UV coordonnées, couleurs, normals etc etc)
  
ThreeJS fournit des geometries built-in qui héritent toute de la classe `BufferGeometry` qui fournis plusieurs méthodes utiles pour transformer les vertices ce qui permets d'être plus précis que de transformer un mesh.
On retrouve ainsi :
- **BoxGeometry :** qui est ce qu'on utilisait jusqu'à présent pour faire un cube où ses vertices sont ses angles
- **PlaneGeometry :** pour une surface plane avec 2 faces,
- **CircleGeometry :** comme la précédente mais en forme de cercle,
- **ConeGeometry**,
- **CylinderGeometry**,
- **RingGeometry :** un donut mais plat,
- **TorusGeometry :** un vraie donut,
- **TorusKnotGeometry :** serpent entremêlé ?
- **DodecahedronGeometry :** une sphere avec des faces (~ comme un dé de 20 faces),
- ...

**NB :** On peut combiner les geometries pour créer des formes très complexes.

### BoxGeometry 

Il peut prendre jusqu'à 6 paramètres :
- une largeur,
- une hauteur,
- une profondeur,
- une widthSegments : qui va être la division en triangles sur la largeur,
- une heightSegments : qui va être la division en triangles sur la hauteur,
- une depthSegments : qui va être la division en triangles sur la profondeur,

**NB :** les segments rajoutent des vertices, qu'on peut evidémment déplacer.
- Même concept que la subdivision,

### Custom Geometry

Pour ce faire on va avoir besoin de créer un triangle et plein d'autre et pour cela il nous faut un **Buffer Geometry** qui va contenir toute la donnée ou plutôt les positions de nos vertices qui composent nos triangles.
- Pour stocker tout ça on va utiliser un **Float32Array** ce qui nous permets :
	- Avoir un array typé qui ne peut contenir que des `floats`,
	- Avoir un array avec une taille fixe,
		- Permets à notre ordinateur que ça soit plus facile,

```js
const geometry = new THREE.BufferGeometry();
```

Pour remplir cet array il nous faut lui préciser sa taille et le remplir :
```js
const positionArray = new Float32Array(9);
positionArray[0] = 0; // x du premier vertex
positionArray[1] = 0; // y du premier vertex
positionArray[2] = 0; // z du premier vertex

positionArray[3] = 0; // x du second vertex
positionArray[4] = 1; // y du second vertex
positionArray[5] = 0; // z du second vertex

positionArray[6] = 1; // x du troisieme vertex
positionArray[7] = 0; // y du troisieme vertex
positionArray[8] = 0;// z du troisieme vertex
```

On a donc ainsi les coordonnées des 3 vertices qui composent notre triangles.

**NB :** on peut aussi l'écrire comme ceci :
```js
const positionArray = new Float32Array([
	0,0,0, // premier vertex : x,y,z
	0,1,0, // second vertex : x,y,z
	1,0,0 // troisieme vertex : x,y,z
]);
```

On peut désormais convertir ce `Float32Array` en un `BufferAttribute` :
```js
const positionsAttribute = new THREE.BufferAttribute(positionArray, 3); // 3 indique que 1 vertex contient 3 valeurs dans notre array
```

Il faut maintenant ajouter cet attribute a notre buffer geometry :
```js
geometry.setAttribute('position', positionAttribute);
```

On peut désormais ajouter des textures à nos geometry.

C'est notamment grâce au `BufferGeometry` qu'on peut faire des [[Particules]] afin d'ajouter des détails à nos scènes 3D.