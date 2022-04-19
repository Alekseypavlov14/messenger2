const express = require('express')
const {Router} = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const RootRoutesController = require('./controllers/RootRoutesController')
const checkUser = require('../../middleware/checkUser.middleware')
const clientPath = path.join(__dirname, '..', '..', 'client', 'build')

const router = Router()

router.use(bodyParser.json())
router.use(express.static(clientPath))
router.use(express.static(path.join(clientPath, 'static')))

router.use('/auth', require('./auth.routes'))
router.use('/chat', checkUser, require('./chat.routes'))
router.use('/account', checkUser, require('./account.routes'))

router.get('/', (req, res) => RootRoutesController.index(req, res))
router.get('/login', (req, res) => RootRoutesController.index(req, res))
router.get('/register', (req, res) => RootRoutesController.index(req, res))
router.get('/home', (req, res) => RootRoutesController.index(req, res))
router.get('/new-chat', (req, res) => RootRoutesController.index(req, res))
router.get('/chat', (req, res) => RootRoutesController.index(req, res))
router.get('/account', (req, res) => RootRoutesController.index(req, res))
router.get('*', (req, res) => RootRoutesController.index(req, res))

module.exports = router