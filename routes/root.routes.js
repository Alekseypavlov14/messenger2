const express = require('express')
const {Router} = require('express')
const path = require('path')

const clientPath = path.join(__dirname, '..', 'client', 'build')

const router = Router()

router.get('/', (req, res) => {
    res.sendFile(path.resolve(clientPath, 'index.html'))
})

router.get('/favicon.ico', (req, res) => {
    res.sendFile(path.resolve(clientPath, 'favicon.ico'))
})

router.get('/manifest.json', (req, res) => {
    res.sendFile(path.resolve(clientPath, 'manifest.json'))
})

router.get('/login', (req, res) => {
    res.sendFile(path.resolve(clientPath, 'index.html'))
})

router.get('/register', (req, res) => {
    res.sendFile(path.resolve(clientPath, 'index.html'))
})

router.get('/home', (req, res) => {
    res.sendFile(path.resolve(clientPath, 'index.html'))
})

router.use('/auth', require('./auth.routes'))
router.use('/contact', require('./contact.routes'))

router.use('/static', express.static(path.join(clientPath, 'static')))

module.exports = router