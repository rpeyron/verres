import "./styles.css";
import { normalize, tests } from "./lens";

// UI -------------------------------------------

var textCorrection = document.getElementById("correction");
var textNormalise = document.getElementById("normal");

var spanMoyRefract = document.getElementById("moyrefract");

var spanSphere = document.getElementById("sphere");
var spanCylindre = document.getElementById("cylindre");
var spanAngle = document.getElementById("angle");
var spanAddition = document.getElementById("addition");

var spanInSphere = document.getElementById("sphereIn");
var spanInCylindre = document.getElementById("cylindreIn");
var spanInAngle = document.getElementById("angleIn");
var spanInAddition = document.getElementById("additionIn");

let actualize = () => {
  var val = textCorrection.value;
  var ret = normalize(val);

  if (ret.input === val) {
    textNormalise.value = ret.normale;
    spanMoyRefract.innerText = ret.moyrefract;
    spanSphere.innerText = ret.explain.out.sphere;
    spanCylindre.innerText = ret.explain.out.cylindre;
    spanAngle.innerText = ret.explain.out.angle;
    spanAddition.innerText = ret.explain.out.addition;
    spanInSphere.innerText = ret.explain.in.sphere;
    spanInCylindre.innerText = ret.explain.in.cylindre;
    spanInAngle.innerText = ret.explain.in.angle;
    spanInAddition.innerText = ret.explain.in.addition;
  } else {
    textNormalise.innerText = ret;
  }
};

textCorrection.onchange = actualize;
textCorrection.oninput = actualize;

tests();
