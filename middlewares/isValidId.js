const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { noteId } = req.params;
  if (!isValidObjectId(noteId)) {
    next(HttpError(400, `${noteId} is not valid`));
  }
  next();
};

module.exports = isValidId;
