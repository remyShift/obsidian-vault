---
tags:
  - Work
  - Perso
  - Talk
---
**Événement** : LyonCraft, Software Crafters Lyon - 200-300 participants
**Format** : REX 45 min
**Organisateur** : Software Crafter Lyon dont Colin Damon (auteur d'"Itération Product(ives)", lu pendant ma période creuse)

## Titre

"Développeur par obstination, ou comment les galères valent mieux que les filières"

## Abstract

Comment il y a trois ans, je vendais des surgelés en porte à porte et aujourd'hui, je fais tourner une migration Next.js en production pour un e-commerce ?

Deux refus, une école abandonnée, un bootcamp, six mois sans mission. Et comment chaque blocage m'a poussé à creuser seul et à enchaîner : des meetups, des cours en ligne, et à découvrir le craft. Pas par passion immédiate, par nécessité.

Durant tout ce temps j’ai appris des choses et j'ai absorbé une culture du craft que personne ne m'aurait enseigné si tout s'était passé comme prévu.

Parce que ce qui nous forge en tant que développeur, ce n'est pas la formation qu'on a suivie mais la culture qu’on se crée en chemin.

## Structure (45 min)

- Intro 5 min : accroche + thèse
- Acte 1 : ce que la vente m'a appris avant le code (3 compétences, lien mission actuelle)
- Acte 2 : les portes fermées comme moteur + le craft dans les marges (42 x2, Ada, 6 mois solo, Software Crafters, les livres)
- Acte 3 : arriver en prod sans filet (KicksFolio, post LinkedIn, Oli's Lab)
- Conclusion : boucle Colin / Software Crafters + ce qu'il ferait pareil/différemment

## Bio speaker

Ancien commercial, aujourd'hui développeur. Tatouages, casquette et sneakers à l'extérieur, je m'éduque sur le craft et bonnes pratiques à l'intérieur.

## Statut

- [x] Finaliser le titre (arbitrage entre les options)
- [x] Envoyer abstract + bio à Colin
- [x] Remplir la section Structure dans le Google Doc
- [ ] Rédiger le talk
- [ ] Faire les diapos

## Liens
- [[Ma vie]]
  
  

---
---


## Talk :

### INTRO

#### V1
**Objectif :** poser la tension narrative, donner envie de rester.

Comment passe-t-on de vendeur de surgelés en porte à porte à développeur fullstack sur un site e-commerce en production avec des milliers de users de trafic ?

...

Pas de bac, pas de diplômes, deux piscines de l'école 42 échouées, une école abandonnée, un bootcamp, six mois sans mission avec des centaines de refus. Et me voilà devant vous. Je vais vous expliquer pourquoi tout ce qui n'a pas marché est exactement ce qui m'a construit.

#### V2 - anecdote

C'est un mardi matin, il pleut. Mon troisième jour seul sur mon secteur. Vaulx-en-Velin, Villeurbanne, 80 clients à voir, 36 commandes à ramener.

J'ai mes catalogues, ma liste d'adresses, et un GPS peu conciliant. Je passe trois fois devant le même immeuble. Les clients sont mal triés dans ma liste, je fais des allers-retours pour rien. La circulation aide encore moins.

J'enchaîne les refus, pas de réponse, pas intéressé, repassez plus tard, je découvre même que des clients n'habitent plus là.s

Je rentre le soir éreinté, dégouté avec seulement 10 commandes sur 36.

Ce que je savais pas ce soir-là, c'est que cette journée m'apprenait quelque chose que je mettrais des années à formuler : comment tenir quand rien ne marche, comment continuer à sonner quand t'as envie de rentrer chez toi, et comment transformer une journée ratée en information utile pour le lendemain.

Aujourd'hui je fais tourner une migration Next.js en production pour un e-commerce. Et certains matins ressemblent exactement à ce mardi-là.

Ce qui m'a construit comme développeur, c'est pas la formation que j'ai suivie. C'est tout ce que j'ai traversé avant, pendant, et autour.

---

### ACTE 1 : Ce que la vente m'a appris avant le code

**Objectif :** montrer que le commercial et le dev ne sont pas deux vies séparées --> l'une a préparé l'autre.

**Ce que tu racontes :** 
- Je vendais des surgelés porte à porte.
	- Terrain difficile, inconnus, refus constants. 
	- Pas de filet. 
	- Je ne savais pas ce qui m'attendait derrière chaque porte et je sonnais quand même.

**Les trois compétences que tu en as tirées, avec exemples concrets de ta mission actuelle :**

1. **Définir le besoin avant d'agir** : en vente, je pitches pas ton produit sans comprendre ce que le client veut vraiment (pose des questions pour définir le besoin). Chez Oli's Lab, c'est pareil avant de toucher une ligne de code, tu poses des questions. "C'est quoi l'objectif métier derrière cette feature ?", "Pourquoi on fait ça comme ça et pas autrement ?" --> comprendre les trade-offs. 

2. **Poser les bonnes questions vite** : en vente on a 30 secondes pour qualifier un prospect. Quand j'ai commencé ma mission, j'ai eu peu de temps pour comprendre une codebase legacy avant de devoir agir dessus --> Même réflexe : aller à l'essentiel, pas tout lire, identifier les noeuds.

3. **Ne pas avoir peur de l'inconnu** : taper des portes d'inconnus, ça forge (parfois même taper la porte de son voisin on a du mal). Aujourd'hui j'hérites d'une codebase sans tests, sans doc, sans filet et ... je ne panique pas. Ce n'est pas du courage, c'est de l'habitude.
	- Poser une question ouverte : sincère 


**Transition vers l'Acte 2 :** Mais avant d'arriver là, il y a eu beaucoup de portes et pas celles que j'avais choisies de frapper.

---

### ACTE 2  : Les portes fermées comme moteur

**Objectif :** montrer la mécanique répétée : blocage → réponse autonome → progression mesurable, trois fois, en accélérant.

#### Séquence 1 - 42 x2

---

- Poser question pour savoir si ça vaut le de re expliquer la piscine de 42 ce que c'est (aspect social, code, deadline, intensité, duré ...)

---

Je découvres 42 après la vente pour essayer. Déclic intellectuel immédiat. Je fais la piscine, j'accroches tout de suite. Refusé. Pas de feedback. Le vide.

**Réponse :** je retournes vendre, mais je commences à apprendre le C en parallèle. Seul. Sans cours, sans cadre. Juste pour ne pas perdre ce que j'avais trouvé.

**Un an plus tard, deuxième piscine :** Je suis meilleur, je le sais, je le sens. Plus rapide, plus structuré. Refusé à nouveau. Toujours sans feedback.

[^1]42 ne m'explique pas pourquoi. Je dois vivre avec l'absence de réponse. Et décider quand même de continuer. --> te pousse à faire de l'introspection forte 

C'est là que le pattern se pose pour la première fois : le blocage ne t'arrête pas --> il te redirige.

#### Séquence 2 - Ada Tech School + 6 mois solo

J'intègres Ada Tech School. Je poses les bases du web, JavaScript, le front, premiers frameworks, premiers projets web. 

C'est aussi pendant cette période que je découvres les Software Crafters Lyon et que je découvre donc les pratiques craft. Ça me sensibilise assez tôt à la qualité du code que je peux produire. Et ça me donne goût à me plonger dedans.

Mais rapidement je sens un décalage entre ce qui est affiché et ce qui est vécu. Je quittes d'un commun accord.

Ce n'est pas un abandon, c'est une décision. Je sais ce que je veux et je refuses ce qui ne me ressemble pas.

S'ensuit 6 mois seul en attendant la formation du Wagon. En parallèle d'un boulot alimentaire j'attaques TypeScript, puis React, puis Next.js. Quelques mini projets pour consolider les connaissances et je construis un portfolio. Je ne suis pas un cursus, je construis ta propre progression.

Pendant cette période en parallèle de l'apprentissage du code je continue de m'initier aux pratiques Craft, d'essayer de les comprendre, d'essayer de les pratiquer, pour ça je lis Software Craft de Cyril Martraire et autres devs français, quelques extraits de Clean Code [^2]d'Uncle Bob, et Itération Product(ives) de Colin Damon. 

Je ne suis pas en train de "suivre une formation", je suis en train de construire une culture technique.

**Moment méta ici, à dire explicitement :** À l'époque, je pensais juste survivre. Avec le recul, je construisais quelque chose que personne ne m'aurait enseigné si j'avais suivis un parcours classique.

#### Séquence 3 - Le Wagon, preuve par les faits

J'arrives au Wagon avec une longueur d'avance. Ce que les autres découvrent, je le connais déjà. Le Wagon t'apporte Ruby et une structure mais l'essentiel, je l'avais construit seul, que ça soit la logique de réflexion pour aborder un problème, l'algorithmie, l'attention au code produit ...

C'est la validation concrète du pattern. [^3]L'autodidaxie n'est pas un palliatif, c'est une méthode.

On finit avec un super projet musicale qui lors de la présentation de fins d'études avait mis le feu.

**Transition :** Mais apprendre seul dans son coin, c'est une chose. Livrer en production, c'est une autre.

---

## ACTE 3 : Arriver en prod sans filet

**Objectif :** montrer ce que ça coûte vraiment de livrer et pourquoi le parcours m'y a préparé mieux que n'importe quelle formation.

**TODO :** Ptite intro sur Spash ?

---

**KicksFolio + Le post linkedin + la période creuse ===> tout en parallèle**

---
#### KicksFolio

Pendant la période creuse post-Spash, tu codes KicksFolio. App mobile sneakers, scanner un code-barres, gérer sa collection, la partager. Deux centres d'intérêt qui se rejoignent.

Je vais jusqu'au bout. Je la publies sur les stores. Et c'est là que je découvres ce que "finir" veut vraiment dire : la prod, c'est pas juste le code. C'est les edge cases, les permissions, les crashes silencieux, les reviews d'app store. Personne pour valider derrière toi. Je suis seul responsable.

KicksFolio m'a appris ce qu'aucun bootcamp n'enseigne : le coût réel d'aller jusqu'au bout.

#### Le post LinkedIn

Période creuse, six mois sans mission. Je bloques pas sur la technique, je bloques sur comment te présenter, raconter ton parcours atypique sans le défendre.

Je fais un post LinkedIn, je demandes de l'aide.

En quelques jours, mon agenda est plein. Plus d'une dizaine de personnes. Des échanges, des simulations d'entretien, des retours francs.

(remercier tout le monde)

Demander de l'aide publiquement, c'est contre-intuitif quand on a passé des mois à apprendre seul. Mais c'est ce post qui a tout débloqué.

#### Oli's Lab le choix et l'arrivée

 Deux offres arrivent quasiment en même temps, au moment où je remettais tout en question, où je voulais reprendre un taff alimentaire plutôt que continuer à mettre autant d'énergie dans la recherche d'emplois. 
 
La première, tu ne la sens pas, les signaux faibles sont là --> je la refuses quand même.

La deuxième arrive via le Slack du Wagon (au final ça m'apporte pas juste un diplôme), le feeling est différent et le choix évident --> je choisis Oli's Lab.

J'arrives sur une codebase legacy, sans tests, sans doc, migration Next.js de prévu mais pas commencée, une gestion du contenu du site bancale --> mise en place d'un CMS Payload à construire de zéro (seul sur ce sujet).

Et là, la boucle se ferme. Ne pas avoir peur de l'inconnu appris en sonnant des portes, c'est exactement ce qui me permet de naviguer dans cette codebase sans paniquer.

---

## CONCLUSION

**Objectif :** fermer les boucles, laisser une phrase dans la tête de chaque personne dans la salle.

*Je reviens sur la thèse. Pas en la répétant mécaniquement, en la prouvant par les faits que tu viens de raconter.*

Pas de bac, pas de diplômes, deux piscines de l'école 42 échouées, une école abandonnée, un bootcamp, six mois sans mission avec des centaines de refus. Et me voilà devant vous. 

À chaque fois, la même réponse ne pas abandonner, continuer et creuser seul. Et à chaque fois, une progression que personne ne m'aurait donnée autrement.

*Puis la boucle Colin à amener sobrement :*

Pendant ces périodes, j'ai lu un bouquin écrit par quelqu'un de cette communauté. Aujourd'hui c'est cette même communauté qui m'invite à monter sur cette scène. Je ne pense pas que c'est un hasard, je pense que c'est exactement ce que le craft fait en dehors des lignes de codes : il crée des cercles où les gens se retrouvent.

*Phrase de sortie la dernière chose que la salle entend :*

Ce qui nous forge en tant que développeur, ce n'est pas la formation qu'on a suivie. C'est la culture qu'on se crée en route.


---
## Tips

- Poser question pour que les gens répondent en levant la main --> joindre le geste à la parole
- Faire des pauses --> calme le débit --> marque l'attention / l'attente / suspens / permets de digérer les infos (très utilisé en politique) || Avant un mot important : créer de l'attente | Après un mot important : permets de laisser digérer
	- Boire de l'eau aide pour laisser des pauses
  
---

[^1]: Pousser les questions que je me pose, comment ? quel questions ? pourquoi ?

[^2]: Robert C. Martin

[^3]: Formulation trop complexe à simplifier || Expliquer à l'oral si je le sens / si nécessaires + pause
