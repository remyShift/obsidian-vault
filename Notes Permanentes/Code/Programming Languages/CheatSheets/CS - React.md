---
tags: [LangagesDeProgs, CheatSheet, React]
---

[Fiche de révision React](https://www.amaliamaturana.com/fr/fiche-de-revision-react/)
# 🧠 Fiche de révision React

## 1. JSX & Composants ⚛️
- Composants fonctionnels TypeScript :
```ts
interface UserProps { name: string; age: number; isActive?: boolean }
const UserCard: React.FC<UserProps> = ({ name, age, isActive = true }) => (
  <div className={isActive ? 'active' : 'inactive'}>
    <h2>{name}</h2>
    <p>{age} ans</p>
    {isActive && <span>En ligne</span>}
  </div>
);
```

- Rendu de liste :
```ts
<ul>
  {todos.map(todo => <li key={todo.id}>{todo.text}</li>)}
</ul>
```

- Gestion d’événements :
```ts
<form onSubmit={e => {e.preventDefault(); /* logique */}}>
  <input onChange={e => console.log(e.target.value)} />
</form>
```

### À retenir :
- **key** : stable & unique pour optimiser le rendu.
- **Fragments** (`<>...</>`) remplacent `<div>` superflus.
- Propriétés par défaut via destructuration.
- Utiliser `useCallback` pour éviter les re-renders inutiles.
## 2. Hooks de base

- **useState** : état local, immutable.
```ts
const [count, setCount] = useState(0);
const [user, setUser] = useState({name:'', email:''});
```

- **useEffect** : async, cleanup, dépendances.
```ts
useEffect(() => {
  const timer = setInterval(tick, 1000);
  return () => clearInterval(timer);
}, []);
```
- **useContext** : API globale (auth, thème, i18n).
- **useReducer** : gestion logique complexe, typée, style Redux.
### Utilisations typiques :
- `useState` : formulaires simples, toggles.
- `useEffect` : fetch API, timers.
- `useContext` : données partagées.
- `useReducer` : multi-étapes, formulaires complexes.
## 3. Hooks avancés & Optimisation
- **useMemo** : mémo valeur lourde.
- **useCallback** : mémo fonction stable.
- **React.memo** : évite re-renders si props identiques.
```ts
const filtered = useMemo(() => items.filter(...), [items, filter]);
const clickHandler = useCallback(id => { ... }, []);
const MemoItem = React.memo(({ item }) => <div>{item.name}</div>);
```
### À savoir :
- `useCallback` pour fonctions, `useMemo` pour valeurs.
- Attention à la sur-optimisation : mesurer d’abord.
## 4. Gestion d’état
### Niveaux d’état :
1. **Local** (`useState`)
2. **Dérivé** (`useMemo`)
3. **Complexe** (`useReducer`)
4. **Global** (`useContext`)
5. **Externe** (React Query, SWR, Redux RTK)
#### Exemple `useReducer` :
```ts
type State = { todos: Todo[]; filter: 'all'; loading: boolean };
type Action = { type: 'ADD_TODO'; text: string } | { type: 'TOGGLE_TODO'; id: string };
const reducer = (s: State, a: Action): State => { ... };

const useTodos = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const addTodo = useCallback(text => dispatch({type: 'ADD_TODO', text}), []);
  return { state, addTodo, dispatch };
};
```
#### Context API :
```ts
const AuthContext = createContext<AuthContextType|null>(null);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User|null>(null);
  const login = useCallback(async (e,p)=>{...}, []);
  const value = useMemo(() => ({user, login, logout, loading}), [user,login,loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export const useAuth = () => { ... };
```
## 5. Performance
- **Optimisations code** : React.memo, useCallback, useMemo.
- **Bundle** : lazy-loading, code-splitting, tree-shaking.
- **Runtime** : virtualisation (react-window), debounce inputs.
- **Monitoring** : DevTools, Profiler, Web Vitals.
### Exemples :
- **Lazy loading** :
```ts
const LazyComp = lazy(() => import('./Comp'));
<Suspense fallback="..." ><LazyComp/></Suspense>
```
- **useDebounce** for search inputs.
## 6. Patterns avancés et conf toujours
- Render props, custom hooks, compound components.
- Exemple `useAPI`, `useLocalStorage`, Modal compound components.
## 7. Erreurs courantes
1. Mutation directe d’état.
2. Key manquantes ou non-uniques.
3. useEffect sans dépendances → boucles.
4. Pas de cleanup.
5. Dépendances incorrectes.
6. Sur‑optimisation prématurée.
7. Prop drilling au lieu de context.
8. Pas de fallback UI / gestion d’erreur.
9. État mal placé dans hiérarchie.
10. Pas de tests.
## 8. Questions d’entretien
### Junior :
- Différence fonction vs classe.
- C’est quoi JSX ?
- Comment passer des props parent→enfant ?
- Pourquoi les keys ?
- Différence useState/useRef ?
### Intermédiaire :
- Cycle de vie useEffect.
- Optimisations de render.
- useCallback vs useMemo.
- Gérer état global sans Redux.
- Closure stale et dépendances.
### Senior :
- Concevoir un cache API.
- DataTable performant.
- Patterns pour prop drilling.
- Debug performance React.
- Architecture scalable React.
