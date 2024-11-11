const express = require('express');
const {
  createBookmarkNote,
  deleteBookmarkNote,
  allSearchBookmarkNotes,
} = require('../controller/bookmarkNoteController');
const router = express.Router();

/* User routes */
router.get('/', allSearchBookmarkNotes);
router.post('/', createBookmarkNote);
router.delete('/', deleteBookmarkNote);

module.exports = router;
