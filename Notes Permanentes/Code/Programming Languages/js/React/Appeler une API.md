> [!info]- Tags
> #LangagesDeProgs #React 

```jsx
import "./Container.css";
import { useState, useEffect } from "react";
import spinner from "./spinner.svg";

export default function Container() {
	const [APIState, setAPIState] = useState({
		loading: false,
		error: false,
		data: undefined,
	});

	let content;

	if (APIState.loading) {
		content = <img src={spinner} alt='loader' />;
	} else if (APIState.error) {
		content = <p>Error ...</p>;
	} else if (APIState.data?.length > 0) {
		content = (
			<ul>
				{APIState.data.map((item) => {
					return (
						<li key={item.id}>
							<span>{item.name}</span>
							<span>{item.email}</span>
							<span>{item.phone}</span>
						</li>
					);
				})}
			</ul>
		);
	} else if (APIState.data?.length === 0) {
		content = <p>Your research doesnt match data ...</p>;
	}

	useEffect(() => {
		setAPIState({ ...APIState, loading: true });

		fetch("https://jsonplaceholder.typicode.com/users")
			.then((response) => {
				if (!response.ok) throw new Error(response.statusText);
				return response.json();
			})
			.then((data) => {
				setAPIState({
					loading: false,
					error: false,
					data: data,
				});
			})
			.catch((e) => {
				console.log(e);
				setAPIState({
					loading: false,
					error: true,
					data: undefined,
				});
			});
	}, []);

return (
	<div>
		<h1>Appeler une API</h1>
		{content}
	</div>
	);
}
```


Voici une explication plus détaillée du code React :

### Importations

```javascript
import "./Container.css";
import { useState, useEffect } from "react";
import spinner from "./spinner.svg";
```

- **Importation du fichier CSS** : Applique des styles au composant.
- **Importation des hooks `useState` et `useEffect`** : `useState` gère l'état local du composant et `useEffect` exécute du code après le montage du composant.
- **Importation de l'image `spinner`** : Utilisée pour afficher une animation de chargement.

### Composant `Container`

```javascript
export default function Container() {
	const [APIState, setAPIState] = useState({
		loading: false,
		error: false,
		data: undefined,
	});
```

- **État initial `APIState`** : Utilise `useState` pour définir un état initial avec trois propriétés :
  - `loading` : Indique si les données sont en cours de chargement.
  - `error` : Indique si une erreur est survenue lors de la récupération des données.
  - `data` : Contient les données récupérées ou `undefined` si aucune donnée n'est disponible.

### Détermination du contenu à afficher

```javascript
	let content;

	if (APIState.loading) {
		content = <img src={spinner} alt='loader' />;
	} else if (APIState.error) {
		content = <p>Error ...</p>;
	} else if (APIState.data?.length > 0) {
		content = (
			<ul>
				{APIState.data.map((item) => {
					return (
						<li key={item.id}>
							<span>{item.name}</span>
							<span>{item.email}</span>
							<span>{item.phone}</span>
						</li>
					);
				})}
			</ul>
		);
	} else if (APIState.data?.length === 0) {
		content = <p>Your research doesnt match data ...</p>;
	}
```

- **`content`** : Variable pour stocker le contenu à afficher, basée sur l'état `APIState` :
  - **Chargement** : Si `loading` est `true`, affiche une image de spinner.
  - **Erreur** : Si `error` est `true`, affiche un message d'erreur.
  - **Données disponibles** : Si `data` contient des éléments, affiche une liste d'éléments.
  - **Aucune donnée** : Si `data` est un tableau vide, affiche un message indiquant qu'aucune donnée ne correspond.

### Effet pour récupérer les données

```javascript
	useEffect(() => {
		setAPIState({ ...APIState, loading: true });
		fetch("https://jsonplaceholder.typicode.com/users")
			.then((response) => {
				if (!response.ok) throw new Error(response.statusText);
				return response.json();
			})
			.then((data) => {
				setAPIState({
					loading: false,
					error: false,
					data: data,
				});
			})
			.catch((e) => {
				console.log(e);
				setAPIState({
					loading: false,
					error: true,
					data: undefined,
				});
			});
	}, []);
```

- **`useEffect`** : Exécute le code lors du premier rendu du composant.
  - **Déclenchement du chargement** : Met `loading` à `true`.
  - **Requête API** : Utilise `fetch` pour récupérer les données des utilisateurs depuis l'URL spécifiée.
    - Si la réponse n'est pas correcte (`response.ok`), lance une erreur.
    - Si la réponse est correcte, convertit la réponse en JSON.
  - **Mise à jour de l'état** :
    - Si les données sont récupérées avec succès, met à jour `APIState` pour indiquer que le chargement est terminé, aucune erreur, et stocke les données.
    - Si une erreur survient, met à jour `APIState` pour indiquer que le chargement est terminé, une erreur est survenue, et aucune donnée n'est disponible.

### Rendu du composant

```javascript
	return (
		<div>
			<h1>Appeler une API</h1>
			{content}
		</div>
	);
}
```

- **Rendu** : Affiche un titre "Appeler une API" et le contenu déterminé par la variable `content` en fonction de l'état actuel des données.