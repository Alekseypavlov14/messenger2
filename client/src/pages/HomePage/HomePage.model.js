import { http } from "../../modules/http/Http.controller"
import { User } from "../../modules/user/user"

function getChats() {
    const user = User.get()

    return http.post('/chat/get', { 
        user: user
    }).then(data => {
        sessionStorage.setItem('chats', JSON.stringify(data.chats))
        return data.chats
    })
}

export { getChats }