const levelParameterDesc:any = [
    "",
    "Avec les son de pick des champions",
    "Avec les son de ban des champions",
    "Avec les son de rire des champions"
]

function setLevelParameterEventListener(){
    document.querySelector(".levelParameter")?.addEventListener('change', (ev:Event) => {
        const levelParameter:HTMLSelectElement = <HTMLSelectElement>ev.target
        console.log(levelParameter.value)
        const levelDesc:HTMLParagraphElement = <HTMLParagraphElement>document.querySelector(".levelDesc");
        levelDesc.textContent = levelParameterDesc[parseInt(levelParameter.value)];
    })
}

function setEventListener(){
    setLevelParameterEventListener()

}

setEventListener()