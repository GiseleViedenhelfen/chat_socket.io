const mongoose = require('mongoose');
require('dotenv').config();

const connectToDatabase = (
  mongoDatabaseURI = process.env.DB_URL
) => mongoose.connect(mongoDatabaseURI);

module.exports = connectToDatabase;