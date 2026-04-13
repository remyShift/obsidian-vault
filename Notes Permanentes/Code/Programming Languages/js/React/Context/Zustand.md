> [!info]- Tags
> #LangagesDeProgs #React 

**Zustand** = même principe de store que RTK.
- plus "léger" que RTK

### Mise en place :

```
npm install zustand
```

Dans un fichier `store.js` :

```javascript
import { create } from "zustand";

export const useFoo = create((set) => ({
	email: "johndoe@live.fr"
}))
```

Désormais dans n'importe quel component en important mon `useFoo` je peux :

```jsx
import useFoo from "./store.js"

const { email } = useFoo
```
 et ma constante email dans mon component sera égale à `"johndoe@live.fr"`.

On peut aussi rajouter une méthode pour changer l'email :
```javascript
import { create } from "zustand";

export const useFoo = create((set) => ({
	email: "johndoe@live.fr",
	updateEmail(newEmail) {
		set({ email: newEmail })
	}
}))
```

On peut récupérer désormais cette méthode dans nos component :

```jsx
import useFoo from "./store.js"

const { email } = useFoo
updateEmail("foo@live.fr")
```

On aurait put aussi créer cette méthode de manière séparée : 

```javascript
import { create } from "zustand";

export const useFoo = create((set) => ({
	email: "johndoe@live.fr",
}))

export const globalUpdateEmail = (newEmail) => {
	useFoo.setState({ email: newEmail })
}
```

Ça permets notamment de modifier l’e-mail depuis un composant qui ne « consomme » / n’utilise pas notre state `useFoo`.

Néanmoins c’est plus lisible et claire lorsque les 2 sont dans notre state.


**NB :** *On peut evidemment utiliser l'update email sur par exemple un `onChange` d'un champ d'input


De plus le state ne se limite pas aux components react, par exemple :
```javascript
import { create } from "zustand";

export const useFoo = create((set) => ({
	email: "johndoe@live.fr",
	timer: 0,
	updateEmail(newEmail) {
		set({ email: newEmail })
	}
}))

window.setInterval(() => {
	useAppStore.setState((state) => ({ timer: state.timer + 1}));
}, 1000);
```

Dans ce cas tout les components qui utiliser une partie de notre state partagé `useFoo` vont se re-render toute les secondes.
Lors d’une mutation d’état on n’est pas obliger de remettre toute les clés, on peut mettre juste celle qu’on modifie. (*fonctionne que pour le premier niveau d’abstraction*)



On peut aussi dans nos component sélectionné un élément de notre store précis, car dans notre cas tout les éléments qui utilise une partie de notre store peu importe laquelle vont se re-rendre toute les secondes à cause du timer.
Si on veut sélectionné un élément précis du store et avoir un re-render uniquement en fonction de son changement on peut faire comme suit : 

```jsx
const email = useFoo((state) => state.email)
```

Désormais ma constante email va dépendre uniquement des changement du state `email` de mon `useFoo`.



### Middlewares :

Zustand a aussi des middlewares built-in comme `devtools` qui permets d’avoir accès dans la console à des infos supplémentaires.

**NB :** ce middlewares est aussi valable avec RTK.

On peut aussi évidemment créer nos propres middlewares.