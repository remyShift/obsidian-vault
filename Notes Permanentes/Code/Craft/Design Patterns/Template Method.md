---
tags: [SoftwareCraft, DesignPatterns, Behavioral]
---

Définir le **squelette d'un algorithme** dans une classe de base, en laissant les sous-classes implémenter certaines étapes. La séquence est fixe, les détails varient.

```js
class DataExporter {
  // Template Method — la séquence est immuable
  export(data) {
    const formatted = this.format(data);    // étape variable
    const validated = this.validate(formatted);
    return this.write(validated);           // étape variable
  }

  // Comportement par défaut — peut être surchargé
  validate(data) {
    if (!data) throw new Error('Empty data');
    return data;
  }

  // Étapes obligatoires à implémenter
  format(data) { throw new Error('format() must be implemented'); }
  write(data)  { throw new Error('write() must be implemented'); }
}

class CsvExporter extends DataExporter {
  format(data) { return data.map(row => Object.values(row).join(',')).join('\n'); }
  write(data)  { return fs.writeFileSync('export.csv', data); }
}

class JsonExporter extends DataExporter {
  format(data) { return JSON.stringify(data, null, 2); }
  write(data)  { return fs.writeFileSync('export.json', data); }
}
```

### Où c'est massif en pratique

Les **frameworks** utilisent Template Method partout :
- Hooks de lifecycle React (`componentDidMount`, `componentWillUnmount`) — tu surcharges des étapes d'un cycle fixé par React
- Pipelines CI/CD — chaque step override des hooks prédéfinis
- ORM hooks (`beforeCreate`, `afterSave` dans Sequelize / Mongoose)

### Différence avec Strategy

[[Strategy]] = **l'algorithme entier** est remplacé via composition. Template Method = **des étapes** d'un algorithme fixe sont surchargées via héritage.

Template Method couple les sous-classes à la classe de base (héritage). Strategy est plus flexible (composition). Si tu peux choisir, préfère Strategy. Template Method est justifié quand le squelette doit être strictement respecté et partagé.

### Signal d'usage

Même séquence d'étapes dans plusieurs contextes, avec des variations à des points précis. Si les variations concernent l'algorithme entier, c'est [[Strategy]] qui convient mieux.

---

- [[Design Patterns Behavioral]] — vue d'ensemble des patterns behavioral
- [[Strategy]] — composition vs héritage
