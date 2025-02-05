'use strict'

//Required modules
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const override = require('method-override')
const path = require('path')

const router = require('./routes/routes')
const routerNotes = require('./routes/notes')

//Create express app
const app = express()

//View Engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

//Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(override('_method'))
app.use(cookieParser())

//Routes
app.use('/', router)
app.use('/notes', routerNotes)


module.exports = app
