---
tags: [LangagesDeProgs, ThreeJS, Framework]
---

Pour le moment on a seulement un cube avec des couleurs pour chaque face mais sans texture particulière.

Textures = images qui vont couvrir la surface de nos geometry,
- différentes types de textures et différents effets,
- on peut aussi évidemment créer nos propres textures,

Les textures principales courantes sont :
 - **Color Texture (Albedo)**
	 - Texture la plus simple car c'est juste une couleur appliqué à notre geometry,
- **Alpha**
	- Grayscale image où le blanc est visible et le noir non,
- **Height (Displacement)**
	- Aussi une grayscale image mais qui va déplacer les vertices pour créer du relief mais à besoin donc de suffisamment de vertices (subdivision),
- **Normal**
	- Permets d'ajouter des détails lié à la lumière,
	- Pas spécialement besoin de subdivision,
	- Ne déplace pas les vertices,
	- Plus de performance que le **height texture** car moins de subdivisions,
- **Ambient occlusion**
	- Grayscale image aussi,
	- Ajoute des *fausses ombres* dans les creux pour donner un effet de relief,
	- Pas très précis,
	- Permets de créer des contrasts et relever des détails,
- **Metalness**
	- Encore une grayscale image,
	- Le blanc est considéré comme metallic et le noir à l'inverse non,
	- Sert surtout pour la réflection
- **Roughness**
	- Grayscale image qui fonctionne généralement de paire avec la texture **metalness**,
	- Le blanc est "rough" (granuleux ? texturé ? // opaque) et le noir est "smooth" (lisse ?),
	- Utile pour la dissipation de la lumière,
- ...

Toutes ces textures suivent le principe **PBR** :
- **P**hysically **B**ased **R**endering,
	- Plusieurs techniques et calculs qui tendent à avoir un résultat réaliste,
	- Le PBR est devenu le standard pour des rendus réalistes,
	- Utilisé dans beaucoup de domaines et donc ainsi pas de surprise lorsqu'on importe une texture de blender,


Les textures comme dit précédemment sont des images mais comment avoir l'url de cette image ?
- On peut avoir les images dans le dossier `src` de nos projets puis les importer dans notre js,
- Ou alors on peut les mettre dans le dossier `static` et y importer aussi,
- Is up to you

Une fois qu'on accès à l'url de l'image on peut les importer dans notre JS, et il y a différentes manière de faire :
- Soit avec du JS vanilla et en créant notre texture `onload` :
```js
const image = new Image();  
const texture = new THREE.Texture(image);  
image.onload = () => {
	// précise que la texture doit être load a nouveau avec la nouvelle valeur d'image
    texture.needsUpdate = true;  
}  
image.src = '/textures/door/color.jpg'
```

- Soit avec le `TextureLoader`de ThreeJS qui simplifie ce process :
```js
const textureLoader = new THREE.TextureLoader()  
const colorTexture = textureLoader.load('/textures/door/color.jpg')
```

**NB :** 1 `TextureLoader` peut load plusieurs textures.

On peut ensuite appliquer la texture sur notre `material` :

```js
const material = new THREE.MeshBasicMaterial({ map: colorTexture });
```
