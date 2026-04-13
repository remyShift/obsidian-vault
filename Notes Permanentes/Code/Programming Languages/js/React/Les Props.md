> [!info]- Tags
> #LangagesDeProgs #React 

- Les props (propriétés) sont l'un des concepts fondamentaux de React. Elles permettent de passer des données d'un composant parent à un composant enfant. // arguments d'un component.
- De plus depuis un component enfant on peut modifier à l'aide de [[useState]] le state du component parent.
- Les components étant des fonctions à la base, les props peuvent être des fonctions.
- On doit passer des props à 1 seul niveau de parent / enfant pour un soucis de maintienbilité. Pour éviter du "props drilling" (// passer une props a plusieurs niveau d'affiler pour arriver a celui qui nous intéresse) on peut utiliser l'[[API de Contexte]] pour avoir des données accessible a plusieurs composants d'un coup.

### Container :
```jsx
import Card from "./Card";
import { useState } from "react";

export default function Container() {
	const [str, setStr] = useState("hello world");
	const id = 123;

	return (
		<div>
			<h1>Les props</h1>
			<p>Str du parent : {str}</p>
			<p>{id}</p>
			<br />
			<Card str={str} id={id} changeStr={setStr}/>
		</div>
	);
}
```
### Card :
```jsx
function Card({ str, id, changeStr }) {

	return (
		<div>
			<h1>Card</h1>
			<p>{str}</p>
			<p>{id}</p>
			<button onClick={() => changeStr("prout")}>Change Str</button>
		</div>
	);
}
export default Card;
```



## props.children :

- En React, `props.children` est une fonctionnalité spéciale utilisée pour passer des composants ou des éléments enfants dans un composant parent. Cela permet de créer des composants plus flexibles et réutilisables en permettant au composant parent de rendre des éléments enfants à des emplacements spécifiques.
### Exemple simple de `props.children`

Imaginons que vous avez un composant appelé `Container` qui va envelopper et afficher ce qu'on lui passe comme enfants. Voici comment vous pouvez le faire :

1. **Définir le composant `Container` :**

```jsx
import React from 'react';

const Container = (props) => {
  return (
    <div className="container">
      {props.children}
    </div>
  );
};

export default Container;
```

2. **Utiliser le composant `Container` avec des enfants :**

```jsx
import React from 'react';
import Container from './Container';

const App = () => {
  return (
    <Container>
      <h1>Hello, World!</h1>
      <p>This is a simple example of using props.children in React.</p>
    </Container>
  );
};

export default App;
```

### Explication

1. **Le composant `Container`** :
   - Ce composant prend `props` en argument.
   - Dans le JSX, il utilise `{props.children}` pour afficher tout ce qui est passé comme enfant à l'intérieur de l'élément `<div>`.

2. **Le composant `App`** :
   - Ce composant utilise `Container` comme composant parent.
   - Entre les balises `<Container></Container>`, il passe deux enfants : un `<h1>` et un `<p>`.

### Ce qui se passe :
- Quand `App` est rendu, le contenu entre les balises `<Container>` et `</Container>` est passé en tant que `props.children` au composant `Container`.
- Le composant `Container` rend ce contenu à l'intérieur de la `div` avec la classe `"container"`.

### Pourquoi utiliser `props.children` ?

- **Flexibilité** : Il permet aux composants d'être plus flexibles et réutilisables. Vous pouvez définir des structures de composants sans savoir à l'avance quels éléments spécifiques y seront placés.
- **Encapsulation** : Il permet d'encapsuler des composants tout en permettant aux éléments enfants de s'intégrer dans cette structure encapsulée.

### Exemple plus avancé

Vous pouvez aussi utiliser `props.children` pour conditionnellement rendre les enfants, ou les transformer avant de les rendre.

```jsx
import React from 'react';

const Highlight = (props) => {
  return (
    <div className="highlight">
      {React.Children.map(props.children, (child, index) => (
        <div key={index} className="highlighted-child">
          {child}
        </div>
      ))}
    </div>
  );
};

export default Highlight;
```

Dans cet exemple, chaque enfant est enveloppé dans une `div` avec une classe `highlighted-child`. Cela montre comment vous pouvez manipuler `props.children` avant de les rendre.

En résumé, `props.children` est une fonctionnalité puissante en React pour rendre les composants plus flexibles et réutilisables en permettant de passer et de manipuler des éléments enfants de manière dynamique.