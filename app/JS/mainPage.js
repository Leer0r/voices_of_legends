var levelParameterDesc = [
    "Avec les son de pick des champions",
    "Avec les son de ban des champions",
    "Avec les son de rire des champions"
];
var levelParmeterString = [
    "facile",
    "moyen",
    "difficile"
];
function setLevelParameterEventListener() {
    var levelParameter = document.querySelector(".levelParameter");
    levelParameter.addEventListener('change', function (ev) {
        var levelParameter = ev.target;
        console.log(levelParameter.value);
        var levelDesc = document.querySelector(".levelDesc");
        levelDesc.textContent = levelParameterDesc[parseInt(levelParameter.value)];
    });
}
function setPlayButtonEventListener() {
    var lauchGame = document.querySelector(".lauchGame");
    lauchGame.addEventListener("click", function () {
        var difficulty = document.querySelector(".difficulty");
        document.cookie = "difficulty=" + levelParmeterString[difficulty.value];
        window.location.href = "http://voices_of_legends.games.coffeebreaks.eu/quiz";
    });
}
function displayPopup(title, content) {
    popupTitle.innerText = title;
    popupContent.innerText = content;
    popupContainer.style.display = "flex";
}
function setHelpEventListener() {
    var _a;
    (_a = document.querySelector(".mainContainer .middle .help")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
        displayPopup("test", "SVP marche");
    });
}
function setEventListener() {
    setLevelParameterEventListener();
    setPlayButtonEventListener();
    setHelpEventListener();
}
setEventListener();
