---
tags: [SoftwareCraft, CleanCode, Refacto]
---

Pattern qui permets de redéfinir les responsabilités des classes et en déplaçant certaines de leurs méthodes et propriétés.
- Si on a une class avec plusieurs responsabilité (disons 2) autant la séparer en 2 classes distinctes avec les méthodes et propriété qu’il convient pour chacune d’elles
- On peut aussi avoir une classe mère et des propriété qui sont déplacer de la classe mère vers la classe fille.