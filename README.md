Project  설정
===================================

## Syrup Store ADReport
* 시럽스토어 광고리포팅 프론트엔드 입니다.

## 설치 전 환경 설정
* node.js 가 필요함: v4 버전 필요: [4.x](https://nodejs.org/dist/latest-v4.x/)
* python 2.7
* bower 전역 설치 
    * $ npm install bower -g
    * sudo  권한 필요 
* grunt 전역 설치
    * $ npm install grunt-cli
    * sudo  권한 필요

## 설치
- yarn install
- bower install
- sudo npm install -g jshint
- sudo npm install -g csslint
- sudo npm install -g eslint

## 한방 설치
- install.sh ( OS/X, Linux )
- install_window.sh( Window )

## 사용
1. 기본 빌드: $ grunt
2. 개발용 빌드: $ grunt dev
3. 배포용 빌드: $ grunt build

## 개발 가이드
1. 개발용 빌드를 실행한 후 ( grunt dev )
2. 정상적으로 watch 가 되면
3. hosts 파일을 변경  127.0.0.1 adreporttdev.syrup.co.kr
4. 웹브라우저 실행
5. https://adreporttdev.syrup.co.kr:8081/dist/adreport 접속
6. 인증서 체크
7. 플러그인 설치

## 커밋 가이드
1. 해당 repo를 forking해서 PR날려주세요. ( 절대 직접 커밋하지 마세요 )
2. 담당자 : 

## 개발 도메인
- https://adreportdev.syrup.co.kr
- https://adreportalp.syrup.co.kr
- https://adreport.syrup.co.kr

## 개발 브랜치
* develop : 해당 브랜치에서 feature branch를 분리하여 개발
* test/integration : feature branch 통합 후 테스트
* 릴리즈/패치 : 테스트가 완료된 feature branch 를 master에 머지 후 릴리즈
* 항상 모든 배포는 master로 한다. 
    
    

