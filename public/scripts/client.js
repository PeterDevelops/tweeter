/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// INPUT - tweet object
// OUTPUT - returns a tweet <article>

console.log("Client.js is ready");
$(document).ready(function() { // Loads the DOM before the code inside runs

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
          <p>${timeago.format(tweetObj.created_at)}</p>
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
    $('#tweet-container').prepend($tweet);
  }
}
// renderTweets(data);

$('#tweet-form').on('submit', function( event ) { // accesses #tweet-forms submit event
  event.preventDefault(); // prevents the default action of the submit
  const formData = $(this).serialize(); // serializes the form data
  console.log('form data',formData);

  $.ajax({ // performs an asynchronous HTTP (AJAX) request
    type: "POST",
    url: '/tweets',
    data: formData,
    success: function(response) {
      console.log('Success', response);
    },
    error: function(xhr, status, error) {
      console.error('Error', error);
    },
  });
});

// INPUT: ARRAY OF TWEETS AS JSON
const loadTweets = function() {
  $.ajax('/tweets', { METHOD: 'GET' }) // ajax makes a get request from /tweets endpoint
  .then(function (jsonTweets) { // creating a promise with the result as a parameter
    console.log('Success', jsonTweets);
    renderTweets(jsonTweets); // giving renderTweets the results of the GET request
  })
}
loadTweets(); // invoking loadTweets

});