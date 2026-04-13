> [!info]- Tags
> #LangagesDeProgs #React #Hooks

En React, les "clean up functions" (fonctions de nettoyage) sont des fonctions utilisées pour nettoyer ou annuler des effets secondaires lorsqu'un composant est démonté ou lorsque certains paramètres changent. Elles sont souvent utilisées avec le hook `useEffect`.

### Pourquoi utiliser des clean up functions ?

Lorsque vous utilisez des effets secondaires (comme des abonnements, des timers, ou des écouteurs d'événements), il est important de nettoyer ces effets pour éviter les fuites de mémoire et les comportements inattendus.
### Exemple simple

Imaginons que nous avons un composant React qui utilise un intervalle pour mettre à jour un compteur toutes les secondes. Voici comment nous pouvons le mettre en œuvre et nettoyer l'intervalle lorsqu'on démonte le composant.

```jsx
import React, { useState, useEffect } from 'react';

function Compteur() {
  const [compteur, setCompteur] = useState(0);

  useEffect(() => {
    // Démarre un intervalle qui incrémente le compteur toutes les secondes
    const intervalId = setInterval(() => {
      setCompteur((prevCompteur) => prevCompteur + 1);
    }, 1000);

    // La fonction de nettoyage qui sera appelée lorsque le composant est démonté
    return () => {
      clearInterval(intervalId);
    };
  }, []); // Le tableau vide [] signifie que cet effet n'aura lieu qu'une fois après le premier rendu

  return (
    <div>
      <p>Compteur : {compteur}</p>
    </div>
  );
}

export default Compteur;
```
### Explication de l'exemple

1. **État du compteur** : Nous utilisons `useState` pour créer un état local `compteur` initialisé à 0.
2. **Effet avec `useEffect`** : Nous utilisons `useEffect` pour démarrer un intervalle lorsque le composant est monté.
3. **Intervalle** : À chaque seconde, l'intervalle incrémente le compteur.
4. **Fonction de nettoyage** :
   - La fonction retournée par `useEffect` est la fonction de nettoyage.
   - Cette fonction est appelée lorsque le composant est démonté ou avant que l'effet soit réexécuté (si les dépendances changent, ici il n'y en a pas).
   - Elle utilise `clearInterval` pour arrêter l'intervalle et éviter qu'il continue à fonctionner après que le composant est démonté, ce qui prévient les fuites de mémoire.

En résumé, les fonctions de nettoyage sont essentielles pour assurer que les effets secondaires (comme les timers ou les abonnements) ne provoquent pas de problèmes une fois que le composant n'est plus utilisé.