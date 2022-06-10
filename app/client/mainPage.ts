interface levelDesc {
    levelName:string,
    levelDesc:string
}

const levelParameterDesc:any = [
    "Avec les son de pick des champions",
    "Avec les son de ban des champions",
    "Avec les son de rire des champions"
]

const levelParmeterString:any = [
    "facile",
    "moyen",
    "difficile"
]

const gameDescriptor: {classique:levelDesc} = {
    classique: {
        levelName: "Mode de jeu classique",
        levelDesc: "Devine les champions par leurs son ! Différentes difficultées pour toujours plus de challenge"
    }
}


function setLevelParameterEventListener(){
    let levelParameter:HTMLSelectElement = <HTMLSelectElement>document.querySelector(".levelParameter")
    levelParameter.addEventListener('change', (ev:Event) => {
        const levelParameter:HTMLSelectElement = <HTMLSelectElement>ev.target
        console.log(levelParameter.value)
        const levelDesc:HTMLParagraphElement = <HTMLParagraphElement>document.querySelector(".levelDesc");
        levelDesc.textContent = levelParameterDesc[parseInt(levelParameter.value)];
    })
}

function setPlayButtonEventListener(){
    let lauchGame:HTMLButtonElement = <HTMLButtonElement>document.querySelector(".lauchGame");
    lauchGame.addEventListener("click", () => {
        let difficulty:HTMLSelectElement = <HTMLSelectElement>document.querySelector(".difficulty")
        document.cookie = `difficulty=${levelParmeterString[difficulty.value]}`
        window.location.href = "http://voices_of_legends.games.coffeebreaks.eu/quiz"
    })
}

function displayPopup(desc:levelDesc){
    popupTitle.innerText = desc.levelName
    popupContent.innerText = desc.levelDesc
    popupContainer.style.display = "flex"
}

function setHelpEventListener(){
    document.querySelector(".mainContainer .middle .help")?.addEventListener("click", () => {
        displayPopup(gameDescriptor.classique)
    })
}

function setEventListener(){
    setLevelParameterEventListener()
    setPlayButtonEventListener()
    setHelpEventListener()
}

setEventListener()