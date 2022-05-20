"use strict";
class quizManager {
    champDivList;
    constructor() {
        this.champDivList = [];
    }
    createChampDivs(nb) {
        for (let i = 0; i < nb; i++) {
            let champDiv = document.createElement("div");
            champDiv.classList.add("championCase");
            champDiv.classList.add("anonymous");
            this.champDivList.push(champDiv);
        }
    }
}
