"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const quizRouterAPI_1 = __importDefault(require("./quizRouterAPI"));
const router = (0, express_1.Router)();
router.use("/api", quizRouterAPI_1.default);
router.get("/", async (req, res, next) => {
    res.render("quiz/index.ejs");
});
exports.default = router;
