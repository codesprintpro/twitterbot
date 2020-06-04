var Twit = require('twit');
var config = require('./config');

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

//search tweets
function searchTweet() {
    var since = getFormattedDate();
    var params = {
        q: '#100DaysOfCode OR #javascript OR #coding OR #hourofcode OR #programming OR #rust OR #reactjs OR #CodeNewbie OR #programmer OR #womenintech OR #womenwhocode since:' + since,
        count: 20,
        result_type: 'recent'
    };

    T.get('search/tweets', params, tweetResult);

    function tweetResult(err, data, response) {
        var tweetMsgs = data.statuses;

        for (let i = 1; i <= tweetMsgs.length; i++) {
            setTimeout(retweetMsg, 1000 * 20 * i, tweetMsgs[i])
        }

    }
}

function retweetMsg(tweetMsg) {

    console.log("Getting tweet msg " + tweetMsg);
    if (tweetMsg) {
        console.log("Retweeting tweet with id " + tweetMsg.id);
        T.post('statuses/retweet/:id', { id: tweetMsg.id_str }, retweetResult);
    }
}

function retweetResult(err, data, response) {
    if (err) {
        console.log("Error message for retweet " + err.message);
    } else {
        console.log("Retweet json id" + data.id);
    }
}

searchTweet();
setInterval(searchTweet, 1000 * 60 * 15);