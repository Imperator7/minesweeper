class Cell {
  constructor() {
    this.isRevealed = false
    this.isFlagged = false
    this.isMine = false
    this.hint = 0
  }

  mine() {
    this.isMine = true
  }

  reveal() {
    this.isRevealed = true
  }

  flag() {
    this.isFlagged = !this.isFlagged
  }
}

class Minesweeper {
  constructor(difficulty) {
    if (difficulty === 'easy') {
      this.rows = 8
      this.cols = 10
      this.mineCount = 10
      this.board = this.createBoard()
      this.placeMines()
    }
  }

  createBoard() {
    const board = []
    for (let row = 0; row < this.rows; row++) {
      const rowArr = []
      for (let col = 0; col < this.cols; col++) {
        rowArr.push(new Cell())
      }
      board.push(rowArr)
    }

    return board
  }

  placeMines() {
    const points = new Set()
    while (points.size < this.mineCount) {
      let minePoint = JSON.stringify([
        Math.floor(Math.random() * this.cols),
        Math.floor(Math.random() * this.rows),
      ]) // [x,y]
      points.add(minePoint)
    }

    points.forEach((point) => {
      let mine = JSON.parse(point)
      this.board[mine[1]][mine[0]].mine()
    })
  }

  revealCell(row, col) {
    const cell = this.board[row][col]
    cell.reveal()
    return this.board[row][col]
  }

  flagCell(row, col) {
    const cell = this.board[row][col]
    if (cell.isRevealed !== true) {
      cell.flag()
    }
    return this.board[row][col]
  }
}

module.exports = Minesweeper
