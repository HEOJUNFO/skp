#!/bin/bash
echo "option: $1"
echo "Project Initialize Start"
echo "프로젝트 빌드에 필요한 파일을 세팅합니다. node.js 4.x.0 과 python 2.7 버전이 필요합니다. "
yarn install
bower install
npm install -g jshint
npm install -g csslint
npm install -g eslint
