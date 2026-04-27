# Search System Current Architecture

Full-stack walkthrough of the search feature in `apps/web_client` (React CRA) and `apps/server` (Express + MongoDB).


---

## 1. Component Hierarchy

The search feature is a self-contained sub-tree mounted inside [`Menu.tsx`](https://github.com/olis-lab/web-app/blob/e4f8bced271bc936ab47ac8090a6dcb8ef56c6cc/apps/web_client/src/components/navbars/Menu/Menu.tsx). When `isSearchActive` is `true`, `Menu` swaps its entire body for the [`Search`](https://github.com/olis-lab/web-app/blob/e4f8bced271bc936ab47ac8090a6dcb8ef56c6cc/apps/web_client/src/components/navbars/Menu/search/search.tsx) component.

```
Menu.tsx                                       ← orchestrator owns isSearchActive
└── Search (search.tsx)                        ← search root component
      ├── SearchHeader                          ← close button
      ├── Input (@olis-lab/ui)                  ← text input
      ├── LoadingSkeleton                       ← while fetching
      ├── SearchResults                         ← quick suggestion dropdown
      │     └── SearchResultItem
      ├── NoResults
      ├── LastSearches                          ← localStorage history
      └── Expand (expand.tsx)                   ← full results panel
            ├── ExpandHeader
            ├── OptionsNav                      ← PRODUCTS / BUNDLES / ARTICLES / ACTIVES tabs
            ├── SearchProductsGrid
            ├── ArticlesSection
            │     └── ArticleItem
            └── ActivesSection
                  └── ActiveItem
```

### Hooks tree

```
Search.tsx
├── useSearch              ← query state + debounce + suggestions fetch
├── useSearchHistory       ← localStorage read/write
├── useExpand              ← 4 API calls in parallel
└── useClickOutside        ← outside click handler, reads isPopupOpenAtom (Jotai)

Expand.tsx
├── useResponsive          ← isMobile / isMobileOrTablet
└── useCurrentLanguage     ← i18n lang

Menu.tsx
├── useNotionArticlesQuery ← React Query
└── useCategories          ← React Query
```

---

## 2. The Two Search Phases

The search operates in two distinct phases with different UX, data sources, and layouts.

### Phase 1 : Suggestions (while typing)

Triggered by every keystroke, but debounced **1000ms** via lodash before hitting the API.

**State split in [`useSearch`](https://github.com/olis-lab/web-app/blob/e4f8bced271bc936ab47ac8090a6dcb8ef56c6cc/apps/web_client/src/components/navbars/Menu/search/hooks/useSearch.ts):**

| Variable                                                                                                                                                                     | Updates                        |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| [`userInput`](https://github.com/olis-lab/web-app/blob/e4f8bced271bc936ab47ac8090a6dcb8ef56c6cc/apps/web_client/src/components/navbars/Menu/search/hooks/useSearch.ts#L22)   | Immediately on every keystroke |
| [`searchQuery`](https://github.com/olis-lab/web-app/blob/e4f8bced271bc936ab47ac8090a6dcb8ef56c6cc/apps/web_client/src/components/navbars/Menu/search/hooks/useSearch.ts#L21) | After 1000ms debounce          |

The [debounce](https://github.com/olis-lab/web-app/blob/e4f8bced271bc936ab47ac8090a6dcb8ef56c6cc/apps/web_client/src/components/navbars/Menu/search/hooks/useSearch.ts#L37-L42) wraps `handleQueryChange`, so `searchQuery` only updates 1 second after the user stops typing, preventing API calls on every character.

**What is shown :  [`getSuggestionsContent()`](https://github.com/olis-lab/web-app/blob/e4f8bced271bc936ab47ac8090a6dcb8ef56c6cc/apps/web_client/src/components/navbars/Menu/search/search.tsx#L180-L192):**

| Condition | Component |
|---|---|
| `loading === true` | `LoadingSkeleton` |
| `results.length > 0` | `SearchResults` |
| Results empty | `NoResults` |
| No query + has history | `LastSearches` |

**API call:**
```
GET /products/search-suggestions/:query/:lang
```
Returns: products (×10), actives (×3), articles (×2), brands (×2), bundles (×2), all limited for speed.

---

### Phase 2 : Expand (after Enter / arrow click)

Triggered by [`handleEnter()`](https://github.com/olis-lab/web-app/blob/e4f8bced271bc936ab47ac8090a6dcb8ef56c6cc/apps/web_client/src/components/navbars/Menu/search/search.tsx#L133-L145). Sets `isExpanded = true`, which activates [`useExpand`](https://github.com/olis-lab/web-app/blob/e4f8bced271bc936ab47ac8090a6dcb8ef56c6cc/apps/web_client/src/components/navbars/Menu/search/hooks/useExpand.ts) and fires 4 parallel API calls via [`Promise.allSettled`](https://github.com/olis-lab/web-app/blob/e4f8bced271bc936ab47ac8090a6dcb8ef56c6cc/apps/web_client/src/components/navbars/Menu/search/hooks/useExpand.ts#L61-L66).

**Parallel API calls:**

| Endpoint | Data |
|---|---|
| `GET /products/search-products/:q/:lang` | Products |
| `GET /articles/search/:q/:lang` | Articles |
| `GET /actives/search/:q` | Actives |
| `GET /bundles/search/:q/:lang` | Bundles |

**Expand tabs:** `PRODUCTS` / `BUNDLES` / `ARTICLES` / `ACTIVES`

Tabs are automatically disabled if a section has 0 results. The component [auto-switches](https://github.com/olis-lab/web-app/blob/e4f8bced271bc936ab47ac8090a6dcb8ef56c6cc/apps/web_client/src/components/navbars/Menu/expand/expand.tsx#L501-L529) to the first available tab after data loads.

---

## 4. End-to-End Data Flow

### Phase 1 : Suggestions

```
User types "niacinamide"
        │
        ▼  useSearch.handleInputChange()                   [useSearch.ts#L84-L92]
        │  sets userInput immediately
        │
        ▼  lodash debounce (1000ms)                        [useSearch.ts#L37-L42]
        │  cancels if user keeps typing
        │
        ▼  GET /products/search-suggestions/niacinamide/fr
        │
        ▼  MongoDB $text search × 5 collections           [shopProductSchema.js#L421-L427]
        │  Fuse.js fallback if $text returns 0 results
        │
        ▼  calculateSuggestions()                          [suggestionCalculator.ts]
        │  client-side transform
        │
        ▼  SearchResults dropdown rendered
```

### Phase 2 : Expand

```
User presses Enter
        │
        ▼  handleEnter()                                   [search.tsx#L133-L145]
        │  addToHistory() + setIsExpanded(true)
        │
        ▼  useExpand activates (shouldFetch = true)        [useExpand.ts#L48-L132]
        │  Promise.allSettled : 4 calls fired simultaneously
        │
        ▼  4 × GET API calls in parallel                   [useExpand.ts#L61-L66]
        │
        ▼  MongoDB $text + Fuse.js (no limit)              [shopProductSchema.js#L475-L537]
        │  all results returned
        │
        ▼  Expand panel rendered with tab navigation
        │
        ▼  User clicks result → navigate() + clearSearch()
```

---

## 5. Backend Architecture

Express.js (CommonJS) with Mongoose. The search logic lives in static methods directly on the Mongoose model ([`shopProductSchema.js`](https://github.com/olis-lab/web-app/blob/e4f8bced271bc936ab47ac8090a6dcb8ef56c6cc/apps/server/models/shopProductSchema.js)), not in a dedicated service layer.

### Request routing

```
GET /products/search-suggestions/:query/:lang?
  → ProductsController.getSearchSuggestions()         [products.controller.js#L995-L1023]
  → shopProductSchema.statics.getSearchSuggestions()  [shopProductSchema.js#L413-L473]

GET /products/search-products/:query/:lang?
  → ProductsController.getSearchProducts()            [products.controller.js#L1026-L1048]
  → shopProductSchema.statics.getSearchProducts()     [shopProductSchema.js#L475]

GET /products/search/:query/:lang?                    ← legacy, not used by Search component
  → ProductsController.searchByNameInciArticle()      [products.controller.js#L964-L993]
  → shopProductSchema.statics.searchByNameInciArticle()[shopProductSchema.js#L298-L411]
```

Full routes file: [`productsRouter.js`](https://github.com/olis-lab/web-app/blob/e4f8bced271bc936ab47ac8090a6dcb8ef56c6cc/apps/server/routes/productsRouter.js#L40-L48).

### Search algorithm : 2 levels

| Level           | Mechanism                                                                                                                                                                     | Trigger                           | Limit (suggestions mode)       |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ------------------------------ |
| **1. Primary**  | [MongoDB `$text` index](https://github.com/olis-lab/web-app/blob/e4f8bced271bc936ab47ac8090a6dcb8ef56c6cc/apps/server/models/shopProductSchema.js#L489-L499) native full-text | Always tried first                | 10 products                    |
| **2. Fallback** | [Fuse.js fuzzy search](https://github.com/olis-lab/web-app/blob/e4f8bced271bc936ab47ac8090a6dcb8ef56c6cc/apps/server/models/shopProductSchema.js#L524-L531) (threshold: 0.4)  | Only if `$text` returns 0 results | Top 100 fetched, Fuse re-ranks |

Fields indexed: `brand`, `sku`, `inci`, `translations.[lang].title`.  
Results always sorted by `last_edited_time DESC` (most recently edited products first).

### getSearchSuggestions parallel model queries

[`shopProductSchema.js#L413-L473`](https://github.com/olis-lab/web-app/blob/e4f8bced271bc936ab47ac8090a6dcb8ef56c6cc/apps/server/models/shopProductSchema.js#L413-L473)

```js
const [products, actives, articles, brands, bundles] = await Promise.all([
  this.getSearchProducts(query, lang, true),               // limit = 10
  Active.findByName(query, true),                          // limit = 3
  NotionArticle.findByArticlePlainText(query, lang, true), // limit = 2
  Brands.searchByBrand(query),
  Bundles.getSearchBundles(query, lang, true),             // limit = 2
]);
```

| Source | Model | Limit | Sort |
|---|---|---|---|
| Products | `shopProductSchema` | 10 | `last_edited_time DESC` |
| Actives | `notionActiveSchema` | 3 | `active_name ASC` |
| Articles | `notionArticleSchema` | 2 | `last_edited_time DESC` |
| Brands | `brandsSchema` | No hard limit | `name ASC` |
| Bundles | `bundlesModel` | 2 | `title ASC` |

> **No cache:** The search endpoints have no caching layer. Every debounced keystroke triggers fresh MongoDB queries. The server has a `services/cache.js` module but it is not used here.

### Client API layer ProductsApi.ts

All API calls go through a static class `productsApi` that wraps Axios. Each method normalizes the response into `{ success: boolean, data?, message? }`.

| Method | Endpoint | Used by |
|---|---|---|
| [`getSearchSuggestions`](https://github.com/olis-lab/web-app/blob/e4f8bced271bc936ab47ac8090a6dcb8ef56c6cc/apps/web_client/src/service/API/ProductsApi.ts#L516-L532) | `GET /products/search-suggestions/:q/:lang` | `useSearch` hook |
| [`getSearchProducts`](https://github.com/olis-lab/web-app/blob/e4f8bced271bc936ab47ac8090a6dcb8ef56c6cc/apps/web_client/src/service/API/ProductsApi.ts#L534-L550) | `GET /products/search-products/:q/:lang` | `useExpand` hook |

---

## 6. State Management

| State                                                                                                                                                                                                              | Location           | Mechanism                                   | Notes                                  |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ | ------------------------------------------- | -------------------------------------- |
| [`isSearchActive`](https://github.com/olis-lab/web-app/blob/e4f8bced271bc936ab47ac8090a6dcb8ef56c6cc/apps/web_client/src/components/navbars/Menu/Menu.tsx#L51)                                                     | `Menu.tsx`         | `useState`                                  | Swaps entire menu body to `Search`     |
| [`userInput` / `searchQuery`](https://github.com/olis-lab/web-app/blob/e4f8bced271bc936ab47ac8090a6dcb8ef56c6cc/apps/web_client/src/components/navbars/Menu/search/hooks/useSearch.ts#L21-L22)                     | `useSearch`        | `useState` + lodash debounce                | Two separate values by design          |
| [`searchResults` / `loading`](https://github.com/olis-lab/web-app/blob/e4f8bced271bc936ab47ac8090a6dcb8ef56c6cc/apps/web_client/src/components/navbars/Menu/search/hooks/useSearch.ts#L23-L24)                     | `useSearch`        | `useState` + `useEffect` + fetch            | Manual fetch NOT React Query           |
| [`isExpanded` / `expandToSection`](https://github.com/olis-lab/web-app/blob/e4f8bced271bc936ab47ac8090a6dcb8ef56c6cc/apps/web_client/src/components/navbars/Menu/search/search.tsx#L60-L63)                        | `Search.tsx`       | `useState` (local)                          | Duplicated in `useExpand` see debt     |
| [`searchHistory`](https://github.com/olis-lab/web-app/blob/e4f8bced271bc936ab47ac8090a6dcb8ef56c6cc/apps/web_client/src/components/navbars/Menu/search/hooks/useSearchHistory.ts#L13)                              | `useSearchHistory` | `useState` + `globalService` (localStorage) | No Jotai, no React Query               |
| [`products` / `articles` / `actives` / `bundles`](https://github.com/olis-lab/web-app/blob/e4f8bced271bc936ab47ac8090a6dcb8ef56c6cc/apps/web_client/src/components/navbars/Menu/search/hooks/useExpand.ts#L40-L43) | `useExpand`        | `useState` + `useEffect` + fetch            | Manual fetch  NOT React Query          |
| [`isPopupOpen`](https://github.com/olis-lab/web-app/blob/e4f8bced271bc936ab47ac8090a6dcb8ef56c6cc/apps/web_client/src/components/navbars/Menu/search/hooks/useClickOutside.ts#L15)                                 | `useClickOutside`  | `useAtom(isPopupOpenAtom)`                  | Cross-feature coupling with `BagStore` |

---

## 7. Technical Debt

### Issue 1 : Manual fetch instead of React Query (High)

[`useSearch.ts#L44-L73`](https://github.com/olis-lab/web-app/blob/e4f8bced271bc936ab47ac8090a6dcb8ef56c6cc/apps/web_client/src/components/navbars/Menu/search/hooks/useSearch.ts#L44-L73) and [`useExpand.ts#L48-L132`](https://github.com/olis-lab/web-app/blob/e4f8bced271bc936ab47ac8090a6dcb8ef56c6cc/apps/web_client/src/components/navbars/Menu/search/hooks/useExpand.ts#L48-L132) both use `useEffect` + manual async calls to load data.

**Fix:** Migrate both hooks to `useQuery`. This would also resolve the `window.location.reload()` issue below.

---

### Issue 2 : `window.location.reload()` after navigation (High)

In [`expand.tsx#L559-L566`](https://github.com/olis-lab/web-app/blob/e4f8bced271bc936ab47ac8090a6dcb8ef56c6cc/apps/web_client/src/components/navbars/Menu/expand/expand.tsx#L559-L566) and [`expand.tsx#L568-L572`](https://github.com/olis-lab/web-app/blob/e4f8bced271bc936ab47ac8090a6dcb8ef56c6cc/apps/web_client/src/components/navbars/Menu/expand/expand.tsx#L568-L572), navigating to an active or article page forces a full page reload:

```js
navigate(`/feed/actives/${active.slug}`);
window.location.reload(); // ← anti-pattern
```

This masks a state management bug, search state is not cleaned up properly on navigation, so the page appears broken without the reload.

**Fix:** `queryClient.invalidateQueries()` or ensuring `clearSearch()` is called before navigation.

---

### Issue 3 : Dead state in `useExpand` (Medium)

[`useExpand.ts#L134-L144`](https://github.com/olis-lab/web-app/blob/e4f8bced271bc936ab47ac8090a6dcb8ef56c6cc/apps/web_client/src/components/navbars/Menu/search/hooks/useExpand.ts#L134-L144) returns `isExpanded`, `setIsExpanded`, `expandToSection`, `setExpandToSection`, but [`search.tsx#L60-L63`](https://github.com/olis-lab/web-app/blob/e4f8bced271bc936ab47ac8090a6dcb8ef56c6cc/apps/web_client/src/components/navbars/Menu/search/search.tsx#L60-L63) redeclares all four as local `useState` variables and ignores the hook's return values entirely.

**Fix:** Remove the dead state from the `useExpand` return type.

---

### Issue 4 : `any[]` for `selectedProducts` (Medium)

[`Menu.tsx#L49`](https://github.com/olis-lab/web-app/blob/e4f8bced271bc936ab47ac8090a6dcb8ef56c6cc/apps/web_client/src/components/navbars/Menu/Menu.tsx#L49):

```ts
const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
```

**Fix:** Type with `MenuProduct[]`, already defined in [`ProductsApi.ts#L10-L16`](https://github.com/olis-lab/web-app/blob/e4f8bced271bc936ab47ac8090a6dcb8ef56c6cc/apps/web_client/src/service/API/ProductsApi.ts#L10-L16).

---

### Issue 5 : Inline subcategory translation logic (Low)

[`Menu.tsx#L155-L192`](https://github.com/olis-lab/web-app/blob/e4f8bced271bc936ab47ac8090a6dcb8ef56c6cc/apps/web_client/src/components/navbars/Menu/Menu.tsx#L155-L192) contains ~40 lines of data transformation (deduplication, translation lookup, sorting) that belongs in a dedicated hook.

---

### Bonus : Duplicate API calls across phases

[`getSearchSuggestions`](https://github.com/olis-lab/web-app/blob/e4f8bced271bc936ab47ac8090a6dcb8ef56c6cc/apps/server/models/shopProductSchema.js#L421-L422) (Phase 1) internally calls `getSearchProducts` to build the product suggestions. Then when the user presses Enter, [`useExpand`](https://github.com/olis-lab/web-app/blob/e4f8bced271bc936ab47ac8090a6dcb8ef56c6cc/apps/web_client/src/components/navbars/Menu/search/hooks/useExpand.ts#L62) independently calls `getSearchProducts` again for the same query. The same product search runs twice.

**Fix:** Cache the Phase 1 product results client-side and reuse them in Phase 2 instead of re-fetching.

---

## 8. File Map

### Frontend : `apps/web_client/src`

| File                                                                                                                                                                                                         | Role                                              |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------- |
| [`Menu/Menu.tsx`](https://github.com/olis-lab/web-app/blob/e4f8bced271bc936ab47ac8090a6dcb8ef56c6cc/apps/web_client/src/components/navbars/Menu/Menu.tsx)                                                    | Orchestrator, owns `isSearchActive`               |
| [`search/search.tsx`](https://github.com/olis-lab/web-app/blob/e4f8bced271bc936ab47ac8090a6dcb8ef56c6cc/apps/web_client/src/components/navbars/Menu/search/search.tsx)                                       | Search root component                             |
| [`search/hooks/useSearch.ts`](https://github.com/olis-lab/web-app/blob/e4f8bced271bc936ab47ac8090a6dcb8ef56c6cc/apps/web_client/src/components/navbars/Menu/search/hooks/useSearch.ts)                       | Input state + debounce + suggestions fetch        |
| [`search/hooks/useSearchHistory.ts`](https://github.com/olis-lab/web-app/blob/e4f8bced271bc936ab47ac8090a6dcb8ef56c6cc/apps/web_client/src/components/navbars/Menu/search/hooks/useSearchHistory.ts)         | localStorage history                              |
| [`search/hooks/useExpand.ts`](https://github.com/olis-lab/web-app/blob/e4f8bced271bc936ab47ac8090a6dcb8ef56c6cc/apps/web_client/src/components/navbars/Menu/search/hooks/useExpand.ts)                       | Expand data fetch (4 APIs in parallel)            |
| [`search/hooks/useClickOutside.ts`](https://github.com/olis-lab/web-app/blob/e4f8bced271bc936ab47ac8090a6dcb8ef56c6cc/apps/web_client/src/components/navbars/Menu/search/hooks/useClickOutside.ts)           | Outside click handler + Jotai                     |
| [`search/utils/searchUtils.ts`](https://github.com/olis-lab/web-app/blob/e4f8bced271bc936ab47ac8090a6dcb8ef56c6cc/apps/web_client/src/components/navbars/Menu/search/utils/searchUtils.ts)                   | `highlightMatch()` helper                         |
| [`search/utils/suggestionCalculator.ts`](https://github.com/olis-lab/web-app/blob/e4f8bced271bc936ab47ac8090a6dcb8ef56c6cc/apps/web_client/src/components/navbars/Menu/search/utils/suggestionCalculator.ts) | `calculateSuggestions()` -> client-side transform |
| [`search/types.ts`](https://github.com/olis-lab/web-app/blob/e4f8bced271bc936ab47ac8090a6dcb8ef56c6cc/apps/web_client/src/components/navbars/Menu/search/types.ts)                                           | `SearchResult` and section types                  |
| [`expand/expand.tsx`](https://github.com/olis-lab/web-app/blob/e4f8bced271bc936ab47ac8090a6dcb8ef56c6cc/apps/web_client/src/components/navbars/Menu/expand/expand.tsx)                                       | Expand panel (`forwardRef`)                       |
| [`service/API/ProductsApi.ts`](https://github.com/olis-lab/web-app/blob/e4f8bced271bc936ab47ac8090a6dcb8ef56c6cc/apps/web_client/src/service/API/ProductsApi.ts)                                             | Client API wrapper (Axios)                        |

### Backend : `apps/server`

| File                                                                                                                                                                               | Role                                           |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| [`routes/productsRouter.js`](https://github.com/olis-lab/web-app/blob/e4f8bced271bc936ab47ac8090a6dcb8ef56c6cc/apps/server/routes/productsRouter.js)                               | Express routes for `/products/*`               |
| [`controllers/products.controller.js`](https://github.com/olis-lab/web-app/blob/e4f8bced271bc936ab47ac8090a6dcb8ef56c6cc/apps/server/controllers/products.controller.js)           | Thin controller -> delegates to model          |
| [`models/shopProductSchema.js`](https://github.com/olis-lab/web-app/blob/e4f8bced271bc936ab47ac8090a6dcb8ef56c6cc/apps/server/models/shopProductSchema.js)                         | Mongoose model -> statics for all search logic |
| [`routes/bundlesRouter.js`](https://github.com/olis-lab/web-app/blob/e4f8bced271bc936ab47ac8090a6dcb8ef56c6cc/apps/server/routes/bundlesRouter.js)                                 | Bundles search route                           |
| [`routes/notionActivesRouter.js`](https://github.com/olis-lab/web-app/blob/e4f8bced271bc936ab47ac8090a6dcb8ef56c6cc/apps/server/routes/notionActivesRouter.js)                     | Actives search route                           |
| [`controllers/notionArticlesController.js`](https://github.com/olis-lab/web-app/blob/e4f8bced271bc936ab47ac8090a6dcb8ef56c6cc/apps/server/controllers/notionArticlesController.js) | Articles search                                |
| [`services/cache.js`](https://github.com/olis-lab/web-app/blob/e4f8bced271bc936ab47ac8090a6dcb8ef56c6cc/apps/server/services/cache.js)                                             | Cache service (exists but unused for search)   |

