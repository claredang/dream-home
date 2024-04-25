#!/bin/bash
echo 'run after_install.sh: ' >> /home/ubuntu/dream-home/server-nodejs/deploy.log

echo 'cd /home/ubuntu/dream-home/server-nodejs' >> /home/ubuntu/dream-home/server-nodejs/deploy.log
cd /home/ubuntu/dream-home/server-nodejs >> /home/ubuntu/dream-home/server-nodejs/deploy.log

echo 'npm install' >> /home/ubuntu/dream-home/server-nodejs/deploy.log 
npm install >> /home/ubuntu/dream-home/server-nodejs/deploy.log