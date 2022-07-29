interface difficultyDesc{
    levelParameterDesc:Array<string>
    levelParmeterName:Array<string>
}

interface levelDesc {
    levelTitle:string,
    levelName:string,
    levelDesc:string,
    difficultyDesc:difficultyDesc
}

interface args{
    title:string
    value:string
}

interface requestsMethods {
    "get":string
    "post":string
    "put":string
    "patch":string
    "delete":string
    "options":string
    "head":string
}

type games = "quiz" | "pixelGuess"

const gameDescriptor: {[gameName in games]:levelDesc} = {
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
        levelDesc: "Une image d'un champion se dépixélise de plus en plus, à toi de deviner le plus rapidement possible",
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
}

class mainPage {
    currentGame: games = "quiz"
    HTMLElementSelector: {[element in games] : HTMLElement} = {
        "quiz": <HTMLDivElement> document.querySelector(".leftContainer .classicGame"),
        "pixelGuess": <HTMLDivElement> document.querySelector(".leftContainer .pixelGuess")
    }
    HTMLElementMainClass: {[element:string] : HTMLDivElement | HTMLSelectElement} = {
        "title": <HTMLDivElement> document.querySelector(".middle .title"),
        "selectDifficulty": <HTMLSelectElement> document.querySelector(".middle .levelParameter .difficulty"),
        "levelDesc": <HTMLDivElement> document.querySelector(".middle .levelParameter .levelDesc")
    }
    constructor() {
        this.setEventListener()
    }

    setLevelParameterEventListener(){
        let levelParameter:HTMLSelectElement = <HTMLSelectElement>document.querySelector(".levelParameter")
        levelParameter.addEventListener('change', (ev:Event) => {
            const levelParameter:HTMLSelectElement = <HTMLSelectElement>ev.target
            const levelDesc:HTMLParagraphElement = <HTMLParagraphElement>document.querySelector(".levelDesc");
            levelDesc.textContent = gameDescriptor[this.currentGame].difficultyDesc.levelParameterDesc[parseInt(levelParameter.value)];
        })
    }
    
    setPlayButtonEventListener(){
        let lauchGame:HTMLButtonElement = <HTMLButtonElement>document.querySelector(".lauchGame");
        lauchGame.addEventListener("click", () => {
            let difficulty:HTMLSelectElement = <HTMLSelectElement>document.querySelector(".difficulty")
            changePage(`/${this.currentGame}`,"get",[{
                title:"difficulty",
                value:gameDescriptor[this.currentGame].difficultyDesc.levelParmeterName[parseInt(difficulty.value)]
            }])
        })
    }
    
    displayPopup(desc:levelDesc){
        popupTitle.innerText = desc.levelName
        popupContent.innerText = desc.levelDesc
        popupContainer.style.display = "flex"
    }
    
    setHelpEventListener(){
        document.querySelector(".mainContainer .middle .help .helpIcon")?.addEventListener("click", () => {
            this.displayPopup(gameDescriptor[this.currentGame])
        })
    }

    setGameMode(game:games){
        this.HTMLElementSelector[this.currentGame].classList.remove("selected")
        this.currentGame = game;
        this.HTMLElementSelector[this.currentGame].classList.add("selected")
        this.HTMLElementMainClass.title.innerText = gameDescriptor[this.currentGame].levelTitle
        const nbOptions:number = (<HTMLSelectElement>this.HTMLElementMainClass.selectDifficulty).options.length
        this.HTMLElementMainClass.selectDifficulty.innerHTML = "";
        for(let i:number = 0; i < gameDescriptor[this.currentGame].difficultyDesc.levelParmeterName.length; i ++) {
            let newOption = document.createElement("option");
            newOption.value = `${i}`;
            newOption.text = gameDescriptor[this.currentGame].difficultyDesc.levelParmeterName[i];
            this.HTMLElementMainClass.selectDifficulty.appendChild(newOption)
        }
        this.HTMLElementMainClass.levelDesc.innerHTML = gameDescriptor[this.currentGame].difficultyDesc.levelParameterDesc[0];

    }
    
    setGameSelectListener(){
        document.querySelector(".leftContainer .classicGame")?.addEventListener("click", ()=> {
            this.setGameMode("quiz")
        })

        document.querySelector(".leftContainer .pixelGuess")?.addEventListener("click", ()=> {
            this.setGameMode("pixelGuess")
        })
    }
    
    setEventListener(){
        this.setLevelParameterEventListener()
        this.setPlayButtonEventListener()
        this.setHelpEventListener()
        this.setGameSelectListener()
    }
}

const _mainPage = new mainPage();