"use strict";
class pixelGuess {
    difficulty = "";
    userGuess = "";
    userInput = document.querySelector(".middle");
    guessImage = document.getElementById("guessImage");
    allChampSkins = [];
    selectedImages = [];
    nbChampToGuess = 9;
    championIdArray = [];
    currentChampSelected = 0;
    nbChamRemining = this.nbChampToGuess;
    gameStarted = false;
    intervalArray = [];
    timer = {
        min: 0,
        sec: 0
    };
    constructor() {
        this.lauchGame();
    }
    pixelizeIMG(sample_size) {
        let c = document.createElement("canvas");
        let img1 = new Image();
        img1.crossOrigin = "unknown";
        img1.onload = function () {
            const w = img1.width;
            const h = img1.height;
            c.width = w;
            c.height = h;
            const ctx = c.getContext('2d');
            ctx.drawImage(img1, 0, 0);
            //continue the image processing
            let pixelArr = ctx.getImageData(0, 0, w, h).data;
            for (let y = 0; y < h; y += sample_size) {
                for (let x = 0; x < w; x += sample_size) {
                    let p = (x + (y * w)) * 4;
                    ctx.fillStyle = "rgba(" + pixelArr[p] + "," + pixelArr[p + 1] + "," + pixelArr[p + 2] + "," + pixelArr[p + 3] + ")";
                    ctx.fillRect(x, y, sample_size, sample_size);
                }
            }
            const potentialCanvas = document.getElementById("canvasIMG");
            if (potentialCanvas != null) {
                potentialCanvas.remove();
            }
            let img2 = new Image();
            img2.src = c.toDataURL("image/jpeg");
            img2.width = 800;
            img2.id = "canvasIMG";
            document.querySelector(".champToGuess")?.appendChild(img2);
        };
        const currentImage = document.getElementById("guessImage");
        img1.src = currentImage.src;
        this.intervalArray.shift();
    }
    getDifficulty() {
        this.difficulty = document.querySelector(".middle .gameInfo .difficulty .value").innerText;
    }
    lauchGame() {
        this.setUserGuess();
        this.setEventListener();
        getNbChampSkins(this.nbChampToGuess)
            .then(async (result) => {
            this.allChampSkins = result;
            this.championIdArray = await getAllChampId();
            this.getDifficulty();
            this.gameStarted = true;
            this.chooseImages();
            this.lauchTimer();
            this.pixelGame();
        });
    }
    getUserGuess() {
        this.userGuess = document.querySelector(".championInput")?.value;
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
    removeInterval() {
        for (let i = 0; i < this.intervalArray.length; i++) {
            clearTimeout(this.intervalArray[i]);
        }
    }
    resetUserGuess() {
        const userGuess = document.querySelector(".championInput");
        userGuess.value = "";
    }
    isAnonymous(champPos) {
        return this.selectedImages[this.currentChampSelected].indicatorLink.classList.contains("selected");
    }
    unselectChamp() {
        if (!this.gameStarted) {
            return;
        }
        this.removeInterval();
        this.selectedImages[this.currentChampSelected].indicatorLink.classList.remove("selected");
    }
    setEventListener() {
        this.setArrowEventListener();
    }
    focusUserGuess() {
        const userGuess = document.querySelector(".championInput");
        userGuess.focus();
    }
    setArrowEventListener() {
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
    selectChamp() {
        if (!this.gameStarted) {
            return;
        }
        this.setGuessImage(this.getSkinPath(this.selectedImages[this.currentChampSelected].champSkins.id, this.selectedImages[this.currentChampSelected].skinNumber));
        this.selectedImages[this.currentChampSelected].indicatorLink.classList.add("selected");
        this.pixelGame();
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
    goNext() {
        if (!this.gameStarted) {
            return;
        }
        let nextPos = (((this.currentChampSelected + 1) % this.nbChampToGuess) + this.nbChampToGuess) % this.nbChampToGuess;
        while (!this.isAnonymous(nextPos)) {
            nextPos = (((nextPos + 1) % this.nbChampToGuess) + this.nbChampToGuess) % this.nbChampToGuess;
        }
        this.selectChampion(nextPos);
    }
    goBack() {
        if (!this.gameStarted) {
            return;
        }
        let nextPos = (((this.currentChampSelected - 1) % this.nbChampToGuess) + this.nbChampToGuess) % this.nbChampToGuess;
        while (!this.isAnonymous(nextPos)) {
            nextPos = (((nextPos - 1) % this.nbChampToGuess) + this.nbChampToGuess) % this.nbChampToGuess;
        }
        this.selectChampion(nextPos);
    }
    isGameFinish() {
        return this.nbChamRemining <= 0;
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
    checkGameFinish() {
        if (this.isGameFinish()) {
            this.gameStarted = false;
            //this.GoToResult()
        }
    }
    goodResponse() {
        this.selectedImages[this.currentChampSelected].indicatorLink.classList.add("complete");
        this.nbChamRemining--;
    }
    checkResponse() {
        if (this.userGuess?.toLowerCase() == this.selectedImages[this.currentChampSelected].guessName) {
            this.goodResponse();
            this.checkGameFinish();
            this.goNext();
        }
        this.resetUserGuess();
    }
    putPoint() {
        for (let i = 0; i < this.nbChampToGuess; i++) {
        }
    }
    chooseImages() {
        for (let i = 0; i < this.nbChampToGuess; i++) {
            const indicator = document.createElement("div");
            indicator.classList.add("indicator");
            document.querySelector(".bottom .guessChampIndicator")?.appendChild(indicator);
            this.selectedImages[i] = {
                champSkins: {
                    id: 0,
                    name: "",
                    skins: []
                },
                guessName: "",
                skinNumber: 0,
                indicatorLink: indicator
            };
            let champion = i;
            let championSkin;
            this.selectedImages[i].champSkins = this.allChampSkins[champion];
            if (this.difficulty == "facile") {
                championSkin = 0;
                this.selectedImages[i].guessName = this.allChampSkins[champion].name;
            }
            else if (this.difficulty == "moyen") {
                championSkin = getRandomInt(this.selectedImages[i].champSkins.skins.length - 2) + 1;
                this.selectedImages[i].guessName = this.allChampSkins[champion].name;
            }
            else {
                championSkin = getRandomInt(this.selectedImages[i].champSkins.skins.length - 2) + 1;
                this.selectedImages[i].guessName = this.allChampSkins[champion].skins[championSkin].name;
            }
            this.selectedImages[i].skinNumber = this.allChampSkins[champion].skins[championSkin].id;
        }
        this.selectChampion(this.currentChampSelected);
    }
    setGuessImage(imgSrc) {
        this.guessImage.src = imgSrc;
    }
    getSkinPath(champId, skinsId) {
        return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes/${champId}/${skinsId}.jpg`;
    }
    async pixelGame() {
        let delay = 1000;
        for (let x = 60; x >= 1; x -= 5 - (x < 7 ? 4 : 0)) {
            const newTimeout = setTimeout(() => {
                this.pixelizeIMG(x);
            }, delay);
            this.intervalArray.push(newTimeout);
            delay += 1000;
        }
    }
}
const _pixelGuess = new pixelGuess();
