class Cell {
  constructor(row, col) {
    this.row = row
    this.col = col
    this.isRevealed = false
    this.isFlagged = false
    this._isMine = false
    this.hint = 0
  }

  set isMine(value) {
    this._isMine = value
  }

  get isMine() {
    return this._isMine
  }

  reveal() {
    if (!this.isRevealed) {
      this.isRevealed = true
    }
  }

  toggleFlag() {
    this.isFlagged = !this.isFlagged
  }

  addHint() {
    this.hint += 1
  }

  toJSON() {
    return {
      row: this.row,
      col: this.col,
      isRevealed: this.isRevealed,
      isFlagged: this.isFlagged,
    }
  }
}

class Minesweeper {
  constructor(difficulty) {
    if (difficulty === 'easy') {
      this.rows = 8
      this.cols = 10
      this.mineCount = 10
      this.adjacentCells = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
      ]
      this.board = this.createBoard()
      this.mineCoordinates
      // should place mines after the first try so there is no way the player gonna hit the mine from the first place.
      // fix this by add filter cell to place mine and that's it
      this.placeMines()
      this.generateHint()
      this.visitedCell = new Set()
    }
  }

  isValidCell(row, col) {
    return row < this.rows && row >= 0 && col < this.cols && col >= 0
  }

  createBoard() {
    const board = []
    for (let row = 0; row < this.rows; row++) {
      const rowArr = []
      for (let col = 0; col < this.cols; col++) {
        rowArr.push(new Cell(row, col))
      }
      board.push(rowArr)
    }

    return board
  }

  placeMines() {
    const points = new Set()
    while (points.size < this.mineCount) {
      let minePoint = JSON.stringify([
        Math.floor(Math.random() * this.rows),
        Math.floor(Math.random() * this.cols),
      ]) // [x,y]
      points.add(minePoint)
    }

    // store mineCoordinates for further calculation
    this.mineCoordinates = points

    points.forEach((point) => {
      let mine = JSON.parse(point)
      this.board[mine[0]][mine[1]].isMine = true
    })
  }

  generateHint() {
    this.mineCoordinates.forEach((mineStr) => {
      const mine = JSON.parse(mineStr)
      const [row, col] = mine

      for (let [nRow, nCol] of this.adjacentCells) {
        const neighborCell = [row + nRow, col + nCol]
        if (this.isValidCell(neighborCell[0], neighborCell[1])) {
          this.board[neighborCell[0]][neighborCell[1]].addHint()
        }
      }
    })
  }

  revealCell(row, col) {
    const cell = this.board[row][col]
    if (cell.isMine) {
      cell.result = 'You lose'
      return cell
    }

    cell.reveal()
    if (cell.hint !== 0) {
      return [cell]
    } else {
      this.visitedCell = new Set()
      this.visitedCell.add(JSON.stringify([parseInt(row), parseInt(col)]))
      this.revealAdjacentCells(row, col)
      console.log(this.visitedCell)
      const visitedCells = Array.from(this.visitedCell)
        .map((cell) => JSON.parse(cell))
        .map(([row, col]) => this.board[row][col])
      return visitedCells
    }
  }

  revealAdjacentCells(row, col) {
    for (let adjacentCell of this.adjacentCells) {
      const nRow = parseInt(row) + adjacentCell[0]
      const nCol = parseInt(col) + adjacentCell[1]

      if (
        this.isValidCell(nRow, nCol) &&
        !this.visitedCell.has(JSON.stringify([nRow, nCol]))
      ) {
        this.visitedCell.add(JSON.stringify([nRow, nCol]))
        const nCell = this.board[nRow][nCol]
        nCell.reveal()
        if (nCell.hint === 0) {
          this.revealAdjacentCells(nCell.row, nCell.col)
        }
      }
    }
  }

  flagCell(row, col) {
    const cell = this.board[row][col]
    if (cell.isRevealed !== true) {
      cell.toggleFlag()
    }
    return cell
  }

  toJSON() {
    return {
      rows: this.rows,
      cols: this.cols,
      mineCount: this.mineCount,
      board: this.board,
    }
  }
}

module.exports = Minesweeper
