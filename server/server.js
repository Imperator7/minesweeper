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
  res.json(game)
})

app.post('/reveal', (req, res) => {
  // make a endpoint to handle left click or reveal function which return a hint back to it
  // **** make a hint generator in the game class ****
  const revealedCell = game.revealCell(req.body['row'], req.body['col'])
  if (!revealedCell) {
    throw new Error(`can't reveal this cell.`)
  }

  // for mine cell gonna return only one cell.
  if (revealedCell.result === 'You lose') {
    res.json({
      status: 'success',
      result: 'You found a bomb, please try again.',
      cell: [{ ...revealedCell, isMine: revealedCell.isMine }],
    })
  } else {
    // for hint cells might have many cells in form of array
    const cells = []
    for (let cell of revealedCell) {
      cells.push({ ...cell, hint: cell.hint })
    }
    console.log(cells)
    res.json({
      status: 'success',
      result: `this cell's hint is ${revealedCell.hint}`,
      cell: cells,
    })
  }
})

app.post('/flag', (req, res) => {
  const flaggedCell = game.flagCell(req.body['row'], req.body['col'])
  let cell
  if (flaggedCell.isRevealed) {
    cell = { ...flaggedCell, hint: flaggedCell.hint }
  } else {
    cell = flaggedCell
  }
  res.json({
    status: 'success',
    cell,
  })
})

app.listen(port, (req, res) => {
  console.log(`Listening at the ${port}`)
})
