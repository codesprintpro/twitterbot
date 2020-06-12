var Twit = require('twit');
var config = require('../config');
var T = new Twit(config);

const favtweetapi = function (tweetMsg) {
    if (tweetMsg) {
        console.log("Favourite tweet with id " + tweetMsg.id);
        T.post('favorites/create', { id: tweetMsg.id_str }, favTweetCallback);
    }
}
const favTweetCallback = function (err, data, response) {
    if (err) {
        console.log("Error message for fav tweet " + err.message);
    } else {
        console.log("Fav Tweet json id" + data.id);
    }
}

module.exports = favtweetapi;