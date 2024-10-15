import axios from 'axios'
import { useEffect } from 'react'

export default function game() {
    useEffect(async () => {
        try {
            const res = await axios.get('http://127.0.0.1:4000/')
            console.log(res)
        } catch (err) {
            console.err(err)
        }
    }, [])

    return (
        <>
            <div>
                dwdwqsadasd
            </div>
        </>
    )
}