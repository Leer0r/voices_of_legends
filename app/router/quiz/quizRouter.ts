import express, {Router, Request, Response, NextFunction} from "express"

const router: Router = Router();

router.get("/", async (req:Request, res:Response, next:NextFunction) => {
    res.render("quiz/index.ejs")
})
export default router;