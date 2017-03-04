#!/bin/bash

apt-get -y update
apt-get -y upgrade
apt autoremove

test -e node-v6.10.0-linux-armv6l.tar.xz && rm node-v6.10.0-linux-armv6l.tar.xz
test -d node-v6.10.0-linux-armv6l && rm -rf node-v6.10.0-linux-armv6l
wget https://nodejs.org/dist/v6.10.0/node-v6.10.0-linux-armv6l.tar.xz
if [ -e node-v6.10.0-linux-armv6l.tar.xz ]; then
	tar xvf node-v6.10.0-linux-armv6l.tar.xz
	cd node-v6.10.0-linux-armv6l
	sudo cp -R * /usr/local/
fi

cd /home/pi/raspcamcfg/
npm install

if [ -e raspcamcfg.service ]; then

   echo "Installing raspcamcfg.service"
   cp raspcamcfg.service /lib/systemd/system 
   chmod 644 /lib/systemd/system/raspcamcfg.service
   systemctl daemon-reload
   systemctl enable raspcamcfg.service
   systemctl start raspcamcfg.service
fi

