> [!info]- Tags
> #LangagesDeProgs #React 

L'API de Contexte (Context API) de React permet de partager des valeurs et des états entre différents composants sans avoir à passer explicitement les props à chaque niveau de l'arborescence des composants. C'est particulièrement utile pour gérer des données globales comme les thèmes, les préférences utilisateur, ou l'authentification.

![[Schem_Context_API.png]]

### Concepts de base

1. **Context** :
   - Un contexte est un objet créé par `React.createContext()`.
   - Il a deux composants principaux : `Provider` et `Consumer`.

2. **Provider** :
   - Le `Provider` est un composant qui fournit une valeur à tous les composants descendants qui en ont besoin.
   - Il prend une prop `value` qui est la valeur partagée par le contexte.

3. **Consumer** :
   - Le `Consumer` est un composant qui consomme la valeur du contexte. Il peut être utilisé pour accéder aux données partagées dans le contexte.

4. **useContext** :
   - Un hook qui simplifie l'accès aux données du contexte dans les composants fonctionnels.

### Exemple de base

Imaginons que nous voulons partager un thème (clair ou sombre) entre plusieurs composants de notre application.

#### 1. Créer le contexte

```jsx
import React, { createContext, useState } from 'react';

// Créer le contexte
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeProvider };
```

#### 2. Utiliser le contexte dans les composants

##### App.js

```jsx
import React from 'react';
import { ThemeProvider } from './ThemeContext';
import ThemedComponent from './ThemedComponent';

function App() {
  return (
    <ThemeProvider>
      <ThemedComponent />
    </ThemeProvider>
  );
}

export default App;
```

##### ThemedComponent.js

```jsx
import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

function ThemedComponent() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div style={{ background: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#000' : '#fff' }}>
      <p>Le thème actuel est {theme}</p>
      <button onClick={toggleTheme}>Changer le thème</button>
    </div>
  );
}

export default ThemedComponent;
```

### Explication du code

1. **Créer le contexte** :
   - `createContext()` crée un nouvel objet contexte (`ThemeContext`).
   - `ThemeProvider` est un composant qui enveloppe l'application et fournit le contexte aux composants descendants via `ThemeContext.Provider`.

2. **Provider** :
   - `ThemeProvider` utilise un état local (`useState`) pour gérer le thème (`light` ou `dark`).
   - Le `Provider` prend une prop `value` qui contient le thème actuel et une fonction pour le changer (`toggleTheme`).

3. **Consommer le contexte** :
   - [[useContext]] est utilisé dans `ThemedComponent` pour accéder au thème et à la fonction `toggleTheme`.

4. **Utilisation des valeurs du contexte** :
   - Le composant `ThemedComponent` utilise les valeurs fournies par le contexte pour définir le style et permettre à l'utilisateur de changer le thème.

### Avantages de l'API de Contexte

- **Propagation automatique** : Pas besoin de prop drilling (passer manuellement les props à travers plusieurs niveaux de composants).
- **Lisibilité** : Simplifie la gestion des données partagées, rendant le code plus propre et plus facile à comprendre.
- **Encapsulation** : Les données et les méthodes sont encapsulées dans le contexte, ce qui facilite leur gestion et leur réutilisation.

### Conclusion

L'API de Contexte de React est un outil puissant pour gérer les états et les données globales dans une application. Elle simplifie la communication entre les composants et réduit le besoin de prop drilling, améliorant ainsi la maintenabilité et la lisibilité du code. 

Néanmoins un des soucis majeurs de l'API de Context et que si on veut avoir plusieurs data communes a toutes notre app (indeed plusieurs provider) il faudra faire plusieurs encapsulations ce qui peut devenir vite problématique, un autre problème est que si le context change alors tout les components qui partage ce context vont être re-render. la solution à ça est [[Redux TK Global]] ou encore [[Zustand]]. 