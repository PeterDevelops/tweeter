$(document).ready(() => {
  console.log('Document is ready');
  $('#tweet-text').on('input', function() {
    const value = $(this).val(); // shows value of a textarea
    // console.log(140 - value.length, 'value');
    const tweetNum = $(this).closest('form').find('output'); // traverses up to form then down to output
    console.log(tweetNum, 'counter');
    $(tweetNum).text(140 - value.length); // updates the counter from 140
    // if tweetNum < 0 we want to turn the color red
    console.log(140 - value.length, 'values')
    if (140 - value.length < 0) {
      tweetNum.addClass('redColor');
    } else {
      tweetNum.removeClass('redColor');
    }
  })
})