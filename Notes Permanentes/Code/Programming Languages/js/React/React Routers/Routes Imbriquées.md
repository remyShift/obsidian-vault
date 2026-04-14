---
tags: [LangagesDeProgs, React]
---

Les routes imbriquées dans React Router permettent de créer une hiérarchie de routes, ce qui est particulièrement utile pour organiser les sections de ton application qui partagent une structure ou un layout commun. Par exemple, une page de profil d'utilisateur pourrait avoir des sous-pages comme les informations personnelles, les paramètres de compte, etc. Avec les routes imbriquées, tu peux définir une route parent et plusieurs routes enfants.

### Exemple de routes imbriquées

Prenons l'exemple d'une application avec une section "Utilisateurs" où chaque utilisateur a des pages de profil, de paramètres, et d'historique.

#### 1. Installer React Router

Si ce n'est pas déjà fait, installe React Router dans ton projet :

```bash
npm install react-router-dom
```

#### 2. Créer les composants

Commence par créer les composants pour les différentes sections de la page utilisateur.

##### UserProfile.js

```jsx
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function UserProfile() {
  return (
    <div>
      <h2>Profil de l'utilisateur</h2>
      <nav>
        <ul>
          <li><Link to="details">Détails</Link></li>
          <li><Link to="settings">Paramètres</Link></li>
          <li><Link to="history">Historique</Link></li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default UserProfile;
```

##### UserDetails.js

```jsx
import React from 'react';

function UserDetails() {
  return <div>Détails de l'utilisateur</div>;
}

export default UserDetails;
```

##### UserSettings.js

```jsx
import React from 'react';

function UserSettings() {
  return <div>Paramètres de l'utilisateur</div>;
}

export default UserSettings;
```

##### UserHistory.js

```jsx
import React from 'react';

function UserHistory() {
  return <div>Historique de l'utilisateur</div>;
}

export default UserHistory;
```

#### 3. Définir les routes imbriquées

Ensuite, configure les routes dans le fichier principal de ton application.

##### App.js

```jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import UserProfile from './UserProfile';
import UserDetails from './UserDetails';
import UserSettings from './UserSettings';
import UserHistory from './UserHistory';
import PageNotFound from './PageNotFound';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Accueil</Link></li>
          <li><Link to="/user">Utilisateur</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<UserProfile />}>
          <Route path="details" element={<UserDetails />} />
          <Route path="settings" element={<UserSettings />} />
          <Route path="history" element={<UserHistory />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
```

#### 4. Créer le composant Home.js

##### Home.js

```jsx
import React from 'react';

function Home() {
  return <div>Accueil</div>;
}

export default Home;
```

#### 5. Créer le composant PageNotFound.js

##### PageNotFound.js

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

### Explication du code

1. **UserProfile Component** :
   - Ce composant contient les liens de navigation vers les routes enfants. `Outlet` est un composant de React Router qui rend les composants des routes enfants.

2. **Routes Imbriquées dans App.js** :
   - La route `/user` utilise le composant `UserProfile` et contient des routes enfants pour `details`, `settings`, et `history`.
   - Les routes enfants sont définies en tant que routes imbriquées sous la route `/user`.

3. **Navigation** :
   - Les liens dans `UserProfile` utilisent des chemins relatifs (`to="details"`, etc.), ce qui rend la navigation plus simple et les chemins plus lisibles.

### Résumé

Les routes imbriquées permettent de structurer ton application de manière hiérarchique. Elles sont particulièrement utiles lorsque des sections de ton application partagent une structure commune, facilitant ainsi la navigation et la gestion des différentes sous-sections.