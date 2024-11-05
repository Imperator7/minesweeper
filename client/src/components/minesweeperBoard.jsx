import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Game() {
  const [data, setData] = useState(null)
  const [flagAmount, setFlagAmount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const gameEndpoint = 'http://127.0.0.1:4000/'

  function createCellConfig(row, col, method) {
    return {
      method: 'post',
      url: gameEndpoint + method,
      data: {
        row,
        col,
      },
    }
  }

  async function clickHandler(e, method) {
    const { target } = e
    const rowId = target.getAttribute('data-row-id')
    const colId = target.getAttribute('data-col-id')

    const config = createCellConfig(rowId, colId, method)

    const res = await axios(config).catch((err) => console.error(err))

    if (method === 'flag') {
      const cell = data.board[rowId][colId]
      if (cell.isRevealed) return
      if (cell.isMine) return
      if (!cell.isFlagged) {
        setFlagAmount((prev) => prev + 1)
      } else {
        setFlagAmount((prev) => prev - 1)
      }
    }
    console.log(res.data.cell)

    const updatedBoard = [...data.board]

    for (let nCell of res.data.cell) {
      updatedBoard[nCell.row][nCell.col] = nCell
    }

    setData({ ...data, board: updatedBoard })
  }

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(gameEndpoint)
        console.log(res)
        setData(res.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetch()
  }, [])

  if (loading) {
    return <div className="p-4">Loading....</div>
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>
  }

  return (
    <>
      <div>
        Total mines: {data.mineCount} Total Flags: {flagAmount} time: 0
      </div>
      <div
        className={`grid grid-cols-${data.cols} grid-rows-${data.rows} m-5 border border-black`}
      >
        {data.board.map((row, rowindex) =>
          row.map((cell, colindex) => (
            <button
              key={colindex}
              className="bg-gray-300 shadow-xl min-h-[50px] border border-black "
              onClick={(e) => {
                e.preventDefault()
                clickHandler(e, 'reveal')
              }}
              onContextMenu={(e) => {
                e.preventDefault()
                clickHandler(e, 'flag')
              }}
              data-row-id={rowindex}
              data-col-id={colindex}
            >
              {cell.isMine && '💣'}
              {cell.isRevealed && cell.hint}
              {cell.isFlagged && '🚩'}
            </button>
          ))
        )}
      </div>
    </>
  )
}
