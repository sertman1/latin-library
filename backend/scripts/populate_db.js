// Import Mongoose and your Mongoose models
const mongoose = require('mongoose');
const Author = require('./server/models/Author');
const Work = require('./server/models/Work');
require("dotenv").config();

// Connect to MongoDB using Mongoose
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');

    // Insert data into MongoDB
    return Promise.all([
      //Author.create({ name: 'John Doe', country: 'USA' }),
      //Work.create({ title: 'Book 1', author: 'John Doe', year: 2020 }),
      //Work.create({ title: 'Book 2', author: 'Jane Smith', year: 2018 })

      // TODO: datapopulation here
      // run once using node
    ]);
  })
  .then(() => {
    console.log('Data inserted successfully');
    // Disconnect from MongoDB after data insertion
    return mongoose.disconnect();
  })
  .then(() => {
    console.log('Disconnected from MongoDB');
  })
  .catch((error) => {
    console.error('Error:', error);
  });
