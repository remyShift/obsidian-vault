---
tags:
  - Korea
---

Comparaison du prix d'un Mac **France vs Corée** (achat sur place, détaxe touriste, puis dédouanement à l'entrée en France). Source de vérité : `mac-prix-data.csv` (même dossier). Pour ajouter un relevé, **ajoute une ligne au CSV**, les tableaux et le graphe ci-dessous se mettent à jour seuls.

Colonnes du CSV : `date,P_fr,P_kr,fx,kr_eur,kr_detax,coree_legale,coree_sans,delta_legal,gain_fraude,alertes`

## Évolution dans le temps

```dataviewjs
const rows = (await dv.io.csv("mac-prix-data.csv", dv.current().file.path))
  .map(r => ({
    date: String(r.date),
    P_fr: Number(r.P_fr),
    P_kr: Number(r.P_kr),
    fx: Number(r.fx),
    kr_eur: Number(r.kr_eur),
    coree_legale: Number(r.coree_legale),
    delta_legal: Number(r.delta_legal),
  }))
  .sort(r => r.date, "asc")
  .array();

if (!rows.length) { dv.paragraph("Aucune donnée dans `mac-prix-data.csv`."); }
else {
  const eur = v => v.toLocaleString("fr-FR", {minimumFractionDigits: 2, maximumFractionDigits: 2}) + " €";
  const won = v => v.toLocaleString("fr-FR") + " ₩";
  const num = v => v.toLocaleString("fr-FR", {minimumFractionDigits: 2, maximumFractionDigits: 2});

  // --- Graphe SVG : Prix FR vs coût légal importé (les deux en €) ---
  const W = 640, H = 280, M = 48;
  const series = [
    {key: "P_fr", label: "Prix France", color: "#e06c75"},
    {key: "coree_legale", label: "Corée → FR (légal)", color: "#61afef"},
  ];
  const vals = rows.flatMap(r => series.map(s => r[s.key]));
  let lo = Math.min(...vals), hi = Math.max(...vals);
  const pad = (hi - lo) * 0.15 || 100;
  lo -= pad; hi += pad;
  const n = rows.length;
  const X = i => n === 1 ? W / 2 : M + i * (W - 2 * M) / (n - 1);
  const Y = v => (H - M) - (v - lo) / (hi - lo) * (H - 2 * M);

  const grid = [0, 0.25, 0.5, 0.75, 1].map(t => {
    const v = lo + t * (hi - lo), y = Y(v);
    return `<line x1="${M}" y1="${y}" x2="${W - M}" y2="${y}" stroke="var(--background-modifier-border)" stroke-width="1"/>
            <text x="${M - 6}" y="${y + 4}" text-anchor="end" font-size="10" fill="var(--text-muted)">${Math.round(v)}</text>`;
  }).join("");

  const xlabels = rows.map((r, i) =>
    `<text x="${X(i)}" y="${H - M + 18}" text-anchor="middle" font-size="10" fill="var(--text-muted)">${r.date.slice(5)}</text>`
  ).join("");

  const plot = series.map(s => {
    const pts = rows.map((r, i) => `${X(i)},${Y(r[s.key])}`).join(" ");
    const dots = rows.map((r, i) => `<circle cx="${X(i)}" cy="${Y(r[s.key])}" r="3.5" fill="${s.color}"/>`).join("");
    return `<polyline fill="none" stroke="${s.color}" stroke-width="2" points="${pts}"/>${dots}`;
  }).join("");

  const legend = series.map((s, i) =>
    `<g transform="translate(${M + i * 180},16)">
       <rect width="12" height="12" rx="2" fill="${s.color}"/>
       <text x="18" y="11" font-size="12" fill="var(--text-normal)">${s.label}</text>
     </g>`
  ).join("");

  dv.el("div", "").innerHTML =
    `<svg viewBox="0 0 ${W} ${H}" width="100%" style="max-width:680px">
       ${grid}${legend}${plot}${xlabels}
     </svg>`;

  // --- Tableau 1 : Comparaison ₩ ↔ € ---
  dv.header(3, "Comparaison ₩ ↔ €");
  dv.table(
    ["Date", "FX (₩/€)", "Corée €", "Corée → FR légal €", "Prix FR €", "Δ légal €"],
    rows.map(r => [r.date, num(r.fx), eur(r.kr_eur), eur(r.coree_legale), eur(r.P_fr), eur(r.delta_legal)])
  );

  // --- Tableau 2 : Prix français ---
  dv.header(3, "Prix français");
  dv.table(["Date", "Prix FR €"], rows.map(r => [r.date, eur(r.P_fr)]));

  // --- Tableau 3 : Prix coréen ---
  dv.header(3, "Prix coréen");
  dv.table(["Date", "Prix KR ₩"], rows.map(r => [r.date, won(r.P_kr)]));
}
```
