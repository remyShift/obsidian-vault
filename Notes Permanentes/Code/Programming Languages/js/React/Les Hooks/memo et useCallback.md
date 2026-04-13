> [!info]- Tags
> #LangagesDeProgs #React #Hooks
## Container
```jsx
import Card from "./Card"
import { useState, useCallback } from "react"

export default function Container() {
	const [count, setCount] = useState(0)
	
	const customLog = useCallback(() => {
		console.log("customLog")
	}, [])

	return (
		<div>
			<h1>Memo et useCallback</h1>
			<Card txt={"test"} customLog={customLog}/>
			<button onClick={() => setCount(count + 1)}>Incr</button>
		</div>
	)
}
```
## Card 
```jsx
import { memo } from 'react'

export default memo(function Card({txt, customLog}) {
	console.log("render")

	customLog()

	return (
		<div>
			<p>Carte</p>
			<p>{txt}</p>
		</div>
	)
})
```


Pour comprendre `memo` et `useCallback` en React, examinons comment ils fonctionnent dans les composants parent (`Container`) et enfant (`Card`) de mon exemple.
###  useCallback
`useCallback` est un hook qui retourne une version mémorisée d'une fonction qui ne change que si l'une des dépendances a changé. Il est utile pour éviter de recréer des fonctions lors de chaque rendu si les dépendances n'ont pas changé.

Dans votre composant `Container` :
```jsx
const customLog = useCallback(() => {
  console.log("customLog")
}, [])
```
Ici, `customLog` est mémorisé et ne sera pas recréé à chaque rendu du composant `Container`. Il sera recréé seulement si une des dépendances dans le tableau (ici vide) change.

### memo
`memo` est une fonction d'ordre supérieur qui peut être utilisée pour mémoriser un composant fonctionnel. Cela signifie que le composant ne se re-rendra que si ses props changent. C'est utile pour optimiser les performances en évitant les rendus inutiles.

Dans votre composant `Card` :
```jsx
export default memo(function Card({txt, customLog}) {
  console.log("render")
  customLog()
  return (
    <div>
      <p>Carte</p>
      <p>{txt}</p>
    </div>
  )
})
```
Le composant `Card` est enveloppé par `memo`, donc il ne se re-rendra que si `txt` ou `customLog` change. Grâce à `useCallback`, `customLog` ne change pas entre les rendus, donc `Card` ne se re-rendra que si `txt` change.

### Explication des Rendements
1. **Initial Render**: Quand le composant `Container` est rendu pour la première fois, `Card` est aussi rendu car il est initialement monté. `customLog` est créé une fois.
2. **Click sur le Bouton**: Quand vous cliquez sur le bouton pour incrémenter `count`, `Container` se re-rend. Cependant, grâce à `memo` et `useCallback`, `Card` ne se re-rendra pas car ni `txt` ni `customLog` n'ont changé.

Cela démontre comment `useCallback` et `memo` peuvent être utilisés ensemble pour optimiser les performances en évitant des rendus inutiles des composants enfants.