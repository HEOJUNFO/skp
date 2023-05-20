var apiHostPath = ""
//var apiHostPath = "https://playar.syrup.co.kr/"
//var apiHostPath = "https://event.culturecon-sample.com/"


function request(url,params) {

    return;
    
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

function reqAgree(instarID){

    return;
    
    var url = apiHostPath + "/api/v1/web-event-open/common-log-person-agree/save";
    var datas = {
        "eventName" : "PUSAN_EXPO",
        "agreeId" : instarID
    };

    request(url, datas);
};

function reqLog(type){

    return;

    var url = apiHostPath + "/api/v1/web-event-open/common-log-pv/save";

    var datas = {
        "eventName" : "PUSAN_EXPO",
        "logKey" : type
    };
    request(url, datas);
    
};
