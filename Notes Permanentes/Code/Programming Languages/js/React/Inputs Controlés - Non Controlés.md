> [!info]- Tags
> #LangagesDeProgs #React 

```jsx
import "./Container.css"
import { useRef, useState } from "react"

export default function Container() {

	const [state, setState] = useState("");

	function handleInput(e) {
		setState(e.target.value);
	}

	const emailRef = useRef();
	
	function handleSubmit(e) {
		e.preventDefault()
	}

	return (
		<div>
			<h1>Composants "controlled" et "uncontrolled"</h1>
			<form onSubmit={handleSubmit}>

				<label htmlFor="name">Your name</label>
				<input
					onChange={handleInput}
					value={state}
					type="text"
					id="name"
				/>

				<label htmlFor="email">Your mail</label>
				<input
					ref={emailRef}
					type="email"
					id="email"
				/>

				<button>Send</button>
			</form>
			<p>Your name : {state}</p>
		</div>
	)
}
```


### Input Controlés :
- Un composant contrôlé est un élément de formulaire dont la valeur est entièrement contrôlée par l'état de React. Cela signifie que l'état de l'élément est maintenu dans le state du composant React, et chaque changement de valeur met à jour cet état.
- Dans l'exemple, l'input pour le nom (`<input type="text" id="name" />`) est un composant contrôlé.
```jsx
<input
  onChange={handleInput}  // Fonction appelée à chaque changement de valeur
  value={state}           // La valeur de l'input est liée à l'état `state`
  type="text"
  id="name"
/>
```
- `value={state}` : La valeur de l'input est définie par l'état `state`.
- `onChange={handleInput}` : Quand la valeur de l'input change, la fonction `handleInput` est appelée, mettant à jour l'état `state`.

### Input Non Controlés :
- Un composant non contrôlé est un élément de formulaire dont la valeur est gérée par le DOM lui-même, plutôt que par l'état de React. Pour accéder à la valeur de l'input, on utilise une référence (`ref`).
- Dans l'exemple, l'input pour l'email (`<input type="email" id="email" />`) est un composant non contrôlé.
```jsx
<input
  ref={emailRef}  // Référence à l'élément input
  type="email"
  id="email"
/>
```

- `ref={emailRef}` : Utilise `useRef` pour obtenir une référence directe à l'élément DOM.

- Pour récupérer la valeur de cet input au moment de la soumission du formulaire, on utilise la référence `emailRef` :
```jsx
function handleSubmit(e) {
  e.preventDefault();  // Empêche le rechargement de la page à la soumission du formulaire
  console.log(emailRef.current.value);  // Affiche la valeur actuelle de l'input email
}
```

### Code commentés :

```jsx
import "./Container.css";
import { useRef, useState } from "react";

export default function Container() {
  const [state, setState] = useState("");  // État pour l'input contrôlé

  function handleInput(e) {
    setState(e.target.value);  // Met à jour l'état avec la valeur de l'input
    console.log(state);
  }

  const emailRef = useRef();  // Référence pour l'input non contrôlé

  function handleSubmit(e) {
    e.preventDefault();  // Empêche le rechargement de la page
    console.log(emailRef.current.value);  // Affiche la valeur de l'input email
  }

  return (
    <div>
      <h1>Composants "controlled" et "uncontrolled"</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Your name</label>
        <input
          onChange={handleInput}  // Mise à jour de l'état pour l'input contrôlé
          value={state}           // Liaison de l'état à l'input
          type="text"
          id="name"
        />

        <label htmlFor="email">Your mail</label>
        <input
          ref={emailRef}  // Utilisation de la référence pour l'input non contrôlé
          type="email"
          id="email"
        />
        <button>Send</button>
      </form>
      <p>Your name : {state}</p>  // Affichage de la valeur de l'input contrôlé
    </div>
  );
}
```
