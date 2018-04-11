var express = require('express')
var router = express.Router()

module.exports = (app, db) => {
    
    router.use(function timeLog (req, res, next) {
       console.log('Time: ', Date.now())
       next()
    })

    /*
    API: Save a requirement
    Method: POST
    */

    router.post('/requirement', (req, res) => {
        db.collection('quotes').save(req.body, (err, result) => {
            if (err) return console.log(err)
      
            console.log('saved to database')
            res.redirect('/')
        })
    })
    
    return router

}
