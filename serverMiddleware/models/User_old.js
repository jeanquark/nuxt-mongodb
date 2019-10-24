const mongoose = require('mongoose');

const schema = new mongoose.Schema({ 
	email: String,
	hash: String,
	salt: String,
	createdAt: { type: Date, default: Date.now() },
	updatedAt: { type: Date, default: Date.now() }
});

export default mongoose.model('User', schema);