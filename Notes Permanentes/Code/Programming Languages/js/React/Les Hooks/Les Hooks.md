---
tags: [LangagesDeProgs, React, Hooks]
---

- Les Hooks de React sont une fonctionnalité incroyablement puissante qui a révolutionné la façon dont nous construisons des composants dans React. Plutôt que de dépendre uniquement des classes, les Hooks permettent d'ajouter des fonctionnalités d'état et de cycle de vie aux composants fonctionnels. Cela simplifie le code, le rendant plus lisible et plus facile à maintenir. Avec les Hooks, tu peux gérer l'état local, effectuer des effets de manière plus propre et même créer des fonctionnalités réutilisables avec des Hooks personnalisés. En bref, les Hooks de React ouvrent de nouvelles possibilités passionnantes pour les développeurs React, offrant une approche plus fonctionnelle et expressive pour construire des interfaces utilisateur dynamiques.

- Cependant, il y a des règles strictes à suivre pour garantir qu'ils fonctionnent correctement. Voici les règles d'utilisation des hooks en React :

## Règles Fondamentales

1. **Appeler les hooks uniquement au niveau supérieur** :
   - N'appelez jamais les hooks à l'intérieur de boucles, de conditions ou de fonctions imbriquées. Les hooks doivent toujours être appelés au même endroit dans le cycle de rendu de React.
   - **Correct** :

	 ```jsx
     import { useState, useEffect } from 'react';

     function MyComponent() {
       const [count, setCount] = useState(0);

       useEffect(() => {
         document.title = `You clicked ${count} times`;
       }, [count]);

       return (
         <div>
           <p>You clicked {count} times</p>
           <button onClick={() => setCount(count + 1)}>
             Click me
           </button>
         </div>
       );
     }
     ```

   - **Incorrect** :

	 ```jsx
     import { useState, useEffect } from 'react';

     function MyComponent() {
       const [count, setCount] = useState(0);

       if (count > 0) {
         // Incorrect: useEffect is inside a condition
         useEffect(() => {
           document.title = `You clicked ${count} times`;
         }, [count]);
       }

       return (
         <div>
           <p>You clicked {count} times</p>
           <button onClick={() => setCount(count + 1)}>
             Click me
           </button>
         </div>
       );
     }
     ```

2. **Appeler les hooks uniquement dans les composants fonctionnels de React ou les hooks personnalisés** :
   - N'appelez jamais les hooks dans des fonctions JavaScript ordinaires.
   - **Correct** :

	 ```jsx
     import { useState } from 'react';

     function MyComponent() {
       const [count, setCount] = useState(0);

       return (
         <div>
           <p>You clicked {count} times</p>
           <button onClick={() => setCount(count + 1)}>
             Click me
           </button>
         </div>
       );
     }
     ```

   - **Incorrect** :

	 ```jsx
     import { useState } from 'react';

     // Incorrect: useState is called in a regular function
     function myRegularFunction() {
       const [count, setCount] = useState(0);
     }
     ```

## Règles Additionnelles

1. **Utiliser des noms de hooks commençant par `use`** :
   - Les hooks doivent toujours commencer par `use`. C'est une convention importante qui permet à React de savoir que cette fonction suit les règles des hooks.
   - **Correct** :

	 ```jsx
     function useCustomHook() {
       // ...
     }
     ```

   - **Incorrect** :

	 ```jsx
     function customHook() {
       // ...
     }
     ```

## Best Practices et Conseils

- **Déclaration au début du composant** :
  - Déclarez toujours vos hooks au début du composant fonctionnel avant tout autre logique ou retour (return). Cela garantit que les hooks sont appelés dans le même ordre à chaque rendu.

- **Utilisation de plusieurs hooks** :
  - Vous pouvez utiliser plusieurs hooks dans un composant. Assurez-vous simplement qu'ils sont appelés dans le même ordre à chaque rendu.
  - **Exemple** :

	```jsx
    import { useState, useEffect } from 'react';

    function MyComponent() {
      const [count, setCount] = useState(0);
      const [name, setName] = useState('');

      useEffect(() => {
        document.title = `You clicked ${count} times`;
      }, [count]);

      useEffect(() => {
        console.log(`Name changed to ${name}`);
      }, [name]);

      return (
        <div>
          <p>You clicked {count} times</p>
          <button onClick={() => setCount(count + 1)}>
            Click me
          </button>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
      );
    }
    ```

En respectant ces règles, vous assurez que vos hooks fonctionnent correctement et que vos composants restent prévisibles et faciles à débogguer.

- Les hooks vus :
	[[useState]],
	[[useRef]],
	[[useEffect]],
	[[memo et useCallback]],
	[[useMemo]],
	[[useReducer]],
	[[useParams]],
	[[useContext]],
	[[useSelector]],

- De plus React permets de créer nos propres hooks et avoir des [[Hooks Personalisés]].
