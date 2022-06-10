"use strict";
const levelParameterDesc = [
    "Avec les son de pick des champions",
    "Avec les son de ban des champions",
    "Avec les son de rire des champions"
];
const levelParmeterString = [
    "facile",
    "moyen",
    "difficile"
];
function setLevelParameterEventListener() {
    let levelParameter = document.querySelector(".levelParameter");
    levelParameter.addEventListener('change', (ev) => {
        const levelParameter = ev.target;
        console.log(levelParameter.value);
        const levelDesc = document.querySelector(".levelDesc");
        levelDesc.textContent = levelParameterDesc[parseInt(levelParameter.value)];
    });
}
function setPlayButtonEventListener() {
    let lauchGame = document.querySelector(".lauchGame");
    lauchGame.addEventListener("click", () => {
        let difficulty = document.querySelector(".difficulty");
        document.cookie = `difficulty=${levelParmeterString[difficulty.value]}`;
        //window.location.href = "http://voices_of_legends.games.coffeebreaks.eu/quiz"
        window.location.href = "http://localhost:3000/quiz";
    });
}
function setEventListener() {
    setLevelParameterEventListener();
    setPlayButtonEventListener();
}
setEventListener();
