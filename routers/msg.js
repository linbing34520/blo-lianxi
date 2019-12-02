var express = require('express');


var path = require('path');
var db = require('./db');
var router = express.Router();

function checklogin(req,res,next){
    if(req.session.user){
        next();
    }else{
        res.redirect('/login')
    }
}

router.get('/',checklogin,function(req,res){
   // console.log(req.session.user);
   res.locals.user = req.session.user;
    res.render('msg')
});

router.post('/save',function(req,res){
    var uid = req.session.user.id;
    var d = new Date();
    var time = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()+'-'+d.getHours()+'-'+d.getMinutes();
    //console.log(req.session.user);
    db.query("INSERT INTO `articles` (`title`, `context`, `uid`, `time`) VALUES ('"+req.body.title+"', '"+req.body.context+"', '"+uid+"', '"+time+"')",function(error, results, fields){
        // console.log(results);
       
    })


    res.send('ok');
})

router.post('/savemsg',function(req,res){
    var d = new Date();
    var time = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()+'-'+d.getHours()+'-'+d.getMinutes();
    db.query("INSERT INTO `msgs` ( `context`, `aid`, `uid`, `time`) VALUES ('"+req.body.context+"', '"+req.body.aid+"', '"+req.body.uid+"', '"+time+"')",function(error, results, fields){
        console.log(error);
        console.log(results)
    })
    res.send('ok')
});


 module.exports = router;

