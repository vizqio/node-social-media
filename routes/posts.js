const express = require("express");
const Post = require("../models/Post");
const router = express.Router();

router.post("/create", async (req, res, next) => {
	const { author, description } = req.body;

	if (!author || !description) {
		res.status(400).json({
			code: 400,
			message: "One of the parameters hasnt been provided.",
		});
	}

	try {
		const post = await Post.create({
			author: author,
			description: description,
		});

		res.status(201).json({
			code: 200,
			message: "Successfully created a post!",
		});
	} catch (err) {
		res.status(400).json({
			code: res.statusCode,
			message: `${err.message}`,
		});
	}
});

router.post("/:id/like", async (req, res, next) => {
	const id = req.params.id;

	if (!id) {
		res.status(400).json({
			code: res.statusCode,
			message: "Please provide a id.",
		});
	}

	try {
		const post = await Post.findByIdAndUpdate(id, { $inc: { likes: 1 } });

		res.status(200).json({
			code: res.statusCode,
			message: `❤ Liked post: ${id}`,
		});
	} catch (err) {
		res.status(404).json({
			code: res.statusCode,
			message: "Can't find post with the ID given!",
		});
	}
});

module.exports = router;