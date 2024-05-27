const express = require("express");
const app = express();
const port = process.env.PORT || 5000
const db = require("./data/db");
const authorRouter = require('./routes/author.js');
const workRouter = require('./routes/work.js')

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  // Add other CORS headers as needed
  next();
});

app.use('/api/authors', authorRouter);
app.use('/api/works', workRouter);

app.get("/", (req, res) => {
  res.send("Latin Library API");
});

app.listen(port, () => {
  console.log(`listening at port: ${port}`)
});

db.connect();
