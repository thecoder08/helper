var clock = require('world-clock')();
var open = require('open');
console.log('Hi. I\'m HELPER. If you need me, you\'re probably not very smart.');

process.stdin.on('data', function(data) {
  var message = data.toString().split(require('os').EOL)[0].toLowerCase();
  var words = message.split(' ');
  if (words.includes('poop')) {
    console.log('OK, opening the wikipedia page for "poop" in your default browser...');
    for (var i = 0; i < 10; i++) {
      open('https://en.wikipedia.org/wiki/Feces');
    }
  }
  if (words.includes('meaning') && words.includes('life')) {
    console.log('um 43 I guess...');
  }
  if (words.includes('hello')) {
    console.log('*sigh*, What do you want now...');
  }
  if (words.includes('can')) {
    console.log('No.');
  }
  if (words.includes('why')) {
    console.log('Because.');
  }
  if (words.includes('color')) {
    console.log('try again sonny');
  }
  if (words.includes('favorite')) {
    console.log('try again sonny');
  }
  if (words.includes('colour')) {
    console.log('Mahogany.');
  }
  if (words.includes('time')) {
    console.log('The time is ' + clock.localTime('Asia/Tokyo').toString() + ' in Tokyo.');
  }
});
setInterval(function() {
  console.log('I\'m waiting, say something.');
}, 10000);
