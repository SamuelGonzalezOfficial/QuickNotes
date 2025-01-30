const User = require('../models/Users')

//Utils
const renderPage = require('../utils/renderPage')

const controller = {
    render: function (req, res) {
        renderPage(req, res, 'profile', 'signup')
    },

    save: async function (req, res, next) {
        const data = req.body
        const newUser = new User({
            name: data.name,
            email: data.email,
            password: data.password,
        });

        try {
            await newUser.save();
            res.redirect('/login')
        } catch (error) {
            console.log(error)
            res.redirect('/signup')
        }
    }
}

module.exports = controller