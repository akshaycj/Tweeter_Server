const Twit = require("twit");
const express = require("express");
const bodyParser = require("body-parser");
var Request = require("request");

var dod = "https://affiliate-api.flipkart.net/affiliate/offers/v1/dotd/json";
var allOffers =
  "https://affiliate-api.flipkart.net/affiliate/offers/v1/all/json";
const app = express();

var data;

var port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));

var client = new Twit({
  consumer_key: "Uxi8tHZrP2fugVIvK64bBRaYF",
  consumer_secret: "9zEMTDps1MVD6UnlMK1nBGQ31tRLbHYsC8bVOUbF9vX2rHpLEz",
  access_token: "2712427895-ecd6QJnSaE1lQtgPXCfeTwtpz4lqRvopgAvddNg",
  access_token_secret: "570UNpdYxx2VvmZVTsWIlL5C35g1SCWHXBGnRKi7Q5v21"
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/s", function(req, re) {
  var params = { q: req.query.search };
  client.get("search/tweets", params, function(error, tweets, response) {
    if (!error) {
      var res = tweets.statuses;
      var ids = [];

      for (let i = 0; i < res.length; i++) {
        ids.push(res[i].id_str);
      }

      re.status(200).json(ids);
    }
    console.log("error", error);
  });
});

app.get("/user", function(req, re) {
  var params = { screen_name: "akshay_cj" };
  client.get("home_timeline", params, function(error, tweets, response) {
    if (!error) {
      var res = tweets.statuses;

      re.status(200).json(res);
    }
    console.log("error", error);
  });
});

app.get("/now", function(req, re) {
  var params = { count: 5 };

  var stream = client.stream("statuses/sample");

  stream.on("tweet", function(tweet) {
    re.status(200).json(tweet);
  });
});
app.get("/", function(req, re) {
  re.send("You're in the wrong side of the plate, mate!");
});

app.get("/dod", function(req, re) {
  Request(
    {
      headers: {
        "Fk-Affiliate-Id": "akshaycj9",
        "Fk-Affiliate-Token": "bc9bda6792c8476e8617609de3d86afd"
      },
      uri: dod,

      method: "GET"
    },
    (error, response, body) => {
      if (error) {
        return console.log(error);
      }
      re.status(200).json(JSON.parse(body));
    }
  );
});
app.get("/all", function(req, re) {
  Request(
    {
      headers: {
        "Fk-Affiliate-Id": "akshaycj9",
        "Fk-Affiliate-Token": "bc9bda6792c8476e8617609de3d86afd"
      },
      uri: allOffers,

      method: "GET"
    },
    (error, response, body) => {
      if (error) {
        return console.log(error);
      }
      console.log("res", response);

      re.status(200).json(JSON.parse(body));
    }
  );
});
app.listen(port, function() {
  console.log("Server started listening...");
});
