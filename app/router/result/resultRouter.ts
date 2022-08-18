import express, {Router, Request, Response, NextFunction} from "express"
import bodyParser from 'body-parser';

const router: Router = Router();

router.use(express.json())
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post("/", async (req:Request, res:Response, next:NextFunction) =>{
    console.log(req.body);
    res.render("result/index.ejs",{userMin:req.body.userMin,userSec:req.body.userSec})
})

router.get("/", async (req:Request, res:Response, next:NextFunction) =>{
    console.log(req.body);
    res.render("result/index.ejs",{userMin:req.query.userMin,userSec:req.query.userSec});
})

export default router;