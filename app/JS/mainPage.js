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
function setEventListener() {
    setLevelParameterEventListener();
    setPlayButtonEventListener();
}
setEventListener();
