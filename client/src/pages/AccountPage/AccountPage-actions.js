import HttpController from "../../modules/http/Http.controller";

function deleteAccount(user) { 
    localStorage.removeItem('user')

    HttpController.post('/account/delete', {
        user: user
    }).then(data => {
        window.location.href = '/'
        console.log(data.message)
    })
}

function leaveAccount() {
    localStorage.removeItem('user')
    window.location.href = '/'
}

export {
    deleteAccount,
    leaveAccount
}