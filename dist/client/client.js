"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var exports = {};
class quizManager {
    constructor() {
        this.dataPath = {
            baseUrl: "https://raw.communitydragon.org",
            splashUrl: "plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes",
            voiceUrl: "plugins/rcp-be-lol-game-data/global/fr_fr/v1/champion-choose-vo",
            patch: "latest",
            lang: "fr_FR"
        };
        this.championArray = {
            id: [],
            name: []
        };
        this.timer = {
            min: 0,
            sec: 0
        };
        this.gameStarted = false;
        this.currentTime = "";
        this.nbChamToGuess = 14;
        this.nbChamRemining = this.nbChamToGuess;
        this.champDivList = [];
        this.championPannel = document.querySelector(".championPannel");
        this.getChampInfo();
        this._currentChampSelected = 0;
        this.userGuess = "";
        this.setUserGuess();
        this.setEventListener();
        this.focusUserGuess();
        this.lauchTimer();
    }
    launchGame() {
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
    createChampDivs(nb) {
        var _a;
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
            audio.autoplay = true;
            let champCase = {
                championDiv: champDiv,
                championSound: audio,
                position: i,
                response: this.championArray.name[i],
                championSplash: this.getChampionSplashUrl(this.championArray.id[i])
            };
            this.champDivList.push(champCase);
            (_a = this.championPannel) === null || _a === void 0 ? void 0 : _a.appendChild(champDiv);
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
        }
    }
    getChampInfo() {
        const url = "http://ddragon.leagueoflegends.com/cdn/12.9.1/data/en_US/champion.json";
        fetch(url)
            .then((res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield res.json();
            Object.keys(response["data"]).forEach((key, index) => {
                this.championArray.name.push(response["data"][key]["name"].toLowerCase());
                this.championArray.id.push(response["data"][key]["key"]);
            });
            this.suffle();
            this.createChampDivs(this.nbChamToGuess);
        }));
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
        var _a;
        this.userGuess = (_a = document.querySelector(".championInput")) === null || _a === void 0 ? void 0 : _a.value;
    }
    playChampSound() {
        this.champDivList[this._currentChampSelected].championSound.play();
    }
    stopChampSound() {
        this.champDivList[this._currentChampSelected].championSound.pause();
        this.champDivList[this._currentChampSelected].championSound.currentTime = 0;
    }
    unselectChamp() {
        var _a;
        if (!this.gameStarted) {
            return;
        }
        (_a = this.champDivList[this._currentChampSelected].championDiv) === null || _a === void 0 ? void 0 : _a.classList.remove("selected");
    }
    selectChamp() {
        var _a;
        if (!this.gameStarted) {
            return;
        }
        (_a = this.champDivList[this.currentChampSelected].championDiv) === null || _a === void 0 ? void 0 : _a.classList.add("selected");
    }
    revealChamp() {
        const champReveal = this.champDivList[this.currentChampSelected].championDiv;
        champReveal.style.backgroundImage = `url(${this.champDivList[this.currentChampSelected].championSplash})`;
        champReveal.classList.remove("anonymous");
    }
    checkResponse() {
        var _a;
        if (((_a = this.userGuess) === null || _a === void 0 ? void 0 : _a.toLowerCase()) == this.champDivList[this.currentChampSelected].response) {
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
            alert("finish !");
        }
    }
    isGameFinish() {
        return this.nbChamRemining <= 0;
    }
    setUserGuess() {
        const championInput = document.querySelector(".championInput");
        championInput === null || championInput === void 0 ? void 0 : championInput.addEventListener("input", (e) => {
            this.getUserGuess();
        });
        championInput === null || championInput === void 0 ? void 0 : championInput.addEventListener("keyup", (ev) => {
            if (ev.key === 'Enter' || ev.keyCode === 13) {
                this.checkResponse();
            }
        });
    }
    setArrowEventListener() {
        var _a, _b;
        (_a = document.querySelector(".goNext")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", (e) => {
            this.goNext();
        });
        (_b = document.querySelector(".goBack")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", (e) => {
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
    setPlayButtonListener() {
        var _a;
        (_a = document.querySelector(".playButton")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", (e) => {
            this.gameStarted = true;
            this.selectChampion(0);
        });
    }
    lauchTimer() {
        return __awaiter(this, void 0, void 0, function* () {
            this.showTime();
            yield new Promise(r => setTimeout(r, 1000));
            this.lauchTimer();
        });
    }
    showTime() {
        if (this.timer.sec >= 60) {
            this.timer.min++;
            this.timer.sec = 0;
        }
        else {
            this.timer.sec++;
        }
        var time = this.timer.min + ":" + this.timer.sec + " ";
        const clock = document.querySelector(".timer .value");
        clock.innerText = time;
        clock.textContent = time;
    }
    goNext() {
        if (!this.gameStarted) {
            return;
        }
        let nextPos = (((this.currentChampSelected + 1) % this.nbChamToGuess) + this.nbChamToGuess) % this.nbChamToGuess;
        while (!this.isAnonymous(nextPos)) {
            nextPos = (((nextPos + 1) % this.nbChamToGuess) + this.nbChamToGuess) % this.nbChamToGuess;
        }
        this.selectChampion(nextPos);
    }
    isAnonymous(champPos) {
        var _a;
        console.log("anonymous");
        return (_a = this.champDivList[champPos].championDiv) === null || _a === void 0 ? void 0 : _a.classList.contains("anonymous");
    }
    goBack() {
        if (!this.gameStarted) {
            return;
        }
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
        this.setPlayButtonListener();
    }
}
let quiz = new quizManager();
