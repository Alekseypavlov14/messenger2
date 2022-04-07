class Valid {
    password(password) {
        return (
            password.length >= 6 && 
            !(/\s/.test(password))
        )
    }

    login(login) {
        return (
            login.length >= 4 &&
            !(/\s/.test(login))
        ) 
    }
}

export default new Valid()