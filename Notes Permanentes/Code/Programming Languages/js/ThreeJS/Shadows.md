> [!info]- Tags
> #LangagesDeProgs #ThreeJS #Framework 

Les ombres sont toujours un point compliqué lorsqu'on fait des rendus 3D en temps réel.
- Mais ThreeJS à des solutions built-in, chaque scène qui comporte des lumières il va faire avant le 1er render qu'on voit un render spécial **pour chaque lumières** de notre scène.
	- Ce render spécial il va le faire depuis la pov de la lumière pour voir ce qu'elle voit et éclaire en remplaçant nos materials par le `MeshDepthMaterials` afin d'avoir l'information de la distance entre la lumière et les objets de notre scène et savoir si un objet et derrière un autre etc. Grâce à cette information ThreeJS va pouvoir garder en mémoire ces différents rendus en tant que texture appelées *shadows maps*.
	- Ces textures sont ensuite utilisées sur chaque materials qui est censé recevoir une ombre et l'a projeter sur les geometries correspondantes.
![[ShadowMap Example.png]]

**NB :** Activer le rendu des ombres n'est pas si compliqué contrairement à l'optimiser.

Pour dire à ThreeJS de prendre en compte le calcul des shadow map on peut faire :
```js
renderer.shadowMap.enabled = true
```

Car c'est lors du rendu et donc notre renderer qui s'en occupe.

Il nous faut ensuite dire à chaque objet de notre scène si il peut projeter une ombre avec `castShadow` et si il peut en recevoir une avec `receiveShadow`.
```js
sphere.castShadow = true

plane.receiveShadow = true
```

Il nous faut enfin activer les ombres sur les lumières.
- **NB :** il n'y que 3 types de lumières qui supportent les ombres : `PointLight`, `DirectionalLight` et `SpotLight`.
```js
directionalLight.castShadow = true
```


Les *shadow map* étant des "images" ont une largeur et une hauteur. Gérer la taille et le ratio entre les 2 est un bon début pour optimiser nos ombres. Attention une valeur trop grande peut générer des soucis de performances.
- **NB :** les shadow maps sont "stockées" dans notre lumière.
```js
directionalLight.shadow.mapSize.width = 1024
directionalLight.shadow.mapSize.height = 1024
```

Une solution supplémentaires pour optimiser le tout est de gérer le *near* et le *far* autrement dit la distance à laquelle la lumière se situe proche de nos objets et la distance à laquelle elle éclaire loin dans notre scène.
- Pour afficher ce *near* et ce *far* on peut afficher la bounding box de la caméra de notre light grâce au helper de camera.
```js
const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)

scene.add(directionalLightCameraHelper)
```

On peut ensuite gérer comme bon nous semble notre `near` et notre `far` de la caméra de notre lumière.
- **NB :** Le but souvent est de faire tenir la bounding box de la caméra de la lumière de manière qu'elle englobe notre scène sans aller trop loin.
```js
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 6
```

Étant donné que la notre light est une `DirectionalLight` donc notre `directionalLight.shadow.camera` est une `OrthographicCamera` on a accès à l'**amplitude** de cette dernière toujours avec comme objectif de faire tenir notre scène dans la caméra de notre light.
```js
directionalLight.shadow.camera.right = 2
directionalLight.shadow.camera.top = 2
directionalLight.shadow.camera.bottom = -2
directionalLight.shadow.camera.left = -2
```
- Ça permet d'avoir une lumière plus "concentrée" et donc de meilleurs détails, plus précis.
![[Pasted image 20250429135551.png]]

Pour gérer l'amplitude avec une `SpotLight` la caméra de sa shadow est une `PerspectiveCamera` et il faudra donc jouer avec la propriété `fov` qui sera l'ouverture de la caméra de notre spotlight en degrés :
```js
spotLight.shadow.camera.fov = 30
```

On peut aussi contrôler le *blur* (effet de flou) de notre ombre avec la propriété `radius` de l'ombre de notre lumière.
- **NB :** c'est un *blur* global qui s'applique partout pareil indépendamment de la proximité avec l'objet.
```js
directionalLight.shadow.radius = 10
```


### Baking Shadows

Baking shadows == intégrer les ombres directement dans nos textures.
- S'affranchi des soucis de performances pour calculer les ombres en temps réel,
- Ne marche si les objets sont en mouvements

On peut néanmoins faire des *simple shadows* qui vont être une texture comme les bakings shadows mais qui pourront suivre un objet.