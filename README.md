# designmyheroapp

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.15.1.

## Build & development

Run `grunt` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma.

## TODO
* Gestion Panier
* Mise en localStorage du panier
* Envoie sur le serveur du panier
* Page panier
* inscription
* Prix total affiché
* Bouton à côté d'un costume du panier pour l'afficher sur la vue "Modifier"
* Bouton supprimer création du panier
* Costume Collapsible pour voir les produits
* https://github.com/plong0/angular-collapse


Il faut un objet qui correspond à ce qu'on envoie : currentCreation

Il faut un objet qui correspond à ce qui a été chargé

Il faut un objet qui correspond à ce qui a été chargé mais modifié avec le currentCreation pour le comparer avec l'objet chargé

S'ils ne sont pas pareil, on crée une nouvelle créa
Sinon, on ajoute au panier currentCreation et dans un autre objet qui contient un tableau des créations pour le panier, à montrer