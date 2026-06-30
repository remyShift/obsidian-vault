---
tags: [LangagesDeProgs, React, Hooks]
---

- `useRef` est un autre Hook de React qui te permet de créer une référence mutable qui persiste à travers les rendus du composant. C'est une variable manipulable qui ne provoquera pas de re-render lors de sa mise à jour. Imagine-le comme une étiquette que tu mets sur un objet et que tu peux utiliser pour le suivre ou le manipuler.

```jsx
const ref = useRef(defaultValue)

console.log(ref)
// {current.defaultValue}
```

- **NB :** Une référence en JS est soit un objet soit un tableau soit une classe personnalisé. D'où le fait que notre ref dans l'exemple du dessus est un objet et que pour accéder à sa valeur (dans notre exemple `defaultValue`) il faudra faire `ref.current`.

```jsx
import { useRef, useState } from "react";

//Utilité de useRef :
//1. Permet d'isoler une valeur parmi les mises à jour
//2. Selectionner un élément

export default function Container() {
	const [state, setState] = useState(0);
	const countRef = useRef(0);

	function handleCountRef() {
		countRef.current++;
		console.log(txtRef.current);
	}

	function handleState() {
		setState(state + 1);
	}

	const txtRef = useRef();

	return (
		<div>
			<h1>Le hook useRef</h1>
			<p>Value of state : {state}</p>
			<p>Value of ref : {countRef.current}</p>
			<button onClick={() => handleCountRef()}>Increment useRef</button>
			<button onClick={() => handleState()}>Increment state</button>
			<br />
			<br />
			<p ref={txtRef}>Lorem ipsum dolor sit amet.</p>
		</div>
	);

}
```

- En résumé, `useRef` est utile pour accéder à des éléments DOM, créer des instances persistantes entre les rendus, ou même stocker des valeurs mutables qui ne déclenchent pas de nouvelle rendu lorsqu'elles changent (si un state viens a faire changer le component où est notre ref alors notre ref va se mettre à jour avec sa nouvelle valeur, si il est afficher sur notre page mais l'interêt du ref n'est pas de l'afficher).

- **NB :** [La face cachée du useRef - React Hooks](https://codelynx.dev/posts/comment-utiliser-useref)
