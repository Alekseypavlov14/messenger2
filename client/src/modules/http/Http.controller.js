class Http {
    async get(url) {
        return await fetch(url).then(response => {
            return response.json()
        })
    }

    async post(url, data) {
        return await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(data)
        }).then(response => {
            return response.json()
        })
    }
}

export default new Http()