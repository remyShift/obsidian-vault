---
tags: [LangagesDeProgs, React]
---

 React Query est une bibliothèque pour la gestion des requêtes de données (fetching) et la synchronisation du cache dans les applications React. Elle simplifie le processus d'extraction, de mise à jour, et de synchronisation des données, tout en offrant une expérience utilisateur fluide.

### Pourquoi utiliser React Query ?

1. **Gestion simplifiée des requêtes** : Plus besoin d'écrire manuellement du code pour gérer les états de chargement, d'erreur et de succès.
2. **Caching automatique** : Les données sont mises en cache et réutilisées pour éviter des requêtes réseau inutiles.
3. **Synchronisation en arrière-plan** : Les données peuvent être automatiquement rafraîchies en arrière-plan pour garantir leur fraîcheur.
4. **Gestion optimiste** : Permet de mettre à jour l'interface utilisateur avant que les mutations soient confirmées par le serveur, offrant une expérience utilisateur plus réactive.

### Concepts de base

1. **Query** : Représente une requête de données. Utilise `useQuery` pour récupérer les données.
2. **Mutation** : Représente une modification de données (comme un POST, PUT ou DELETE). Utilise `useMutation` pour envoyer des données.
3. **QueryClient** : Fournit le contexte pour les queries et les mutations.

On peut aussi cancel une requête en cours avec [[AbortSignal]].

### Mise en œuvre

#### Installation
Installe React Query via npm ou yarn :
```bash
npm install @tanstack/react-query
```

#### Configuration
Ajoute le `QueryClientProvider` pour envelopper ton application :
```jsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* tes composants ici */}
    </QueryClientProvider>
  );
}
```

#### Utilisation de `useQuery`
Pour récupérer des données, utilise le hook `useQuery` :
```jsx
import { useQuery } from '@tanstack/react-query';

function MyComponent() {
  const { data, error, isLoading } = useQuery(['myData'], fetchData);

  if (isLoading) return 'Chargement...';
  if (error) return `Erreur: ${error.message}`;

  return (
    <div>
      {data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}

async function fetchData() {
  const response = await fetch('/api/data');
  return response.json();
}
```

### Utilisation de `useMutation`
`useMutation` est utilisé pour gérer des opérations qui modifient des données (comme POST, PUT, DELETE). Contrairement à `useQuery` qui est principalement utilisé pour récupérer des données, `useMutation` se concentre sur l'envoi de nouvelles données ou la modification de celles existantes.

#### Pourquoi utiliser `useMutation` ?
- **Simplification de la logique** : `useMutation` fournit une façon structurée de gérer les états de mutation (comme l'envoi, le succès et l'erreur).
- **Gestion optimiste** : Permet de mettre à jour l'UI immédiatement avant de recevoir la confirmation du serveur, améliorant ainsi l'expérience utilisateur.

#### Exemple de `useMutation`
```jsx
import { useMutation } from '@tanstack/react-query';

function MyComponent() {
  const mutation = useMutation(newData => {
    return fetch('/api/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newData),
    });
  });

  const handleSubmit = () => {
    mutation.mutate({ id: 1, name: 'Nouveau nom' });
  };

  return (
    <div>
      {mutation.isLoading ? (
        'Envoi...'
      ) : (
        <button onClick={handleSubmit}>Envoyer</button>
      )}
      {mutation.isError && <div>Erreur: {mutation.error.message}</div>}
      {mutation.isSuccess && <div>Succès!</div>}
    </div>
  );
}
```
Dans cet exemple :
- `mutation.mutate` est utilisé pour déclencher l'opération de mutation.
- `mutation.isLoading`, `mutation.isError`, et `mutation.isSuccess` permettent de gérer les différents états de l'opération.

### Utilisation `useQueryClient`
`useQueryClient` est un hook qui te donne accès au `QueryClient` de React Query. Le `QueryClient` est un objet central qui stocke le cache de toutes les requêtes effectuées dans ton application.

#### Pourquoi utiliser `useQueryClient` ?
- **Invalidation des queries** : Après une mutation, tu peux invalider des queries spécifiques pour forcer leur rafraîchissement et obtenir les données les plus récentes.
- **Accès au cache** : Te permet de lire et écrire directement dans le cache de React Query.

