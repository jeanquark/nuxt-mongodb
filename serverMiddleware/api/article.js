const express = require('express'),
	  bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

module.exports = app.use(async function(req, res) {
	try {
		// console.log('req: ', req);
		console.log('req.params: ', req.params);
		

		const id = '5da5f4770e2b4326446a3bf5';
		Article.findById(id, 'title body tags', function (err, article) {
  			if (err) return console.log('err: ', err);
  			// Prints "Space Ghost is a talk show host".
  			console.log('Article %s has body %s and tags %s.', article.title, article.body, article.tags);
  			res.status(200).send(article);
		});
	} catch(error) {
		console.log('error: ', error);
		res.status(500).send(error);
	}
});