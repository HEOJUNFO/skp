#!/bin/bash
echo "option: $1"
echo "Project Initialize Start"
echo "프로젝트 빌드에 필요한 파일을 세팅합니다. node.js >= 10.16.0 과 python 2.7 버전이 필요합니다. "
# https://brownbears.tistory.com/423

echo "start yarn install"
yarn install

echo "start bower install"
bower install

#echo "start sudo npm install -g grunt-cli"
#sudo npm install -g grunt-cli

echo "start sudo npm install -g jshint"
sudo npm install -g jshint

echo "start sudo npm install -g csslint"
sudo npm install -g csslint

echo "start sudo npm install -g eslint"
sudo npm install -g eslint
