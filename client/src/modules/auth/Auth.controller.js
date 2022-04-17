import { http } from '../http/Http.controller'
import { User } from '../user/user'
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

        return http.post(url, {
            login, password
        }).then(data => {
            if (data.message) return console.log(data.message)
            this.saveUser(data)
            window.location.href = '/'
        })
    }

    saveUser(user) {
        User.set(user)
    }
}

export default new Auth()