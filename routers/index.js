var reg = require('./reg')
var login = require('./login');
var msg = require('./msg');
var db = require('./db');
var xiangq = require('./xiangq')
module.exports = function(app){
    app.get('/',function(req,res){
        //console.log(req.session.user);

        db.query("SELECT * FROM users us,articles ass WHERE us.id=ass.uid",function(error, results, fields){
                // console.log(results);

            res.locals.user = req.session.user;
            res.render('index',{as:results});
        })

       
    });
    app.get('/xiangq/:id',function(req,res){
        res.locals.user = req.session.user;
        var aid = req.params.id;
        db.query("SELECT * FROM articles ass,users us WHERE ass.id="+aid+" AND us.id=ass.uid",function(error, results, fields){
            
            // console.log(results);
            db.query("SELECT * FROM msgs ms,users us WHERE ms.aid="+aid+" AND us.id=ms.uid",function(err2,msgs){
                // console.log(msgs);
                res.render('xiangq',{article:results[0],msg:msgs});
            });
            
            
        });
        
    })


    app.get('/logout',function(req,res){
        req.session.user = '';
        res.locals.user = req.session.user;
        res.redirect('/')
    })
    app.use('/reg',reg);
    app.use('/login',login);
    app.use('/msg',msg);
    app.use('/xiangq',xiangq)
}