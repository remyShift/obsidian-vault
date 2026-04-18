---
date: 2025-12-30
type: meeting
projet: Oli's Lab
tags:
  - react-query
  - refactoring
  - caching
  - olis-lab
participants:
  - Diego
  - Remy
lien: https://olislab.slack.com/docs/T06E4T3H87M/F0A5PL69QVD
---

# Huddle : Audit React Query & Refacto User Orders

---

## Contexte

Suite de l'audit de la CRA commencé le 23 décembre. Rémy présente son audit des hooks React Query existants, puis Diego et Rémy refactorisent le hook `useUserOrders` en live pour migrer d'un atom Jotai vers React Query.

---

## Audit React Query - Problèmes identifiés

### Pattern le plus fréquent : wrapper inutile
Partout dans le code, les fonctions de fetch sont wrappées dans une fonction intermédiaire avant d'être passées à `useQuery`. Exemple :
```ts
// ❌ inutile
const fetchArticleById = async (id) => {
  return await api.getArticleById(id)
}
useQuery({ queryFn: fetchArticleById })

// ✅ direct
useQuery({ queryFn: () => api.getArticleById(id) })
```

### `select` utilisé sans transformation
Plusieurs hooks utilisent `select` mais se contentent de retourner les données telles quelles. `select` n'est utile que si on transforme les données.

### Durées de cache incohérentes
- Certains hooks ont un `staleTime` défini, d'autres non (= refetch à chaque render)
- Pas de stratégie cohérente entre collections similaires
- Exemple : `articles` a un `staleTime`, `notionArticles` dans le même fichier n'en a pas. Pourquoi ?

### Hooks dans le même fichier
Plusieurs hooks dans un seul fichier. Diego préfère un fichier par hook pour avoir un historique Git propre par fonction. À faire lors de la prochaine migration (Next.js), pas maintenant.

### Duplication : `useAllProducts`
Deux versions du même hook avec la même clé de cache mais des durées différentes, dans deux fichiers distincts. Les deux sont utilisées. À unifier dans une PR dédiée.

### Shuffle des produits et cache incompatible
Le shuffle actuel est fait côté serveur. Problème : si la réponse est cachée, l'utilisateur verra toujours les produits dans le même ordre.
**Décision :** déplacer le shuffle côté client dans React Query. Chaque consommateur du hook aura une vue shufflée en mémoire, le cache reste stable.
Attention : si l'appel API est utilisé ailleurs sans shuffle, à vérifier avant de toucher.

### Nommage : `getCollectionProducts`
Le terme "collection" dans le code ne correspond pas au concept de catégorie. À renommer.

### Pas de React Query DevTools
Diego a la config en local sur une branche de test, il la pousse dans la foulée.

---

## Standards de cache décidés

| Type de donnée | staleTime | gcTime |
|---|---|---|
| Brands | 24h (infinity en mémoire) | - |
| Gift product (GWP) | infinity | - |
| All products | pas de cache (shuffle) | - |
| User orders | à définir | - |

---

## Refacto live : `useUserOrders`

### Situation initiale
L'implémentation existante utilisait un atom Jotai + un hook custom qui appelait manuellement l'API et stockait le résultat dans l'atom. Pas de gestion du loading/error, pas de cache.

### Nouvelle implémentation
```ts
// use-user-orders.ts
export const useUserOrders = () => {
  const user = useAtomValue(userAtom)
  const userId = user?.id

  return useQuery({
    queryKey: ['user-orders', userId],
    queryFn: () => api.getUserOrders(userId),
    enabled: !!userId,
  })
}
```

**Points importants :**
- `enabled: !!userId` : la query ne se déclenche pas si l'user n'est pas connecté
- Le typage se fait via le type de retour de l'API (`IOrder[]`), pas via un fallback `[] as IOrder[]`
- `orders ?? []` peut être utilisé au point de consommation si on a besoin d'un tableau vide par défaut
- Pattern recommandé pour la gestion des états :
```ts
const { data: orders, isLoading, isError, isSuccess } = useUserOrders()
if (isLoading) return <Skeleton />
if (isError) return <Error />
// ici orders est typé et défini
```

**Avantage clé :** la clé `['user-orders', userId]` peut être invalidée manuellement après qu'une commande est passée, ce qui déclenche un refetch automatique. Ça remplace le pattern atom + useEffect de l'ancienne implémentation.

### Nettoyage
- Suppression de l'atom `userOrdersAtom`
- Suppression de l'ancien hook custom
- Remplacement des 3 composants qui consommaient l'ancien hook par le nouveau

---

## Actions

- [ ] **Rémy** - Ouvrir une PR avec les quick wins React Query (suppression wrappers inutiles, `select` vides)
- [ ] **Rémy** - PR séparée : unification des deux `useAllProducts` (même clé, configs différentes)
- [ ] **Rémy** - Déplacer le shuffle des produits côté client dans React Query
- [ ] **Rémy** - Définir des durées de cache cohérentes sur toutes les collections (commencer par brands et articles)
- [ ] **Diego** - Pousser la config React Query DevTools sur le repo
