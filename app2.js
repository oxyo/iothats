var	express = require('express');
var	app = express();
	app.use(express.static(__dirname + '/public'));
var port = 3000;

//gpio mode 25 output
//gpio write 25 1
//gpio -1 write 37 0

var	gpio = require('wpi-gpio');
	gpio.BCM_GPIO = true;


var pin1 = 26;
var pin2 = 19;
var state = 'LED on PIN'+pin1+'='; 

var say = require('say');


app.get('/', function(req, res) {
 res.send('index', {
   title: 'Welcome'
 });
});

app.post('/on1', function(req, res) {
	
	gpio.output(pin1, 1).then(function() {
		console.log(state+'ON');
		res.end(state+'ON'); 
	});
	
});

app.post('/off1', function(req, res) {

	gpio.output(pin1, 0).then(function() {
		console.log(state+'OFF');
		res.end(state+'OFF'); 
	});
	
});


app.post('/say/:word', function(req, res) {

	var word = req.params.word;

	say.speak(word, 'Agnes', 0.85, function(err) {
	  
	  if (err) {
		return console.log('Some errors handled');
	  }
	 
	  if (word == "on led1"){
		gpio.output(pin1, 1).then(function() {
		console.log(state+'ON');
		console.log(word +' has been spoken.');
	    res.end('Text has been spoken and LED enabled'); 
		});
	  } 
	  
	  if (word == "off led1"){
		gpio.output(pin1, 0).then(function() {
		console.log(state+'OFF');
		console.log(word +' has been spoken.');
	    res.end('Text has been spoken and LED disabled'); 
		});
	  } 
	  
		console.log(word +' has been spoken.');
		res.end('Text has been spoken.'); 	
  
	});


	
});



app.listen(port);
console.log("App listening: " + port);
