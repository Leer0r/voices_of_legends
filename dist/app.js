"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const quizRouter_1 = __importDefault(require("./router/quiz/quizRouter"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
app.set("views", path_1.default.join(__dirname, "../views"));
app.set("view engine", "ejs");
app.use('/ressources/css', express_1.default.static(path_1.default.join(__dirname, '../ressources/CSS')));
app.use('/ressources/images', express_1.default.static(path_1.default.join(__dirname, '../ressources/images')));
app.use("/quiz", quizRouter_1.default);
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
