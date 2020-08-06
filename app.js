console.log("The bot is starting");

//require Twit package, authenticate
const express = require('express');
const routes = require('./routes');
const Twit = require('twit');
const config = require('./config');
const T = new Twit(config);

const cors = require('cors');
const bodyParser = require('body-parser');

//servidor
const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))


//puerto
app.listen(5000);

// Set search query parameters 
let params = {
    q: 'obama',
    count: 19
}

// Make request get(path: string, params, callback)
T.get('search/tweets', params, gotData);

//Handle the data returned by the request
function gotData(err, data, response) {
    let tweets = data.statuses;
    for (let i=0; i < tweets.length; i++) {
        console.log(tweets[i].text);
    }
}