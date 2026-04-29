<template>
  <div
    v-if="$nav.currentLayout !== 'none' && $nav.currentLayout !== 'cover'"
    class="global-footer"
  >
    <span class="footer-name">Rémy Shift</span>
    <span class="footer-sep">·</span>
    <span class="footer-event">LyonCraft 2026</span>
    <span class="footer-pages">{{ $nav.currentPage }} / {{ $nav.total }}</span>
  </div>
</template>

<style scoped>
.global-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 32px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 2rem;
  background: linear-gradient(to top, rgba(7, 13, 26, 0.95), transparent);
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(139, 170, 195, 0.5);
  z-index: 10;
}

.footer-name {
  color: rgba(139, 170, 195, 0.7);
}

.footer-sep {
  opacity: 0.3;
}

.footer-pages {
  margin-left: auto;
  font-variant-numeric: tabular-nums;
}
</style>
