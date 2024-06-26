require("dotenv").config();

const mongoose = require('mongoose');
const Author = require('../server/models/Author');
const Work = require('../server/models/Work');
const Book = require('../server/models/Book');
const fs = require('fs');
const path = require('path');

function preprocess_text(text) {
  return text.replace(/\d+$/gm, '');
}

// returns an array whose indices correspond to each book
// i=0 is the complete text (each book concatanated into one long string)
function process_georgics_text() {
  const folder_path = path.join(__dirname, 'georgics');
  const georgics_books_text = [];
  let complete_text = '';
  // iterate over each book file
  for (let i = 1; i <= 4; i++) {
    const file_path = path.join(folder_path, `book_${i}.txt`);
    const text = fs.readFileSync(file_path, 'utf8');
    const processed_text = preprocess_text(text);
    georgics_books_text.push(processed_text);
    complete_text += processed_text;
  }
  georgics_books_text.unshift(complete_text); // add the complete text at the beginning of the array
  return georgics_books_text;
}

function process_eclogues_text() {
  const folder_path = path.join(__dirname, 'eclogues');
  const eclogues_books_text = [];
  let complete_text = '';
  // iterate over each book file
  for (let i = 1; i <= 10; i++) {
    const file_path = path.join(folder_path, `book_${i}.txt`);
    const text = fs.readFileSync(file_path, 'utf8');
    const processed_text = preprocess_text(text);
    eclogues_books_text.push(processed_text);
    complete_text += processed_text;
  }
  eclogues_books_text.unshift(complete_text);
  return eclogues_books_text;
}

function process_aeneid_text() {
  const folder_path = path.join(__dirname, 'aeneid');
  const aeneid_books_text = [];
  let complete_text = '';
  // iterate over each book file
  for (let i = 1; i <= 12; i++) {
    const file_path = path.join(folder_path, `book_${i}.txt`);
    const text = fs.readFileSync(file_path, 'utf8');
    const processed_text = preprocess_text(text);
    aeneid_books_text.push(processed_text);
    complete_text += processed_text;
  }
  aeneid_books_text.unshift(complete_text);
  return aeneid_books_text;
} 

// SCRIPT RUNS STARTING FROM HERE::
mongoose.connect(process.env.DB_URI);

