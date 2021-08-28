var Twit = require("twit");
// Include fs module
const fs = require('fs');
const https = require('https')
var request = require('sync-request')

require("dotenv").config();

var apiKey = "04f78a3c6746c4b642875b0226a00318f8cfb09be9f140b06acaa0543b5f1841";

const michaelJacksonBot = new Twit({

    consumer_key: process.env.CONSUMER_KEY,  
  
    consumer_secret: process.env.CONSUMER_SECRET,    
    access_token: process.env.ACCESS_TOKEN,  
  
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    timeout_ms: 60 * 1000
});

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

function obterListaDeImagens(){    

    var res1 = request('GET', "https://serpapi.com/search.json?q=michael+jackson+pinterest&tbm=isch&ijn=0&api_key=04f78a3c6746c4b642875b0226a00318f8cfb09be9f140b06acaa0543b5f1841");
    fs.writeFileSync("imagens.json", res1.body);    
}

function obterImagemDaLista()
{    
    var arquivoJson = fs.readFileSync('imagens.json', 'utf8');
    var objetoJson = JSON.parse(arquivoJson);
    var array = objetoJson.images_results;    
    var numero = getRandomArbitrary(0, array.length);    
    return array[numero].original;
}

function acaoMichaelJacksonBot() {
    var photoUrl = obterImagemDaLista();
    var res1 = request('GET', photoUrl);
    fs.writeFileSync("imagem_temporaria.jpg", res1.body);    
    var b64content = fs.readFileSync("imagem_temporaria.jpg", { encoding: 'base64' })

// first we must post the media to Twitter
michaelJacksonBot.post('media/upload', { media_data: b64content }, function (err, data, response) {
    // now we can assign alt text to the media, for use by screen readers and
    // other text-based presentations and interpreters
    var mediaIdStr = data.media_id_string
    var altText = "Michael Jackson."
    let date_ob = new Date();

    var month = date_ob.getMonth() + 1;
    var day = date_ob.getDate();

    var status = "";

var isMichaelsBirthday = month == 8 && day == 29;

    if(isMichaelsBirthday)
    {
        status = "#HappyBirthdayMichaelJacksons";
    }

    var meta_params = { status: "", media_id: mediaIdStr, alt_text: { text: altText } }
  
    michaelJacksonBot.post('media/metadata/create', meta_params, function (err, data, response) {
      if (!err) {
        // now we can reference the media and post a tweet (media will attach to the tweet)
        var params = { media_ids: [mediaIdStr] }
  
        michaelJacksonBot.post('statuses/update', params, function (err, data, response) {
          console.log(data)
        })
      }
    })
  })
  
  if(isMichaelsBirthday)
  {
    setTimeout(acaoMichaelJacksonBot, 30 * 60 * 1000);
  }
  else{      
    setTimeout(acaoMichaelJacksonBot, 2 * 60 * 60 * 1000);
  }

 }

 acaoMichaelJacksonBot();

 // 2 horas
 setTimeout(acaoMichaelJacksonBot, 2 * 60 * 60 * 1000);

 // 24 horas
 setInterval(obterListaDeImagens, 24 * 60 * 60 * 1000);

