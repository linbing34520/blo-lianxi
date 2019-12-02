var express = require('express');
var crypto = require('crypto');
var multer = require('multer');
var path = require('path');
var db = require('./db');
var router = express.Router();

var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'../','pubic','img'));
    },
    filename:function(req,file,cb){
        var hz = file.originalname.split('.');
        cb(null,Date.now()+'.'+ hz[hz.length-1])
    }
});
var upload = multer({storage:storage});
router.get('/',function(req,res){
    res.locals.user = req.session.user;
    res.render('reg')
});

router.post('/save',upload.single('avatar'),function(req,res){
    // console.log(req.file.filename)
    const spw = crypto.createHmac('sha256','bing').update(req.body.password).digest('hex');
    db.query("SELECT COUNT(*) FROM `users` WHERE `username`='"+req.body.username+"'",function(error, results, fields){
        var count = results[0]['COUNT(*)'];
        if(count>=1){
            res.send('该账户已存在')
        }else{
            db.query("INSERT INTO `users` (`username`, `password`, `sex`, `avatar`, `intro`) VALUES ('"+req.body.username+"', '"+spw+"', '"+req.body.sex+"', '"+req.file.filename+"', '"+req.body.intro+"')",function(error, results, fields){
                // console.log(results);
            // res.send('注册成功');
            res.redirect('/login')
            }) 
        }
    })

    
    
})




 module.exports = router;

 //supervisor 热更新