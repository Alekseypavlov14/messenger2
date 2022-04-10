import { User } from './../../modules/user/user'

function init() {
    return new WebSocket(
        window.location.origin
        .replace(/https/, 'wss')
        .replace(/http/, 'ws')
        .replace('3000', '5000')
    )
}

function connect(ws) {
    ws.send(JSON.stringify({
        event: 'message/connect',
        user: User.get()
    }))
}

function messageHandler(event, router) {
    const routerEvent = event.replace('message/', '')
    if (router[routerEvent]) router[routerEvent]()
}

export {
    init,
    connect,
    messageHandler
}