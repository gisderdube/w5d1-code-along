const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')

console.log('HELLO FROM THE UTILS')
passport.serializeUser((user, cb) => {
    cb(null, user._id)
})

passport.deserializeUser((id, cb) => {
    User.findById(id, (err, user) => {
        if (err) {
            return cb(err)
        }
        cb(null, user)
    })
})

passport.use(
    new LocalStrategy(function(username, password, done) {
        User.findOne({ username: username }, function(err, user) {
            if (err) {
                return done(err)
            }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' })
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' })
            }
            return done(null, user)
        })
    })
)
