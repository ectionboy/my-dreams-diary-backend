const express = require("express");
const ctrl = require("../../controllers/diary");
const router = express.Router();
const { authenticate, validateBody } = require("../../middlewares");
const { schemas } = require("../../models/diary");

router.get("/getAllNotes", authenticate,  ctrl.getAllNotes);
router.post("/addNote", authenticate, validateBody(schemas.addNoteSchema),  ctrl.addNote);
router.delete("/deleteNote/:noteId", authenticate,  ctrl.deleteNote);


module.exports = router;
