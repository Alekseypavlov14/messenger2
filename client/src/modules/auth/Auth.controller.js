import Http from "../http/Http.controller"
import Valid from '../valid/Valid.controller'

class Auth {
    async login(login, password) {
        await this.auth(login, password, '/auth/login')
    }
    
    async register(login, password) {
        await this.auth(login, password, '/auth/register')
    }

    async auth(login, password, url) {
        if (
            !( Valid.login(login) ) ||
            !( Valid.password(password) )
        ) return console.log('Invalid login or password')

        await Http.post(url, {
            login, password
        }).then(data => {
            if (data.message) return console.log(data.message)
            this.saveUser(data)
        })
    }

    saveUser(user) {
        localStorage.setItem('user', JSON.stringify(user))
    }
}

export default new Auth()