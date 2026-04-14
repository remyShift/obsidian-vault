---
tags: [LangagesDeProgs, React]
---

```jsx
import { useState, useEffect } from "react";

export default function Container() {
	const [count, setCount] = useState(0);

	useEffect(() => {
		const intervalID = setInterval(() => {
			setCount(count => count + 1);
		}, 1000)

		return () => clearInterval(intervalID);
	}, [])

	return (
		<div>
			<h1>Valeur du compteur : {count}</h1>
		</div>
	);
}
```
### Fonctionnement du Code

1. **Importation des Hooks :**
   ```javascript
   import { useState, useEffect } from "react";
   ```
   Le code utilise les hooks `useState` et `useEffect` de React.

2. **Initialisation de l'État :**
   ```javascript
   const [count, setCount] = useState(0);
   ```
   Une variable d'état `count` est initialisée à 0 avec sa fonction de mise à jour `setCount`.

3. **Effet avec `useEffect` :**
   ```javascript
   useEffect(() => {
       const intervalID = setInterval(() => {
           setCount(count => count + 1);
       }, 1000);

       return () => clearInterval(intervalID);
   }, []);
   ```
   L'effet `useEffect` est utilisé pour configurer un intervalle de temps (timer) qui se déclenche toutes les secondes (1000 millisecondes).

### Détails du `setInterval`

- **Création d'un Intervalle :**
  ```javascript
  const intervalID = setInterval(() => {
      setCount(count => count + 1);
  }, 1000);
  ```
  `setInterval` est une fonction JavaScript qui appelle une fonction répétitivement à des intervalles de temps spécifiés (ici, toutes les 1000 millisecondes, soit toutes les secondes). Dans ce cas, la fonction appelée incrémente `count` de 1 à chaque seconde.

- **Mise à jour de l'État :**
  ```javascript
  setCount(count => count + 1);
  ```
  La fonction de mise à jour de l'état `setCount` utilise une version de rappel (callback) de la fonction de mise à jour qui prend l'état précédent `count` et retourne la nouvelle valeur `count + 1`. Cela garantit que la mise à jour de l'état est basée sur la valeur la plus récente de `count`.

- **Nettoyage de l'Intervalle :**
  ```javascript
  return () => clearInterval(intervalID);
  ```
  La fonction retournée par `useEffect` est une fonction de nettoyage qui s'exécute lorsque le composant se démonte. Elle appelle `clearInterval` pour arrêter l'intervalle et éviter les fuites de mémoire.

### Rendu du Composant

- **Affichage de la Valeur du Compteur :**
  ```javascript
  return (
      <div>
          <h1>Valeur du compteur : {count}</h1>
      </div>
  );
  ```
  Le composant affiche la valeur actuelle de `count` dans un élément `<h1>`. Cette valeur est mise à jour chaque seconde grâce à l'intervalle configuré.

### Résumé

Le `setInterval` dans ce code démarre un compteur qui incrémente la valeur de `count` de 1 chaque seconde. Le `useEffect` s'assure que l'intervalle est configuré lorsqu'on monte le composant et nettoyé lorsqu'on démonte le composant, empêchant ainsi toute fuite de mémoire.