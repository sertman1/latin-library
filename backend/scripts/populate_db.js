// Import Mongoose and your Mongoose models
const mongoose = require('mongoose');
const Author = require('../server/models/Author');
const Work = require('../server/models/Work');
const Book = require('../server/models/Book')
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
      aeneid_books = [Book.create({ title: 'P. VERGILI MARONIS AENEIDOS LIBER PRIMVS', title_english: 'Aeneid I', text: '' }),
                      Book.create({ title: 'P. VERGILI MARONIS AENEIDOS LIBER SECVNDVS', title_english: 'Aeneid II', text: '' }),
                      Book.create({ title: 'P. VERGILI MARONIS AENEIDOS LIBER TERTIVS', title_english: 'Aeneid III', text: '' }),
                      Book.create({ title: 'P. VERGILI MARONIS AENEIDOS LIBER QVARTVS', title_english: 'Aeneid IV', text: '' }),
                      Book.create({ title: 'P. VERGILI MARONIS AENEIDOS LIBER QVINTVS', title_english: 'Aeneid V', text: '' }),
                      Book.create({ title: 'P. VERGILI MARONIS AENEIDOS LIBER SEXTVS', title_english: 'Aeneid VI', text: '' }),
                      Book.create({ title: 'P. VERGILI MARONIS AENEIDOS LIBER SEPTIMVS', title_english: 'Aeneid VII', text: '' }),
                      Book.create({ title: 'P. VERGILI MARONIS AENEIDOS LIBER OCTAVVS', title_english: 'Aeneid VIII', text: '' }),
                      Book.create({ title: 'P. VERGILI MARONIS AENEIDOS LIBER NONVS', title_english: 'Aeneid VIX', text: '' }),
                      Book.create({ title: 'P. VERGILI MARONIS AENEIDOS LIBER DECIMVS', title_english: 'Aeneid X', text: '' }),
                      Book.create({ title: 'P. VERGILI MARONIS AENEIDOS LIBER VNDECIMVS', title_english: 'Aeneid XI', text: '' }),
                      Book.create({ title: 'P. VERGILI MARONIS AENEIDOS LIBER DVODECIMVS', title_english: 'Aeneid XII', text: '' }),],

      the_aeneid = Work.create({ title: 'Aeneis', 
                    english_title: 'The Aeneid',
                    code: 'A', 
                    text: 'TODO', 
                    compositionDate: '30-19 BCE', 
                    books: aeneid_books}),
      
      eclogues = Work.create({
        title: 'Eclogae',
        english_title: 'Eclogues',
        alt_title: 'Bucolics',
        code: 'Ecl',
        text: 'TODO',
        composition_date: '42-37 BCE', // https://www.britannica.com/topic/Eclogues-by-Virgil
        books: 'TODO'
      }),

      georgics = Work.create({
        title: 'Georgica',
        english_title: 'Georgics',
        code: 'G',
        text: 'TODO',
        composition_date: '37-30 BCE', // https://www.britannica.com/biography/Virgil#ref388807
        books: 'TODO'
      }),

      Author.create({
        name: 'Publius Vergilius Maro',
        code: 'Verg',
        works: [the_aeneid, eclogues, georgics],
        date_of_birth: '15 October, 70 BCE',
        date_of_death: '21 September, 19 BCE'
      }),
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
