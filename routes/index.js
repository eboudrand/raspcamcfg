
var child = require('child_process');
var express = require('express');
var router = express.Router();
var config = require('../app.json');
var pkg = require('../package.json');
var os = require("os");



var settings = { sharpness: '', 
				constrast: '',
				brightness: '',
				saturation: '' };

var raspstillbin = "raspistill";
var raspstillargsimage = "-o /home/pi/raspcamcfg/public/snapshots/image.jpg";
var raspstillargs = "";


function cmdline_build() {
	
	if(settings.sharpness)
		args += " --sharpness " + settings.sharpness;
	if(settings.constrast)
		args += " --contrast " + settings.constrast;
	if(settings.brightness)
		args += " --brightness " + settings.brightness;
	if(settings.saturation)
		args += " --saturation " + settings.saturation;	
}

/* GET home page. */
router.get('/', function(req, res, next) {
	
	var raspstillcmdline = raspstillbin + " " + raspstillargs + " " + raspstillargsimage;
	
	res.render('index', { 
				title: 'raspcamcfg',
				commandline: raspstillcmdline,
				image: 'snapshots/image.jpg',
				params: settings				
				});
				
});



router.post('/capture', function(req, res, next) {
	
	child.exec(raspstillbin + " " + raspstillargs + " " + raspstillargsimage, 
		(error, stdout, stderr) => {
			if(error)
			{
				console.error(`exec error: ${error}`);
				return;
			}
	});
	
	res.redirect("/");

});


router.get('/version', function(req,res,next) {

	var data = { 'version': pkg.version, 'id': os.hostname() };
	res.send(data);

});


router.get('/halt', function(req,res,next){

	console.log('executing ' + process.cwd() + '/bin/halt');
	child.execFile(process.cwd() + '/bin/halt',(error, stdout, stderr) => {
		if (error) {
	  		throw error;
		}
		console.log(stdout);
	});

	var raspstillcmdline = raspstillbin + " " + raspstillargs + " " + raspstillargsimage;
	res.render('index', {
		title: 'raspcamcfg',
		commandline: raspstillcmdline,
		image: 'snapshots/image.jpg',
		params: settings
	});

});


module.exports = router;
