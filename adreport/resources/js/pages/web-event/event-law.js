/*
 * ADReport Mobile
 * common javascript file
 * License: SK planet wholly owned
 */
(function ($, window, document, undefined) {

    const lawResultTemplate = Handlebars.compile($("#lawResultTemplate").html());
    const lawHistoryTemplate = Handlebars.compile($("#lawHistoryTemplate").html());

    const qs = is.parseQuery();

    const urlInfo = window.location.href;

    let eventType = qs.eventType;
    let lawType;
    //개인정보취급방침
    if (urlInfo.indexOf("privacy") > -1) {
        lawType = "PRIVACY";
    }
    //서비스이용약관
    if (urlInfo.indexOf("terms") > -1) {
        lawType = "TERMS";
    }

    //api 통신
    const _getData = function() {
        if (!eventType) {
            eventType = "AR";
        }
        const apiUrl = "/api/v1/web-event-front/event-law/event-type/" + eventType + "/law-type/" + lawType;
        //콜백
        is.getFetch(apiUrl, _makeLawData);
    };

    //api 콜백 함수
    const _makeLawData = function(resultObj) {
        if (resultObj) {
            let resultCode = resultObj.resultCode;
            //결과 코드가 정상이면
            if (resultCode === 200) {
                //개인정보처리방침
                const sessionLawData = sessionStorage.getItem("lawData");
                if (!sessionLawData) {
                    sessionStorage.removeItem("lawData");
                    $.innerHtmlById("lawSection", lawResultTemplate(resultObj.result.contents));
                } else {
                    $.innerHtmlById("lawSection", lawResultTemplate(sessionLawData));
                }
                $(".terms_detail").append(lawHistoryTemplate(resultObj.result.hyperLinkInfo));

                // if (lawType === "PRIVACY") {
                //     const sessionLawData = sessionStorage.getItem("lawData");
                //     if (!sessionLawData) {
                //         sessionStorage.removeItem("lawData");
                //         $.innerHtmlById("lawSection", lawResultTemplate(resultObj.result.contents));
                //     } else {
                //         $.innerHtmlById("lawSection", lawResultTemplate(sessionLawData));
                //     }
                //     $(".terms_detail").append(lawHistoryTemplate(resultObj.result.hyperLinkInfo));
                // }

                // //서비스이용약관
                // if (lawType === "TERMS") {
                //     $.innerHtmlById("lawSection", lawResultTemplate(resultObj.result.contents));
                // }
                
            } else {
                //결과 코드가 200 이 아니면 에러 팝업 
                is.showCommonPopup(1, "commonError");
            }
        }
    }; 

    $.callLawDetail = function (idx) {
        const apiUrl = "/api/v1/web-event-front/event-law/idx/" + idx;
        //콜백
        is.getFetch(apiUrl, _makeLawDetailData);
    };

    const _makeLawDetailData = function (resultObj) {
        sessionStorage.setItem("lawData", resultObj.result.contents);
        window.location.reload();
    };

    //load data
    _getData();

}(jQuery, window, document));
