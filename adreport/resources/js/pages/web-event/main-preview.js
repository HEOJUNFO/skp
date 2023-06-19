/*
 * ADReport Mobile
 * common javascript file
 * License: SK planet wholly owned
 */
(function ($, window, document, undefined) {

    var eventHtmlTemplate = Handlebars.compile($("#eventHtmlTemplate").html());

    /**
     * request param data
     */
    var qs = is.parseQuery();
    const eventId = qs.eventId;

    //AR 참여하기 배경 기본색
    const BASIC_AR_ATTEND_BUTTON_DIV_COLOR = "#FFFFFF";
    //AR 참여하기 버튼 배경 기본색
    const BASIC_AR_ATTEND_BUTTON_BG_COLOR = "#405569";
    //AR 참여하기 버튼 텍스트 기본색
    const BASIC_AR_ATTEND_BUTTON_COLOR = "#FFFFFF";

    //이벤트 정보 가져오기
    var search = function (eventId) {
        var data = {
            eventId:eventId
        };

        $.ajax({
            url: "/api/v1/web-event-front/gate/detail",
            data: JSON.stringify(data),
            method: "POST",
            contentType: "application/json;charset=UTF-8"
        }).done(function(res, textStatus, xhr) {
            
            if (xhr.status === 200) {
                var result = res.result;
                
                $("#resultCode").val(res.resultCode);

                var eventBaseInfo = result.eventBaseInfo;
                //이벤트 타이틀
                $("#eventHeaderTitle").html("&nbsp; [Play AR] " + eventBaseInfo.eventTitle);

                //AR BG IMAGE
                $("#arBgImage").attr("src", eventBaseInfo.arBgImage);
                
                //AR버튼 텍스트
                $.innerText("#attendBtn", eventBaseInfo.arButtonText);
                
                //AR 버튼색이 기본일때
                switch("BASIC") {
                    case eventBaseInfo.arButtonBgColorAssignType : $("#arAttendBtnDiv").css("background", BASIC_AR_ATTEND_BUTTON_DIV_COLOR); 
                    case eventBaseInfo.arButtonColorAssignType : $("#attendBtn").css("background", BASIC_AR_ATTEND_BUTTON_BG_COLOR);
                    case eventBaseInfo.arButtonTextColorAssignType : $("#attendBtn").css("color", BASIC_AR_ATTEND_BUTTON_COLOR);
                    default:
                    break;
                }

                //AR 버튼색이 지정일때
                switch("ASSIGN") {
                    case eventBaseInfo.arButtonBgColorAssignType : 
                        if ("HEX" == eventBaseInfo.arButtonBgColorInputType) {
                            $("#arAttendBtnDiv").css("background", eventBaseInfo.arButtonBgColorHex); 
                        } else if ("RGB" == eventBaseInfo.arButtonBgColorInputType) {
                            $("#arAttendBtnDiv").css("background", "rgb(" + eventBaseInfo.arButtonBgColorRed + "," + eventBaseInfo.arButtonBgColorGreen + "," + eventBaseInfo.arButtonBgColorBlue + ")");
                        }

                    case eventBaseInfo.arButtonColorAssignType : 
                        if ("HEX" == eventBaseInfo.arButtonColorInputType) {
                            $("#attendBtn").css("background", eventBaseInfo.arButtonColorHex); 
                        } else if ("RGB" == eventBaseInfo.arButtonColorInputType) {
                            $("#attendBtn").css("background", "rgb(" + eventBaseInfo.arButtonColorRed + "," + eventBaseInfo.arButtonColorGreen + "," + eventBaseInfo.arButtonColorBlue + ")");
                        }
                        
                    case eventBaseInfo.arButtonTextColorAssignType : 
                        if ("HEX" == eventBaseInfo.arButtonTextColorInputType) {
                            $("#attendBtn").css("color", eventBaseInfo.arButtonTextColorHex); 
                        } else if ("RGB" == eventBaseInfo.arButtonTextColorInputType) {
                            $("#attendBtn").css("color", "rgb(" + eventBaseInfo.arButtonTextColorRed + "," + eventBaseInfo.arButtonTextColorGreen + "," + eventBaseInfo.arButtonTextColorBlue + ")");
                        }
                    
                    default:
                    break;
                }

                //화면구성할 정보(array)
                var eventHtmlInfo = result.eventHtmlInfo;
                
                //값이 없으면 히든 처리
                if (!eventHtmlInfo) {
                    $("#expand").hide();
                }
                if (eventHtmlInfo) {
                    $(".expand").append(eventHtmlTemplate(eventHtmlInfo));

                    //카카오톡 공유하기 버튼
                    for (var i=0; i<eventHtmlInfo.length; i++) {
                        let htmlInfo = eventHtmlInfo[i];
                        if (htmlInfo.htmlType === "SHARE") {
                            $.innerValueById("kakaoShareThumbnailUrl", htmlInfo.kakaoShareThumbnailUrl);
                            $.innerValueById("kakaoShareContents", htmlInfo.kakaoShareContents);
                        }
                    }
                }
                
            } 
        }).fail(function (err) {
            console.log(err.resultMessage);
        })
    };

    $(document).ready(function () {
        search(eventId);
    });
}(jQuery, window, document));
