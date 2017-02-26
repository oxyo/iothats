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
var serialport = require("serialport"); 
var SerialPort = serialport.SerialPort; 

// Serial port setup 
var mPort = '/dev/ttyUSB0'; 
	arduinoPort = new SerialPort(mPort, { 
	baudRate: 9600, 
	databits: 8, 
	parity: 'none', //even 
	stopbits: 1, 
	flowControl: false	
}, false); 



// 
// Send command to Arduino 
// 
function requestData(servoCommand) { 
	arduinoPort.open(function (error) { 
	if (error) { 
		if(error == "Error: Port is already open") {	
			arduinoPort.close(); 
			console.log("Closing port..."); 
		} 
	} else { 
		console.log('Connected to Arduino on port: ' + mPort); 
		arduinoPort.write(servoCommand, function (err) { 
			if (err) { 
				console.log('Arduino Connection Error: ' + err); 
			} else { 
				console.log("Arduino command send: " + servoCommand); 

				//request(command).toString('hex')); 
			} 
		}); 
	} 
}); 
} 



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


app.get('/on1', function(req, res) {
	
	gpio.output(pin1, 1).then(function() {
		console.log(state+'ON');
		res.end(state+'ON'); 
	});
});


app.get('/off1', function(req, res) {

	gpio.output(pin1, 0).then(function() {
		console.log(state+'OFF');
		res.end(state+'OFF'); 
	});
	
});



app.post('/turn/:pos', function(req, res) {
	
	var pos = req.params.pos;

	if(pos >= 0 && pos <=180){
	
	 console.log("Servo position set: "+ pos);
	 	 
	 requestData(pos);
	 		
	} else{
		
	 console.log("ERROR: Incorrect servo position");
	
	}



});


app.get('/off1', function(req, res) {

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
