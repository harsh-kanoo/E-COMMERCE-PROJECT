const express = require('express')
const router = express.Router()
const User = require('../models/User')
const passport = require('passport')
const { isLoggedIn } = require('../middleware')


// to show the form
router.get('/register', (req, res) => {
    res.render('auth/signup')
})

// actually want to register a user in DB
router.post('/register', async (req, res) => {
    try {
        let { email, password, username, role } = req.body
        let user = new User({ email, username, role})        // register a new user instance with a given password. Checks if username is unique.
        let newUser = await User.register(user, password)                           // static method
        // res.redirect('/login')

        req.login(newUser, function (err) {
            if (err) { return next(err) }
            req.flash('success', 'welcome!')
            res.redirect('/products')
        })
    }

    catch (e) {
        req.flash('error', e.message)
        res.redirect('/login')
    }

})


// to get the login form
router.get('/login', (req, res) => {

    res.render('auth/login')
})

// to actually login via the db
router.post('/login', passport.authenticate('local',       // passport use karne ke liye require karo
    {                                                     // using local starategy
        failureRedirect: '/login',
        failureMessage: true
    }),

    (req, res) => {
        // console.log(req.user, "sam")
        req.flash('success', 'Welcome back')
        res.redirect('/products')
    })


router.get('/logout', isLoggedIn, (req, res) => {
    req.logout(() => {
        req.flash('success', 'Goodbye, see you again')
        res.redirect('/login')
    })
})



module.exports = router