---
tags: [LangagesDeProgs, React, Hooks]
---

```jsx
import { useState } from "react"

export default function Container() {
	const [count, setCount] = useState(0);

	function handleClick() {
		setCount(count + 1);
	}

	return (
		<div>
			<p>{count}</p>

			<button onClick={handleClick}>Incrémenter</button>
		</div>
	)
}
```

- `useState` est l'un des Hooks les plus fondamentaux de React. Il te permet d'ajouter un état local à tes composants fonctionnels. Imagine-le comme une boîte magique où tu peux stocker des valeurs qui peuvent changer au fil du temps.
	- Tu peux utiliser la fonction `setCount` pour mettre à jour la valeur de l'état / du state.

**NB :** Le state peut aussi être utile pour set le nom d'une classe et ainsi avoir un rendu CSS en fonction.

Exemple :

```jsx
import "./Container.css"
import { useState } from "react"

export default function Container() {
	const [darkMode, setDarkMode] = useState(false)

	return (
	<div className={`full-container ${darkMode && "dark-mode"}`}>
			<h1>Welcome on ToggleMania</h1>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
			<button
				onClick={() => setDarkMode(!darkMode)}>
				Do you want to activade the {darkMode ? "Light Mode" : "Dark Mode"}
			</button>
		</div>
	)
}
```

## setState

- Lorsque ton état (state) change avec `setState`, React effectue quelques étapes en arrière-plan pour garantir que ton interface utilisateur est mise à jour de manière efficace et conforme au nouvel état :

1. **Mise à jour du composant :** Lorsque tu appelles la fonction `setState` avec une nouvelle valeur, React planifie une mise à jour du composant contenant cet état.

2. **Rendu virtuel :** React effectue un rendu virtuel du composant avec le nouvel état. Cela signifie qu'il crée une représentation virtuelle de la nouvelle interface utilisateur sans nécessairement la rendre sur l'écran.

3. **Comparaison de l'arbre virtuel :** Ensuite, React compare l'arbre virtuel avec l'arbre virtuel précédent pour détecter les différences entre les deux.

4. **Mise à jour du DOM :** Une fois que React a déterminé quelles parties de l'interface utilisateur ont changé, il met à jour le DOM réel pour refléter ces changements. Seules les parties qui ont changé sont mises à jour, ce qui rend le processus très efficace.

5. **Appel des effets :** Si tu utilises des effets (par exemple, `useEffect`), React les exécute après que le DOM a été mis à jour. Cela te permet d'effectuer des actions supplémentaires en réponse aux changements d'état, comme la mise à jour des données côté serveur ou l'interaction avec d'autres parties de ton application.

En résumé, lorsque ton état change avec `setState`, React prend en charge tout le processus de mise à jour de l'interface utilisateur de manière efficace et automatique, en s'assurant que les changements sont reflétés de manière précise et cohérente à l'écran.
