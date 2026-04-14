---
tags: [LangagesDeProgs, React, Tests]
---

**NB :** Le fichier de test de notre composant doit être en `tsx` ou `jsx` étant donné qu'on va simuler le rendu de notre composant.


```tsx
import { render, screen } from '@testing-library/react'
import "@testing-library/jest-dom"
import Counter from "@/components/Counter"
 
describe("Counter", () => {	
	it("render a component and show screen.debug", () => {
		render(<Counter />)
		screen.debug()
});
```

Pour tester un composant on va d'abord simuler un render avec justement `render(<NotreComponent />)`. Puis avec `screen.debug()` on va voir dans notre terminal comment est rendu notre component dans l'environnement de test.

On peut aussi sélectionner un élément de notre component :
```tsx
it("get button - with getByRole", () => {
	render(<Counter />);
	const btnIncrement = screen.getByRole("button", { name: "-" });
	expect(btnIncrement).toBeInDocument();
});
```
**NB :** Lorsqu'on sélectionne un bouton son `name` == le text qu'il contient. De plus, `getByRole` agit comme une assertion et donc vérifie si l'élément qu'on veut existe bien, si c'est pas le cas le test échouera (ou les tests qui suivent si on est dans un `beforeEach`).

Ici on est obliger de préciser le nom du button qu'on veut étant donné qu'on en a plusieurs dans notre component.

Il existe différentes méthodes pour appeler un component on peut le retrouver dans la doc de testing library : [Testing Library Doc](https://testing-library.com/docs/).

De plus on peut simuler des actions utilisateurs avec [[fireEvent]].