const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const User = require('../models/User')

router.get('/sign-up', (req, res, next) => {
    res.render('sign-up')
})

router.post('/sign-up', (req, res, next) => {
    const { email, password } = req.body

    const encrypted = bcrypt.hashSync(password, 10)

    new User({ email, password: encrypted }).save().then(result => {
        res.send('User account was created')
    })
})

router.get('/sign-in', (req, res, next) => {
    res.render('sign-in')
})

router.post('/sign-in', (req, res, next) => {
    const { email, password } = req.body

    User.findOne({ email }).then(user => {
        if (!user) return res.render('sign-in', { error: 'No such user' })

        const passwordsMatch = bcrypt.compareSync(password, user.password)

        if (!passwordsMatch) return res.render('sign-in', { error: 'Wrong password' })

        const cleanUser = user.toObject()
        delete cleanUser.password

        req.session.currentUser = cleanUser

        res.send("You're logged in!")
    })
})

router.get('/sign-out', (req, res) => {
    req.session.destroy(() => {
        // cannot access session here
        res.redirect('/')
    })
})

module.exports = router
