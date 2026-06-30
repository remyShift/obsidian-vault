---
tags: [LangagesDeProgs, React, Hooks]
---

## Container

```jsx
import Calculation from "./Calculation"
import { useState } from "react"

export default function Container() {
	const [count, setCount] = useState(0)

	return (
		<div>
			<h1>useMemo</h1>
			<Calculation />
			<button onClick={() => setCount(count + 1)}>Incr {count}</button>
		</div>
	)
}
```

## Calculation

```jsx
import { useState, useMemo } from "react"

export default function Calculation() {
	const [temperature, setTemperature] = useState("")

	console.log("render Calculation")

	function celsiusToFahrenheit(degree) {
		return degree ? degree * 1.8 + 32 : "Entrez une valeur";
}

	const expensiveCalculation = useMemo(() => celsiusToFahrenheit(temperature), [temperature])

	return (
		<div>
			<input type="number"
				value={temperature}
				onChange={e => setTemperature(e.target.value)} />
			<h1>Valeur de {temperature} degrees en Farenheit : {expensiveCalculation}</h1>
		</div>
	)
}
```

Le hook `useMemo` en React est utilisé pour mémoriser des valeurs calculées de manière intensive afin d'optimiser les performances de votre application en évitant des calculs inutiles lors des re-rendus.

### Fonctionnement de `useMemo`

`useMemo` prend deux arguments :

1. Une fonction qui retourne la valeur à mémoriser.
2. Un tableau de dépendances.

La valeur calculée par la fonction est mémorisée tant que les dépendances ne changent pas. Si l'une des dépendances change, la fonction est ré-exécutée et la valeur mise à jour est mémorisée.

### Exemple avec Votre Code

Regardons comment `useMemo` est utilisé dans votre composant `Calculation`.

```jsx
import { useState, useMemo } from "react"

export default function Calculation() {
	const [temperature, setTemperature] = useState("")
	console.log("render Calculation")

	function celsiusToFahrenheit(degree) {
		return degree ? degree * 1.8 + 32 : "Entrez une valeur";
	}

	const expensiveCalculation = useMemo(() => celsiusToFahrenheit(temperature), [temperature])

	return (
		<div>
			<input type="number"
				value={temperature}
				onChange={e => setTemperature(e.target.value)} />
			<h1>Valeur de {temperature} degrees en Farenheit : {expensiveCalculation}</h1>
		</div>
  )
}
```

### Explication

1. **État et Rendu** :
   - `useState` initialise `temperature` avec une valeur vide (`""`).
   - `console.log("render Calculation")` permet de voir quand le composant se re-rend.

2. **Fonction de Conversion** :
   - `celsiusToFahrenheit(degree)` convertit les degrés Celsius en Fahrenheit.

3. **Mémorisation avec `useMemo`** :
   - `const expensiveCalculation = useMemo(() => celsiusToFahrenheit(temperature), [temperature])`
   - `useMemo` mémorise le résultat de `celsiusToFahrenheit(temperature)`.
   - La fonction de conversion est appelée uniquement lorsque `temperature` change.

4. **Rendu** :
   - Un champ de saisie (`input`) permet de changer la température.
   - L'en-tête (`h1`) affiche la valeur en Fahrenheit calculée.

### Pourquoi Utiliser `useMemo`

- **Optimisation des Performances** : Si la conversion Celsius-Fahrenheit était un calcul très coûteux, `useMemo` éviterait de le recalculer à chaque rendu du composant.
- **Réactivité Basée sur les Dépendances** : Le calcul ne se déclenche que lorsque `temperature` change, garantissant des mises à jour efficaces.

En résumé, `useMemo` optimise les performances en mémorisant des valeurs coûteuses à calculer et en les recalculant uniquement lorsque c'est nécessaire, selon les dépendances spécifiées.
