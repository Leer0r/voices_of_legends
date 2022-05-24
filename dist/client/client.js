"use strict";
class quizManager {
    champDivList;
    championPannel;
    _currentChampSelected;
    constructor() {
        this.champDivList = [];
        this.championPannel = document.querySelector(".championPannel");
        this.createChampDivs(14);
        this._currentChampSelected = 0;
        this.currentChampSelected = 0;
    }
    get currentChampSelected() {
        return this._currentChampSelected;
    }
    set currentChampSelected(nexChamp) {
        this.stopChampSound();
        this._currentChampSelected = nexChamp;
        this.playChampSound();
    }
    createChampDivs(nb) {
        for (let i = 0; i < nb; i++) {
            let champDiv = document.createElement("div");
            champDiv.classList.add("championCase");
            champDiv.classList.add("anonymous");
            champDiv.addEventListener("click", () => {
                this.currentChampSelected = i;
            });
            let champCase = {
                championDiv: champDiv,
                championSound: new Audio(),
                position: i
            };
            this.champDivList.push(champCase);
            this.championPannel?.appendChild(champDiv);
        }
    }
    playChampSound() {
        console.log("Play champ sound");
        this.champDivList[this._currentChampSelected].championSound.play();
    }
    stopChampSound() {
        console.log("Stop champ sound");
        this.champDivList[this._currentChampSelected].championSound.pause();
        this.champDivList[this._currentChampSelected].championSound.currentTime = 0;
    }
}
let quiz = new quizManager();
