> [!info]- Tags
> #LangagesDeProgs #React 
### Custom Middleware :

```javascript
export const store = configureStore({
	reducer: {
		counter,
		fruits,
		fruitsCart,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(customMiddleware)
});

function customMiddleware(store) {
	return function (next) {
		return function (action) {
			console.log(store);
		}
	}
}
```

`store` :
- `store.getState` : pour avoir accès au sate du store
	- dans notre cas accès à la valeur du counter, de la liste de fruits et de la liste de fruitsCart.
- `store.dispatch` : pour envoyer les actions qu'on veut mais qui risquent de repasser par les middlewares`

`next` :
- permets d'envoyer lui aussi une action mais qui ne repassera par les middlewares, cette action sera dans la continuité --> action envoyé sur les middlewares suivant et ainsi en enchaîner puis sur le reducer

`action` :
- Action en question qui a déclenché le middleware.

```javascript
function customMiddleware(store) {
	return function (next) {
		return function (action) {
			next({
				type: "fruitsCart/addOne",
				payload:{
					name: "Mango",
					url: "images/mango.jpg",
					price: 999,
					id: 777,
				}
			})
		}
	}
}
```

Par exemple désormais lorsqu'on va ajouter **et** supprimer un fruit c'est cette action qui sera exécuté donc l'ajout d'une mangue a 999$, car ici on ne prête pas attention à d'où l'action nous viens et donc notre middleware remplacera toute les actions qui arrivent par cette dernière.