---
tags:
  - Korea
---

Comparaison du prix d'un Mac **France vs Corée** (achat sur place taxé, puis

dédouanement à l'entrée en France). Trois sheets indépendantes ci-dessous, chacune

avec son graph qui se trace tout seul. À chaque relevé, je remplis **les trois** d'un

coup (une ligne par table), sinon les courbes divergent.

---

## 1. Taux de change (₩/€)

<!-- CURRENCY:START -->

| Date | FX (₩/€) |
| --- | --- |
| 30-06-2026 | 1 760,80 |
| 01-07-2026 | 1 767,08 |

<!-- CURRENCY:END -->

```dataviewjs
{
  // Graph du taux de change ₩/€.
  const raw = await dv.io.load(dv.current().file.path);
  const block = raw.split("CURRENCY:START")[1]?.split("CURRENCY:END")[0] ?? "";
  const lines = block.split("\n").map(l => l.trim()).filter(l => l.startsWith("|"));
  const data = lines.slice(2);

  const toNum = s => Number(String(s).replace(/[€₩\s]/g, "").replace(",", "."));
  const sortKey = s => String(s).split("-").reverse().join("-"); // DD-MM-YYYY -> YYYY-MM-DD

  const rows = data.map(line => {
    const c = line.split("|").map(x => x.trim());
    if (c[0] === "") c.shift();
    if (c[c.length - 1] === "") c.pop();
    return { date: c[0], fx: toNum(c[1]) };
  }).filter(r => r.date && !isNaN(r.fx)).sort((a, b) => sortKey(a.date).localeCompare(sortKey(b.date)));

  if (!rows.length) {
    dv.paragraph("Aucune ligne trouvée entre les marqueurs `CURRENCY`.");
  } else if (typeof window.renderChart !== "function") {
    dv.paragraph("⚠️ Plugin **Charts** (obsidian-charts) non installé ou désactivé : pas de graphe.");
  } else {
    window.renderChart({
      type: "line",
      data: {
        labels: rows.map(r => r.date),
        datasets: [
          { label: "Taux ₩/€", data: rows.map(r => r.fx), borderColor: "#c678dd", backgroundColor: "#c678dd", tension: 0.2 },
        ],
      },
      options: { scales: { y: { title: { display: true, text: "₩ pour 1 €" } } } },
    }, this.container);
  }
}
```

---

## 2. Prix du Mac : Corée vs France

Prix de référence en France, prix taxé sur place en Corée (TVA coréenne incluse,

= `P_kr / FX`), et prix réel une fois rapatrié par la voie légale (dédouanement + TVA FR).

<!-- MAC:START -->

| Date | Prix FR € | Corée taxé € | Corée → FR légal € |
| --- | --- | --- | --- |
| 30-06-2026 | 4 224,00 € | 3 558,04 € | 3 970,77 € |
| 01-07-2026 | 4 224,00 € | 3 545,40 € | 3 956,66 € |

<!-- MAC:END -->

```dataviewjs
{
  // Graph prix Mac : France vs Corée (taxé sur place + rapatrié légal).
  const raw = await dv.io.load(dv.current().file.path);
  const block = raw.split("MAC:START")[1]?.split("MAC:END")[0] ?? "";
  const lines = block.split("\n").map(l => l.trim()).filter(l => l.startsWith("|"));
  const data = lines.slice(2);

  const toNum = s => Number(String(s).replace(/[€₩\s]/g, "").replace(",", "."));
  const sortKey = s => String(s).split("-").reverse().join("-"); // DD-MM-YYYY -> YYYY-MM-DD

  const rows = data.map(line => {
    const c = line.split("|").map(x => x.trim());
    if (c[0] === "") c.shift();
    if (c[c.length - 1] === "") c.pop();
    return { date: c[0], fr: toNum(c[1]), taxe: toNum(c[2]), legal: toNum(c[3]) };
  }).filter(r => r.date && !isNaN(r.fr)).sort((a, b) => sortKey(a.date).localeCompare(sortKey(b.date)));

  if (!rows.length) {
    dv.paragraph("Aucune ligne trouvée entre les marqueurs `MAC`.");
  } else if (typeof window.renderChart !== "function") {
    dv.paragraph("⚠️ Plugin **Charts** (obsidian-charts) non installé ou désactivé : pas de graphe.");
  } else {
    window.renderChart({
      type: "line",
      data: {
        labels: rows.map(r => r.date),
        datasets: [
          { label: "Prix France (€)", data: rows.map(r => r.fr), borderColor: "#e06c75", backgroundColor: "#e06c75", tension: 0.2 },
          { label: "Corée taxé (TVA incl.) (€)", data: rows.map(r => r.taxe), borderColor: "#e5c07b", backgroundColor: "#e5c07b", tension: 0.2 },
          { label: "Corée → FR légal (€)", data: rows.map(r => r.legal), borderColor: "#61afef", backgroundColor: "#61afef", tension: 0.2 },
        ],
      },
      options: { scales: { y: { title: { display: true, text: "€" } } } },
    }, this.container);
  }
}
```