async function push_to_db() {
  const georgics_books_text = process_georgics_text();
  const eclogues_books_text = process_eclogues_text();
  const aeneid_books_text = process_aeneid_text();

  const aeneid_books = await Promise.all([
    Book.create({ title: 'P. VERGILI MARONIS AENEIDOS LIBER PRIMVS', title_english: 'Aeneid I', text: aeneid_books_text[1] }),
    Book.create({ title: 'P. VERGILI MARONIS AENEIDOS LIBER SECVNDVS', title_english: 'Aeneid II', text: aeneid_books_text[2] }),
    Book.create({ title: 'P. VERGILI MARONIS AENEIDOS LIBER TERTIVS', title_english: 'Aeneid III', text: aeneid_books_text[3] }),
    Book.create({ title: 'P. VERGILI MARONIS AENEIDOS LIBER QVARTVS', title_english: 'Aeneid IV', text: aeneid_books_text[4] }),
    Book.create({ title: 'P. VERGILI MARONIS AENEIDOS LIBER QVINTVS', title_english: 'Aeneid V', text: aeneid_books_text[5] }),
    Book.create({ title: 'P. VERGILI MARONIS AENEIDOS LIBER SEXTVS', title_english: 'Aeneid VI', text: aeneid_books_text[6] }),
    Book.create({ title: 'P. VERGILI MARONIS AENEIDOS LIBER SEPTIMVS', title_english: 'Aeneid VII', text: aeneid_books_text[7] }),
    Book.create({ title: 'P. VERGILI MARONIS AENEIDOS LIBER OCTAVVS', title_english: 'Aeneid VIII', text: aeneid_books_text[8] }),
    Book.create({ title: 'P. VERGILI MARONIS AENEIDOS LIBER NONVS', title_english: 'Aeneid VIX', text: aeneid_books_text[9] }),
    Book.create({ title: 'P. VERGILI MARONIS AENEIDOS LIBER DECIMVS', title_english: 'Aeneid X', text: aeneid_books_text[10] }),
    Book.create({ title: 'P. VERGILI MARONIS AENEIDOS LIBER VNDECIMVS', title_english: 'Aeneid XI', text: aeneid_books_text[11] }),
    Book.create({ title: 'P. VERGILI MARONIS AENEIDOS LIBER DVODECIMVS', title_english: 'Aeneid XII', text: aeneid_books_text[12] })
  ]);

  const the_aeneid = await Work.create({
    title: 'Aeneis',
    english_title: 'Aeneid',
    code: 'A',
    text: aeneid_books_text[0],
    compositionDate: '30-19 BCE',
    books: aeneid_books
  });

  const eclogues_books = await Promise.all([
    Book.create({ title: 'P. VERGILI MARONIS ECLOGA PRIMA', title_english: 'Eclogue I', text: eclogues_books_text[1] }),
    Book.create({ title: 'P. VERGILI MARONIS ECLOGA SECVNDA', title_english: 'Eclogue II', text: eclogues_books_text[2] }),
    Book.create({ title: 'P. VERGILI MARONIS ECLOGA TERTIA', title_english: 'Eclogue III', text: eclogues_books_text[3] }),
    Book.create({ title: 'P. VERGILI MARONIS ECLOGA QVARTA', title_english: 'Eclogue IV', text: eclogues_books_text[4] }),
    Book.create({ title: 'P. VERGILI MARONIS ECLOGA QVINTA', title_english: 'Eclogue V', text: eclogues_books_text[5] }),
    Book.create({ title: 'P. VERGILI MARONIS ECLOGA SEXTA', title_english: 'Eclogue VI', text: eclogues_books_text[6] }),
    Book.create({ title: 'P. VERGILI MARONIS ECLOGA SEPTIMA', title_english: 'Eclogue VII', text: eclogues_books_text[7] }),
    Book.create({ title: 'P. VERGILI MARONIS ECLOGA OCTAVA', title_english: 'Eclogue VIII', text: eclogues_books_text[8] }),
    Book.create({ title: 'P. VERGILI MARONIS ECLOGA NONA', title_english: 'Eclogue IX', text: eclogues_books_text[9] }),
    Book.create({ title: 'P. VERGILI MARONIS ECLOGA DECIMA', title_english: 'Eclogue X', text: eclogues_books_text[10] })
  ]);

  const eclogues = await Work.create({
      title: 'Eclogae',
      english_title: 'Eclogues',
      alt_title: 'Bucolics',
      code: 'Ecl',
      text: eclogues_books_text[0],
      composition_date: '42-37 BCE', // https://www.britannica.com/topic/Eclogues-by-Virgil
      books: eclogues_books
    });

  const georgics_books = await Promise.all([
    Book.create({ title: 'P. VERGILI MARONIS GEORGICON LIBER PRIMVS', title_english: 'Georgics I', text: georgics_books_text[1] }),
    Book.create({ title: 'P. VERGILI MARONIS GEORGICON LIBER SECVNDVS', title_english: 'Georgics II', text: georgics_books_text[2] }),
    Book.create({ title: 'P. VERGILI MARONIS GEORGICON LIBER TERTIVS', title_english: 'Georgics III', text: georgics_books_text[3] }),
    Book.create({ title: 'P. VERGILI MARONIS GEORGICON LIBER QVARTVS', title_english: 'Georgics IV', text: georgics_books_text[4] })
  ]);

  const georgics = await Work.create({
      title: 'Georgica',
      english_title: 'Georgics',
      code: 'G',
      text: georgics_books_text[0],
      composition_date: '37-30 BCE', // https://www.britannica.com/biography/Virgil#ref388807
      books: georgics_books
    })

  await Author.create({
    name: 'Publius Vergilius Maro',
    code: 'Verg',
    works: [the_aeneid, eclogues, georgics],
    date_of_birth: '15 October, 70 BCE',
    date_of_death: '21 September, 19 BCE'
  });
}

push_to_db()
  .then(() => {
    console.log('Database populated successfully');
    mongoose.connection.close();
  })
  .catch(error => {
    console.error('Error populating database:', error);
  });


