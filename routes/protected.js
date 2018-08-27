const express = require('express')
const router = express.Router()

function authorizeMiddleware(req, res, next) {
    if (!req.session.currentUser) res.send('You should not be here')
    else next()
}

router.use(authorizeMiddleware)

router.get('/', (req, res, next) => {
    res.send("Here's your answer: 42")
})

router.get('/other-secret', (req, res, next) => {
    res.send("Here's your answer: 43")
})

module.exports = router
