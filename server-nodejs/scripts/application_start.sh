#!/bin/bash

echo 'run application_start.sh: ' >> /home/ec2-user/nodejs-aws-codedeploy-pipeline/deploy.log

echo 'pm2 restart dream-home-server-ssl' >> /home/ec2-user/nodejs-aws-codedeploy-pipeline/deploy.log
pm2 restart dream-home-server-ssl >> /home/ec2-user/nodejs-aws-codedeploy-pipeline/deploy.log