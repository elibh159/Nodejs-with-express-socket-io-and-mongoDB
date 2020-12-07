const express = require('express');
const app = express();
const mongodb = 'mongodb+srv://elibh:password123@cluster0.iscuv.mongodb.net/<dbname>?retryWrites=true&w=majority';
app.set('view engine', 'ejs');
app.listen(5000);



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