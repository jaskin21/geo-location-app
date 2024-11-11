const { errorResponseFactory } = require('../utils/errorResponseFactory');
const { responseFactory, responseStatus } = require('../utils/responseFactory');
const { bookmarkNote } = require('../validation/bookmarkNoteValidation');
const { BookMarkNote } = require('../model/bookmarkNoteModel');

const allSearchBookmarkNotes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Get sort parameters from query, default to sorting by createdAt in descending order
    const sortField = req.query.sortField || 'createdAt';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;

    const skip = (page - 1) * limit;

    // Fetch the paginated search history from the collection with sorting
    const searchHistory = await BookMarkNote.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    // Get the total count of documents for pagination info
    const totalDocuments = await BookMarkNote.countDocuments();
    const totalPages = Math.ceil(totalDocuments / limit);

    // Send a success response with the paginated and sorted data
    return responseFactory(res, 200, {
      data: searchHistory,
      currentPage: page,
      totalPages,
      totalItems: totalDocuments,
      sortField,
      sortOrder: sortOrder === 1 ? 'asc' : 'desc',
    });
  } catch (err) {
    return errorResponseFactory(
      res,
      400,
      err?.message ?? 'Something went wrong, please try again'
    );
  }
};

const SearchBookmarkNotes = async (req, res) => {
  try {
    const ipAddress = req.params.id; // Assume 'id' is the IP address to search
    console.log(ipAddress);
    const bookmarkNote = await BookMarkNote.findOne({ ip: ipAddress });

    return responseFactory(res, 200, { data: bookmarkNote });
  } catch (err) {
    return errorResponseFactory(
      res,
      400,
      err?.message ?? 'Something went wrong, please try again'
    );
  }
};

const createBookmarkNote = async (req, res) => {
  try {
    const reqBody = req.body;
    const data = {
      ip: reqBody.ip,
      note: reqBody.note,
    };

    const { error } = bookmarkNote(data);

    if (error) {
      return errorResponseFactory(
        res,
        responseStatus.BAD_REQUEST,
        error.details[0].message,
        {
          details: error.details,
        }
      );
    }

    const saveNote = new BookMarkNote(data);
    const saveBookmarkResponse = await saveNote.save();

    // Send a success response with the saved IP address information
    return responseFactory(res, 200, { data: saveBookmarkResponse });
  } catch (err) {
    return errorResponseFactory(
      res,
      400,
      err?.message ?? 'Something went wrong, please try again'
    );
  }
};

const deleteBookmarkNote = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: 'No IDs provided for deletion' });
    }

    const result = await BookMarkNote.deleteMany({ _id: { $in: ids } });

    return res.status(200).json({
      message: `${result.deletedCount} record(s) deleted successfully.`,
    });
  } catch (err) {
    return errorResponseFactory(
      res,
      400,
      err?.message ?? 'Something went wrong, please try again'
    );
  }
};

module.exports = {
  allSearchBookmarkNotes,
  SearchBookmarkNotes,
  createBookmarkNote,
  deleteBookmarkNote,
};
