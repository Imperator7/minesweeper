const express = require('express')
const cors = require('cors')

const Minesweeper = require('./minesweeper')

const app = express()
const port = 4000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  const game = new Minesweeper('easy')
  res.send(game)
})

app.listen(port, (req, res) => {
  console.log(`Listening at the ${port}`)
})
