---
tags: [SoftwareCraft, CleanCode]
---

**⚠️ Il faut consommer les commentaires avec modération ⚠️**

# Les commentaires inutiles :

Si on suit les autres principes du clean code notre code à lui seul sera porteur de l’intention et du problème qu’il résout et on pourra se passer de commentaires.

Si du code nécessite des commentaires pour l’expliquer car obscur == réécrire le code pour mieux le faire comprendre.

La plupart des commentaires rajoutent du bruit en paraphrasant vulgairement le code qui généralement se suffit à lui même ou alors en faisant un peu de réfacto l’idée transmise par le commentaire deviens compréhensible de par uniquement le code.

Des qu’on veut ajouter un commentaire —> vérifier si ce qu’on veut transmettre est possible avec du code. Néanmoins si le commentaire est nécessaire alors c’est un indicateur sur la qualité du code ou de son design.

# Les commentaires utiles :

Les commentaires sont inutile dans la plupart des cas mais ils existent certains cas où on peut pas s’en passer.
Si on limite nos commentaires en évitant tout ceux inutiles comme vu avant alors dès lors qu’on croiser un commentaire il aura d’autant plus de valeur et sera plus précieux, précis et utile et on y portera plus d’attention.

## Les cas utiles des commentaires :

#### Signaler une subtilité :

Il peut y avoir des cas où la complexité de l’info qu’on veut transmettre par notre code est trop grande (*et oui !*) nous obligeant ainsi à exprimer clairement les choses. Mais il existe d’autre cas comme : décrire une optimisation subtile, effet de bord pouvant causer des problèmes …

Permets d’avertir nos collègues des *pièges* sur lesquels ils peuvent tomber et que pour modifier ces portions de code il faut prendre des pincettes.

#### Marquer des problèmes à résoudre dans le code :

Si on voit un soucis dans le code mais qu’on a pas forcément le temps / flemme / qu’on veut pas quitter notre focus de le signaler avec un **TODO, FIXME …**, pour nos collègues.

#### Apposer des mentions légales :

Il peut arriver que le code doit contenir des infos légales ou mentionner les auteurs notamment dans l’open source qui nous impose de protéger notre code.