---

## 3. Voie légale vs sans contrôle

Coût du rapatriement selon qu'on dédouane (voie légale, avec contrôle) ou pas

(sans déclaration). Les deltas = **économie par rapport à l'achat en France**

(Δ = Prix FR - prix rapatrié), à mettre en face du risque pour la voie sans contrôle.

<!-- VOIE:START -->

| Date | Corée → FR légal € | Corée → FR sans douane € | Δ légal € | Δ sans douane € |
| --- | --- | --- | --- | --- |
| 30-06-2026 | 3 970,77 € | 3 308,98 € | 253,23 € | 915,02 € |
| 01-07-2026 | 3 956,66 € | 3 297,22 € | 267,34 € | 926,78 € |

<!-- VOIE:END -->

```dataviewjs
{
  // Graph 1 : coût rapatrié, voie légale vs sans contrôle.
  const raw = await dv.io.load(dv.current().file.path);
  const block = raw.split("VOIE:START")[1]?.split("VOIE:END")[0] ?? "";
  const lines = block.split("\n").map(l => l.trim()).filter(l => l.startsWith("|"));
  const data = lines.slice(2);

  const toNum = s => Number(String(s).replace(/[€₩\s]/g, "").replace(",", "."));
  const sortKey = s => String(s).split("-").reverse().join("-"); // DD-MM-YYYY -> YYYY-MM-DD

  const rows = data.map(line => {
    const c = line.split("|").map(x => x.trim());
    if (c[0] === "") c.shift();
    if (c[c.length - 1] === "") c.pop();
    return { date: c[0], legal: toNum(c[1]), sans: toNum(c[2]) };
  }).filter(r => r.date && !isNaN(r.legal)).sort((a, b) => sortKey(a.date).localeCompare(sortKey(b.date)));

  if (!rows.length) {
    dv.paragraph("Aucune ligne trouvée entre les marqueurs `VOIE`.");
  } else if (typeof window.renderChart !== "function") {
    dv.paragraph("⚠️ Plugin **Charts** (obsidian-charts) non installé ou désactivé : pas de graphe.");
  } else {
    window.renderChart({
      type: "line",
      data: {
        labels: rows.map(r => r.date),
        datasets: [
          { label: "Corée → FR légal (€)", data: rows.map(r => r.legal), borderColor: "#61afef", backgroundColor: "#61afef", tension: 0.2 },
          { label: "Corée → FR sans douane (€)", data: rows.map(r => r.sans), borderColor: "#98c379", backgroundColor: "#98c379", tension: 0.2 },
        ],
      },
      options: { scales: { y: { title: { display: true, text: "€" } } } },
    }, this.container);
  }
}
```

```dataviewjs
{
  // Graph 2 : économie vs achat en France (les deltas).
  const raw = await dv.io.load(dv.current().file.path);
  const block = raw.split("VOIE:START")[1]?.split("VOIE:END")[0] ?? "";
  const lines = block.split("\n").map(l => l.trim()).filter(l => l.startsWith("|"));
  const data = lines.slice(2);

  const toNum = s => Number(String(s).replace(/[€₩\s]/g, "").replace(",", "."));
  const sortKey = s => String(s).split("-").reverse().join("-"); // DD-MM-YYYY -> YYYY-MM-DD

  const rows = data.map(line => {
    const c = line.split("|").map(x => x.trim());
    if (c[0] === "") c.shift();
    if (c[c.length - 1] === "") c.pop();
    return { date: c[0], dLegal: toNum(c[3]), dSans: toNum(c[4]) };
  }).filter(r => r.date && !isNaN(r.dLegal)).sort((a, b) => sortKey(a.date).localeCompare(sortKey(b.date)));

  if (!rows.length) {
    dv.paragraph("Aucune ligne trouvée entre les marqueurs `VOIE`.");
  } else if (typeof window.renderChart !== "function") {
    dv.paragraph("⚠️ Plugin **Charts** (obsidian-charts) non installé ou désactivé : pas de graphe.");
  } else {
    window.renderChart({
      type: "line",
      data: {
        labels: rows.map(r => r.date),
        datasets: [
          { label: "Δ légal vs France (€)", data: rows.map(r => r.dLegal), borderColor: "#61afef", backgroundColor: "#61afef", tension: 0.2 },
          { label: "Δ sans douane vs France (€)", data: rows.map(r => r.dSans), borderColor: "#98c379", backgroundColor: "#98c379", tension: 0.2 },
        ],
      },
      options: { scales: { y: { title: { display: true, text: "€ économisés" } } } },
    }, this.container);
  }
}
```