// FIRST ATTEMPT TO PUSH TO DB
// WRONG APPROACH; SHOULD NOT CHAIN ASYNC CALLS AND MAKE THEM INTERDEPENDENT
// NEED TO USE AWAIT TO FORCE CODE TO PAUSE ITSELF
// HERE FOR PEDAGOGICAL REASONS
async function populate_db_Vergil() {
  const [georgics_books_text, eclogues_books_text, aeneid_books_text] = await Promise.all([
    process_georgics_text(),
    process_eclogues_text(),
    process_aeneid_text()
  ]);

  console.log(georgics_books_text)

  mongoose.connect(process.env.DB_URI)
    .then(() => {
      console.log('Connected to MongoDB');
      return Promise.all([
        aeneid_books = [Book.create({ title: 'P. VERGILI MARONIS AENEIDOS LIBER PRIMVS', title_english: 'Aeneid I', text: aeneid_books_text[1] }),
        Book.create({ title: 'P. VERGILI MARONIS AENEIDOS LIBER SECVNDVS', title_english: 'Aeneid II', text: aeneid_books_text[2] }),
        Book.create({ title: 'P. VERGILI MARONIS AENEIDOS LIBER TERTIVS', title_english: 'Aeneid III', text: aeneid_books_text[3] }),
        Book.create({ title: 'P. VERGILI MARONIS AENEIDOS LIBER QVARTVS', title_english: 'Aeneid IV', text: aeneid_books_text[4] }),
        Book.create({ title: 'P. VERGILI MARONIS AENEIDOS LIBER QVINTVS', title_english: 'Aeneid V', text: aeneid_books_text[5] }),
        Book.create({ title: 'P. VERGILI MARONIS AENEIDOS LIBER SEXTVS', title_english: 'Aeneid VI', text: aeneid_books_text[6] }),
        Book.create({ title: 'P. VERGILI MARONIS AENEIDOS LIBER SEPTIMVS', title_english: 'Aeneid VII', text: aeneid_books_text[7] }),
        Book.create({ title: 'P. VERGILI MARONIS AENEIDOS LIBER OCTAVVS', title_english: 'Aeneid VIII', text: aeneid_books_text[8] }),
        Book.create({ title: 'P. VERGILI MARONIS AENEIDOS LIBER NONVS', title_english: 'Aeneid VIX', text: aeneid_books_text[9] }),
        Book.create({ title: 'P. VERGILI MARONIS AENEIDOS LIBER DECIMVS', title_english: 'Aeneid X', text: aeneid_books_text[10] }),
        Book.create({ title: 'P. VERGILI MARONIS AENEIDOS LIBER VNDECIMVS', title_english: 'Aeneid XI', text: aeneid_books_text[11] }),
        Book.create({ title: 'P. VERGILI MARONIS AENEIDOS LIBER DVODECIMVS', title_english: 'Aeneid XII', text: aeneid_books_text[12] }),],

        the_aeneid = Work.create({
          title: 'Aeneis',
          english_title: 'Aeneid',
          code: 'A',
          text: aeneid_books_text[0],
          compositionDate: '30-19 BCE',
          books: aeneid_books
        }),

        eclogues_books = [Book.create({ title: 'P. VERGILI MARONIS ECLOGA PRIMA', title_english: 'Eclogue I', text: eclogues_books_text[1] }),
        Book.create({ title: 'P. VERGILI MARONIS ECLOGA SECVNDA', title_english: 'Eclogue II', text: eclogues_books_text[2] }),
        Book.create({ title: 'P. VERGILI MARONIS ECLOGA TERTIA', title_english: 'Eclogue III', text: eclogues_books_text[3] }),
        Book.create({ title: 'P. VERGILI MARONIS ECLOGA QVARTA', title_english: 'Eclogue IV', text: eclogues_books_text[4] }),
        Book.create({ title: 'P. VERGILI MARONIS ECLOGA QVINTA', title_english: 'Eclogue V', text: eclogues_books_text[5] }),
        Book.create({ title: 'P. VERGILI MARONIS ECLOGA SEXTA', title_english: 'Eclogue VI', text: eclogues_books_text[6] }),
        Book.create({ title: 'P. VERGILI MARONIS ECLOGA SEPTIMA', title_english: 'Eclogue VII', text: eclogues_books_text[7] }),
        Book.create({ title: 'P. VERGILI MARONIS ECLOGA OCTAVA', title_english: 'Eclogue VIII', text: eclogues_books_text[8] }),
        Book.create({ title: 'P. VERGILI MARONIS ECLOGA NONA', title_english: 'Eclogue IX', text: eclogues_books_text[9] }),
        Book.create({ title: 'P. VERGILI MARONIS ECLOGA DECIMA', title_english: 'Eclogue X', text: eclogues_books_text[10] }),],

        eclogues = Work.create({
          title: 'Eclogae',
          english_title: 'Eclogues',
          alt_title: 'Bucolics',
          code: 'Ecl',
          text: eclogues_books_text[0],
          composition_date: '42-37 BCE', // https://www.britannica.com/topic/Eclogues-by-Virgil
          books: eclogues_books
        }),

        georgics_books = [Book.create({ title: 'P. VERGILI MARONIS GEORGICON LIBER PRIMVS', title_english: 'Georgics I', text: georgics_books_text[1] }),
        Book.create({ title: 'P. VERGILI MARONIS GEORGICON LIBER SECVNDVS', title_english: 'Georgics II', text: georgics_books_text[2] }),
        Book.create({ title: 'P. VERGILI MARONIS GEORGICON LIBER TERTIVS', title_english: 'Georgics III', text: georgics_books_text[3] }),
        Book.create({ title: 'P. VERGILI MARONIS GEORGICON LIBER QVARTVS', title_english: 'Georgics IV', text: georgics_books_text[4] })],

        georgics = Work.create({
          title: 'Georgica',
          english_title: 'Georgics',
          code: 'G',
          text: georgics_books_text[0],
          composition_date: '37-30 BCE', // https://www.britannica.com/biography/Virgil#ref388807
          books: georgics_books
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
    .then(results => {
      const [aeneidBooks, aeneidWork, ecloguesBooks, ecloguesWork, georgicsBooks, georgicsWork, author] = results;
      aeneidWork.books = aeneidBooks;
      ecloguesWork.books = ecloguesBooks;
      georgicsWork.books = georgicsBooks;
      author.works = [aeneidWork, ecloguesWork, georgicsWork];
      return author.save();

    }).then(savedAuthor => {
      return Author.populate(savedAuthor, { path: 'works' });

    }).then(populatedAuthor => {
      console.log('Author with populated works:', populatedAuthor);
    })
    .then(() => {
      console.log('Data inserted successfully');
      return mongoose.disconnect();
    })
    .then(() => {
      console.log('Disconnected from MongoDB');
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
