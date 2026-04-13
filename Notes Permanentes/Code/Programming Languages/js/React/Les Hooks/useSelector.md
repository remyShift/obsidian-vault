> [!info]- Tags
> #LangagesDeProgs #React #Hooks 

#### Qu'est-ce que `useSelector` ?
- **`useSelector`** est un hook fourni par la bibliothèque **React-Redux**.
- Il permet d'accéder au **state** du store Redux dans un composant fonctionnel React.
- Ce hook permet de **sélectionner** une partie spécifique de l'état global géré par Redux, ce qui évite de rendre inutilement tout le composant lorsque d'autres parties du state changent.

#### Syntaxe de base
```javascript
import { useSelector } from 'react-redux';

const maValeur = useSelector((state) => state.maPartieDuState);
```
- `state` : C'est l'état global du store Redux.
- `(state) => state.maPartieDuState` : Une fonction de sélection (selector) qui extrait la partie du state dont le composant a besoin.

#### Exemples d'utilisation

1. **Sélectionner une valeur simple**
   ```javascript
   const compteur = useSelector((state) => state.compteur);
   ```
   - Ici, `compteur` est une propriété du state global. Le composant récupère cette valeur et la rend réactive.

2. **Sélectionner une partie complexe du state**
   ```javascript
   const utilisateurActuel = useSelector((state) => state.utilisateurs.actuel);
   ```
   - On peut naviguer dans des objets imbriqués pour récupérer la partie nécessaire du state.

3. **Optimisation avec des selectors**
   - Il est recommandé d'utiliser des selectors pour encapsuler la logique de sélection dans des fonctions réutilisables.
   - Exemple avec un selector défini :
     ```javascript
     const selectUtilisateurActuel = (state) => state.utilisateurs.actuel;
     const utilisateurActuel = useSelector(selectUtilisateurActuel);
     ```

4. **Comparaison de référence**
   - `useSelector` utilise **strict equality (===)** pour comparer l'ancienne et la nouvelle valeur.
   - Si la valeur sélectionnée change, le composant se re-render.

5. **Utilisation avancée : comparer manuellement**
   ```javascript
   const compteur = useSelector((state) => state.compteur, (ancienCompteur, nouveauCompteur) => {
       return ancienCompteur === nouveauCompteur;
   });
   ```
   - Permet de personnaliser la logique de comparaison et de contrôle du re-rendering.

#### Bonnes pratiques
- **Eviter les sélections coûteuses** : Essayez de faire des sélections simples, ou d'utiliser des selectors optimisés avec **reselect**.
- **Utiliser les selectors** : Centraliser la logique de sélection pour la réutilisation et la maintenabilité.
- **Minimiser les re-renders** : Choisissez les parties du state avec précaution pour éviter des re-renders inutiles.

#### Cas d'usage
- **Récupérer des données utilisateur** : Extraire et afficher les informations de l'utilisateur connecté.
- **Affichage conditionnel** : Sélectionner un drapeau (flag) dans le state pour conditionner l'affichage d'un composant.
- **Gestion des permissions** : Sélectionner des permissions ou des rôles pour gérer l'accès aux fonctionnalités.