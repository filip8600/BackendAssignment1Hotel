const bodyParser = require('body-parser');
const express = require('express')
import https from 'https';
import helmet from 'helmet';
import fs from 'fs';
import path from 'path';
import {roomsRouter} from "./router/roomsRouter"
import {reservationsRouter} from "./router/reservationRouter"
import {userRouter} from "./router/userRouter"
import {secureUserRouter} from "./router/secureUserRouter"
import { check} from "./Controllers/authenticationController"
import { NextFunction } from 'express';



//var RoomsRouter = require('./router/roomsRouter');

const app = express()
const port = 3001

app.use(bodyParser.json());

const options =  {
  key: fs.readFileSync(path.join(__dirname, '../selfsigned.key')),
  cert: fs.readFileSync(path.join(__dirname, '../selfsigned.crt'))
};
app.use(helmet());

//Rooms router 
 app.use("", userRouter) //Not authenticated

 //Very important Authenticate middleware:
 app.use((req:any, res:any, next:NextFunction) => {
  check(req,res,next);
})

app.use("", secureUserRouter) //get all users

app.use("/reservations",reservationsRouter)
app.use("/rooms",roomsRouter)

https.createServer(options, app).listen(port, () => {
  console.log(`Running 'secure-http' on ${port}`);
});


