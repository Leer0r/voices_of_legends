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
var exports = {};
var quizManager = /** @class */ (function () {
    function quizManager() {
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
            voiceUrl: "plugins/rcp-be-lol-game-data/global/fr_fr/v1/" + this.getCurrentDifficulty(),
            patch: "latest",
            lang: "fr_FR"
        };
        this.gameStarted = false;
        this.currentTime = "";
        this.nbChamToGuess = 1;
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
    Object.defineProperty(quizManager.prototype, "currentChampSelected", {
        get: function () {
            return this._currentChampSelected;
        },
        set: function (nexChamp) {
            this.stopChampSound();
            this._currentChampSelected = nexChamp;
            this.playChampSound();
        },
        enumerable: false,
        configurable: true
    });
    quizManager.prototype.selectChampion = function (champNumber) {
        if (!this.gameStarted) {
            return;
        }
        this.unselectChamp();
        this.currentChampSelected = champNumber;
        this.selectChamp();
        this.focusUserGuess();
    };
    quizManager.prototype.setDifficulty = function () {
        var difficulty = document.querySelector(".difficulty .value");
        this.difficulty = difficulty.innerText;
    };
    quizManager.prototype.getCurrentDifficulty = function () {
        switch (this.difficulty) {
            case "facile":
                return "champion-choose-vo";
            case "moyen":
                return "champion-ban-vo";
            default:
                return "champion-ban-vo";
        }
    };
    quizManager.prototype.createChampDivs = function (nb) {
        var _this = this;
        var _a;
        var _loop_1 = function (i) {
            var champDiv = document.createElement("div");
            champDiv.classList.add("championCase");
            champDiv.classList.add("anonymous");
            champDiv.addEventListener("click", function () {
                _this.selectChampion(i);
            });
            this_1.setMutationObserver(champDiv);
            var audio = new Audio(this_1.getChampionVoiceUrl(this_1.championArray.id[i]));
            audio.muted = false;
            audio.autoplay = false;
            var champCase = {
                championDiv: champDiv,
                championSound: audio,
                position: i,
                response: this_1.championArray.name[i],
                championSplash: this_1.getChampionSplashUrl(this_1.championArray.id[i]),
                championHint: this_1.championArray.hint[i]
            };
            this_1.champDivList.push(champCase);
            (_a = this_1.championPannel) === null || _a === void 0 ? void 0 : _a.appendChild(champDiv);
        };
        var this_1 = this;
        for (var i = 0; i < nb; i++) {
            _loop_1(i);
        }
    };
    quizManager.prototype.suffle = function () {
        var _a, _b, _c;
        var currentIndex = this.championArray.id.length, randomIndex;
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            // And swap it with the current element.
            _a = [
                this.championArray.id[randomIndex], this.championArray.id[currentIndex]
            ], this.championArray.id[currentIndex] = _a[0], this.championArray.id[randomIndex] = _a[1];
            _b = [
                this.championArray.name[randomIndex], this.championArray.name[currentIndex]
            ], this.championArray.name[currentIndex] = _b[0], this.championArray.name[randomIndex] = _b[1];
            _c = [
                this.championArray.hint[randomIndex], this.championArray.hint[currentIndex]
            ], this.championArray.hint[currentIndex] = _c[0], this.championArray.hint[randomIndex] = _c[1];
        }
    };
    quizManager.prototype.getChampInfo = function () {
        var _this = this;
        var url = "http://ddragon.leagueoflegends.com/cdn/12.9.1/data/fr_FR/champion.json";
        fetch(url)
            .then(function (res) { return __awaiter(_this, void 0, void 0, function () {
            var response;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, res.json()];
                    case 1:
                        response = _a.sent();
                        Object.keys(response["data"]).forEach(function (key, index) {
                            _this.championArray.name.push(response["data"][key]["name"].toLowerCase());
                            _this.championArray.id.push(response["data"][key]["key"]);
                            _this.championArray.hint.push(response["data"][key]["title"]);
                        });
                        this.suffle();
                        this.createChampDivs(this.nbChamToGuess);
                        this.gameStarted = true;
                        this.selectChampion(0);
                        this.lauchTimer();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    quizManager.prototype.displayChampHint = function () {
        this.champHint.innerText = this.champDivList[this.currentChampSelected].championHint;
    };
    quizManager.prototype.resetChampHint = function () {
        this.champHint.innerText = "";
    };
    quizManager.prototype.getChampionSplashUrl = function (champNumber) {
        return this.dataPath.baseUrl + "/" + this.dataPath.patch + "/" + this.dataPath.splashUrl + "/" + champNumber + "/" + champNumber + "000.jpg";
    };
    quizManager.prototype.getChampionVoiceUrl = function (champNumber) {
        return this.dataPath.baseUrl + "/" + this.dataPath.patch + "/" + this.dataPath.voiceUrl + "/" + champNumber + ".ogg";
    };
    quizManager.prototype.setMutationObserver = function (element) {
        var callback = function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.type == "attributes") {
                }
            });
        };
        var observer = new MutationObserver(callback);
        observer.observe(element, {
            attributes: true
        });
    };
    quizManager.prototype.getUserGuess = function () {
        var _a;
        this.userGuess = (_a = document.querySelector(".championInput")) === null || _a === void 0 ? void 0 : _a.value;
    };
    quizManager.prototype.playChampSound = function () {
        this.champDivList[this._currentChampSelected].championSound.play();
    };
    quizManager.prototype.stopChampSound = function () {
        this.champDivList[this._currentChampSelected].championSound.pause();
        this.champDivList[this._currentChampSelected].championSound.currentTime = 0;
    };
    quizManager.prototype.unselectChamp = function () {
        var _a;
        if (!this.gameStarted) {
            return;
        }
        (_a = this.champDivList[this._currentChampSelected].championDiv) === null || _a === void 0 ? void 0 : _a.classList.remove("selected");
    };
    quizManager.prototype.selectChamp = function () {
        var _a;
        if (!this.gameStarted) {
            return;
        }
        (_a = this.champDivList[this.currentChampSelected].championDiv) === null || _a === void 0 ? void 0 : _a.classList.add("selected");
    };
    quizManager.prototype.revealChamp = function () {
        var champReveal = this.champDivList[this.currentChampSelected].championDiv;
        champReveal.style.backgroundImage = "url(" + this.champDivList[this.currentChampSelected].championSplash + ")";
        champReveal.classList.remove("anonymous");
    };
    quizManager.prototype.checkResponse = function () {
        var _a;
        if (((_a = this.userGuess) === null || _a === void 0 ? void 0 : _a.toLowerCase()) == this.champDivList[this.currentChampSelected].response) {
            this.revealChamp();
            this.nbChamRemining--;
            this.checkGameFinish();
            this.goNext();
        }
        this.resetUserGuess();
    };
    quizManager.prototype.checkGameFinish = function () {
        if (this.isGameFinish()) {
            this.gameStarted = false;
            this.GoToResult();
        }
    };
    quizManager.prototype.GoToResult = function () {
        var userTime = this.getTime();
        document.cookie = "userMin=" + userTime[0] + "; userSec=" + userTime[0] + "; Secure";
        window.location.href = "http://localhost:3000/result";
    };
    quizManager.prototype.isGameFinish = function () {
        return this.nbChamRemining <= 0;
    };
    quizManager.prototype.setUserGuess = function () {
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
    quizManager.prototype.setArrowEventListener = function () {
        var _this = this;
        var _a, _b;
        (_a = document.querySelector(".goNext")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function (e) {
            _this.goNext();
        });
        (_b = document.querySelector(".goBack")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function (e) {
            _this.goBack();
        });
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
    quizManager.prototype.setChampionHintEventListener = function () {
        var _this = this;
        var hintDiv = document.querySelector(".hint");
        hintDiv.addEventListener("click", function (ev) {
            _this.displayChampHint();
            hintDiv.classList.add("response");
        });
    };
    quizManager.prototype.setRedoSongEventListener = function () {
        var _this = this;
        var _a;
        (_a = document.querySelector(".relauch")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
            _this.playChampSound();
        });
    };
    quizManager.prototype.lauchTimer = function () {
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
    quizManager.prototype.showTime = function () {
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
    quizManager.prototype.getTime = function () {
        return [this.timer.min, this.timer.sec];
    };
    quizManager.prototype.goNext = function () {
        if (!this.gameStarted) {
            return;
        }
        this.resetChampHint();
        var nextPos = (((this.currentChampSelected + 1) % this.nbChamToGuess) + this.nbChamToGuess) % this.nbChamToGuess;
        while (!this.isAnonymous(nextPos)) {
            nextPos = (((nextPos + 1) % this.nbChamToGuess) + this.nbChamToGuess) % this.nbChamToGuess;
        }
        this.selectChampion(nextPos);
    };
    quizManager.prototype.isAnonymous = function (champPos) {
        var _a;
        return (_a = this.champDivList[champPos].championDiv) === null || _a === void 0 ? void 0 : _a.classList.contains("anonymous");
    };
    quizManager.prototype.goBack = function () {
        if (!this.gameStarted) {
            return;
        }
        this.resetChampHint();
        var nextPos = (((this.currentChampSelected - 1) % this.nbChamToGuess) + this.nbChamToGuess) % this.nbChamToGuess;
        while (!this.isAnonymous(nextPos)) {
            nextPos = (((nextPos - 1) % this.nbChamToGuess) + this.nbChamToGuess) % this.nbChamToGuess;
        }
        this.selectChampion(nextPos);
    };
    quizManager.prototype.resetUserGuess = function () {
        var userGuess = document.querySelector(".championInput");
        userGuess.value = "";
    };
    quizManager.prototype.focusUserGuess = function () {
        var userGuess = document.querySelector(".championInput");
        userGuess.focus();
    };
    quizManager.prototype.setEventListener = function () {
        this.setArrowEventListener();
        this.setChampionHintEventListener();
        this.setRedoSongEventListener();
    };
    return quizManager;
}());
var quiz = new quizManager();
