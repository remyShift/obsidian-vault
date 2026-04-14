---
tags: [LangagesDeProgs, React, Hooks]
---

Le hook `useParams` en React est un outil pratique fourni par la bibliothèque React Router. Il est utilisé pour extraire les paramètres de l'URL dans une application React, facilitant ainsi la gestion des routes dynamiques. Voici une explication simple de son fonctionnement et de son utilisation :

### Quand utiliser `useParams` ?

Supposons que vous ayez une application avec des routes dynamiques. Par exemple, vous avez une route pour afficher les détails d'un utilisateur où l'URL contient l'ID de l'utilisateur, comme `/users/:userId`. Ici, `:userId` est un paramètre dynamique qui change en fonction de l'utilisateur.

### Comment utiliser `useParams` ?

1. **Installation de React Router** :
   Assurez-vous d'avoir React Router installé dans votre projet. Si ce n'est pas déjà fait, vous pouvez l'installer avec la commande suivante :
   ```sh
   npm install react-router-dom
   ```

2. **Définir les Routes** :
   Définissez vos routes dans votre composant principal. Par exemple :
   ```jsx
   import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
   import UserDetails from './UserDetails';

   function App() {
     return (
       <BrowserRouter>
	       <Routes>
		        <Route path="/users/:userId" component={UserDetails} />
		    </Routes>
       </BrowserRouter>
     );
   }

   export default App;
   ```

3. **Utiliser `useParams` dans le composant cible** :
   Dans le composant `UserDetails`, utilisez `useParams` pour accéder au paramètre `userId` de l'URL :
   ```jsx
   import React from 'react';
   import { useParams } from 'react-router-dom';

   function UserDetails() {
     // Utilisation du hook useParams pour obtenir les paramètres de l'URL
     const { userId } = useParams();

     // Vous pouvez maintenant utiliser userId pour, par exemple, faire une requête API et récupérer les détails de l'utilisateur
     return (
       <div>
         <h1>Details de l'utilisateur</h1>
         <p>ID de l'utilisateur : {userId}</p>
       </div>
     );
   }

   export default UserDetails;
   ```

### Explication détaillée

- **`useParams`** : Ce hook extrait les paramètres dynamiques de l'URL de la route actuelle. Dans l'exemple ci-dessus, si l'URL est `/users/123`, `useParams` renverra un objet `{ userId: '123' }`.

- **Composant `UserDetails`** : Ce composant utilise `useParams` pour récupérer l'ID de l'utilisateur de l'URL et l'affiche ensuite.

### Avantages de `useParams`

- **Simplicité** : Il est très simple à utiliser et rend le code plus propre en gérant les paramètres d'URL de manière intuitive.
- **Flexibilité** : Permet de gérer facilement des routes dynamiques et de passer des paramètres directement via l'URL.

En résumé, `useParams` est un hook pratique pour accéder aux paramètres dynamiques de l'URL dans une application React utilisant React Router. Il simplifie la gestion des routes et rend le code plus maintenable.