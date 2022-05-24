"use strict";
var exports = {};
class quizManager {
    constructor() {
        this.currentTime = "";
        this.nbChamToGuess = 14;
        this.champDivList = [];
        this.championPannel = document.querySelector(".championPannel");
        this.createChampDivs(this.nbChamToGuess);
        this._currentChampSelected = 0;
        this.userGuess = "";
        this.setUserGuess();
        this.setEventListener();
        this.selectChampion(0);
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
        this.unselectChamp();
        this.currentChampSelected = champNumber;
        this.selectChamp();
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
            let champCase = {
                championDiv: champDiv,
                championSound: new Audio("/ressources/audio/test/Pyke_Select.ogg"),
                position: i,
                response: "pyke"
            };
            this.champDivList.push(champCase);
            (_a = this.championPannel) === null || _a === void 0 ? void 0 : _a.appendChild(champDiv);
        }
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
        (_a = this.champDivList[this.currentChampSelected].championDiv) === null || _a === void 0 ? void 0 : _a.classList.remove("selected");
    }
    selectChamp() {
        var _a;
        (_a = this.champDivList[this.currentChampSelected].championDiv) === null || _a === void 0 ? void 0 : _a.classList.add("selected");
    }
    revealChamp() {
        var _a;
        (_a = this.champDivList[this.currentChampSelected].championDiv) === null || _a === void 0 ? void 0 : _a.classList.remove("anonymous");
    }
    checkResponse() {
        var _a;
        if (((_a = this.userGuess) === null || _a === void 0 ? void 0 : _a.toLowerCase()) == this.champDivList[this.currentChampSelected].response) {
            console.log("Yes !");
            this.revealChamp();
            this.goNext();
        }
        this.resetUserGuess();
    }
    setUserGuess() {
        const championInput = document.querySelector(".championInput");
        championInput === null || championInput === void 0 ? void 0 : championInput.addEventListener("input", (e) => {
            this.getUserGuess();
        });
        championInput === null || championInput === void 0 ? void 0 : championInput.addEventListener("keyup", (ev) => {
            if (ev.key === 'Enter' || ev.keyCode === 13) {
                console.log("User guess : " + this.userGuess);
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
    showTime() {
        var date = new Date();
        var m = date.getMinutes(); // 0 - 59
        var s = date.getSeconds(); // 0 - 59
        m = (m < 10) ? 0 + m : m;
        s = (s < 10) ? 0 + s : s;
        var time = m + ":" + s + " ";
        const clock = document.querySelector(".timer .value");
        clock.innerText = time;
        clock.textContent = time;
    }
    goNext() {
        const nextPos = this.currentChampSelected + 1;
        if (nextPos >= this.nbChamToGuess) {
            console.log("Select champ : " + this.currentChampSelected);
            this.selectChampion(this.currentChampSelected);
            return;
        }
        console.log("Select champ : " + nextPos);
        this.selectChampion(nextPos);
    }
    goBack() {
        const nextPos = this.currentChampSelected - 1;
        if (nextPos < 0) {
            console.log("Select champ : " + this.currentChampSelected);
            this.selectChampion(this.currentChampSelected);
            return;
        }
        console.log("Select champ : " + nextPos);
        this.selectChampion(nextPos);
    }
    resetUserGuess() {
        const userGuess = document.querySelector(".championInput");
        userGuess.value = "";
    }
    setEventListener() {
        this.setArrowEventListener();
    }
}
let quiz = new quizManager();
