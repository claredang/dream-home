#!/bin/bash

echo 'run application_start.sh: ' >> /home/ubuntu/dream-home/server-nodejs/deploy.log

echo 'pm2 restart dream-home-server-ssl' >> /home/ubuntu/dream-home/server-nodejs/deploy.log
pm2 restart dream-home-server-ssl >> /home/ubuntu/dream-home/server-nodejs/deploy.log