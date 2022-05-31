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

function setEventListener(){
    setLevelParameterEventListener()
    setPlayButtonEventListener()
}

setEventListener()