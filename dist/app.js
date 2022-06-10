"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const quizRouter_1 = __importDefault(require("./router/quiz/quizRouter"));
const resultRouter_1 = __importDefault(require("./router/result/resultRouter"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
app.set("views", path_1.default.join(__dirname, "../views"));
app.set("view engine", "ejs");
app.use((0, cookie_parser_1.default)());
app.use('/ressources/css', express_1.default.static(path_1.default.join(__dirname, '../ressources/CSS')));
app.use('/ressources/images', express_1.default.static(path_1.default.join(__dirname, '../ressources/images')));
app.use('/ressources/js', express_1.default.static(path_1.default.join(__dirname, 'client')));
app.use('/ressources/audio', express_1.default.static(path_1.default.join(__dirname, '../ressources/sounds')));
app.use("/quiz", quizRouter_1.default);
app.use("/result", resultRouter_1.default);
app.get('/', (req, res) => {
    res.render("mainPage/mainPage.ejs");
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});