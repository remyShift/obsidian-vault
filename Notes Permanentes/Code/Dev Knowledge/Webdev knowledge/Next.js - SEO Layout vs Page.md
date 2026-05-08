---
tags: [next-js, architecture, seo, components]
---

# Next.js : SEO dans Layout, données dans Page

## Le pattern

Dans une app Next.js avec l'App Router, la responsabilité est séparée selon le type :

- **Layout component** : SEO (`generateMetadata`, `<title>`, `<meta>`) — infrastructure transversale
- **Page component** : data fetching (React Query côté client, fetch côté serveur) — logique métier

## Pourquoi

SEO n'est pas une donnée de la page, c'est une infrastructure. Confondre les deux revient à mélanger présentation et configuration système.

Kyle Conrad (30/04/2026) : "You're confusing the concept with the component. SEO is infra, not business logic."

## Exemple concret (SearchPage olis-lab)

```tsx
// SearchLayout.tsx — infra SEO ici
export function generateMetadata(): Metadata {
  return { title: 'Search', description: '...' }
}

// SearchPage.tsx — data fetching ici
function SearchPage() {
  const { data } = useSearchPageQuery(query)
  return <SearchResults data={data} />
}
```

## Pattern associé

Pagination via query params : le Page component lit `searchParams`, les passe au hook React Query. La logique de pagination reste dans la Page, pas dans le Layout.
