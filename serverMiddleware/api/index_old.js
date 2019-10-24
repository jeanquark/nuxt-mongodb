// import express from 'express'
// import session from 'express-session'
// import bodyParser from 'body-parser'
// import cookieParser from 'cookie-parser'
// import passport from 'passport'
// import mongoose from 'mongoose'

// import api from './api'

// const app = express()
// app.use(bodyParser.json())
// app.use(cookieParser())
// app.use(session({
// 	secret: 'nuxt-mongodb',
// 	resave: false,
// 	saveUnitialized: false,
// 	cookie: { maxAge: 60000 }
// }))
// app.use(passport.initialize())
// app.use(passport.session())

// // Set up DB
// // mongoose.connect('mongodb://127.0.0.1:27017/node_express_mongoose_demo')
// mongoose.connect('mongodb://127.0.0.1:27017/node_express_mongoose_demo', { keepAlive: 1, useNewUrlParser: true, useUnifiedTopology: true })
// mongoose.Promise = global.Promise // May be skipped https://stackoverflow.com/questions/51862570/mongoose-why-we-make-mongoose-promise-global-promise-when-setting-a-mongoo

// // Set up passport auth
// require('./auth_config')(passport)

// app.use('/api', api)

// module.exports = {
//   	path: '/api',
//   	handler: app
// }


const express = require('express'),
	  mongoose = require('mongoose')
	  bodyParser = require('body-parser');

// Create express instnace
const app = express()
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

// Connect to mongoDB database
connect();
function connect() {
   	return mongoose.connect('mongodb://127.0.0.1:27017/node_express_mongoose_demo', { keepAlive: 1, useNewUrlParser: true, useUnifiedTopology: true });
}

// Require API routes
// const auth = require('./routes/auth')
const tasks = require('./routes/tasks')

// Import API Routes
// app.use(auth)
app.use(tasks)

// Export the server middleware
module.exports = {
  	path: '/api',
  	handler: app
}