import express from 'express'
import session from 'express-session'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import mongoose from 'mongoose'

import api from './api'

const app = express()
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({
	secret: 'nuxt-mongodb',
	resave: false,
	saveUnitialized: false,
	cookie: { maxAge: 60000 }
}))
app.use(passport.initialize())
app.use(passport.session())

// Set up DB
mongoose.connect('mongodb://127.0.0.1:27017/node_express_mongoose_demo')
mongoose.Promise = global.Promise // May be skipped https://stackoverflow.com/questions/51862570/mongoose-why-we-make-mongoose-promise-global-promise-when-setting-a-mongoo

// Set up passport auth
require('./auth_config')(passport)

app.use('/api', api)