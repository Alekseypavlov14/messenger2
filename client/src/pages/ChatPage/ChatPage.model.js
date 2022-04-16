import { useMemo } from 'react'
import { useParams } from 'react-router'
import { User } from './../../modules/user/user'

const user = User.get()

function getOpponent(users) {
    return users.filter(login => login !== user.login)[0]
}

function scroll(element) {
    element.scrollTop = element.scrollHeight
}

function useChat() {
    const { login } = useParams()

    return useMemo(() => {
        const chats = JSON.parse(sessionStorage.getItem('chats'))

        return chats.filter(chat => chat.users.includes(login))[0]
    }, [login])
}

export { getOpponent, scroll, useChat }