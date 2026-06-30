---
tags: [LangagesDeProgs, React, Hooks]
---

## Qu'est-ce que `useContext` ?

- **`useContext`** est un hook fourni par React qui permet d'accéder à un contexte dans un composant fonctionnel.
- Un **contexte** en React est un mécanisme permettant de partager des données entre différents composants sans avoir à passer ces données explicitement via les props, en particulier lorsqu'il y a plusieurs niveaux de composants.

## Syntaxe de base

```javascript
import React, { useContext } from 'react';

// Consommation du contexte
const valeur = useContext(NomDuContexte);
```

- `NomDuContexte` : Le contexte que l'on souhaite utiliser. Il doit être créé et fourni en amont via un fournisseur de contexte (`<NomDuContexte.Provider>`).
- `valeur` : La valeur stockée dans le contexte, accessible au composant.

## Création et utilisation d'un contexte

1. **Créer un contexte**

   ```javascript
   import React, { createContext } from 'react';

   const ThemeContext = createContext('light');
   ```

   - `createContext('light')` : Crée un contexte avec une valeur par défaut (ici `'light'`).

2. **Fournir un contexte**

   ```javascript
   import React from 'react';
   import { ThemeContext } from './ThemeContext';

   function App() {
     return (
       <ThemeContext.Provider value="dark">
         <MonComposant />
       </ThemeContext.Provider>
     );
   }
   ```

   - `<ThemeContext.Provider value="dark">` : Fournit la valeur `'dark'` à tous les composants enfants qui consommeront ce contexte.

3. **Consommer un contexte avec `useContext`**

   ```javascript
   import React, { useContext } from 'react';
   import { ThemeContext } from './ThemeContext';

   function MonComposant() {
     const theme = useContext(ThemeContext);

     return (
       <div style={{ background: theme === 'dark' ? '#333' : '#fff' }}>
         Le thème actuel est {theme}
       </div>
     );
   }
   ```

   - `const theme = useContext(ThemeContext)` : Accède à la valeur du contexte (`'dark'` dans cet exemple) dans le composant.

## Exemples d'utilisation

1. **Partage de thèmes entre composants**
   - Utiliser un contexte pour définir un thème (clair ou sombre) qui peut être partagé entre plusieurs composants, sans passer explicitement le thème comme prop.

2. **Gestion de l'utilisateur courant**

   ```javascript
   const UserContext = createContext(null);

   function Profil() {
     const utilisateur = useContext(UserContext);

     return (
       <div>
         {utilisateur ? `Bonjour, ${utilisateur.nom}` : 'Veuillez vous connecter'}
       </div>
     );
   }
   ```

   - Fournir des informations sur l'utilisateur actuel via le contexte, pour permettre à n'importe quel composant de les consommer.

3. **Gestion de la langue**

   ```javascript
   const LangueContext = createContext('fr');

   function Message() {
     const langue = useContext(LangueContext);

     return (
       <p>{langue === 'fr' ? 'Bonjour' : 'Hello'}</p>
     );
   }
   ```

   - Partager la langue choisie dans toute l'application pour afficher du contenu localisé.

## Bonnes pratiques

- **Utiliser `useContext` avec modération** : Ne l'utilisez que lorsque c'est nécessaire. Pour des valeurs qui changent souvent, passer par les props peut être plus efficace.
- **Séparer les contextes** : Pour des données non reliées (ex: thème et utilisateur), utilisez plusieurs contextes pour éviter de rendre tout le composant à chaque changement.
- **Combiner avec `useReducer`** : Pour des états complexes, il peut être judicieux de combiner `useContext` avec `useReducer` pour centraliser la gestion de l'état.

## Cas d'usage

- **Thèmes globaux** : Partager des paramètres de style ou des thèmes à travers toute l'application.
- **Authentification** : Fournir l'état de l'utilisateur (connecté ou non) et ses informations à tous les composants nécessitant ces données.
- **Paramètres d'application** : Partager des configurations globales (ex : langue, unités de mesure) entre différents composants.
