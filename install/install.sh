#!/bin/bash


if [ -e node-v6.10.0-linux-armv6l.tar.xz ]
then
	echo "suppression de node-v6.10.0-linux-armv6l.tar.xz"
	rm -v node-v6.10.0-linux-armv6l.tar.xz
fi
test -d node-v6.10.0-linux-armv6l && rm -rvf node-v6.10.0-linux-armv6l

VER=`node -v`
if [ -z $VER ]
then
	wget https://nodejs.org/dist/v6.10.0/node-v6.10.0-linux-armv6l.tar.xz
else
	echo "nodejs installé version $VER"
fi
if [ -e node-v6.10.0-linux-armv6l.tar.xz ]; then
	tar xvf node-v6.10.0-linux-armv6l.tar.xz
	cd node-v6.10.0-linux-armv6l
	sudo cp -R * /usr/local/
fi

cd /home/pi/raspcamcfg/
echo $PWD
echo "npm install"
npm install

if [ -e install/raspcamcfg.service ]; then

   echo "Installation de raspcamcfg.service"
   cp /home/pi/raspcamcfg/install/raspcamcfg.service /lib/systemd/system 
   chmod 644 /lib/systemd/system/raspcamcfg.service
   systemctl daemon-reload
   systemctl enable raspcamcfg.service
   systemctl start raspcamcfg.service
fi

if [ -e node-v6.10.0-linux-armv6l.tar.xz ]
then
	echo "suppression de node-v6.10.0-linux-armv6l.tar.xz"
	rm -v node-v6.10.0-linux-armv6l.tar.xz
fi
test -d node-v6.10.0-linux-armv6l && rm -rvf node-v6.10.0-linux-armv6l

