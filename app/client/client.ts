interface champCase{
    championDiv: HTMLElement | null
    championSound: HTMLAudioElement
    position:number

}

class quizManager {
    champDivList:Array<champCase>
    championPannel:HTMLElement | null
    private _currentChampSelected:number
    constructor(){
        this.champDivList = [];
        this.championPannel = document.querySelector(".championPannel");
        this.createChampDivs(14);
        this._currentChampSelected = 0;
        this.currentChampSelected = 0;
    }

    public get currentChampSelected() {
        return this._currentChampSelected;
    }
    public set currentChampSelected(nexChamp: number) {
        this.stopChampSound()
        this._currentChampSelected = nexChamp;
        this.playChampSound()
    }

    createChampDivs(nb:number) {
        for(let i:number = 0; i < nb; i++) {
            let champDiv = document.createElement("div");
            champDiv.classList.add("championCase");
            champDiv.classList.add("anonymous");
            champDiv.addEventListener("click", () => {
                this.currentChampSelected = i
            })
            let champCase:champCase = {
                championDiv: champDiv,
                championSound: new Audio(),
                position: i
            }
            this.champDivList.push(champCase);
            this.championPannel?.appendChild(champDiv);
        }
    }

    private playChampSound() {
        console.log("Play champ sound");
        this.champDivList[this._currentChampSelected].championSound.play()
    }

    private stopChampSound() {
        console.log("Stop champ sound");
        this.champDivList[this._currentChampSelected].championSound.pause()
        this.champDivList[this._currentChampSelected].championSound.currentTime = 0;
    }
}

let quiz:quizManager = new quizManager();