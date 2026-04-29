---
theme: default
title: "Développeur par obstination"
author: Rémy Shift
fonts:
  sans: Inter
  display: Bebas Neue
  mono: Fira Code
transition: slide-left
colorSchema: dark
aspectRatio: 16/9
canvasWidth: 980
---

<!-- ================================================
     SLIDE 1 — COVER
     ================================================ -->
---
layout: cover
background: ''
class: text-left
---

<div class="cover-frame">
  <div class="cover-door-left" />
  <div class="cover-door-right" />
</div>

<div class="cover-content" v-motion :initial="{ opacity: 0, y: 30 }" :enter="{ opacity: 1, y: 0, transition: { duration: 800 } }">
  <div class="cover-tag">REX — LyonCraft 2026</div>
  <h1 class="cover-title">Développeur<br>par obstination</h1>
  <div class="cover-sub">
    Ou comment les galères valent mieux que les filières
  </div>
  <div class="cover-speaker">Rémy Shift</div>
</div>

<style>
.cover-frame {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}
.cover-door-left,
.cover-door-right {
  position: absolute;
  bottom: -20px;
  width: 160px;
  height: 260px;
  border-radius: 50% 50% 0 0 / 20% 20% 0 0;
  border: 3px solid;
  opacity: 0.12;
}
.cover-door-left  { left: 40px;  border-color: #52b788; box-shadow: 0 0 40px rgba(82,183,136,0.2); }
.cover-door-right { right: 40px; border-color: #4895ef; box-shadow: 0 0 40px rgba(72,149,239,0.2); }
.cover-content { position: relative; z-index: 2; padding: 3rem; }
.cover-tag {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #4895ef;
  margin-bottom: 1.2rem;
}
.cover-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 6rem;
  line-height: 1.0;
  color: #ffffff;
  text-shadow: 0 0 80px rgba(72,149,239,0.25);
  margin: 0 0 1rem;
}
.cover-sub {
  font-family: 'Inter', sans-serif;
  font-size: 1.25rem;
  color: #8faac3;
  margin-bottom: 2.5rem;
  font-style: italic;
}
.cover-speaker {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.4rem;
  letter-spacing: 0.2em;
  color: #52b788;
}
</style>

<!--
Bienvenue. Je m'appelle Rémy Shift, et ce soir je vais vous raconter comment je suis passé de vendeur de surgelés porte à porte à développeur fullstack en production.
-->

<!-- ================================================
     SLIDE 2 — QUESTION D'ACCROCHE
     ================================================ -->
---
layout: center
---

<div class="hook-slide" v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, transition: { duration: 600 } }">
  <p class="hook-question">Comment passe-t-on de<br><strong>vendeur de surgelés porte à porte</strong><br>à<br><strong>dev fullstack en production</strong> ?</p>
</div>

