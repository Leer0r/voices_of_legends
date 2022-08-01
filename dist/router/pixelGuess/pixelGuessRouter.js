"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", async (req, res, next) => {
    let difficulty = req.query.difficulty.toLowerCase();
    if (!["facile", "moyen", "difficile"].includes(difficulty)) {
        difficulty = "facile";
    }
    res.render("pixelGuess/index.ejs", { difficulty: difficulty });
});
exports.default = router;