#### Exemple d'utilisation de `useQueryClient` avec `useMutation`
```jsx
import { useMutation, useQueryClient } from '@tanstack/react-query';

function MyComponent() {
  const queryClient = useQueryClient();

  const mutation = useMutation(newData => {
    return fetch('/api/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newData),
    });
  }, {
    onSuccess: () => {
      // Invalide les queries pour refetch les données
      queryClient.invalidateQueries(['myData']);
    },
  });

  const handleSubmit = () => {
    mutation.mutate({ id: 1, name: 'Nouveau nom' });
  };

  return (
    <div>
      {mutation.isLoading ? (
        'Envoi...'
      ) : (
        <button onClick={handleSubmit}>Envoyer</button>
      )}
      {mutation.isError && <div>Erreur: {mutation.error.message}</div>}
      {mutation.isSuccess && <div>Succès!</div>}
    </div>
  );
}
```
Dans cet exemple :
- Après une mutation réussie (`onSuccess`), `queryClient.invalidateQueries(['myData'])` invalide la query `myData`, ce qui force React Query à refetch ces données pour garantir que l'interface utilisateur affiche les données les plus récentes.

- **`useMutation`** : Pour envoyer ou modifier des données avec des états gérés de manière structurée.
- **`useQueryClient`** : Pour invalider les queries ou manipuler directement le cache, garantissant que l'interface utilisateur est toujours synchronisée avec les données les plus récentes.


-------------------------------------------------


POST, PUT et DELETE sont des méthodes HTTP utilisées pour effectuer des opérations différentes sur un serveur lors de l'interaction avec des API RESTful. Voici une explication concise de chacune d'elles :

### POST
- **Utilisation** : Créer une nouvelle ressource.
- **Exemple** : Ajouter un nouvel utilisateur dans une base de données.
- **Comportement** : Envoie les données au serveur pour créer une nouvelle entrée.
- **Requête** :
  ```http
  POST /api/users
  Content-Type: application/json

  {
    "name": "John Doe",
    "email": "john.doe@example.com"
  }
  ```
- **Réponse attendue** : Habituellement, la réponse contient la nouvelle ressource créée, souvent avec un code de statut HTTP 201 (Created).

### PUT
- **Utilisation** : Mettre à jour une ressource existante ou en créer une nouvelle si elle n'existe pas (idempotent).
- **Exemple** : Mettre à jour les informations d'un utilisateur existant.
- **Comportement** : Remplace la ressource actuelle avec les données fournies.
- **Requête** :
  ```http
  PUT /api/users/1
  Content-Type: application/json

  {
    "name": "John Smith",
    "email": "john.smith@example.com"
  }
  ```
- **Réponse attendue** : Une confirmation de la mise à jour, souvent avec un code de statut HTTP 200 (OK) ou 204 (No Content).

### DELETE
- **Utilisation** : Supprimer une ressource existante.
- **Exemple** : Supprimer un utilisateur de la base de données.
- **Comportement** : Supprime la ressource spécifiée du serveur.
- **Requête** :
  ```http
  DELETE /api/users/1
  ```
- **Réponse attendue** : Une confirmation de la suppression, souvent avec un code de statut HTTP 200 (OK) ou 204 (No Content).

### Comparaison des Méthodes HTTP
| Méthode | Description                                 | Idempotent | Crée des Effets Secondaires |
|---------|---------------------------------------------|------------|-----------------------------|
| POST    | Crée une nouvelle ressource                 | Non        | Oui                         |
| PUT     | Met à jour ou crée une ressource            | Oui        | Oui                         |
| DELETE  | Supprime une ressource                      | Oui        | Oui                         |

### Intégration dans React avec `useMutation`
Pour utiliser ces méthodes dans React avec React Query, tu peux utiliser le hook `useMutation`. Voici un exemple pour chaque méthode :

#### POST Example
```jsx
import { useMutation } from '@tanstack/react-query';

const addUser = async (user) => {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return response.json();
};

const { mutate } = useMutation(addUser);

const handleAddUser = () => {
  mutate({ name: 'John Doe', email: 'john.doe@example.com' });
};
```

#### PUT Example
```jsx
import { useMutation } from '@tanstack/react-query';

const updateUser = async (user) => {
  const response = await fetch(`/api/users/${user.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return response.json();
};

const { mutate } = useMutation(updateUser);

const handleUpdateUser = () => {
  mutate({ id: 1, name: 'John Smith', email: 'john.smith@example.com' });
};
```

#### DELETE Example
```jsx
import { useMutation } from '@tanstack/react-query';

const deleteUser = async (userId) => {
  await fetch(`/api/users/${userId}`, {
    method: 'DELETE',
  });
};

const { mutate } = useMutation(deleteUser);

const handleDeleteUser = () => {
  mutate(1); // Supposons que l'ID de l'utilisateur à supprimer est 1
};
```

En résumé, les méthodes POST, PUT et DELETE sont essentielles pour créer, mettre à jour et supprimer des ressources sur un serveur. En les combinant avec React Query et `useMutation`, tu peux gérer ces opérations de manière efficace dans tes applications React.