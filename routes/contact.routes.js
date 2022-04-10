const {Router} = require('express')
const ContactRoutesController = require('./controllers/ContactRoutesController')

const router = Router()

router.post('/find', (req, res) => ContactRoutesController.find(req, res))
router.post('/write', (req, res) => ContactRoutesController.write(req, res))

module.exports = router