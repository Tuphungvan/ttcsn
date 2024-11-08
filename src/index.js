const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars'); // Sử dụng cú pháp require
const app = express();
const port = 3000;

// HTTP logger
app.use(morgan('combined'));

// Template engine
app.engine('hbs', engine(
  {extname: '.hbs'}
));
app.set('view engine', 'hbs');
//quan ly duong dan, dung tu thu muc
app.set('views', path.join(__dirname, 'resources', 'views'));

// Route
app.get('/', (req, res) => {
  //lay home trong views
  res.render('home');
});

// Start server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
