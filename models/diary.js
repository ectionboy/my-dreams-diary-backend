const { Schema, model } = require("mongoose");

const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const categories = ["None", "Electronics", "Machinery", "Technologies", "Art"];

const diarySchema = new Schema(
	{
		owner: {
			type: Schema.Types.ObjectId,
			ref: "user",
		},
		description: {
			type: String,
			default: "",
		},
		imgUrl: {
			type: String,
		},
		title: {
			type: String,
			require: true,
		},
		category: {
			type: String,
			require: true,
			default: "none",
			enum: categories,
		},
	},
	{ versionKey: false, timestamps: true }
);

diarySchema.post("save", handleMongooseError);

const addNoteSchema = Joi.object({
	title: Joi.string().required(),
	description: Joi.string(),
	category: Joi.string().valid(...categories),
});
const deleteNoteSchema = Joi.object({
	_id: Joi.string().required(),
});
const updateNoteSchema = Joi.object({
	title: Joi.string(),
	description: Joi.string(),
	category: Joi.string().valid(...categories),
});

const schemas = {
	addNoteSchema,
	deleteNoteSchema,
	updateNoteSchema,
};

const Diary = model("diary", diarySchema);

module.exports = {
	Diary,
	schemas,
	categories,
};
