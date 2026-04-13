> [!info]- Tags
> #LangagesDeProgs #React #Hooks 

Le hook `useReducer` en React est utilisé pour gérer l'état d'un composant de manière plus complexe que `useState`. Il est particulièrement utile quand l'état de votre composant dépend de plusieurs actions ou quand la logique de mise à jour de l'état est complexe.

Voyons comment fonctionne `useReducer` à travers l'exemple que tu as fourni.

### Exemple de Code

```jsx
import { useReducer } from "react";

export default function Container() {
	const [count, dispatch] = useReducer(reducer, 0);

	function reducer(state, action) {
		switch (action.type) {
			case "increment":
				return state + 1;
			case "decrement":
				return state - 1;
			case "multiply":
				return state * 2;
			case "divide":
				return state / 2;
			default:
				return state;
		}
	}

	return (
		<div>
			<h1>Valeur du compteur : {count}</h1>
			<button onClick={() => dispatch({ type: "increment" })}> Incrémenter </button>
			<button onClick={() => dispatch({ type: "decrement" })}> Décrementer </button>
			<button onClick={() => dispatch({ type: "multiply" })}> Multiplier </button>
			<button onClick={() => dispatch({ type: "divide" })}> Diviser </button>
		</div>
	);
}
```

### Explication

1. **Initialisation avec `useReducer`:**
   ```jsx
   const [count, dispatch] = useReducer(reducer, 0);
   ```
   - `useReducer` prend deux arguments :
     1. Une fonction de réduction (`reducer`).
     2. Une valeur initiale de l'état (ici, `0`).
   - `useReducer` retourne un tableau contenant :
     1. L'état actuel (`count`).
     2. Une fonction `dispatch` qui est utilisée pour envoyer des actions à la fonction de réduction.

2. **Fonction `reducer`:**
   ```jsx
   function reducer(state, action) {
     switch (action.type) {
       case "increment":
         return state + 1;
       case "decrement":
         return state - 1;
       case "multiply":
         return state * 2;
       case "divide":
         return state / 2;
       default:
         return state;
     }
   }
   ```
   - La fonction `reducer` prend deux arguments :
     1. L'état actuel (`state`).
     2. Une action (`action`).
   - Selon le type de l'action (`action.type`), elle retourne un nouvel état. Par exemple, si l'action est de type `"increment"`, l'état (le compteur) est incrémenté de 1.

3. **Utilisation de `dispatch` pour envoyer des actions:**
   - Chaque bouton a un gestionnaire d'événements `onClick` qui appelle `dispatch` avec une action spécifique.
   ```jsx
   <button onClick={() => dispatch({ type: "increment" })}> Incrémenter </button>
   <button onClick={() => dispatch({ type: "decrement" })}> Décrementer </button>
   <button onClick={() => dispatch({ type: "multiply" })}> Multiplier </button>
   <button onClick={() => dispatch({ type: "divide" })}> Diviser </button>
   ```
   - Lorsque l'un de ces boutons est cliqué, `dispatch` envoie l'action correspondante à la fonction `reducer`, qui met à jour l'état (`count`) en fonction de cette action.

### Résumé

- `useReducer` est utile pour gérer un état complexe avec plusieurs types de mises à jour.
- Il utilise une fonction de réduction (`reducer`) qui détermine comment l'état doit changer en réponse à des actions.
- `dispatch` est utilisé pour envoyer des actions à cette fonction de réduction, déclenchant ainsi des mises à jour de l'état.

Dans cet exemple, chaque clic sur un bouton envoie une action différente à la fonction `reducer`, qui met à jour le compteur (`count`) en conséquence.