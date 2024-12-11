const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { engine } = require('express-handlebars'); // Sử dụng cú pháp require
const session = require('express-session');
const { faker } = require('@faker-js/faker');

const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db');
const User = require('./app/models/User'); // Mô hình người dùng
const methodOverride = require('method-override');

// Sử dụng method-override để xử lý các form với phương thức khác ngoài POST/GET
app.use(methodOverride('_method'));

// Connect to DB
db.connect();
//su dung file tinh
app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())

//vs dn dk
app.use(cors())
app.use(cookieParser())
// HTTP logger
app.use(morgan('combined'));

//session
app.use(session({
    secret: 'your-secret-key', 
    resave: false, 
    saveUninitialized: true, 
    cookie: { secure: false } 
}));

// Template engine
app.engine('hbs', engine(
  {extname: '.hbs',
    helpers: {
      eq: (a, b) => a === b,
      add: (a, b) => a + b,
      split: (text, delimiter) => text ? text.split(delimiter) : [],
      formatDate: (date) => new Date(date).toLocaleDateString('vi-VN'),
     reduce: function (array, field) {
        return array.reduce((total, item) => total + (item[field] || 0), 0);
      }
    },
    layoutsDir: path.join(__dirname, 'resources', 'views', 'users', 'layouts'),
    partialsDir: path.join(__dirname, 'resources', 'views', 'users', 'partials'),
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,  // Cho phép truy cập vào thuộc tính prototype
      allowProtoMethodsByDefault: true,     // Cho phép truy cập vào phương thức prototype
    },
}
));
app.set('view engine', 'hbs');
//quan ly duong dan, dung tu thu muc
app.set('views', path.join(__dirname, 'resources', 'views'));
// Middleware để tắt layout cho tất cả các route dưới /admin
app.use('/admin', (req, res, next) => {
  res.locals.layout = false;  // Tắt layout cho tất cả các route dưới /admin
  next();
});

// Route

route(app);



// Start server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});



