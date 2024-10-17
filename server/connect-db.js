const mongoose = require('mongoose');
const debugLib = require('debug');

const debug = debugLib('server:database');

mongoose.set('strictQuery', false);

module.exports = async (connection, dbName) => {
  try {
    await mongoose.connect(connection, {
      dbName,
      serverSelectionTimeoutMS: 5000,
    });
    const isConnected = mongoose.connection.readyState;
    switch (isConnected) {
      case 0:
        console.log('MongoDB is disconnected');
        break;
      case 1:
        console.log('MongoDB is connected');
        break;
      case 2:
        console.log('MongoDB is connecting');
        break;
      case 3:
        console.log('MongoDB is disconnecting');
        break;
      default:
        console.log('Unknown MongoDB connection status');
    }
  } catch (error) {
    debug(error);
  }
};