var express = require('express');


var path = require('path');
var db = require('./db');
var router = express.Router();





// router.get('/:id',function(req,res){
//         //console.log(req.session.user);

//         db.query("SELECT * FROM users us,articles ass WHERE (us.id=ass.uid and `id`='"+req.params.id+"')",function(error, results, fields){
//             console.log(results);
//             res.locals.user = req.session.user;
//             res.render('xiangq',{as:results});
//         })

       
//     });




 module.exports = router;

