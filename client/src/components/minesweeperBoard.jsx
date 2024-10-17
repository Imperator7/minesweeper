import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Game() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const gameEndpoint = 'http://127.0.0.1:4000/'

  function createRevealCellConfig(row, col) {
    return {
      method: 'post',
      url: gameEndpoint,
      data: {
        row,
        col,
      },
    }
  }

  async function leftClick(e) {
    const { target } = e
    const rowId = target.getAttribute('data-row-id')
    const colId = target.getAttribute('data-col-id')

    const config = createRevealCellConfig(rowId, colId)

    const res = await axios(config).catch((err) => console.error(err))

    console.log(res)
  }

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(gameEndpoint)
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
      <div>Total mines: {data.mineCount} time: 0</div>
      <div
        className={`grid grid-cols-${data.cols} grid-rows-${data.rows} m-5 border border-black`}
      >
        {console.log(data)}
        {data.board.map((row, rowindex) =>
          row.map((cell, colindex) => (
            <button
              key={colindex}
              className="bg-gray-300 shadow-xl min-h-[50px] border border-black "
              onClick={leftClick}
              data-row-id={rowindex}
              data-col-id={colindex}
            ></button>
          ))
        )}
      </div>
    </>
  )
}
