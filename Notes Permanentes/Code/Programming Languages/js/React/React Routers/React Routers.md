---
tags: [LangagesDeProgs, React]
---

 Imagine que tu es en train de construire une application web, comme un site de vente en ligne, et tu veux que les utilisateurs puissent naviguer entre différentes pages : une page d'accueil, une page de produits, une page de détails d'un produit spécifique, et une page de panier. Pour gérer cette navigation, tu vas avoir besoin de quelque chose qui peut diriger les utilisateurs vers les bonnes pages en fonction de ce qu'ils veulent voir. C'est là que React Router entre en jeu.

### Qu'est-ce que React Router ?

React Router est une bibliothèque pour React qui permet de gérer la navigation et les routes dans une application web. Il permet de créer des applications à une seule page (Single Page Applications - SPA) avec plusieurs pages de manière fluide.

### Les concepts de base

1. **Routes et Router** :
   - **Router** : C'est le composant qui englobe toute l'application ou une partie de l'application pour laquelle tu veux gérer les routes.
   - **Route** : Chaque route définit un chemin URL spécifique et le composant qui doit être rendu quand l'utilisateur navigue vers ce chemin.

2. **Routes** :
   - **Routes** : Ensemble de nos **Route**.

3. **Link** :
   - **Link** : C'est un composant qui permet de naviguer entre les différentes routes de l'application sans recharger la page. Il remplace les liens HTML traditionnels (`<a>`).

### Comment ça fonctionne ?

Voici un exemple simple pour illustrer :

#### Installation

Pour utiliser React Router, il faut d'abord l'installer via npm ou yarn :

```bash
npm install react-router-dom
```

#### Exemple de code

Imaginons que nous avons une application avec trois pages : Accueil, Produits, et Panier.

```jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

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
      </Routes>
    </Router>
  );
}

function Accueil() {
  return <h2>Accueil</h2>;
}

function Produits() {
  return <h2>Produits</h2>;
}

function Panier() {
  return <h2>Panier</h2>;
}

export default App;
```

#### Explication du code

1. **Router** :
   - `BrowserRouter` est utilisé pour englober l'application et activer le routage.

2. **Link** :
   - `<Link to="/">Accueil</Link>` crée un lien qui, lorsqu'il est cliqué, navigue vers la route `/`.

3. **Routes et Route** :
   - `<Routes>` remplace l'ancien `<Switch>` et contient toutes les routes de l'application.
   - `<Route path="/" element={<Accueil />} />` définit une route qui rend le composant `Accueil` quand l'utilisateur navigue vers `/`.

### Avantages de React Router

- **Navigation fluide** : Permet une navigation sans rechargement de page.
- **Composabilité** : Facile à intégrer et à utiliser avec les composants React existants.
- **Gestion de l'historique** : Prend en charge l'historique de navigation du navigateur pour permettre la navigation en avant et en arrière.

### Conclusion

React Router est un outil puissant pour gérer la navigation dans les applications React. En utilisant les composants Router, Route, et Link, tu peux créer une application web avec une navigation dynamique et une expérience utilisateur fluide.

De plus on peut créer un page par défaut si l'utilisateur veut se rendre sur un "path" qui n'existe pas : une [[Page 404]]. Si on veut aller plus loin et qu'on veut garder une page active et changer uniquement une partie de cette page selon le "path" on peut utiliser des [[Routes Imbriquées]].