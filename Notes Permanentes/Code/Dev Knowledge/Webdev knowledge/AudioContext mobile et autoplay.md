---
tags: [webaudio, mobile, ios, webkit]
---

# AudioContext mobile et autoplay

## Politique autoplay
Premier `AudioContext` au montage = muet sans geste utilisateur. Solution standard : déclencher / `resume()` au premier `pointerdown` ou `touchstart`. Pas de hack viable.

## Bug WebKit : `resume()` ne résout pas
Sur iOS Safari, `audioContext.resume()` retourne parfois une Promise qui ne se résout **jamais**. Symptôme : son de boot manque 1 fois sur 2 sur iPhone.

Solution robuste : double déclencheur avec flag de déduplication.

```ts
let played = false
const play = () => {
  if (played) return
  played = true
  playWelcomeChime()
}

audioContext.addEventListener('statechange', () => {
  if (audioContext.state === 'running') play()
})
audioContext.resume().then(play)
```

## Scheduling mobile : ~80ms minimum
Après `resume()` sur mobile, le moteur audio a besoin de ~80ms avant que `ctx.currentTime` avance de façon fiable. Schedule à 20ms de lookahead = notes scheduled dans le passé = silence.

```ts
const ATTACK_LOOKAHEAD_MS = 80 // 20ms ne suffit pas sur WebKit mobile
```

## DeviceOrientation : HTTPS strict obligatoire
`DeviceOrientationEvent.requestPermission()` ne déclenche **jamais** la popup iOS sur HTTP local (même via IP LAN). Pas d'erreur console, juste silencieux.

Pour tester : ngrok, Caddy reverse proxy, ou preview Vercel (HTTPS natif).
