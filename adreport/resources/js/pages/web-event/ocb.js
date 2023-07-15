if (!window.ocbApp) { window.ocbApp = {}; }
( function( $, window, document, undefined ) {

    let CallbackFunc = new Object(); 

    let osType = 'aos';
	let tmpAppTypeHeader = navigator.userAgent;
	if( tmpAppTypeHeader.indexOf("iPhone") > 0 || tmpAppTypeHeader.indexOf("iPad") > 0 ){
		osType = 'ios'; 
	}

    let ocbSid = "11302";
    //개발용 ocb site_id 주입
    if ( is.getDomain().indexOf('playardev.syrup.co.kr') > -1 ) {
        ocbSid = "6683";
    }

    //OCB 앱이면 왼쪽 상단 "<" 이미지 삭제처리
    if (is.isApp()) {
        $.hideElement(".moweb_header");
    }
    
    /**
     * OCB앱 오픈브라우저 콜
     * @param {*} targetUrl : 이동할 URL
     */
    const _startOpenBrower = function(targetUrl) {
        let logMsg = "startOpenBrower targetUrl >> " + targetUrl;
        _requestOcbLog(logMsg);
        
        if (osType == 'aos') {
            OcbAndroidJS.startBrowser(targetUrl, null);
        } else {
            OcbiOSJS.startBrowserWithURLEncoding(targetUrl, null);
        }
    }

    /**
     * OCB앱 상단 제목 지정
     * @param {*} osType 
     * @param {*} title 
     */
    const _setTitle = function(title) {
        if (osType == 'aos') {
            OcbTitleViewJS.setTitle(title);
        } else {
            OcbiOSTitleViewJS.setTitle(title);
        }
    }

    /**
     * OCB 링크 URL 페이지로 이동
     * @param {*} linkUrl 
     */
    const _goLinkPage = function(linkUrl) {
        let ocbBaseUrl = "ocbt://com.skmc.okcashbag.home_google/detail/event?url=";
        if (linkUrl) {
            ocbBaseUrl += linkUrl;
            location.href = ocbBaseUrl;
        } else {
            console.log("error : linkUrl is empty");
        }
    }

    /**
     * OCB 화면 이동
     * @param {*} type 
     */
    const _goOcbPage = function(type, oid) {
        let ocbScheme = "ocbt://com.skmc.okcashbag.home_google";
        let ocbCouponDetailUrl = "ocbt://com.skmc.okcashbag.home_google/detail/event?url=https%3A%2F%2Fhybrid.okcashbag.com%2Fr2%2Fonline%2FonlineCoupon%2FappOnlineCouponInsFreeDetail.mocb%3FpocId%3DP0001%26couponSeq%3D";

        if (type) {
            switch (type) {
                case "main" : ocbScheme += "/main";  //메인페이지
                    break;
                case "authCI" : ocbScheme += "/auth/entry?type=CI";  //CI인증레벨 
                    break;
                case "authKMC" : ocbScheme += "/auth/entry?type=KMC";    //핸드폰인증레벨
                    break;
                case "location" : ocbScheme += "/gw/locwizard";  //위치설정
                    break;
                case "bluetooth" : ocbScheme += "bluetoothUse";  //블루투스 설정
                    break;
                case "push" : if (osType == "aos") {    //푸시설정
                                    ocbScheme += "/gw/detailAppSetting"  
                                } else {
                                    ocbScheme += "/pushDeviceSetting";
                                }  
                    break;
                case "point" : ocbScheme += "/pointDetail"; //포인트 내역 페이지
                break;
                case "couponDetail" : ocbCouponDetailUrl += oid;    //OCB쿠폰 상세 페이지
                default:
                    break;

            }
            if (type === "couponDetail") {
                location = ocbCouponDetailUrl;
            } else {
                location = ocbScheme;
            }
        }
    }

    //OCB AUTH 요청 함수
    const _requestOcbAuth = function() {
        if (osType == 'aos') { 
            OcbAndroidJS.requestAuthInfo('ocbApp.AuthInfo');
        } else { 
            OcbiOSJS.requestAuthInfo('ocbApp.AuthInfo');
        }
    }

    //OCB 파트너 토큰 요청 함수
    const _requestOcbPartnerToken = function() {
        if (osType == 'aos') { 
            OcbAndroidJS.requestPartnerToken(ocbSid, 'ocbApp.InitToken');
        } else { 
            OcbiOSJS.requestPartnerToken(ocbSid, 'ocbApp.InitToken');
        }
    }

    //OCB 포인트 지급 시 파트너 요청 함수
    const _requestOcbPointSave = function() {
        if (osType == 'aos') { 
            OcbAndroidJS.requestPartnerToken(ocbSid, 'ocbApp.RequestOcbPoint');
        } else { 
            OcbiOSJS.requestPartnerToken(ocbSid, 'ocbApp.RequestOcbPoint');
        }
    }

    //OCB 디바이스 셋팅정보 체크 함수
    const _checkDeviceSetting = function() {
        if (osType == 'aos') { 
            OcbAndroidJS.requestARSettings("ocbApp.CheckDeviceSetting");
        } else { 
            OcbiOSJS.requestARSettings('ocbApp.CheckDeviceSetting');
        }
    }

    //OCB 위치정보 요청 함수
    const _requestGeoLocation = function() {
        if (osType == 'aos') { 
            OcbAndroidJS.requestCurrentLocation('ocbApp.InitGpsInfo');
        } else { 
            OcbiOSJS.requestCurrentLocation('ocbApp.InitGpsInfo');
        }
    }

    //OCB포인트 적립 요청 함수
    const _requestOcbPoint = function(resultCode, partnerToken) {
        if (resultCode == 0) {
            const qs = is.parseQuery();
            const apiUrl = "/api/v1/web-event-ocb/point/save";
            const params = {
                eventId : qs.eventId,
                partnerToken : partnerToken
            };
            //OCB 포인트 적립 API 통신
            is.postFetch(apiUrl, params, _requestOcbPointCallback);
            return;
        }
    }

    //OCB포인트 적립 요청 콜백 함수
    const _requestOcbPointCallback = function(res) {
        if (res) {
            //API response 코드
            const resultCode = res.resultCode;
            //API response 항목
            const resultObj  = res.result;
            
            //API 정상통신일때
            if (is.isEqual(resultCode, 200)) {
                //OCB 포인트 적립 상태 값 조건 - 정상적립
                if (is.isEqual(resultObj.code, "00")) {
                    (async function() {
                        var result = await _viewOcbPointPopup("S", resultCode);
                        if (result) {
                            _goLogicalPage();
                        } else {
                            is.showCommonPopup(1, "commonError");
                            return;
                        }
                    })();
                    return;
                }

                //OCB 포인트 적립 상태 값 조건 - Token값 유효성 검증 실패(10), 요청 파라메터 값 오류(20), Nxmile 적립 실패 (save_type="real_time"로 요청한 경우, 적립 요청 실패 시)(30), 당일 적립 한도 초과 시(80), 기타 요청 실패 시(90)
                if (is.isEqual(resultObj.code, "00")) {
                    const popupMentJson = JSON.parse(is.ment("ocbPointSaveError"));
                    const title = popupMentJson.title;
                    let content = popupMentJson.content;
                    if (content) {
                        content = content.replace("{errorCode}", resultObj.code);
                    }
                    is.showCustomCommonPopup(2, title, content, is.createCommonPopupBtnOpt("이벤트참여", _goLogicalPage), is.createCommonPopupBtnOpt("취소", undefined));
                    return;
                }
            }
            //API 결과 코드 - 포인트 적립 가능한 상태가 아닙니다
            if (is.isEqual(resultCode, 860)) {
                is.showCommonPopup(1, "commonError");
                return;
            } else {
                (async function() {
                    var result = await _viewOcbPointPopup("F", resultCode);
                    if (result) {
                        _goLogicalPage();
                    } else {
                        is.showCommonPopup(1, "commonError");
                        return;
                    }
                })();
                return;
            }
        }
    }

    async function _viewOcbPointPopup(type, resultCode) {
        if (type) {
            return new Promise(function(resolve) {
                if (type === "S") {
                    //포인트 정상 지급일때
                    if (resultCode === 200) {
                        $.showElement("#pointSuccessPopupSection");
                        $.innerText("#pointText", resultObj.requestPoint + "P 적립!");
                        setTimeout(
                            function() {
                                $.hideElement("#pointSuccessPopupSection");
                                $.innerText("#pointText", "");
                                //_goLogicalPage();
                                resolve(type);
                            }, 3680);
                    }
                }
                if (type === "F") {
                    //포인트 최대적립수(일,기간내) 초과시
                    if (is.isEqual(resultCode, 861)) {
                        $.showElement("#pointFailPopupSection");
                        $.showElement("#pointFailPopupTextEnd");
                    }
                    //고객당 포인트적립수 초과시
                    if (resultCode === 862) {
                        $.showElement("#pointFailPopupSection");
                        $.showElement("#pointFailPopupTextAlready");
                    }
                    setTimeout(
                        function() {
                            $.hideElement("#pointFailPopupSection");
                            
                            //포인트 최대적립수(일,기간내) 초과시
                            if (resultCode === 861) {
                                $.hideElement("#pointFailPopupTextEnd");
                            }
                            //고객당 포인트적립수 초과시
                            if (resultCode === 862) {
                                $.hideElement("#pointFailPopupTextAlready");
                            }
                            // _goLogicalPage();
                            resolve(type);
                        }, 2680);
                }
                
            });
        }
    }

    //OCB 새창 닫기 함수
    const _requestCloseWindow = function() {
        if (osType == 'aos') {
            setTimeout(function() {
                OcbAndroidJS.requestCloseWindow(); 
            }, 100); 
        } else {
            setTimeout(function() {
                OcbiOSJS.requestCloseWindow();
            }, 100); 
        }
    }

    //OCB 구동 시 AR, 서베이고 구동 페이지 이동 함수 
    const _goLogicalPage = function() {
        let qs = is.parseQuery();
        const eventId = qs.eventId;
        let eventBaseInfo = $.jStorage.get("eventBaseInfo");
        if (eventBaseInfo) {
            const eventType = JSON.parse(eventBaseInfo).eventType;
            //AR 또는 포토일때
            if (eventType === is.eventType.AR || eventType === is.eventType.PHOTO) {
                let arUrlPath = "/webar/index.html#/?eventId=" + eventId + "&arData=" + is.getArData(qs.eventId);
                arUrlPath = is.getDomain() + arUrlPath;
                _startOpenBrower(arUrlPath);
            }
            //SURVEY
            if (eventType === is.eventType.SURVEY) {
                let apiUrl = "/web-event/survey-go/survey-go.html?eventId=" + eventId; 
                apiUrl = is.getDomain() + apiUrl;
                _goLinkPage(apiUrl);
            }
        }
    }

    /**
     * OCB 공용 팝업
     * @param {} popupJsonStringData 
     * 파라메터 데이터 예시
     * {
        "title": "알림",
        "message": "아쉽지만 14세 미만 사용자는 서비스이용이 어려워요.",
        "buttons": [
            { 
                "label": "확인",
                "action": "ocbApp.popupOk"
            }
        ],
        "hasClose":false
        }
     */
    const _showOcbPopup = function(popupJsonStringData) {
        if (osType === 'aos') {
            OcbAndroidJS.showOcbPopup(JSON.stringify(popupJsonStringData));
        } else {
            OcbiOSJS.showOcbPopup(JSON.stringify(popupJsonStringData));
        }
    }

    const _showOcbPopupParmas = function(title, message, buttonLabel, buttonActionCallback) {
        let popupData = {};
        popupData.title = title;
        popupData.message = message;

        let buttonObj = {};
        buttonObj.label = buttonLabel;
        buttonObj.action = buttonActionCallback;

        let buttons = [];
        buttons.push(buttonObj);
        
        popupData.hashClose = false;

        _showOcbPopup(popupData);
    }

    /**
     * 1. OCB 사용자 정보 콜백 
     * 설명 : OCB앱에서 authInfo 정보가 정상 통신이 되면 session스토리지에 'ocbAuthInfo' 의 JSON 데이터 생성
     * ocbAuthInfo JSON 값 예시 : {"auth":"1","type":"01","pinstate":0,"callbackToken":"T2NhwEYCGTc-UA-1ODe-uzQ@f103f1e7","session":"7c6f9a29fa9a4eb9946f7a5a6cb99d0c","birthday":"19701031","gender":"male"}
     * @param {*} res 
     * @returns 
     */
    CallbackFunc.AuthInfo = function(res) {
        //auth 값이 0이면 로그인 안된 상태
        if (!res) {
            //본인인증 페이지 뷰 
            $.showElement("#noAuthSection");
            //CI 본인인증 팝업
            _goOcbPage("authCI");
            return;
        } else {
            const parseAuthInfo = JSON.parse(res);

            //본인인증이 안되었을때
            if (parseAuthInfo.auth == "0") {
                $.showElement("#noAuthSection");
                //CI 본인인증 팝업
                _goOcbPage("authCI");
                return;
            } else {
                const age = is.calcAge(parseAuthInfo.birthday);
                //만 14세 이하일때 알림 팝업
                if (age < 15) {
                    const popupJonsData = {
                        "title": "알림",
                        "message": "아쉽지만 14세 미만 사용자는 서비스이용이 어려워요.",
                        "buttons": [
                            { 
                                "label": "확인",
                                "action": "ocbApp.popupOk"
                            }
                        ],
                        "hasClose":false
                    };
                    _showOcbPopup(popupJonsData);
                    return;
                } else {
                    $.hideElement(".moweb_header");
                    $.hideElement("#eventHeaderTitleDiv");
                    $.showElement("#mainSection");
                    $("#mainSection").css("padding-top", "0");
                    $.jStorage.set( "ocbAuthInfo", JSON.parse(JSON.stringify(res)) );
                    _requestOcbPartnerToken();
                }
                
            }
        }
    }

    /**
     * 2. OCB 파트너 토큰 발급 콜백
     * 설명 : OCB앱에서 사용자의 mbrId 를 조회하기위한 API 통신 시 필요한 파트너 토큰을 조회한다
     * @param {*} resultCode : 0 성공 , 2 에러, 3 접근 불가 (인가된 도메인 아님)
     * @param {*} token : 콜백받은 파트너 토큰 (string 단일 값)
     */
    CallbackFunc.InitToken = function(resultCode, token) {
        if (resultCode == 0) {
            const partnerTokenInfo = {
                "partnerToken" : token,
                "partnerTokenCreatedDate" : is.getNowDateTime()
            };
            $.jStorage.set("partnerTokenInfo", JSON.stringify(partnerTokenInfo));
            const apiUrl = "/api/v1/web-event-ocb/session/find/" + token;

            if (ocbApp.surveyLogic) {
                // TODO Jihye
                console.log("tokenInfo token callback : " + partnerTokenInfo.partnerToken);
                ocbApp.surveyLogic(token);
                ocbApp.surveyLogic = undefined;
            }

            is.getFetch(apiUrl, CallbackFunc.InitTokenApiCallback);
        } else {
            is.showCommonPopup(1, "ocbUserInfoError");
            ocbApp.surveyLogic = undefined;
            console.log("InitToken Error errorCode : " + resultCode);
        }
    }

    /**
     * 3. OCB 사용자 위치정보 가져오기 콜백
     * 설명 : OCB앱에서 위치정보가 정상 통신이 되면 session스토리지에 'gpsInfo' 의 JSON 데이터 생성
     * gpsInfo JSON 값 예시 : {"wgsX":127.110576,"wgsY":37.3489342,"address":"분당구 구미동"} >> wgsY:위도, wgsX:경도, address:주소
     * @param {*} resultCode 
     * @param {*} res 
     */
    CallbackFunc.InitGpsInfo = function(resultCode, res) {
        if (resultCode == 0) {
            $.jStorage.set( "gpsInfo", JSON.parse(JSON.stringify(res)) );
            _initGpsSuccess(res);
        } else {
            console.log("InitGpsInfo Error errorCode : " + resultCode);
            is.showCommonPopup(1, "ocbAppGeoLocationError");
        }
    }
    
    const _initGpsSuccess = function(gpsInfo) {
        const qs = is.parseQuery();
        const eventId = qs.eventId;
        const eventBaseInfo = $.jStorage.get("eventBaseInfo");
        let eventType;
        if (eventBaseInfo) {
            eventType = JSON.parse(eventBaseInfo).eventType;
        } else {
            _requestOcbLog("eventBaseInfo is null error");
        }

        let parseGpsInfo = JSON.parse(gpsInfo);
        const param = {
            eventId : eventId,
            latitude : parseGpsInfo.wgsY,
            longitude : parseGpsInfo.wgsX
        };
        //proxymity api 확인 후 구동 페이지 이동 로직
        is.searchProxymity(param, eventId, eventType);
    }

    //3. OCB 사용자 설정정보 가져오기
    CallbackFunc.CheckDeviceSetting = function(res) {
        if (!res) {
            console.log("CheckDeviceSetting Error");
            is.showCommonPopup(1, "ocbAppGeoLocationError");
            return;
        }
        
        let deviceSettingInfo = JSON.parse(res);
        console.log('deviceSettingInfo: ', deviceSettingInfo);

        let locationClause;     //위치정보 약관동의 확인
        let locationSetting;    //위치정보 사용하기 ON/OFF
        let location;           //단말기 위치정보 ON/OFF

        if (deviceSettingInfo) {
            locationClause = deviceSettingInfo.location_clause;
            locationSetting = deviceSettingInfo.location_setting;
            location = deviceSettingInfo.location;
        }

        if (osType == 'aos') {
            //대략적 위치권한
            let ANDROID_ACCESS_COARSE_LOCATION = OcbAndroidJS.checkPermission('android.permission.ACCESS_COARSE_LOCATION');
			//정확한 위치권한
            let ANDROID_ACCESS_FINE_LOCATION = OcbAndroidJS.checkPermission('android.permission.ACCESS_FINE_LOCATION');
            //백드라운드 위치권한
			//let ANDROID_ACCESS_BACKGROUND_LOCATION = OcbAndroidJS.checkPermission('android.permission.ACCESS_BACKGROUND_LOCATION');
            
            if (String(ANDROID_ACCESS_COARSE_LOCATION) == -1 || String(ANDROID_ACCESS_FINE_LOCATION) == -1) {
                //대략적 위치권한 또는 정확한 위치권한이 허용되어 있지 않으면 정확한 위치동의 팝업 콜
                //OcbAndroidJS.requestPermission('ocbApp.RequestPermission', 'android.permission.ACCESS_FINE_LOCATION');
                _goOcbPage("location");
                return;
            } 
        }

        //사용자 위치정보 약관동의 확인 또는 설정 > 위치정보 사용하기 ON 또는 단말 위치정보
        if (!locationClause || !locationSetting || !location) {
            _goOcbPage("location");
            return;
        } else {
            _requestGeoLocation();
        }
    }

    CallbackFunc.InitTokenApiCallback = function(res) {
        console.log('result: ', res);
        if (res) {
            const resultCode = res.resultCode;
            console.log('resultCode: ', resultCode);
            //정상통신이 아니면 에러처리
            if (resultCode !== 200) {
                console.log("InitTokenApiCallback error errorCode : ", resultCode);
                is.showCommonPopup(1, "ocbUserInfoError");
            } 
            //정상통신일때
            if (resultCode === 200) {
                sessionStorage.setItem("ocbUserInfo", JSON.stringify(res.result));
                $.jStorage.set( "ocbUserInfo", JSON.stringify(res.result) );
            }
        } else {
            console.log("api error");
            is.showCommonPopup(1, "ocbUserInfoError");
        }
        
    }

    CallbackFunc.popupOk = function() {
        location.href = "ocbt://com.skmc.okcashbag.home_google/main";
    }

    /**
     * JSON 형태의 데이터를 전달하는 함수
     *
     * @since v6.7.0
     */
    const _urlSchemeByJSON = function(json) {
        window.webkit.messageHandlers.logger.postMessage(json);
    }

    /**
     * IOS 기본 로그 출력
     * Default Log
     * @param {string} message 로그 메시지
     */
    const _iosLog = function(message) {
        _urlSchemeByJSON({
            "logType": "default",
            "message": message
        });
    };

    /**
     * IOS 에러 로그 출력
     * Error Log
     * @param {string} message 로그 메시지
     */
    const _iosError = function(message) {
        _urlSchemeByJSON({
            "logType": "error",
            "message": message
        });
    };

    /**
     * IOS 실패 에러 출력
     * Fault Log
     * @param {string} message 로그 메시지
     */
    const _iosFault = function(message) {
        _urlSchemeByJSON({
            "logType": "fault",
            "message": message
        });
    };

    //OCB앱 로그 콜 (안드로이드 : 웹 콘솔 로그, IOS : 맥 콘솔 로그 출력<맥콘솔 검색 : ocb5>)
    const _requestOcbLog = function(msg, iosMsgType) {
        if (osType == 'aos') {
            console.log(msg);
        } else {
            if (iosMsgType) {
                if ("default") {
                    _iosLog(msg);
                } else if ("error") {
                    _iosError(msg);
                } else if ("fault") {
                    _iosFault(msg);
                } 
            } else {
                _iosLog(msg);
            } 
        }
    }

    window.ocbApp.AuthInfo             = CallbackFunc.AuthInfo;
    window.ocbApp.InitToken            = CallbackFunc.InitToken;
    window.ocbApp.CheckDeviceSetting   = CallbackFunc.CheckDeviceSetting;
    window.ocbApp.InitGpsInfo          = CallbackFunc.InitGpsInfo;
    window.ocbApp.RequestOcbPoint      = _requestOcbPoint;
    window.ocbApp.popupOk = CallbackFunc.popupOk;

    ocbApp.startOpenBrower         = _startOpenBrower;
    ocbApp.setTitle                = _setTitle;
    ocbApp.requestOcbAuth          = _requestOcbAuth;
    ocbApp.requestPartnerToken     = _requestOcbPartnerToken;
    ocbApp.checkDeviceSetting      = _checkDeviceSetting;
    ocbApp.goLinkPage              = _goLinkPage;
    ocbApp.goOcbPage               = _goOcbPage;
    ocbApp.requestGeoLocation      = _requestGeoLocation;
    ocbApp.requestCloseWindow      = _requestCloseWindow;
    ocbApp.requestOcbPointSave     = _requestOcbPointSave;
    ocbApp.showOcbPopup            = _showOcbPopup;
    ocbApp.showOcbPopupParmas      = _showOcbPopupParmas;
    ocbApp.requestOcbLog           = _requestOcbLog;
    ocbApp.goLogicalPage           = _goLogicalPage;

    ocbApp.iosLog = _iosLog;
    ocbApp.iosError = _iosError;
    ocbApp.iosFault = _iosFault;
    ocbApp.surveyLogic;


    $(document).on("click", "#ocbAuthBtn", function() {
        _goOcbPage("authCI");
    });

}( jQuery, window, document ));