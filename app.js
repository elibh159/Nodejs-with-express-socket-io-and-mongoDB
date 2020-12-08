const express = require('express');
const mongoose = require('mongoose');
const Item = require('./models/items');
const app = express();

app.use(express.urlencoded({ extended: true }));
const mongodb = 'mongodb+srv://sa:Password123@cluster0.iscuv.mongodb.net/item-database?retryWrites=true&w=majority';
mongoose.connect(mongodb, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('connected')
  app.listen(5000);
}).catch(err => console.log(err))

app.set('view engine', 'ejs');




app.get('/get-item', (req, res) => {
  Item.findById("5fcf3da401f19b298c0b7106").then(result => res.send(result)).catch(err => console.log(err))

})


app.get('/', (req, res) => {
  res.redirect('/get-items');
})

app.get('/get-items', (req, res) => {
  Item.find().then(result =>
    res.render('index', { items: result })
  ).catch(err => console.log(err))
})

app.get('/add-item', (req, res) => {
  res.render('add-item')
})

app.post('/items', (req, res) => {
  console.log(req.body)
  const item = Item(req.body);
  item.save().then(() => {
    res.redirect('/get-items')
  }).catch(err => console.log(err))
})

app.get('/items/:id', (req, res) => {
  const id = req.params.id;
  Item.findById(id).then(result => {
    console.log('result', result);
    res.render('item-detail', { item: result })
  })
})

app.delete('/items/:id', (req, res) => {
  const id = req.params.id;
  Item.findByIdAndDelete(id).then(result => {
    res.redirect('/get-items')
  }).catch(err => console.log(err))
})

app.use((req, res) => {
  res.render('error-page')
})