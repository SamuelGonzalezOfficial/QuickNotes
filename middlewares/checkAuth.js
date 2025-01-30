const jwt = require('jsonwebtoken')

const middleware = async function (req, res, next) {
    const token = req.cookies.token

    if(!token){
        return next()
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        return res.redirect('/home')
    } catch(e){
        console.error(e)
        return next()
    }
}

module.exports = middleware