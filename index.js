var Twit = require("twit");

require("dotenv").config();

const michaelJacksonBot = new Twit({

    consumer_key: process.env.CONSUMER_KEY,  
  
    consumer_secret: process.env.CONSUMER_SECRET,    
    access_token: process.env.ACCESS_TOKEN,  
  
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    timeout_ms: 60 * 1000
});

function acaoMichaelJacksonBot() {
 
    setInterval(acaoMichaelJacksonBot, 7200000);
    var postTweet = "O rei do pop";
    michaelJacksonBot.post(
       
       'statuses/update', 
       {status: postTweet},
       function(err, data, response) { 
          
          if (err) {
             
             console.log("ERRO: " + err);                    
             return false;
          }
   
          console.log("Tweet postado com sucesso!\n");       
  
       }
    )
 }
 acaoMichaelJacksonBot();

 