---
tags: [Perso, setup]
type: reference
date: 2026-06-20
---

# Setup Shell Mac

État final de mon environnement shell macOS, monté les 19-20 juin 2026 dans la foulée du talk [[Pimp my shell (Julien Wittouck)]] (Tech'Work). Tout est déclaré au Brewfile et versionné : `brew bundle` reconstruit l'environnement d'un coup. Critère portable = rebuild à l'identique sur une autre machine (utile pour le stage long à Séoul). Voir aussi [[Workflow Claude + Obsidian]].

## Principes

- Rien en `curl | sh`. Tout passe par Homebrew, déclaré dans le **Brewfile** (édité à la main, jamais `brew bundle dump --force`).
- Dotfiles sous **chezmoi** → repo privé `remyShift/dotfiles`. `chezmoi re-add` capture un changement local, push git pour synchroniser.

## Stack installée (rôle)

| Outil | Rôle |
|-------|------|
| Ghostty | émulateur de terminal (rendu GPU) |
| fish | shell (autosuggestions, complétions) |
| starship | prompt cross-shell contextuel |
| mise | runtimes + env + tâches. Remplace nvm/rbenv. Ne lit PAS `.nvmrc`, utilise `.mise.toml` |
| chezmoi | dotfiles versionnés / portables |
| splashboard | splash screen au démarrage |
| bat | `cat` boosté (coloration, pager) |
| lsd | `ls` boosté (icônes, couleurs) |
| zoxide | `cd` intelligent par fréquence |
| fd | recherche de **fichiers** (ignore `.gitignore`) |
| rg (ripgrep) | recherche de **contenu** (récursive) |
| fzf | fuzzy finder (câblé fish) |
| xh | client HTTP lisible |
| tldr (tealdeer) | aide par l'exemple |
| btop | moniteur système live (thème dracula bundlé) |
| gum | scripts shell interactifs (Charm) |

`fd` / `rg` et `xh` ne sont **pas** aliasés sur `find` / `grep` / `curl` : commandes en plus, pas remplacements.

## Câblage fish

- `config.fish` + `conf.d/aliases.fish` + `conf.d/gum.fish`.
- **fzf** câblé : `Ctrl+R` (historique) et `Ctrl+T` (fichiers) avec previews bat/lsd. `Alt+C` (saut de dossier) dormant sur Mac car Ghostty réserve Option aux accents → zoxide (`cd`) couvre le besoin.
- **Helpers git** : `gco` / `gbd` basculés en **fzf** (avec preview du log) ; `gadd` (multi-select) et `gcim` (input) restent en **gum**.

## Décisions / outils écartés

- **fzf recouvre gum** pour la sélection fuzzy → bascule `gco` / `gbd`. gum gardé pour le multi-select et l'input.
- Écartés à l'audit : direnv (couvert par mise), eza (lsd), dust/duf (ncdu), television (fzf), fastfetch/onefetch (splashboard), atuin (pas adopté).
- **fnox** retiré (un seul secret rare, pas justifié) - à reconsidérer si les secrets deviennent récurrents.

## Sur la table

- `yazi` (gestionnaire de fichiers TUI, à câbler avec zoxide/fzf).
- Pimper `starship.toml` (thème Dracula, icônes par langage).
