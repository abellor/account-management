let ejs = require('ejs')
let express = require('express')
let router = express.Router()
let template = "/templates/body.ejs"

var send = require('gmail-send')({
      user: 'camandrebello@gmail.com',
      pass: 'ilrwqelgfudeguaz',
      to:   'camandrebello@gmail.com',
      subject: 'test subject'
    });

module.exports = (app, db) => {
    
    router.use(function timeLog (req, res, next) {
       console.log('Time: ', Date.now())
       next()
    })

    router.post('/requirement', (req, res) => {
        db.collection('quotes').save(req.body, (err, result) => {
            if (err) return console.log(err)
            
            ejs.renderFile(__dirname + template, req.body, (err, html) => {
                if (err) console.log(err); // Handle error
                
                send({
                    subject: "Nueva orden de servicio: " + req.body.serviceorder,
                    to: ["camandrebello@gmail.com", req.body.mail],
                    html: html,
                    text: html
                }, function (err, res) {
                    console.log('*send() callback returned: err:', err, '; res:', res);
                });

            });
            
            console.log('saved to database')
            res.redirect('/')
        })
    })

    router.get('/requirement', (req, res) =>{
        db.collection('quotes').find().toArray((err, result) => {
            if (err) return console.log(err)
            res.send({quotes: result})
        })
    });

router.get('/test', (req,res) => {
res.send({"message":"connected GET"});
})
    
    return router
}
