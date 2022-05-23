class quizManager {
    champDivList:Array<HTMLElement>
    championPannel:HTMLElement | null
    constructor(){
        this.champDivList = [];
        this.championPannel = document.querySelector(".championPannel");
        this.createChampDivs(14);
    }

    createChampDivs(nb:number) {
        for(let i:number = 0; i < nb; i++) {
            let champDiv = document.createElement("div");
            champDiv.classList.add("championCase");
            champDiv.classList.add("anonymous");
            this.champDivList.push(champDiv);
            this.championPannel?.appendChild(champDiv);
        }
    }
}

let quiz:quizManager = new quizManager();