> [!info]- Tags
> #LangagesDeProgs #React 
\

Le MW Thunk permet l'appel de gérer les appels API. Jusqu'à maintenant lorsqu'on envoie une action à notre store c'était un objet mais pour trigger le MW Thunk on va envoyer désormais une fonction qu'il va exécuter (généralement la fonction est un appel API), lorsqu'on a les données / résultat de notre fonction on va pouvoir dispatch cette réponse.
- Contrairement au MW Logger, Thunk n'as pas besoin d'import c'est une fonctionnalité déjà présente dans RTK tel quel ==> si on dispatch une fonction alors on l'exécute avant de dispatch le résultat a nos reducers

**NB :** Lorsqu'on gère des API penser à gérer les erreurs, les données et un loader si nécessaire.

##### Exemple :

```javascript
import { createSlice } from "@reduxjs/toolkit";

const initialState = {	
	loader: false,
	data: undefined,
	error: false
}

export const users = createSlice({
	name: "users",	
	initialState,
	reducers: {
		addData: (state, action) => {
			state.data = action.payload;
			state.loader = false;
		},
		addLoader: (state, action) => {
			state.loader = true;
		},
		addError: (state, action) => {
			state.error = true;
			state.loader = false;
		}
	}
})

export function getData(action) {

	return function(dispatch, getState) {
		dispatch(addLoader());
		fetch("https://jsonplaceholder.typicode.com/users")
		.then(response => {
			return response.json()
		})
		.then(data => dispatch(addData(data)))
		.catch(() => dispatch(addError()));
	}
}

export const { addData, addLoader, addError } = users.actions;
export default users.reducer;
```

```jsx
import { useSelector, useDispatch } from "react-redux"
import { getData } from "../../features/users"
import spinner from "../../assets/spinner.svg"

export default function Users() {
	const dispatch = useDispatch();
	const users = useSelector(state => state.users);
	
	console.log(users);
	
	if (!users.data && !users.loader && !users.error) {
		dispatch(getData());
	}

	return (
		<div>
		
		</div>
	)
}
```

Dans cet exemple `getData()` est une fonction qui va lancer un appel API et appeler les reducer quand ce dernier est résolue.