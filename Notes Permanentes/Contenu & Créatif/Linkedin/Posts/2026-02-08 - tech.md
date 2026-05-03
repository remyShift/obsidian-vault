---
date: 2026-02-08
likes: 58
comments: 7
reposts: 0
impressions: 31335
url: https://www.linkedin.com/feed/update/urn:li:activity:7426169168657391616/
tags:
  - Linkedin
---

Mon tech lead a pris une petite heure vendredi dernier pour nous montrer comment il a débuggé un bug qui freezait notre page de checkout sur un certain parcours utilisateur.

Pas un quick fix, pas un “ça doit venir de là”. Un vrai raisonnement de dev.

Il nous a montré toutes les pistes qu’il a explorées, celles qui n’étaient pas les bonnes, et surtout comment il a utilisé les React DevTools, en particulier le Profiler, pour arrêter de deviner et commencer à mesurer.

Le Profiler, pour ceux qui ne l’utilisent pas vraiment, ce n’est pas juste un gadget. C’est une timeline de rendu de tes composants.

Tu vois précisément quels composants se re-render, combien de temps ils prennent, et ce qui déclenche ces re-renders.

Et parfois la surprise est violente.

Un composant “innocent” qui se re-render 4000 fois. Un context qui cascade partout. Un memo mal placé qui ne sert à rien. Ou l’inverse : un endroit où il manque.

Dans notre cas, ça a permis d’identifier un composant qui se re-renders 1000 fois lors d'un un chemin très précis sur notre checkout. Invisible à l’œil nu, mais évident une fois dans le Profiler et d'autant plus dans une app legacy qui est assez lente.

Au final c'était rien de bien méchant, juste un useEffect avec une mauvaise dépendance, les joies de React en faite.

Ce que j’ai surtout retenu, ce n’est pas l’outil mais c’est la méthode. Observer avant d’optimiser et mesurer avant de conclure. Explorer plusieurs hypothèses sans s’attacher trop vite à la première.

Une heure comme ça, c’est presque plus formateur que des jours de tuto.

Curieux de savoir si vous l’utilisez vraiment le React Profiler dans vos projets, ou il dort dans vos DevTools ? Et si vous avez une anecdote où il vous a sauvé, je prends.
