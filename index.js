const Twit = require('twit')
const express = require('express');
const bodyParser= require('body-parser')

const app = express();

var data;

app.use(bodyParser.urlencoded({extended: true}))


var client = new Twit({
  consumer_key: "Uxi8tHZrP2fugVIvK64bBRaYF",
  consumer_secret: "9zEMTDps1MVD6UnlMK1nBGQ31tRLbHYsC8bVOUbF9vX2rHpLEz",
  access_token: "2712427895-ecd6QJnSaE1lQtgPXCfeTwtpz4lqRvopgAvddNg",
  access_token_secret: "570UNpdYxx2VvmZVTsWIlL5C35g1SCWHXBGnRKi7Q5v21",
});
var params = { q: 'rainbow', count: 2 };
client.get("search/tweets", params, function (
  error,
  tweets,
  response
) {
  if (!error) {
    var res = tweets.statuses;

    app.get('/', function(req, re) {
        re.send('Hello World'+tweets)
      })
    
    for (var i = 0; i < res.length; i++) {
      console.log("text", res[i].text)
    }
  }
  console.log("error", error);

});


