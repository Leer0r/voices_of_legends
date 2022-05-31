import express, {Router, Request, Response, NextFunction} from "express"

import quizRouterAPI from "./quizRouterAPI";

const router: Router = Router();
router.use("/api", quizRouterAPI);

router.get("/", async (req:Request, res:Response, next:NextFunction) => {
    let difficulty = req.cookies.difficulty
    console.log(difficulty)
    if(!["facile","moyen","difficile"].includes(difficulty)){
        difficulty = "facile"
    }
    res.render("quiz/index.ejs", {difficulty:difficulty})
})
export default router;