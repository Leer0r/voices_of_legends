"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", async (req, res, next) => {
    console.log(req.cookies);
    console.log("coucou");
    res.render("result/index.ejs");
});
exports.default = router;
