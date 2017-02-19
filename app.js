var express = require('express');
var app = express();
var port = 3000;

var gpio = require('rpi-gpio');

function write1(){
   gpio.write(7, true, function(err) {
       if (err) throw err;
       console.log('Written 1 to pin');
   });
}

function write0(){
   gpio.write(7, false, function(err) {
       if (err) throw err;
       console.log('Written 0 to pin');
   });
}

function closePins() {
   gpio.destroy(function() {
       console.log('All pins unexported');
   });
}



app.use(express.static(__dirname + '/public'));

//var oneDay = 8;
//app.use(express.static(__dirname + '/public', { maxAge: oneDay }));


app.get('/', function(req, res) {
 res.send('index', {
   title: 'Welcome'
 });
});

app.get('/on1', function(req, res) {

 gpio.setup(7, gpio.DIR_OUT, write1);
  
 res.end('Enabled lamp ONE :)');
 
});


app.get('/on2', function(req, res) {

  gpio.setup(7, gpio.DIR_OUT, closePins);
	
 res.end('EDisabled lamp ONE :)');
});


app.listen(port);
console.log("App listening: " + port);
