const express = require('express')
const router = express.Router()
const ensureLogin = require('connect-ensure-login')
const Bear = require('../models/Bear')

router.use(ensureLogin.ensureLoggedIn('/auth/sign-in'))

router.get('/', (req, res, next) => {
    res.render('bear')
})

router.post('/create', (req, res, next) => {
    const { type, name } = req.body

    new Bear({ type, user: req.user._id, name }).save().then(bear => {
        res.send(bear)
    })
})

router.get('/details/:id', (req, res) => {
    const { id } = req.params

    Bear.findById(id).then(bear => {
        if (!bear) return res.send('No such bear')
        if (bear.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            res.send('NOT YOUR BEAR!')
        }

        res.send(bear)
    })
})

module.exports = router
