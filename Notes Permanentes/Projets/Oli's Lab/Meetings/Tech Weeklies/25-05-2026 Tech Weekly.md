---
date: 2026-05-25
type: meeting
projet: Oli's Lab
tags:
  - tech-weekly
  - olis-lab
participants:
  - Michele
  - Kyle
  - Diego
  - Lucas
  - Remy
  - Ante
lien: https://www.notion.so/olislab/Tech-Weekly-36b4bf4c7fa1807d921fcd6254a2f3e5?source=copy_link
---

# Tech Weekly - 25 mai 2026

---

## Clôture des items en cours

- Product catalog management : prêt à déployer, considéré comme fermé après déploiement
- Search : même statut, prêt à déployer

---

## Event Tracking & Consent Management

### Problèmes identifiés
- PostHog ne track pas les events custom (purchase, etc.)
- Google Analytics perd des events à cause d'une initialisation incorrecte du consent mode
- Le consent mode n'est pas initialisé en "denied" avant le premier fire des Google tags
- Les choix de consent ne sont passés que lors de l'interaction avec le cookie banner, créant un conflit pour Google
- Pas de réinitialisation si l'utilisateur revient sans interagir avec le banner

### Plan
- Corriger l'initialisation du consent mode pour l'architecture G-tag actuelle
- Préparer la transition vers Google Tag Manager (avec Spark, l'agence tracking)
- G-tag et GTM cohabiteront en parallèle quelques semaines, le temps que tous les events soient correctement mappés dans GTM
- Kyle prend en charge ce chantier

### Action items
- [ ] @Kyle : implémenter l'initialisation correcte du consent mode (denied par défaut avant tout fire Google)
- [ ] @Diego : corriger le setup du subdomain (créé pour le mauvais usage — Claudio vs server-side tracking)
- [ ] @Michele : meeting avec l'agence pour clarifier les next steps tracking

---

## SEO & Language Repertoire

### Priorités principales
- Sitemap dynamique : doit se mettre à jour automatiquement à l'ajout d'un produit
- Language repertoire : structure `olislab.com/en/` pour toutes les routes
  - Doit fonctionner sur CRA et Next.js
  - Les robots doivent voir les pages dans chaque langue
  - Pas besoin d'internationaliser les routes pour l'instant, juste que la page charge dans la langue de l'URL

### Action items
- [ ] @Team : implémenter le language repertoire sur CRA et Next.js

---

## Product Display Page (PDP)

### Statut
- Kyle a créé une PR adressant l'analyse SEO de Spark : hiérarchie des headings, retrait des headings sur les éléments comme le prix
- Above-the-fold mobile en cours de redesign par Ante : ajout d'un bouton "add to bag" sans scroll, sticky button en bas
- Ante finalise le design d'ici demain

### Reste à faire
- Finaliser le shipping estimate (Kyle a les changements en local)
- Ajouter l'ancien affichage des ratings (6 images) sur le PDP et les product cards
- Kyle à passer sur les éléments de QA UI components

### Action items
- [ ] @Kyle : switch vers le composant Next.js head (remplacer HEAD dans les composants)
- [ ] @Kyle : finaliser le shipping estimate
- [ ] @Kyle : ajouter le rating 6 images sur le PDP et les product cards
- [ ] @Kyle : passer sur les éléments QA UI components
- [ ] @Ante : finaliser le design above-the-fold mobile pour demain
- [ ] @Kyle + @Ante : review Figma ensemble + rejoindre le call de demain avec Michele et Ante

---

## Product Listing Page (PLP)

- Objectif : avoir une page PLP intermédiaire sur staging (ex. sous-catégorie moisturizers) pour la review SEO de Spark
- Kyle envoie à Spark un lien direct sans toucher aux liens de la navbar
- Gros bloqueur : implémentation des filtres, Ante finalise le design Figma (changement du pop-up mobile)

### Action items
- [ ] @Team : créer une page PLP intermédiaire sur staging pour Spark

---

## Performance & Core Web Vitals

- Délai notable lors de la navigation CRA vers Next.js (surtout au premier chargement)
- Images qui arrivent en retard après la transition
- Michele a une démo en local d'un composant loader qui améliore la transition UX
- Pistes explorées :
  - SSG avec cache revalidation toutes les heures (approche préférée, simple à mettre en place)
  - Cache des réponses Payload API au niveau de la distribution AWS
- Objectif : améliorer surtout sur mobile / connexions lentes (Core Web Vitals, Lighthouse)

### Action items
- [ ] @Kyle : explorer SSG + cache revalidation (1h) sur le PDP, mesurer l'impact mobile

---

## Trading Plan sur Payload CMS

- Objectif : permettre à Suze et Juliette de gérer elles-mêmes les mises à jour mensuelles (homepage, shop page : images, textes, liens)
- Migration de l'ordre de priorité des marques (actuellement dans Algolia) vers Payload
- Approche décidée : Globals d'abord, puis expansion vers les block layouts
- Objectif semaine : connecter CRA avec le trading plan

### Action items
- [ ] @Team : connecter CRA avec le trading plan Payload (Globals)
- [ ] @Michele + @Remy : se retrouver sur la discussion remplacement du mapper

---

## Error Handling & Dette Technique

- Next.js manque d'une error page brandée (error boundary) — actuellement affiche la page d'erreur par défaut Next.js
- Cause du bug actuel : certains produits n'ont pas de tags, le mapper casse
- L'erreur doit aussi être capturée dans PostHog

### Action items
- [ ] @Diego + @Kyle : créer une error page brandée pour Next.js
- [ ] @Diego : corriger le mapping des tags (produits sans tags ne doivent pas casser le mapper)
- [ ] @Team : implémenter la capture d'erreur dans PostHog

---

## Newsletter & Bundles

- Newsletter voucher pour utilisateurs anonymes : définition encore en cours, requirements qui bougent côté Suze
- Michele et Diego se voient séparément pour avancer
- Bundles : déprioritisés, Suze veut réduire leur nombre voire arrêter de les supporter temporairement

---

## Résumé des priorités de la semaine

1. Fix event tracking + consent mode initialization
2. Release PDP (SEO updates + language repertoire EN/FR)
3. PLP template sur staging pour feedback Spark
4. Continuer l'optimisation performance (SSG / Core Web Vitals)
