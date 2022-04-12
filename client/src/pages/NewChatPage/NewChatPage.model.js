import { http } from './../../modules/http/Http.controller'

function findUsers(user, value, result) {
    if (!value) return result([])
    
    http.post('/chat/find', {
        template: value,
        user: user
    }).then(data => {
        if (data.error) return console.log(data.error)
        result(data)
    })
}

function write(user, candidate, result) {
    http.post('/chat/write', {
        candidate, user
    }).then(data => {
        result(data.chat)
    })
}

export { findUsers, write }