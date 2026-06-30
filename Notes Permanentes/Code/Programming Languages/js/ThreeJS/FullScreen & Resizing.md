---
tags:
  - LangagesDeProgs
  - ThreeJS
---

Pour faire en sorte que notre canva prenne toute la taille de notre écran / de notre page on peut faire comme suis :

```js
/**
* Sizes
*/

const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};
```

Mais faire juste cela va crée une espèce de bordure blanche ainsi que de l'overflow à cause du style par défaut des pages web. Il suffit donc de supprimer la margin et le padding par défaut qui sont sur nos objets html :

```css
* {
	margin: 0;
	padding: 0;
}

.webgl {
	position: fixed;
	top: 0;
	left: 0;
	outline: none;
}
```

C'est presque ça, mais on a toujours de l'overflow et on peut scroll en dehors des limites de la page :

```css
html, body {
	overflow: hidden;
}
```

Maintenant il faut s'occuper du resizing :

```js
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

window.addEventListener("resize", () => {
	// Update Sizes
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;

	// Update Camera
	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();

	// Update Renderer
	renderer.setSize(sizes.width, sizes.height);
});
```

## Pixel ratio pour toutes les tailles d'écrans

On veut la même qualité d'image peu importe le pixel ratio du device sur lequel on est.

Pour ce faire on a juste après notre render a lui préciser qu'on veut un pixel ratio définis :

```js
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
```

Cela sélectionnera le pixelRation minimum entre celui de notre device et 2.

⚠️ **NB :** ne pas oublier de le mettre aussi dans notre fonction d'update du resize pour que si la personne change la fenêtre de device (dans le cas où elle a plusieurs écrans) le pixel ratio change en fonction.

## Fullscreen

Il faut déjà pouvoir toggle le fullscreen que ça soit un bouton ou autre.

Par exemple avec un double click :

```js
window.addEventListener('dblclick', () => {
	if (!document.fullscreenElement) {
		canvas.requestFullscreen();
	} else {
		document.exitFullscreen();
	}
})
```

Néanmoins le double click ne marche pas sur Safari.

Pour fix that on peut faire comme suis :

```js
window.addEventListener("dblclick", () => {
	const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;

	if (!fullscreenElement) {
		if (canvas.requestFullscreen) {
			canvas.requestFullscreen();
		} else if (canvas.webkitRequestFullscreen) {
			canvas.webkitRequestFullscreen();
		}
	} else {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		}
	}
});
```
