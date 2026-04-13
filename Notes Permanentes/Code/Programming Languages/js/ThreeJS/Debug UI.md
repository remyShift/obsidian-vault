> [!info]- Tags
> #LangagesDeProgs #ThreeJS #Framework 

Une debug UI permets de changer des valeurs facilement et rapidement,
- Ça peut être aussi pour le designer, le développeur et même et le client,
- Ça permets aussi de trouver des comportements étranges et non attendus.

Il existe différente libs de debug ui mais on va utiliser `lil-gui`, cette lib est populaire, maintenu à jour et facile à utiliser.
```
npm install lil-gui
```

Après l'avoir installé il nous faut l'importer :
```js
import GUI from 'lil-gui'
```

Puis l'instancier dans une variable :
```js
const gui = new GUI()
```

Une bonne habitude à avoir est que vu que `lil-gui` ne peut modifier que des objets on peut se créer un objet vide qui nous servira pour les valeurs et fonctions qu'on voudra passer à ce dernier.
```js
const debugObject = {}
```

On a ensuite différentes options qu'on peut mettre dans notre debug ui :
- `range` : pour des nombres qui ont une valeur minimale et maximale, auquel il faudra mettre une step,
```js
gui.add(mesh.position, 'y').min(-2).max(2).step(0.0001)
```

- `color` : pour changer une couleur selon différents formats,
```js
debugObject.color = '#ff0000'

gui.addColor(debugObject, 'color').onChange(() => {
	material.color.set(debugObject.color)
})
```

- `text` : pour changer de simple textes,
- `checkbox` : pour toggle des booleans sur true ou false,
```js
gui.add(mesh, 'visible')
```
**NB :** `lil-gui` détecte automatiquement si la propriété est un booléen.

- `button` : pour trigger une fonction (ex : une animation),
```js
debugObject.spin = () => {
	gsap.to(mesh.rotation, {duration: 2, y: mesh.rotation.y + Math.PI * 2})
}

gui.add(debugObject, 'spin')
```

- `select` : pour avoir un choix de valeurs prédéfinies,

**NB :** on ne peut que changer les options d'objets existant.

On peut créer des dossiers pour avoir une debug UI claire est ordonnée :
```js
const cubeTweaks = gui.addFolder('My cube')
```

Il suffit ensuite d'ajouter des choses dans notre dossier :
```js
cubeTweaks.add(mesh.position, 'y').min(-2).max(2).step(0.0001)
```

**NB :** On peut mettre des dossiers dans des dossiers.


*Une bonne manière pour avoir le côté client et le côté debug est d'activer le debug ui lorsque l'URL est `https://blablabla.com#debug`. Le `#debug` est ce qui va nous permettre de savoir qu'il faut afficher la debug UI.* **???????**
