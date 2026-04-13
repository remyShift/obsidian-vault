> [!info]- Tags
> #LangagesDeProgs #React 

Les **middlewares** sont des extensions qui interagissent avec le dispatch des actions avant qu'elles n'atteignent les reducers. Ils sont utilisés pour la gestion des effets secondaires (comme les requêtes API).
Ils peuvent changer l'action, la modifier ou encore effectuer des appels api.

![[RTK Middlewares.png]]

- **Exemple d'utilisation de Middleware** :

   ```javascript
export const store = configureStore({
	reducer: {
		counter,
		fruits,
		fruitsCart,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat()
});
   ```

- `getDefaultMiddleware` ==> ensemble des middlewares deja présent avec **RTK** 
- `concat` permets donc de rajouter un middleware

On peut donc à partir de la se créer une fonction à mettre dans le `concat`, et se créer ainsi un [[Custom Middleware]].

L'avantage de RTK ne sont pas les customs middleware mais plutôt ceux déjà **built-in** comme :
- [[MW Logger]],
- [[MW Thunk]],