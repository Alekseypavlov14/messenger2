const ws = new WebSocket(
    window.location.origin
    .replace(/https?/, 'ws')
    .replace(3000, 5000)
)

// reaction on messages
ws.onopen = () => {
    ws.onmessage = (ws) => {
        const message = JSON.parse(ws.data)

        if (EventController[message.event]) {
            EventController[message.event](message)
        }
    }
}

const EventController = {}

ws.on = (event, callback) => {
    EventController[event] = callback
}

export {
    ws
}