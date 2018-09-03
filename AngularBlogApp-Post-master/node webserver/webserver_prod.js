var express = require('express');
var app = express();
var port =  80;

app.use('/', express.static(__dirname + '/client'));
app.get('*', function(req, res) {
  res.sendfile('./client_staging/index.html')
})


var server = app.listen(port, () => console.log('Blog server running on port : ' +port));