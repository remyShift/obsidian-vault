---
tags: [LangagesDeProgs, React, NextJS]
---

### Post Method
```ts
export async function PATCH(
	request: Request,
	{ params }: { params: { id: string }}
) {
	const body = await request.json();
	const { text } = body;
	const index = comments.findIndex((comment) => comment.id === parseInt(params.id));

	if (index === -1) {
		return Response.json({ message: "Comment not found" }, { status: 404 });
	}

	comments[index].text = text;

	return Response.json(comments[index]);
}
```

Ce code définit une fonction **PATCH** dans un fichier `route.ts` pour une API en **Next.js**, permettant de mettre à jour partiellement un commentaire existant. Voici une explication détaillée de chaque partie du code :

#### Fonction globale

```typescript
export async function PATCH(
	request: Request,
	{ params }: { params: { id: string } }
) { ... }
```

- **PATCH** : La fonction répond aux requêtes HTTP de type **PATCH**, qui sont utilisées pour mettre à jour partiellement une ressource.
- **request** : Paramètre contenant la requête envoyée par le client, notamment le corps (les données envoyées pour la mise à jour).
- **params** : Un objet contenant les paramètres de l'URL. Dans ce cas, `params.id` représente l'identifiant du commentaire que l'on souhaite mettre à jour.

#### Récupération du corps de la requête

```typescript
const body = await request.json();
const { text } = body;
```

- **request.json()** : Récupère le corps de la requête (au format JSON) envoyé par le client.
- **text** : Le corps JSON contient un champ `text` (par exemple `{ "text": "Commentaire mis à jour" }`), qui est la nouvelle valeur que l'on souhaite affecter au commentaire.

#### Recherche du commentaire à mettre à jour

```typescript
const index = comments.findIndex((comment) => comment.id === parseInt(params.id));
```

- **params.id** : Cet identifiant est récupéré depuis l'URL (par exemple `/api/comments/2` pour un commentaire avec `id=2`).
- **comments.findIndex** : Cherche dans la liste des commentaires un commentaire avec un `id` qui correspond à `params.id`. `parseInt` est utilisé pour convertir l'identifiant en nombre, car il est généralement passé en tant que chaîne de caractères dans l'URL.
- **index** : Cette variable contient l'index du commentaire trouvé dans la liste. Si aucun commentaire avec cet ID n'est trouvé, `findIndex` renverra `-1`.

#### Vérification de l'existence du commentaire

```typescript
if (index === -1) {
	return Response.json({ message: "Comment not found" }, { status: 404 });
}
```

- Si l'index est `-1`, cela signifie qu'aucun commentaire avec l'ID fourni n'a été trouvé. La fonction renvoie alors une réponse JSON avec un message d'erreur `"Comment not found"` et un code de statut **404** (ressource non trouvée).

#### Mise à jour du commentaire

```typescript
comments[index].text = text;
```

- Si le commentaire est trouvé (index différent de -1), cette ligne met à jour le champ **text** du commentaire à l'index spécifié avec la nouvelle valeur.

#### Retour de la réponse

```typescript
return Response.json(comments[index]);
```

- Après la mise à jour, la fonction renvoie le commentaire mis à jour sous forme de **JSON** comme réponse, indiquant que l'opération s'est bien déroulée.

#### Résumé simple

Cette fonction **PATCH** permet de mettre à jour le texte d'un commentaire existant en utilisant son **ID** dans l'URL. Voici les étapes :
1. Elle récupère le corps de la requête (qui contient la nouvelle valeur du texte).
2. Elle cherche le commentaire correspondant à l'ID passé dans l'URL.
3. Si le commentaire n'est pas trouvé, elle renvoie une erreur **404**.
4. Si le commentaire est trouvé, elle met à jour le texte du commentaire et renvoie le commentaire mis à jour en réponse.

##### Exemple :

- Si tu envoies une requête **PATCH** à `/api/comments/2` avec le corps :
```json
{
  "text": "Commentaire mis à jour"
}
```
- La réponse sera :
```json
{
  "id": 2,
  "text": "Commentaire mis à jour"
}
```
Cela mettra à jour le commentaire avec l'ID 2 dans la liste des commentaires.