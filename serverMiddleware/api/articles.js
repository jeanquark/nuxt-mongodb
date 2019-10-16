const express = require('express'),
	  bodyParser = require('body-parser');

const app = express();
// const Article = require('./models/Article');
import Article from '../../models/Article';

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

module.exports = app.use(async function(req, res) {
	try {
		console.log('req.body: ', req.body);

		Article.find({}, function (err, articles) {
  			if (err) return console.log('err: ', err);
  			// Prints "Space Ghost is a talk show host".
  			// console.log('Article %s has body %s and tags %s.', article.title, article.body, article.tags);
  			console.log('articles: ', articles);
			res.status(200).send(articles);
		});
	} catch(error) {
		console.log('error: ', error);
		res.status(500).send(error);
	}
});