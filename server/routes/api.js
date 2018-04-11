let express = require('express')
let router = express.Router()

module.exports = (app, db) => {
    
    router.use(function timeLog (req, res, next) {
       console.log('Time: ', Date.now())
       next()
    })

    router.post('/requirement', (req, res) => {
        db.collection('quotes').save(req.body, (err, result) => {
            if (err) return console.log(err)
      
            console.log('saved to database')
            res.redirect('/')
        })
    })

    app.get('/requirement', (req, res) =>{
        db.collection('quotes').find().toArray((err, result) => {
            if (err) return console.log(err)
            res.send({quotes: result})
        })
    });

app.get('/', (req,res) => {
res.send("connected GET");
})
    
    return router
}
