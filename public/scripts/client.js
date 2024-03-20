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
      // Changes the ".tweet-section p" to be safe from XSS
      $tweet.find('.tweet-section p').text(tweetObj.content.text);
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

// INPUT: ARRAY OF TWEETS AS JSON
const loadTweets = function() { // performs an asynchronous GET HTTP (AJAX) request
  $.ajax('/tweets', { method: 'GET' }) // ajax makes a get request from /tweets endpoint
  .then(function (jsonTweets) { // creating a promise with the result as a parameter
    renderTweets(jsonTweets); // giving renderTweets the results of the GET request
  })
  .catch(function (error) { // promises needs a catch in case of potential errors
    console.error('Error fetching tweets:', error);
  })
}
loadTweets(); // invoking loadTweets



const tweetValidation = () => {
  const $tweetInput = $('#tweet-text').val().trim(); // Grabs the value of our textArea
  const $tweetError = $('.tweet-error p'); // targets our hidden 'p' tag
  if ($tweetInput.length < 1) { // if empty input return an alert
    $tweetError.slideUp(); // default to slideUp if not already
    $tweetError.html('Your tweet box is empty.').slideDown();
    return false; // return false prevents the submits default behaviour
  }
  if ($tweetInput.length > 140) { // if input has exceeded 140 characters return an alert
    $tweetError.slideUp();
    $tweetError.html('You have reached over the maximum number of characters.').slideDown();
    return false;
  }
  $tweetError.slideUp();
  return true;
}

$('#tweet-form').on('submit', function( event ) {
  event.preventDefault(); // prevents the default action of the submit
  
  if (tweetValidation()) {
    const tweetNum = $(this).find('output');
    const formData = $(this).serialize(); // serializes the form data
    $.ajax({ // performs an asynchronous POST HTTP (AJAX) request
      type: "POST",
      url: '/tweets',
      data: formData,
      success: function(response) {
        loadTweets(); // after successful submission, reload tweets
        $('#tweet-text').val('');
        $(tweetNum).val('140');
        console.log('Success', response);
      },
      error: function(xhr, status, error) {
        console.error('AJAX Error:', error);
      },
    });
  }
});

});