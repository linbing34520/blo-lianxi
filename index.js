var express = require('express');

var path = require('path');
var bodyParser = require('body-parser')
var router = require('./routers');
var session = require('express-session');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'pubic')));
app.use(session({
    secret:'yy',
    cookie:{
        maxAge:Date.now()+1000000
    }
}))

// app.get('/xiangq/:uid',function(req,res){
//     //console.log(req.session.user);

//     db.query("SELECT * FROM users us,articles ass WHERE (us.id=ass.uid and `uid`='"+req.params.uid+"')",function(error, results, fields){
//         console.log(results);
//         res.locals.user = req.session.user;
//         res.render('xiangq',{as:results});
//     })

   
// });

app.set('views',path.join(__dirname,'views'));

app.set('view engine','ejs');



router(app);


app.listen('1008',function(){
    console.log('flog is run');
})