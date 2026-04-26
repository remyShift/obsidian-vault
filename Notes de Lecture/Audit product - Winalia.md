---
parents: "[[Audit Tech - Winalia]]"
date: 2026-04-26
---
## Verdict en 1 minute

Le produit fonctionne (beaucoup de fonctionnalités livrées), mais les fondations qui protègent l'argent des utilisateurs et la responsabilité légale de l'entreprise ne sont **pas en place**. Lancer dans cet état expose la société à trois types de pertes simultanées : financière (vol direct sur les wallets), juridique (RGPD, statut gambling non clarifié), et de réputation (un seul incident détruit la confiance d'une plateforme financière).

Le bon côté est que tout est rattrapable en **quelques semaines (1 à 3 je dirais) de travail technique ciblé**, à condition de geler les nouvelles features pendant cette période et de prendre une décision juridique en parallèle.

---

## Les 3 risques qui peuvent faire tomber Winalia

### 1. L'argent des utilisateurs n'est pas protégé

La sécurité du compte utilisateur repose normalement sur deux barrières : un mot de passe et un code à 6 chiffres (2FA, comme ton appli bancaire). Aujourd'hui, **la deuxième barrière est désactivée** : le code peut être deviné en quelques secondes. Le bouton existe, l'utilisateur croit être protégé, mais la porte est ouverte.

Plusieurs autres garde-fous attendus sur une plateforme financière sont absents ou désactivés. Conséquence concrète est qu'un attaquant motivé peut **vider des wallets** sans déclencher d'alerte. Et comme il n'y a aucun système de surveillance (cf. point 3), nous ne le saurions qu'**après coup, par les plaintes des utilisateurs**.
### 2. Le statut juridique de la plateforme n'est pas tranché

Winalia propose des matchs en argent réel (`winamatch`), du ranked avec récompenses, des dépôts et retraits. En France, dès qu'on parle d'enjeu en argent et d'une part d'incertitude sur le résultat, on peut basculer dans le régime de la **loi sur les jeux d'argent en ligne** (autorité ANJ). C'est une frontière fine, qui dépend du niveau de skill vs hasard, du modèle économique, et du marketing utilisé.

**Si la plateforme tombe sous ce régime sans agrément :**
- amendes administratives (jusqu'à plusieurs centaines de milliers d'euros),
- sanctions pénales possibles pour les dirigeants,
- blocage du domaine par l'ANJ,
- gels de comptes bancaires.

**Si la plateforme reste dans le skill gaming :**
- obligations RGPD pleines (vérification d'âge, consentement cookies, droit à l'oubli),
- transparence sur les conditions de retrait,
- mentions légales claires.

Aujourd'hui, ni l'un ni l'autre n'est en place. Il manque notamment :
- la **vérification d'âge 18+** systématique,
- le **bandeau cookies RGPD** (obligatoire en France),
- les **mentions légales** (éditeur, hébergeur, contact RGPD),
- les **limites de dépôt et auto-exclusion** (jeu responsable).

**Action prioritaire** : prendre rendez-vous avec un avocat spécialisé jeu/numérique avant tout investissement marketing significatif. Budget à prévoir : 3 000 à 8 000 € pour une consultation cadrante. Délai : 2 semaines pour avoir une réponse écrite.

### 3. Aucun système de surveillance ni de garde-fou en cas de bug

Une plateforme de production a normalement trois choses :
- une **surveillance automatique** des erreurs (Sentry ou équivalent),
- des **tests automatiques** qui empêchent un développeur de casser l'existant en ajoutant une feature,
- une **chaîne de validation** avant que du code n'arrive en prod (revue de code, vérifications automatiques).

Winalia n'a **aucun de ces trois éléments**. Un bug en prod n'est détecté que par les utilisateurs qui ouvrent un ticket. Toute correction part directement en prod sans relecture. Tout l'historique du projet tient sur un seul commit (l'équivalent d'avoir tout écrit en une nuit, sans trace de qui a fait quoi).

Concrètement, cela veut dire :
- si une feature paye plus que prévu, on ne le verra pas avant la fin du mois,
- si une feature plante en silence, des utilisateurs partent sans qu'on le sache,
- si un nouveau dev rejoint l'équipe, il ne peut pas comprendre l'historique des décisions.

C'est le risque le moins visible mais le plus structurant : **plus on ajoute de features, plus la plateforme devient fragile**, jusqu'au point de bascule où chaque déploiement casse autre chose.

---

## Ce qui marche bien (à préserver)

Il faut souligner ce qui a été bien fait — c'est ce qui rend la remédiation possible :

| Domaine | État |
|---|---|
| Quantité de features livrées | 142 routes API, 14 pages publiques, plusieurs modules complets (wallet, ranked, winamatch, shop, teams, profil, premium…) |
| Qualité visuelle | Bibliothèque de composants moderne (Radix UI), accessibilité gratuite, design cohérent |
| Validation des données entrantes | ~85 % des points d'entrée valident ce qu'ils reçoivent (bon réflexe) |
| Anti-bot | hCaptcha présent sur les pages sensibles |
| Vérification d'identité (KYC) | Workflow d'approbation présent (à durcir mais structure OK) |
| Embryon RGPD | Routes "supprimer mon compte" et "exporter mes données" déjà codées |
| Webhooks de paiement | Signatures vérifiées pour Viva et Xsolla |

C'est une base solide pour un produit en construction. Le problème n'est pas l'absence de travail, c'est l'**absence de mise en sécurité** de ce travail.

---

## Pourquoi c'est urgent même avant le lancement public

Trois raisons :

1. **Plus le produit grandit, plus la dette devient chère.** Refondre la sécurité quand il y a 142 fonctionnalités coûte 4 semaines. Quand il y en aura 300, ce sera 3 mois.
2. **Les premiers utilisateurs sont les plus visibles.** Un incident sur 10 utilisateurs détruit autant la réputation qu'un incident sur 10 000. Et les premiers utilisateurs sont les plus susceptibles de poster sur Reddit/Twitter.
3. **Une amende RGPD ne s'applique pas seulement aux grandes entreprises.** La CNIL a sanctionné des startups françaises de moins de 10 employés pour absence de bandeau cookies (5 000 à 50 000 €).

---

## Plan d'action — 6 semaines

### Semaines 1-2 : Stop the bleeding (sécurité critique)
**Gel des nouvelles features pendant cette période.**
- Réparer le 2FA.
- Brancher les protections de sécurité standards (équivalent du verrou sur la porte d'entrée).
- Supprimer les portes laissées ouvertes pendant le développement.
- Empêcher les retraits de wallet en double (race condition).
- Empêcher les paiements crédités deux fois (replay des webhooks).
- Audit complet de qui peut lire/écrire dans la base de données.

### Semaines 3-4 : Outillage industriel
- Mettre en place une **surveillance d'erreurs** (Sentry, ~30 €/mois).
- Mettre en place un **système de validation automatique** avant chaque mise en prod.
- Nettoyer la base de données : ramener les **57 fichiers SQL en désordre** à un système propre et versionné (la situation actuelle empêche de savoir ce qui tourne réellement en prod).
- Mettre en place un **plan de sauvegarde** documenté (que faire si la base de données est perdue).

### Semaines 5-6 : Tests + qualité
- Couvrir les flux financiers critiques (dépôt, retrait, KYC, 2FA) par des tests automatiques.
- Réécrire les 5 plus gros morceaux de code (composants de 1000 lignes qui sont impossibles à maintenir).
- Documenter le projet pour qu'un nouveau développeur puisse contribuer en moins d'une semaine.

### Au-delà — Conformité et structure
- Bandeau cookies + mentions légales + page de conformité.
- Implémenter la vérification d'âge.
- Si le statut gambling est confirmé : démarrer la procédure ANJ (compter 6 à 12 mois).
- Mettre en place un journal d'audit immuable (qui a fait quoi, quand, sur les actions sensibles).

---

## Décisions à prendre maintenant

| Décision | Coût | Délai | Recommandation |
|---|---|---|---|
| **Avis juridique gambling** | 3 000-8 000 € | 2 sem | Indispensable. À lancer cette semaine. |
| **Gel des nouvelles features 6 sem** | Coût d'opportunité produit | 6 sem | Indispensable. Sinon les correctifs sont avalés par les nouveautés. |
| **Outils de surveillance et de qualité** | ~50 €/mois total | 1 jour à mettre en place | Évident. |
| **2e développeur senior (CDI ou freelance)** | 4 000-7 000 €/mois | 1-2 mois recrutement | À évaluer. Le bus factor actuel (1 dev) est un risque opérationnel majeur. |
| **Budget audit sécurité externe avant launch** | 5 000-15 000 € | 1 sem d'audit + 2 sem correctifs | Recommandé avant tout marketing payant. |

---

## Indicateurs simples pour suivre la remédiation

À reporter chaque semaine au CEO :

| Indicateur | Aujourd'hui | Cible 6 sem |
|---|---|---|
| 2FA réellement fonctionnel | Non | Oui |
| Headers de sécurité (note Mozilla Observatory) | F | A |
| Surveillance d'erreurs en place | Non | Oui |
| Plan de sauvegarde documenté | Non | Oui |
| Tests automatiques sur les flux argent | 0 % | 60 % |
| Mises en prod passant par une chaîne de validation | Non | Oui |
| Bandeau cookies | Non | Oui |
| Avis juridique gambling | À demander | Reçu, statut tranché |
| Vérification d'âge 18+ | Non | Oui |

---

## Ce qu'on ne fait pas

Pour cadrer les attentes : ces 6 semaines **ne couvriront pas** :
- l'obtention d'une licence ANJ (6-12 mois si nécessaire),
- la refonte complète de l'architecture (chantier de plusieurs mois, à étaler ensuite),
- le multi-langue / lancement EU multi-pays,
- les optimisations de performance fines (à faire sur la base d'une charge réelle, pas en théorie).

L'objectif des 6 semaines est de **passer d'un produit dangereux à mettre en prod, à un produit qu'on peut mettre en prod sans honte ni risque démesuré**. Pas de viser la perfection.

---

## Recommandation finale

Trois oui à obtenir cette semaine :

1. **Oui** au gel des nouvelles features pour 6 semaines.
2. **Oui** au lancement de l'avis juridique sur le statut gambling.
3. **Oui** au budget mensuel récurrent pour l'outillage (~50 €) et au budget ponctuel pour l'audit externe avant launch (~10 000 €).

Sans ces trois oui, le risque est qu'on continue à empiler des features sur une base instable, et que l'incident finisse par arriver en plein lancement marketing. À ce moment-là, le coût de réparation sera multiplié par 5 ou 10, et la fenêtre commerciale sera ratée.

Avec ces trois oui, Winalia est en état d'aller chercher ses 1 000 premiers utilisateurs sereinement dans 6 à 8 semaines.