const express = require('express');
const {
  createBookmarkNote,
  deleteBookmarkNote,
  allSearchBookmarkNotes,
  SearchBookmarkNotes,
} = require('../controller/bookmarkNoteController');
const router = express.Router();

/* User routes */
router.get('/', allSearchBookmarkNotes);
router.get('/:id', SearchBookmarkNotes);
router.post('/', createBookmarkNote);
router.delete('/', deleteBookmarkNote);

module.exports = router;
