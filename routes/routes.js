const express = require('express')
const router = express.Router()

// Landing Page
router.get('/', (req, res) => {
    res.render('home')
})

//Log In
router.get('/login', (req, res) => {
    res.render('login')
})

//Sign Up
router.get('/signup', (req, res) => {
    res.render('signup')
})

module.exports = router