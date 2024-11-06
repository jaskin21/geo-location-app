const { default: axios } = require('axios');
const { errorResponseFactory } = require('../utils/errorResponseFactory');
const { responseFactory, responseStatus } = require('../utils/responseFactory');
const {
  ipInformationValidation,
} = require('../validation/ipInformationValidation');
const { IpAddressInformation } = require('../model/ipInformationModel');

const fetchIpAddress = async (req, res) => {
  const fetchUserLocalIpAddress = async () => {
    const response = await axios.get('https://api64.ipify.org?format=json');
    return response.data.ip;
  };

  try {
    const ip = req.query.ip || (await fetchUserLocalIpAddress());

    // Construct the URL based on the provided IP (or your server's IP if no IP provided)
    const url = `https://ipinfo.io/${ip}/json`;

    const ipInfoResponse = await axios.get(url);

    // Return only the relevant data
    return responseFactory(res, 200, { data: ipInfoResponse.data });
  } catch (err) {
    return errorResponseFactory(
      res,
      400,
      err?.message ?? 'Something went wrong, please try again'
    );
  }
};

const createIpAddress = async (req, res) => {
  try {
    const reqBody = req.body;
    const data = {
      ip: reqBody.ip,
      city: reqBody.city,
      region: reqBody.region,
      country: reqBody.country,
      postal: reqBody.postal,
      timezone: reqBody.timezone,
    };

    const { error } = ipInformationValidation(data);

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

    const saveIpAddress = new IpAddressInformation(data);
    const ipAddressSaveResponse = await saveIpAddress.save();

    // Send a success response with the saved IP address information
    return responseFactory(res, 200, { data: ipAddressSaveResponse });
  } catch (err) {
    return errorResponseFactory(
      res,
      400,
      err?.message ?? 'Something went wrong, please try again'
    );
  }
};

const allSearchedIpAddressHistory = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Get sort parameters from query, default to sorting by createdAt in descending order
    const sortField = req.query.sortField || 'createdAt';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;

    const skip = (page - 1) * limit;

    // Fetch the paginated search history from the collection with sorting
    const searchHistory = await IpAddressInformation.find()
      .skip(skip)
      .limit(limit)
      .sort({ [sortField]: sortOrder });

    // Get the total count of documents for pagination info
    const totalDocuments = await IpAddressInformation.countDocuments();
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

module.exports = {
  fetchIpAddress,
  createIpAddress,
  allSearchedIpAddressHistory,
};
