const express = require('express'),
	  bodyParser = require('body-parser'),
	  Article = require('../../models/Article');

const app = express();

// import Article from '../../models/Article';
// const article = require('../../models/Article'):

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());


// module.exports = app.use();

app.get('/articles', function (req, res) {
	try {
		Article.find({}, 'title body tags', function(err, articles) {
			res.status(200).send(articles);
		})
		// res.status(200).send('OK');
	} catch(error) {
		console.log('error: ', error);
		res.status(500).send(error);
	}
})

// app.all('/articles/:id', function (req, res) {
app.get('/articles/:id', async (req, res) => {
// app.use('/articles/:id', async (req, res) => {
	try {
		const { id } = req.params;
		console.log('id: ', id);
		// Article.findById(id, 'title body tags', function(err, article) {
		// 	if (err) console.log('err: ', err);
		// 	res.status(200).send(article);
		// })
		res.status(200).send('Alright');
	} catch (error) {
		console.log('error: ', error);
		res.status(500).send(error);
	}
	// res.status(200).send('Alright');
})

// module.exports = {
// 	path: '/api/',
// 	handler: app
// }
module.exports = app