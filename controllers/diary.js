const gravatar = require("gravatar");

const { Diary, categories } = require("../models/diary");

const { ctrlWrapper, HttpError } = require("../helpers");

// getAll
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
// getNotesById
const getNoteById = async (req, res) => {
	const { _id } = req.user;
	const { noteId } = req.params;

	const note = await Diary.findOne({ owner: _id, _id: noteId });
	if (!note) {
		throw HttpError(404, "Notes not found");
	}

	res.status(200).json({
		owner: _id,
		note,
	});
};
const getAllCategories = async (req, res) => {
	res.status(200).json({
		categories,
	});
};

// add
const addNote = async (req, res) => {
	const { email, _id: owner } = req.user;
	const { title, description } = req.body;

	const imgUrl = gravatar.url(email, { s: "200", protocol: "https" });

	const newNote = await Diary.create({
		...req.body,
		owner,
		title,
		description,
		imgUrl,
	});

	res.status(200).json({
		newNote,
	});
};

// delete
const deleteNote = async (req, res) => {
	const { noteId } = req.params;

	const result = await Diary.findById(noteId).exec();
	if (!result || result.owner.toString() !== req.user._id.toString()) {
		throw HttpError(404, "Not found");
	}

	const data = await Diary.findByIdAndDelete(noteId);

	if (!data) {
		throw HttpError(404, "Not found");
	}

	res.status(200).json({ message: "Note deleted" });
};

// update
const updateNote = async (req, res) => {
	const { noteId } = req.params;

	const result = await Diary.findById(noteId).exec();
	if (!result || result.owner.toString() !== req.user._id.toString()) {
		throw HttpError(404, "Not found");
	}

	const data = await Diary.findByIdAndUpdate(noteId, req.body, { new: true });
	if (!data) {
		throw HttpError(404, "Not found");
	}

	res.json(data);
};

module.exports = {
	getAllNotes: ctrlWrapper(getAllNotes),
	getNoteById: ctrlWrapper(getNoteById),
	getAllCategories: ctrlWrapper(getAllCategories),
	addNote: ctrlWrapper(addNote),
	deleteNote: ctrlWrapper(deleteNote),
	updateNote: ctrlWrapper(updateNote),
};
