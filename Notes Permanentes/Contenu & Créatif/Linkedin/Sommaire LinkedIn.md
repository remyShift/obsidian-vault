Index de tous mes posts LinkedIn archivés dans Posts/, qui ont ce [[LinkedIn Post|template]].

Pour avoir des idées tu peux regarder cette note [[Linkedin idea post]].

---

## 🏆 Top 10 - Meilleurs posts

> [!info]- Score pondéré
>  `impressions + likes × 30 + commentaires × 70`
> Un like vaut 30 impressions, un commentaire vaut 70. 
> 

```dataview
TABLE
  date AS "📅 Date",
  likes AS "❤️ Likes",
  comments AS "💬 Comms",
  default(impressions, "—") AS "👁️ Impressions",
  (default(impressions, 0) + default(likes, 0) * 30 + default(comments, 0) * 70) AS "⭐ Score"
FROM "Notes Permanentes/Contenu & Créatif/Linkedin/Posts"
SORT (default(impressions, 0) * 0.5 + default(likes, 0) * 30 + default(comments, 0) * 70) DESC
LIMIT 10
```

### 🏆 Top 10 - Meilleurs posts en termes d'impressions

```dataview
TABLE
  date AS "📅 Date",
  likes AS "❤️ Likes",
  comments AS "💬 Comms",
  default(impressions, "—") AS "👁️ Impressions"
FROM "Notes Permanentes/Contenu & Créatif/Linkedin/Posts"
SORT default(impressions, 0) DESC
LIMIT 10
```
## 💩 Top 10 - Pires posts en termes d'impressions

```dataview
TABLE
  date AS "📅 Date",
  likes AS "❤️ Likes",
  comments AS "💬 Comms",
  default(impressions, "—") AS "👁️ Impressions"
FROM "Notes Permanentes/Contenu & Créatif/Linkedin/Posts"
SORT default(impressions, 0) ASC
LIMIT 10
```

### 👻 Posts sans impressions

```dataview
TABLE
FROM "Notes Permanentes/Contenu & Créatif/Linkedin/Posts"
WHERE !impressions
SORT date DESC
```

---

## 📋 Tous les posts - Chronologique

