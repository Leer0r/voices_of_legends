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
        levelDesc: "Une image d'un champion se dépixélise de plus en plus, à toi de deviner son nom le plus rapidement possible. Ce jeu comporte encore des bugs lié à la dépixélisation",
        difficultyDesc: {
            levelParmeterName: [
                "Facile",
                "Moyen",
                "difficile"
            ],
            levelParameterDesc: [
                "Avec les images de base des champions",
                "Avec les images des skins des champions",
                "Uniquement les skins, devinez leurs noms précis"
            ]
        }
    }
};
class mainPage {
    currentGame = "quiz";
    HTMLElementSelector = {
        "quiz": document.querySelector(".leftContainer .classicGame"),
        "pixelGuess": document.querySelector(".leftContainer .pixelGuess")
    };
    HTMLElementMainClass = {
        "title": document.querySelector(".middle .title"),
        "selectDifficulty": document.querySelector(".middle .levelParameter .difficulty"),
        "levelDesc": document.querySelector(".middle .levelParameter .levelDesc")
    };
    constructor() {
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
        document.querySelector(".mainContainer .middle .help .helpIcon")?.addEventListener("click", () => {
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
        document.querySelector(".leftContainer .classicGame")?.addEventListener("click", () => {
            this.setGameMode("quiz");
        });
        document.querySelector(".leftContainer .pixelGuess")?.addEventListener("click", () => {
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
