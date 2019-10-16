const mongoose = require('mongoose');

const schema = new mongoose.Schema({ 
	title: String,
	content: String,
	// body: String,
	slug: String,
	tags: [String],
	// comments: [String],
	createdAt: Date
});

export default mongoose.model('Article', schema);