console.log("The bot is starting");
const express = require('express');
const Twit = require('twit');
const T = new Twit(config);
const cors = require('cors');
const bodyParser = require('body-parser');
const store = require('./config/store');

const app = express();
const port = process.env.PORT || 5000;

const TOTAL_TWEETS = 10;

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
    store.saveSearchTerm(request.query.search)
    findTweets(request.query.search, (tweets) => { response.json(tweets); })
});

//app.use('/api/searchs', require('./routes/searchs'))
app.get("/history", (request, response, next) => {
    store.getSearchTerms((tweets) => { response.json(tweets); })
})

app.listen(port, '0.0.0.0',  () => {
    console.log("El servidor está inicializado en el puerto 5000");
});
