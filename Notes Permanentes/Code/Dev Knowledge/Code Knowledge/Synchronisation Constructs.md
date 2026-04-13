> [!info]- Tags
> #CodeKnowledge 

==> Outils mis à disposition par un langage pour programmer volontairement en asynchrone

#### Fonctions callback / Fonctions de Rappel :
- Fonction qui prends en paramètre une autre fonction.
#### Listeners / Events :
- Rappel d'évènements / conditions de déclenchements d'évènements,
	- généralement un "event" : actions d'un utilisateurs qui vont pouvoir lieu à une interactivité.
```js
button.addEventListener("onClick", () => {
	console.log("Hello world !")
})
```

#### Promise :
- Objet utilisé pour exécuter des actions asynchrones,
	- Représente l'achèvement ou l'échec d'une opération asynchrone et retourne en fonction l'opération résultante.
```js
fetch("https://API_RANDOM.com")
	.then((response) => res.json())
	.then((data) => console.log(data))
	``` 
#### Async / Await :
- S'utilise lors de la déclaration de fonction avec le mot clé "async",
	- Transforme le renvoie de notre fonction en promesse,
		- Fonction deviens donc asynchrone,
- Await permets de forcer la synchronicité d'une fonction asynchrone,
	- Mets en "pause" le code en attendant la résolution de la fonction async jusqu'à ce que la promesse soit résolue puis renvoie la resolve de cette promesse.
```js
async function obtenirUtilisateur() {
  // Simulation d'une requête réseau asynchrone
  let utilisateur = await fetch('https://jsonplaceholder.typicode.com/users/1');
  // Attend que la requête soit terminée, puis récupère les données JSON
  let donneesUtilisateur = await utilisateur.json();
  // Retourne les données de l'utilisateur
  return donneesUtilisateur;
}

async function afficherUtilisateur() {
  // Appel de la fonction asynchrone pour obtenir les données de l'utilisateur
  let utilisateur = await obtenirUtilisateur();
  // Affichage des données de l'utilisateur dans la console
  console.log(utilisateur);
}

// Appel de la fonction pour afficher l'utilisateur
afficherUtilisateur();
```