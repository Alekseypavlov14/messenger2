const { Router } = require('express')
const AuthRoutesController = require('./controllers/AuthRoutesController')

const router = Router()

router.post('/register', (req, res) => AuthRoutesController.register(req, res))
router.post('/login', (req, res) => AuthRoutesController.login(req, res))

module.exports = router