var Twit = require('twit');
var retweetapi = require('./retweetapi')
var favtweetapi = require('./favtweetapi')

var T = new Twit({
    consumer_key: '...',
    consumer_secret: '...',
    access_token: '...',
    access_token_secret: '...',
    timeout_ms: 60 * 1000  // optional HTTP request timeout to apply to all requests.
});


function getFormattedDate() {
    var today = new Date();

    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    var HH = today.getHours();
    var MM = today.getMinutes();
    if (dd < 10)
        dd = '0' + dd;
    if (mm < 10)
        mm = '0' + mm;
    if (HH < 10)
        HH = '0' + HH;
    if (MM < 10)
        MM = '0' + MM;

    return today = yyyy + '' + mm + '' + dd + '' + HH + '' + MM;
}

//Code for search tweets
function searchTweet() {
    var since = getFormattedDate();
    var params = {
        q: '#100DaysOfCode since:' + since,
        count: 20,
        result_type: 'recent'
    };

    T.get('search/tweets', params, tweetResult);

    function tweetResult(err, data, response) {
        var tweetMsgs = data.statuses;

        for (let i = 1; i <= tweetMsgs.length; i++) {
            setTimeout(retweetapi, 1000 * 20 * i, tweetMsgs[i])
        }

    }
}

searchTweet();
setInterval(searchTweet, 1000 * 60 * 15);

//Code for making Tweet Favorite
function searchAndFavTweet() {
    var since = getFormattedDate();
    var params = {
        q: '#100DaysOfCode OR #javascript OR #coding OR #nodejs OR #rust OR #reactjs OR #womenintech OR #womenwhocode min_faves:2 since:' + since,
        count: 4,
        result_type: 'recent'
    };

    T.get('search/tweets', params, searchTweetResult);

    function searchTweetResult(err, data, response) {
        var tweetMsgs = data.statuses;

        for (let i = 1; i <= tweetMsgs.length; i++) {
            setTimeout(favtweetapi, 1000 * 60 * 15 * i, tweetMsgs[i-1]);
            //setTimeout(favtweetapi, 1, tweetMsgs[i-1])
        }

    }
}
searchAndFavTweet();
setInterval(searchAndFavTweet, 1000 * 60 * 60);