---
date: 2026-04-17
likes: 5
comments: 8
reposts: 0
impressions: 487
url: https://www.linkedin.com/feed/update/urn:li:activity:7450796475430711296/
tags:
  - Linkedin
---

Karpathy a popularisé le combo Claude + Obsidian, moi j'ai décidé de l'adapter plutôt que de le copier.

J'avais déjà pas mal de notes sur Obsidian plutôt bien organisé, avec un flow qui me plaisait, le but était pas de tout re-structurer.

Concrètement, les deux sont connectés via MCP, ça reste la base.

Quand une session de chat mérite d'être gardée, je tape /wrap. Claude génère une synthèse structurée et l'écrit directement dans mon vault, dans un dossier AI Generated/Conversations/.

Pareil côté Claude Code avec /recap après une session de dev et j'ai un résumé de la session que je viens d'avoir dans AI Generated/Sessions/{projet}.

À chaque début de session, à l'aide d'un hook, Claude Code va chercher les X notes les plus récentes en lien avec mon projet pour les avoir en contexte. Il sait ce que j'ai fait lors de la dernière session, où j'en étais, les avancées, les bloqueurs...

Le tout couplé aux fichiers Memory de Claude.

Ce sont des commandes manuelles, et c'est voulu. Je veux pas forcément que chaque conversation finisse dans mes notes, et c'est ce qui se passerait avec un hook.

Je choisis ce qui mérite de rester.

Une fois par semaine, /evolve compare ce qui a été généré dans AI Generated/ avec mes notes permanentes et me suggère des connexions, des choses à intégrer, des améliorations ...

Je dis pas que mon système est parfait, mais il évolue, il est à moi et s'intègre dans mon besoin.

Je suis pas fermé au changement et je serais curieux si certains ici ont implémenté ça ? L'ont amélioré ? Ont des idées de changements à faire ?

![](https://media.licdn.com/dms/image/v2/D4D22AQHJAo3q5b4cPw/feedshare-shrink_1280/B4DZ2W67VFHIAM-/0/1776353523292?e=1779321600&v=beta&t=NrY1fBdxaIqkiyoR3zNfDHlL_lftUdVfktvVyffaZSE)
