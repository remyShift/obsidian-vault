---
date: 
likes: 
comments: 
reposts: 
impressions: 
url: 
tags:
  - Linkedin
---

Question pour les gens qui font du Payload avec TypeScript.

Quand tu fais une requête avec un depth pour peupler tes relations, tu te retrouves avec un type où la relation est soit un simple ID, soit l'objet complet.

Du coup à chaque accès, tu dois vérifier "c'est un string ou un objet ?" avant de toucher au moindre champ.

Je sens que je m'y prends mal. Soit y'a un pattern propre pour typer ça selon le depth, soit je rate quelque chose dans ma façon de modéliser.

Vous gérez ça comment, vous ? Type guards partout, un helper dédié, autre chose ?

Je prends toute ressource ou retour d'expérience.
