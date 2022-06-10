"use strict";
exports.__esModule = true;
var express_1 = require("express");
var dotenv_1 = require("dotenv");
var cookie_parser_1 = require("cookie-parser");
var quizRouter_1 = require("./router/quiz/quizRouter");
var resultRouter_1 = require("./router/result/resultRouter");
var path_1 = require("path");
dotenv_1["default"].config();
var app = express_1["default"]();
var port = process.env.PORT || 3001;
app.set("views", path_1["default"].join(__dirname, "../views"));
app.set("view engine", "ejs");
app.use(cookie_parser_1["default"]());
app.use('/ressources/css', express_1["default"].static(path_1["default"].join(__dirname, '../ressources/CSS')));
app.use('/ressources/images', express_1["default"].static(path_1["default"].join(__dirname, '../ressources/images')));
app.use('/ressources/js', express_1["default"].static(path_1["default"].join(__dirname, 'client')));
app.use('/ressources/audio', express_1["default"].static(path_1["default"].join(__dirname, '../ressources/sounds')));
app.use("/quiz", quizRouter_1["default"]);
app.use("/result", resultRouter_1["default"]);
app.get('/', function (req, res) {
    res.render("mainPage/mainPage.ejs");
});
app.listen(port, function () {
    console.log("\u26A1\uFE0F[server]: Server is running at http://localhost:" + port);
});
