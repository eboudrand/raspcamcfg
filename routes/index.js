
var child = require('child_process');
var express = require('express');
var router = express.Router();



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



module.exports = router;
