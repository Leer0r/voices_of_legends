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
const gameDescriptor = {
    classique: {
        levelName: "Mode de jeu classique",
        levelDesc: "Devine les champions par leurs son ! Différentes difficultées pour toujours plus de challenge"
    }
};
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
function displayPopup(desc) {
    popupTitle.innerText = desc.levelName;
    popupContent.innerText = desc.levelDesc;
    popupContainer.style.display = "flex";
}
function setHelpEventListener() {
    var _a;
    (_a = document.querySelector(".mainContainer .middle .help")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        displayPopup(gameDescriptor.classique);
    });
}
function setEventListener() {
    setLevelParameterEventListener();
    setPlayButtonEventListener();
    setHelpEventListener();
}
setEventListener();
