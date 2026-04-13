> [!info]- Tags
> #LangagesDeProgs #React #Tests 

**NB :** `userEvent` permets une plus grande précision que `fireEvent`. En effet quand `fireEvent` va changer du text dans un input il va directement le remplacer dans le DOM, tandis que `userEvent` va simuler le fait qu'on tape lettre par lettre.
- Ce qui veut dire que le `fireEvent` est synchrone contrairement au `userEvent`qui est asynchrone.

```tsx
describe("userEvent", () => {
	it("render with userEvent", async () => {
		render(<Counter />);
		const plusBtn = screen.getByRole("button", { name: "+" });
		const user = userEvent.setup();
		await user.click(plusBtn);
		expect(screen.queryByTestId("counter-value")?.textContent).toBe("1");
	});
});
```

De plus pour s'éviter de `setup` notre user et render notre composant on peut le faire en une ligne en créant au préalable un fichier `setup.tsx` :

```tsx
import type { RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactElement } from 'react';
import { render } from '@testing-library/react';

export const setup = (jsx: ReactElement, options?: Omit<RenderOptions, 'queries'>) => {
	return {
		user: userEvent.setup(),
		...render(jsx, options),
	};
};
```

Ce qui nous permets désormais de faire :

```tsx
it("render with setup", async () => {
	const { user } = setup(<Counter />);
	const plusBtn = screen.getByRole("button", { name: "+" });
	await user.click(plusBtn);
	screen.getByText("1");
});
```

Aussi si on veut simuler le fait de taper dans un champ input et qu'on veut enchaîner les requêtes il ne faut pas oublier de clear notre input :

```tsx
it("render SearchBar and type text", async () => {
	const onSearch = vi.fn()
	const { user } = setup(<SearchBar onSearch={onSearch} />);
	const input = screen.getByRole('textbox');
	await user.type(input, "search");
	await user.click(screen.getByRole('button', { name: "Search" }));
	expect(onSearch).toHaveBeenCalledWith("search");
	await user.clear(input);
	await user.type(input, 'newsearch');
	await user.click(screen.getByRole('button', { name: "Search" }));
	expect(onSearch).toHaveBeenCalledWith("newsearch");
}
   ```
   