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
class pixelGuess {
    constructor() {
        this.difficulty = "";
        this.guessImage = document.getElementById("guessImage");
        this.allChampSkins = [];
        this.selectedImage = {
            champSkins: {
                id: 0,
                name: "",
                skins: []
            },
            skinNumber: 0
        };
        this.lauchGame();
    }
    pixelizeIMG(sample_size) {
        let c = document.createElement("canvas");
        let img1 = new Image();
        img1.onload = function () {
            var _a;
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
            (_a = document.querySelector(".champToGuess")) === null || _a === void 0 ? void 0 : _a.appendChild(img2);
        };
        const currentImage = document.getElementById("guessImage");
        img1.src = currentImage.src;
    }
    getDifficulty() {
        this.difficulty = document.querySelector(".middle .gameInfo .difficulty .value").innerText;
        console.log(this.difficulty);
    }
    lauchGame() {
        getAllChampSkins()
            .then((result) => {
            this.allChampSkins = result;
            console.log(this.allChampSkins);
            this.getDifficulty();
            this.chooseImage();
            this.pixelGame();
        });
    }
    chooseImage() {
        let champion = getRandomInt(this.allChampSkins.length);
        let championSkin;
        if (this.difficulty == "facile") {
            championSkin = 0;
        }
        else {
            championSkin = 1;
        }
        this.selectedImage.champSkins = this.allChampSkins[champion];
        this.selectedImage.skinNumber = championSkin;
        console.log(this.getSkinPath(this.selectedImage.champSkins.id, this.selectedImage.skinNumber));
    }
    setGuessImage(imgSrc) {
        this.guessImage.src = imgSrc;
    }
    getSkinPath(champId, skinsId) {
        return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes/${champId}/${champId}0${skinsId < 10 ? `0${skinsId}` : `${skinsId}`}.jpg`;
    }
    pixelGame() {
        return __awaiter(this, void 0, void 0, function* () {
            let delay = 1000;
            for (let x = 60; x >= 1; x -= 5 - (x < 7 ? 4 : 0)) {
                setTimeout(() => {
                    this.pixelizeIMG(x);
                }, delay);
                delay += 1000;
            }
        });
    }
}
const _pixelGuess = new pixelGuess();