| Note                                | Résumé                                                                                                                   |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| [[01-12-2023 - dataviz]]            | Présentation du projet de dataviz "la visible invisibilité" — place des femmes dans les noms de rues lyonnaises          |
| [[18-01-2024 - lyonjs]]             | Compte-rendu enthousiaste du premier meetup LyonJS de l'année                                                            |
| [[24-07-2024 - salut]]              | 🚀 Salut à tous,                                                                                                         |
| [[25-07-2024 - toujours]]           | 🚀 Toujours dans ma quête de connaissance, j'ai regardé la conférence Devoxx "Voyage au centre de la                     |
| [[29-07-2024 - apres]]              | 🚀 Après un mois intense à apprendre React (tout en travaillant dans l’alimentaire à côté), je suis r                    |
| [[29-07-2024 - etant]]              | Étant actuellement entrain de lire ce livre (recommandé par Colin Damon) 👇🏼                                            |
| [[31-07-2024 - toujours]]           | 🚀 Toujours on my                                                                                                        |
| [[02-08-2024 - prendre]]            | Ne pas prendre de notes, c'est comme essayer de remplir une passoire d'eau : bon courage pour reteni                     |
| [[05-08-2024 - nouvel]]             | Nouvel semaine = Nouveaux objectifs !                                                                                    |
| [[06-08-2024 - toujours]]           | Toujours on my                                                                                                           |
| [[08-08-2024 - pensez]]             | Si vous pensez qu'un bon développeur travaille mieux seul, c'est que vous n'avez jamais réellement c                     |
| [[11-08-2024 - clavier]]            | Mon clavier commence à se faire vieux si vous avez des recommandations de bon claviers je dis pas no                     |
| [[12-08-2024 - nouvelle]]           | Nouvelle semaine = Nouveaux objectifs ! 👇🏼                                                                             |
| [[13-08-2024 - vois]]               | Je vois passer beaucoup de posts dissociant le 'Free' dans freelance comme de la liberté ultime… mai                     |
| [[14-08-2024 - obsidian]]               | C’est quoi ce nuage de 200 points ? Une nouvelle constellation à des années-lumière de chez nous ? P                     |
| [[15-08-2024 - connaissezvous]]     | Connaissez-vous la théorie des vitres brisées ? Laissez-moi vous expliquer et comment cela s'appliqu                     |
| [[17-08-2024 - sais]]               | Je sais enfin faire des tests, et c'est grâce aux vidéos de David Grammatico !                                           |
| [[18-08-2024 - tbd]]                | Explication du Trunk-Based Development : développer sur le tronc pour itérer vite et réduire la dette de merge           |
| [[19-08-2024 - objectifs]]          | Objectifs hebdomadaires : Next.js, katas, Software Craft et sport                                                        |
| [[20-08-2024 - linkedin]]           | Bilan d'un mois à poster sur LinkedIn : les bénéfices inattendus de partager en public                                   |
| [[21-08-2024 - portfolio]]          | Demande de feedback sur la maquette Figma d'un portfolio original en forme de Gameboy                                    |
| [[22-08-2024 - nextjs]]             | Découverte du routing file-based de Next.js : simplicité et magie des routes imbriquées                                  |
| [[23-08-2024 - voulez]]             | Vous voulez sécuriser votre site mais ne savez pas par où commencer ? Laissez-moi vous guider 👇🏼                       |
| [[25-08-2024 - dimanche]]           | Dimanche confession : et si je vous disais que je n'ai jamais ressenti le syndrome de l'imposteur ?👇                    |
| [[26-08-2024 - nouvelle]]           | 🚀 Nouvelle Semaine = Nouveaux objectifs ! Let’s go !                                                                    |
| [[27-08-2024 - comment]]            | Comment la discipline a transformé mon corps et boosté mon apprentissage ? 🏋‍💻                                         |
| [[28-08-2024 - toujours]]           | Toujours dans mon apprentissage de NextJS, aujourd’hui au menu c’est les Metadata 🍷                                     |
| [[29-08-2024 - certifie]]           | Être certifié ne rime pas avec compétences.                                                                              |
| [[29-08-2024 - viens]]              | Je viens de regarder cette vidéo : https://lnkd.in/eSPsAFUy et c’était super interessant je te dis ç                     |
| [[30-08-2024 - viens]]              | Je viens de désinstaller le dernier jeu que j’avais sur mon mac je t’explique le contexte 👇🏼                           |
| [[31-08-2024 - voulu]]              | J'ai voulu me challenger sur une landing page et je suis plutôt satisfait, je t'explique comment j'e                     |
| [[01-09-2024 - dimanche]]           | Dimanche confession : et si je vous disais que la paire qu’il y a en photo est à moi ? 👇🏼                              |
| [[02-09-2024 - nouvelle]]           | 🚀 Nouvelle semaine = Nouveaux objectifs ! Learn in public tel est mon nindo !                                           |
| [[03-09-2024 - code]]               | Le code legacy ça te fait peur ? Aller viens je t’explique comment bien l’appréhender ! 👇🏼                             |
| [[04-09-2024 - toujours]]           | Toujours sur mon apprentissage de NextJS aujourd’hui on parle  special file  ! 👇🏼                                      |
| [[05-09-2024 - apiculteur]]         | Un apiculteur du nom de Ibrahim Sedef a gérer des ours qui s’en prenaient à ses ruches. Je t’expliqu                     |
| [[06-09-2024 - savez]]              | Vous savez comment faire une racine carrée inverse ? Et surtout, pourquoi c’est utile dans les jeux                      |
| [[07-09-2024 - calculatrice]]       | Réalisation d'une calculatrice UI iPhone en React + Zustand pour continuer à pratiquer                                   |
| [[07-09-2024 - diplome]]            | Dilemme : continuer à travailler pour financer une formation avec diplôme ou plonger dans le code à temps plein          |
| [[08-09-2024 - features]]           | Liste des fonctionnalités manquantes ou bugguées sur LinkedIn, avec un CTA humoristique                                  |
| [[09-09-2024 - objectifs]]          | Objectifs hebdomadaires : portfolio, katas quotidiens, Software Craft et salle de sport                                  |
| [[10-09-2024 - hello]]              | Hello le réseau je me posais une question vous utilisez quoi comme plateforme pour trouver un emploi                     |
| [[10-09-2024 - zevent]]             | Idée de side project inspirée d'un bug de classement des dons lors du ZEvent — une course visuelle interactive           |
| [[11-09-2024 - beaucoup]]           | Pour beaucoup les tests sont une perte de temps, mais laissez moi vous expliquer en quoi ils sont in                     |
| [[12-09-2024 - intercepter]]        | Intercepter une route en NextJS, mais pourquoi et comment ? Je t’explique ça 👇🏼                                        |
| [[13-09-2024 - saviez]]             | Vous saviez que     ? Je vous explique ça 👇🏼                                                                           |
| [[14-09-2024 - aujourd]]            | Aujourd’hui je te donne les pièges à éviter pour améliorer le nommage dans ton code 👇🏼                                 |
| [[15-09-2024 - finis]]              | J'ai finis le template globale qui me servira sur la plupart de mes pages de mon portfolio ! 🎉                          |
| [[16-09-2024 - lundi]]              | C’est Lundi et comme chaque Lundi —> Nouvelle semaine = nouveaux objectifs 🚀                                            |
| [[17-09-2024 - apporte]]            | J’ai     par   et voici ce que ça m’a apporté ! 👇🏼                                                                     |
| [[18-09-2024 - vos]]                | Est ce que vous aussi vos (side) projets finissent par vous dégoûter quand vous y passer trop de tem                     |
| [[19-09-2024 - non]]                | Non c'est pas la vidéo qui est de mauvaise qualité, le fond gris est bien granuleux et en mouvement                      |
| [[20-09-2024 - comment]]            | Comment mon expérience de commercial sera un plus en tant que développeur ? 👇🏼                                         |
| [[21-09-2024 - quelques]]           | Il y a quelques choses que j’ai du mal à saisir : l’intérêt du no code ?                                                 |
| [[24-09-2024 - non]]                | Non j'ai pas quitté Linkedin, j'ai simplement passé la 4ème pour enfin finir ce projet qui traîne de                     |
| [[24-09-2024 - soucis]]             | Bon j’ai un soucis sur mon portfolio et j’ai besoin d’aide ! 👇🏼                                                        |
| [[25-09-2024 - fais]]               | J'ai fais un breadcrumb sans m'en rendre compte, je t'explique ça ! 👇🏼                                                 |
| [[26-09-2024 - first]]              | Explication des principes FIRST pour écrire de bons tests unitaires (Fast, Isolated, Repeatable, Self-verifying, Timely) |
| [[27-09-2024 - mockup]]             | Découverte d'un outil de génération de mockups propres pour présenter ses projets sur différents devices                 |
| [[28-09-2024 - formation]]          | Soulagement : la formation Le Wagon finalement maintenue malgré un problème de financement CPF                           |
| [[29-09-2024 - accessibilite]]      | Question ouverte sur la gestion du zoom navigateur dans l'accessibilité web                                              |
| [[30-09-2024 - objectifs]]          | Dernier jour de travail alimentaire : objectifs de la semaine avant le début de la formation                             |
| [[30-09-2024 - stagiaire]]          | Le stagiaire d’instagram a encore fait des siennes :                                                                     |
| [[01-10-2024 - piliers]]            | Un des piliers du Clean Code c’est la simplicité, mais c’est quoi un code simple pour vous ?                             |
| [[02-10-2024 - demande]]            | Je me demande encore si prendre l’air fais plus de bien à lui qu’à moi ? 😂                                              |
| [[02-10-2024 - seulement]]          | Ça fait seulement 2 jours que je pratique des Katas avec Ruby et j'avoue je commence à vraiment bien                     |
| [[03-10-2024 - menu]]               | Au menu du jour la simplicité de mise en place de requêtes HTTP en NextJS ! 👇🏼                                         |
| [[05-10-2024 - savais]]             | Tu savais qu'on utilise le terme "mock" à tord et à travers ?                                                            |
| [[06-10-2024 - confession]]         | Confession du dimanche : passion pour le design neobrutalism et son utilisation dans ses projets                         |
| [[07-10-2024 - cest]]               | Premier jour de retour en formation au Wagon — retour après quelques mois de pause                                       |
| [[08-10-2024 - petit]]              | Post tardif sur les bases de Ruby vues en formation, avec exemples pratiques                                             |
| [[12-10-2024 - aujourdhui]]         | Liste de créateurs YouTube recommandés sur les sujets tech et développement                                              |
| [[13-10-2024 - confession]]         | Confession humoristique : "arrêt LinkedIn" en mimant les posts de Wassim Salmi                                           |
| [[15-10-2024 - republique]]         | Réaction humoristique à une faute d'orthographe officielle de la République Française                                    |
| [[20-10-2024 - weekend]]            | Observations du week-end : tendances et bizarreries remarquées sur le feed LinkedIn                                      |
| [[23-10-2024 - passe]]              | Recommandation d'une vidéo sur l'IA qui change la vision du sujet                                                        |
| [[25-10-2024 - soir]]               | Retour enthousiaste sur la keynote Next.js — les nouvelles fonctionnalités sont impressionnantes                         |
| [[27-10-2024 - notes]]              | Plaidoyer pour la prise de notes et Obsidian comme deuxième cerveau pour structurer ses apprentissages                   |
| [[31-10-2024 - collaboration]]      | Défense du pair programming et du mob programming comme pratiques de collaboration essentielles                          |
| [[01-11-2024 - tests]]              | Analogie entre les tests et un parachute : coder sans tests c'est sauter dans le vide                                    |
| [[03-11-2024 - diplome]]            | Réflexion sur l'honnêteté : pourquoi obtenir un vrai diplôme plutôt que de mentir sur son CV                             |
| [[04-11-2024 - threejs]]            | Court post d'enthousiasme sur Three.js après avoir vu quelque chose d'impressionnant                                     |
| [[05-11-2024 - projet]]             | Lancement du projet final de fin de batch Le Wagon — BeatMachine en équipe                                               |
| [[06-11-2024 - cherches]]           | Découverte d'une activité créative à faire le samedi (lien en commentaire)                                               |
| [[07-11-2024 - craque]]             | Confession d'avoir craqué — mais c'est pour le mieux                                                                     |
| [[07-11-2024 - donne]]              | Question sur les messages de démarchage LinkedIn : est-ce que ça donne vraiment envie de répondre ?                      |
| [[08-11-2024 - suis]]               | Même en formation, début de recherche active d'emploi et réflexion sur la stratégie                                      |
| [[10-11-2024 - jeu]]                | Explication du Jeu de la Vie de Conway — automates cellulaires, maths et défis de performance                            |
| [[11-11-2024 - trunkbased]]         | Explication du Trunk-Based Development (version "tutoiement") — développer proche du tronc pour aller vite               |
| [[12-11-2024 - remarque]]           | Observation dérangeante : tout le monde sur LinkedIn se dit "listé" dans des classements suspects                        |
| [[13-11-2024 - viens]]              | Réactivation du compte X (Twitter) et demande de suggestions de comptes tech à suivre                                    |
| [[14-11-2024 - jai]]                | Annonce d'avoir trouvé un stage — étape clé dans le parcours #Road2BeDev                                                 |
| [[15-11-2024 - malgre]]             | Malgré le stage trouvé, erreur importante remontée — retour honnête sur la gestion de l'erreur                           |
| [[16-11-2024 - reprends]]           | Reprise des posts hebdomadaires avec objectifs du week-end                                                               |
| [[17-11-2024 - jai]]                | Questions soulevées après 5 katas — réflexions sur les bonnes pratiques et les patterns                                  |
| [[17-11-2024 - petit]]              | Petit rebranding du profil LinkedIn                                                                                      |
| [[17-11-2024 - rebranding]]         | Rebranding v2 — retour sur les conseils reçus et nouvelles décisions de branding                                         |
| [[19-11-2024 - hairbnb]]            | Lancement du projet HairBnB (clone AirBnB de location de perruques) — travail en équipe avant le projet final            |
| [[21-11-2024 - veille]]             | Comment structurer sa veille technologique : sources, prise de notes, reformulation et partage                           |
| [[22-11-2024 - hairbnb]]            | Récap des fonctionnalités de HairBnB avant la présentation : login, location, carte, reviews                             |
| [[23-11-2024 - hairbnb]]            | Présentation de HairBnB réussie, lien partagé et site en ligne à 90% responsive                                          |
| [[25-11-2024 - stockx]]             | Problème d'accès à l'API StockX pour KicksFolio — demande de conseils à la communauté                                    |
| [[27-11-2024 - bilan]]              | Bilan après 2 jours sur le projet final BeatMachine — homepage, users et statistiques                                    |
| [[28-11-2024 - chatgpt]]            | L'IA ne remplace pas, mais oblige à monter en compétences pour rester pertinent                                          |
| [[28-11-2024 - petit]]              | Partage d'un outil de dev utile que même certains profs de formation ne connaissaient pas                                |
| [[01-12-2024 - connaissezvous]]     | Théorie des vitres brisées appliquée au code : un seul bug non traité en attire d'autres                                 |
| [[03-12-2024 - partait]]            | Nouveau design front de BeatMachine — comparaison avant/après refonte                                                    |
| [[03-12-2024 - sommes]]             | État d'avancement du projet BeatMachine après une semaine — refonte front en cours                                       |
| [[06-12-2024 - formation]]          | Fin des 2 mois de formation Le Wagon — projet final "finis" et prochaines étapes                                         |
| [[07-12-2024 - chance]]             | Call enregistré avec Lucien Arbieu — conseils pour bien débuter dans le dev                                              |
| [[08-12-2024 - quest]]              | Interrogation sur quoi faire en décembre en attendant le début du stage                                                  |
| [[09-12-2024 - objectifs]]          | Objectifs post-formation pour décembre : développer KicksFolio, lire, s'améliorer                                        |
| [[11-12-2024 - build]]              | BIP KicksFolio Jour 0 — démarrage du Build in Public, inspiré par Lucien Arbieu                                          |
| [[15-12-2024 - non]]                | BIP KicksFolio — pas un post sur Chris Scholly, mais le vrai lancement du Build in Public                                |
| [[17-12-2024 - build]]              | BIP KicksFolio Jour 2 — routes API terminées, premier jour de backend fonctionnel                                        |
| [[18-12-2024 - build]]              | BIP KicksFolio Jour 3 — cœur des routes API et schéma de données expliqué                                                |
| [[19-12-2024 - build]]              | BIP KicksFolio Jour 4 — backend à 80–90% terminé                                                                         |
| [[19-12-2024 - kicksfolio]]         | BIP KicksFolio Jour 4.5 — React Native et Expo configurés, backend à mettre en prod                                      |
| [[20-12-2024 - certification]]      | Annonce de l'obtention de la certification Le Wagon, prêt pour rejoindre le monde des devs                               |
| [[21-12-2024 - focus]]              | Difficulté à décrocher du projet KicksFolio pour faire de la veille — comment trouver l'équilibre ?                      |
| [[21-12-2024 - kicksfolio]]         | BIP KicksFolio Jour 6 — premiers composants React Native en cours, besoin d'un émulateur Android                         |
| [[23-12-2024 - kicksfolio]]         | BIP KicksFolio Jour 7 — premiers visuels, Animated views, objectif login et session                                      |
| [[24-12-2024 - build]]              | BIP KicksFolio Jour 8 — réflexion sur l'esprit du Build in Public et partage authentique                                 |
| [[25-12-2024 - build]]              | BIP KicksFolio Jour 9 — pas de code ce jour de Noël, retour sur l'avancement                                             |
| [[27-12-2024 - build]]              | BIP KicksFolio Jour 9 (le vrai) — reprise après la pause de Noël                                                         |
| [[28-12-2024 - build]]              | BIP KicksFolio Jour 10 — avancement sur les tests et fonctionnalités de collection                                       |
| [[29-12-2024 - build]]              | BIP KicksFolio Jour 11 — difficultés à rester focus, avancée lente                                                       |
| [[30-12-2024 - build]]              | BIP KicksFolio Jour 12 — post écrit à 2h13, avancée sur les notifications                                                |
| [[31-12-2024 - ecris]]              | Post écrit sans dormir — nuit de travail intense sur KicksFolio pour tenir la deadline                                   |
| [[31-12-2024 - resumer]]            | Bilan 2024 et objectifs 2025 — récap de l'année, projets accomplis, ambitions pour la suite                              |
| [[02-01-2025 - commencer]]          | Throwback sur la présentation de fin de batch BeatMachine — retour sur l'aventure Le Wagon                               |
| [[03-01-2025 - build]]              | BIP KicksFolio Jour 14 — reprise du rythme, avancement sur les fonctionnalités                                           |
| [[05-01-2025 - non]]                | Retour après une absence : tête sous l'eau depuis le début du stage, retour expliqué                                     |
| [[06-01-2025 - last]]               | Dernier BIP KicksFolio Jour 17 — clôture de la série, premier jour de stage                                              |
| [[09-01-2025 - wow]]                | Première semaine de stage — mission surprenante de débuggage, déjà dans le bain                                          |
| [[11-01-2025 - fait]]               | Update KicksFolio — quelques semaines de mise en pause, bilan de l'état du projet                                        |
| [[16-01-2025 - longues]]            | Réflexion sur la discipline : les longues journées d'aujourd'hui sont le temps gagné demain                              |
| [[19-01-2025 - tdd]]                | Retour d'expérience : l'absence de tests dans KicksFolio a créé une vraie dette technique — leçon apprise                |
| [[23-01-2025 - recrutement]]        | Post de recherche de mission : présentation du profil, des compétences et des projets                                    |
| [[27-01-2025 - nike]]               | Explication de la stratégie de Nike pour éliminer les shops de revente en saturant le marché                             |
| [[28-01-2025 - stage]]              | Update sur le stage : l'outil de debugging secret avance bien, vidéo de présentation prévue                              |
| [[10-02-2025 - fait]]               | Retour après une longue absence — aveux honnêtes sur les raisons du silence                                              |
| [[17-02-2025 - fin]]                | Fin de stage imminente : réflexion sur la transmission du code et du contexte projet                                     |
| [[30-04-2025 - disent]]             | Retour après un long silence — "sashiburi dana", reprise des posts avec envie                                            |
| [[03-05-2025 - malgre]]             | Observations pendant la pause LinkedIn : ce qui n'a pas changé sur le réseau                                             |
| [[05-05-2025 - weekend]]            | Ce week-end : retour sur KicksFolio, état d'avancement et prochaines étapes                                              |
| [[07-05-2025 - parallele]]          | En parallèle de KicksFolio : nouveau péché mignon Three.js et la 3D                                                      |
| [[11-05-2025 - avant]]              | Comparaison avant/après refacto de KicksFolio — organisation des fichiers et composants                                  |
| [[14-05-2025 - assiste]]            | Webinar sur la recherche d'emploi qui a mal tourné — retour critique et leçons                                           |
| [[17-05-2025 - kicksfolio]]         | Présentation de KicksFolio — l'app de gestion de collection de sneakers en cours de dev                                  |
| [[19-05-2025 - codes]]              | Si tu codes juste pour que ça marche, tu passes à côté de l'essentiel — plaidoyer pour la qualité                        |
| [[21-05-2025 - devs]]               | Question aux devs React Native : comment construire des apps scalables et propres ?                                      |
| [[23-05-2025 - pensais]]            | Humour : découverte des vraies corbeilles de fruits dans les bureaux tech                                                |
| [[24-05-2025 - cesserai]]           | Prise de notes vitale — depuis KicksFolio, chaque décision d'architecture documentée dans Obsidian                       |
| [[26-05-2025 - ancien]]             | Et si ton ancien métier était ta plus grande force en reconversion ? Réflexion sur le passé comme atout                  |
| [[28-05-2025 - chance]]             | Session de TDD en live avec un expert — ce qui a changé dans la vision du TDD                                            |
| [[30-05-2025 - kicksfolio]]         | Journée entière passée à déboguer le build de KicksFolio — enfin relancé sur téléphone                                   |
| [[31-05-2025 - pensecode]]          | Réflexion sur le fait de "penser code" dans la vie quotidienne — les ascenseurs vus comme un algorithme                  |
| [[01-06-2025 - replicube]]          | Découverte de Replicube, jeu Steam où l'on code en Lua pour reproduire des formes en minimisant son code                 |
| [[02-06-2025 - tests]]              | Défense des tests techniques en entretien : un bon test est un dialogue enrichissant, pas une punition                   |
| [[04-06-2025 - basilic]]            | Le Basilic de Roko : et si l'IA du futur punissait ceux qui n'ont pas contribué à son avènement ?                        |
| [[06-06-2025 - connais]]            | L'illusion de la main chaude appliquée au dev — biais cognitif et sur-confiance dans le code                             |
| [[06-06-2025 - passe]]              | Et si ton passé non-tech faisait de toi un meilleur dev qu'un ingénieur bac+5 ?                                          |
| [[09-06-2025 - projets]]            | Même pour les projets perso : utilisation d'un tableau Kanban pour s'organiser                                           |
| [[11-06-2025 - pourquoi]]           | Pourquoi refaire quelque chose qui marchait déjà ? Parce que fonctionnel ≠ bien conçu                                    |
| [[12-06-2025 - reprendre]]          | Reprendre un projet perso après des mois : comme rentrer chez soi après une tempête                                      |
| [[13-06-2025 - etais]]              | À deux doigts de laisser tomber KicksFolio il y a quelques mois — pourquoi continuer                                     |
| [[15-06-2025 - aimes]]              | T'aimes vivre dangereusement ? Pousser du code sans tests, c'est jouer avec le feu                                       |
| [[16-06-2025 - developpeurs]]       | Question aux devs React Native : problème d'architecture backend spécifique à KicksFolio                                 |
| [[17-06-2025 - suite]]              | Suite du dilemme backend KicksFolio — quel choix technique pour la scalabilité ?                                         |
| [[18-06-2025 - commence]]           | KicksFolio conçue comme app pour soi, maintenant confrontée à de vrais besoins utilisateurs                              |
| [[19-06-2025 - besoin]]             | Besoin de retours sur un point UX souvent négligé dans KicksFolio                                                        |
| [[20-06-2025 - faut]]               | Il faut vraiment vouloir changer de vie pour se reconvertir — pas juste apprendre à coder                                |
| [[24-06-2025 - peux]]               | Enfin les nouvelles features de KicksFolio peuvent être attaquées — après le long refacto                                |
| [[25-06-2025 - matin]]              | Il est 3h du matin — immersion totale dans KicksFolio, les doigts qui continuent de coder                                |
| [[27-06-2025 - commence]]           | Au début de KicksFolio, loin d'avoir les réponses — retour sur le chemin parcouru                                        |
| [[28-06-2025 - kicksfolio]]         | KicksFolio né d'un besoin perso — la reprise du dev bien accueillie par des bêta-testeurs enthousiastes                  |
| [[30-06-2025 - i18n]]               | Leçon apprise à 3h du matin : anticiper l'internationalisation dès le début pour éviter la dette technique               |
| [[01-07-2025 - i18n]]               | L'i18n (devises, tailles de sneakers) comme acte de respect envers l'utilisateur, pas juste une feature                  |
| [[03-07-2025 - build]]              | Galère de debug : crash iOS uniquement en prod (Reanimated ?) et blocage Google Play sur la version SDK                  |
| [[05-07-2025 - bloque]]             | Bloqué sur LinkedIn pour avoir questionné un projet — réflexion sur la culture de validation vs critique constructive    |
| [[06-07-2025 - cherche]]            | Cette semaine : confrontation au moment redouté — les entretiens techniques                                              |
| [[08-07-2025 - marque]]             | "Junior" sur l'offre mais senior dans les attendus — le décalage des fiches de poste                                     |
| [[09-07-2025 - fait]]               | "A au fait j'ai un bug" — le message que tous les devs redoutent de recevoir sans contexte                               |
| [[10-07-2025 - core]]               | La core feature de KicksFolio est de nouveau présente après le grand refacto                                             |
| [[11-07-2025 - nouveau]]            | Nouveau branding pour le profil LinkedIn — demande d'avis sur la nouvelle identité visuelle                              |
| [[12-07-2025 - derniere]]           | Retour sur les ressources de prep entretiens partagées par la communauté                                                 |
| [[13-07-2025 - parlais]]            | En plus des entraînements, un autre type de call cette semaine — retour mystérieux                                       |
| [[14-07-2025 - derniere]]           | De l'entraînement aux entretiens à jouer le vrai jeu des process de recrutement                                          |
| [[16-07-2025 - dit]]                | On dit qu'il faut être régulier sur LinkedIn — et pourtant, une journée de break assumée                                 |
| [[17-07-2025 - repondu]]            | Répondre à des mails de refus — et un recruteur qui rappelle en retour                                                   |
| [[18-07-2025 - attendu]]            | Attendu 30 minutes — le recruteur n'a jamais appelé, sans message ni excuse                                              |
| [[19-07-2025 - pense]]              | La meilleure intro à la clean architecture — apprise par la pratique directe                                             |
| [[20-07-2025 - environ]]            | 1 an à poster chaque jour sur LinkedIn — bilan des apprentissages et de l'évolution                                      |
| [[21-07-2025 - remets]]             | 1 kata par jour cette semaine — pas pour "faire du code" mais pour affûter la rigueur                                    |
| [[22-07-2025 - ajouter]]            | Ajouter l'auth Facebook sur son app — ce qui paraît simple et l'enfer que ça peut devenir                                |
| [[23-07-2025 - landing]]            | Question ouverte : nocode ou code pour une landing page d'app mobile ? (67 commentaires)                                 |
| [[25-07-2025 - follow]]             | Nouvelle feature KicksFolio : recherche et suivi de profils utilisateurs avec affichage de leur collection               |
| [[26-07-2025 - refacto]]            | Pause features pour refactorer vers une architecture clean : inversion de dépendances, séparation métier/infra           |
| [[27-07-2025 - framer]]             | Découverte de Framer : landing page KicksFolio en 2h, puis choix d'Astro pour le SEO et la flexibilité                   |
| [[29-07-2025 - barcelone]]          | Frustration : entretien technique passé alors que la décision était déjà prise — plaidoyer pour des retours honnêtes     |
| [[30-07-2025 - devais]]             | Semaine prévue pour avancer sur KicksFolio — ce qui a réellement eu lieu vs ce qui était planifié                        |
| [[31-07-2025 - enfin]]              | Enfin mis en pratique ce qui avait été annoncé — retrait de dépendances obsolètes                                        |
| [[01-08-2025 - maintenant]]         | La base de code de KicksFolio commence à respirer — bilan du refacto en cours                                            |
| [[02-08-2025 - weekend]]            | Bon week-end à tous, sauf... humour dev sur une image satisfaisante de grille parfaitement alignée                       |
| [[03-08-2025 - nouvelle]]           | Pas de nouvelle feature — journée consacrée aux tests et à la couverture de code                                         |
| [[04-08-2025 - derniere]]           | La semaine dernière, choix de ne pas postuler — pourquoi et réflexions sur la recherche d'emploi                         |
| [[05-08-2025 - marche]]             | "Ça marche pas" — la phrase que tous les devs détestent, sans contexte ni info supplémentaire                            |
| [[06-08-2025 - fait]]               | Deuxième gros refacto de KicksFolio terminé — retour sur ce qui a changé dans l'architecture                             |
| [[07-08-2025 - partager]]           | Partager sa collection KicksFolio — réflexions sur la conception et l'implémentation de la feature                       |
| [[08-08-2025 - chatgpt]]            | ChatGPT 5 est sorti — anticipation sarcastique du flood de posts sur le sujet                                            |
| [[09-08-2025 - pourquoi]]           | Normalisation de la base de données de KicksFolio — pourquoi c'était nécessaire et comment                               |
| [[15-08-2025 - aout]]               | 15 août, les stores dans 2 semaines — état d'avancement et features restantes à livrer                                   |
| [[18-08-2025 - discipline]]         | La discipline ne vient pas seule — surtout sur un projet solo, il faut se l'imposer                                      |
| [[19-08-2025 - juin]]               | Fin de l'expérience chez Spash en juin — bilan et transition vers la suite                                               |
| [[24-08-2025 - avoue]]              | Aveu : LinkedIn lâché cette semaine pour se concentrer sur le sprint final de KicksFolio                                 |
| [[25-08-2025 - roadmap]]            | Roadmap claire des dernières tâches avant la V1 : OAuth, notifs push, bêta-testeurs Android                              |
| [[27-08-2025 - partage]]            | Implémentation du partage de collection par lien avec filtres — la dernière grosse feature avant la sortie               |
| [[28-08-2025 - mvp]]                | MVP finalisé à 3h40 du matin (notifications push incluses) — prêt pour soumission sur les stores                         |
| [[30-08-2025 - stores]]             | Léger retard de sortie : derniers bugs iOS corrigés, contrainte des 14 jours de bêta sur Android                         |
| [[02-09-2025 - release]]            | En attente de validation Apple, déjà en train de préparer les features post-lancement                                    |
| [[03-09-2025 - petit]]              | Petit exutoire : ce qui dérange sur LinkedIn — screenshots Slack, flex de stats, posts répétitifs                        |
| [[05-09-2025 - kicksfolio]]         | KicksFolio enfin sur l'App Store ! Retour sur les galères de soumission et la joie du lancement                          |
| [[07-09-2025 - lancement]]          | Le lancement de KicksFolio s'est fait — et maintenant, quelle suite pour l'app ?                                         |
| [[08-09-2025 - kicsfolio]]          | KicksFolio sorti sans bug majeur — quelques petits soucis mais une sortie globalement réussie                            |
| [[09-09-2025 - parle]]              | Tests techniques en entretien — souvent critiqués mais quand bien utilisés, une vraie valeur                             |
| [[14-09-2025 - non]]                | Agacement contre LinkedIn qui propose des offres inadaptées en prétendant que tu es le meilleur candidat                 |
| [[17-09-2025 - recu]]               | Message reçu qui confirme que le travail de fond finit par payer — émotion et fierté                                     |
| [[18-09-2025 - mal]]                | Réponses aux DMs : comment trouver une mission malgré le contexte difficile du marché                                    |
| [[19-09-2025 - jamais]]             | N'a jamais payé un coach ni mis "open to work" — retour sur la méthode pour trouver                                      |
| [[19-09-2025 - semaines]]           | Podcast tourné avec David — parcours de reconversion et vision de la tech                                                |
| [[22-09-2025 - suis]]               | Question ouverte : quelle est ta plus grande fierté en tant que dev ?                                                    |
| [[23-09-2025 - galerer]]            | Plus de 6 mois sans propositions, puis 2 en 7 jours — retour sur ce retournement de situation                            |
| [[25-09-2025 - vois]]               | Il n'y a pas un jour sans voir des posts qui se plaignent d'autres posts — l'ironie de LinkedIn                          |
| [[30-09-2025 - fais]]               | J'ai fait mon choix — retour sur les deux propositions reçues et la décision prise                                       |
| [[01-10-2025 - apple]]              | Réaction au design Liquid Glass d'Apple iOS 26 — sceptique au début, puis conquis                                        |
| [[03-10-2025 - olislab]]            | Annonce officielle de la prise de poste en tant que développeur full stack chez Oli's Lab                                |
| [[06-10-2025 - changelog]]          | KicksFolio se refait une beauté et implémentation d'un système de changelog pour les utilisateurs                        |
| [[06-11-2025 - olislab]]            | Bilan du premier mois chez Oli's Lab : codebase legacy, migration Next.js, full remote et rencontre CTO                  |
| [[08-11-2025 - erreurs]]            | Liste des erreurs du premier mois (boucle infinie, PR géante, suppression de produits) — retours bienveillants           |
| [[08-11-2025 - evenement]]          | Court remerciement suite à une journée tech enrichissante malgré les imperfections du sujet                              |
| [[11-11-2025 - rendu]]              | L'équipe utilise l'IA différemment — réflexion sur les standards d'usage collectif à établir                             |
| [[15-11-2025 - derniers]]           | KicksFolio mis de côté ces derniers temps — pas par lassitude, mais par manque de temps                                  |
| [[18-11-2025 - cloudflare]]         | Réaction sarcastique : Cloudflare tombe en panne et c'est le buzzword pour se valoriser sur LinkedIn                     |
| [[18-11-2025 - decide]]             | Prochain projet décidé — après quelques jours de réflexion, la direction est choisie                                     |
| [[27-11-2025 - message]]            | Message de fin de semaine du tech lead sur Slack — reconnaissance et moment de fierté                                    |
| [[29-11-2025 - comprendrais]]       | Incompréhension face aux gens qui postent mais ne répondent jamais aux commentaires                                      |
| [[02-12-2025 - viens]]              | Bloqué à nouveau sur LinkedIn — cette fois pour avoir demandé à quelqu'un d'être plus précis dans ses propos             |
| [[05-12-2025 - depuis]]             | Solution trouvée à un problème technique traîné depuis la création de l'app — enfin réglé                                |
| [[06-12-2025 - change]]             | Change my mind : ceux qui disent ne plus savoir coder sans IA ne savaient pas vraiment coder                             |
| [[08-12-2025 - peu]]                | Vraie question soulevée avec humour : doit-on déployer en production le vendredi ?                                       |
| [[17-12-2025 - postits]]            | Humour : les post-its, la seule chose que l'IA ne pourra jamais enlever                                                  |
| [[01-01-2026 - bilan]]              | Bilan 2025 — l'année où j'ai arrêté de me définir comme "junior" et tout ce que ça implique                              |
| [[03-01-2026 - coree]]              | 2026 sera l'année de préparation d'une installation en Corée du Sud : apprendre le coréen, partir 3 mois                 |
| [[08-01-2026 - entretien]]          | Question ouverte : comment répondrez-vous à une question sur l'IA en entretien (court, moyen, long terme) ?              |
| [[11-01-2026 - bugs]]               | Question provocatrice : si l'IA booste la productivité, pourquoi les apps courantes sont encore pleines de bugs ?        |
| [[17-01-2026 - bilan]]              | Bilan positif de 3 mois chez Oli's Lab : confiance mutuelle, liberté, projet Corée accueilli avec ouverture              |
| [[18-01-2026 - planification]]      | Plutôt qu'espérer la motivation chaque jour, planifier ses posts en un seul shot                                         |
| [[20-01-2026 - paresse]]            | Le vrai danger de l'IA : la paresse intellectuelle — l'utiliser pour aiguiser sa réflexion, pas pour l'éviter            |
| [[22-01-2026 - lire]]               | Même si écrire du code soi-même semble ringard selon certains, défense de la pratique et de l'artisanat                  |
| [[24-01-2026 - suis]]               | Junior ayant trouvé un job à l'ère de l'IA et du "grand remplacement" — les conseils concrets                            |
| [[27-01-2026 - jours]]              | 1 démarche par jour tous les 2 jours — si tu démarches, fais-le bien, personnellement et avec soin                       |
| [[03-02-2026 - dernierement]]       | Réflexion en équipe sur les standards à adopter dans la codebase — quel style de code choisir ?                          |
| [[08-02-2026 - tech]]               | Le tech lead a partagé son processus de débuggage d'un bug complexe — retour d'une heure précieuse                       |
| [[10-02-2026 - recemment]]          | Contacté pour un poste — réflexion sur comment répondre quand on est bien là où on est                                   |
| [[12-02-2026 - enfin]]              | Billets pour la Corée du Sud achetés ! Départ le 1er septembre pour 3 mois                                               |
| [[11-03-2026 - faut]]               | Appel à la tenue sur LinkedIn — savoir débattre sans perdre ses moyens, ou ne pas débattre du tout                       |
| [[15-04-2026 - reprenait]]          | Retour sur LinkedIn après une pause — comment ça va, qu'est-ce qui a changé ?                                            |
| [[17-04-2026 - karpathy]]           | Adaptation du combo Claude + Obsidian popularisé par Karpathy — approche personnalisée plutôt que copiée                 |
| [[19-04-2026 - contexte]]           | Utiliser des notes Obsidian comme contexte persistant pour Claude Code : stack, décisions d'archi, état actuel           |
| [[21-04-2026 - speaker]]            | Annonce de sa participation comme speaker à LyonCraft — moins de 2 ans de dev, zéro diplôme technique                    |
| [[24-04-2026 - cadratin]]           | Le tiret cadratin « — » comme marqueur visible d'un contenu IA copié-collé sans relecture ni appropriation               |
| [[29-04-2026 - schumpeter]]         | L'IA comme destruction créatrice (Schumpeter) : elle détruit des emplois mais en génère d'autres encore sans nom         |
| [[04-05-2026 - talk enregistré]]    | Retour sur le fait de s'écouter sois même lors de la préparation de mon talk.                                            |
| [[06-05-2026 - reconversion]]       | Se reconvertir dans la tech quand on vient du commerce et le fait que je vais raconter ce parcours a LyonCraft.          |
| [[11-05-2026 - demain LyonCraft]]   | Demain c'est LyonCraft et au-delà de donner mon talk ça va être dur de faire des choix pour savoir quoi aller voir.      |
| [[14-05-2026 retour sur LyonCraft]] | Retour sur mon passage à LyonCraft.                                                                                      |
