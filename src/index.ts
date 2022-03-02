const bodyParser = require('body-parser');
const express = require('express')
import https from 'https';
import helmet from 'helmet';
import fs from 'fs';
import path from 'path';
import { NextFunction } from 'express';

import { roomsRouter } from "./router/roomsRouter"
import { reservationsRouter } from "./router/reservationRouter"
import { userRouter, secureUserRouter } from "./router/userRouter"
import { check } from "./Controllers/authenticationController"

const app = express()
const port = 3001

app.use(bodyParser.json());

const options = {
  key: fs.readFileSync(path.join(__dirname, '../selfsigned.key')),
  cert: fs.readFileSync(path.join(__dirname, '../selfsigned.crt'))
};
app.use(helmet());


app.use("", userRouter) //Not authenticated

//Very important Authenticate middleware:
app.use((req: any, res: any, next: NextFunction) => {
  check(req, res, next);
})
//Calls to Routers below are authenticated:
app.use("", secureUserRouter) //get all users
app.use("/reservations", reservationsRouter)
app.use("/rooms", roomsRouter)

https.createServer(options, app).listen(port, () => {
  console.log(`Running 'secure-http' on https://localhost:${port}`);
});


