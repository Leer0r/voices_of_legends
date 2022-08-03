var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var pixelGuess = /** @class */ (function () {
    function pixelGuess() {
        this.difficulty = "";
        this.userGuess = "";
        this.userInput = document.querySelector(".middle");
        this.guessImage = document.getElementById("guessImage");
        this.allChampSkins = [];
        this.selectedImages = [];
        this.nbChampToGuess = 9;
        this.championIdArray = [];
        this.currentChampSelected = 0;
        this.nbChamRemining = this.nbChampToGuess;
        this.gameStarted = false;
        this.intervalArray = [];
        this.timer = {
            min: 0,
            sec: 0
        };
        this.lauchGame();
    }
    pixelGuess.prototype.pixelizeIMG = function (sample_size) {
        var c = document.createElement("canvas");
        var img1 = new Image();
        img1.crossOrigin = "unknown";
        img1.onload = function () {
            var _a;
            var w = img1.width;
            var h = img1.height;
            c.width = w;
            c.height = h;
            var ctx = c.getContext('2d');
            ctx.drawImage(img1, 0, 0);
            //continue the image processing
            var pixelArr = ctx.getImageData(0, 0, w, h).data;
            for (var y = 0; y < h; y += sample_size) {
                for (var x = 0; x < w; x += sample_size) {
                    var p = (x + (y * w)) * 4;
                    ctx.fillStyle = "rgba(" + pixelArr[p] + "," + pixelArr[p + 1] + "," + pixelArr[p + 2] + "," + pixelArr[p + 3] + ")";
                    ctx.fillRect(x, y, sample_size, sample_size);
                }
            }
            var potentialCanvas = document.getElementById("canvasIMG");
            if (potentialCanvas != null) {
                potentialCanvas.remove();
            }
            var img2 = new Image();
            img2.src = c.toDataURL("image/jpeg");
            img2.width = 800;
            img2.id = "canvasIMG";
            (_a = document.querySelector(".champToGuess")) === null || _a === void 0 ? void 0 : _a.appendChild(img2);
        };
        var currentImage = document.getElementById("guessImage");
        img1.src = currentImage.src;
        this.intervalArray.shift();
    };
    pixelGuess.prototype.getDifficulty = function () {
        this.difficulty = document.querySelector(".middle .gameInfo .difficulty .value").innerText;
    };
    pixelGuess.prototype.lauchGame = function () {
        var _this = this;
        this.setUserGuess();
        this.setEventListener();
        getNbChampSkins(this.nbChampToGuess)
            .then(function (result) { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.allChampSkins = result;
                        _a = this;
                        return [4 /*yield*/, getAllChampId()];
                    case 1:
                        _a.championIdArray = _b.sent();
                        this.getDifficulty();
                        this.gameStarted = true;
                        this.chooseImages();
                        this.lauchTimer();
                        this.pixelGame();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    pixelGuess.prototype.getUserGuess = function () {
        var _a;
        this.userGuess = (_a = document.querySelector(".championInput")) === null || _a === void 0 ? void 0 : _a.value;
    };
    pixelGuess.prototype.setUserGuess = function () {
        var _this = this;
        var championInput = document.querySelector(".championInput");
        championInput === null || championInput === void 0 ? void 0 : championInput.addEventListener("input", function (e) {
            _this.getUserGuess();
        });
        championInput === null || championInput === void 0 ? void 0 : championInput.addEventListener("keyup", function (ev) {
            if (ev.key === 'Enter' || ev.keyCode === 13) {
                _this.checkResponse();
            }
        });
    };
    pixelGuess.prototype.removeInterval = function () {
        for (var i = 0; i < this.intervalArray.length; i++) {
            clearTimeout(this.intervalArray[i]);
        }
    };
    pixelGuess.prototype.resetUserGuess = function () {
        var userGuess = document.querySelector(".championInput");
        userGuess.value = "";
    };
    pixelGuess.prototype.isAnonymous = function (champPos) {
        return this.selectedImages[this.currentChampSelected].indicatorLink.classList.contains("selected");
    };
    pixelGuess.prototype.unselectChamp = function () {
        if (!this.gameStarted) {
            return;
        }
        this.removeInterval();
        this.selectedImages[this.currentChampSelected].indicatorLink.classList.remove("selected");
    };
    pixelGuess.prototype.setEventListener = function () {
        this.setArrowEventListener();
    };
    pixelGuess.prototype.focusUserGuess = function () {
        var userGuess = document.querySelector(".championInput");
        userGuess.focus();
    };
    pixelGuess.prototype.setArrowEventListener = function () {
        var _this = this;
        document.body.addEventListener("keyup", function (ev) {
            if (ev.key === 'arrowLeft' || ev.keyCode === 37) {
                _this.goBack();
            }
        });
        document.body.addEventListener("keyup", function (ev) {
            if (ev.key === 'arrowRight' || ev.keyCode === 39) {
                _this.goNext();
            }
        });
    };
    pixelGuess.prototype.selectChamp = function () {
        if (!this.gameStarted) {
            return;
        }
        this.setGuessImage(this.getSkinPath(this.selectedImages[this.currentChampSelected].champSkins.id, this.selectedImages[this.currentChampSelected].skinNumber));
        this.selectedImages[this.currentChampSelected].indicatorLink.classList.add("selected");
        this.pixelGame();
    };
    pixelGuess.prototype.selectChampion = function (champNumber) {
        if (!this.gameStarted) {
            return;
        }
        this.unselectChamp();
        this.currentChampSelected = champNumber;
        this.selectChamp();
        this.focusUserGuess();
    };
    pixelGuess.prototype.goNext = function () {
        if (!this.gameStarted) {
            return;
        }
        var nextPos = (((this.currentChampSelected + 1) % this.nbChampToGuess) + this.nbChampToGuess) % this.nbChampToGuess;
        while (!this.isAnonymous(nextPos)) {
            nextPos = (((nextPos + 1) % this.nbChampToGuess) + this.nbChampToGuess) % this.nbChampToGuess;
        }
        this.selectChampion(nextPos);
    };
    pixelGuess.prototype.goBack = function () {
        if (!this.gameStarted) {
            return;
        }
        var nextPos = (((this.currentChampSelected - 1) % this.nbChampToGuess) + this.nbChampToGuess) % this.nbChampToGuess;
        while (!this.isAnonymous(nextPos)) {
            nextPos = (((nextPos - 1) % this.nbChampToGuess) + this.nbChampToGuess) % this.nbChampToGuess;
        }
        this.selectChampion(nextPos);
    };
    pixelGuess.prototype.isGameFinish = function () {
        return this.nbChamRemining <= 0;
    };
    pixelGuess.prototype.lauchTimer = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.gameStarted) {
                            return [2 /*return*/];
                        }
                        this.showTime();
                        return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 1000); })];
                    case 1:
                        _a.sent();
                        this.lauchTimer();
                        return [2 /*return*/];
                }
            });
        });
    };
    pixelGuess.prototype.showTime = function () {
        if (this.timer.sec >= 60) {
            this.timer.min++;
            this.timer.sec = 0;
        }
        else {
            this.timer.sec++;
        }
        var time = "" + (this.timer.min < 10 ? "0" : "") + this.timer.min + ":" + (this.timer.sec < 10 ? "0" : "") + this.timer.sec;
        var clock = document.querySelector(".timer .value");
        clock.innerText = time;
        clock.textContent = time;
    };
    pixelGuess.prototype.checkGameFinish = function () {
        if (this.isGameFinish()) {
            this.gameStarted = false;
            //this.GoToResult()
        }
    };
    pixelGuess.prototype.goodResponse = function () {
        this.selectedImages[this.currentChampSelected].indicatorLink.classList.add("complete");
        this.nbChamRemining--;
    };
    pixelGuess.prototype.checkResponse = function () {
        var _a;
        if (((_a = this.userGuess) === null || _a === void 0 ? void 0 : _a.toLowerCase()) == this.selectedImages[this.currentChampSelected].guessName) {
            this.goodResponse();
            this.checkGameFinish();
            this.goNext();
        }
        this.resetUserGuess();
    };
    pixelGuess.prototype.putPoint = function () {
        for (var i = 0; i < this.nbChampToGuess; i++) {
        }
    };
    pixelGuess.prototype.chooseImages = function () {
        var _a;
        for (var i = 0; i < this.nbChampToGuess; i++) {
            var indicator = document.createElement("div");
            indicator.classList.add("indicator");
            (_a = document.querySelector(".bottom .guessChampIndicator")) === null || _a === void 0 ? void 0 : _a.appendChild(indicator);
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
            var champion = i;
            var championSkin = void 0;
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
    };
    pixelGuess.prototype.setGuessImage = function (imgSrc) {
        this.guessImage.src = imgSrc;
    };
    pixelGuess.prototype.getSkinPath = function (champId, skinsId) {
        return "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes/" + champId + "/" + skinsId + ".jpg";
    };
    pixelGuess.prototype.pixelGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var delay, _loop_1, this_1, x;
            var _this = this;
            return __generator(this, function (_a) {
                delay = 1000;
                _loop_1 = function (x) {
                    var newTimeout = setTimeout(function () {
                        _this.pixelizeIMG(x);
                    }, delay);
                    this_1.intervalArray.push(newTimeout);
                    delay += 1000;
                };
                this_1 = this;
                for (x = 60; x >= 1; x -= 5 - (x < 7 ? 4 : 0)) {
                    _loop_1(x);
                }
                return [2 /*return*/];
            });
        });
    };
    return pixelGuess;
}());
var _pixelGuess = new pixelGuess();
