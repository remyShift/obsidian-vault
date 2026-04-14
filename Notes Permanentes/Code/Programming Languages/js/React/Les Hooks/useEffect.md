---
tags: [LangagesDeProgs, React, Hooks]
---

Le hook `useEffect` en React est utilisé pour effectuer des effets de bord dans vos composants fonctionnels. Les effets de bord incluent les opérations telles que la récupération de données, la manipulation du DOM, la souscription à des événements, etc. `useEffect` permet d'exécuter une fonction après le rendu du composant et peut être configuré pour s'exécuter uniquement lorsque certaines dépendances changent.

### Exemple

```jsx
import "./Container.css"
import { useEffect, useState } from "react"

export default function Container() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log("Executé des que count change")
  }, [count])

  return (
    <div>
      <h1>Le hook useEffect</h1>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  )
}
```
### Résumé de l'utilisation de `useEffect`
- `useEffect` est utilisé pour exécuter une fonction après chaque rendu du composant.
- Dans cet exemple, l'effet est configuré pour s'exécuter uniquement lorsque `count` change grâce au tableau de dépendances `[count]`.
- Cela permet de contrôler précisément quand l'effet doit se déclencher et d'éviter des exécutions inutiles.
### Exécution du Code
1. **Initialement** :
   - `count` est initialisé à 0.
   - L'effet `useEffect` s'exécute une première fois après le premier rendu, affichant "Exécuté des que count change".
2. **Lorsqu'on clique sur le bouton** :
   - `setCount` est appelé, incrémentant `count` de 1.
   - Le composant est rerendu avec la nouvelle valeur de `count`.
   - L'effet `useEffect` se déclenche à nouveau car `count` a changé, affichant "Exécuté des que count change" à chaque fois.

En résumé, `useEffect` permet de synchroniser certaines actions avec le cycle de vie du composant, ici, à chaque changement de la valeur de `count`.


De plus mettre un `return` dans notre `useEffect` va permettre de faire des [[Clean Up Functions]].