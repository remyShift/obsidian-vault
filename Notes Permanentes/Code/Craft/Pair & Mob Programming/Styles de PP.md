> [!info]- Tags
> #SoftwareCraft #PairProgramming 

Ils existent différentes manière de fonctionner en pair programming comme :
- Le ping-pong,
- La navigation strong style,
- Silent pair programming,
- Evil twin pair programming,
- ...

En voici quelques unes courantes expliquées :

#### Le ping-pong :

Permets d’allier TDD et pair programming. Les itérations ne sont plus rythmées par le temps mais par le cycle du TDD, les rôles alternent désormais à chaque fois qu’on termine une phase rouge.

Exemple :
- Alice écrit un test en échec,
- Bertrand le fait passer,
- Il refactor si nécessaire,
- Il écrit un test en échec,
- Alice reprends la main et fait passer le test,
- Elle refactor si nécessaire,
- Elle écrit un test en échec 
- …

#### La navigation strong style :

Ce type de pair programming peut marcher lorsqu’un des participants a une idée et cherche à l’implémenter.

Si on faisait du pair programming classique cette personne prendrait le clavier et le ferais elle même. Mais en strong style c’est l’inverse : elle laisse le clavier et explique et aiguille le pilote son idée pour que ça soit son partenaire qui l’implémente.

« For an idea to go from your head to the computer it must go through someone else’s hands. »

Cela permets une implication des participants plus grande. En effet celui qui a l’idée n’a pas les mains sur le code et doit donc guider efficacement celui qui code. Tandis que celui qui code se doit d’être attentif aux instructions pour bien les retranscrire à la machine. 

Le copilote (celui qui a l’idée) va exprimer dans un premier temps **l’intention** de ce qu’il veut faire, si le pilote comprends il exécute écrit donc le code nécessaire pour satisfaire cette intention. Si ce n’est pas le cas, le copilote va lui donner **l’emplacement** où il veut que ça implémenté et si ça ne suffit toujours pas il va lui donner le **détail** de comment l’implémenter clairement.
- Pour le copilote il doit faire attention à comment il s’adresse au pilote et jauger le bon niveau auquel il s’adresse à lui.

#### Silent pair programming :

Bonne technique pour s’entraîner au pair programming.

Utile lorsque le binôme parle beaucoup mais n’arrive pas à se décider ou lorsque le code produit est compliqué à lire.

Le but est que les 2 participants n’ont pas le droit de parler // communiquer via un autre moyen que le code *(pas utiliser les commentaires dans le but de communiquer)*.

Cela va permettre :
- prise de décisions plus rapide,
- rendre le code + lisible,
- de meilleur nommage de tests,
- meilleur refacto 

L’exercice doit être court sinon frustration.
