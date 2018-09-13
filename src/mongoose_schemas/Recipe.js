const mongoose = require('mongoose');
const DB_PATH = 'mongodb://localhost:27017/comp_2406_a4';

mongoose.connect(DB_PATH);
const Recipe_Schema = new mongoose.Schema({

	recipe_name: {
		type: String,
		required: true,
		index: true
	},

	contributor: {
		type: String,
		required: true,
	},

	category: {
		type: String,
		required: true,
	},

	description: {
		type: String,
		required: true,
	},

	spices: {
		type: Array,
		required: true,
	},

	source: {
		type: String,
		required: false,
	},

	rating: {
		type: String,
		required: false
	},

	ingredients: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('Recipe', Recipe_Schema);