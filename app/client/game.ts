var exports:any = {};

interface champCase{
    championDiv: HTMLElement | null
    championSound: HTMLAudioElement
    position:number
    response:string
    championSplash:string
}

interface timer{
    sec:number,
    min:number
}

interface dataPath {
    baseUrl:string
    splashUrl:string
    voiceUrl:string
    patch:string
    lang:string
}

interface champions{
    name:Array<string>
    id:Array<string>
}

class quizManager {
    champDivList:Array<champCase>
    championPannel:HTMLElement | null
    private _currentChampSelected:number
    userGuess: string | null | undefined
    nbChamToGuess:number
    currentTime:string
    dataPath:dataPath
    championArray:champions
    gameStarted:boolean
    nbChamRemining: number;
    timer:timer;
    constructor(){
        this.dataPath = {
            baseUrl: "https://raw.communitydragon.org",
            splashUrl: "plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes",
            voiceUrl:"plugins/rcp-be-lol-game-data/global/fr_fr/v1/champion-choose-vo",
            patch: "latest",
            lang: "fr_FR"
        }
        this.championArray = {
            id:[],
            name:[]
        }
        this.timer = {
            min: 0,
            sec:0
        }
        this.gameStarted = false
        this.currentTime = ""
        this.nbChamToGuess = 14
        this.nbChamRemining = this.nbChamToGuess
        this.champDivList = [];
        this.championPannel = document.querySelector(".championPannel");
        this.getChampInfo()
        this._currentChampSelected = 0;
        this.userGuess = ""
        this.setUserGuess();
        this.setEventListener();
        this.focusUserGuess()
        this.lauchTimer()
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
        if(!this.gameStarted){
            return
        }
        this.unselectChamp()
        this.currentChampSelected = champNumber;
        this.selectChamp();
        this.focusUserGuess()
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
            let audio:HTMLAudioElement = new Audio(this.getChampionVoiceUrl(this.championArray.id[i]))
            audio.muted = false;
            audio.autoplay = true;
            let champCase:champCase = {
                championDiv: champDiv,
                championSound: audio,
                position: i,
                response: this.championArray.name[i],
                championSplash: this.getChampionSplashUrl(this.championArray.id[i])
            }
            this.champDivList.push(champCase);
            this.championPannel?.appendChild(champDiv);
        }
    }

    private suffle() {
        let currentIndex = this.championArray.id.length,  randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex != 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [this.championArray.id[currentIndex], this.championArray.id[randomIndex]] = [
            this.championArray.id[randomIndex], this.championArray.id[currentIndex]];
            [this.championArray.name[currentIndex], this.championArray.name[randomIndex]] = [
                this.championArray.name[randomIndex], this.championArray.name[currentIndex]];
        }
    }

    

    getChampInfo() {
        const url = "http://ddragon.leagueoflegends.com/cdn/12.9.1/data/en_US/champion.json"
        fetch(url)
        .then(async (res:Response) => {
            const response = await res.json();
            Object.keys(response["data"]).forEach((key,index) => {
                this.championArray.name.push(response["data"][key]["name"].toLowerCase())
                this.championArray.id.push(response["data"][key]["key"])
            })
            this.suffle()
            this.createChampDivs(this.nbChamToGuess);
        })
    }

    getChampionSplashUrl(champNumber:string) : string{
        return `${this.dataPath.baseUrl}/${this.dataPath.patch}/${this.dataPath.splashUrl}/${champNumber}/${champNumber}000.jpg`
    }

    getChampionVoiceUrl(champNumber:string) : string {
        return `${this.dataPath.baseUrl}/${this.dataPath.patch}/${this.dataPath.voiceUrl}/${champNumber}.ogg`
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
        if(!this.gameStarted){
            return
        }
        this.champDivList[this._currentChampSelected].championDiv?.classList.remove("selected");
    }

    private selectChamp() {
        if(!this.gameStarted){
            return
        }
        this.champDivList[this.currentChampSelected].championDiv?.classList.add("selected");
    }

    private revealChamp() {
        const champReveal:HTMLDivElement | null = <HTMLDivElement>this.champDivList[this.currentChampSelected].championDiv
        champReveal.style.backgroundImage = `url(${this.champDivList[this.currentChampSelected].championSplash})`;
        champReveal.classList.remove("anonymous");
    }

    private checkResponse() {
        if(this.userGuess?.toLowerCase() == this.champDivList[this.currentChampSelected].response){
            this.revealChamp();
            this.nbChamRemining --;
            this.checkGameFinish();
            this.goNext();
        }
        this.resetUserGuess();
    }

    private checkGameFinish(){
        if(this.isGameFinish()){
            this.gameStarted = false
            alert("finish !")
        }
    }

    private isGameFinish(){
        return this.nbChamRemining <= 0; 
    }

    private setUserGuess() {
        const championInput:HTMLInputElement | null = document.querySelector(".championInput")
        championInput?.addEventListener("input", (e:Event) => {
            this.getUserGuess()
        })
        championInput?.addEventListener("keyup", (ev:KeyboardEvent) => {
            if (ev.key === 'Enter' || ev.keyCode === 13) {
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

    private setPlayButtonListener() {
        document.querySelector(".playButton")?.addEventListener("click",(e:Event) => {
            this.gameStarted = true
            this.selectChampion(0);
        })
    }

    private async lauchTimer(){
        this.showTime()
        await new Promise(r => setTimeout(r, 1000));
        this.lauchTimer()
    }

    private showTime(){        
        if(this.timer.sec >= 60) {
            this.timer.min ++
            this.timer.sec = 0
        }
        else {
            this.timer.sec ++
        }
        
        var time = this.timer.min + ":" + this.timer.sec + " ";
        const clock = <HTMLInputElement>document.querySelector(".timer .value");
        clock.innerText = time;
        clock.textContent = time;
    }

    private goNext(){
        if(!this.gameStarted){
            return
        }
        let nextPos = (((this.currentChampSelected + 1) % this.nbChamToGuess ) + this.nbChamToGuess ) % this.nbChamToGuess;
        while(!this.isAnonymous(nextPos)){
            nextPos = (((nextPos + 1) % this.nbChamToGuess ) + this.nbChamToGuess ) % this.nbChamToGuess;
        }
        this.selectChampion(nextPos)
    }

    private isAnonymous(champPos:number){
        console.log("anonymous")
        return this.champDivList[champPos].championDiv?.classList.contains("anonymous");
    }

    private goBack(){
        if(!this.gameStarted){
            return
        }
        let nextPos:number = (((this.currentChampSelected - 1) % this.nbChamToGuess ) + this.nbChamToGuess ) % this.nbChamToGuess;
        while(!this.isAnonymous(nextPos)){
            nextPos = (((nextPos - 1) % this.nbChamToGuess ) + this.nbChamToGuess ) % this.nbChamToGuess;
        }
        this.selectChampion(nextPos)
    }

    private resetUserGuess(){
        const userGuess = <HTMLInputElement>document.querySelector(".championInput")
        userGuess.value = "";
    }

    private focusUserGuess(){
        const userGuess:HTMLInputElement = <HTMLInputElement>document.querySelector(".championInput")
        userGuess.focus()
    }

    private setEventListener() {
        this.setArrowEventListener()
        this.setPlayButtonListener()
    }
}

let quiz:quizManager = new quizManager();