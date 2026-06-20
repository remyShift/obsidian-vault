---
updated: 20-06-2026
project: obsidian-vault
tags: [meta, hot-cache]
---

# Hot Cache — obsidian-vault

## Dernière mise à jour
20-06-2026 — Extension du setup shell : +5 outils CLI (ripgrep, fzf, xh, tealdeer, btop) + bascule des helpers git `gco`/`gbd` de gum vers fzf. Recap dédié `20-06-2026_10-58`. Suite directe du setup du 19/06.

## État du projet
- **Setup shell** étendu et stable. Stack du 19/06 (Ghostty/fish/mise/starship/bat/lsd/zoxide/fd/gum/splashboard/chezmoi) + couche du 20/06 : `rg` (contenu), `fzf` (fuzzy, câblé fish Ctrl+R/Ctrl+T avec previews bat/lsd), `xh` (HTTP lisible), `tldr` (aide par l'exemple), `btop` (moniteur live Dracula).
- **Helpers git fish** : `gco`/`gbd` en fzf avec preview du log ; `gadd`/`gcim` restent en gum.
- Dotfiles sous chezmoi → repo privé `remyShift/dotfiles`, tout dans le Brewfile (env reconstructible d'un `brew bundle`).
- Harnais vault stable : `vault-rag` (sémantique local, ~1003 docs) + `/coach` + `/improve`. mgrep retiré (redondant + SaaS).

## Faits récents importants
- Écriture vault : toujours `Write` (filesystem), jamais `mcp__obsidian__*` (bug encodage latin1).
- **Jamais de `Co-Authored-By`/mention IA dans les commits** (4 commits chezmoi propres cette session).
- `rg`/`xh` non aliasés sur grep/curl (commandes en plus, pas remplacements). Brewfile édité à la main (jamais `brew bundle dump --force`).
- Alt+C fzf dormant sur Mac (Ghostty garde Option pour les accents) ; zoxide couvre le besoin. btop : thème dracula bundlé (pas de download).

## Décisions actives
- fzf recouvre gum pour la sélection fuzzy → `gco`/`gbd` basculés ; gum gardé pour multi-select (`gadd`) et input (`gcim`).
- Écartés à l'audit : direnv (mise), eza (lsd), dust/duf (ncdu), television (fzf), fastfetch/onefetch (splashboard). Sur la table : `yazi`, pimp `starship.toml`, `atuin`.

## Prochaines étapes
- **/evolve : la note "Setup Shell Mac" doit intégrer CETTE session** (outils + câblage fzf + bascule helpers git + `btop.conf`), pas seulement le recap du 19/06. Refléter l'état FINAL du setup.
- Reliquat 19/06 (Rémy) : sudo python.org, rotation mdp Mongo Atlas, suppr backup `~/shell-migration-backup-*`, tester `/coach`.
- Optionnel shell : `yazi` (+ câblage zoxide/fzf), ou pimper `starship.toml` Dracula avec icônes par langage.
