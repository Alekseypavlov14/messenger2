import React from 'react'
import { useRedirect } from '../hooks/useRedirect'
import { ws } from './../websocket'
import './../styles/Home.css'

const Home = () => {
    useRedirect()

    ws.on('message/send', (message) => {
        console.log(message)
    })

    return (
        <div>
            HomePage
        </div>
    )
}

export default Home