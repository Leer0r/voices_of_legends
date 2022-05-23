import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

import quizRouter from "./router/quiz/quizRouter"
import path from 'path';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

app.set( "views", path.join( __dirname, "../views" ) );
app.set( "view engine", "ejs" );

app.use('/ressources/css', express.static(path.join(__dirname, '../ressources/CSS')));
app.use('/ressources/images', express.static(path.join(__dirname, '../ressources/images')));
app.use('/ressources/js', express.static(path.join(__dirname,'client')))

app.use("/quiz",quizRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});