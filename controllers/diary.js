const gravatar = require("gravatar");

const { Diary } = require("../models/diary");

const { ctrlWrapper, HttpError } = require("../helpers");

const getAllNotes = async (req, res) => {
	const { _id } = req.user;

	const notes = await Diary.find({ owner: _id });
	if (!notes) {
		throw HttpError(404, "Notes not found");
	}

	res.status(200).json({
		owner: _id,
		notes,
	});
};

const addNote = async (req, res) => {
	const { email, _id: owner } = req.user;
	const { title, description } = req.body;

	const imgUrl = gravatar.url(email, { s: "200", protocol: "http" });

	const newNote = await Diary.create(
		{
			...req.body,
			owner,
			title,
			description,
			imgUrl,
		}
	);

	res.status(200).json({
		newNote,
	});
};

module.exports = {
	getAllNotes: ctrlWrapper(getAllNotes),
	addNote: ctrlWrapper(addNote),
};
