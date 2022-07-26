"use strict";
const gameDescriptor = {
    "quiz": {
        levelTitle: "Classique",
        levelName: "Mode de jeu classique",
        levelDesc: "Devine les champions par leurs son ! Différentes difficultées pour toujours plus de challenge",
        difficultyDesc: {
            levelParmeterName: [
                "Facile",
                "Moyen",
                //"difficile"
            ],
            levelParameterDesc: [
                "Avec les son de pick des champions",
                "Avec les son de ban des champions",
                //"Avec les son de rire des champions"
            ]
        }
    },
    "pixelGuess": {
        levelTitle: "Pixel Guess",
        levelName: "Mode de jeu par image",
        levelDesc: "Une image d'un champion de dépixélise de plus en plus, à toi de deviner le plus rapidement possible",
        difficultyDesc: {
            levelParmeterName: [
                "Facile",
                "Moyen"
            ],
            levelParameterDesc: [
                "Avec les images de base des champions",
                "Avec les images des skins des champions"
            ]
        }
    }
};
class mainPage {
    constructor() {
        this.currentGame = "quiz";
        this.HTMLElementSelector = {
            "quiz": document.querySelector(".leftContainer .classicGame"),
            "pixelGuess": document.querySelector(".leftContainer .pixelGuess")
        };
        this.HTMLElementMainClass = {
            "title": document.querySelector(".middle .title"),
            "selectDifficulty": document.querySelector(".middle .levelParameter .difficulty"),
            "levelDesc": document.querySelector(".middle .levelParameter .levelDesc")
        };
        this.setEventListener();
    }
    setLevelParameterEventListener() {
        let levelParameter = document.querySelector(".levelParameter");
        levelParameter.addEventListener('change', (ev) => {
            const levelParameter = ev.target;
            const levelDesc = document.querySelector(".levelDesc");
            levelDesc.textContent = gameDescriptor[this.currentGame].difficultyDesc.levelParameterDesc[parseInt(levelParameter.value)];
        });
    }
    setPlayButtonEventListener() {
        let lauchGame = document.querySelector(".lauchGame");
        lauchGame.addEventListener("click", () => {
            let difficulty = document.querySelector(".difficulty");
            changePage(`/${this.currentGame}`, "get", [{
                    title: "difficulty",
                    value: gameDescriptor[this.currentGame].difficultyDesc.levelParmeterName[parseInt(difficulty.value)]
                }]);
        });
    }
    displayPopup(desc) {
        popupTitle.innerText = desc.levelName;
        popupContent.innerText = desc.levelDesc;
        popupContainer.style.display = "flex";
    }
    setHelpEventListener() {
        var _a;
        (_a = document.querySelector(".mainContainer .middle .help .helpIcon")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
            this.displayPopup(gameDescriptor[this.currentGame]);
        });
    }
    setGameMode(game) {
        this.HTMLElementSelector[this.currentGame].classList.remove("selected");
        this.currentGame = game;
        this.HTMLElementSelector[this.currentGame].classList.add("selected");
        this.HTMLElementMainClass.title.innerText = gameDescriptor[this.currentGame].levelTitle;
        const nbOptions = this.HTMLElementMainClass.selectDifficulty.options.length;
        this.HTMLElementMainClass.selectDifficulty.innerHTML = "";
        for (let i = 0; i < gameDescriptor[this.currentGame].difficultyDesc.levelParmeterName.length; i++) {
            let newOption = document.createElement("option");
            newOption.value = `${i}`;
            newOption.text = gameDescriptor[this.currentGame].difficultyDesc.levelParmeterName[i];
            this.HTMLElementMainClass.selectDifficulty.appendChild(newOption);
        }
        this.HTMLElementMainClass.levelDesc.innerHTML = gameDescriptor[this.currentGame].difficultyDesc.levelParameterDesc[0];
    }
    setGameSelectListener() {
        var _a, _b;
        (_a = document.querySelector(".leftContainer .classicGame")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
            this.setGameMode("quiz");
        });
        (_b = document.querySelector(".leftContainer .pixelGuess")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
            this.setGameMode("pixelGuess");
        });
    }
    setEventListener() {
        this.setLevelParameterEventListener();
        this.setPlayButtonEventListener();
        this.setHelpEventListener();
        this.setGameSelectListener();
    }
}
const _mainPage = new mainPage();
