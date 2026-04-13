> [!info]- Tags
> #LangagesDeProgs #React #NextJS 


### Post Method 

```ts
export async function POST(request: Request) { 
	const comment = await request.json(); 
	const newComment = { id: comments.length + 1, text: comment.text, } comments.push(newComment);
	return new Response(JSON.stringify(newComment), { headers: { "Content-Type": "application/json", }, status: 201, }); }
```
#### Fonction globale

```typescript
export async function POST(request: Request) { ... }
```

- **POST** : La fonction répond aux requêtes HTTP de type **POST**.
- **request** : Le paramètre `request` contient les informations envoyées dans la requête, y compris le corps (les données envoyées par le client).

#### Récupération du corps de la requête

```typescript
const comment = await request.json();
```

- **request.json()** : Cette ligne récupère et **parse** le corps de la requête **POST** au format JSON. Le corps de la requête contient un nouveau commentaire (par exemple, `{ "text": "Mon commentaire" }`).

#### Création d'un nouvel objet commentaire

```typescript
const newComment = {
	id: comments.length + 1,
	text: comment.text,
}
```

- **newComment** : Un nouvel objet commentaire est créé avec deux propriétés :
  - **id** : C'est un identifiant unique basé sur la longueur de la liste de commentaires (il incrémente l'ID pour chaque nouveau commentaire).
  - **text** : Le texte du commentaire est récupéré à partir des données envoyées dans la requête (`comment.text`).

#### Ajout du commentaire à la liste existante

```typescript
comments.push(newComment);
```

- **comments.push(newComment)** : Cette ligne ajoute le nouveau commentaire à la liste existante de commentaires, qui est probablement stockée quelque part en mémoire ou dans une base de données (dans ce cas, dans une variable globale `comments`).

#### Retour de la réponse

```typescript
return new Response(JSON.stringify(newComment), {
	headers: {
		"Content-Type": "application/json",
	},
	status: 201,
});
```

- **new Response(JSON.stringify(newComment))** : Cette ligne retourne une réponse HTTP qui inclut le nouveau commentaire en format **JSON**.
- **headers** : La réponse contient un en-tête `Content-Type` qui spécifie que le contenu de la réponse est au format **JSON**.
- **status: 201** : Le code de statut HTTP **201** indique que la ressource a été créée avec succès.

#### Résumé simple

Cette fonction **POST** reçoit une requête contenant un commentaire (format JSON), crée un nouvel objet commentaire avec un ID unique, ajoute ce commentaire à une liste, puis renvoie ce nouveau commentaire au client avec un code de statut **201 Created**.

##### Exemple :
Si un client envoie une requête **POST** avec le corps suivant :
```json
{
  "text": "Nouveau commentaire"
}
```
La réponse sera :
```json
{
  "id": 1,
  "text": "Nouveau commentaire"
}
```
Et ce commentaire sera ajouté à la liste des commentaires.