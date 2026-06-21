---
source: ai
---

# 21-06-2026 - Message a Julien Wittouck sur mon setup shell

**Domaine :** Code / Workflow
**Statut :** Synthèse brute → à intégrer dans les notes permanentes si pertinent

---

## Contexte
Rédaction d'un message à Julien Wittouck, le speaker du talk "Pimp my shell" à Tech'Work, pour lui dire que j'ai customisé tout mon shell suite à son intervention et que j'ai hâte de voir ce que ça donne en pratique. Lecture préalable de la note du talk et de ma note Setup Shell pour caler le contenu.

## Points clés
- Mon setup va bien au-delà du minimal présenté : en plus de Ghostty + fish + starship et des binaires boostés aliasés (bat, lsd, zoxide, fd), j'ai ajouté rg, fzf, btop, xh, tldr, mise, chezmoi, gum et splashboard.
- L'angle fort du message : chezmoi + Brewfile reproductible répondent direct au critère "portable" du talk, ce qui tombe pile pour mon départ en Corée (rebuild de l'environnement à l'identique).
- Mes helpers git maison sont un bon point de fierté à mentionner : gco / gbd en fzf avec preview du log, gadd / gcim en gum.
- Première itération en deux versions (courte vs détaillée). J'ai voulu plus détaillé pour refléter le vrai boulot.
- Verdict sur la version à envoyer : la version détaillée qui se termine par une vraie question technique (le blocage de 2s de splashboard quand un widget est animé, contourné en full statique). Une question concrète transforme un remerciement en début d'échange et donne une raison de répondre.

## Décisions prises
- Partir sur la version détaillée avec la question sur splashboard plutôt que sur un simple remerciement.
- Garder le message lisible et éviter le dump de config exhaustif.

## Actions à faire
- [ ] Envoyer le message à Julien Wittouck (canal à confirmer, probablement LinkedIn).
- [ ] Vérifier au passage que ma formulation sur le blocage de 2s de splashboard est exacte avant envoi (ANIMATION_WINDOW codée en dur, parade = full statique).
