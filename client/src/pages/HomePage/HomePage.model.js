import { http } from "../../modules/http/Http.controller"
import { User } from "../../modules/user/user"

function getChats(result) {
    const user = User.get()

    http.post('/chat/get', {
        user: user
    }).then(data => {
        sessionStorage.setItem('chats', JSON.stringify(data.chats))
        result(data.chats)
    })
}

export { getChats }