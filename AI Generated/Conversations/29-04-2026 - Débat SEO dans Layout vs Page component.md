---
source: ai
---

# 29-04-2026 - Débat SEO dans Layout vs Page component

**Domaine :** Code
**Statut :** Synthèse brute -> à intégrer dans les notes permanentes si pertinent

---

## Contexte

Échange avec Kyle Conrad (tech lead) dans les DMs Slack autour de l'architecture d'une page de recherche produits pour Oli's Lab. Le débat porte sur l'endroit où placer la logique SEO (meta tags, page title) : dans le composant Layout ou dans le composant Page.

---

## Points clés

- Kyle propose de mettre le SEO dans le Layout component, en le définissant comme responsable de l'infrastructure transversale (analytics, SEO, éléments répétés). Le composant Page, lui, est scoped à : fetch des données + rendu.
- Rémy défendait l'idée inverse : le SEO (title, description) étant des métadonnées de page, leur place naturelle serait dans le composant Page.
- La confusion venait d'un glissement entre "page" comme concept (URL, contenu, titre) et "Page" comme composant technique. Kyle a nommé ça explicitement : "You're confusing the concept with the component."
- Sur le fond, Kyle a raison. Le SEO est de l'infrastructure transversale, pas de la logique métier spécifique à une page. Le mettre dans le Layout garantit la séparation des responsabilités et évite de le dupliquer dans chaque composant Page.
- Sur la forme, le débat a duré trop longtemps par rapport à l'enjeu réel. Kyle a finalement dû recadrer : "the discussion is taking longer than the implementation."
- Point secondaire discuté : l'input de recherche serait dans le Layout, mais la donnée (résultats) fetchée au niveau Page. Rémy a poussé sur la gestion de l'état de l'input, point légitime mais qui reste secondaire au sujet principal.

---

## Décisions prises

- SEO dans le Layout component, pas dans le composant Page.
- Data fetching (résultats de recherche) au niveau Page component.
- Pagination à implémenter sur l'endpoint de recherche produits (limite initiale ~10 résultats, puis pagination).
- Kyle a demandé à Rémy de remonter le sujet dans le channel #tech avec Michele et Diego.

---

## À intégrer dans

- Note sur l'architecture composants Oli's Lab
- Note sur la séparation des responsabilités en React (Layout vs Page vs Container)
