---
tags: [LangagesDeProgs, React, Tests]
---

> \

`fireEvent` permet de simuler des actions utilisateurs en lien avec des éléments de notre DOM.

Comme remplir un champ input :

```tsx
describe("Testing clear button", () => {
	let input: HTMLInputElement
	let button: HTMLButtonElement
	const onSearch = vi.fn()
	const value = "test"  
	beforeEach(() => {
		render(<SearchBar onSearch={onSearch} />)
		input = screen.getByRole("textbox")
		button = screen.getByRole("button", { name: /search/i })
	})

	it("should show clear button when input is not empty", () => {	
		expect(screen.queryByTestId("clear-button")).not.toBeInTheDocument();	
		fireEvent.change(input, { target: { value } });	
		expect(screen.getByTestId("clear-button")).toBeInTheDocument();
	}
```

Ou encore simuler le clic d'un bouton :

```tsx
it("should clear input when clear button is clicked", () => {
	fireEvent.change(input, { target: { value } });
	expect(input).toHaveValue(value);
	fireEvent.click(screen.getByTestId("clear-button"))
	expect(input).toHaveValue("");
})
```

`fireEvent` va interagir directement avec le DOM et envoyé plusieurs event dans le DOM. Mais on peut être plus précis avec [[userEvent]].