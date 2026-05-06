---
date: 2026-04-19
likes: 7
comments: 26
reposts: 0
impressions: 5436
url: https://www.linkedin.com/feed/update/urn:li:activity:7451521220086263808/
tags:
  - Linkedin
---

Claude Code repart de zéro à chaque session. Pas de mémoire, pas de contexte, tu réexpliques à chaque fois.

Alors oui tu as bien le fichier CLAUDE.md à la racine de ton projet, mais est ce que c’est suffisant ?

J’utilisais déjà Obsidian pour prendre des notes, donc j’ai pas cherché midi à quatorze heures et j’ai commencé à structurer des notes que je balance en contexte au début de chaque session avec un hook.

Stack, décisions d’archi, ce qui est en cours, ce qui est cassé.

Et maintenant Claude arrive avec le context de où on en était la dernière fois ainsi que le vision plus large, pas à poil.

C’est pas une solution magique, c’est juste de la gestion de contexte un peu propre. 

Il existe des libs qui font ça automatiquement, claude-mem par exemple. 

Mais pour mon usage, maintenir des fichiers Obsidian que je contrôle entièrement c’est suffisant et ça s’intègre dans un workflow que j’ai déjà.

De plus ces fichiers ce font alimenter automatiquement par Claude à chaque fin de session grâce à une commande custom.

Le vrai gain c’est pas la mémoire en soi, c’est les tokens, car au fond c’est ça le nerf de la guerre.

Moins de réexplication = sessions plus efficaces = moins de dérive en milieu de contexte.

Si vous bossez avec Claude Code, la question c’est pas "quelle lib installer" mais "qu’est-ce que Claude a besoin de savoir pour être utile dès la première ligne de la session".
