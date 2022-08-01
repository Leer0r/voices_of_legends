import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser';


import quizRouter from "./router/quiz/quizRouter"
import resultRouter from "./router/result/resultRouter"
import pixelGuessRouter from "./router/pixelGuess/pixelGuessRouter"
import path from 'path';
import { getAllChampionSkins } from './shared/globalData';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

app.set( "views", path.join( __dirname, "../views" ) );
app.set( "view engine", "ejs" );

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/ressources/css', express.static(path.join(__dirname, '../ressources/CSS')));
app.use('/ressources/images', express.static(path.join(__dirname, '../ressources/images')));
app.use('/ressources/js', express.static(path.join(__dirname,'client')))
app.use('/ressources/audio', express.static(path.join(__dirname,'../ressources/sounds')))

app.use("/quiz",quizRouter);
app.use("/result", resultRouter);
app.use("/pixelGuess", pixelGuessRouter);

app.get('/', (req: Request, res: Response) => {
  res.render("mainPage/mainPage.ejs")
});


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

//getAllChampionSkins()