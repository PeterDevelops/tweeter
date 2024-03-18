/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// INPUT - tweet object
// OUTPUT - returns a tweet <article>

console.log("Client.js is ready");
$(document).ready(function() { // The DOM always needs to be loaded first

// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const createTweetElement = function(tweetObj) {
  const $tweet = $(
    `<article class="tweet">
        <header>

          <span>
          <img src="${tweetObj.user.avatars}">
          <p>${tweetObj.user.name}</p>
          </span>
          <p class="article-name-handle">${tweetObj.user.handle}</p>
        </header>

        <!-- Main tweet text -->
        <div class="tweet-section">
          <p>${tweetObj.content.text}</p>
        </div>

        <footer>
          <p>${tweetObj.created_at}</p>
          <div>
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
        </footer>
      </article>`);
  return $tweet;
}

const renderTweets = function(tweets) {

  // loops through tweets
  for (const tweet of tweets) {
    // calls createTweetElements for each tweet
   const $tweet = createTweetElement(tweet);

    //takes return value and appends it to the tweets container
    $('.main-container').append($tweet);
  }
}

renderTweets(data);

});