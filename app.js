console.log("The bot is starting");
const express = require('express');
const Twit = require('twit');
const config = require('./config');
const T = new Twit(config);
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

const TOTAL_TWEETS = 5;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

function findTweets(term, callback) {
    return T.get('search/tweets', {q: term, count: TOTAL_TWEETS}, (err, data, response) => {
        // console.debug(err, data);
        let tweets = [];
        for (let tweet of data.statuses) {
            tweets.push({"datetime": tweet.created_at, "text": tweet.text});
        }
        callback(tweets);
    });
}

app.get("/", (request, response, next) => {
    findTweets(request.query.search, (tweets) => { response.json(tweets); })
});

app.listen(5000, () => {
    console.log("El servidor está inicializado en el puerto 5000");
   });
