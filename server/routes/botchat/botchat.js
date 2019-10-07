var express = require('express');
var router = express.Router();
const  login = require('facebook-chat-api')
var apiai = require('apiai');
var app  = apiai("6cf2e7f90d5e4f56bc3bfc988158d35d");
/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('/api-botchat')
  });
  
router.post('/', function(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    login({email:email,password:password},(err,api)=>{
        if(err) {
          switch (err.error) {
              case 'login-approval':
                  if(req.body.pin){
                    err.continue(req.body.pin);
                    res.send('success');
                  }
                  break;
              case 'Wrong username/password.':
                res.send("Wrong username/password.");
                break;
              default:
                  console.error(err);
          }
          return;
      }
      api.listen((err, message) => {
        var request = app.textRequest(message.body,{sessionId: '<UNIQUE SESSION ID>'});
        request.on('response',(res)=>{
          api.sendMessage(res, message.threadID);
        })
       
      });
      api.getFriendsList((err, data) => {
        if(err) return console.error(err);
    
        console.log(data.length);
    });
});
})

module.exports = router;
