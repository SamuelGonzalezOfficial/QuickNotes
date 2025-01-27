const jwt = require('jsonwebtoken')

const middleware = async function (req, res, next) {
    const token = req.cookies.token

    if(!token){
        res.status(401).send({error: 'Access denied'})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        req.user = decoded
        return next()
    } catch(e){
        console.error(e)
        return res.status(403).send({error: 'Invalid or expired token'})
    }
}

module.exports = middleware