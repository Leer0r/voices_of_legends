var exports:any = {};

interface champCase{
    championDiv: HTMLElement | null
    championSound: HTMLAudioElement
    position:number
    response:string
}

class quizManager {
    champDivList:Array<champCase>
    championPannel:HTMLElement | null
    private _currentChampSelected:number
    userGuess: string | null | undefined
    nbChamToGuess:number
    currentTime:string
    constructor(){
        this.currentTime = ""
        this.nbChamToGuess = 14
        this.champDivList = [];
        this.championPannel = document.querySelector(".championPannel");
        this.createChampDivs(this.nbChamToGuess);
        this._currentChampSelected = 0;
        this.userGuess = ""
        this.setUserGuess();
        this.setEventListener();
        this.selectChampion(0);
    }

    public get currentChampSelected() {
        return this._currentChampSelected;
    }
    public set currentChampSelected(nexChamp: number) {
        this.stopChampSound()
        this._currentChampSelected = nexChamp;
        this.playChampSound()
    }

    public selectChampion(champNumber:number) {
        this.unselectChamp()
        this.currentChampSelected = champNumber;
        this.selectChamp();
    }

    createChampDivs(nb:number) {
        for(let i:number = 0; i < nb; i++) {
            let champDiv = document.createElement("div");
            champDiv.classList.add("championCase");
            champDiv.classList.add("anonymous");
            champDiv.addEventListener("click", () => {
                this.selectChampion(i);
            })
            this.setMutationObserver(champDiv);
            let champCase:champCase = {
                championDiv: champDiv,
                championSound: new Audio("/ressources/audio/test/Pyke_Select.ogg"),
                position: i,
                response: "pyke"
            }
            this.champDivList.push(champCase);
            this.championPannel?.appendChild(champDiv);
        }
    }

    private setMutationObserver(element:HTMLElement){
        const callback =  (mutations:MutationRecord[]) => {
            mutations.forEach((mutation) => {
                if(mutation.type == "attributes"){
                }
            })
        }
        const observer = new MutationObserver(callback);
        observer.observe(element,{
            attributes: true
        })
    }

    private getUserGuess(){
        this.userGuess = (<HTMLInputElement>document.querySelector(".championInput"))?.value;
    }

    private playChampSound() {
        this.champDivList[this._currentChampSelected].championSound.play()
    }

    private stopChampSound() {
        this.champDivList[this._currentChampSelected].championSound.pause()
        this.champDivList[this._currentChampSelected].championSound.currentTime = 0;
    }

    private unselectChamp() {
        this.champDivList[this.currentChampSelected].championDiv?.classList.remove("selected");
    }

    private selectChamp() {
        this.champDivList[this.currentChampSelected].championDiv?.classList.add("selected");
    }

    private revealChamp() {
        this.champDivList[this.currentChampSelected].championDiv?.classList.remove("anonymous");
    }

    private checkResponse() {
        if(this.userGuess?.toLowerCase() == this.champDivList[this.currentChampSelected].response){
            console.log("Yes !");
            this.revealChamp();
            this.goNext();
        }
        this.resetUserGuess();
    }

    private setUserGuess() {
        const championInput:HTMLInputElement | null = document.querySelector(".championInput")
        championInput?.addEventListener("input", (e:Event) => {
            this.getUserGuess()
        })
        championInput?.addEventListener("keyup", (ev:KeyboardEvent) => {
            if (ev.key === 'Enter' || ev.keyCode === 13) {
                console.log("User guess : " + this.userGuess);
                this.checkResponse();
            }
        })
    }

    private setArrowEventListener() {
        document.querySelector(".goNext")?.addEventListener("click",(e:Event) => {
            this.goNext()
        })

        document.querySelector(".goBack")?.addEventListener("click",(e:Event) => {
            this.goBack()
        })
        document.body.addEventListener("keyup", (ev:KeyboardEvent) => {
            if (ev.key === 'arrowLeft' || ev.keyCode === 37) {
                this.goBack()
            }
        })

        document.body.addEventListener("keyup", (ev:KeyboardEvent) => {
            if (ev.key === 'arrowRight' || ev.keyCode === 39) {
                this.goNext()
            }
        })
    }

    private showTime(){
        var date = new Date();
        var m:number = date.getMinutes(); // 0 - 59
        var s:number = date.getSeconds(); // 0 - 59
        
        m = (m < 10) ? 0 + m : m;
        s = (s < 10) ? 0 + s : s;
        
        var time = m + ":" + s + " ";
        const clock = <HTMLInputElement>document.querySelector(".timer .value");
        clock.innerText = time;
        clock.textContent = time;
        
    }

    private goNext(){
        const nextPos = this.currentChampSelected + 1
        if(nextPos >= this.nbChamToGuess){
            console.log("Select champ : " + this.currentChampSelected);
            this.selectChampion(this.currentChampSelected)
            return
        }
        console.log("Select champ : " + nextPos);
        this.selectChampion(nextPos)
    }

    private goBack(){
        const nextPos = this.currentChampSelected - 1
        if(nextPos < 0){
            console.log("Select champ : " + this.currentChampSelected);
            this.selectChampion(this.currentChampSelected)
            return
        }
        console.log("Select champ : " + nextPos);
        this.selectChampion(nextPos)
    }

    private resetUserGuess(){
        const userGuess = <HTMLInputElement>document.querySelector(".championInput")
        userGuess.value = "";
    }

    private setEventListener() {
        this.setArrowEventListener()
    }
}

let quiz:quizManager = new quizManager();