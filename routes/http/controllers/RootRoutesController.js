const path = require('path')
const clientPath = path.join(__dirname, '..', '..', '..', 'client', 'build')

class RootRoutesController {
    index(req, res) {
        res.sendFile(path.resolve(clientPath, 'index.html'))
    }
}

module.exports = new RootRoutesController()