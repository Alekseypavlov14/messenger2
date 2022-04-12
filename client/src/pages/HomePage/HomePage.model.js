import { User } from '../../modules/user/user'
import { http } from './../../modules/http/Http.controller'

function getChats(result) {
    http.post('/chat/get', {
        user: User.get()
    }).then(data => {
        result(data.chats)
    })
}

export { getChats }