'use strict'

//Required modules
const express = require('express')
const bodyParser = require('body-parser')
const override = require('method-override')

const router = require('./routes/routes')
const routerNotes = require('./routes/notes')

//Create express app
const app = express()

//View Engine
app.set('view engine', 'ejs')

//Middlewares
app.use('/public', express.static('public'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(override('_method'))

//Routes
app.use('/', router)
app.use('/notes', routerNotes)


module.exports = app