<style>
.hook-slide { text-align: center; }
.hook-question {
  font-family: 'Bebas Neue', sans-serif !important;
  font-size: 3.2rem;
  line-height: 1.3;
  color: #e8f0fe;
}
.hook-question strong { color: #4895ef; }
</style>

<!-- ================================================
     SLIDE 3 — ANECDOTE COMMERCIALE
     ================================================ -->
---
layout: two-cols
---

::default::

<div class="anecdote-block" v-motion :initial="{ x: -30, opacity: 0 }" :enter="{ x: 0, opacity: 1, transition: { duration: 600 } }">
  <div class="anecdote-header">
    <span class="tag tag-blue">Mardi matin</span>
    <span class="anecdote-loc">Vaulx-en-Velin / Villeurbanne</span>
  </div>

  <ul class="anecdote-list">
    <li v-click>80 clients à voir. 36 commandes à ramener.</li>
    <li v-click>GPS qui foire. Adresses mal triées.</li>
    <li v-click>Refus qui s'enchaînent.</li>
    <li v-click>Rentre le soir éreinté, dégouté.<br><strong>10 commandes sur 36.</strong></li>
  </ul>
</div>

::right::

<div class="anecdote-door" v-motion :initial="{ x: 30, opacity: 0 }" :enter="{ x: 0, opacity: 1, transition: { delay: 200, duration: 600 } }">
  <div class="mini-door-closed">
    <div class="mini-door-body">
      <div class="mini-door-arch" />
      <div class="mini-door-window" />
      <div class="mini-door-handle" />
    </div>
    <div class="mini-door-shadow" />
  </div>
  <p class="anecdote-aside">La porte que personne<br>n'avait envie d'ouvrir.</p>
</div>

<style>
.anecdote-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; }
.anecdote-loc { font-size: 0.9rem; color: #8faac3; letter-spacing: 0.05em; }
.anecdote-list { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 0.8rem; }
.anecdote-list li { font-size: 1.15rem; line-height: 1.5; padding-left: 1.2rem; position: relative; }
.anecdote-list li::before { content: '▸'; color: #4895ef; position: absolute; left: 0; }
.anecdote-door { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; gap: 1.5rem; }
.mini-door-closed { position: relative; }
.mini-door-body {
  width: 120px; height: 180px;
  background: #1a2a4a;
  border-radius: 40% 40% 0 0 / 18% 18% 0 0;
  border: 2px solid #4895ef;
  position: relative;
  box-shadow: 0 0 30px rgba(72,149,239,0.2);
}
.mini-door-arch {
  position: absolute; top: 0; left: 0; right: 0; height: 50px;
  background: #243a5e;
  border-radius: 50% 50% 0 0 / 100% 100% 0 0;
}
.mini-door-window {
  position: absolute; top: 14px; left: 50%; transform: translateX(-50%);
  width: 32px; height: 32px; border-radius: 50%;
  background: #070d1a; border: 2px solid rgba(255,255,255,0.2);
}
.mini-door-handle {
  position: absolute; bottom: 28px; right: 14px;
  width: 12px; height: 20px;
  border-radius: 8px;
  background: rgba(255,255,255,0.2);
  border: 1px solid rgba(255,255,255,0.3);
}
.mini-door-shadow {
  height: 8px; width: 100px; margin: 0 auto;
  background: rgba(72,149,239,0.15);
  border-radius: 50%;
  filter: blur(4px);
}
.anecdote-aside { text-align: center; font-size: 0.9rem; color: #8faac3; font-style: italic; line-height: 1.5; }
</style>

<!--
Ce que je savais pas ce soir-là, c'est que cette journée m'apprenait quelque chose que je mettrais des années à formuler.
-->

<!-- ================================================
     SLIDE 4 — PIVOT / RÉVÉLATION
     ================================================ -->
---
layout: center
---

<div class="pivot-block" v-motion :initial="{ opacity: 0, scale: 0.95 }" :enter="{ opacity: 1, scale: 1, transition: { duration: 700 } }">
  <p class="pivot-text">
    Ce que je savais pas ce soir-là, c'est que cette journée m'apprenait quelque chose que je mettrais des <strong>années à formuler</strong> :
  </p>
  <p class="pivot-insight">
    Comment tenir quand rien ne marche.<br>
    Comment continuer à sonner quand t'as envie de rentrer chez toi.<br>
    Comment transformer une journée ratée en <strong>information utile</strong>.
  </p>
</div>

<style>
.pivot-block { max-width: 75%; text-align: center; }
.pivot-text { font-size: 1.2rem; color: #8faac3; margin-bottom: 2rem; line-height: 1.7; }
.pivot-text strong { color: #e8f0fe; }
.pivot-insight { font-family: 'Bebas Neue', sans-serif; font-size: 2.2rem; color: #ffffff; line-height: 1.3; }
.pivot-insight strong { color: #4895ef; }
</style>

<!-- ================================================
     SLIDE 5 — THÈSE
     ================================================ -->
---
layout: statement
---

<div v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { duration: 700 } }">

Ce qui m'a construit comme développeur,<br>
c'est **pas la formation** que j'ai suivie.

C'est tout ce que j'ai **traversé** avant, pendant, et autour.

</div>

<!-- ================================================
     SLIDE 6 — PLAN DU TALK
     ================================================ -->
---
layout: center
---

<h2 style="text-align:center; margin-bottom: 2.5rem;">Ce soir en 3 actes</h2>

<div class="plan-grid">
  <div v-click class="plan-item plan-green">
    <div class="plan-door" style="border-color: #52b788; box-shadow: 0 0 20px rgba(82,183,136,0.3)" />
    <div class="plan-text">
      <div class="plan-act">Acte 1</div>
      <div class="plan-label">Ce que la vente m'a appris<br>avant le code</div>
    </div>
  </div>
  <div v-click class="plan-item plan-blue">
    <div class="plan-door" style="border-color: #4895ef; box-shadow: 0 0 20px rgba(72,149,239,0.3)" />
    <div class="plan-text">
      <div class="plan-act">Acte 2</div>
      <div class="plan-label">Les portes fermées<br>comme moteur</div>
    </div>
  </div>
  <div v-click class="plan-item plan-red">
    <div class="plan-door" style="border-color: #e63946; box-shadow: 0 0 20px rgba(230,57,70,0.3)" />
    <div class="plan-text">
      <div class="plan-act">Acte 3</div>
      <div class="plan-label">Arriver en prod<br>sans filet</div>
    </div>
  </div>
</div>

<style>
.plan-grid { display: flex; gap: 2.5rem; justify-content: center; }
.plan-item { display: flex; align-items: center; gap: 1rem; }
.plan-door {
  width: 40px; height: 65px;
  border-radius: 40% 40% 0 0 / 20% 20% 0 0;
  border: 2px solid;
  flex-shrink: 0;
}
.plan-act { font-family: 'Bebas Neue', sans-serif; font-size: 0.9rem; letter-spacing: 0.2em; opacity: 0.6; margin-bottom: 0.2rem; }
.plan-label { font-size: 0.95rem; line-height: 1.4; color: #e8f0fe; }
.plan-green .plan-act { color: #52b788; }
.plan-blue  .plan-act { color: #4895ef; }
.plan-red   .plan-act { color: #e63946; }
</style>

<!-- ================================================
     SLIDE 7 — SECTION ACTE 1 (PORTE VERTE)
     ================================================ -->
---
layout: none
---

<Door
  color="#52b788"
  darkColor="#2d6a4f"
  number="ACTE 01"
  act="Acte 1"
  title="Ce que la vente m'a appris avant le code"
/>

<!-- ================================================
     SLIDE 8 — SETUP VENTE
     ================================================ -->
---
layout: default
---

<div class="setup-block">
  <div class="setup-header">
    <span class="tag tag-green">La vente porte à porte</span>
  </div>

  <div class="setup-body">
    <div v-click class="setup-line">Terrain difficile.</div>
    <div v-click class="setup-line">Inconnus. Refus constants.</div>
    <div v-click class="setup-line">Pas de filet.</div>
    <div v-click class="setup-quote">
      "Je ne savais pas ce qui m'attendait derrière chaque porte.<br>
      Je sonnais quand même."
    </div>
  </div>
</div>

<style>
.setup-block { padding: 1rem 2rem; }
.setup-header { margin-bottom: 2rem; }
.setup-body { display: flex; flex-direction: column; gap: 1rem; }
.setup-line {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 2.8rem;
  color: #ffffff;
  line-height: 1;
}
.setup-quote {
  margin-top: 1rem;
  padding: 1rem 1.5rem;
  border-left: 3px solid #52b788;
  font-size: 1.1rem;
  color: #8faac3;
  font-style: italic;
  line-height: 1.6;
}
</style>

<!-- ================================================
     SLIDE 9 — COMPÉTENCE 1
     ================================================ -->
---
layout: default
---

<div class="skill-slide">
  <div class="skill-number highlight-green">01</div>
  <h2>Définir le besoin avant d'agir</h2>

  <div class="skill-cols">
    <div class="skill-col">
      <div class="skill-context">En vente</div>
      <p>Pas de pitch sans comprendre ce que le client veut vraiment. Poser des questions d'abord.</p>
    </div>
    <div class="skill-arrow">→</div>
    <div v-click class="skill-col skill-col-code">
      <div class="skill-context">Chez Oli's Lab</div>
      <p>"C'est quoi l'objectif métier derrière cette feature ?"<br>"Pourquoi on fait ça comme ça et pas autrement ?"</p>
    </div>
  </div>
</div>

<style>
.skill-slide { padding: 1rem 2rem; }
.skill-number { font-family: 'Bebas Neue', sans-serif; font-size: 5rem; line-height: 1; opacity: 0.3; }
.skill-slide h2 { font-size: 2.6rem; margin: 0.2rem 0 1.5rem; }
.skill-cols { display: flex; align-items: center; gap: 1.5rem; }
.skill-col { flex: 1; background: rgba(255,255,255,0.04); border-radius: 8px; padding: 1.2rem; border: 1px solid rgba(255,255,255,0.08); }
.skill-col-code { border-color: rgba(82,183,136,0.3); background: rgba(82,183,136,0.05); }
.skill-context { font-family: 'Bebas Neue', sans-serif; font-size: 0.9rem; letter-spacing: 0.2em; color: #8faac3; margin-bottom: 0.5rem; }
.skill-col p { font-size: 1.05rem; line-height: 1.6; margin: 0; }
.skill-arrow { font-size: 2rem; color: #52b788; flex-shrink: 0; }
</style>

<!-- ================================================
     SLIDE 10 — COMPÉTENCE 2
     ================================================ -->
---
layout: default
---

<div class="skill-slide">
  <div class="skill-number highlight-green">02</div>
  <h2>Poser les bonnes questions vite</h2>

  <div class="skill-cols">
    <div class="skill-col">
      <div class="skill-context">En vente</div>
      <p>30 secondes pour qualifier un prospect. Aller à l'essentiel. Identifier les noeuds.</p>
    </div>
    <div class="skill-arrow">→</div>
    <div v-click class="skill-col skill-col-code">
      <div class="skill-context">Codebase legacy</div>
      <p>Peu de temps pour comprendre avant d'agir. Même réflexe : pas tout lire, trouver les points d'entrée.</p>
    </div>
  </div>
</div>

<style>
.skill-slide { padding: 1rem 2rem; }
.skill-number { font-family: 'Bebas Neue', sans-serif; font-size: 5rem; line-height: 1; opacity: 0.3; }
.skill-slide h2 { font-size: 2.6rem; margin: 0.2rem 0 1.5rem; }
.skill-cols { display: flex; align-items: center; gap: 1.5rem; }
.skill-col { flex: 1; background: rgba(255,255,255,0.04); border-radius: 8px; padding: 1.2rem; border: 1px solid rgba(255,255,255,0.08); }
.skill-col-code { border-color: rgba(82,183,136,0.3); background: rgba(82,183,136,0.05); }
.skill-context { font-family: 'Bebas Neue', sans-serif; font-size: 0.9rem; letter-spacing: 0.2em; color: #8faac3; margin-bottom: 0.5rem; }
.skill-col p { font-size: 1.05rem; line-height: 1.6; margin: 0; }
.skill-arrow { font-size: 2rem; color: #52b788; flex-shrink: 0; }
</style>

<!-- ================================================
     SLIDE 11 — COMPÉTENCE 3
     ================================================ -->
---
layout: default
---

<div class="skill-slide">
  <div class="skill-number highlight-green">03</div>
  <h2>Ne pas avoir peur de l'inconnu</h2>

  <div class="skill-cols">
    <div class="skill-col">
      <div class="skill-context">En vente</div>
      <p>Taper des portes d'inconnus, ça forge. Même taper celle de son voisin on a du mal au début.</p>
    </div>
    <div class="skill-arrow">→</div>
    <div v-click class="skill-col skill-col-code">
      <div class="skill-context">En prod</div>
      <p>Hériter d'une codebase sans tests, sans doc, sans filet... et ne pas paniquer.</p>
      <p v-click style="color: #52b788; margin-top: 0.5rem; font-weight: 600;">Ce n'est pas du courage, c'est de l'habitude.</p>
    </div>
  </div>
</div>

<style>
.skill-slide { padding: 1rem 2rem; }
.skill-number { font-family: 'Bebas Neue', sans-serif; font-size: 5rem; line-height: 1; opacity: 0.3; }
.skill-slide h2 { font-size: 2.6rem; margin: 0.2rem 0 1.5rem; }
.skill-cols { display: flex; align-items: center; gap: 1.5rem; }
.skill-col { flex: 1; background: rgba(255,255,255,0.04); border-radius: 8px; padding: 1.2rem; border: 1px solid rgba(255,255,255,0.08); }
.skill-col-code { border-color: rgba(82,183,136,0.3); background: rgba(82,183,136,0.05); }
.skill-context { font-family: 'Bebas Neue', sans-serif; font-size: 0.9rem; letter-spacing: 0.2em; color: #8faac3; margin-bottom: 0.5rem; }
.skill-col p { font-size: 1.05rem; line-height: 1.6; margin: 0; }
.skill-arrow { font-size: 2rem; color: #52b788; flex-shrink: 0; }
</style>

<!--
Transition : "Mais avant d'arriver là, il y a eu beaucoup de portes — et pas celles que j'avais choisies de frapper."
-->

<!-- ================================================
     SLIDE 12 — SECTION ACTE 2 (PORTE BLEUE)
     ================================================ -->
---
layout: none
---

<Door
  color="#4895ef"
  darkColor="#1e3a5f"
  number="ACTE 02"
  act="Acte 2"
  title="Les portes fermées comme moteur"
/>

<!-- ================================================
     SLIDE 13 — 42 PISCINE #1
     ================================================ -->
---
layout: default
---

<div class="sequence-block">
  <div class="sequence-badge" style="color: #4895ef;">Séquence 1</div>
  <h2>42 — Piscine #1</h2>

  <div class="sequence-timeline">
    <div v-click class="timeline-item">
      <div class="tl-dot" />
      <p>Déclic intellectuel immédiat. Je fais la piscine. J'accroche tout de suite.</p>
    </div>
    <div v-click class="timeline-item timeline-blocked">
      <div class="tl-dot tl-dot-red" />
      <p><strong>Refusé.</strong> Pas de feedback. Le vide.</p>
    </div>
    <div v-click class="timeline-item">
      <div class="tl-dot" />
      <p>Réponse : retourner vendre, mais apprendre le C en parallèle. Seul. Sans cours, sans cadre.</p>
    </div>
  </div>
</div>

<style>
.sequence-block { padding: 1rem 2rem; }
.sequence-badge { font-family: 'Bebas Neue', sans-serif; font-size: 0.9rem; letter-spacing: 0.25em; text-transform: uppercase; margin-bottom: 0.5rem; }
.sequence-block h2 { font-size: 2.8rem; margin: 0 0 1.5rem; }
.sequence-timeline { display: flex; flex-direction: column; gap: 1rem; padding-left: 1.5rem; border-left: 2px solid rgba(72,149,239,0.3); }
.timeline-item { display: flex; align-items: flex-start; gap: 1rem; padding: 0.8rem 1rem; border-radius: 6px; background: rgba(255,255,255,0.03); }
.timeline-blocked { background: rgba(230,57,70,0.05); border: 1px solid rgba(230,57,70,0.2); }
.tl-dot { width: 10px; height: 10px; border-radius: 50%; background: #4895ef; flex-shrink: 0; margin-top: 5px; }
.tl-dot-red { background: #e63946; box-shadow: 0 0 8px rgba(230,57,70,0.5); }
.timeline-item p { margin: 0; font-size: 1.05rem; line-height: 1.5; }
</style>

<!-- ================================================
     SLIDE 14 — 42 PISCINE #2
     ================================================ -->
---
layout: default
---

<div class="sequence-block">
  <div class="sequence-badge" style="color: #4895ef;">Séquence 1 — suite</div>
  <h2>42 — Piscine #2</h2>

  <div class="sequence-timeline">
    <div v-click class="timeline-item">
      <div class="tl-dot" />
      <p>Un an plus tard. Je suis meilleur, je le sais, je le sens. Plus rapide, plus structuré.</p>
    </div>
    <div v-click class="timeline-item timeline-blocked">
      <div class="tl-dot tl-dot-red" />
      <p><strong>Refusé à nouveau.</strong> Toujours sans feedback.</p>
    </div>
    <div v-click class="timeline-item timeline-insight">
      <div class="tl-dot tl-dot-gold" />
      <p>Vivre avec l'absence de réponse. Décider quand même de continuer.<br>
      <strong>Le blocage ne t'arrête pas — il te redirige.</strong></p>
    </div>
  </div>
</div>

<style>
.sequence-block { padding: 1rem 2rem; }
.sequence-badge { font-family: 'Bebas Neue', sans-serif; font-size: 0.9rem; letter-spacing: 0.25em; text-transform: uppercase; margin-bottom: 0.5rem; }
.sequence-block h2 { font-size: 2.8rem; margin: 0 0 1.5rem; }
.sequence-timeline { display: flex; flex-direction: column; gap: 1rem; padding-left: 1.5rem; border-left: 2px solid rgba(72,149,239,0.3); }
.timeline-item { display: flex; align-items: flex-start; gap: 1rem; padding: 0.8rem 1rem; border-radius: 6px; background: rgba(255,255,255,0.03); }
.timeline-blocked { background: rgba(230,57,70,0.05); border: 1px solid rgba(230,57,70,0.2); }
.timeline-insight { background: rgba(252,191,73,0.05); border: 1px solid rgba(252,191,73,0.2); }
.tl-dot { width: 10px; height: 10px; border-radius: 50%; background: #4895ef; flex-shrink: 0; margin-top: 5px; }
.tl-dot-red  { background: #e63946; box-shadow: 0 0 8px rgba(230,57,70,0.5); }
.tl-dot-gold { background: #fcbf49; box-shadow: 0 0 8px rgba(252,191,73,0.5); }
.timeline-item p { margin: 0; font-size: 1.05rem; line-height: 1.5; }
.timeline-item strong { color: #fcbf49; }
</style>

<!-- ================================================
     SLIDE 15 — STATEMENT PATTERN
     ================================================ -->
---
layout: statement
---

<div v-motion :initial="{ opacity: 0, scale: 0.9 }" :enter="{ opacity: 1, scale: 1, transition: { duration: 600 } }">

Le blocage **ne t'arrête pas**.

Il te **redirige**.

</div>

<!-- ================================================
     SLIDE 16 — ADA + 6 MOIS SOLO
     ================================================ -->
---
layout: default
---

<div class="sequence-block">
  <div class="sequence-badge" style="color: #4895ef;">Séquence 2</div>
  <h2>Ada Tech School + 6 mois seul</h2>

  <div class="sequence-timeline">
    <div v-click class="timeline-item">
      <div class="tl-dot" />
      <p>Ada Tech School. Bases web, JS, front, premiers projets. Découverte des <strong>Software Crafters Lyon</strong> — la qualité du code, les bonnes pratiques.</p>
    </div>
    <div v-click class="timeline-item timeline-blocked">
      <div class="tl-dot tl-dot-red" />
      <p>Décalage entre ce qui est affiché et ce qui est vécu. Départ d'un commun accord.<br><strong>Ce n'est pas un abandon. C'est une décision.</strong></p>
    </div>
    <div v-click class="timeline-item">
      <div class="tl-dot tl-dot-gold" />
      <p>6 mois seul. Boulot alimentaire en parallèle. TypeScript, React, Next.js. Portfolio. Je ne suis pas un cursus — je construis ma progression.</p>
    </div>
  </div>
</div>

<style>
.sequence-block { padding: 1rem 2rem; }
.sequence-badge { font-family: 'Bebas Neue', sans-serif; font-size: 0.9rem; letter-spacing: 0.25em; text-transform: uppercase; margin-bottom: 0.5rem; }
.sequence-block h2 { font-size: 2.8rem; margin: 0 0 1.5rem; }
.sequence-timeline { display: flex; flex-direction: column; gap: 0.8rem; padding-left: 1.5rem; border-left: 2px solid rgba(72,149,239,0.3); }
.timeline-item { display: flex; align-items: flex-start; gap: 1rem; padding: 0.8rem 1rem; border-radius: 6px; background: rgba(255,255,255,0.03); }
.timeline-blocked { background: rgba(230,57,70,0.05); border: 1px solid rgba(230,57,70,0.2); }
.tl-dot { width: 10px; height: 10px; border-radius: 50%; background: #4895ef; flex-shrink: 0; margin-top: 5px; }
.tl-dot-red  { background: #e63946; box-shadow: 0 0 8px rgba(230,57,70,0.5); }
.tl-dot-gold { background: #fcbf49; box-shadow: 0 0 8px rgba(252,191,73,0.5); }
.timeline-item p { margin: 0; font-size: 1.0rem; line-height: 1.5; }
.timeline-item strong { color: #ffffff; }
</style>

<!-- ================================================
     SLIDE 17 — LES LECTURES
     ================================================ -->
---
layout: two-cols
---

::default::

<div v-motion :initial="{ x: -20, opacity: 0 }" :enter="{ x: 0, opacity: 1 }">
  <div class="tag tag-blue" style="margin-bottom: 1.2rem;">Pendant ces 6 mois</div>
  <h2 style="font-size: 2.4rem; margin-bottom: 1.2rem;">Je construis<br>une culture technique</h2>
  <p style="color: #8faac3; font-style: italic; font-size: 1rem;">À l'époque je pensais juste survivre.<br>Avec le recul, je construisais quelque chose que personne ne m'aurait enseigné si j'avais suivi un parcours classique.</p>
</div>

::right::

<div class="books-list" v-motion :initial="{ x: 20, opacity: 0 }" :enter="{ x: 0, opacity: 1, transition: { delay: 200 } }">
  <div v-click class="book-item">
    <div class="book-spine" style="background: #52b788;" />
    <div>
      <div class="book-title">Software Craft</div>
      <div class="book-author">Cyril Martraire et al.</div>
    </div>
  </div>
  <div v-click class="book-item">
    <div class="book-spine" style="background: #e63946;" />
    <div>
      <div class="book-title">Clean Code</div>
      <div class="book-author">Robert C. Martin</div>
    </div>
  </div>
  <div v-click class="book-item">
    <div class="book-spine" style="background: #fcbf49;" />
    <div>
      <div class="book-title">Itération Product(ives)</div>
      <div class="book-author">Colin Damon</div>
    </div>
  </div>
</div>

<style>
.books-list { display: flex; flex-direction: column; gap: 1.2rem; justify-content: center; height: 100%; padding: 1rem; }
.book-item { display: flex; align-items: center; gap: 1rem; padding: 0.8rem 1rem; background: rgba(255,255,255,0.04); border-radius: 8px; border: 1px solid rgba(255,255,255,0.08); }
.book-spine { width: 6px; height: 50px; border-radius: 3px; flex-shrink: 0; }
.book-title { font-family: 'Bebas Neue', sans-serif; font-size: 1.3rem; color: #ffffff; }
.book-author { font-size: 0.85rem; color: #8faac3; margin-top: 0.2rem; }
</style>

<!-- ================================================
     SLIDE 18 — LE WAGON
     ================================================ -->
---
layout: default
---

<div class="sequence-block">
  <div class="sequence-badge" style="color: #4895ef;">Séquence 3</div>
  <h2>Le Wagon</h2>

  <div class="wagon-grid">
    <div v-click class="wagon-card">
      <div class="wagon-icon">⚡</div>
      <p>J'arrive avec une longueur d'avance. La logique de résolution, l'algorithmie, l'attention au code — déjà construits.</p>
    </div>
    <div v-click class="wagon-card">
      <div class="wagon-icon">🚂</div>
      <p>Le Wagon apporte Ruby + structure. La validation concrète d'une méthode.</p>
    </div>
    <div v-click class="wagon-card wagon-card-highlight">
      <div class="wagon-icon">🔥</div>
      <p><strong>L'autodidaxie n'est pas un palliatif. C'est une méthode.</strong></p>
    </div>
  </div>
</div>

<style>
.sequence-block { padding: 1rem 2rem; }
.sequence-badge { font-family: 'Bebas Neue', sans-serif; font-size: 0.9rem; letter-spacing: 0.25em; text-transform: uppercase; margin-bottom: 0.5rem; }
.sequence-block h2 { font-size: 2.8rem; margin: 0 0 1.5rem; }
.wagon-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.2rem; }
.wagon-card { padding: 1.2rem; background: rgba(255,255,255,0.04); border-radius: 10px; border: 1px solid rgba(255,255,255,0.08); }
.wagon-card-highlight { background: rgba(72,149,239,0.08); border-color: rgba(72,149,239,0.3); }
.wagon-icon { font-size: 1.8rem; margin-bottom: 0.8rem; }
.wagon-card p { margin: 0; font-size: 1rem; line-height: 1.6; }
.wagon-card strong { color: #4895ef; }
</style>

<!--
Transition : "Mais apprendre seul dans son coin, c'est une chose. Livrer en production, c'est une autre."
-->

<!-- ================================================
     SLIDE 19 — SECTION ACTE 3 (PORTE ROUGE)
     ================================================ -->
---
layout: none
---

<Door
  color="#e63946"
  darkColor="#9b2226"
  number="ACTE 03"
  act="Acte 3"
  title="Arriver en prod sans filet"
/>

<!-- ================================================
     SLIDE 20 — KICKSFOLIO
     ================================================ -->
---
layout: default
---

<div class="prod-block">
  <div class="tag tag-red" style="margin-bottom: 1rem;">KicksFolio</div>
  <h2>App mobile sneakers</h2>

  <div class="prod-grid">
    <div class="prod-desc">
      <p v-click>App mobile sneakers. Scanner un code-barres, gérer sa collection, la partager. Deux centres d'intérêt qui se rejoignent.</p>
      <p v-click>Je vais jusqu'au bout. <strong>Publiée sur les stores.</strong></p>
      <div v-click class="prod-quote">
        "KicksFolio m'a appris ce qu'aucun bootcamp n'enseigne : le coût réel d'aller jusqu'au bout."
      </div>
    </div>
    <div class="prod-visual">
      <!-- Placeholder : remplacer par <img src="./kicksfolio-screenshot.png" /> -->
      <div class="prod-placeholder">
        <div class="placeholder-phone">
          <div class="placeholder-screen">
            <div class="ph-status" />
            <div class="ph-line" style="width: 60%; background: #e63946;" />
            <div class="ph-line" style="width: 80%;" />
            <div class="ph-line" style="width: 45%;" />
            <div class="ph-grid">
              <div class="ph-card" /><div class="ph-card" />
              <div class="ph-card" /><div class="ph-card" />
            </div>
          </div>
        </div>
        <div class="placeholder-label">KicksFolio · App Store</div>
      </div>
    </div>
  </div>
</div>

<style>
.prod-block { padding: 1rem 2rem; }
.prod-block h2 { font-size: 2.6rem; margin: 0.2rem 0 1.5rem; }
.prod-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: center; }
.prod-desc p { font-size: 1.05rem; line-height: 1.6; margin-bottom: 0.8rem; }
.prod-desc strong { color: #ffffff; }
.prod-quote { padding: 1rem 1.2rem; border-left: 3px solid #e63946; font-style: italic; color: #8faac3; font-size: 1rem; line-height: 1.6; }
.prod-placeholder { display: flex; flex-direction: column; align-items: center; gap: 0.8rem; }
.placeholder-phone { width: 120px; height: 200px; background: #111d34; border-radius: 18px; border: 2px solid rgba(230,57,70,0.4); padding: 10px; box-shadow: 0 0 30px rgba(230,57,70,0.15); }
.placeholder-screen { height: 100%; display: flex; flex-direction: column; gap: 6px; }
.ph-status { height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; }
.ph-line { height: 8px; background: rgba(255,255,255,0.15); border-radius: 4px; }
.ph-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5px; flex: 1; margin-top: 4px; }
.ph-card { background: rgba(255,255,255,0.08); border-radius: 6px; }
.placeholder-label { font-size: 0.7rem; color: #8faac3; letter-spacing: 0.1em; }
</style>

<!-- ================================================
     SLIDE 21 — PÉRIODE CREUSE
     ================================================ -->
---
layout: default
---

<div class="creuse-block">
  <div class="tag tag-red" style="margin-bottom: 1rem;">La période creuse</div>
  <h2>6 mois. Des centaines de refus.</h2>

  <div class="creuse-content">
    <div v-click class="creuse-stat">
      <div class="stat-number highlight-red">6</div>
      <div class="stat-label">mois sans mission</div>
    </div>
    <div class="creuse-divider" />
    <div v-click class="creuse-text">
      <p>Pas bloqué sur la technique. Bloqué sur <strong>comment raconter le parcours atypique</strong> sans le défendre.</p>
      <p v-click>Comment se présenter quand on n'a pas le parcours qu'on attendait de toi ?</p>
    </div>
  </div>
</div>

<style>
.creuse-block { padding: 1rem 2rem; }
.creuse-block h2 { font-size: 2.6rem; margin: 0.2rem 0 1.5rem; }
.creuse-content { display: flex; align-items: center; gap: 2.5rem; }
.creuse-stat { text-align: center; flex-shrink: 0; }
.stat-number { font-family: 'Bebas Neue', sans-serif; font-size: 7rem; line-height: 1; }
.stat-label { font-size: 0.9rem; letter-spacing: 0.15em; text-transform: uppercase; color: #8faac3; }
.creuse-divider { width: 2px; height: 120px; background: rgba(230,57,70,0.3); flex-shrink: 0; }
.creuse-text p { font-size: 1.1rem; line-height: 1.7; margin-bottom: 0.8rem; }
.creuse-text strong { color: #ffffff; }
</style>

<!-- ================================================
     SLIDE 22 — STATEMENT SAVOIR SE VENDRE
     ================================================ -->
---
layout: statement
---

<div v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }">

Savoir **vendre**, c'est bien.

Savoir **se vendre**, c'est mieux.

</div>

<!-- ================================================
     SLIDE 23 — LE POST LINKEDIN
     ================================================ -->
---
layout: default
---

<div class="linkedin-block">
  <div class="tag tag-blue" style="margin-bottom: 1rem;">Le post LinkedIn</div>
  <h2>Demander de l'aide publiquement</h2>

  <div class="linkedin-grid">
    <div class="linkedin-post" v-click>
      <div class="lk-header">
        <div class="lk-avatar" />
        <div>
          <div class="lk-name">Rémy Shift</div>
          <div class="lk-subtitle">Dev en recherche de mission</div>
        </div>
      </div>
      <p class="lk-content">"6 mois de recherche, des centaines de candidatures. Je cherche des gens qui peuvent m'aider à me préparer pour des entretiens, me donner des retours francs..."</p>
    </div>

    <div class="linkedin-result" v-click>
      <div class="result-item"><span class="result-icon">📅</span> Agenda rempli en quelques jours</div>
      <div class="result-item"><span class="result-icon">👥</span> Plus d'une dizaine de personnes</div>
      <div class="result-item"><span class="result-icon">🎯</span> Simulations d'entretien, retours francs</div>
      <div v-click class="result-highlight">C'est ce post qui a tout débloqué.</div>
    </div>
  </div>
</div>

<style>
.linkedin-block { padding: 1rem 2rem; }
.linkedin-block h2 { font-size: 2.6rem; margin: 0.2rem 0 1.5rem; }
.linkedin-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: start; }
.linkedin-post { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 1.2rem; }
.lk-header { display: flex; align-items: center; gap: 0.8rem; margin-bottom: 0.8rem; }
.lk-avatar { width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, #4895ef, #52b788); }
.lk-name { font-weight: 600; font-size: 0.9rem; color: #ffffff; }
.lk-subtitle { font-size: 0.75rem; color: #8faac3; }
.lk-content { font-size: 0.9rem; line-height: 1.6; color: #c5d5e8; font-style: italic; margin: 0; }
.linkedin-result { display: flex; flex-direction: column; gap: 0.8rem; padding: 1rem 0; }
.result-item { display: flex; align-items: center; gap: 0.8rem; font-size: 1rem; color: #e8f0fe; }
.result-icon { font-size: 1.2rem; }
.result-highlight { margin-top: 0.5rem; padding: 0.8rem 1rem; background: rgba(72,149,239,0.1); border: 1px solid rgba(72,149,239,0.3); border-radius: 6px; font-style: italic; color: #4895ef; font-size: 1rem; }
</style>

<!-- ================================================
     SLIDE 24 — OLI'S LAB : LA BOUCLE
     ================================================ -->
---
layout: default
---

<div class="boucle-block">
  <div class="tag tag-red" style="margin-bottom: 1rem;">Oli's Lab</div>
  <h2>La boucle se ferme</h2>

  <div class="boucle-grid">
    <div v-click class="boucle-mission">
      <div class="bm-label">La mission</div>
      <ul>
        <li>Codebase legacy, sans tests, sans doc</li>
        <li>Migration Next.js prévue, pas commencée</li>
        <li>CMS Payload à construire de zéro — seul</li>
      </ul>
    </div>
    <div v-click class="boucle-arrow">
      <div class="ba-line" />
      <div class="ba-icon">↩</div>
    </div>
    <div v-click class="boucle-link">
      <div class="bm-label" style="color: #52b788;">Le lien</div>
      <p>Ne pas avoir peur de l'inconnu, appris en sonnant des portes = naviguer dans cette codebase sans paniquer.</p>
      <p v-click style="color: #52b788; font-style: italic;">Ce n'est pas du courage. C'est de l'habitude.</p>
    </div>
  </div>
</div>

<style>
.boucle-block { padding: 1rem 2rem; }
.boucle-block h2 { font-size: 2.6rem; margin: 0.2rem 0 1.5rem; }
.boucle-grid { display: grid; grid-template-columns: 1fr 60px 1fr; gap: 1rem; align-items: center; }
.boucle-mission { padding: 1.2rem; background: rgba(230,57,70,0.05); border: 1px solid rgba(230,57,70,0.2); border-radius: 10px; }
.bm-label { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.15em; font-size: 0.85rem; color: #e63946; margin-bottom: 0.8rem; }
.boucle-mission ul { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 0.5rem; }
.boucle-mission li { font-size: 0.95rem; padding-left: 1rem; position: relative; }
.boucle-mission li::before { content: '▸'; color: #e63946; position: absolute; left: 0; }
.boucle-arrow { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.3rem; }
.ba-line { width: 2px; height: 60px; background: linear-gradient(to bottom, rgba(230,57,70,0.4), rgba(82,183,136,0.4)); }
.ba-icon { font-size: 1.4rem; color: #8faac3; }
.boucle-link { padding: 1.2rem; background: rgba(82,183,136,0.05); border: 1px solid rgba(82,183,136,0.2); border-radius: 10px; }
.boucle-link p { font-size: 0.95rem; line-height: 1.6; margin-bottom: 0.5rem; }
</style>

<!-- ================================================
     SLIDE 25 — SECTION CONCLUSION (PORTE DORÉE)
     ================================================ -->
---
layout: none
---

<Door
  color="#fcbf49"
  darkColor="#f77f00"
  number="FIN"
  act="Conclusion"
  title="Ce qui nous forge en tant que développeur"
/>

<!-- ================================================
     SLIDE 26 — RECAP DES PATTERNS
     ================================================ -->
---
layout: center
---

<h2 style="text-align:center; margin-bottom: 2rem;">Le même pattern, trois fois</h2>

<div class="recap-list">
  <div v-click class="recap-item">
    <div class="recap-dot" style="background: #52b788;" />
    <div>
      <div class="recap-label">42 × 2</div>
      <div class="recap-text">Blocage → Apprendre le C seul → Continuer</div>
    </div>
  </div>
  <div v-click class="recap-item">
    <div class="recap-dot" style="background: #4895ef;" />
    <div>
      <div class="recap-label">Ada + 6 mois solo</div>
      <div class="recap-text">Décision → Stack autodidacte → Culture craft</div>
    </div>
  </div>
  <div v-click class="recap-item">
    <div class="recap-dot" style="background: #e63946;" />
    <div>
      <div class="recap-label">Le Wagon → Oli's Lab</div>
      <div class="recap-text">Validation → Prod → La boucle se ferme</div>
    </div>
  </div>
  <div v-click class="recap-conclusion">
    À chaque fois la même réponse : ne pas abandonner, creuser seul, progresser. Et à chaque fois une progression que <strong>personne ne m'aurait donnée autrement</strong>.
  </div>
</div>

<style>
.recap-list { display: flex; flex-direction: column; gap: 1.2rem; max-width: 700px; }
.recap-item { display: flex; align-items: center; gap: 1.2rem; padding: 0.9rem 1.2rem; background: rgba(255,255,255,0.04); border-radius: 8px; border: 1px solid rgba(255,255,255,0.08); }
.recap-dot { width: 12px; height: 12px; border-radius: 50%; flex-shrink: 0; }
.recap-label { font-family: 'Bebas Neue', sans-serif; font-size: 1.1rem; letter-spacing: 0.1em; color: #ffffff; }
.recap-text { font-size: 0.9rem; color: #8faac3; margin-top: 0.2rem; }
.recap-conclusion { padding: 1rem 1.2rem; background: rgba(252,191,73,0.06); border: 1px solid rgba(252,191,73,0.2); border-radius: 8px; font-size: 1rem; line-height: 1.6; color: #e8f0fe; }
.recap-conclusion strong { color: #fcbf49; }
</style>

<!-- ================================================
     SLIDE 27 — LA BOUCLE COLIN
     ================================================ -->
---
layout: quote
---

"Pendant ces périodes, j'ai lu un bouquin écrit par quelqu'un de cette communauté.

Aujourd'hui c'est cette même communauté qui m'invite à monter sur cette scène.

Je pense pas que c'est un hasard. Je pense que c'est exactement ce que le craft fait en dehors des lignes de code : il **crée des cercles** où les gens se retrouvent."

<div style="margin-top: 1.5rem; font-size: 0.85rem; color: #8faac3; font-style: normal;">
  Un clin d'oeil à <span style="color: #fcbf49;">Colin Damon</span> — Itération Product(ives)
</div>

<!-- ================================================
     SLIDE 28 — PHRASE DE SORTIE
     ================================================ -->
---
layout: statement
---

<div v-motion :initial="{ opacity: 0, y: 30 }" :enter="{ opacity: 1, y: 0, transition: { duration: 800 } }">

Ce qui nous forge en tant que développeur,<br>
c'est **pas la formation** qu'on a suivie.

C'est la **culture** qu'on se crée en route.

</div>

<!-- ================================================
     SLIDE 29 — FIN / MERCI
     ================================================ -->
---
layout: end
---

<div class="end-content" v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, transition: { duration: 600 } }">
  <div class="end-name">Rémy Shift</div>
  <div class="end-handles">
    <span>@remyshift</span>
  </div>
  <div class="end-doors">
    <div class="end-door" style="border-color: #52b788; box-shadow: 0 0 15px rgba(82,183,136,0.3)" />
    <div class="end-door" style="border-color: #4895ef; box-shadow: 0 0 15px rgba(72,149,239,0.3)" />
    <div class="end-door" style="border-color: #e63946; box-shadow: 0 0 15px rgba(230,57,70,0.3)" />
    <div class="end-door" style="border-color: #fcbf49; box-shadow: 0 0 15px rgba(252,191,73,0.3)" />
  </div>
  <div class="end-event">LyonCraft 2026 — Software Crafters Lyon</div>
</div>

<style>
.end-content { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; gap: 1.2rem; text-align: center; }
.end-name { font-family: 'Bebas Neue', sans-serif; font-size: 3.5rem; color: #ffffff; letter-spacing: 0.05em; }
.end-handles { font-size: 1rem; color: #8faac3; letter-spacing: 0.1em; }
.end-doors { display: flex; gap: 1.5rem; align-items: flex-end; }
.end-door { width: 40px; height: 65px; border-radius: 40% 40% 0 0 / 20% 20% 0 0; border: 2px solid; }
.end-event { font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(139,170,195,0.4); }
</style>
