const express = require('express'),
	  mongoose = require('mongoose'),
	  moment = require('moment');

// const schema = new mongoose.Schema({ title: String, body: String, tags: [String], comments: [String], createdAt: Date });
// const Article = mongoose.model('Article', schema);

console.log(`databaseInit middleware called at ${moment().format('YYYY-MM-DD HH:mm:ss')}`);


// Establish connection
const port = process.env.PORT || 3002;
console.log('port: ', port);
const app = express();
module.exports = app;

connect();

// Article.findOne({ 'title': 'Article 1' }, 'title body tags', function (err, article) {
//   	if (err) return console.log('err: ', err);
//   	// Prints "Space Ghost is a talk show host".
//   	console.log('Article %s has body %s and tags %s.', article.title, article.body,
//     	article.tags);
// });

// function listen() {
//   	if (app.get('env') === 'test') return;
//   	app.listen(port);
//   	console.log(`Express app started on port ${port}`);
// }

function connect() {
  	// mongoose.connection
	  //   .on('error', console.log)
	  //   .on('disconnected', connect)
	  //   .once('open', listen);
  	return mongoose.connect('mongodb://127.0.0.1:27017/node_express_mongoose_demo', { keepAlive: 1, useNewUrlParser: true, useUnifiedTopology: true });
}