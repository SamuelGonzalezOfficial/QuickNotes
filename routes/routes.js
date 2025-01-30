//Modules
const express = require('express')

//Controllers
const loginController = require('../controllers/login')
const signupController = require('../controllers/signup')
const homeController = require('../controllers/home')

//Middlewares
const authorizationMiddleware = require('../middlewares/authorization')
const checkAuthMiddleware = require('../middlewares/checkAuth')

//Utils
const renderPage = require('../utils/renderPage')

const router = express.Router()

// Landing Page
router.get('/', (req, res) => {
    res.render('home')
})

//Log In
router.get('/login', checkAuthMiddleware, loginController.render)
router.post('/login', loginController.login)
router.post('/logout', loginController.logout)


//Sign Up
router.get('/signup', checkAuthMiddleware, signupController.render)
router.post('/signup', signupController.save)

//User Home page
router.get('/home', authorizationMiddleware, homeController.render)

module.exports = router