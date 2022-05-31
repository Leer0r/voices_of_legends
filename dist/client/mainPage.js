"use strict";
const levelParameterDesc = [
    "",
    "Avec les son de pick des champions",
    "Avec les son de ban des champions",
    "Avec les son de rire des champions"
];
function setLevelParameterEventListener() {
    var _a;
    (_a = document.querySelector(".levelParameter")) === null || _a === void 0 ? void 0 : _a.addEventListener('change', (ev) => {
        const levelParameter = ev.target;
        console.log(levelParameter.value);
        const levelDesc = document.querySelector(".levelDesc");
        levelDesc.textContent = levelParameterDesc[parseInt(levelParameter.value)];
    });
}
function setEventListener() {
    setLevelParameterEventListener();
}
setEventListener();
