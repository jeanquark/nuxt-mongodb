const express = require('express'),
	  mongoose = require('mongoose')
	  bodyParser = require('body-parser');

// Create express instnace
const app = express()
app.use(bodyParser.urlencoded({ exended: true}))
app.use(bodyParser.json())

connect();

function connect() {
   	return mongoose.connect('mongodb://127.0.0.1:27017/node_express_mongoose_demo', { keepAlive: 1, useNewUrlParser: true, useUnifiedTopology: true });
}

// Require API routes
const users = require('./routes/users')
const articles = require('./routes/articles')

// Import API Routes
app.use(users)
app.use(articles)

// Export the server middleware
module.exports = {
  	path: '/api',
  	handler: app
}