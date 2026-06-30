---
tags:
  - Korea
---

Comparaison du prix d'un Mac **France vs Corée** (achat sur place, détaxe touriste,
puis dédouanement à l'entrée en France). **Le tableau Source ci-dessous est la
vérité éditable** : tu y saisis seulement les valeurs brutes. Le tableau Dataview
et le graphe en dessous sont calculés et se mettent à jour seuls.

## Source (édite ici)

<!-- DATA:START -->

| Date | FX (₩/€) | Corée € | Corée → FR légal € | Corée → FR sans douane € | Prix FR € | Prix KR ₩ |
| --- | --- | --- | --- | --- | --- | --- |
| 2026-06-30 | 1760,80 | 3 558,04 € | 3 970,77 € | 3 308,98 € | 4 224,00 € | 6 265 000 ₩ |

<!-- DATA:END -->

## Tableau

```dataviewjs
// --- Lecture du tableau Source (seul endroit éditable) ---
const raw = await dv.io.load(dv.current().file.path);
const block = raw.split("DATA:START")[1]?.split("DATA:END")[0] ?? "";
const lines = block.split("\n").map(l => l.trim()).filter(l => l.startsWith("|"));
const data = lines.slice(2); // saute l'en-tête + la ligne de séparation

const toNum = s => Number(String(s).replace(/[€₩\s]/g, "").replace(",", "."));

const rows = data.map(line => {
  const c = line.split("|").map(x => x.trim());
  if (c[0] === "") c.shift();
  if (c[c.length - 1] === "") c.pop();
  const r = {
    date: c[0],
    fx: toNum(c[1]),
    kr_eur: toNum(c[2]),
    coree_legale: toNum(c[3]),
    coree_sans: toNum(c[4]),
    P_fr: toNum(c[5]),
    P_kr: toNum(c[6]),
  };
  r.delta_legal = r.P_fr - r.coree_legale; // économie import légal vs France
  r.delta_sans = r.P_fr - r.coree_sans;    // économie sans douane vs France
  return r;
}).filter(r => r.date && !isNaN(r.P_fr)).sort((a, b) => a.date.localeCompare(b.date));

const eur = v => v.toLocaleString("fr-FR", {minimumFractionDigits: 2, maximumFractionDigits: 2}) + " €";
const won = v => v.toLocaleString("fr-FR") + " ₩";
const fxf = v => v.toLocaleString("fr-FR", {minimumFractionDigits: 2, maximumFractionDigits: 2});

if (!rows.length) {
  dv.paragraph("Aucune ligne de données trouvée entre les marqueurs `DATA`.");
} else {
  dv.table(
    ["Date", "Prix FR", "Corée légal", "Δ légal", "Corée sans douane", "Δ sans douane", "FX ₩/€", "Prix KR"],
    rows.map(r => [r.date, eur(r.P_fr), eur(r.coree_legale), eur(r.delta_legal), eur(r.coree_sans), eur(r.delta_sans), fxf(r.fx), won(r.P_kr)])
  );

  if (typeof window.renderChart !== "function") {
    dv.paragraph("⚠️ Plugin **Charts** (obsidian-charts) non installé ou désactivé : pas de graphe.");
  } else {
    const chart = {
      type: "line",
      data: {
        labels: rows.map(r => r.date),
        datasets: [
          { label: "Prix France (€)", data: rows.map(r => r.P_fr), borderColor: "#e06c75", backgroundColor: "#e06c75", tension: 0.2 },
          { label: "Corée → FR légal (€)", data: rows.map(r => r.coree_legale), borderColor: "#61afef", backgroundColor: "#61afef", tension: 0.2 },
          { label: "Corée → FR sans douane (€)", data: rows.map(r => r.coree_sans), borderColor: "#98c379", backgroundColor: "#98c379", tension: 0.2 },
        ],
      },
      options: {
        scales: { y: { title: { display: true, text: "€" } } },
      },
    };
    window.renderChart(chart, this.container);
  }
}
```
