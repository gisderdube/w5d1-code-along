const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')
const bcrypt = require('bcrypt')

passport.serializeUser((user, cb) => {
    cb(null, user._id)
})

passport.deserializeUser((id, cb) => {
    User.findById(id, (err, user) => {
        if (err) {
            return cb(err)
        }

        const cleanUser = user.toObject()
        delete cleanUser.password

        cb(null, cleanUser)
    })
})

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        function(email, password, done) {
            User.findOne({ email }, function(err, user) {
                if (err) {
                    return done(err)
                }

                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' })
                }

                const passwordsMatch = bcrypt.compareSync(password, user.password)
                if (!passwordsMatch) {
                    return done(null, false, { message: 'Incorrect password.' })
                }
                return done(null, user)
            })
        }
    )
)
