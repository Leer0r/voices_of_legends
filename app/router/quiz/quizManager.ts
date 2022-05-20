class quizManager {
    champDivList:Array<HTMLElement>
    constructor(){
        this.champDivList = [];
    }

    createChampDivs(nb:number) {
        for(let i:number = 0; i < nb; i++) {
            let champDiv = document.createElement("div");
            champDiv.classList.add("championCase");
            champDiv.classList.add("anonymous");
            this.champDivList.push(champDiv);
        }
    }
}