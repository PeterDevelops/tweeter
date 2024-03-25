$(document).ready(() => {
  console.log('Document is ready');
  $('#tweet-text').on('input', function() {
    const value = $(this).val(); // shows value of a textarea
    const tweetNum = $(this).closest('form').find('output'); // traverses up to form then down to output
    $(tweetNum).text(140 - value.length); // updates the text counter from 140
    if (140 - value.length < 0) {
      tweetNum.addClass('redColor');
    } else {
      tweetNum.removeClass('redColor');
    }
  })
})