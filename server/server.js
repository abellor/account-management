const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const MongoClient = require('mongodb').MongoClient;

let db;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

MongoClient.connect('mongodb://admin:pymes100417!@localhost:27017/accounts', (err, client) => {

    if(err)
        throw err;
    console.log("connected to the mongoDB !");
    
    db = client.db('accounts');

    app.listen(2000, () => {
        console.log("listening port 2000");
    });

});

app.get('/', (req, res) =>{
    db.collection('quotes').find().toArray((err, result) => {
        if (err) return console.log(err)
        // renders index.ejs
        res.render('index.ejs', {quotes: result})
    })
});

app.post('/requirements', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})
