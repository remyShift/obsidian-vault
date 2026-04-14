---
date: 2026-02-06
type: meeting
projet: Oli's Lab
tags:
  - debugging
  - react
  - performance
  - useeffect
  - profiler
  - olis-lab
participants:
  - Diego
  - Patrick
  - Lucas
  - Michele
  - Remy
notion:
---

# Huddle : Debugging - Infinite Loop au Checkout

---

## Contexte

Diego fait une session de debugging en live pour résoudre un bug critique : le checkout freeze après avoir ajouté deux produits au bag depuis des pages différentes. Occasion d'enseigner la méthodologie de debugging React avec le Profiler.

---

## Bug reproductible

### Étapes pour reproduire
1. Ajouter un produit au bag depuis une page produit
2. Aller au bag, cliquer "Proceed to checkout"
3. Retourner sur la homepage
4. Ajouter un autre produit au bag
5. Aller au bag, cliquer "Proceed to checkout" → **freeze, CPU spike, pas d'erreur console**

### Symptômes
- Page qui freeze
- CPU qui spike (visible à la voix de Diego qui lagge pendant le partage d'écran)
- Requêtes en attente mais jamais résolues
- Aucune erreur dans la console

---

## Méthodologie de debugging React (par Diego)

### Étape 1 : React DevTools Profiler

Outil natif si React DevTools est installé. Pas besoin d'installer quoi que ce soit en plus.

**Comment l'utiliser :**
1. Ouvrir React DevTools → onglet "Profiler"
2. Cliquer "Record"
3. Reproduire le bug
4. Stopper le recording
5. Analyser

**Ce qu'on lit :**
- **Nombre de cycles** : idéalement < 20-30 pour une app stable. L'app Oli's Lab tourne autour de 60-80 cycles au normal (dette technique). Plus de 1500 → infinite loop.
- **Flame graph** : montre quels composants ont rendu, à quelle fréquence, dans quel ordre
- **Ranked chart** : trie les composants par temps de render

**Astuce visuelle :** dans l'onglet "Components" → "Highlight updates when components render". Les composants qui re-render s'affichent avec un highlight coloré en temps réel (bleu = rare, rouge = très fréquent).

### Étape 2 : identifier le composant coupable

Diego a trouvé que `CustomButton` apparaissait dans des dizaines de cycles. Pas un bug dans CustomButton lui-même, mais un signal : ce composant est re-rendu très souvent, donc son parent l'est aussi.

En remontant l'arbre :
```
CustomButton
→ RelayPointOverlay
→ RelayPointTabs
→ AnimatedRelayPointSection
→ ShippingServicesSection
→ LandingPage ← coupable
```

### Étape 3 : commenter pour confirmer

Diego a commenté le `useEffect` suspecté dans `LandingPage` → le freeze a disparu. Confirmation : c'est bien là que ça se passe.

---

## Cause racine : `useEffect` avec dépendance instable

### Le code problématique
```ts
const [providersAvailable, setProvidersAvailable] = useState([])

useEffect(() => {
  checkProviderAvailability()
  // ...met à jour providersAvailable
}, [providersAvailable]) // ← problème ici
```

### Pourquoi ça boucle
1. Au premier render : `providersAvailable = []`
2. L'effect se déclenche → `checkProviderAvailability()` → met à jour `providersAvailable`
3. `providersAvailable` a changé → l'effect se redéclenche
4. → nouvelle mise à jour → redéclenchement → infinite loop

**Note :** même si le contenu du tableau ne change pas, React compare les arrays par référence. Un nouveau tableau `[]` est toujours différent d'un autre `[]` → l'effect se redéclenche.

### Fix appliqué
```ts
useEffect(() => {
  checkProviderAvailability()
}, [providersAvailable.length]) // ← dépendance stable (number, pas array)
```

Ou plus simplement : si ce comportement ne doit s'exécuter qu'au mount :
```ts
useEffect(() => {
  checkProviderAvailability()
}, []) // ← mount only
```

ESLint se plaignait sur la dépendance manquante → Diego explique : lire ce que ESLint suggère. Parfois c'est exactement ce qui permet de trouver la bonne dépendance (il suggérait `.length`).

---

## Règles rappelées par Diego

1. **`useEffect` = danger potentiel.** Être hyper intentionnel sur les dépendances.
2. **Chaque dépendance d'un `useEffect` doit être stable.** Éviter les objects, arrays ou fonctions créés inline dans le composant comme dépendances (référence qui change à chaque render).
3. **Suivre les règles ESLint React Hooks.** Si ESLint se plaint d'une dépendance manquante, le lire attentivement → souvent c'est un vrai problème, pas juste du bruit.
4. **Utiliser le Profiler régulièrement** pendant le développement, pas seulement pour débugger. Vérifier que les renders sont stables après chaque modification de `useEffect`.

---

## Actions

- [ ] **Diego** - Déployer le fix sur stage pour que Michele puisse QA
- [ ] **Équipe** - Utiliser le Profiler React DevTools lors de tout développement impliquant des `useEffect` avec des dépendances non triviales
