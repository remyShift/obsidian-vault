---
tags: [react, tests, vitest, ssr]
---

# Tester un no-flash effect en React

## Le piège
Un test qui interroge le DOM final (`expect(queryByText('boot')).toBeNull()`) **masque** les bugs de flash visuel. Si l'overlay s'affiche 1 frame avant d'être masqué par `useLayoutEffect`, l'utilisateur le voit, mais le test passe car au moment de l'assertion l'overlay est déjà retiré.

## La cause
`useLayoutEffect` est synchrone après le DOM update mais **après** le commit. Cycle render → commit → effect. L'utilisateur peut voir 1 frame entre commit et re-render.

## La fix code
`useState(initializer)` lit la valeur initiale **avant** le premier render :

```ts
// ❌ flash possible
const [showBoot, setShowBoot] = useState(true)
useLayoutEffect(() => {
  if (sessionStorage.getItem('boot-seen')) setShowBoot(false)
}, [])

// ✅ pas de flash
const [showBoot] = useState(() =>
  typeof window !== 'undefined' && !sessionStorage.getItem('boot-seen')
)
```

## La fix test
Spy sur le composant lui-même (mocké) pour capturer s'il a été monté **du tout**, pas juste son état final dans le DOM.

```ts
import { vi } from 'vitest'
vi.mock('./BootAnimation', () => ({
  default: vi.fn(() => null)
}))

import BootAnimation from './BootAnimation'

// Render Screen avec sessionStorage rempli
expect(BootAnimation).not.toHaveBeenCalled()
```

Assertion plus forte : "le composant n'a pas été monté", pas "le DOM final ne le contient pas".
