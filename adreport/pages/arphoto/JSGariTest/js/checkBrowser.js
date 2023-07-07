function getBrowserName(){
    var userAgent = navigator.userAgent.toLowerCase();

    if(userAgent.match(/chrome|chromium|crios/i)){
        browserName = "chrome";
    } else if(userAgent.match(/firefox|fxios/i)){
        browserName = "firefox";
    } else if(userAgent.match(/safari/i)){
        browserName = "safari";
    } else if(userAgent.match(/opr\//i)){
        browserName = "opera";
    } else if(userAgent.match(/edg/i)){
        browserName = "edge";
    } else if(userAgent.match(/samsung/i)){
        browserName = "samsung";
    } else{
        browserName ="other";
    }

    if(userAgent.match(/kakao/i)){
        browserName = "kakao";
    }

    if(userAgent.match(/whale/i)){
        browserName = "whale";
    }


    return browserName;
}

function getIosVersion() {
    var agent = navigator.userAgent,
    start = agent.indexOf( 'OS' );
    if( ( agent.indexOf( 'iPhone' ) > -1 || agent.indexOf( 'iPad' ) > -1 ) && start > -1 ){
        return window.Number( agent.substr( start + 3, 3 ).replace( '_', '.' ) );
    }
    return 0;
}

function getIosDetailVersion() {
    const userAgentString = navigator.userAgent;

    // iOS 버전을 가져오는 정규 표현식
    const iOSVersion = parseFloat(
    ('' + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(userAgentString) || [0,''])[1])
    .replace('undefined', '3_2').replace('_', '.').replace('_', '')
    );

    return iOSVersion;
}


function getOsName(){
    var os, ua = navigator.userAgent;
    if (ua.match(/Win(dows )?NT 6\.0/)) {
        os = "Windows Vista";
    } else if (ua.match(/Win(dows )?(NT 5\.1|XP)/)) {
        os = "Windows XP";
    } else {
        if ((ua.indexOf("Windows NT 5.1") != -1) || (ua.indexOf("Windows XP") != -1)) {
            os = "Windows XP";
        } else if ((ua.indexOf("Windows NT 7.0") != -1) || (ua.indexOf("Windows NT 6.1") != -1)) {
            os = "Windows 7";
        } else if ((ua.indexOf("Windows NT 8.0") != -1) || (ua.indexOf("Windows NT 6.2") != -1)) {
            os = "Windows 8";
        } else if ((ua.indexOf("Windows NT 8.1") != -1) || (ua.indexOf("Windows NT 6.3") != -1)) {
            os = "Windows 8.1";
        } else if ((ua.indexOf("Windows NT 10.0") != -1) || (ua.indexOf("Windows NT 6.4") != -1)) {
            os = "Windows 10";
        } else if ((ua.indexOf("iPad") != -1)) {
            os = "iPad iOS " + getIosVersion();
        } else if ((ua.indexOf("iPhone") != -1)) {
            os = "iPhone iOS " + getIosVersion();
        } else if ((ua.indexOf("iPod") != -1)) {
            os = "iPod iOS " + getIosVersion();
        } else if (ua.indexOf("Android" != -1)) {
            os = "Android";
        } else if (ua.match(/Win(dows )?NT( 4\.0)?/)) {
            os = "Windows NT";
        } else if (ua.match(/Mac|PPC/)) {
            os = "Mac OS";
        } else if (ua.match(/Linux/)) {
            os = "Linux";
        } else if (ua.match(/(Free|Net|Open)BSD/)) {
            os = RegExp.$1 + "BSD";
        } else if (ua.match(/SunOS/)) {
            os = "Solaris";
        } else{
            os = "Other";
        }
    }
    if (os.indexOf("Windows") != -1) {
        if (navigator.userAgent.indexOf('WOW64') > -1 || navigator.userAgent.indexOf('Win64') > -1) {
            os += ' 64bit';
        } else {
            os += ' 32bit';
        }
    }

    return os;
}

function checkFold() {
    var foldList = ["SM-F900F","SM-F900U","SM-F9000","SCV44","SM-F900U1","SM-F907N","SM-F900W","SM-F907B","SM-F916Q","SCG05","SM-F916U1","SM-F936N","SM-F936U","SM-F936BE","SM-F936B","SM-F936W","SM-F936U1","SM-F9360","SCG16","SC-55C","SM-F926B","SM-F926N","SM-F926U","SM-F926U1","SM-F926W","SM-F916N","SM-F916U","SM-F9160","SM-F916W","SM-F916B"];
    var userAgent = navigator.userAgent.toUpperCase();

    if(userAgent.indexOf("SAMSUNG")){
        for(var i = 0; i<foldList.length; i++){
            var foldCode = foldList[i];
            if(userAgent.indexOf(foldCode) != -1){
                return true;
            }
        }
    }

    return false;
}


function checkBrower(useChange){
    // [현재 접속된 url 정보 및 접속 브라우저 확인]
    // [카카오톡 인앱 브라우저 >> 안드로이드 모바일 기종 인 경우 >> 크롬 브라우저 이동 실시]
    os = getOsName()
    browser = getBrowserName();

    if(os.match(/iPhone|iPad|iPod/i)){ // 아이폰 접속 경우
        // if(browser == 'kakao' || browser == 'whale')
        if(browser == 'kakao'){
            if(useChange == true){
                var url = window.location.href;
                var link = url.slice(0,url.lastIndexOf("/")) + "/kakao.html";
                location.href = link;
            }
                
            return false;
        }
    }
    else{
        if(browser == 'kakao' || browser == 'samsung'){ // 안드로이드
            // 먼저, 카카오 인앱 브라우저 닫기
            if(useChange == true){
                if( browser == 'kakao' )
                    location.href = 'kakaotalk://inappbrowser/close';

                var intent = 'intent://'+location.href.replace(/https?:\/\//i,'')+'#Intent;scheme=https;package=com.android.chrome;end';
                location.href=intent;
            }
            return false;
        }
    }    

    return true;
};

const getCookieValue = (name) => (
    document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
)

