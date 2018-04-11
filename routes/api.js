module.exports = (app, db) => {
    
    /*
    API: Save a requirement
    Method: POST
    */

    app.post('/requirement', (req, res) => {
        db.collection('quotes').save(req.body, (err, result) => {
            if (err) return console.log(err)
      
            console.log('saved to database')
            res.redirect('/')
        })
    })

}