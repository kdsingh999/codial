const { urlencoded } = require('body-parser');
const express = require('express');
const cookieparser = require('cookie-parser');
const expresslayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

const app = express();
app.use(express.static('./assets'));
app.use(cookieparser());
app.use(express.urlencoded());
app.use(expresslayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.use(express.json());
app.use('/', require('./routes'));

app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(8000, (err) => {
  if (!err) console.log('Server is started');
  else console.log('server is not sterted');
});
