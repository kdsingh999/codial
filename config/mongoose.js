const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

mongoose.connect('mongodb://localhost:27017/codial_development', (err) => {
  if (!err) console.log('Database is connected');
  else console.log('database is not connected');
});

const db = mongoose.connection;
db.on('error', console.error.bind);

module.exports = db;
