import { http } from '../../modules/http/Http.controller'
import { User } from '../../modules/user/user'

function deleteAccount(user) { 
    User.delete()

    http.post('/account/delete', {
        user: user
    }).then(data => {
        window.location.href = '/'
        console.log(data.message)
    })
}

function leaveAccount() {
    User.delete()
    window.location.href = '/'
}

export {
    deleteAccount,
    leaveAccount
}