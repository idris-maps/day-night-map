var express = require('express')
var app = express()

app.use('/js', express.static(__dirname + '/public/js'))
app.get('/js/d3.min.js', function(req, res){
	res.sendFile(__dirname + '/node_modules/d3/d3.min.js')
})
app.get('/', function(req, res){
	res.sendFile(__dirname + '/public/index.html')
})

var port = 3000;
app.listen(port, function() {console.log('listening on port ' + port)})
