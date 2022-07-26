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
        this.pixelGame();
    }
    pixelGuess.prototype.pixelizeIMG = function (sample_size) {
        var c = document.createElement("canvas");
        var img1 = new Image();
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
    };
    pixelGuess.prototype.pixelGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var delay, _loop_1, x;
            var _this = this;
            return __generator(this, function (_a) {
                delay = 1000;
                _loop_1 = function (x) {
                    setTimeout(function () {
                        _this.pixelizeIMG(x);
                    }, delay);
                    delay += 1000;
                };
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
