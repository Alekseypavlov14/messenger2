class UserClass {
    user = {}

    set(userTemplate) {
        for (const key in userTemplate) {
            this.user[key] = userTemplate[key]
        }

        localStorage.setItem('user', JSON.stringify(this.user))
    }

    get() {
        return JSON.parse( localStorage.getItem('user') )
    }

    delete() {
        localStorage.removeItem('user')
    }
}

const User = new UserClass()

export { User }