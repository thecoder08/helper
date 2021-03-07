var cp = require('child_process');
var fs = require('fs');
var path = require('path');
var helper = cp.exec('node helper.js');
function textToSpeech(text, callback) {
  var audioinstance = cp.exec('node audio.js "' + text + '"');
  audioinstance.stderr.on('data', function(data) {
    console.error(data);
  });
  audioinstance.stdout.on('data', function(data) {
    console.log(data);
  });
  audioinstance.on('close', function() {
    callback();
  });
}
if (confirm('Would you like to improve HELPER by sending data to the developers?')) {
  alert('Thanks for improving HELPER!');
  var sendData = true;
}
else {
  alert('OK, not sending data to developers.');
  var sendData = false;
}
$('#phrase').onkeypress = function(key) {
  if (key.code == 'Enter') {
    if (sendData) {
      fs.appendFileSync(path.join(require('os').homedir(), '.helperdata.txt'), 'User: ' + $('#phrase').value + require('os').EOL);
    }
    helper.stdin.write($('#phrase').value + require('os').EOL);
    $('#phrase').value = '';
  }
}
helper.stdout.on('data', function(data) {
  if (sendData) {
    fs.appendFileSync(path.join(require('os').homedir(), '.helperdata.txt'), 'HELPER: ' + data.toString());
  }
  $('#answer').value = data.toString();
  textToSpeech(data.toString(), function() {
    var audio = new Audio('output.mp3?foo=' + new Date().getTime());
    audio.addEventListener("canplaythrough", function() {
      audio.play();
    });
  });
});
helper.on('exit', function() {
  process.exit();
});
