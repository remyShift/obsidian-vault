<template>
  <div class="door-scene">
    <!-- Fond usine : grille de portes en arrière-plan -->
    <div class="bg-doors">
      <div
        v-for="i in 12"
        :key="i"
        class="bg-door"
        :style="{ borderColor: bgColors[i % bgColors.length], opacity: 0.12 + (i % 3) * 0.06 }"
      />
    </div>

    <!-- Porte principale -->
    <div class="door-wrapper">
      <!-- Cadre mural -->
      <div class="door-frame" :style="{ '--door-color': color, '--door-dark': darkColor }">

        <!-- Corps de la porte -->
        <div class="door-body">

          <!-- Arcade du haut -->
          <div class="door-arch" />

          <!-- Fenêtre ronde -->
          <div class="door-window">
            <div class="door-window-inner" />
            <!-- Si une image est fournie, décommentez :
            <img v-if="image" :src="image" class="door-window-img" alt="" />
            -->
          </div>

          <!-- Panneau central -->
          <div class="door-panel-top" />
          <div class="door-panel-bottom" />

          <!-- Boulons décoratifs -->
          <div class="bolt bolt-tl" />
          <div class="bolt bolt-tr" />
          <div class="bolt bolt-bl" />
          <div class="bolt bolt-br" />

          <!-- Poignée -->
          <div class="door-handle-plate">
            <div class="door-handle" />
          </div>

          <!-- Badge numéro -->
          <div v-if="number" class="door-badge">
            {{ number }}
          </div>
        </div>
      </div>

      <!-- Label sous la porte -->
      <div v-if="label" class="door-label">{{ label }}</div>
    </div>

    <!-- Texte de section -->
    <div class="section-text">
      <div v-if="act" class="section-act">{{ act }}</div>
      <div v-if="title" class="section-title">{{ title }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  color: { type: String, default: '#4895ef' },
  darkColor: { type: String, default: '#1e3a5f' },
  number: { type: String, default: '' },
  label: { type: String, default: '' },
  act: { type: String, default: '' },
  title: { type: String, default: '' },
  image: { type: String, default: '' },
})

const bgColors = ['#52b788', '#4895ef', '#e63946', '#fcbf49', '#a855f7', '#06b6d4']

const darkColor = computed(() => props.darkColor)
</script>

<style scoped>
.door-scene {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: #070d1a;
  overflow: hidden;
}

/* --- Fond : mini portes déco --- */
.bg-doors {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 1.5rem;
  padding: 1.5rem;
  pointer-events: none;
}

.bg-door {
  border: 2px solid;
  border-radius: 40% 40% 0 0 / 20% 20% 0 0;
  opacity: 0.18;
}

/* --- Porte principale --- */
.door-wrapper {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.door-frame {
  position: relative;
  width: 200px;
  padding: 10px;
  background: color-mix(in srgb, var(--door-dark) 80%, #000 20%);
  border-radius: 50% 50% 0 0 / 20% 20% 0 0;
  box-shadow:
    0 0 0 4px var(--door-color),
    0 0 60px color-mix(in srgb, var(--door-color) 60%, transparent),
    0 0 120px color-mix(in srgb, var(--door-color) 30%, transparent),
    inset 0 0 30px rgba(0,0,0,0.5);
  animation: door-glow 3s ease-in-out infinite alternate;
}

@keyframes door-glow {
  from { box-shadow:
    0 0 0 4px var(--door-color),
    0 0 60px color-mix(in srgb, var(--door-color) 60%, transparent),
    0 0 120px color-mix(in srgb, var(--door-color) 30%, transparent),
    inset 0 0 30px rgba(0,0,0,0.5); }
  to { box-shadow:
    0 0 0 4px var(--door-color),
    0 0 80px color-mix(in srgb, var(--door-color) 80%, transparent),
    0 0 160px color-mix(in srgb, var(--door-color) 40%, transparent),
    inset 0 0 30px rgba(0,0,0,0.5); }
}

.door-body {
  position: relative;
  width: 180px;
  height: 280px;
  background: var(--door-color);
  border-radius: 45% 45% 0 0 / 18% 18% 0 0;
  overflow: hidden;
  box-shadow: inset 0 0 20px rgba(0,0,0,0.3);
}

/* Arcade */
.door-arch {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 80px;
  background: color-mix(in srgb, var(--door-color) 70%, #fff 30%);
  border-radius: 50% 50% 0 0 / 100% 100% 0 0;
}

/* Fenêtre ronde */
.door-window {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: #070d1a;
  border: 3px solid rgba(255,255,255,0.3);
  box-shadow:
    0 0 12px rgba(0,0,0,0.6),
    inset 0 0 10px rgba(72, 149, 239, 0.2);
  overflow: hidden;
  z-index: 2;
}

.door-window-inner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #1a3a5c, #070d1a);
}

.door-window-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

/* Panneaux déco */
.door-panel-top,
.door-panel-bottom {
  position: absolute;
  left: 12px;
  right: 12px;
  height: 58px;
  border: 2px solid rgba(255,255,255,0.15);
  border-radius: 4px;
  background: color-mix(in srgb, var(--door-color) 80%, #000 20%);
}

.door-panel-top  { top: 88px; }
.door-panel-bottom { top: 162px; }

/* Boulons */
.bolt {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255,255,255,0.4);
  box-shadow: 0 0 4px rgba(0,0,0,0.5);
}

.bolt-tl { top: 92px;  left: 16px; }
.bolt-tr { top: 92px;  right: 16px; }
.bolt-bl { top: 166px; left: 16px; }
.bolt-br { top: 166px; right: 16px; }

/* Poignée */
.door-handle-plate {
  position: absolute;
  bottom: 48px;
  right: 22px;
  width: 22px;
  height: 38px;
  background: rgba(255,255,255,0.15);
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.25);
  display: flex;
  align-items: center;
  justify-content: center;
}

.door-handle {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255,255,255,0.5);
  box-shadow: 0 0 6px rgba(255,255,255,0.4);
}

/* Badge numéro */
.door-badge {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.1rem;
  letter-spacing: 0.1em;
  color: rgba(255,255,255,0.9);
  background: rgba(0,0,0,0.4);
  padding: 1px 10px;
  border-radius: 4px;
  white-space: nowrap;
}

/* Label sous porte */
.door-label {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: v-bind(color);
  opacity: 0.8;
}

/* --- Texte de section --- */
.section-text {
  position: relative;
  z-index: 2;
  flex: 1;
  max-width: 50%;
  padding-left: 2rem;
}

.section-act {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.4rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: v-bind(color);
  margin-bottom: 0.5rem;
  opacity: 0.9;
}

.section-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 3.8rem;
  line-height: 1.05;
  color: #ffffff;
  text-shadow: 0 0 30px color-mix(in srgb, v-bind(color) 40%, transparent);
}
</style>
