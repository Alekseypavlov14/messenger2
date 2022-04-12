const { Router } = require('express')
const AccountRoutesController = require('./controllers/AccountRoutesController')

const router = new Router()

router.post('/delete', (req, res) => AccountRoutesController.delete(req, res))

module.exports = router