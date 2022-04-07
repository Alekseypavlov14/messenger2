const express = require('express')
const {Router} = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const RootRoutesController = require('./controllers/RootRoutesController')
const clientPath = path.join(__dirname, '..', 'client', 'build')

const router = Router()

router.use(bodyParser.json())
router.use(express.static(clientPath))
router.use(express.static(path.join(clientPath, 'static')))

router.get('/', (req, res) => RootRoutesController.index(req, res))
router.get('/login', (req, res) => RootRoutesController.index(req, res))
router.get('/register', (req, res) => RootRoutesController.index(req, res))
router.get('/home', (req, res) => RootRoutesController.index(req, res))

router.use('/auth', require('./auth.routes'))
router.use('/contact', require('./contact.routes'))
router.use('/account', require('./account.routes'))

module.exports = router