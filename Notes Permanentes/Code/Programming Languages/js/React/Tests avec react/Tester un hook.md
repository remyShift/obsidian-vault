> [!info]- Tags
> #LangagesDeProgs #React #Tests 

Imaginons que nous ayons un un hook custom qui nous servirait de compteur :

```ts
import { useState } from "react";

type useCounterProps = {
	initialValue?: number;
	initialStep?: number;
}

  

	export const useCounter = ({ initialValue = 0, initialStep = 1 }: useCounterProps = {}) => {

	const [count, setCount] = useState(initialValue);
	const [step, setStep] = useState(initialStep);

	const increment = () => setCount(count + step);
	const decrement = () => setCount(Math.max((count - step), 0));
	const reset = () => setCount(initialValue);  
	
	return { count, increment, decrement, reset, setStep };
};
```

Si on veut le tester instinctivement on ferait :

```ts
import { useCounter } from "../hooks/useCounter";

describe("useCounter", () => {
	it("by default the initial value is 0", () => {
		const { count } = useCounter();
		expect(count).toBe(0);
 });
});
```

Néanmoins ça ne peut marcher car on n'utilise pas notre hook custom dans un component react ce qui nous fait une erreur.

Pour pallier à ça on peut utiliser `renderHook` :

```ts
import { useCounter } from "../hooks/useCounter";
import { renderHook } from "@testing-library/react";

describe("useCounter", () => {
	it("by default the initial value is 0", () => {
		const { result: counter } = renderHook(() => useCounter());
		expect(counter.current.count).toBe(0);
	});
});
```

`renderhook` va mettre notre custom hook dans un environnement de test afin de simuler son utilisation dans un component.

**NB :** `counter.current` le `current` donne accès à tout ce que notre hook return "`return { count, increment, decrement, reset, setStep };`". De plus chaque test et indépendant et nécessite l'initialisation de notre hook.

On peut aussi tester une méthode de notre hook comme l'incrémentation avec `act`.

```ts
import { useCounter } from "../hooks/useCounter";
import { renderHook, act } from "@testing-library/react";

describe("useCounter", () => {

	it("should increment the counter by 1", () => {
		const { result: counter } = renderHook(() => useCounter());
		act(() => {
			counter.current.increment();
		});
		expect(counter.current.count).toBe(1);
	});
});
```

`act` permets de simuler les actions sur notre hook.


Il existe différentes manière de tester on peut les retrouver dans la doc de vitest : [Vitest doc](https://vitest.dev/api/).