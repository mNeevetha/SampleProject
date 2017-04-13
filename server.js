var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 8080));

app.get('/', function(req, res){
    res.send("Hello World 31st MARCH 2017....");
})

app.listen(app.get('port'), function () {
  console.log('Example app listening on port 8080!')
})
