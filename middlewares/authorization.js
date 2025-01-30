const jwt = require('jsonwebtoken')

const middleware = async function (req, res, next) {
    const token = req.cookies.token

    if(!token){
        return res.redirect('/login')
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        req.user = decoded
        return next()
    } catch(e){
        console.error(e)
        return res.redirect('/login')
    }
}

module.exports = middleware