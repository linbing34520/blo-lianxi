var express = require('express');
var crypto = require('crypto');

var path = require('path');
var db = require('./db');
var router = express.Router();

router.get('/', function (req, res) {
    res.locals.user = req.session.user;
    res.render('login')
});
router.post('/singin', function (req, res) {
    // console.log(req.body);
    try {
        res.locals.user = req.session.user;
        const spw = crypto.createHmac('sha256', 'bing').update(req.body.password).digest('hex');
        db.query("SELECT * FROM `users` WHERE (`username`='" + req.body.username + "' and `password`='" + spw + "')", function (error, results, fields) {
            console.log(results.length);
            // res.send('登录成功')
            var count = results.length;
            if (count >= 1) {
                
                var user = {
                    id: results[0].id,
                    username: results[0].username,
                    sex: results[0].sex,
                    avatar: results[0].avatar,
                    intro: results[0].intro
                }
                req.session.user = user;
                res.locals.user = req.session.user;
                res.redirect('/');
            } else {
                res.send('用户名或密码错误');
            }
        })
    } catch (error) {
        res.send('操作失败');
    }

})




module.exports = router;

 //supervisor 热更新