---
tags:
  - Perso
---

État final de mon environnement shell macOS, suite au talk [[Pimp my shell (Julien Wittouck)]] (Tech'Work).

Tout est déclaré au Brewfile et versionné : `brew bundle` reconstruit l'environnement d'un coup. Critère portable = rebuild à l'identique sur une autre machine.

## Principes

- Rien en `curl | sh`. Tout passe par Homebrew, déclaré dans le **Brewfile** (édité à la main, jamais `brew bundle dump --force`).
- Dotfiles sous **chezmoi** → repo privé `remyShift/dotfiles`
	- `chezmoi re-add` capture un changement local, push git pour synchroniser.

## Stack installée

Note transverse : `rg` et `xh` se tapent tels quels (pas d'alias sur `grep` / `curl`).

En revanche `cat`→bat, `ls`→lsd, `find`→fd et `cd`→zoxide sont aliasés (détail dans **Alias et fonctions maison** plus bas).

### Terminal et shell

**Ghostty** - émulateur de terminal en Rust, rendu GPU, léger. Toute la conf tient dans un fichier texte `~/.config/ghostty/config`.

- Clés : `ghostty +list-themes` (galerie de thèmes), `ghostty +show-config --default` (toutes les options et leur défaut). Recharger la conf à chaud dans l'app : `Cmd+Shift+,`.
- Ex. : dans le config, `theme = Dracula`, `font-family = JetBrainsMono Nerd Font`, `keybind = cmd+k=clear_screen`.

**fish** - shell avec autosuggestions (propose la fin de commande en gris depuis l'historique) et complétions riches, sans config. Conf dans `~/.config/fish/config.fish`, fonctions auto-chargées dans `functions/`, snippets de démarrage dans `conf.d/`.

- Clés : `abbr -a gco 'git checkout'` (abréviation qui s'étend en tapant), `funced ma_fonction` / `funcsave ma_fonction` (éditer/sauver une fonction), `set -Ux VAR valeur` (variable d'env universelle et persistante), `fish_config` (UI web pour prompt et couleurs).
- Ex. : `set -Ux EDITOR zed` pose l'éditeur par défaut une fois pour toutes.

**starship** - prompt cross-shell qui affiche le contexte (branche git + statut, version du runtime du dossier, durée de la commande). Conf unique `~/.config/starship.toml`.

- Clés : `starship preset nerd-font-symbols -o ~/.config/starship.toml` (appliquer un preset), `starship explain` (détaille ce que le prompt affiche ici), `starship preset -l` (lister les presets).
- Ex. : `starship preset gruvbox-rainbow -o ~/.config/starship.toml` pour repartir d'une base stylée puis ajuster.

### Naviguer et lister

#### zoxide

- `cd` qui apprend tes dossiers fréquents et y saute sur un bout de nom
	--> aliasé sur `cd`

- Clés : `z partiel` (saute au meilleur match), `zi` (sélection interactive via fzf quand plusieurs candidats), `zoxide query partiel` (voir où ça irait sans bouger).
- Ex. : `z olis` saute direct dans `Code/olis-lab/` depuis n'importe où.

#### lsd

- `ls` avec icônes par type de fichier, couleurs, et arbre
	--> aliasé sur `ls`

- Clés : `lsd -la` (tout + détails), `lsd --tree --depth 2` (arborescence limitée), `lsd -l --total-size` (taille cumulée des dossiers).
- Ex. : `lsd --tree --depth 2` pour voir la structure d'un projet d'un coup d'oeil.

#### fd

- recherche de **fichiers**, rapide, syntaxe intuitive, respecte le `.gitignore` par défaut.

- Clés : `fd motif` (par nom), `fd -e md` (par extension), `fd -H` (inclure les cachés), `fd -t d` (dossiers seulement), `fd motif -x commande` (exécuter sur chaque résultat).
- Ex. : `fd -e ts src` liste tous les `.ts` sous `src/` ; `fd -e png -x optipng` optimise chaque PNG trouvé.

### Lire et chercher

#### bat

- `cat` avec coloration syntaxique, numéros de ligne, et pager intégré. Aliasé sur `cat`.

- Clés : `bat fichier`, `bat -A` (montre espaces/tabs/caractères invisibles), `bat -l json fichier` (forcer le langage si l'extension ment), `bat --list-themes`.
- Ex. : `git show HEAD | bat -l diff` colore un diff ; sert aussi de pager pour les previews fzf.

#### rg (ripgrep)

- recherche de **contenu** récursive, très rapide, respecte le `.gitignore`.

- Clés : `rg motif`, `rg -i` (insensible à la casse), `rg -l motif` (juste les fichiers), `rg -t ts motif` (filtrer par type), `rg -A 3 -B 3 motif` (3 lignes de contexte autour), `rg -w` (mot entier).
- Ex. : `rg -t ts "useTradingPlan"` trouve tous les usages dans le TS ; `rg -l TODO` liste les fichiers qui en contiennent.

#### fzf

- fuzzy finder générique : filtre interactivement n'importe quelle liste passée en entrée. Câblé dans fish (voir plus bas).

- Clés : `commande | fzf` (filtrer la sortie), `fzf --preview 'bat {}'` (aperçu du fichier survolé), `--multi` (sélection multiple avec Tab).
- Ex. : `zed (fzf)` ouvre dans Zed le fichier choisi à la volée ; `git branch | fzf` pour piocher une branche.

#### tldr (tealdeer)

- pages d'aide condensées en **exemples** concrets, au lieu du `man` exhaustif. Implémentation Rust (tealdeer), commande `tldr`.

- Clés : `tldr commande` (les exemples clés), `tldr --update` (rafraîchir le cache, à faire au premier lancement), `tldr -l` (lister les pages dispo).
- Ex. : `tldr tar` rappelle les invocations utiles de tar sans lire 200 lignes de man.

### Système et réseau

#### btop

- moniteur système live (CPU, RAM, réseau, disques, process) en TUI. Conf `~/.config/btop/btop.conf`, thème dracula bundlé avec le binaire.

- Clés : lancer `btop` ; dans la TUI : `m` (focus mémoire), `p` (changer de preset de layout), `+`/`-` (intervalle de refresh), `q` ou `Esc` (quitter).
- Ex. : `btop` quand un build fait chauffer le ventilo, pour voir quel process mange le CPU.

#### xh

- client HTTP en ligne de commande lisible (style HTTPie), sortie colorée, JSON par défaut.

- Clés : `xh GET url`, `xh POST url cle=valeur` (corps JSON), `xh url cle==valeur` (query string), `xh -h url` (headers seuls), `xh :3000/api` (raccourci localhost).
- Ex. : `xh POST httpbin.org/post name=remy` envoie `{"name":"remy"}` et affiche la réponse colorée.

### Env, runtimes, dotfiles

#### mise

- gère les runtimes (node, python, etc.), variables d'env et tâches, par dossier. Remplace nvm/rbenv/asdf. **Ne lit PAS `.nvmrc`**, utilise `.mise.toml`. Active automatiquement le bon runtime au `cd`.

- Clés : `mise use node@20` (installe + épingle dans le `.mise.toml` local), `mise use -g node@lts` (version globale), `mise ls` (ce qui est installé/actif), `mise run tache`, `mise exec -- node -v`.
- Ex. : `mise use node@20` dans un repo écrit `.mise.toml` ; en y entrant, mise bascule sur Node 20 tout seul.

#### chezmoi

- gère les dotfiles, versionnés sur git et reproductibles sur une autre machine. Source de vérité = repo privé `remyShift/dotfiles`.

- Clés : `chezmoi add ~/.config/fish/config.fish` (suivre un fichier), `chezmoi re-add` (ré-importer les fichiers suivis modifiés en local), `chezmoi diff` (voir l'écart), `chezmoi apply` (appliquer la source vers le home), `chezmoi cd` (aller dans le repo source), `chezmoi update` (pull + apply).
- Ex. : boucle type après avoir modifié une conf :
	- `chezmoi re-add`
	- `chezmoi git -- add -A`
	- `chezmoi git -- commit -m "fish: alias"`
	- `chezmoi git -- push`.

### Scripts et démarrage

#### gum

- briques pour rendre des scripts shell interactifs (Charm). Le coeur des helpers git maison.

- Clés : `gum choose a b c` (menu), `gum confirm "texte"` (oui/non, code retour), `gum input --placeholder "…"` (saisie), `gum filter` (filtre fuzzy sur stdin), `gum spin -- commande` (spinner), `gum style` (encadrés stylés).
- Ex. : `gum confirm "Push ?" && git push` ; `gum choose feat fix chore` pour piocher un type de commit (utilisé par `gcim`).

#### splashboard

- splash screen de terminal customisable. Conf dans `~/.splashboard/`, thème `synthwave_84` dans `settings.toml`. Deux dashboards perso versionnés sous chezmoi : `home.dashboard.toml` (date figlet, citation, countdown Corée, world clock perso Montréal/Brésil/Portugal/Paris/Séoul, météo Lyon/Séoul, calendrier, système, Hacker News) et `project.dashboard.toml` (dans un repo git : nom du repo, git live status/commits/tag, mes PRs + reviews GitHub, analytics code LOC/commentaires/fichiers/churn/TODOs).

- **Tout statique, par choix.** Dès qu'un seul widget est animé, splashboard gèle le terminal pendant une `ANIMATION_WINDOW` de **2s codée en dur** (aucun réglage pour la raccourcir ; `duration_ms` ne change que la vitesse de l'anim, pas le blocage). Donc hero en `text_ascii` (figlet `ansi_shadow` statique) et citation en `text_plain` : rendu instantané, on récupère la main tout de suite.
- **Citation mono-ligne.** `random_quote` sort la citation d'un seul tenant et splashboard n'a aucun word-wrap (grep `wrap` sur tout le catalog = vide) : pas moyen de la passer sur 2 lignes. Affichée pleine largeur (`width = { fill = 1 }`) + `align = "center"`.
- **Hook cd en `--on-cd`.** splashboard ne reconnaît un repo qu'à sa **racine** ; `splashboard` nu lancé dans un sous-dossier retombe sur le dashboard home (parasite). Avec `--on-cd` : splash project à la racine d'un repo, **silencieux** dans les sous-dossiers et hors-repo. Le splash home n'apparaît plus qu'au lancement d'un shell (via `fish_greeting`).

- Clés : `splashboard catalog fetcher|renderer <nom>` (doc + options exactes d'un widget, fait autorité), `splashboard watch` (plein écran live), `splashboard cache list|clear` (cache disque, TTL par widget). Hook fish : `__splashboard_run` dans `config.fish` (démarrage via `fish_greeting`, cd via `--on-variable PWD` + `--on-cd`).

## Câblage fish

- `config.fish` + `conf.d/aliases.fish` + `conf.d/gum.fish`.
- **fzf** câblé : `Ctrl+R` (historique) et `Ctrl+T` (fichiers) avec previews bat/lsd. `Alt+C` (saut de dossier) dormant sur Mac car Ghostty réserve Option aux accents → zoxide (`cd`) couvre le besoin.
- **Helpers git** : `gco` / `gbd` basculés en **fzf** (avec preview du log) ; `gadd` (multi-select) et `gcim` (input) restent en **gum**.

## Alias et fonctions maison

Alias dans `conf.d/aliases.fish`, fonctions git dans `conf.d/gum.fish`. Chargés automatiquement (tout `.fish` de `conf.d/` est sourcé par fish).

### Alias

| Alias          | Étend vers                   | Note                                                                     |
| -------------- | ---------------------------- | ------------------------------------------------------------------------ |
| `cat`          | `bat --plain --paging=never` | rend le comportement de cat (pas de pager, pas de déco)                  |
| `ls`           | `lsd`                        |                                                                          |
| `l`            | `lsd -l`                     |                                                                          |
| `la`           | `lsd -a`                     |                                                                          |
| `lla`          | `lsd -la`                    |                                                                          |
| `lt`           | `lsd --tree`                 |                                                                          |
| `find`         | `fd`                         | ⚠ fd n'a PAS la syntaxe de find, c'est juste le nom qui est repris       |
| `code`         | `zed`                        | ouvre dans Zed                                                           |
| `cd`           | `zoxide`                     | via `zoxide init --cmd cd` (pas un alias classique, le saut intelligent) |
| `gcd` *(abbr)* | `git checkout develop`       | abréviation : s'étend en toutes lettres quand tu tapes                   |
|                |                              |                                                                          |

**TODO :** 
- add `gg` aliases check zsh aliases cf [Oh-My-Zsh Git - Dash Cheat Sheets - Kapeli](https://kapeli.com/cheat_sheets/Oh-My-Zsh_Git.docset/Contents/Resources/Documents/index)
- add other alisases. 

`rg` et `xh` ne sont volontairement pas aliasés, tu les tapes tels quels.

### Fonctions git interactives

- **`gco`** - switch de branche : liste les branches locales dans **fzf** avec preview du `git log -20`, puis `git switch`.
- **`gbd`** - supprime une branche locale : même sélecteur **fzf** + preview, puis `git branch -d`.
- **`gadd`** - stage des fichiers : multi-sélection **gum** sur `git status --short`, puis `git add`.
- **`gcim`** - commit : saisit le message dans un champ `gum input`, puis `git commit -m`.

Logique de répartition : **fzf** pour choisir dans une liste (`gco`/`gbd`), **gum** pour le multi-select (`gadd`) et la saisie texte (`gcim`).
