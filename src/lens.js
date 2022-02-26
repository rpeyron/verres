/* 
References:
- http://www.thomassinclairlabs.com/vue/transposition.html
- https://www.gatinel.com/recherche-formation/astigmatisme/astigmatisme-representation-trigonometrique/

*/

// Function -------------------------------------------

var re_dioptrie = "[-+]?[.,\\d]+";
var re_sphere = "\\s*(?<sphere>" + re_dioptrie + ")\\s*";
var re_cylindre = "\\s*(?<cylindre>" + re_dioptrie + ")\\s*";
var re_addition =
  "\\s*(Add.?|Addition)?\\s*(?<addition>" + re_dioptrie + ")?\\s*";

var re_angle = "\\s*(?<angle>[-+]?\\d\\d\\d?)°?\\s*";

// Parenthèses en second : -2.00 (-1,25) 55°
//var re1 = /(?<sphere>[-+.,\d]+)\s*(\(\s*(?<cylindre>[-+.,\d]*)\s*\)\s*(?<angle>[-+.\d]*)°)?\s*(Add.?|Addition)?\s*(?<addition>[-+.,\d]*)\s*/;
var re1 = new RegExp(
  "^" +
    re_sphere +
    "(\\(" +
    re_cylindre +
    "(\\)|a|à)?" +
    re_angle +
    "\\)?)?" +
    re_addition +
    "$",
  ""
);

var re2 = new RegExp(
  "^" +
    "(\\(?" +
    re_angle +
    re_cylindre +
    "\\)?)?" +
    re_sphere +
    re_addition +
    "$",
  ""
);

// Parenthèses en premier : (175° -2,00) -0,50 Addition +1,00

function formatDioptrie(dio) {
  return (dio < 0 ? "" : "+") + dio.toFixed(2);
}

export function normalize(str, option) {
  var matches = str.match(re1);
  if (!matches) matches = str.match(re2);

  if (matches && matches.groups) {
    // Recupere les groupes
    var sphere = matches.groups.sphere;
    var cylindre = matches.groups.cylindre;
    var angle = matches.groups.angle;
    var addition = matches.groups.addition;

    // Remplace les virgules
    if (sphere) sphere = sphere.replace(",", ".");
    if (cylindre) cylindre = cylindre.replace(",", ".");
    if (addition) addition = addition.replace(",", ".");

    // Parse numbers
    if (sphere) sphere = parseFloat(sphere);
    if (cylindre) cylindre = parseFloat(cylindre);
    if (angle) angle = parseFloat(angle);
    if (addition) addition = parseFloat(addition);

    // Si trop important on ajoute la virgule
    if (sphere && Math.abs(sphere) > 10) sphere /= 100;
    if (cylindre && Math.abs(cylindre) > 10) cylindre /= 100;
    if (addition && Math.abs(addition) > 10) addition /= 100;

    if (option === "cylneg") {
      // Transposition en cylindre négatif (habitude des ophtalmos)
      if (cylindre && cylindre > 0) {
        sphere = sphere + cylindre;
        cylindre = -cylindre;
        angle = angle - 90;
        if (angle < 0) angle += 180;
      }
    } else {
      // Transposition en cylindre positif (habitude des opticiens)
      if (cylindre && cylindre < 0) {
        sphere = sphere + cylindre;
        cylindre = -cylindre;
        angle = angle - 90;
        if (angle < 0) angle += 180;
      }
    }

    // Creation de la forme normale
    var normale = formatDioptrie(sphere);
    if (cylindre) {
      normale += " (" + formatDioptrie(cylindre) + " à " + angle + "°)";
    }
    if (addition) {
      normale += " Add " + formatDioptrie(addition);
    }

    return {
      input: str,
      normale: normale,
      explain: {
        in: {
          sphere: matches.groups.sphere ?? "",
          cylindre: matches.groups.cylindre ?? "",
          angle: matches.groups.angle ?? "",
          addition: matches.groups.addition ?? ""
        },
        out: {
          sphere: formatDioptrie(sphere),
          cylindre: cylindre ? formatDioptrie(cylindre) : "",
          angle: angle ? angle + "°" : "",
          addition: addition ? formatDioptrie(addition) : ""
        }
      },
      moyrefract: formatDioptrie(sphere + (cylindre ? cylindre / 2 : 0))
    };
  }

  return "Erreur d'analyse de la correction";
}

// Tests -------------------------------------------

var nb_tests_tot = 0;
var nb_tests_ok = 0;

function test(str, expected, option) {
  var ret = normalize(str, option);

  nb_tests_tot++;
  if (expected === ret.normale) nb_tests_ok++;

  console.assert(
    expected === ret.normale,
    `${str} -> ${ret.normale} but expected ${expected}`,
    ret
  );
}

export function tests() {
  // En cylindre positif
  test("-2.00", "-2.00");
  test("-2.00 (-1,25) 55°", "-3.25 (+1.25 à 145°)");
  test("-3.25 (+1.25 à 145°)", "-3.25 (+1.25 à 145°)");
  test("-1,75 (+1,00) 95° Add. +0,75", "-1.75 (+1.00 à 95°) Add +0.75");
  test("(175° -2,00) -0,50 Addition +1,00", "-2.50 (+2.00 à 85°) Add +1.00");
  test("+1.50 (-0.50 à 20°)", "+1.00 (+0.50 à 110°)");
  test("-0275(+150)080", "-2.75 (+1.50 à 80°)");
  test("170-150-125", "-2.75 (+1.50 à 80°)");

  // En cylindre négatif
  test("-2.00", "-2.00", "cylneg");
  test("-2.00 (-1,25) 55°", "-2.00 (-1.25 à 55°)", "cylneg");
  test("-2.00 (-1.25 à 55°)", "-2.00 (-1.25 à 55°)", "cylneg");
  test(
    "-1,75 (+1,00) 95° Add. +0,75",
    "-0.75 (-1.00 à 5°) Add +0.75",
    "cylneg"
  );
  test(
    "(175° -2,00) -0,50 Addition +1,00",
    "-0.50 (-2.00 à 175°) Add +1.00",
    "cylneg"
  );
  test("+1.00 (+0.50 à 110°)", "+1.50 (-0.50 à 20°)", "cylneg");
  test("-0275(+150)080", "-1.25 (-1.50 à 170°)", "cylneg");
  test("170-150-125", "-1.25 (-1.50 à 170°)", "cylneg");

  console.log(
    `Tests: ${nb_tests_ok}/${nb_tests_tot} OK - ${
      (nb_tests_ok / nb_tests_tot) * 100
    }%`
  );
}
