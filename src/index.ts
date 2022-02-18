const bodyParser = require('body-parser');

const express = require('express')
const app = express()
const port = 3001

app.use(bodyParser.json())
app.use('/orders', require('./controllers/plainController'));
app.get('/hello', (req: any, res: any) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
