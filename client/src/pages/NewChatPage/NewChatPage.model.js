import { User } from '../../modules/user/user'
import { http } from './../../modules/http/Http.controller'

const user = User.get()

function findUsers(value, result) {
    if (!value) return result([])
    
    http.post('/chat/find', {
        template: value,
        user: user
    }).then(data => {
        if (data.error) return console.log(data.error)
        result(data)
    })
}

async function write(candidate) {
    return http.post('/chat/write', {
        candidate, user
    }).then(data => {
        const chats = JSON.parse(sessionStorage.getItem('chats'))
        const updatedChats = chats.concat([data.chat])
        sessionStorage.setItem('chats', JSON.stringify(updatedChats))
        
        const link = '/chat/' + candidate.login

        return link
    })
}

export { findUsers, write }