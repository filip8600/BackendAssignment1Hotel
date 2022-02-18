const bodyParser = require('body-parser');
const express = require('express')
import https from 'https';
import helmet from 'helmet';
import fs from 'fs';

const app = express()
const port = 3001

const options =  {
  key: fs.readFileSync(path.join(__dirname, '../selfsigned.key')),
  cert: fs.readFileSync(path.join(__dirname, '../selfsigned.crt'))
};
app.use(helmet());

app.use(bodyParser.json())
app.use('/orders', require('./controllers/plainController'));
app.get('/hello', (req: any, res: any) => {
  res.send('Hello World!')
})

https.createServer(options, app).listen(port, () => {
  console.log(`Running 'secure-http' on ${port}`);
});
