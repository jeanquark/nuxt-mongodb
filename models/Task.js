const mongoose = require('mongoose');

const schema = new mongoose.Schema({ 
	content: String,
	completed: { type: Boolean, default: false },
	createdAt: { type: Date, default: Date.now() },
	updatedAt: { type: Date, default: Date.now() }
});

export default mongoose.model('Task', schema);