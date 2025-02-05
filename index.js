'use strict'
require('dotenv').config()

const mongoose = require('mongoose')

const app = require('./app')

const port = process.env.PORT || 3000
const db = process.env.DB

mongoose.Promise = global.Promise
mongoose.connect(db)
.then(() => {
    console.log('Database status: ON')

    app.listen(port, () => {
        console.log('Server status: ON')

        console.log('App running on port:', port)
    })
}).catch(err => {
    console.log('Database connection failed')
    console.log(err)
})