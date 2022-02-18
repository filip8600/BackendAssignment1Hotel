const bodyParser = require('body-parser');
const express = require('express')
import https from 'https';
import helmet from 'helmet';
import fs from 'fs';
import path from 'path';
import { RoomsRouter } from "./router/roomsRouter";

const app = express()
const port = 3001

app.use(express.json());



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
app.use("/users")
app.use("/authentication")
app.use("/rooms",)

https.createServer(options, app).listen(port, () => {
  console.log(`Running 'secure-http' on ${port}`);
});


