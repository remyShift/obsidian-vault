> [!info]- Tags
> #LangagesDeProgs #React #Framework 

- React est une librairie de JS le plus utilisé.
- C'est une librairie déclarative :
	- Plutôt que de créer un bouton et son event listener séparément React permets de le faire en 1 seul fois.
		- C'est permis grâce au JSX, qui est une façon d'écrire du JS avec du HTML dans le même fichier.
	- Grâce au JSX React va créer des **Components** --> fonctions qui retourne du JSX donc un éléments HTML.
		- Les components sont crée une fois et peuvent être ré-utilisé autant que nécessaire.
			- Un Component peut contenir un ou plusieurs autres component(s) et on peut passer à ces components des arguments qu'ils vont utiliser en leur sein. Ces arguments de components sont appelés [[Les Props]].

- Pour se setup cf la [React doc](https://fr.react.dev/).
```
npm create vite@latest
```

- Pour styliser avec du CSS un component il suffit de créer un fichier "NomDeMonComponent.css" et le stylisé comme on veut avec les sélecteur classiques de CSS. De manière plus encapsulé et pour éviter des conflits de noms on peut aussi utiliser des [[Modules CSS]].

- Les components on un [[Cycle de vie des Components |cycle de vie]] qui leur sont propre.

- React a des fonctions qui lui sont propre appelés [[Les Hooks]] qui vont avoir différentes utilités.
- On peut aussi avec React géré le contrôle d'input ou non, c'est ce qu'on appelle les [[Inputs Controlés - Non Controlés]].

- Comme en JS en React on peut [[Appeler une API]] ou encore [[Utiliser setInterval]] avec des spécifications liées à React.

- De base React est fait pour faire du SPA (Single Page Application) mais avec [[React Routers]] on peut faire du multi pages.

- Pour gérer les requêtes API et la synchronisation du cache de notre app on va utiliser [[React Query]].

- On peut et on doit évidemment faire des tests avec React tu pourras voir comment [[Test Setup]] ça dans cette note.

- **NB :** Un component React lors de sa création est généralement une div, le soucis peut être qu'une accumulation de div entraine des soucis de performances. La solution pour palier à ça sont [[Les Fragments]] qui sont la majorité du temps utilisé plutôt que des divs. 
### Créer une liste :
```jsx
export default function Container() {
	const data = [
		{
			id: 1,
			name: "Marie",
		},
		{
			id: 2,
			name: "Jean",
		},
		{
			id: 3,
			name: "Pierre",
		},
	];

	return (
		<div>
			<h1>Créer une liste d éléments avec React</h1>
			<ul>
				{data.map((user => (
					<li key={user.id}>{user.name}</li>
				)))}
			</ul>
		</div>
	);
}
```

**NB :** Chaque éléments créer ainsi se doit d'avoir une **key** unique.

### Utiliser des Images :
```jsx
import fuji from "./assets/fuji.jpg";
import triangle from "./assets/triangle.svg"

export default function Container() {
	const id = 3;

	return (
		<div>

			<h1>Utiliser des images</h1>
			<p>Image jpg/png/webp/etc</p>
			
			//Pas referencer dynamiquement
			<img src={fuji} alt='Mont Fuji' />
			<p>Utiliser des images du dossier public</p>
			
			//Referencer dynamiquement
			<img src={``/assets/forest-${id}.jpg``}></img>
			<p>SVGs</p>
			<img src={triangle}/>
		</div>
	);
}
```

### Short Circuit :
```jsx
export default function Container() {

const isLogged = false

	return (
		<div>
			<h1>Bienvenue sur BooksParadise</h1>
			{isLogged && <button>Display your collection</button>}
		</div>
	)
}
```

Si les 2 parties de notre condition sont `true` alors il peut se passer quelques choses. En l'occurence ici notre `button` "Display your collection" est évalué automatiquement à `true` (NB: ce qui n'est pas `false` est forcément `true`), et donc ce bouton s'affichera uniquement lorsque notre `isLogged` sera true. À l'inverse le `||` lui affichera le contenu uniquement si une des deux parties est fausses. Donc dans notre exemple précédent `isLogged` est bien false et on verra donc bien le button.

Avec le short circuit on peut également toggle des noms de class en CSS afin d'avoir un rendu CSS différent selon si une variable est `true`ou `false`. Dans l'exemple ci dessous soit le nom de ma `div`est "full-container" si "darkMode" est `false`, si il est `true`alors le nom de classe sera "full-container.dark-mode".

```jsx
import { useState } from "react"

export default function Container() {

	const [darkMode, setDarkMode] = useState(false)

	return (
		<div className={`full-container ${darkMode && "dark-mode"}`}>
			<h1>Welcome on ToggleMania</h1>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
			<button
				onClick={() => setDarkMode(!darkMode)}>
				Do you want to activade the {darkMode ? "Light Mode" : "Dark Mode"}</button>
		</div>
	)
}```


---

React est une libraire qui possède des frameworks comme :
- [[Next.Js Basics]],
- [[React Native Basics]],