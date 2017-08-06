
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

	//var data = { 'id': os.hostname(), 'version': pkg.version, 'ips': os.networkInterfaces(),
	//			'ostype':os.type(), 'arch': os.arch(), 'osversion': os.release() };
	
	var data = { id: os.hostname(), version: pkg.version + '-' + config.lastcommit, ipv4: "inconnue", ipv6: "inconnue", ostype: os.type(), arch: os.arch(), osversion: os.release()  };
	var ifs = os.networkInterfaces();
	if(ifs && ifs.eth0 && ifs.eth0[0] && ifs.eth0[0].address && ifs.eth0[0].family=="IPv4")
		data.ipv4 = ifs.eth0[0].address;
	if(ifs && ifs.eth0 && ifs.eth0[1] && ifs.eth0[1].address && ifs.eth0[1].family=="IPv6")
		data.ipv6 = ifs.eth0[1].address;	
	res.send(data);

});


router.get('/halt', function(req,res,next){

	require('child_process').exec('halt -p', console.log);

	var data = "arrêt en cours";
	res.send(data);

});


router.get('/reboot', function(req,res,next){

	require('child_process').exec('halt --reboot', console.log);

	var data = "redémarrage en cours";
	res.send(data);

});


module.exports = router;
