const express = require("express");
const ctrl = require("../../controllers/diary");
const router = express.Router();
const { authenticate, validateBody, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/diary");

router.get("/getAllNotes", authenticate,  ctrl.getAllNotes);
router.get("/getAllCategories", authenticate,  ctrl.getAllCategories);
router.post("/addNote", authenticate, validateBody(schemas.addNoteSchema),  ctrl.addNote);
router.delete("/deleteNote/:noteId", authenticate, isValidId,  ctrl.deleteNote);
router.put("/updateNote/:noteId", authenticate, isValidId, validateBody(schemas.updateNoteSchema), ctrl.updateNote);

module.exports = router;