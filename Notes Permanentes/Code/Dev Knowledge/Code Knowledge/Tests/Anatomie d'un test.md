> [!info]- Tags
> #Tests

Test est définis à la fois par son nom et ce qu’il contient —> être soigneux sur ces 2 points

### 1. Nommage du test :

Nom test = règle de gestion qui est testée 

Par exemple pour un test sur les divisions une des exceptions est censé avoir lieu lorsque le dénominateur est égal à 0.
Le nom du test pour gérer cette exception peut être donc : `Divide_should_raise_an_error_when_denominator_is_zero`

Plus la règle de gestion / nom du test est précis + on sait ce que le test vérifie et à quel résultat on s’attends


Pour une régularité de nommage on peut s’inspirer du BDD (Behaviour-Driven Development) avec **should / when** et **given / when / then**.

Aucune de ses 2 méthodes est meilleur que l’autre et ça peut dépendre de l’équipe dans laquelle on est, c’est surtout au feeling : l’essentiel est que l’objectif du test soit clair et concis dans le nom.

#### Should / when :

= « devrait / quand » —> articuler le nom de la fonctionnalité autour de ces keywords 

Si on suit l’exemple précédent on a : 
- `Divide_should_raise_an_error_when_denominator_is_zero`
- De manière raccourci : `Should_raise_an_error_when_denominator_is_zero`
- Le préfixe `DivideShould` peut devenir le nom de notre méthode et permettre ainsi de simplifier le nom du test : `Raise_an_error_when_denominator_is_zero`
	- Lorsqu’on assemble la méthode et le nom de notre test on aura donc `DivideShould.Raise_an_error_when_denominator_is_zero` et de manière plus complète `DivideShould.Throw_an_invalid_operation_when_denominator_is_zero`

#### Given / when / then :

= « étant donné que … / lorsque … / alors … » —> Proche de la méthode Gherkin (vu dans BDD) et permets de simplifier la communication entre les devs et les métiers.

Si on applique ça à notre exemple précédent on aurait : `Given_five_as_nominator_and_zero_as_denominator_when_i_divide_nominator_by_denominator_then_an_error_is_raised`

Format plus long mais plus explicite notamment sur les valeurs d’entrées


### 2. Corps du test :

Nom —> décrit le quoi et le corps —> décrit le comment. 

Corps diviser en trois sections :
- L’initialisation des données nécessaires pour le test
- Appel de la fonction à tester
- Vérification du résultat fourni
Attention ces 3 partis se doivent d’être bien claires et séparé sans s’entremêler pour une lisibilité du test.

#### Triple A :

Généralement les 3 sections sont regroupé sous le nommage anglophone de **Arrange / Act / Assert** (==> Préparer / Agir / Vérifier).

Pour éviter de s’éparpiller en TDD au début lors de l’écriture de notre test on peut baliser ses 3 sections avant de réfléchir à comment les remplir :

```javascript
{
	//Arrange

	//Act

	//Assert
}
```

### 3. Tips n Tricks

- Ne pas avoir peur de nom de test trop long
- Aller plutôt dans ce sens pour écrire le moins de code :
	- D’abord la vérification du résultat attendus
	- Appel à la fonction tester 
	- Initialisation des données