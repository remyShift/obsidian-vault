> [!info]- Tags
> #LangagesDeProgs #React 

Redux Toolkit (RTK) est une bibliothèque puissante et pratique pour gérer l'état global des applications JavaScript, en particulier celles utilisant React. RTK simplifie l'utilisation de Redux en offrant une série d'outils et de fonctions préconfigurées qui réduisent le code boilerplate et améliorent l'expérience développeur.

![[Schem_React_Redux.png]]

#### 1. Store

Le **store** est l'endroit où l'état global de l'application est stocké. C'est un objet JavaScript qui contient tout l'état de l'application et permet d'interagir avec celui-ci via des méthodes spécifiques comme `dispatch`, `getState`, et `subscribe`.

- **Création du Store** : `configureStore` permet de configurer le store de manière simple et avec des bonnes pratiques intégrées (comme les middlewares et les extensions pour les DevTools de Redux).

   ```javascript
   import { configureStore } from '@reduxjs/toolkit';
   import rootReducer from './rootReducer';

   const store = configureStore({
     reducer: rootReducer,
   });

   export default store;
   ```

#### 2. Slice

Un **slice** est une partie de l'état global et comprend l'état initial, les reducers (fonctions qui modifient l'état), et les actions associées.

- **Création d'un Slice** : `createSlice` permet de créer facilement des slices.

   ```javascript
   import { createSlice } from '@reduxjs/toolkit';

   const counterSlice = createSlice({
     name: 'counter',
     initialState: { value: 0 },
     reducers: {
       increment: state => { state.value += 1 },
       decrement: state => { state.value -= 1 },
       incrementByAmount: (state, action) => { state.value += action.payload }
     }
   });

   export const { increment, decrement, incrementByAmount } = counterSlice.actions;
   export default counterSlice.reducer;
   ```

#### 3. Reducer

Un **reducer** est une fonction pure qui prend l'état actuel et une action comme arguments, puis retourne un nouvel état. Les reducers sont responsables de déterminer comment l'état de l'application change en réponse à des actions.

**NB :** Lorsqu'une action arrive dans notre store tout les reducer vont être déclenché / exécuté ainsi que leur propre state ce qui permets de faire réagir plusieurs reducer à une seule et même chose comme par exemple de gérer le fait d'afficher ou non plusieurs choses selon un état comme une authentification. Si le reducer n'a aucun cas où il agit sur son state il retourne simple le state.

De plus on peut créer des [[Extras Reducer]] qui vont permettre de réagir a un state auquel ils ne sont pas liés.

- **Reducers dans les Slices** : Les reducers sont définis directement dans les slices avec `createSlice`.

   ```javascript
   const counterSlice = createSlice({
     name: 'counter',
     initialState: { value: 0 },
     reducers: {
       increment: state => { state.value += 1 },
       decrement: state => { state.value -= 1 },
       incrementByAmount: (state, action) => { state.value += action.payload }
     }
   });
   ```

#### 4. Action

Une **action** est un objet qui décrit un changement d'état. Il a généralement une propriété `type` et peut avoir un `payload` contenant des données nécessaires pour le changement.
De plus avant qu'une action se fasse dispatch elle peut se faire intercepter par un [[Middleware]].

- **Création d'Actions** : Avec `createSlice`, les actions sont automatiquement générées à partir des noms des reducers.

   ```javascript
   export const { increment, decrement, incrementByAmount } = counterSlice.actions;
   ```

#### 5. Selector

Un **selector** est une fonction qui extrait des morceaux spécifiques de l'état du store. Les selectors sont utilisés pour accéder de manière propre et réutilisable aux données du store. (*cf : [[useSelector]]*)

- **Utilisation des Selectors** :

   ```javascript
   import { useSelector } from 'react-redux';

   const selectCount = state => state.counter.value;
   const count = useSelector(selectCount);
   ```
#### Avantages de Redux Toolkit

- **Réduction du Code Boilerplate** : Automatisation des actions et des reducers.
- **Configuration Prête à l'Emploi** : Intégration automatique des DevTools de Redux et des middlewares essentiels.
- **Simplification de la Gestion de l'État** : Utilisation intuitive grâce à `createSlice` et `configureStore`.
- **Compatibilité TypeScript** : Prise en charge complète de TypeScript pour une meilleure expérience de développement.