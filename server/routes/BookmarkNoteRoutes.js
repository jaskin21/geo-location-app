const express = require('express');
const {
  createBookmarkNote,
  deleteBookmarkNote,
  allSearchBookmarkNotes,
  SearchBookmarkNotes,
} = require('../controller/bookmarkNoteController');
const verify = require('../middleware/authMiddleware');
const { Roles } = require('../constant/middleware');
const router = express.Router();

/* User routes */
router.get('/', verify([Roles.USER]), allSearchBookmarkNotes);
router.get('/:id', verify([Roles.USER]), SearchBookmarkNotes);
router.post('/', verify([Roles.USER]), createBookmarkNote);
router.delete('/', verify([Roles.USER]), deleteBookmarkNote);

module.exports = router;
