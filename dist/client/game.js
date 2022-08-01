"use strict";
var exports = {};
class quizManager {
    champDivList;
    championPannel;
    _currentChampSelected;
    userGuess;
    nbChamToGuess;
    currentTime;
    dataPath;
    championArray;
    gameStarted;
    nbChamRemining;
    timer;
    champHint;
    difficulty;
    constructor() {
        this.championArray = {
            id: [],
            name: [],
            hint: []
        };
        this.timer = {
            min: 0,
            sec: 0
        };
        this.difficulty = "";
        this.setDifficulty();
        this.dataPath = {
            baseUrl: "https://raw.communitydragon.org",
            splashUrl: "plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes",
            voiceUrl: `plugins/rcp-be-lol-game-data/global/fr_fr/v1/${this.getCurrentDifficulty()}`,
            patch: "latest",
            lang: "fr_FR"
        };
        this.gameStarted = false;
        this.currentTime = "";
        this.nbChamToGuess = 14;
        this.nbChamRemining = this.nbChamToGuess;
        this.champDivList = [];
        this.championPannel = document.querySelector(".championPannel");
        this._currentChampSelected = 0;
        this.userGuess = "";
        this.champHint = document.querySelector(".champHint");
        this.setUserGuess();
        this.setEventListener();
        this.focusUserGuess();
        this.getChampInfo();
    }
    get currentChampSelected() {
        return this._currentChampSelected;
    }
    set currentChampSelected(nexChamp) {
        this.stopChampSound();
        this._currentChampSelected = nexChamp;
        this.playChampSound();
    }
    selectChampion(champNumber) {
        if (!this.gameStarted) {
            return;
        }
        this.unselectChamp();
        this.currentChampSelected = champNumber;
        this.selectChamp();
        this.focusUserGuess();
    }
    setDifficulty() {
        const difficulty = document.querySelector(".difficulty .value");
        this.difficulty = difficulty.innerText;
    }
    getCurrentDifficulty() {
        switch (this.difficulty) {
            case "facile":
                return "champion-choose-vo";
            case "moyen":
                return "champion-ban-vo";
            default:
                return "champion-ban-vo";
        }
    }
    createChampDivs(nb) {
        for (let i = 0; i < nb; i++) {
            let champDiv = document.createElement("div");
            champDiv.classList.add("championCase");
            champDiv.classList.add("anonymous");
            champDiv.addEventListener("click", () => {
                this.selectChampion(i);
            });
            this.setMutationObserver(champDiv);
            let audio = new Audio(this.getChampionVoiceUrl(this.championArray.id[i]));
            audio.muted = false;
            audio.autoplay = false;
            let champCase = {
                championDiv: champDiv,
                championSound: audio,
                position: i,
                response: this.championArray.name[i],
                championSplash: this.getChampionSplashUrl(this.championArray.id[i]),
                championHint: this.championArray.hint[i]
            };
            this.champDivList.push(champCase);
            this.championPannel?.appendChild(champDiv);
        }
    }
    suffle() {
        let currentIndex = this.championArray.id.length, randomIndex;
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            // And swap it with the current element.
            [this.championArray.id[currentIndex], this.championArray.id[randomIndex]] = [
                this.championArray.id[randomIndex], this.championArray.id[currentIndex]
            ];
            [this.championArray.name[currentIndex], this.championArray.name[randomIndex]] = [
                this.championArray.name[randomIndex], this.championArray.name[currentIndex]
            ];
            [this.championArray.hint[currentIndex], this.championArray.hint[randomIndex]] = [
                this.championArray.hint[randomIndex], this.championArray.hint[currentIndex]
            ];
        }
    }
    getChampInfo() {
        const url = "http://ddragon.leagueoflegends.com/cdn/12.9.1/data/fr_FR/champion.json";
        fetch(url)
            .then(async (res) => {
            const response = await res.json();
            Object.keys(response["data"]).forEach((key, index) => {
                this.championArray.name.push(response["data"][key]["name"].toLowerCase());
                this.championArray.id.push(response["data"][key]["key"]);
                this.championArray.hint.push(response["data"][key]["title"]);
            });
            this.suffle();
            this.createChampDivs(this.nbChamToGuess);
            this.gameStarted = true;
            this.selectChampion(0);
            this.lauchTimer();
        });
    }
    displayChampHint() {
        this.champHint.innerText = this.champDivList[this.currentChampSelected].championHint;
    }
    resetChampHint() {
        this.champHint.innerText = "";
    }
    getChampionSplashUrl(champNumber) {
        return `${this.dataPath.baseUrl}/${this.dataPath.patch}/${this.dataPath.splashUrl}/${champNumber}/${champNumber}000.jpg`;
    }
    getChampionVoiceUrl(champNumber) {
        return `${this.dataPath.baseUrl}/${this.dataPath.patch}/${this.dataPath.voiceUrl}/${champNumber}.ogg`;
    }
    setMutationObserver(element) {
        const callback = (mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type == "attributes") {
                }
            });
        };
        const observer = new MutationObserver(callback);
        observer.observe(element, {
            attributes: true
        });
    }
    getUserGuess() {
        this.userGuess = document.querySelector(".championInput")?.value;
    }
    playChampSound() {
        this.champDivList[this._currentChampSelected].championSound.play();
    }
    stopChampSound() {
        this.champDivList[this._currentChampSelected].championSound.pause();
        this.champDivList[this._currentChampSelected].championSound.currentTime = 0;
    }
    unselectChamp() {
        if (!this.gameStarted) {
            return;
        }
        this.champDivList[this._currentChampSelected].championDiv?.classList.remove("selected");
    }
    selectChamp() {
        if (!this.gameStarted) {
            return;
        }
        this.champDivList[this.currentChampSelected].championDiv?.classList.add("selected");
    }
    revealChamp() {
        const champReveal = this.champDivList[this.currentChampSelected].championDiv;
        champReveal.style.backgroundImage = `url(${this.champDivList[this.currentChampSelected].championSplash})`;
        champReveal.classList.remove("anonymous");
    }
    checkResponse() {
        if (this.userGuess?.toLowerCase() == this.champDivList[this.currentChampSelected].response) {
            this.revealChamp();
            this.nbChamRemining--;
            this.checkGameFinish();
            this.goNext();
        }
        this.resetUserGuess();
    }
    checkGameFinish() {
        if (this.isGameFinish()) {
            this.gameStarted = false;
            this.GoToResult();
        }
    }
    GoToResult() {
        const userTime = this.getTime();
        document.cookie = `userMin=${userTime[0]}; userSec=${userTime[0]}; Secure`;
        window.location.href = "http://localhost:3000/result";
    }
    isGameFinish() {
        return this.nbChamRemining <= 0;
    }
    setUserGuess() {
        const championInput = document.querySelector(".championInput");
        championInput?.addEventListener("input", (e) => {
            this.getUserGuess();
        });
        championInput?.addEventListener("keyup", (ev) => {
            if (ev.key === 'Enter' || ev.keyCode === 13) {
                this.checkResponse();
            }
        });
    }
    setArrowEventListener() {
        document.querySelector(".goNext")?.addEventListener("click", (e) => {
            this.goNext();
        });
        document.querySelector(".goBack")?.addEventListener("click", (e) => {
            this.goBack();
        });
        document.body.addEventListener("keyup", (ev) => {
            if (ev.key === 'arrowLeft' || ev.keyCode === 37) {
                this.goBack();
            }
        });
        document.body.addEventListener("keyup", (ev) => {
            if (ev.key === 'arrowRight' || ev.keyCode === 39) {
                this.goNext();
            }
        });
    }
    setChampionHintEventListener() {
        const hintDiv = document.querySelector(".hint");
        hintDiv.addEventListener("click", (ev) => {
            this.displayChampHint();
            hintDiv.classList.add("response");
        });
    }
    setRedoSongEventListener() {
        document.querySelector(".relauch")?.addEventListener("click", () => {
            this.playChampSound();
        });
    }
    async lauchTimer() {
        if (!this.gameStarted) {
            return;
        }
        this.showTime();
        await new Promise(r => setTimeout(r, 1000));
        this.lauchTimer();
    }
    showTime() {
        if (this.timer.sec >= 60) {
            this.timer.min++;
            this.timer.sec = 0;
        }
        else {
            this.timer.sec++;
        }
        var time = `${this.timer.min < 10 ? "0" : ""}${this.timer.min}:${this.timer.sec < 10 ? "0" : ""}${this.timer.sec}`;
        const clock = document.querySelector(".timer .value");
        clock.innerText = time;
        clock.textContent = time;
    }
    getTime() {
        return [this.timer.min, this.timer.sec];
    }
    goNext() {
        if (!this.gameStarted) {
            return;
        }
        this.resetChampHint();
        let nextPos = (((this.currentChampSelected + 1) % this.nbChamToGuess) + this.nbChamToGuess) % this.nbChamToGuess;
        while (!this.isAnonymous(nextPos)) {
            nextPos = (((nextPos + 1) % this.nbChamToGuess) + this.nbChamToGuess) % this.nbChamToGuess;
        }
        this.selectChampion(nextPos);
    }
    isAnonymous(champPos) {
        return this.champDivList[champPos].championDiv?.classList.contains("anonymous");
    }
    goBack() {
        if (!this.gameStarted) {
            return;
        }
        this.resetChampHint();
        let nextPos = (((this.currentChampSelected - 1) % this.nbChamToGuess) + this.nbChamToGuess) % this.nbChamToGuess;
        while (!this.isAnonymous(nextPos)) {
            nextPos = (((nextPos - 1) % this.nbChamToGuess) + this.nbChamToGuess) % this.nbChamToGuess;
        }
        this.selectChampion(nextPos);
    }
    resetUserGuess() {
        const userGuess = document.querySelector(".championInput");
        userGuess.value = "";
    }
    focusUserGuess() {
        const userGuess = document.querySelector(".championInput");
        userGuess.focus();
    }
    setEventListener() {
        this.setArrowEventListener();
        this.setChampionHintEventListener();
        this.setRedoSongEventListener();
    }
}
let quiz = new quizManager();
