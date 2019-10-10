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
      api.listen((err,messenger)=>{
        // console.log("content messenger: ",messenger.body);
        // console.log("type messenger :",typeof(messenger.body));
        // console.log("json messenger:",messenger);

        var request = app.textRequest(messenger.body, {
          sessionId: '<unique session id>'
          });
          request.on('response', function(response) {
            console.log(response);
            api.sendMessage(response.result.fulfillment.speech,messenger.threadID);     
          })
          request.on('error', function(error) {
              console.log(error);
              api.sendMessage("nhắn không hiểu gì ???",messenger.threadID);  
          });
          
          request.end();
      })
      // api.sendTypingIndicator('100009081543935',(err)=>{
      //   if(err) console.log(err);
      // })      
        
    
});
})

module.exports = router;
