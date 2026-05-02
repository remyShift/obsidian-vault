---
tags:
  - React
  - LangagesDeProgs
---
## Ce que React Query fait automatiquement

React Query passe un `AbortSignal` à chaque `queryFn`. Quand la query key change (ex : nouvelle frappe dans un input de recherche), RQ **annule la requête précédente** via ce signal transmis à axios.

```ts
const fetchProducts = async ({ signal }) => {
  const { data } = await axios.get('/api/search', {
    params: { q: query },
    signal, // annule la requête si la queryKey change
  })
  return data
}
```

## Le bug sans signal

Sans passer le signal à axios : risque de **race condition**. Une réponse lente d'une ancienne frappe peut arriver après une réponse plus récente et écraser les résultats affichés.

## AbortSignal est 100% côté client

L'annulation se passe dans le navigateur (coupe la connexion TCP). Le backend ne fait rien de spécial. Si la requête est déjà arrivée au serveur, elle s'exécute jusqu'au bout — c'est la réponse qui est ignorée côté client.

## Vérifier la cohérence

Si une fonction API est réutilisée dans plusieurs hooks, s'assurer que toutes les versions passent le signal. Une inconsistance (une query avec signal, une sans) = race condition intermittente difficile à debugger.

```ts
// ❌ inconsistant
const getSearchProducts = ({ signal }) => axios.get('/products', { signal })
const getArticlesSearch = (query) => axios.get('/articles', { params: { q: query } }) // oubli signal

// ✅ cohérent
const getArticlesSearch = ({ query, signal }) => axios.get('/articles', { params: { q: query }, signal })
```
