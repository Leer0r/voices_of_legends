import express, {Router, Request, Response, NextFunction} from "express"

const router: Router = Router();

router.get("/start", async (req,res,next) => {
    res.send("hello !")
})

export default router