#!/bin/bash

NODEVER=6.10.0

if [ -e node-v$NODEVER-linux-armv6l.tar.xz ]
then
	echo "suppression de node-v$NODEVER-linux-armv6l.tar.xz"
	rm -v node-v$NODEVER-linux-armv6l.tar.xz
fi
test -d node-v$NODEVER-linux-armv6l && rm -rvf node-vNODEVER-linux-armv6l

VER=`node -v`
if [ -z $VER ]
then
	wget https://nodejs.org/dist/v$NODEVER/node-v$NODEVER-linux-armv6l.tar.xz
else
	echo "nodejs installé version $VER"
fi
if [ -e node-v$NODEVER-linux-armv6l.tar.xz ]; then
	tar xvf node-v$NODEVER-linux-armv6l.tar.xz
	cd node-v$NODEVER-linux-armv6l
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

if [ -e node-v$NODEVER-linux-armv6l.tar.xz ]
then
	echo "suppression de node-v$NODEVER-linux-armv6l.tar.xz"
	rm -v node-v$NODEVER-linux-armv6l.tar.xz
fi
test -d node-v$NODEVER-linux-armv6l && rm -rvf node-v$NODEVER-linux-armv6l

