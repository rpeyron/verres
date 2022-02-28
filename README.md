# Verres

L'objectif de cette application est de normaliser les différentes écritures d'une correction de verres de lunettes entre les différentes pratiques des ophtalmologues et des opticiens.

L'application est disponible sur la page : https://rpeyron.github.io/verres/

Article de blog correspondant : https://www.lprp.fr/2022/02/lire-les-corrections-de-lunettes

# Disclaimer

Je ne suis ni opticien, ni ophtalmologue, ni professionnel de la santé, les éléments ci-dessous sont issus de rapides recherches sur Internet et ne sauraient constituer une quelconque expertise médicale.

# Explications
La notation des verres est composée de plusieurs parties suivant votre correction :

Pour tous :
- La sphère : il s’agit de la courbure principale du verre ; elle est exprimée en dioptries ; si elle est négative vous êtes myope (verres concaves) , si elle est positive vous êtes hypermétrope (verres convexes)

Pour les astigmates seulement :
- Le cylindre : il s’agit de la correction du cylindre de correction de l’astigmatie, exprimée en dioptries
- L’angle : l’angle de l’axe du cylindre dans le plan du verre, exprimé en degrés

Pour les myopes (verres progressifs) :
- L’addition : il s’agit de la correction ajoutée à la sphère pour la zone de vision de près, exprimée en dioptries.

Pour une correction simple, seule la sphère est exprimée. Là encore, suivant les ophtalmologues, tous ne notent pas les dioptries de la même façon. Certains se passeront de la virgule pour noter la valeur multipliée par 100. Ainsi, 1.5 dioptrie sera noté 150.

C’est pour l’astigmatie que la variété est plus grande, ainsi pour une même correction, on peut trouver :
* -3.00 (+1.00 à 110°)  dite notation à cylindre positif, fréquent chez les opticiens
* -2.00 (-1.00 à 20°)  dite notation à cylindre négatif, fréquent chez les ophtalmologues
* (20° -1.00) -2.00  toujours une notation à cylindre négatif, mais avec le cylindre qui précède la sphère
* 20 -100 -200   également une notation à cylindre négatif avec le cylindre qui précède, mais sans les parenthèses et avec les dioptries multipliées par 100

Pour passer d’une notation à cylindre positif vers une notation à cylindre négatif, il faut faire la transposition suivante : ajouter le cylindre à la sphère, inverser le cylindre, ajouter 90° à l’angle (et on retranchera 180° si cela dépasse 180°) ; l’article en référence (1) explique plus en détail ce mécanisme de transposition. L’article (2) permet de comprendre pourquoi ces transpositions donnent la même correction optique.

Enfin avec l’astigmatie, il n’est pas évident de savoir si la myopie évolue globalement ou non suivant la répartition. Pour cela il est utile de regarder la valeur moyenne de la sphère en ajoutant la sphère et la moitié du cylindre.

Références :
* (1) http://www.thomassinclairlabs.com/vue/transposition.html ; pour savoir comment transposer un cylindre négatif en cylindre positif
* (2) https://www.gatinel.com/recherche-formation/astigmatisme/astigmatisme-definitions-et-formulations/ et  https://www.gatinel.com/recherche-formation/astigmatisme/astigmatisme-representation-trigonometrique/ ; pour comprendre ce que ça veut dire et en quoi les écritures donnent un résultat identique (et plein d’autres articles intéressants)
* (3) https://www.essiloracademy.eu/en/publications/ophthalmic-optics-files ; les manuels de formation Essilor des opticiens en réfraction, accessibles librement, pour devenir un pro des lunettes


# Fonctions dans Google Spreadsheets

Dans un nouveau document Google Spreadsheet, cliquez sur Extensions / AppScripts. Puis dans l’éditeur de script qui s’est ouvert, copier le fichier disponible à cette adresse : https://github.com/rpeyron/verres/blob/main/src/lens.js  Et c’est tout ! Les fonctions =ophtalmoNormalise(correction) et =ophtalmoMoyRefraction(correction) sont maintenant disponibles.
