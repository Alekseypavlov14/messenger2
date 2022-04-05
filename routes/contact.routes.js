const {Router} = require('express')
const ContactRoutesController = require('./controllers/ContactRoutesController')

const router = Router()

router.post('/add', (req, res) => ContactRoutesController.add(req, res))

module.exports = router