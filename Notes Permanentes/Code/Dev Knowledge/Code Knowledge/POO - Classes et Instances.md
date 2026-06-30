---
tags: [CodeKnowledge]
---

- _sous paradigme de prog l'impérative donc tout langage impératif peut faire de la POO_

- En POO tout est orienté objet que ça soit un bool, une string, un int … tout ces types héritent du type objet.

## Grands Principes de la POO

- **1/ L'encapsulation :** il s'agit de l'encapsulation des données et du comportement dans des objets, de sorte que les données sont cachées et ne peuvent être accédées que par des méthodes spécifiques,
- **2/ L'abstraction :** Il s'agit de la simplification d'un système complexe en définissant des interfaces claires et en cachant les détails d'implémentation sous-jacents,
- **3/ L'héritage :** Il permet à un objet (appelé sous-classe ou classe dérivée) d'hériter des propriétés et des comportements d'un autre objet (appelé classe de base ou superclasse), ce qui favorise la réutilisation du code et la hiérarchie des objets,
- **4/ Le polymorphisme :** Il permet à un objet de se comporter de différentes manières en fonction du contexte. Par exemple, une même méthode peut avoir une implémentation différente dans différentes classes.

## Les classes

- Modèle pour créer des objets,
	- Structure les données ==> décrit comment les objets d'un certains types vont interagir,
- Composées de prototype, variables et bloc d'exécution,
	- A partir d'une instances on peut créer plusieurs classes à partir d'une grâce à sa déclaration / prototype,
		- Chaque nouvel objet ainsi créer vont avoir leur existence indépendamment les uns des autres,
- Composée aussi de données variables et de fonctions (// méthode)

## Instances

- Objet crée à partir d'une classe particulière
	- Chaque instances d'une même classe sont indépendantes et héritent des méthodes de leur classe et vont posséder aussi leur propre méthode

**NB :**

- JSON = **J**ava**S**cript **O**bject **N**otation,
- `this` = fait référence à l'objet actuel sur lequel est appelé une méthode,
	- Permets d'accéder aux propriétés et méthodes de l'objet courant,
- Méthode = fonction définis à l'intérieur d'une classe,
	- définis le comportement ou actions que les objets de cette classe peuvent effectuer,
- Variable d'instance = généralement crée via le constructeur,
	- ==> variable définis à l'intérieur d'une classe,
	- ==> chaque instances héritent des variables d'instances de la classe auxquelles elles sont rattachées et peuvent aussi posséder leur propre variables d'instances,
- Constructeur = Permets d'initialiser un objet en ratachant des valeurs à une variables de notre objet lors de sa création,
	- Bloc spéciale d'un objet / classe,
