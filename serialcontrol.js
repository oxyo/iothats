// -> serialcontrol.js - LIBRARY
var serialport = require("serialport"); 
var SerialPort = serialport.SerialPort; 
var data = {'state': 0};


var serialPort = new SerialPort(portToUse, { 
	parser: serialport.parsers.readline('\n'),
	baudRate: 9600, 
	databits: 8, 
	parity: 'none', //even 
	stopbits: 1, 
	flowControl: false
}, false); 


serialPort.on('open', function() {
	console.log('Serial port Open');
	
	serialPort.on('data', function(buffer) { 
	  data.buffer = buffer, 
	  data.state = 1 
	});
});


function writeConfig(cmd) {
  //var cmd = String.fromCharCode(cmd);
  //var param = String.fromCharCode(paramNb);
  //var value = String.fromCharCode(value);
  
  
	if (serialPort.isOpen() == true) {
	  
	  	serialPort.write(cmd, function (err) { 
	
			if (err) { 
				console.log('Arduino Connection Error: ' + err); 
			} else { 
				console.log("Arduino command send: " + cmd); 
			} 
		});
	
	} else {
		  
  
		serialPort.open(function (error) { 
		if (error) { 
			if(error == "Error: Port is already open") {	
				//serialPort.close(); 
				//console.log("Closing port..."); 
				console.log("Port already open..."); 
			} 
		} 
			console.log('Connected to Arduino on port: ' + portToUse); 
			serialPort.write(cmd, function (err) { 
				if (err) { 
					console.log('Arduino Connection Error: ' + err); 
				} else { 
					console.log("Arduino command send: " + cmd); 
				} 
			}); 
		 
		}); 
		  
	}

  
};

exports.writeConfig = writeConfig;
