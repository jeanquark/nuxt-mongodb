const mongoose = require('mongoose');

const schema = new mongoose.Schema({ 
	title: String,
	content: String,
	slug: String,
	tags: [String],
	createdAt: Date
});

export default mongoose.model('Post', schema);