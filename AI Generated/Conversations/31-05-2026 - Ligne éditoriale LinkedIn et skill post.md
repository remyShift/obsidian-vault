---
source: ai
---

# 31-05-2026 - Ligne éditoriale LinkedIn et skill post

**Domaine :** Créatif / Workflow
**Statut :** Synthèse brute -> à intégrer dans les notes permanentes si pertinent

---

## Contexte

Définir une ligne éditoriale LinkedIn en s'appuyant sur l'archive complète des posts, les notes du vault et le talk LyonCraft. Puis matérialiser le tout dans le vault : une note de référence et un skill de création de post.

## Points clés

- Diagnostic : pas un problème de ligne mais de dilution. La ligne existe déjà dans les meilleurs posts (cadratin, nocode vs code, talk sans romance), noyée sous du bruit (objectifs hebdo, logs de grind, micro-updates).
- Positionnement retenu : "développeur par obstination". Autodidacte venu du commerce, le craft comme culture qu'on se construit, le travail fait soi-même à une époque de raccourcis. Autorité par le parcours, pas par la maîtrise.
- 4 piliers : craft et qualité (sensibilité, pas expertise), le parcours obstiné (registre non romancé), l'IA avec lucidité (anti-paresse, anti-slop), le terrain en build in public (REX qui apprennent au lecteur).
- Voix et forme : première personne, ton parlé, tutoiement, hook en ouverture, question ouverte en clôture, jamais de comparatif de frameworks.
- Recadrage majeur sur l'écriture : le principe n'est pas "j'écris tout à la main" (vieille promesse du bilan 1 an qui piège), mais "le dernier mot, toujours". L'IA est utilisée et assumée, mais rien ne sort sans relecture et appropriation. Cohérent avec le post cadratin. Implique d'éliminer les tics d'IA dans les publications.
- Risque principal : la régularité subie qui pousse à poster du vide. Mieux vaut moins mais juste, planifier en batch.

## Décisions prises

- Pilier craft recadré en sensibilité et pratique partagée, jamais en posture d'expert.
- Règle de forme actée : "le dernier mot" remplace la pureté du tout-écrit-à-la-main.
- Création de la note de référence : `Notes Permanentes/Contenu & Créatif/Linkedin/Ligne éditoriale.md`.
- Création du skill `Skills/post/SKILL.md`, déclenché par `/post` : charge la ligne éditoriale et les 5 derniers posts, propose 3 idées, puis reproposer 3 idées ou rédige celle choisie.
- Le skill ne sauvegarde jamais les brouillons dans `Posts/` : l'archive reste réservée aux posts publiés avec URL et stats.

## Actions à faire

- [ ] Ajouter dans les préférences une ligne câblant le trigger `/post` vers le skill (sur le modèle de `/wrap`), sinon le skill reste inerte.
- [ ] Ajuster la ligne éditoriale (passe prévue plus tard).
- [ ] Tester le skill `/post` pour valider la pertinence des idées proposées.
