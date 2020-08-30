var cp = require('child_process');
var fs = require('fs');
var path = require('path');
var helper = cp.spawn('node', ['helper.js']);
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
    helper.stdin.write($('#phrase').value + '\n');
    $('#phrase').value = '';
  }
}
helper.stdout.on('data', function(data) {
  if (sendData) {
    fs.appendFileSync(path.join(require('os').homedir(), '.helperdata.txt'), 'HELPER: ' + data.toString());
  }
  $('#answer').value = data.toString();
});
helper.on('exit', function() {
  process.exit();
});
