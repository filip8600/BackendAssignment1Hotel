const bodyParser = require('body-parser');
const express = require('express')
import https from 'https';
import helmet from 'helmet';
import fs from 'fs';
import path from 'path';
import {roomsRouter} from "./router/roomsRouter"
import {userRouter} from "./router/userRouter"
import {authenticate, check} from "./Controllers/authenticationController"
import { sign, verify } from 'jsonwebtoken'



//var RoomsRouter = require('./router/roomsRouter');

const app = express()
const port = 3001

app.use(bodyParser.json());

const options =  {
  key: fs.readFileSync(path.join(__dirname, '../selfsigned.key')),
  cert: fs.readFileSync(path.join(__dirname, '../selfsigned.crt'))
};
app.use(helmet());

//DUMMY ENDPOINT - DELETE LATER
app.get('/hello', (req: any, res: any) => {
  res.send('Hello World!')
})



//Rooms router 
 app.use("", userRouter)

 //Authenticate:
 app.use((req:any, res:any, next:any) => {
  check(req,res,next);
})

// app.use("/authentication")
app.use("/rooms",roomsRouter)

https.createServer(options, app).listen(port, () => {
  console.log(`Running 'secure-http' on ${port}`);
});


