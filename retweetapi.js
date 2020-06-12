var Twit = require('twit');
var config = require('../config');
var T = new Twit(config);

const retweetapi = function (tweetMsg) {
    if (tweetMsg) {
        console.log("Retweeting tweet with id " + tweetMsg.id);
        T.post('statuses/retweet/:id', { id: tweetMsg.id_str }, retweetResult);
    }
}
const retweetResult = function (err, data, response) {
    if (err) {
        console.log("Error message for retweet " + err.message);
    } else {
        console.log("Retweet json id" + data.id);
    }
}

module.exports = retweetapi;