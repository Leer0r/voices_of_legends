"use strict";
class quizManager {
    champDivList;
    championPannel;
    constructor() {
        this.champDivList = [];
        this.championPannel = document.querySelector(".championPannel");
        this.createChampDivs(14);
    }
    createChampDivs(nb) {
        for (let i = 0; i < nb; i++) {
            let champDiv = document.createElement("div");
            champDiv.classList.add("championCase");
            champDiv.classList.add("anonymous");
            this.champDivList.push(champDiv);
            this.championPannel?.appendChild(champDiv);
        }
    }
}
let quiz = new quizManager();
