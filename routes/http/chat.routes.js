const {Router} = require('express')
const ChatRoutesController = require('./controllers/ChatRoutesController')

const router = Router()

router.post('/find', (req, res) => ChatRoutesController.find(req, res))
router.post('/write', (req, res) => ChatRoutesController.write(req, res))
router.post('/get', (req, res) => ChatRoutesController.get(req, res))

module.exports = router