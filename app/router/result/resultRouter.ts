import express, {Router, Request, Response, NextFunction} from "express"

const router: Router = Router();

router.get("/", async (req:Request, res:Response, next:NextFunction) =>{
    console.log(req.cookies)
    console.log("coucou")
    res.render("result/index.ejs")
})

export default router;