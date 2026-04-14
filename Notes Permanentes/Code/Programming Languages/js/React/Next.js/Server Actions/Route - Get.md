---
tags: [LangagesDeProgs, React, NextJS]
---

### Get method :

```ts
export async function GET(request: NextRequest) { 
	const searchParams = request.nextUrl.searchParams; 
	const query = searchParams.get("query"); 
	const filteredComments = query ? comments.filter(comment => comment.text.includes(query)) : comments; 
	return Response.json(filteredComments); }
```
#### Fonction globale

```typescript
export async function GET(request: NextRequest) { ... }
```

- **GET** : Il s'agit d'une fonction qui répond aux requêtes HTTP de type **GET**.
- **request** : Le paramètre `request` contient toutes les informations relatives à la requête entrante, comme l'URL, les paramètres, les en-têtes, etc.
- **NextRequest** : C'est un type spécifique fourni par Next.js pour représenter les requêtes dans les API routes.

#### Extraction des paramètres de recherche

```typescript
const searchParams = request.nextUrl.searchParams;
```

- **request.nextUrl.searchParams** : Cela récupère les paramètres de recherche (query parameters) de l'URL de la requête. Par exemple, si l'URL est `/api/comments?query=test`, `searchParams` permettra d'accéder à `query=test`.

#### Récupération du paramètre "query"

```typescript
const query = searchParams.get("query");
```

- **searchParams.get("query")** : Cela extrait la valeur du paramètre `query` depuis l'URL. Si l'URL contient `?query=test`, alors `query` contiendra `"test"`. Si aucun paramètre `query` n'est présent, `query` sera `null`.

#### Filtrage des commentaires

```typescript
const filteredComments = query ? comments.filter(comment => comment.text.includes(query)) : comments;
```

- Si le paramètre `query` est présent, la liste des **comments** est filtrée pour ne conserver que ceux dont le texte contient la chaîne de caractères donnée par `query`.
- Si le paramètre `query` est absent (c'est-à-dire `null`), il renvoie simplement tous les commentaires sans filtrage.

#### Retour de la réponse

```typescript
return Response.json(filteredComments);
```

- **Response.json(filteredComments)** : Cette ligne renvoie une réponse HTTP avec les commentaires filtrés sous forme de **JSON**. C'est la manière standard de renvoyer des données en réponse à une requête API.

#### Résumé simple

Cette route **GET** permet de récupérer une liste de **commentaires**. Si un paramètre de recherche `query` est présent dans l'URL (par exemple `/api/comments?query=hello`), elle filtre les commentaires pour ne garder que ceux qui contiennent ce mot dans leur texte. Si aucun paramètre n'est passé, elle retourne simplement tous les commentaires.