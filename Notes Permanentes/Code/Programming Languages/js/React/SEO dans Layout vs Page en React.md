---
tags: [react, architecture, seo, layout, separation-of-concerns]
---

# SEO dans Layout vs Page en React

## Règle

Le SEO (meta tags, page title, description) appartient au **Layout component**, pas au composant Page.

## Pourquoi c'est contre-intuitif

On confond "page" comme concept (URL, contenu, titre) avec "Page" comme composant technique. Le titre d'une page est bien lié à la page conceptuellement — mais en React, le composant Page est scoped au fetch des données + au rendu du contenu.

Kyle Conrad (Oli's Lab) : *"You're confusing the concept with the component."*

## Pourquoi Layout est la bonne place

- Le SEO est de l'infrastructure transversale (comme les analytics, les scripts tiers, les polices) → responsabilité du Layout
- Mettre le SEO dans le Page = le dupliquer dans chaque composant Page ou passer des props SEO de haut en bas
- Le Layout garantit qu'aucune page n'oublie son SEO

## Séparation des responsabilités

| Composant | Responsabilité |
|-----------|---------------|
| **Layout** | Infrastructure transversale : SEO, analytics, polices, wrappers globaux |
| **Page** | Fetch des données + rendu du contenu spécifique à l'URL |
| **Container** | Orchestration : connecte les données aux composants presentationnels |
| **Component** | Affichage pur (stateless de préférence) |

## Note pratique

L'input de recherche peut être dans le Layout (expérience persistante sur toutes les pages), mais les résultats (données) sont fetchés au niveau Page. L'état de l'input peut vivre dans un Context ou dans le Layout si partagé.

*Source : échange avec Kyle Conrad, tech lead Oli's Lab, 29/04/2026*
