---
tags:
  - Korea
---

Comparaison du prix d'un Mac **France vs Corée** (achat sur place, détaxe touriste,

puis dédouanement à l'entrée en France). Le tableau ci-dessous est une simple sheet

que je remplis à chaque relevé que tu m'envoies. Le graphe en dessous se trace tout

seul à partir de ce tableau.

## Relevés

<!-- DATA:START -->

| Date | FX (₩/€) | Corée € | Corée → FR légal € | Δ légal € | Corée → FR sans douane € | Δ sans douane € | Prix FR € | Prix KR ₩ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-06-30 | 1760,80 | 3 558,04 € | 3 970,77 € | 253,23 € | 3 308,98 € | 915,02 € | 4 224,00 € | 6 265 000 ₩ |
| 2026-07-01 | 1 767,08 | 3 545,40 € | 3 956,66 € | 267,34 € | 3 297,22 € | 926,78 € | 4 224,00 € | 6 265 000 ₩ |

<!-- DATA:END -->

## Évolution dans le temps

```dataviewjs
// Lit la sheet ci-dessus et trace les 3 scénarios en €.
const raw = await dv.io.load(dv.current().file.path);
const block = raw.split("DATA:START")[1]?.split("DATA:END")[0] ?? "";
const lines = block.split("\n").map(l => l.trim()).filter(l => l.startsWith("|"));
const data = lines.slice(2); // saute en-tête + séparateur

const toNum = s => Number(String(s).replace(/[€₩\s]/g, "").replace(",", "."));

const rows = data.map(line => {
  const c = line.split("|").map(x => x.trim());
  if (c[0] === "") c.shift();
  if (c[c.length - 1] === "") c.pop();
  return {
    date: c[0],
    coree_legale: toNum(c[3]),
    coree_sans: toNum(c[5]),
    P_fr: toNum(c[7]),
  };
}).filter(r => r.date && !isNaN(r.P_fr)).sort((a, b) => a.date.localeCompare(b.date));

if (!rows.length) {
  dv.paragraph("Aucune ligne trouvée entre les marqueurs `DATA`.");
} else if (typeof window.renderChart !== "function") {
  dv.paragraph("⚠️ Plugin **Charts** (obsidian-charts) non installé ou désactivé : pas de graphe.");
} else {
  window.renderChart({
    type: "line",
    data: {
      labels: rows.map(r => r.date),
      datasets: [
        { label: "Prix France (€)", data: rows.map(r => r.P_fr), borderColor: "#e06c75", backgroundColor: "#e06c75", tension: 0.2 },
        { label: "Corée → FR légal (€)", data: rows.map(r => r.coree_legale), borderColor: "#61afef", backgroundColor: "#61afef", tension: 0.2 },
        { label: "Corée → FR sans douane (€)", data: rows.map(r => r.coree_sans), borderColor: "#98c379", backgroundColor: "#98c379", tension: 0.2 },
      ],
    },
    options: { scales: { y: { title: { display: true, text: "€" } } } },
  }, this.container);
}
```
