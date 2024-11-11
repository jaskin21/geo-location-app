const mongoose = require('mongoose');

const BookMarkNoteSchema = new mongoose.Schema(
  {
    ip: {
      type: String,
      required: [true, 'IP address is needed!.'],
    },
    note: {
      type: String,
      required: [true, 'Note required!'],
    },
  },
  { timestamps: true }
); // Enables createdAt and updatedAt fields

const BookMarkNote = mongoose.model('BookMarkNote', BookMarkNoteSchema);

module.exports = { BookMarkNote };
