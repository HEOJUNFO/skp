/*
 * ADReport Mobile
 * common javascript file
 * License: SK planet wholly owned
 */
(function ($, window, document, undefined) {

    const eventHtmlTemplate = Handlebars.compile($("#eventHtmlTemplate").html());

    /**
     * request param data
     */
    let qs = is.parseQuery();
    const eventId = qs.eventId;
    const lat = qs.lat;
    const lon = qs.lon;
    let redirect = qs.redirect;
    let trcd = qs.trCd;

    /*
     * 전역 상수 값 정의 시작
     */
    //카카오 개발 키값
    //dev
    //const KAKAO_JAVASCRIPT_KEY = "13b514660d27453138c24963942d239c";
    //sk-planet key
    const KAKAO_JAVASCRIPT_KEY = "5975088db09b12dd5086062be15ca686";
    //카카오 init은 한번만 호출
    Kakao.init(KAKAO_JAVASCRIPT_KEY);

    //현재 url
    const THIS_URL = document.URL;
    
    //사라피 버전 정의
    const SAFARI_VERION = "504";
    //크롬 버전정의
    const CHROME_VERSION = "60";
    //IOS 크롬 버전정의
    const IOS_CHROME_VERSION = "99";

    let DEVICE_TYPE = "";
    const ANDROID_MARKET_URL = "market://details?id=com.android.chrome";

    const IOS_CHROME_MARKET_URL = "https://apps.apple.com/kr/app/google-chrome/id535886823";

    //AR 참여하기 배경 기본색
    const BASIC_AR_ATTEND_BUTTON_DIV_COLOR = "#FFFFFF";
    //AR 참여하기 버튼 배경 기본색
    const BASIC_AR_ATTEND_BUTTON_BG_COLOR = "#405569";
    //AR 참여하기 버튼 텍스트 기본색
    const BASIC_AR_ATTEND_BUTTON_COLOR = "#FFFFFF";

    //gps 옵셥
    const GEO_LOCATION_OPTIONS = {
        enableHighAccuracy : true,
        timeout : 5000,
        maximumAge : 0
    };

    let eventContractStatus = "";
    let diffServiceEndDateTodayCount = 0;
    let eventType;
    let isSmsPopup = false;
    let smsAuthCode = "";

    //const SMS_MENU_TYPE = "MAIN_ATTEND";

    const header = is.getHttpHeader;

    /*
     * 전역 상수 값 정의 끝
     */

    sessionStorage.clear();

    //브라우저 뒤로가기 버튼 클릭 이벤트 계약상태 예외처리 
    window.onpageshow = function(event) {
        sessionStorage.clear();
        if ( event.persisted || (window.performance && window.performance.navigation.type === 2)) {
            //구매중, 승인대기, 반려 일떄는 접속불가 처리
            if ( ($("#contractStatus").val() === is.getEventStatusDefine("paying").statusCode)   //구매중
                    || ($("#contractStatus").val() === is.getEventStatusDefine("accessPrepare").statusCode)  //승인대기
                    || ($("#contractStatus").val() === is.getEventStatusDefine("reject").statusCode) //반려 
                ) {
            // if ($("#contractStatus").val() === "00" || $("#contractStatus").val() === "01" || $("#contractStatus").val() === "02" ) {
                is.showCommonPopup(1, "noConnectPage", is.createCommonPopupBtnOpt(undefined, is.historyBack));
            }
        }
    };

    //카카오톡 링크로 들어올때 크롬으로 리다이렉션하기
    window.onload = function(){ 
        sessionStorage.clear();
        if(navigator.userAgent.match(/inapp|NAVER|KAKAOTALK|Snapchat|Line|WirtschaftsWoche|Thunderbird|Instagram|everytimeApp|WhatsApp|Electron|wadiz|AliApp|zumapp|iPhone(.*)Whale|Android(.*)Whale|kakaostory|band|twitter|DaumApps|DaumDevice\/mobile|FB_IAB|FB4A|FBAN|FBIOS|FBSS|SamsungBrowser\/[^1-9]/)){ 
            document.body.innerHTML = "";
            var tartgetUrl =  window.location.host + window.location.pathname + window.location.search;
            
            if(navigator.userAgent.match(/iPhone|iPad/i)) { 
                //ios
                var visitedAt = (new Date()).getTime(); // 방문 시간
                setTimeout(
                    function() {
                        if ((new Date()).getTime() - visitedAt < 2000) {
                            location.href = IOS_CHROME_MARKET_URL;
                        }
                     }, 500);
              
                 setTimeout(function() { 
                    location.href = "googlechromes://" + tartgetUrl;
                  }, 0);
            } else { 
                //android
                location.href = "intent://" + tartgetUrl +"#Intent;scheme=https;package=com.android.chrome;end";
            } 
        }
    };

    //이벤트 정보 가져오기
    let search = function (eventId, isRedirect) {
        if (!isRedirect) {
            isRedirect = false;
        }

        if (!trcd) {
            trcd = "";
        }

        const data = {
            eventId:eventId,
            isRedirect:isRedirect,
            trackingCode:trcd
        };

        $.ajax({
            url: "/api/v1/web-event-front/gate/detail",
            data: JSON.stringify(data),
            method: "POST",
            contentType: header.APPLICATION_JSON_UTF8
        }).done(function(res, textStatus, xhr) {
            
            if (xhr.status === 200) {
                let resultCode = Number(res.resultCode);
                //서비스 종료이고 종료일이 60일이 지났을때 접속불가 처리
                if (resultCode === 806) {
                    is.showCommonPopup(1, "noConnectPage", is.createCommonPopupBtnOpt(undefined, is.historyBack));
                    return;
                }

                let result = res.result;
                
                if (!result) {
                    is.showCommonPopup(1, "noEventResult", is.createCommonPopupBtnOpt(undefined, is.historyBack));
                    return;
                }
                console.log("result >>" + JSON.stringify(result));

                //이벤트 종류 - AR, 서베이고 등 정의
                eventType = result.eventBaseInfo.eventType;
                
                
                const eventBaseInfoData = {};
                
                //이벤트 구동정보
                eventBaseInfoData.eventType = result.eventBaseInfo.eventType;   
                
                //서베이고 > 성/연령별 참여 여부
                eventBaseInfoData.attendConditionTargetYn = result.eventBaseInfo.attendConditionTargetYn;   
                
                //이벤트 기본정로를 세션 스토리지에 저장
                sessionStorage.setItem("eventBaseInfo", JSON.stringify(eventBaseInfoData));

                //결과코드 값 
                $.innerValueById("resultCode", res.resultCode);

                let eventBaseInfo = result.eventBaseInfo;

                eventContractStatus = eventBaseInfo.contractStatus;
                eventRealEndDate = eventBaseInfo.realEventEndDate;
                diffServiceEndDateTodayCount = result.diffServiceEndDateTodayCount;
                
                //이벤트 정보가 없으면 에러 알림창
                if (!eventBaseInfo) {
                    is.showCommonPopup(1, "noEventResult", is.createCommonPopupBtnOpt(undefined, is.historyBack));
                    return;
                } 
                
                //이벤트 상태
                let contractStatus = eventBaseInfo.contractStatus;
                $.innerValueById("contractStatus", contractStatus);

                //구매중, 승인대기, 반려 일떄는 접속불가 처리
                if (contractStatus === "00" || contractStatus === "01" || contractStatus === "02") {
                    is.showCommonPopup(1, "noConnectPage", is.createCommonPopupBtnOpt(undefined, is.historyBack));
                    return;
                }
                //서비스예정, 서비스일시중지
                if (contractStatus === "03" || contractStatus === "05") {
                    //TODO 준비중 화면 보여준다
                    $.hideElement(".event_wrap");
                    $.hideElement(".footer");
                    $.showElement("#servicePrepareSection");
                    $.innerHtmlById("eventHeaderTitle", "&nbsp; " + eventBaseInfo.eventTitle);
                    return;
                }
                //계약종료
                if (contractStatus === "07") {
                    //TODO 종료화면 보여준다
                    $.hideElement(".event_wrap");
                    $.hideElement(".footer");
                    $.showElement("#serviceCloseSection");
                    $.innerHtmlById("#eventHeaderTitle", "&nbsp; " + eventBaseInfo.eventTitle);
                    return;
                }

                //이벤트 타이틀
                $.innerHtmlById("eventHeaderTitle", "&nbsp; " + eventBaseInfo.eventTitle);
                $.innerValueById("kakaoShareTitle", eventBaseInfo.eventTitle);

                //let arEventInfo = result.arEventInfo;
                //참여번호 미매칭 시 문구
                $.innerValueById("attendCodeMisMatchMessage", eventBaseInfo.attendCodeMisMatchMessage);
                //참여시간 미매칭 시 문구
                $.innerValueById("attendHourMisMessage", eventBaseInfo.attendHourMisMessage);
                //위치 미매칭 시 문구
                $.innerValueById("locationMessageNotAttend", eventBaseInfo.locationMessageNotAttend);
                //위치 매칭 시 문구
                $.innerValueById("locationMessageAttend", eventBaseInfo.locationMessageAttend);
                
                //AR BG IMAGE
                $("#arBgImage").attr("src", eventBaseInfo.arBgImage);
                
                //AR버튼 텍스트
                $.innerHtmlById("attendBtn", eventBaseInfo.arButtonText);
                
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
                    //버튼 배경색 
                    case eventBaseInfo.arButtonBgColorAssignType : 
                        if ("HEX" == eventBaseInfo.arButtonBgColorInputType) {
                            $("#arAttendBtnDiv").css("background", eventBaseInfo.arButtonBgColorHex); 
                        } else if ("RGB" == eventBaseInfo.arButtonBgColorInputType) {
                            $("#arAttendBtnDiv").css("background", "rgb(" + eventBaseInfo.arButtonBgColorRed + "," + eventBaseInfo.arButtonBgColorGreen + "," + eventBaseInfo.arButtonBgColorBlue + ")");
                        }
                    //버튼색
                    case eventBaseInfo.arButtonColorAssignType : 
                        if ("HEX" == eventBaseInfo.arButtonColorInputType) {
                            $("#attendBtn").css("background", eventBaseInfo.arButtonColorHex); 
                        } else if ("RGB" == eventBaseInfo.arButtonColorInputType) {
                            $("#attendBtn").css("background", "rgb(" + eventBaseInfo.arButtonColorRed + "," + eventBaseInfo.arButtonColorGreen + "," + eventBaseInfo.arButtonColorBlue + ")");
                        }
                    //버튼 텍트색
                    case eventBaseInfo.arButtonTextColorAssignType : 
                        if ("HEX" == eventBaseInfo.arButtonTextColorInputType) {
                            $("#attendBtn").css("color", eventBaseInfo.arButtonTextColorHex); 
                        } else if ("RGB" == eventBaseInfo.arButtonTextColorInputType) {
                            $("#attendBtn").css("color", "rgb(" + eventBaseInfo.arButtonTextColorRed + "," + eventBaseInfo.arButtonTextColorGreen + "," + eventBaseInfo.arButtonTextColorBlue + ")");
                        }
                    
                    default:
                    break;
                }

                //위치기능 사용여부
                $.innerValueById("locationSettingYn", eventBaseInfo.locationSettingYn);
                //참여코드 기능 사용여부
                $.innerValueById("arAttendConditionCodeYn", eventBaseInfo.arAttendConditionCodeYn);
                
                //pid
                $.innerValueById("pid", eventBaseInfo.pid);

                //SMS 인증 사용 여부
                isSmsPopup = eventBaseInfo.attendConditionMdnYn;

                //화면구성할 정보(array)
                let eventHtmlInfo = result.eventHtmlInfo;
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
            
            if (xhr.status !== 200) {
                //에러 알림창
                is.showCommonPopup(1, "commonError");
                return;
            }
        }).fail(function (err) {
             //에러 알림창
             is.showCommonPopup(1, "commonError");
        });
    };

    /*
    *  버튼 이벤트 시작 
    */

    //참여하기 버튼
    $("#attendBtn").click(function() {
        const resultCode = Number($.getValueById("resultCode"));
        
        //서비스가 종료일떄
        if (is.getValueById("contractStatus") === "06") {
            //이벤트 종료일 60일 이하는 참여불가 에러 처리
            if ( diffServiceEndDateTodayCount > 60 ) {
                is.showCommonPopup(1, "expiredDateEventAttend");
                return;
            }
            is.showCommonPopup(1, "serviceStatusEnd");
            return;
        }
        //이벤트가 가능한 상태가 아닐때
        if (resultCode === 806) {
            _saveAttendButtonLog(eventId, "N");
            is.showCommonPopup(1, "notPoossibleStatusEvent");
            return;
        }
        //이벤트가 가능한 시간이 아닐때
        if (resultCode === 807) {
            _saveAttendButtonLog(eventId, "N");
            _alertPopup("notPossibleTimeEvent");
            //is.showCustomCommonPopup(1, "notPossibleTimeEvent");
            return;
        }
        
        if (resultCode === 999) {
            _saveAttendButtonLog(eventId, "N");
            is.showCommonPopup(1, "unknownError");
            return;
        }

        //업데이트가 필요할때
        if (_browerCheck()) {
            is.showCommonPopup(1, "requireUpdate", is.createCommonPopupBtnOpt(undefined, _updateBrower));
            return;
        }

        //위치기반 서비스 여부
        var locationSettingYn = $("#locationSettingYn").val();
        //참여코드 서비스 여부
        var arAttendConditionCodeYn = $("#arAttendConditionCodeYn").val();
        //위치동의 세션
        var agreeLocationInfoYn = sessionStorage.getItem("agreeLocationInfoYn");

        //위치 서비스 사용했을때
        if (locationSettingYn == "true") {
            navigator.geolocation.getCurrentPosition(_geoLocationSuccess, _geolocationError, GEO_LOCATION_OPTIONS);
            return false;
        } 
        
        //위치 서비스 사용 안했을때
        if (locationSettingYn == "false") {
            //참여코드 검증 
            if (arAttendConditionCodeYn == "true") {
                console.log("위치정보 이벤트 X >> 참여코드 정보 받기");
                $.showElement("#attendCodePopupSection");
            } 
            //참여코드 검증없이 이동
            if (arAttendConditionCodeYn == "false" || arAttendConditionCodeYn == "") {
                console.log("위치 서비스도 안하고 참여코드 서비스도 안할때 바로 ar화면으로 이동");
                if (eventType === is.eventType.AR) {
                    //핸드폰인증일때
                    if (isSmsPopup) {
                        is.smsPopup(is.smsMenuType.MAIN_ATTEND, eventType);
                        return false;
                    }
                    _goArPage();
                }
                if (eventType === is.eventType.SURVEY) {
                    console.log("서베이고 구동 페이지로 이동");
                    //핸드폰인증일때
                    if (isSmsPopup) {
                        is.smsPopup(is.smsMenuType.MAIN_ATTEND, eventType);
                        return false;
                    }
                    _goSurveyGoPage();
                }
            }
        }
    });

    //참여코드 검증 버튼
    $(document).on("click", "#attendCodeValidateionBtn", function() {
        let attendCodeWrongCnt = is.getValueById("attendCodeWrongCnt");
        const attendCode = is.getValueById("attendCode");
        const url = "/api/v1/web-event-front/validate/attend-code";
        const params = {
            eventId : eventId,
            attendCode : attendCode
        };

        $.ajax({
            url : url,
            data: JSON.stringify(params),
            method : "POST",
            contentType: header.APPLICATION_JSON_UTF8
        }).done(function(res, textStatus, xhr) {
            if (xhr.status === 200) {
                if (res.resultCode === 200) {
                    console.log("참여코드 검증 res :: {} " + JSON.stringify(res));

                    if (eventType === is.eventType.AR) {
                        //AR 페이지로 이동
                        console.log("코드검증 성공 AR페이지로 이동!");
                        _goArPage();
                        return;
                    }
                    if (eventType === is.eventType.SURVEY) {
                        //서베이고 페이지로 이동
                        console.log("코드검증 성공 서베이고 페이지로 이동!");
                        _goSurveyGoPage();
                        return;
                    }
                }
                
                //참여코드가 존재하지 않을때
                if (res.resultCode === 808) {
                   _attendCodePopupErrorEvent($("#attendCodeMisMatchMessage").val(), res.resultCode);
                   //참여번호가 에러 세번 전까지는 틀린 개수 증가 
                   if (Number(attendCodeWrongCnt) < 2) {
                        attendCodeWrongCnt++;
                        $("#attendCodeWrongCnt").val(attendCodeWrongCnt++);
                        return;
                    }
                   //참여번호가 세번 틀렸을때 처리 
                   if (Number(attendCodeWrongCnt) === 2) {
                        _saveAttendButtonLog(eventId, "N");
                        $.hideElement("#attendCodePopupSection");
                        is.putPvLog(is.getPvLogParams("0", "/main/popup", undefined, undefined, "4"));
                        is.showCommonPopup(1, "attendCodeWrongError", is.reload);
                        return;
                    }
                }
                //이미 사용된 참여코드일때
                if (res.resultCode === 809) {
                    _saveAttendButtonLog(eventId, "N");
                    _attendCodePopupErrorEvent("이미 참여가 완료된 참여 번호 입니다. 다른 참여 번호를 입력하세요.", res.resultCode);
                    return;
                }
                //참여코드 참여회수 초과일때(전체기간, 일일기간안에 참여회수가 초과되었을때 에러처리)
                if (res.resultCode === 819) {
                    _saveAttendButtonLog(eventId, "N");
                    _attendCodePopupErrorEvent("참여번호의 참여가능 회수가 초과되었습니다.", res.resultCode);
                    return
                }
            }

            if (xhr.status !== 200) {
                //에러 알림창
                is.showCommonPopup(1, "commonError");
                return;
            }
            
        }).fail(function(error){
            //에러 알림창
            is.showCommonPopup(1, "commonError");
        });
    });

    //당첨내역 이동 버튼
    $(document).on("click", ".event_btn a[name=historyBtn]", function () {
        //이벤트 종료일 60일 이후 당첨내역 조회불가 예외처리
        if (diffServiceEndDateTodayCount > 60) {
            is.showCommonPopup(1, "expiredDateWinningSearch");
            return;
        }
        location.href = "/web-event/event-winning-history.html?eventId=" + eventId;
    });

     //NFT 당첨내역 화면 이동 버튼
     $(document).on("click", "[name=nftHistoryBtn]", function () {
        location.href = "/web-event/nft/nft-history.html?eventId=" + eventId + "&winningType=NFT";
    });

    //쿠폰 당첨내역 화면 이동 버튼
    $(document).on("click", "[name=couponHistoryBtn]", function () {
        location.href = "/web-event/nft/nft-history.html?eventId=" + eventId + "&winningType=NFTCP";
    });

    //공유하기 버튼 이벤트 
    $(document).on("click", '.share', function() {
        _kakaoLinitInit();
    });

    //참여번호 팝업 > 취소버튼 
    $(document).on("click", "#attendCodeCancelBtn", function(){
        $("#attendCodePopupSection").hide();
    });

   /*
    *  버튼 이벤트 끝
    */

   /*
    * private 함수 시작  
    */
    const _updateBrower = function() {
        if (DEVICE_TYPE != "") {
            if (DEVICE_TYPE === "android") {
                window.location= ANDROID_MARKET_URL;
            }
            if (DEVICE_TYPE === "ios") {
                var thisUrl = window.location.host + window.location.pathname + window.location.search;
                //크롬 앱으로 연결(ios)
                location.href = "googlechrome://" + thisUrl;
            }
        }
    }

    //커스텀 알림 팝업 
    let _alertPopup = function(mentType) {

        if (mentType !== undefined) {
            var ment = is.ment(mentType);
            var resultJsonObj = JSON.parse(ment);
            var title = resultJsonObj.title;
            var content = resultJsonObj.content;

            //참여가능 시간이 아닐때 멘트
            if (mentType === "notPossibleTimeEvent") {
                //커스텀한 메세지가 있는지 확인
                const attendHourMisMessage = is.getValueById("attendHourMisMessage");
                
                if (attendHourMisMessage) {
                    content = attendHourMisMessage;
                } 

                //AR
                if (eventType === is.eventType.AR) {
                    title = "참여실패!";
                }
                //서베이고
                if (eventType === is.eventType.SURVEY) {
                    title = "설문참여가 어려워요";
                } 

            }
            
            //위치 미매칭 멘트
            if (mentType === "errorEventLocation"){
                //커스텀한 메세지가 있는지 확인
                const locationMessageNotAttend = is.getValueById("locationMessageNotAttend");
                
                if (locationMessageNotAttend) {
                    content = locationMessageNotAttend;
                }
                
                //AR
                if (eventType === is.eventType.AR) {
                    title = "위치참여실패!";
                } 
                //서베이고
                if (eventType === is.eventType.SURVEY) {
                    title = "설문참여가 어려워요";
                }
            }

            //위치 매칭 멘트
            if (mentType === "successAccessLocation") {
                const locationMessageAttend = is.getValueById("locationMessageAttend");

                if (locationMessageAttend != "") {
                    content = locationMessageAttend;
                }

                title = "위치참여성공!";
                
                //확인 버튼 ID attribute 주입
                $("#alertPopup2 .confirm").attr("id", "locationMessageBtn");
            }

            //팝업 뷰
            $.showElement("#alertPopup2");
            $.innerText("#alertPopupTitle2", title);
            $.innerHtmlById("alertPopupContents2", content);
        }
    };

    $(document).on("click", "#locationMessageBtn", function() {
        $.hideElement("#alertPopup2");
        if (isSmsPopup) {
            is.smsPopup(is.smsMenuType.MAIN_ATTEND, eventType);
        } else {
            if (eventType === is.eventType.AR) {
                _goArPage();
            }
            if (eventType === is.eventType.SURVEY) {
                _goSurveyGoPage();
            }
        }
    });

    $(document).on("click", "#locationMessageNotBtn", function() {
        $.hideElement("#alertPopup");
    });


    //AR 페이지 이동
    let _goArPage = function() {
        var arUrlPath = "/webar/index.html#/?eventId=" + eventId;

        //localStorage 값 셋팅
        window.localStorage.setItem("event_validation", eventId + "_" + is.webEventGetTraceNo());
        //페이지 이동 url 연동해야함
        let attendCode = is.getValueById("attendCode");
        
        //참여번호가 있는지 확인
        if (attendCode) {
            $.hideElement("#attendCodePopupSection");
            $.innerValueById("attendCode", "");
            arUrlPath += "&attendCode=" + attendCode
        }

        //SMS 인증일때 핸드폰번호로 참여가능한 회수 확인
        if (isSmsPopup) {
            let isValidate = _validateArPhoneNumber();
            if (!isValidate) {
                return false;
            }
            //팝업 닫기
            $.hideElement("#smsAuthPopupSection");
        }
        
        location.href = arUrlPath;
    };

    //모바일, PC 인지 체크
    let _isMobile = function() {
        var tempUser = navigator.userAgent;
        var isMobile = false;

        // userAgent 값에 iPhone, iPad, ipot, Android 라는 문자열이 하나라도 존재한다면 모바일로 간주됨.
        if (tempUser.indexOf("iPhone") > 0 || tempUser.indexOf("iPad") > 0
            || tempUser.indexOf("iPot") > 0 || tempUser.indexOf("Android") > 0) {
            isMobile = true;
        }
        return isMobile;
    };

    //버전확인 함수(verA : 업데이트할 버전, verB : 현재 버전)
    let _isUpdateVersion = function(standardVersion, currentVersion){
        var result = false;
        
        var currentVersionSplit = currentVersion.split( "." );
        var currentVersionFirst = currentVersionSplit[0];
        
        if (Number(standardVersion) > Number(currentVersionFirst)) {
            result = true;
        }
        return result;
    };

    //gps 성공 콜백 
    let _geoLocationSuccess = function(pos) {
        var crd = pos.coords;
        let latitude = crd.latitude;
        let longitude = crd.longitude;

        if ((lat != undefined)) {
            latitude = lat;
        }
        if ((lon != undefined)) {
            longitude = lon;
        }
        
        console.log(latitude +", " + longitude);
                //판교역 위경도
        //37.3956807, 127.1121295
        //37.3501718, 127.1091773 (미금역)

        //위경도 로컬 스토리지 셋팅
        window.localStorage.setItem("latitude", latitude);
        window.localStorage.setItem("longitude", longitude);

        let pid = is.getValueById("pid");

        if (!pid) {
            //위치기반 이벤트이고 PID가 존재하지 않고 참여코드를 받는 이벤트일때 참여코드 검증 팝업 뷰 - 서베이고 고도화 작업 시 코드 추가
            if (is.getValueById("arAttendConditionCodeYn") === "true") {
                $.showElement("#attendCodePopupSection");
                return;
            } else {
                //위치기반 이벤트이고 PID가 존재하지 않고 참여코드를 받지않는 이벤트일때 바로 구동 페이지로 이동 - 서베이고 고도화 작업 시 코드 추가
                if (eventType === is.eventType.AR) {
                    _goArPage();
                    return;
                } 
                if (eventType === is.eventType.SURVEY) {
                    _goSurveyGoPage();
                    return;
                }
            }
        } 

        //위치기반 이벤트 조회 api 조회
        let url = "/api/v1/web-event-front/search/proximity";
        let proximityParams = {
            eventId : eventId,
            latitude : latitude,
            longitude : longitude
        };
        
        console.log("proximityParams {} " + JSON.stringify(proximityParams));

        $.post({
            url : url, 
            data : JSON.stringify(proximityParams), 
            contentType : header.APPLICATION_JSON_UTF8
        })
        .done(function(response, text, xhr) {
            //console.log("result :: " + JSON.stringify(response));
            //통신 200
            if (xhr.status === 200) {
                //api 결과 코드 값이 200
                if (response.resultCode === 200) {
                    let result = response.result;
                    
                    //pid와 위치기반 api eventId가 틀리면 예외처리
                    if (pid !== result.eventId) {
                        _saveAttendButtonLog(eventId, "N");
                        _alertPopup("notMatchEventLocation");
                        return;
                    }
    
                    //gps기반 참여가능한 위치가 아닐때
                    if (result.eventExist === "N") {
                        console.log("{pid >> " + pid + "}");
                        _saveAttendButtonLog(eventId, "N");
                        _alertPopup("errorEventLocation");
                        return;
                    }
                    //gps기반 이벤트가 있을때
                    if (result.eventExist === "Y") {
                        let locationMessageAttend = $("#locationMessageAttend").val();
                        //위치기반 매칭 멘트가 있으면 멘트 팝업
                        if (locationMessageAttend !== "") {
                            $("#locationMessagePopupYn").val("Y");
                            _alertPopup("successAccessLocation");
                            return;
                        } else {
                            //위치기반 매칭 멘트가 없으면 바로 참여코드 팝업
                            if ($("#arAttendConditionCodeYn").val() === "true") {
                                console.log("참여코드 정보 받기 :: 참여코드 검증 화면 보여준다");
                                $("#attendCodePopupSection").show();
                                return;
                            } 
                            if (isSmsPopup) {
                                is.smsPopup(is.smsMenuType.MAIN_ATTEND, eventType);
                                return false;
                            }
                            
                        }
                    }
                    
                    if ($("#arAttendConditionCodeYn").val() === "false") {
                        //AR 이벤트 일때
                        if (eventType === is.eventType.AR) {
                            console.log("위치 서비스고 참여코드 서비스 안할때 바로 ar화면으로 이동");
                            _goArPage();
                        }
                        //서베이고 일때
                        if (eventType === is.eventType.SURVEY) {
                            console.log("위치 서비스고 참여코드 서비스 안할때 바로 서베이고화면으로 이동");
                            _goSurveyGoPage();
                        }
                    }
                }
            }
            //통신에러
            if (xhr.status !== 200) {
                is.showCommonPopup(1, "commonError");
                //return;
            }
            
        })
        .fail(function(){
            is.showCommonPopup(1, "commonError");
        });
    };

    //위치정보 가져올때 에러
    let _geolocationError = function(err) {
        console.log(err);
        // Check for permission denied error

        is.putPvLog(is.getPvLogParams("0", "/main/popup", undefined, undefined, "2"));

        let isIos = false;
        let isAndroid = false;

        if (navigator.userAgent.match("iPhone")) isIos = true;
        if (navigator.userAgent.match("Android")) isAndroid = true;

        switch(err.code) {

            case err.PERMISSION_DENIED:
                //alert("이 문장은 사용자가 Geolocation API의 사용 요청을 거부했을 때 나타납니다!");
                if (isAndroid) {
                    alert("AR 위치 참여를 위해 브라우저 우측상단 설정 > 고급 > 사이트설정 > 위치 > 차단목록에서 playar을 허용으로 변경해주세요.");
                    return;
                }
                if (isIos) {
                    alert("아이폰 PLAY AR 위치이벤트 참여를 위해 위해 아래 3가지 설정확인이 필요합니다." + "\n\n"
                    + "1번째 확인 : 아이폰 설정>개인정보보호>위치서비스 활성화" + "\n\n"
                    + "2번째 확인 : 아이폰 설정>사파리 혹은 크롬 > 위치 > 허용 (전체 웹사이트 허용 혹은 playar.syrup.co.kr 허용으로 변경)" + "\n\n"
                    + "3번째 확인 : 사파리혹은 크롬에서 이벤트페이지 접속 > 브라우저 설정메뉴 > 웹사이트 설정 > playar.syrup.co.kr 설정 > 접근허용 > 위치 > 허용 확인" + "\n\n"
                    + "위 3가지 확인 완료후 페이지 새로고침후 위치이벤트 참여가능!");

                    return;
                }
                break;

            case err.POSITION_UNAVAILABLE:
                alert("위치정보를 사용할 수 없습니다.");
                //alert("이 문장은 가져온 위치 정보를 사용할 수 없을 때 나타납니다!");
                break;

            case err.TIMEOUT:
                alert("위치정보를 받아오는 시간이 초과되었습니다.");
                //alert("이 문장은 위치 정보를 가져오기 위한 요청이 허용 시간을 초과했을 때 나타납니다!");
                break;

            case err.UNKNOWN_ERROR:
                alert("위치정보를 받아올때 알 수 없는 에러가 발생되었습니다.");
                //alert("이 문장은 알 수 없는 오류가 발생했을 때 나타납니다!");
                break;
            
        }
        return;

        if (err.code === 1) {
            //위치 허용을 안했을때 알림
            _alertPopup("requireAccessLocation");
            console.log("Permission denied to use location");
            return;
        }
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    //브라우저 버전체크
    var _browerCheck = function() {
        if (_isMobile()) {
            console.log("모바일 접속");
        } else {
            console.log("데스크탑 접속");
        }

        var reg = null;
        var agent = navigator.userAgent.toLowerCase();
        
        let isIos = false;
        let isAndroid = false;

        if (navigator.userAgent.match("iPhone")) isIos = true;
        if (navigator.userAgent.match("Android")) isAndroid = true;

        if(  (navigator.appName == "Netscape"
            && navigator.userAgent.search("Trident") != -1
            || (agent.indexOf("msie") != -1)  )){
            console.log("IE입니다");

        } else if ( agent.indexOf("chrome") != -1 || agent.indexOf("crios") != -1 ) {
            reg = /chrome\/(\S+)/;
            console.log("크롬입니다");

            //아이폰일때
            if (agent.indexOf("crios") != -1) {
                reg = /crios\/(\S+)/;
                var version = reg.exec(agent)[1];
                var isVersion = _isUpdateVersion(IOS_CHROME_VERSION, version.toString());
                DEVICE_TYPE = "ios";

                //업데이트가 필요하면 return
                if (isVersion) {
                    return true;
                } 
            }

            //안드로이드일때
            if (agent.indexOf("chrome") !== -1) {
                console.log("안드로이드 ?? :  " + isAndroid);
                if (isAndroid) {
                    DEVICE_TYPE = "android";
                    var version = reg.exec(agent)[1];
                    
                    //업데이트 버전체크
                    var version = reg.exec(agent)[1];
                    var isUpdate = _isUpdateVersion(CHROME_VERSION, version.toString());
                    // console.log("브라우저 버전 업데이트를 해야하나 ?? : " + isUpdate);
                
                    //업데이트가 필요하면 return
                    if (isUpdate) {
                        return true;
                    }
                }
            } else {
                //안드로이드 디바이스 > 크롬일떄
                var thisUrl = window.location.host + window.location.pathname + window.location.search;
                //크롬 앱으로 연결(안드로이드)
                location.href = "intent://" + thisUrl +"#Intent;scheme=http;package=com.android.chrome;end";
            }
            
        } else if ( agent.indexOf("safari") !== -1 ) {
            reg = /safari\/(\S+)/;
            console.log("IOS ?? :  " + isIos);
            //alert(reg.exec(agent)[1]);
            var version = reg.exec(agent)[1];

            //IOS11 사파리 버전 앞자리는 604
            var isUpdate = _isUpdateVersion(SAFARI_VERION, version.toString());
            // console.log("브라우저 버전 업데이트를 해야하나 ?? : " + isUpdate);
            DEVICE_TYPE = "ios";

            //업데이트가 필요하면 return
            if (isUpdate) {
                return true;
            }
                    
        } 
    }

    //카카오톡 공유하기 함수
    var _kakaoLinitInit = function() {
        Kakao.Link.sendDefault({
            objectType: 'feed',
            content: {
                title: is.getValueById("kakaoShareTitle"), // 보여질 제목
                description: is.getValueById("kakaoShareContents"), // 보여질 설명
                imageUrl: is.getValueById("kakaoShareThumbnailUrl"), // 콘텐츠 URL
                link: {
                    mobileWebUrl: THIS_URL,
                    webUrl: THIS_URL
                }
            }
        });
    }

    //참여코드 입력 팝업창 에러 시 하단 에러 문구 이벤트
    let _attendCodePopupErrorEvent = function(errorMsg, errorCode) {
        $("#attendCodePopupSection .layer_popup .popup_contents .pfl_pop .info_form ul li").removeClass("on");
        $("#attendCodePopupSection .layer_popup .popup_contents .pfl_pop .info_form ul li").addClass("error");

        if (errorCode === 808) {
            if (!is.getValueById("attendCodeMisMatchMessage")) {
                errorMsg = "참여번호가 일치하지 않습니다.";
            }
        }
        $.innerText("#errorMsg", errorMsg);    
    } 

    //참여하기버튼 로그 저장하기
    let _saveAttendButtonLog = function(eventId, successYn) {
        const url = "/api/v1/web-event-front/attend-button-log/save";
        const params = {
            eventId : eventId,
            successYn : successYn
        };
        
        $.post({
            url : url, 
            data : JSON.stringify(params), 
            contentType : 'application/json; charset=utf-8'
        })
    };

    $(document).on("click", "#sendSmsBtn", function () {
        const mdn = $.getValueById("mdn");
        //인증번호 발송
        smsAuthCode = is.sendSmsAuth(eventId, mdn, is.smsMenuType.MAIN_ATTEND);
    });

    //sms 인증번호 확인 버튼 이벤트
    $(document).on("click", "#confirmSmsCodeBtn", function () {
        const $this = $(this);
        const btnHtml = $this.html();
        if (btnHtml === "확인") {
            $.hideElement("#smsAuthPopupSection");
            return;
        }

        let smsCode = $.getValueById("checkPhoneNumber");
        if (!smsCode) {
            alert("SMS인증번호를 입력하세요.");
            return;
        }
        //sms 인증번호 인증하기
        let isAuth = is.authSmsCode(smsAuthCode, smsCode);
        //인증이 통과했을때
        if (isAuth) {
            //AR이면 AR 구동페이지로 이동
            if (eventType === is.eventType.AR) {
                _goArPage();
            }
            //서베이고면 서베이고 구동페이지로 이동
            if (eventType === is.eventType.SURVEY) {
                _goSurveyGoPage();
            }
        }
    });

    //서베이고 페이지로 이동
    let _goSurveyGoPage = function () {
        const phoneNumber = is.getValueById("mdn");
        const attendCode  = is.getValueById("attendCode");

        //SMS 인증일때 핸드폰번호로 참여가능한 회수 확인
        if (isSmsPopup) {
            let isValidate = _validateArPhoneNumber();
            if (!isValidate) {
                return false;
            }
        }
        
        const apiUrl = "/api/v1/survey-go-mobile/survey-attend/possible"
        const param = {
            eventId:eventId,
            phoneNumber:phoneNumber,
            attendCode:attendCode
        };

        $.post({
            url : apiUrl, 
            data : JSON.stringify(param), 
            async : false,
            contentType : header.APPLICATION_JSON_UTF8
        })
        .done(function(response, text, xhr) {
            console.log("result :: " + JSON.stringify(response));
            //통신 200
            if (xhr.status === 200) {
                console.log("_goSurveyGoPage >> ", response.result);
                let resultCode;
                if (response) {
                    resultCode = Number(response.resultCode);
                }
                //api 결과 코드 값이 200
                if (resultCode === 200) {
                    //SMS 팝업 닫기
                    if (isSmsPopup) {
                        $.hideElement("#smsAuthPopupSection");
                    }

                    //참여코드가 있으면 참여코드 팝업 삭제, 참여코드 필드 값 공백으로 셋팅
                    if (attendCode) {
                        //참여코드 세션스토리지 저장
                        sessionStorage.setItem("attendCode", attendCode);
                        $.hideElement("#attendCodePopupSection");
                        $.innerValueById("attendCode", ""); 
                    }

                    const result = response.result;
                    
                    if (result.isSurveyAttend && result.surveyLogAttendId) {
                        sessionStorage.setItem("surveyLogAttendId", result.surveyLogAttendId);  //서베이고 참여 인덱스값

                        location.href = "/web-event/survey-go/survey-go.html?eventId=" + eventId;
                        return false;
                    } else {
                        is.showCommonPopup(1, "errorAttendSurvey");
                        return false;
                    }
                }
                //참여번호 참여횟수 초과 에러
                if (resultCode === 819) {
                    $.hideElement("#attendCodePopupSection");
                    is.showCommonPopup(1, "attendLimitAttendCode");
                    return false;
                }
                //전화번호 참여횟수 초과 에러
                if (resultCode === 854) {
                    $("#smsAuthErroCountMent").removeClass("active");
                    $("#smsAuthPopupSection .tip_txt_box").addClass("active");
                    $("#smsAuthPopupSection .tip_txt_box p").html("해당 휴대폰 번호로 더 이상 서베이 참여가 어려워요");
                    $.innerHtmlById("confirmSmsCodeBtn", "확인");
                    $("#confirmSmsCodeBtn").attr("disabled", false);
                    return false;
                }
            }
            //통신에러
            if (xhr.status !== 200) {
                is.showCommonPopup(1, "commonError");
            }
            
        })
        .fail(function(){
            is.showCommonPopup(1, "commonError");
        });
    }

    //AR > 핸드폰번호 참여일때 참여가능한지 체크하는 API
    let _validateArPhoneNumber = function () {
        let isValidate = false;
        let apiUrl = "/api/v1/web-event-front/validate/phone-number";
        let phoneNumber = is.getValueById("mdn");

        let param = {
            eventId:eventId,
            phoneNumber:phoneNumber
        };

        $.post({
            url : apiUrl, 
            data : JSON.stringify(param), 
            async:false,
            contentType : header.APPLICATION_JSON_UTF8
        })
        .done(function(res, text, xhr) {
            //통신 200
            if (xhr.status === 200) {
                //타이머 초기화
                clearInterval(is.timer);

                let resultCode = Number(res.resultCode);

                if (resultCode === 200) {
                    isValidate = true;
                    sessionStorage.setItem("userMdn", phoneNumber);
                }
                //전화번호 참여 횟수 초과시 에러
                if (resultCode === 854) {
                    //is.showCommonPopup(1, "attendLimitPhoneNumber");
                    $("#smsAuthErroCountMent").removeClass("active");
                    $("#smsAuthPopupSection .tip_txt_box").addClass("active");
                    $("#smsAuthPopupSection .tip_txt_box p").html("해당 전화번호기준 참여 횟수가 초과되어<br> 더 이상 참여하실수 없습니다.");
                    return false;
                }
            }
            //통신에러
            if (xhr.status !== 200) {
                //return;
                is.showCommonPopup(1, "commonError");
            }
            
        })
        .fail(function(){
            is.showCommonPopup(1, "commonError");
        });
        return isValidate;
    }

    /*
    * private 함수 끝
    */
   

    $(document).ready(function () {
        is.putPvLogPageView("0", "/main");
        search(eventId, redirect);
        //최초진입시 brower local storage 삭제
        window.localStorage.removeItem("event_validation");
    });
}(jQuery, window, document));
