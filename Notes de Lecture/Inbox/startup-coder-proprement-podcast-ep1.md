---
created: 2026-05-11 09:30
type: fleeting
status: to-process
tags: [inbox, startup, produit, architecture, podcast, code-quality]
source: Podcast épisode 1 (intervenants non identifiés)
---

# Faut-il bien coder dès le jour 1 d'une start-up ? - Notes de podcast

## Idée brute

La question "faut-il bien coder dès le départ ?" est mal posée. Le vrai sujet c'est : au jour 1, tu ne devrais probablement pas coder du tout. Et quand tu commences à construire, "bien construire" dépend entièrement de l'horizon de vie du produit.

## Contenu clé du podcast

### La question est mal cadrée

Le débat LinkedIn "faut-il bien coder dès le départ ?" suppose deux extrêmes :
- L'extrême "construis d'abord, vends ensuite" avec TDD, DDD, Clean Code dès le jour 1
- L'extrême "vends d'abord, construis après"

En pratique, personne ne défend vraiment le premier extrême en théorie, mais beaucoup de boîtes le font quand même. Pourquoi ? Parce que les fondateurs, sous pression, confondent output et outcome : ils voient quelqu'un qui sort des choses vite et concluent que ça va bien.

### Ce que "bien construire" veut vraiment dire au jour 1

Au stade zéro (pas de clients, pas de product-market fit, pas d'équipe) :
1. **Valider d'abord** : la première mission n'est pas de construire, c'est de confirmer qu'un problème existe vraiment
2. **Coût de validation proche de zéro** : waiting list, no-code, no-scale (email manuel, formulaires), tout ce qui permet de répondre à la question sans construire
3. **Ne pas confondre "j'ai vendu" avec "les gens en ont besoin"** : le churn post-achat est le vrai indicateur

Référence mentionnée : **The E-Myth** (le mythe de l'entrepreneur) - le succès des entreprises repose sur la systématisation des process, des règles et métriques explicites. Pas de place pour l'interprétation.

### Une fois la traction établie

Seulement là, on commence à construire. Et la question devient : **ce qu'on construit est-il temporaire ou destiné à durer ?**

- **Temporaire** (ex: site pour la Fashion Week, down 2 semaines après) : niveau de qualité adapté en conséquence, pas de surenginéering
- **Long terme** (ex: core banking system, produit qui doit vivre des années) : là, toutes les clés de maintenabilité, de documentation, de transmission de connaissance métier deviennent critiques

Le delta entre les deux, c'est la **maintenance**. Un produit qui doit évoluer et survivre dans le temps n'a pas les mêmes exigences qu'un one-shot.

### "Bien coder" est subjectif

Il n'existe pas de définition objective de ce qu'est du bon code. Clean Code est opinionated et non basé sur de la data. **Code Complete** (Steve McConnell) est l'ancêtre, lui appuyé par des études, mais peu de recherches récentes s'intéressent à cette question.

Conclusion : on ne peut pas établir de règle absolue. Une équipe doit **se mettre d'accord sur ses propres standards** plutôt que d'appliquer des règles externes de façon dogmatique.

### Le profil idéal du builder en early stage

Un exécutant pur (qui sait coder vite mais sans recul) n'est pas le bon profil. Il amène à un ralentissement inévitable dans les 6 à 12 mois.

Le profil idéal réunit :
- Une **sensibilité produit** (comprendre le problème qu'on résout)
- Avoir **déjà lancé quelque chose** pour soi-même (side project, micro-SaaS)
- La capacité de **reconnaître ce qu'il ne sait pas** et de poser les bonnes questions
- La volonté d'**apprendre le domaine métier** plutôt que de plaquer ses convictions techniques dessus

Le fondateur lui-même ne peut souvent pas évaluer ces qualités, il est convaincu par les mots plutôt que par les faits. Il faut des preuves concrètes, pas de l'éloquence.

### La tech comme sous-ensemble de l'entreprise

Point fort du podcast : les décisions de développement ne vivent pas dans une bulle. Elles doivent venir soutenir l'objectif business de l'entreprise. Avant de parler de Scrum, d'agile, d'architecture, il faut comprendre ce qui se passe autour.

Chaque segment de la boîte (tech, sales, produit...) doit incarner l'objectif global. Si ce n'est pas explicité, chaque équipe l'interprète à sa façon et les trajectoires divergent.

### Sur-expliciter pour réduire le "cône de dispersion"

Chaque terme non défini crée une zone d'interprétation qui fait diverger les trajectoires de chaque membre de l'équipe. "Aller vite", "bon code", "bon client" : tout doit être spécifié.

La solution : **sur-expliciter absolument tout dès le début**. Pas de place pour les évidences supposées.

### La métaphore des professeurs par étape

Un professeur de primaire, de collège et d'université n'ont pas les mêmes enjeux. De même, le profil qui accompagne une start-up au jour 0, au moment du premier client, et à la levée de fonds sont trois profils différents. Ce n'est pas forcément la même personne.

## Ce que ça m'évoque / liens avec ma situation

- Le point sur **l'exécutant pur** me touche directement. La tendance à foncer dans l'implémentation avant de valider l'approche, c'est exactement ce pattern.
- Le point sur **la sur-explicitation** s'applique à chaque discussion technique avec Michele et Diego : assumer qu'on parle de la même chose sans aligner explicitement les définitions, c'est une source directe de friction.
- L'idée que **la tech est un comment d'un quoi** est à garder en tête pour les discussions de renegociation de taux : ma valeur se mesure à ma capacité à aligner mes décisions techniques sur les objectifs business d'Oli's Lab, pas seulement à la qualité intrinsèque du code.
- Référence à explorer : **The E-Myth** (Michael Gerber) - déjà mentionné positivement par un des intervenants

## Sujets ouverts dans le podcast (à traiter dans des épisodes suivants)

- Architecture logicielle à l'étape post-PMF
- Dette technique dans un produit qui grossit
- Loi de Conway et mirror architecture
- Dynamiques humaines lors d'un changement d'équipe en cours de route

## À faire

- [ ] Trier : garder / promouvoir en Note Permanente / supprimer
- [ ] Lire ou relire The E-Myth
- [ ] Chercher Code Complete de Steve McConnell
- [ ] Relier à la note sur la dette technique (épisode 2 du même podcast)
- [ ] Réfléchir à l'application du point "sur-expliciter" dans le contexte Oli's Lab
