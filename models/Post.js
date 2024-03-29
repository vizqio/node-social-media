const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const PostSchema = new Schema({
	author: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		image: false,
		required: false,
	},
	created_at: {
		type: Date,
		default: new Date(),
		required: false,
	},
	likes: {
		type: Number,
		default: 0,
		required: false,
	},
	comments: {
		type: Object,
		default: {},
		required: false,
	},
});

module.exports = model("Posts", PostSchema);
