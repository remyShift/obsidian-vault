---
tags: [LangagesDeProgs, React]
---

Créer une page 404 avec React Router est assez simple. La page 404 est une page d'erreur qui s'affiche lorsque l'utilisateur tente de naviguer vers une route qui n'existe pas. Voici comment tu peux ajouter une page 404 à ton application React.

### Étapes pour ajouter une page 404

1. **Créer le composant 404** :
   - Crée un composant React qui représente ta page 404.

2. **Ajouter une route pour la page 404** :
   - Utilise le composant `Route` avec l'attribut `path="*"` pour capturer toutes les routes qui ne correspondent pas aux routes définies.

### Exemple de code

Voici un exemple de code qui inclut une page 404 dans une application React avec React Router :

#### 1. Créer le composant 404

```jsx
import React from 'react';

function PageNotFound() {
  return (
    <div>
      <h2>404 - Page Non Trouvée</h2>
      <p>La page que vous recherchez n'existe pas.</p>
    </div>
  );
}

export default PageNotFound;
```

#### 2. Ajouter la route pour la page 404

```jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Accueil from './Accueil';
import Produits from './Produits';
import Panier from './Panier';
import PageNotFound from './PageNotFound';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Accueil</Link></li>
          <li><Link to="/produits">Produits</Link></li>
          <li><Link to="/panier">Panier</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/produits" element={<Produits />} />
        <Route path="/panier" element={<Panier />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
```

### Explication du code

1. **PageNotFound Component** :
   - Le composant `PageNotFound` est créé pour afficher un message d'erreur lorsque l'utilisateur navigue vers une route inexistante.

2. **Route pour la page 404** :
   - La route `<Route path="*" element={<PageNotFound />} />` capture toutes les routes qui ne correspondent pas aux routes définies précédemment. Le `path="*"` signifie "toutes les autres routes".

### Résumé

En suivant ces étapes, tu as maintenant une page 404 fonctionnelle dans ton application React. Cela permet d'améliorer l'expérience utilisateur en fournissant un message clair lorsqu'ils essaient d'accéder à une page qui n'existe pas.