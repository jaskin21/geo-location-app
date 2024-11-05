const { default: axios } = require('axios');
const { errorResponseFactory } = require('../utils/errorResponseFactory');
const { responseFactory } = require('../utils/responseFactory');

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

module.exports = { fetchIpAddress };
