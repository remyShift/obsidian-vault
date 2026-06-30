---
tags:
  - SoftwareCraft
  - CleanCode
  - Refactoring
---

## Réécriture d'instructions conditionnelles

Réécrire des instructions conditionnelles peut être fait de manière varié :

- inverser une condition et donc les branches de notre `if`,
- transformer un `if / else` en opération ternaire ou l'inverse,
- *s'appuyer sur l'algèbre de Boole (—> lois de De Morgan) pour améliorer des conditions complexes*,
- fusionner un `if` en plusieurs en cas de duplication dans les blocs `if / else`,
- faire évoluer lorsque c'est possible une succession de `if` vers un `switch`.

Ces techniques nous permettent de tirer comme avantages :

- maintenir 1 seul niveau d'indentation,
- échouer ou renvoyer une valeur au plus tôt possible (principe de *fail fast*),
- réduire la duplication ,

## Réécriture de boucles

On cherche à avoir plus l'intention que comment on y parvient —> le plus fonctionnelle possible (cf ton post Linkedin sur ton kata).

## Réécriture des signatures

Permets une meilleur lisibilité et maintienbilité. C'est un des points névralgique de notre code il faut porter une attention particulière à nos signature car c'est elle qui définisse les " contrats d'utilisations ".

Encore une fois plusieurs options s'offre à nous :

- Changer l'ordre des paramètres pour améliorer la lisibilité, on veut aller du plus essentiel —> au plus optionnel // du plus significatif —> au moins important,
- homogénéiser l'ordre des paramètres sur plusieurs appels imbriqués pour en faciliter la lecture,
- regrouper les paramètres en fonction de leur cohésion fonctionnelle et créer si nécessaire des nouveaux types,

Si une signature est trop complexe on va avoir tendance à avoir du mal à réécrire au sein de notre méthode / fonction.
