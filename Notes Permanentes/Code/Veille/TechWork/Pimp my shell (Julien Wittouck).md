---
tags:
  - Veille
event: "Tech'Work"
date: 2026-06-18
speaker: Julien Wittouck
---

## Idée brute

Un bon shell coche quatre critères : lisible, portable d'une machine à l'autre, efficace/performant, et agréable à regarder. Le talk est un tour d'horizon d'outils qui remplacent les binaires par défaut de l'OS par des équivalents plus rapides, plus lisibles et plus pratiques, plus tout le tooling autour (prompt, runtimes, secrets, dotfiles). C'est avant tout une note de setup à piocher.

## Les quatre critères

Lisible, portable, efficace et performant, et joli.

## La stack présentée

### Terminal et shell

- **Ghostty** : émulateur de terminal performant, rendu assisté par GPU.
- **fish** comme shell : autosuggestions, complétions, scripting simple, bon historique de commandes.
- **Nerd Font : JetBrains Mono** : ligatures, emojis et symboles (indispensable pour que les icônes des outils ci-dessous s'affichent).

### Les binaires boostés (remplacent ceux de l'OS)

| Défaut | Remplacement | Apport |
|--------|--------------|--------|
| `cat` | **bat** (binaire `batcat` sur Debian/Ubuntu) | coloration syntaxique, numéros de ligne, fait aussi office de pager |
| `ls` | **lsd** | couleurs, icônes par type de fichier |
| `cd` | **zoxide** | navigation intelligente par fréquence d'usage |
| `find` | **fd** | recherche de fichiers rapide et intuitive |

### Le prompt

- **starship** : prompt cross-shell qui affiche des infos de contexte selon le répertoire (branche git + statut, version du runtime, etc.). Très configurable (thèmes, modules).

### Splash screen au démarrage

- **Splash Board** (*nom à confirmer*) : splash screen customisable, config globale et par répertoire, widgets (git, météo, calendrier, horloge, infos système), big text animé, thèmes type catppuccin, layout flex.

### Runtimes, env et tâches

- **mise** : gère les runtimes, variables d'environnement et tâches. Config globale, par répertoire et par projet, avec activation automatique au `cd` (via le fichier de conf du projet).

### Secrets

- **Fnox** (*nom à confirmer*) : secrets montés directement dans l'environnement. Stockage dans un fichier chiffré, références vers un vault ou un secrets manager cloud, configuration `fnox.toml`, activation auto au `cd`.

### Dotfiles

- **chezmoi** (j'avais noté "Chez Moi") : gère ses dotfiles, synchronisés sur git, et permet de transposer sa config d'une machine à l'autre. C'est la pièce qui répond directement au critère "portable".

### Scripts interactifs

- **gum** (par Charm) : rend les scripts shell interactifs (style, spinner, confirm, choose, pager). Très utile dans des alias git.
- **gitmoji** (j'avais noté "gimoji") : chercher et copier des gitmoji depuis le terminal pour des messages de commit.

### Détail noté

- alias `code .` reconfiguré pour ouvrir **Zed**.

## Ce que ça m'évoque / liens avec ma situation

- J'utilise déjà Zed, donc l'alias `code .` → Zed est immédiat à reprendre.
- **chezmoi + mise** est le combo le plus pertinent pour moi vu mon projet de stage long à Séoul : pouvoir reconstruire mon environnement à l'identique sur une autre machine, c'est exactement le critère "portable". À prioriser avant le départ.
- Le reste (bat, lsd, zoxide, fd, starship) est du gain de confort à coût faible, bon candidat pour un après-midi de setup.

## À faire

Setup réalisé les 19-20 juin 2026, voir [[Setup Shell]] pour l'état final (et bien au-delà du minimal : rg, fzf, xh, tldr, btop + câblage fish).

- [x] Confirmer les noms exacts de "Splash Board" et "Fnox" (= splashboard et fnox ; fnox finalement retiré, un seul secret rare)
- [x] Setup minimal : fish + starship + bat + lsd + zoxide + fd
- [x] Mettre mes dotfiles sous chezmoi avant le départ pour la Corée (repo privé `remyShift/dotfiles`)
