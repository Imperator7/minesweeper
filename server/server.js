const express = require('express')
const cors = require('cors')

const Minesweeper = require('./minesweeper')

const app = express()
const port = 4000

app.use(cors())
app.use(express.json())

let game

app.get('/', (req, res) => {
  game = new Minesweeper('easy')
  res.send(game)
})

app.post('/reveal', (req, res) => {
  console.log(req.body)
  // make a endpoint to handle left click or reveal function which return a hint back to it
  // **** make a hint generator in the game class ****
  console.log(game)
  const revealedCell = game.revealCell(req.body['row'], req.body['col'])
  res.json({
    data: revealedCell,
  })
})

app.post('/flag', (req, res) => {
  const flaggedCell = game.flagCell(req.body['row'], req.body['col'])
  res.json({
    cell: flaggedCell,
  })
})

app.listen(port, (req, res) => {
  console.log(`Listening at the ${port}`)
})
