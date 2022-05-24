import express, {Router, Request, Response, NextFunction} from "express"

import quizRouterAPI from "./quizRouterAPI";

const router: Router = Router();
router.use("/api", quizRouterAPI);

router.get("/", async (req:Request, res:Response, next:NextFunction) => {
    res.render("quiz/index.ejs")
})
export default router;