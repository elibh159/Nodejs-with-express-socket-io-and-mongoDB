const express = require('express');
const mongoose = require('mongoose');
const app = express();
const mongodb = 'mongodb+srv://sa:Password123@cluster0.iscuv.mongodb.net/item-database?retryWrites=true&w=majority';
mongoose.connect(mongodb, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('connected')
  app.listen(5000);
}).catch(err => console.log(err))
app.set('view engine', 'ejs');



app.get('/', (req, res) => {
  const items = [
    { name: 'mobile phone', price: 1000 },
    { name: 'book', price: 30 },
    { name: 'computer', price: 2000 }
  ]
  res.render('index', { items })
})

app.get('/add-item', (req, res) => {
  res.render('add-item')
})
app.use((req, res) => {
  res.render('error-page')
})