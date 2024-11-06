const mongoose = require('mongoose');

const IpAddressInformationSchema = new mongoose.Schema(
  {
    ip: {
      type: String,
      required: [true, 'IP address is needed!.'],
    },
    city: {
      type: String,
    },
    region: {
      type: String,
    },
    country: {
      type: String,
    },
    postal: {
      type: String,
    },
    timezone: {
      type: String,
    },
  },
  { timestamps: true }
); // Enables createdAt and updatedAt fields

const IpAddressInformation = mongoose.model(
  'IpAddressInformation',
  IpAddressInformationSchema
);

module.exports = { IpAddressInformation };
