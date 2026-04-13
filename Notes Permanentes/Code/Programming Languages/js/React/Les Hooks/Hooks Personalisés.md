> [!info]- Tags
> #LangagesDeProgs #React #Hooks

Les hooks personnalisés en React permettent de réutiliser de la logique d’état ou des effets entre différents composants sans dupliquer du code. Ils sont créés en utilisant les hooks de base de React (comme `useState`, `useEffect`, etc.) et en les encapsulant dans une fonction.

### Exemple simple

Imaginons que nous avons plusieurs composants qui ont besoin de gérer un minuteur. Plutôt que de répéter le même code de gestion de minuteur dans chaque composant, nous pouvons créer un hook personnalisé.

1. **Création du hook personnalisé**

```javascript
import { useState, useEffect } from 'react';

function useTimer(initialTime = 0) {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);

    // Nettoyage de l'intervalle à la destruction du composant
    return () => clearInterval(interval);
  }, []);

  return time;
}
```

Dans cet exemple, le hook `useTimer` initialise un état `time` avec une valeur par défaut (0) et utilise `useEffect` pour démarrer un intervalle qui incrémente `time` toutes les secondes. Le hook retourne la valeur actuelle de `time`.

2. **Utilisation du hook personnalisé dans un composant**

```javascript
import React from 'react';
import useTimer from './useTimer';

function TimerComponent() {
  const time = useTimer();

  return (
    <div>
      <p>Time: {time}s</p>
    </div>
  );
}

export default TimerComponent;
```

Ici, le composant `TimerComponent` utilise le hook `useTimer` pour obtenir la valeur actuelle du minuteur et l'afficher.

### Exemple plus avancé

Supposons que nous voulions un hook personnalisé pour gérer des requêtes HTTP et récupérer des données.

1. **Création du hook personnalisé pour les requêtes HTTP**

```javascript
import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}
```

Ce hook `useFetch` prend une URL en paramètre, récupère les données de cette URL et gère les états de chargement (`loading`), de données (`data`), et d'erreur (`error`).

2. **Utilisation du hook personnalisé dans un composant**

```javascript
import React from 'react';
import useFetch from './useFetch';

function DataComponent() {
  const { data, loading, error } = useFetch('https://api.example.com/data');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Data:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default DataComponent;
```

Dans ce composant `DataComponent`, nous utilisons le hook `useFetch` pour récupérer des données d'une API. Le composant affiche un message de chargement pendant que les données sont récupérées, gère les erreurs, et affiche les données une fois disponibles.

### Conclusion

Les hooks personnalisés en React permettent de réutiliser et de centraliser la logique complexe, rendant le code plus propre et plus maintenable. Vous pouvez créer des hooks pour n'importe quelle logique partagée entre composants, comme la gestion des formulaires, l'accès aux API, les minuteurs, etc.