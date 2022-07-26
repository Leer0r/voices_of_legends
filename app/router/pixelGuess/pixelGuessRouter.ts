import {Router, Request, Response, NextFunction} from "express"

const router: Router = Router();

router.get("/", async (req:Request, res:Response, next:NextFunction) => {
    let difficulty = (<string>req.query.difficulty).toLowerCase()
    if(!["facile","moyen","difficile"].includes(difficulty)){
        difficulty = "facile"
    }
    res.render("pixelGuess/index.ejs", {difficulty:difficulty})
})

export default router