require('dotenv').config()

const User = require('../models/Users')
const jwt = require('jsonwebtoken')

//Utils
const renderPage = require('../utils/renderPage')

const controller = {
    render: function (req, res) {
        renderPage(req, res, 'profile', 'login')
    },

    login: async function (req, res) {
        const email = req.body.email
        const password = req.body.password
        const checkbox = req.body.checkbox

        try {
            const user = await User.findOne({ email })

            if (!user) {
                return res.redirect('/login')
            }

            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                return res.redirect('/login');
            }

            const tokenMaxAge = checkbox === 'on' ? '7d' : '1h'

            const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
                expiresIn: tokenMaxAge
            });

            const cookieMaxAge = checkbox === 'on' ? 604800 * 1000 : 3600 * 1000

            res.cookie('token', token, {
                httpOnly: true,
                secure: false,
                maxAge: cookieMaxAge,
                sameSite: 'Strict'
            });

            return res.redirect('/home')

        } catch (e) {
            console.log(e)
            return res.redirect('/login')
        }

    },

    logout: function (req, res) {
        res.clearCookie('token');
        res.json({ success: true, redirect: '/login' });
    }
}

module.exports = controller