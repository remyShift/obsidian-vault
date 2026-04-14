---
tags: [LangagesDeProgs, React, NextJS]
---

Les Templates sont comme les layouts --> ils englobent // transmettent a chaque enfant que ça soit un layout ou une page.
- La différence est que si un user va sur d'une route à l'autre qui se partage un template une nouvelle instance est mount dans le DOM et donc le DOM est re-render (*ce qui peut entraîner dans certains cas des pertes de performances par rapport aux layouts*),
	- le state n'est donc pas préservé et les effets sont re synchronisé,

Comme les layouts les templates prennent en paramètres un "children" étant le même que les layouts : la page correspondant au path actuel.

De plus layouts et templates ne sont pas opposés et peuvent être compatibles dans certains cas d'utilisation.