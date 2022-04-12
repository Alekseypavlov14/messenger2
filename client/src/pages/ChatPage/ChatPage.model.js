import { User } from './../../modules/user/user'

const user = User.get()

function getOpponent(users) {
    return users.filter(login => login !== user.login)[0]
}

function scroll(element) {
    element.scrollTop = element.scrollHeight
}

export { getOpponent, scroll }