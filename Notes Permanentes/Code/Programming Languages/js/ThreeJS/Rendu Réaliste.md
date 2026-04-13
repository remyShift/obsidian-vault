Ensemble de techniques pour avoir un rendu réaliste,
- **NB :** Certaines des techniques qui suit peuvent avoir un impact sur les performances et ce qu'on veut afficher. 

## Tone Mapping

C'est le fait de convertir des HDR (High Dynamic Range) en LDR (Low Dynamic Range),
- En ThreeJS ça va surtout fake ce procédé, même si les couleurs ne sont pas en HDR ce qui va avoir pour effet d'avoir un rendu plus réaliste,

```js
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 2;

gui.add(renderer, 'toneMappingExposure').min(0).max(10).step(0.001);
gui.add(renderer, 'toneMapping').options({
	NoToneMapping: THREE.NoToneMapping,
	LinearToneMapping: THREE.LinearToneMapping,
	ReinhardToneMapping: THREE.ReinhardToneMapping,
	CineonToneMapping: THREE.CineonToneMapping,
	ACESFilmicToneMapping: THREE.ACESFilmicToneMapping,
});

```

## AntiAliasing

Aliasing --> c'est le fait d'avoir sur le bord de nos geometries une sorte d'effet d'escalier de la texture, qui apparait dans certains cas,
- Dépends du pixel ratio et des détails du models,

![[Pasted image 20250612113553.png]]
![[Pasted image 20250612113606.png]]


Comment régler ça ?
- **Super Sampling AntiAliasing (SSAA)** : on augmente la résolution actuel pour ensuite resize à la taille normale ce qui fait que lors du resize à la taille initial chaque ancien pixel serra composé en faite de 4 pixels.
	- Mauvais pour les performances car on doit render 4x fois plus de pixels,
- **Multi Sampling AntiaAliasing (MSAA)** : c'est une technique qui est utilisé par défaut par la plupart des GPU récents,
	- On va checker les pixels rendu sur les edges de notre geometry, et pour chaque pixel on va regarder ses voisins, si on se rends compte qu'un voisin va créer un effet d'escalier on va mixer les couleurs
```js
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
	antialias: true,
});
```