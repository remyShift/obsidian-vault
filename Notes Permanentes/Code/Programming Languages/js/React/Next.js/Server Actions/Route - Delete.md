> [!info]- Tags
> #LangagesDeProgs #React #NextJS 


### Delete Method

```ts
export async function DELETE(
	request: Request,
	{ params }: { params: { id: string } }
) {
	const index = comments.findIndex((comment) => comment.id === parseInt(params.id));

	if (index === -1) {
		return Response.json({ message: "Comment not found" }, { status: 404 });
}
	const deletedComment = comments[index];
	comments.splice(index, 1);

	return Response.json(deletedComment);
}
```

Cette fonction **DELETE** dans un fichier `route.ts` en **Next.js** permet de supprimer un commentaire en fonction de son **ID**. Voici une explication détaillée :

#### Fonction globale

```typescript
export async function DELETE(
	request: Request,
	{ params }: { params: { id: string } }
) { ... }
```

- **DELETE** : La fonction répond aux requêtes HTTP de type **DELETE**, qui sont utilisées pour supprimer une ressource.
- **request** : Contient les informations sur la requête envoyée par le client.
- **params** : Objet contenant les paramètres de l'URL, ici l'**id** du commentaire à supprimer.

#### Recherche du commentaire à supprimer

```typescript
const index = comments.findIndex((comment) => comment.id === parseInt(params.id));
```

- **params.id** : Identifiant du commentaire récupéré depuis l'URL (par exemple, `/api/comments/3` pour un commentaire avec `id=3`).
- **comments.findIndex** : Cherche dans la liste des commentaires l'index du commentaire dont l'`id` correspond à `params.id`. `parseInt` convertit l'ID en nombre, car il est généralement reçu en tant que chaîne de caractères.

#### Vérification de l'existence du commentaire

```typescript
if (index === -1) {
	return Response.json({ message: "Comment not found" }, { status: 404 });
}
```

- Si aucun commentaire avec cet ID n'est trouvé (si `findIndex` retourne `-1`), la fonction renvoie une réponse JSON avec un message `"Comment not found"` et un code de statut **404** (ressource non trouvée).

#### Suppression du commentaire

```typescript
const deletedComment = comments[index];
comments.splice(index, 1);
```

- **deletedComment** : Stocke temporairement le commentaire à l'index trouvé pour pouvoir le renvoyer après la suppression.
- **comments.splice(index, 1)** : Supprime le commentaire trouvé à cet index. `splice` modifie directement la liste **comments** en supprimant un élément à la position `index`.

#### Retour de la réponse

```typescript
return Response.json(deletedComment);
```

- Après avoir supprimé le commentaire, la fonction renvoie une réponse JSON contenant le **commentaire supprimé** pour informer le client de ce qui a été supprimé.

#### Résumé simple

Cette fonction **DELETE** permet de supprimer un commentaire en fonction de son **ID** :
1. Elle cherche le commentaire dans la liste en utilisant l'ID passé dans l'URL.
2. Si le commentaire n'est pas trouvé, elle renvoie une erreur **404** avec un message.
3. Si le commentaire est trouvé, elle le supprime de la liste.
4. Elle renvoie le commentaire supprimé au client.

##### Exemple :

Si tu envoies une requête **DELETE** à `/api/comments/3`, et que le commentaire avec l'ID 3 existe, la réponse sera :
```json
{
  "id": 3,
  "text": "Le texte du commentaire"
}
```
Cela indique que le commentaire avec l'ID 3 a été supprimé avec succès.