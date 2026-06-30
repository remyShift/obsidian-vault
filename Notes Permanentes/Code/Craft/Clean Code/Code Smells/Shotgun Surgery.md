---
tags: [SoftwareCraft, CleanCode, Refactoring]
---

Un seul changement conceptuel t'oblige à modifier plein d'endroits différents dans le code. Chaque fois que tu touches à cette fonctionnalité, tu dois ouvrir 5, 6, 7 fichiers. C'est l'inverse de [[Divergent Change]] : une raison de changer, beaucoup de classes à modifier.

```js
// ❌ Shotgun Surgery — ajouter un nouveau type de notification oblige à toucher partout
// notifications/email.js
function sendEmail(userId, message) { /* ... */ }

// notifications/sms.js
function sendSms(userId, message) { /* ... */ }

// orders/orderService.js
if (user.preferences.email) sendEmail(user.id, 'Order confirmed');
if (user.preferences.sms) sendSms(user.id, 'Order confirmed');

// payments/paymentService.js
if (user.preferences.email) sendEmail(user.id, 'Payment received');
if (user.preferences.sms) sendSms(user.id, 'Payment received');

// shipping/shippingService.js
if (user.preferences.email) sendEmail(user.id, 'Package shipped');
if (user.preferences.sms) sendSms(user.id, 'Package shipped');
```

Ajouter les notifications push oblige à toucher chaque service. Changer la logique "qui reçoit quoi" = ouvrir tous les fichiers. C'est du [[Duplicate Code]] structurel : la même décision est dispersée partout.

```js
// ✅ logique centralisée — un seul endroit à modifier
class NotificationService {
  constructor(channels) {
    this.channels = channels; // [emailChannel, smsChannel, pushChannel]
  }

  async notify(userId, event, message) {
    const user = await this.userRepo.findById(userId);
    for (const channel of this.channels) {
      if (channel.isEnabledFor(user)) {
        await channel.send(user, message);
      }
    }
  }
}

// Dans orderService.js
await notificationService.notify(user.id, 'order:confirmed', 'Order confirmed');

// Dans paymentService.js
await notificationService.notify(user.id, 'payment:received', 'Payment received');
```

Ajouter les notifications push = créer un nouveau channel et le passer à `NotificationService`. Rien d'autre à toucher. Lien avec le pattern [[Design Patterns Behavioral|Strategy]] pour les channels.

**Fix :** `Move Method/Field` pour regrouper ce qui change ensemble. Identifier le concept dispersé et lui créer un foyer unique.

**Signal d'identification :** git log qui montre les mêmes fichiers modifiés ensemble à chaque commit lié à une feature, recherche `Ctrl+F` d'un concept qui retourne des occurrences dans 5+ fichiers différents, sentiment de "checklist" à chaque modification ("penser à changer aussi dans X, Y, et Z").
