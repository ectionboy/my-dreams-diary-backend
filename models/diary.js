const { Schema, model } = require("mongoose");

const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const diarySchema = new Schema(
	{
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'user',
          },
		description: {
			type: String,
            default: ""
		},
        imgUrl: {
			type: String,
		},
        title: {
			type: String,
            require: true,
		},
	},
	{ versionKey: false, timestamps: true }
);

diarySchema.post("save", handleMongooseError);

const addNoteSchema = Joi.object({
	title: Joi.string().required(),
	description: Joi.string(),
});
const deleteNoteSchema = Joi.object({
	_id: Joi.string().required(),
});

const schemas = {
	addNoteSchema,
    deleteNoteSchema,
};

const Diary = model("diary", diarySchema);

module.exports = {
	Diary,
	schemas,
};
