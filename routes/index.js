const express = require('express')
const router = express.Router()

/* GET home page */
router.get('/', (req, res, next) => {
    console.log(req.session)
    res.render('index')
})

router.get('/protected', (req, res, next) => {
    if (!req.session.currentUser) res.send('You should not be here')
    res.send("Here's your answer: 42")
})

module.exports = router
