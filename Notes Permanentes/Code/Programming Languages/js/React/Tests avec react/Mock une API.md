> [!info]- Tags
> #LangagesDeProgs #React #Tests 

Pour "mock" une API on aura besoin de **MSW** ([Doc msw](https://mswjs.io/docs/getting-started)) qui est une librairie qui le permets.

Pour l'installer :

```
pnpm install msw --save-dev
```

Pour faire nos tests sur des API on va avoir besoin de 2 choses :

- 1 fichier `server` --> qui sera le serveur ('-') :
```ts
import { setupServer } from 'msw/node';
import { handlers } from './handlers'

export const server = setupServer(...handlers)
```

- 1 fichier `handlers` --> qui contiendra les routes API,
```ts
import { http, HttpResponse } from 'msw'

export const handlers = [
	http.get("http://server.com/hello-world", () => {
		return HttpResponse.text('Hello world');
	}),

	http.get('http://server.com/hello-world-2', () => {
		return HttpResponse.json({ message: 'Hello world 2' })
	})
]
```

Une fois qu'on a setup msw on peut tester tout ça dans un fichier de test :

```ts
import { server } from '../mock/server';

describe('mock api', () => {
	
	beforeAll(() => {
		server.listen();
	})
	
	afterEach(() => {
		server.resetHandlers();
	})
	
	afterAll(() => {
		server.close()
	})

	it('should return hello world', async () => {	
		const response = await fetch('http://server.com/hello-world');	
		const data = await response.text();	
		expect(data).toEqual('Hello world');
	})

	it('should return hello world 2', async () => {
		const response = await fetch('http://server.com/hello-world-2');
		const data = await response.json();
		expect(data).toEqual();
	});
})
```

De plus on peut simuler la connection ou non à une api :

```ts
http.post('http://server.com/sign-in', async ({ request }) => {
	const { username, password } = await request.json() as { username: string, password: string };
	if (username === 'John' && password === '123') {
		return HttpResponse.json({ message: 'Authenticated' });
	} else {
		return HttpResponse.json({ message: 'Not authenticated' }, { status: 401 });
	}
})
```

```ts
it('should return authenticated', async () => {
	const reponse = await fetch('http://server.com/sign-in', {
		method: 'POST',
		body: JSON.stringify({ username: 'John', password: '123' }),
	});
	const data = await reponse.json();
	expect(data).toEqual({ message: 'Authenticated' });
})

it('should return not authenticated', async () => {
	const reponse = await fetch('http://server.com/sign-in', {
		method: 'POST',
		body: JSON.stringify({ username: 'Lucy', password: '000' }),
	});
	const data = await reponse.json();
	expect(data).toEqual({ message: 'Not authenticated' });
})
```
