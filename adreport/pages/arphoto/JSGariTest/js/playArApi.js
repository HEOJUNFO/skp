var apiHostPath = ""
//var apiHostPath = "https://playar.syrup.co.kr/"
//var apiHostPath = "https://event.culturecon-sample.com/"


function request(url,params) {

    let xhr = new XMLHttpRequest();

    xhr.onload = function(e){
        var a = 0;
        console.log(e);
    };

    xhr.open("POST", url, true);    
    xhr.setRequestHeader('Content-type', 'application/json');    

    params = JSON.stringify(params);

    try {
        xhr.send(params);    
    } catch (error) {
        console.log("로그 전송 에러");
    }    
    
}

let eventName = "JEONGSEON_GARIWANGSAN"

function reqAgree(instarID, phoneNumber){

    if( apiHostPath == "" ) {
        apiHostPath = window.location.origin;
    }

    phoneNumber = phoneNumber.replaceAll('-', '');

    var url = apiHostPath + "/api/v1/web-event-open/common-log-person-agree/save";
    var datas = {
        "eventName" : eventName,
        "agreeId" : instarID,
        "phoneNumber" : phoneNumber
    };

    console.log("개인정보동의API");
    console.log("host : " + apiHostPath);
    console.log(datas);

    request(url, datas);
};

function reqLog(type){

    console.log("로그");

    return;

    var url = apiHostPath + "/api/v1/web-event-open/common-log-pv/save";

    var datas = {
        "eventName" : eventName,
        "logKey" : type
    };
    request(url, datas);
    
};
