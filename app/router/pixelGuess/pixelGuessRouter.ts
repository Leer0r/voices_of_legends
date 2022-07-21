import {Router, Request, Response, NextFunction} from "express"

const router: Router = Router();

router.get("/", async (req:Request, res:Response, next:NextFunction) => {
    res.render("pixelGuess/index.ejs")
})

export default router