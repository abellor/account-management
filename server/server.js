const database      = require('./conf/db')
const path          = require("path");
const express       = require("express");
const bodyParser    = require("body-parser");
const MongoClient   = require('mongodb').MongoClient;

const port = 3001;
const app = express();

MongoClient.connect(database.url, (err, client) => {
    if(err)
        throw err;

    console.log("Connected to the mongoDB");
    let db = client.db('accounts');
    
    const api = require("./routes/api")(app, db);
    app.use('/api', api);

    app.listen(port, () => {
        console.log("Listening port " + port);
    });

});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
