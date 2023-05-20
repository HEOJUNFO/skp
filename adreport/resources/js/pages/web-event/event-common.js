if (!window.is) { window.is = {}; }
( function( $, window, document, undefined ) {
    const POPUP_TYPE_BTN_OK = 1,
        POPUP_TYPE_BTN_CANCEL_OK = 2,
        POPUP_TYPE_BTN_CANCEL_MIDDLE_OK = 3;

    $.ajaxSetup({
        timeout: 30000
    });

    jQuery.fn.radioValue = function( data ) {
        var value;
        if ( data ) {
            this.each( function( i, el ) {
                var $el = $( el ),
                    value = $el.val();
                if ( value === data ) {
                    $el.prop( "checked", true );
                }
            } );
        } else {
            this.each( function( i, el ) {
                var $el = $( el );
                if ( $el.prop( "checked" ) ) {
                    value = $el.val();
                }
            } );
            return value;
        }
    };

    var _indexToOrderNo = function (index) {
        if (isNaN(index * 1)) {
            return index;
        }
        index = index + 1 + "";
        return index;
    };

    var _indexToOrderNoId = function (index) {
        if (isNaN(index * 1)) {
            return index;
        }

        index = index + 1;

        if(index < 10){
            index = "0" + index;
        }
        else{
            index = index + "";
        }

        return index;
    };

    var _webEventGetTraceNo = function (){
        var timezoneOffset = new Date().getTimezoneOffset() * 60000;
        var timezoneDate = new Date(Date.now() - timezoneOffset);

        var traceNo = (timezoneDate).toISOString().slice(0,19).replace(/[-T:]/g,"")+(Math.random()+"").slice(2,5);
        return traceNo;
    };

    var _webEventRequestParams = function(data) {
        data.traceNo = _webEventGetTraceNo();
        return data;
    };

    
    var _ment = function(mentType) {
        var data = {
            unknownError : {title : "에러알림", content : "알수없는 에러가 발생되었습니다.(에러코드 999)"},
            requireUpdate : {title : "업데이트 필요", content : "AR참여를 위해서 크롬(사파리) 업데이트가 필요합니다."},
            notPossibleTimeEvent : {title : "이벤트 상태 알림", content : "이벤트가 가능한 시간이 아닙니다."},
            notPoossibleStatusEvent : {title : "이벤트 상태 알림", content : "이벤트가 가능한 상태가 아닙니다."},
            serviceStatusEnd : {title : "서비스 상태 알림", content : "서비스가 종료되었습니다."},
            notMatchEventLocation : {title : "이벤트 에러", content : "위치기반 이벤트 정보가 상이합니다."},
            errorEventLocation : {title : "위치참여실패!", content : "현재 위치에서 참여가능한 이벤트가 아닙니다."},
            requireAccessLocation : {title : "이벤트 위치 에러", content : "위치 차단 시 AR 참여가 불가능합니다."},
            worngPassword : {title : "비밀번호 에러", content : "비밀번호가 틀렸습니다."},
            inputPassword : {title : "비밀번호 확인", content : "비밀번호를 입력하세요."},
            confirmMemberName : {title : "이름(성명) 확인", content : "(성명)이 입력되지 않았습니다. 다시 입력해 주세요."},
            confirmMemberBirth : {title : "생년월일 확인", content : "생년월일이 입력되지 않았습니다. 다시 입력해 주세요."},
            confirmMemberBirthLength : {title : "생년월일 확인", content : "생년월일은 8자리입니다. 다시 입력해 주세요."},
            confirmFourteen : {title : "14세 미만 이용불가", content : "만 14세미만의 경품제공을 위한 개인정보 제공은 불가능합니다.\n법정대리인을 통해 이용하시기 바랍니다."},
            confirmPhoneNumber : {title : "전화번호 확인", content : "전화번호가 입력되지 않았습니다. 다시 입력해 주세요."},
            confirmWrongPhoneNumber : {title : "전화번호 확인", content : "전화번호가 형식에 맞지않습니다. 다시 입력해 주세요."},
            confirmZipcode : {title : "우편번호 확인", content : "우편번호가 입력되지 않았습니다. 다시 입력해 주세요."},
            confirmAddress : {title : "주소 확인", content : "주소를 입력되지 않았습니다. 다시 입력해 주세요."},
            confirmAddressDetail : {title : "상세주소 확인", content : "상세주소를 입력되지 않았습니다. 다시 입력해 주세요."},
            confirmGiveAwayPassword : {title : "비밀번호 재확인", content : "비밀번호가 정상적으로 입력되지 않았습니다."},
            confirmAttendCode : {title : "참여코드 확인", content : "참여번호가 입력되지 않았습니다."},
            agreementPersonalInfo : {title : "개인정보 수집 동의", content : "개인정보 수집 및 이용(필수) 동의가 필요합니다. \n이용동의 후 다시 확인을 선택해 주세요."},
            successGiveAwaySave : {title : "경품 저장 완료", content: "경품배송정보 입력이 완료되었습니다.\n자세한 수령일정은 이벤트안내 참고 해주세요"},
            closeGiveAwayPage : {title : "알림", content : "잠깐만요! \r경품배송정보가 정상적으로 입력되지 않았습니다. \r정확히 입력한 경우에만 경품발송이 가능합니다."},
            commonError : {title : "에러알림", content : "잠깐만요! \r시스템점검으로 서비스접속이 불안정합니다. 잠시후에 다시 접속해주세요"},
            noEventResult : {title : "에러알림", content : "이벤트 정보가 없습니다!"},
            noConnectPage : {title : "알림", content : "접속가능한 이벤트 상태가 아닙니다."},
            noConnectPageTime : {title : "알림", content : "접속가능한 이벤트 시간이 아닙니다."},
            gifticonSendError : {title : "알림", content : "기프티콘 발송에 오류가 발생했습니다. 입력 정보를 다시 확인해주시거나, 아래 문의처로 문의해주세요. syrupadmin@syrup.co.kr"},
            giveAwayPageConnectionError : {title : "알림", content : "당첨입력 화면 비정상적 접근입니다!"},
            confirmNftWalletAddress: {title: "지갑주소확인", content: "지갑주소를 입력해주세요."},
            duplicateNftWalletAddress: {title: "알림", content: "동일한 핸드폰번호에 지갑주소가 있습니다."},
            copyToClickBoardNftWalletAddress: {title: "알림", content: "NFT 주소가 복사되었습니다."},
            copyToClickBoardNftWalletAddressError: {title: "알림", content: "복사할 NFT 주소가 없습니다."},
            confirmNftWalletAddressAtTransNft: {title: "지갑정보등록", content: "NFT 지갑정보가 등록되지 않았습니다.<br>지감정보 등록 후 NFT를 선택하면 내지갑으로 소유권 이전이 가능합니다."},
            notNftWalletAddress : {title : "에러알림", content : "NFT 지갑주소가 없습니다."},
            notNftRepository : {title : "에러알림", content : "NFT 저장소의 정보가 없습니다."},
            notNftToken : {title : "에러알림", content : "NFT 토큰 정보가 없습니다."},
            notUsedNftToken : {title : "에러알림", content : "사용할 수 없는 NFT 토큰 입니다."},
            notTransferNftToken : {title : "에러알림", content : "소유권 이전이 가능한 상태가 아닙니다."},
            errortransferNftProcess: {title : "에러알림", content : "NFT 이전시 에러가 발생했습니다."},
            putInForTransNft: {title : "알림", content : "NFT 이전신청이 완료된 상태입니다."},
            noNftWinningHistory: {title : "알림", content : "NFT 당첨내역이 없습니다."},
            expiredDateWinningSearch: {title : "에러알림", content : "당첨조회 기한이 만료되었습니다."},
            expiredDateEventAttend: {title : "에러알림", content : "AR 참여 기간이 만료되었습니다."},
            expiredDateNftWalletSave: {title : "에러알림", content : "지갑 정보 입력 기간이 만료되었습니디."},
            noCouponWinningHistory: {title : "알림", content : "쿠폰 당첨내역이 없습니다."},
            confirmSmsAuthCode: {title : "알림", content : "SMS인증번호를 입력하세요."},
            attendLimitPhoneNumber: {title : "알림", content : "해당 전화번호기준 참여 횟수가 초과되어 더 이상 참여하실수 없습니다."},
            attendLimitAttendCode: {title : "알림", content : "해당 참여번호기준 참여 횟수가 초과되어 더 이상 참여하실수 없습니다."},
            failAuthSms : {title : "알림", content : "인증번호가 틀려 인증에 실패하였습니다. 다시 시도해주세요."},
            failAuthSms5 : {title : "알림", content : "5회 이상 틀려 인증 오류가 발생했습니다. 인증번호 재발송해주세요."},
            failAuthSmsMinutLimit: {title : "알림", content : "인증 번호 유효 시간 (3분)이 지났습니다." },
            validatePhoneNumber : {title : "알림", content : "휴대폰 번호는 숫자만 입력해주세요."},
            limitSmsSendCount : {title : "알림", content : "인증번호 발송은 1일 3회만 가능합니다."},
            errorAttendSurvey : {title : "에러알림", content : "서베이고 참여 시 에러가 발생되었습니다.<br>관리자에게 문의하세요."},
            surveyBackAlert : {title : "설문을 그만하시겠어요?", content : "페이지를 나가시면 중간 저장이 되지 않습니다."},
            surveyAttentTargetAlert : {title : "설문참여가 어려워요", content : "죄송합니다.\n해당 성별/연령대의 설문 목표수 정원이 마감되었습니다. \n다음에 참가해주세요."},
            surveyErrorAlert : {title : "알림", content : "서베이고 참여시 에러가 발생하였습니다."},
            confirmReceiveGiveAway : {title : "알림!", content : "직원 확인용 버튼으로 고객님이 누르면 경품지급에 제한이 될 수 있습니다!"},
            abnormalGiveAwayPageConnection : {title : "에러", content : "경품 저장에 대한 비정상 접근입니다. 운영자에게 문의하세요!"},
            notWinningResult : {title : "에러", content : "당첨정보가 없습니다!"},
            giveAwaySaveErrorByName : {title : "에러", content : "경품저장 시 이름이 잘못됐습니다!"},
            giveAwaySaveErrorByPhoneNumber : {title : "에러", content : "경품저장 시 핸드폰번호가 잘못됐습니다!"},
            giveAwaySaveErrorByAddress : {title : "에러", content : "경품저장 시 주소가 잘못됐습니다!"},
            giveAwaySaveErrorByAgeLimit : {title : "에러", content : "나이가 만15세가 되지않습니다!"},
            giveAwaySaveErrorByBirthDay : {title : "에러", content : "경품저장 시 생년월일이 잘못됐습니다!"},
            giveAwaySaveErrorByBirthDayInSpecialChar : {title : "에러", content : "경품저장 시 생년월일에 특수문자가 포함되어있습니다!"},
            giveAwaySaveError : {title : "에러", content : "경품저장 시 에러가 발생됐습니다. 운영자에게 문의하세요!"},
            giveAwaySaveErrorByButton : {title : "에러", content : "경품 버튼 정보에 에러가 있습니다!"},
            giveAwaySaveErrorByNftLimit : {title : "에러", content : "수령가능한 NFT 개수가 초과되었습니다!"},
            birthDayPatternError : {title : "에러", content : "생년월일 형식에 맞지않습니다. 다시 입력해주세요.(입력예 : 19700910)"},
            pageAbnormalConnectionError : {title : "에러알림", content : "비정상 접근입니다!"},
            attendCodeWrongError : {title : "에러알림", content : "참여번호가 정확하지 않습니다. 확인 후 AR참여버튼을 다시 클릭해 주세요."},
            usedCoupon : {title : "알림", content : "이미 사용이 완료된 쿠폰입니다."},
            notPossibleTimeEventSurvey : {title : "설문참여가 어려워요", content : "이벤트가 가능한 시간이 아닙니다."},
        };
        
        var title;
        var content;
        if (mentType !== undefined) {
            $.each(data, function(key, value) {
                if (key == mentType) {
                    title = value.title,
                    content = value.content;
                    
                }
            });
        }
        var resultData = {
            title : title,
            content : content
        };

        let logType;

        switch (mentType){
            case "requireUpdate":   // 업데이트 필요 팝업
                logType = "0";
                break;
            case "requireAccessLocation":   // 위치 허용 필요
                logType = "2";
                break;
            case "confirmFourteen":     // 14세 미만 이용 불가
                logType = "3";
                break;
        }

        if (logType) {
            _putPvLog(_getPvLogParams("0", "/main/popup", undefined, undefined, logType));
        }

        return JSON.stringify(resultData);
    };

    let _getEventStatusDefine = function(eventStaus) {
        let eventStatusData = {
            paying : { name : "구매중", code : "00" },
            accessPrepare : {name : "승인대기", code : "01" },
            reject : { name : "반려", code : "02" },
            serviceSchedule : { name : "서비스예정" , code : "03"},
            service : { name : "서비스진행중", code : "04"} ,
            servicePause : { name : "서비스일시중지", code : "05"},
            serviceEnd : { name : "서비스종료", code : "06"},
            contractEnd : { name : "계약종료", code : "07"}

        };
        let statusCode;
        if (eventStaus !== undefined) {
            $.each(eventStatusData, function(key, value) {
                if (key === eventStaus) {
                    statusCode = value.code;
                    
                }
            });
        }
        var resultData = { statusCode : statusCode }
        //return JSON.stringify(resultData);
        return resultData;
    };

    jQuery.innerHtmlById = function(tagId, val) {
        if (tagId != "") {
            $("#" + tagId).html(val);
        }
    };

    jQuery.innerText = function(tag, text) {
        if (tag && text) {
            $(tag).text(text);
        }
    };
    
    /**
     * html value 값 넣기
     * @param {} tagId 
     * @param {*} val 
     */
    jQuery.innerValueById = function(tagId, val) {
        if (tagId != "") {
            $("#" + tagId).val(val);
        }
    };

    /**
     * html id 의 value 값 가져오기
     * @param {html id} tagId 
     * @returns 
     */
    jQuery.getValueById = function(tagId) {
        if (tagId != "") {
            return $("#" + tagId).val();
        }
        return null;
    };

    /**
     * 공통 팝업창 띄우기 = 서베이고
     */
    let _createCommonPopupBtnOpt = function (btnText, btnCallback) {
        let btnOpt = {};
        // btnText = 버튼 텍스트 / btnCallback = 버튼 클릭시 응답받을 콜백. 한번만 동작함.
        // btnText 가 없는 경우 해당 자리에 undefined 이나 null 을 입력.
        btnOpt.btnText = btnText;
        btnOpt.btnCallback = btnCallback;

        return btnOpt;
    };

    let _showCommonPopup = function (popupType, mentType, btnOkOpt, btnCancelOpt, btnMiddleOpt) {
        // commonPopup = 팝업 껍데기
        // commonPopupTitle = 팝업 타이틀
        // commonPopupContent = 팝업 내용
        // commonPopupOk = OK 버튼
        // commonPopupCancel = Cancel 버튼
        // commonPopupMiddle = 중간 가운데 버튼

        // popupType -> POPUP_TYPE_BTN_OK = 1 (Ok 버튼 1개), POPUP_TYPE_BTN_CANCEL_OK = 2 (Cancel, OK 버튼 2개), POPUP_TYPE_BTN_CANCEL_MIDDLE_OK = 3 (Cancel, Middle, Ok 버튼 3개);
        // mentType = is.ment 에 선언되어있는 타입을 입력.
        // btnOpt = is.createCommonPopupBtnOpt 으로 opt 생성하면 됩니다.
        // btnOpt 가 필요 없는 경우, 입력하지 않거나 해당 자리에 undefined 나 null 을 입력.

        let ment = _ment(mentType);
        let resultJsonObj = JSON.parse(ment);
        let title = resultJsonObj.title;
        let content = resultJsonObj.content;

        $(".commonPopup").find(".commonPopupTitle").text(title);
        $(".commonPopup").find(".commonPopupContent").html(content);

        if (btnOkOpt && btnOkOpt.btnText) {
            $(".commonPopupOk").text(btnOkOpt.btnText);
        }

        $(document).one("click", ".commonPopupOk", function () {
            if (btnOkOpt && btnOkOpt.btnCallback) {
                btnOkOpt.btnCallback();
            }

            _hideCommonPopup();
        });

        if (popupType === POPUP_TYPE_BTN_CANCEL_OK || popupType === POPUP_TYPE_BTN_CANCEL_MIDDLE_OK) {
            $(".commonPopupCancel").show();

            if (btnCancelOpt && btnCancelOpt.btnText) {
                $(".commonPopupCancel").text(btnCancelOpt.btnText);
            }

            $(document).one("click", ".commonPopupCancel", function () {
                if (btnCancelOpt && btnCancelOpt.btnCallback) {
                    btnCancelOpt.btnCallback();
                }

                _hideCommonPopup();
            });
        } else {
            $(".commonPopupCancel").hide();
        }

        if (popupType === POPUP_TYPE_BTN_CANCEL_MIDDLE_OK) {
            $(".commonPopupMiddle").show();

            if (btnMiddleOpt && btnMiddleOpt.btnText) {
                $(".commonPopupMiddle").text(btnMiddleOpt.btnText);
            }

            $(document).one("click", ".commonPopupMiddle", function () {
                if (btnMiddleOpt && btnMiddleOpt.btnCallback) {
                    btnMiddleOpt.btnCallback();
                }

                _hideCommonPopup();
            });
        }
        else{
            $(".commonPopupMiddle").hide();
        }

        if ($(".commonPopup").hasClass("commonPopupSurvey")) {
            $("body").addClass("scr_lock");
        }

        //$(".commonPopup").show();
        //DTWS-61
        $("#alertPopup").show();    
    };

    let _showCustomCommonPopup = function (popupType, title, content, btnOkOpt, btnCancelOpt, btnMiddleOpt) {
        // commonPopup = 팝업 껍데기
        // commonPopupTitle = 팝업 타이틀
        // commonPopupContent = 팝업 내용
        // commonPopupOk = OK 버튼
        // commonPopupCancel = Cancel 버튼
        // commonPopupMiddle = 중간 가운데 버튼

        // popupType -> POPUP_TYPE_BTN_OK = 1 (Ok 버튼 1개), POPUP_TYPE_BTN_CANCEL_OK = 2 (Cancel, OK 버튼 2개), POPUP_TYPE_BTN_CANCEL_MIDDLE_OK = 3 (Cancel, Middle, Ok 버튼 3개);
        // mentType = is.ment 에 선언되어있는 타입을 입력.
        // btnOpt = is.createCommonPopupBtnOpt 으로 opt 생성하면 됩니다.
        // btnOpt 가 필요 없는 경우, 입력하지 않거나 해당 자리에 undefined 나 null 을 입력.

        // let ment = _ment(mentType);
        // let resultJsonObj = JSON.parse(ment);
        // let title = resultJsonObj.title;
        // let content = resultJsonObj.content;

        $(".commonPopup").find(".commonPopupTitle").text(title);
        $(".commonPopup").find(".commonPopupContent").html(content);

        if (btnOkOpt && btnOkOpt.btnText) {
            $(".commonPopupOk").text(btnOkOpt.btnText);
        }

        $(document).one("click", ".commonPopupOk", function () {
            if (btnOkOpt && btnOkOpt.btnCallback) {
                btnOkOpt.btnCallback();
            }

            _hideCommonPopup();
        });

        if (popupType === POPUP_TYPE_BTN_CANCEL_OK || popupType === POPUP_TYPE_BTN_CANCEL_MIDDLE_OK) {
            $(".commonPopupCancel").show();

            if (btnCancelOpt && btnCancelOpt.btnText) {
                $(".commonPopupCancel").text(btnCancelOpt.btnText);
            }

            $(document).one("click", ".commonPopupCancel", function () {
                if (btnCancelOpt && btnCancelOpt.btnCallback) {
                    btnCancelOpt.btnCallback();
                }

                _hideCommonPopup();
            });
        } else {
            $(".commonPopupCancel").hide();
        }

        if (popupType === POPUP_TYPE_BTN_CANCEL_MIDDLE_OK) {
            $(".commonPopupMiddle").show();

            if (btnMiddleOpt && btnMiddleOpt.btnText) {
                $(".commonPopupMiddle").text(btnMiddleOpt.btnText);
            }

            $(document).one("click", ".commonPopupMiddle", function () {
                if (btnMiddleOpt && btnMiddleOpt.btnCallback) {
                    btnMiddleOpt.btnCallback();
                }

                _hideCommonPopup();
            });
        }
        else{
            $(".commonPopupMiddle").hide();
        }

        if ($(".commonPopup").hasClass("commonPopupSurvey")) {
            $("body").addClass("scr_lock");
        }

        $(".commonPopup").show();
    };

    let _hideCommonPopup = function () {

        $(document).off("click", ".commonPopupOk");
        $(document).off("click", ".commonPopupCancle");
        $(document).off("click", ".commonPopupMiddle");

        if ($(".commonPopup").hasClass("commonPopupSurvey")) {
            $("body").removeClass("scr_lock");
        }

        $(".commonPopup").hide();
    };

    /**
     * 공통에러 팝업창 뛰우기
     * @param {팝업 div id} popupDivId 
     * @param {에러 제목 영역 id} titleId 
     * @param {에러 내용 영역 id} contentsId 
     */
    jQuery.commonError = function(popupDivId, titleId, contentsId) {
        $("#" + popupDivId).show();

        var ment = _ment("commonError");
        var resultJsonObj = JSON.parse(ment);
        var title = resultJsonObj.title;
        var content = resultJsonObj.content;
        
        $("#" + titleId).html(title);
        $("#" + contentsId).html(content);       
    };

    jQuery.alertPopup = function(mentType) {
        $("#alertPopup").show();

        if (mentType !== undefined) {
            var ment = _ment(mentType);
            var resultJsonObj = JSON.parse(ment);
            var title = resultJsonObj.title;
            var content = resultJsonObj.content;


            //참여가능 시간이 아닐때 멘트
            if (mentType === "notPossibleTimeEvent") {
                if ($("#attendHourMisMessage").val() != "") {
                    content = $("#attendHourMisMessage").val();
                }
            }
            //위치 미매칭 멘트
            if (mentType === "errorEventLocation"){
                let locationMessageNotAttend = $("#locationMessageNotAttend").val();
                console.log(">>locationMessageNotAttend :: " + locationMessageNotAttend);
                if (locationMessageNotAttend != "") {
                    content = $("#locationMessageNotAttend").val();
                }
                //content += geoLocationAlertMent;
            }
            //위치 매칭 멘트
            if (mentType === "successAccessLocation") {
                title = "위치참여성공!";
                let locationMessageAttend = $("#locationMessageAttend").val();
                if (locationMessageAttend != "") {
                    content = locationMessageAttend;
                }
                //content += geoLocationAlertMent;
            }
            
            $("#alertPopupTitle").html(title);
            //$("#alertPopupContents").html(content + geoLocationAlertMent);       
            $("#alertPopupContents").html(content);       

        }
    };

    jQuery.noEventResultAlertPopup = function(mentType) {
        $("#noEventResultAlertPopup").show();

        if (mentType !== undefined) {
            var ment = is.ment(mentType);
            var resultJsonObj = JSON.parse(ment);
            var title = resultJsonObj.title;
            var content = resultJsonObj.content;

            $("#noEventResultAlertPopupTitle").html(title);
            $("#noEventResultAlertPopupContents").html(content);       

        }
    };

    jQuery.showElement = function(element) {
        if (element) {
            $(element).show();
        }
    };

    jQuery.hideElement = function(element, type) {
        if (element) {
            $(element).hide();
        }
    };

    jQuery.removeElement = function(element, type) {
        if (element) {
            $(element).remove();
        }
    };

    // $(document).on('click', '#alertPopupBtn', function(e) {
    //     $('#alertPopup').hide();
    // });

    $(document).on('click', '#noEventResultAlertPopupBtn', function() {
        history.back(-1);
    });

    //에러팝업 닫기 버튼
    $(document).on("click", "#errorModalConfirm", function() {
        $("#errorAlertPopup").hide();
    });

    const _historyBack = function () {
        history.back(-1);
    }

    const _windowClose = function() {
        window.close();
    }

    const _reload = function() {
        location.reload();
    }

    $(document).on("click", "#alertPopup2 .confirm", function() {
        $.hideElement("#alertPopup2");
    })

    // const _closeAlertPopup = function() {
    //     $(".commonPopup").hide();
    // }

    //임시비밀번호 발송 API
    // $.sendSmsTemporaryPassword = function(eventId, phoneNumber) {
    //     if (!phoneNumber) {
    //         $.alertPopup("confirmPhoneNumber");
    //         return;
    //     }

    //     if (phoneNumber) {

    //          //수령하기 api
    //         let param = {
    //             eventId: eventId,
    //             receiverPhoneNumber : phoneNumber
    //         };

    //         $.ajax({
    //             url: "/api/v1/web-event-front/sms/send-temporary-password",
    //             data: JSON.stringify(param),
    //             method: "POST",
    //             contentType: "application/json;charset=UTF-8"
    
    //         }).done(function(res) {
                
    //             if (res.resultCode === 200) {
    //                 var result = res.result;
    //                 if (result) {
    //                     let ment = '등록하신 ' + result.receiverPhoneNumber + '으로 당첨조회 임시비밀번호를 발송했습니다.'

    //                     $('#smsSendSuccessPopup .layer_popup p').html(ment);
    //                     $('#smsSendConfirmPopup').hide();
    //                     $('#smsSendSuccessPopup').show();
    //                 }
    //             } 
    
    //             if (res.resultCode !== 200) {
    //                 $.commonError("alertPopup", "alertPopupTitle", "alertPopupContents");
    //                 return;
    //             }
    //         }).fail(function (err) {
    //             console.log(err.resultMessage);
    //             $.commonError("alertPopup", "alertPopupTitle", "alertPopupContents");
    //         });
    //     }
    // };

    // jQuery.checkPasswordEvent = function(eventId) {
    //     const url = '/api/v1/web-event-front/check/password-event/' + eventId;

    //     $.get({
    //         url : url, 
    //         contentType : 'application/json; charset=utf-8'
    //     })
    //     .done(function(res, text, xhr) {
    //         if (xhr.status === 200) {
    //             if (res.resultCode === 200) {
    //                 let result = res.result;
    //                 console.log(result);
    //                 if (result) {
    //                     if (result.isPassword) {
    //                         $.showElement('#passwordLi');
    //                         alert(true);
    //                         return true;
    //                     } else {
    //                         return false;
    //                     }
    //                 }
    //             }
    //         }
    //         //통신에러일떄
    //         if (xhr.status > 204) {
    //             console.log("xhr.status >>> " + textStatus);
    //             $.commonError("errorAlertPopup", "errorAlertPopupTitle", "errorAlertPopupContent");
    //             return;
    //         }
    //     })
    //     .fail(function() {
    //         $.commonError("alertPopup", "alertPopupTitle", "alertPopupContents");
    //     })
    // }

    jQuery.initDatePicker = function (element) {
        //input을 datepicker로 선언
        $(element).datepicker({
            dateFormat: 'yymmdd' //달력 날짜 형태
            ,showOtherMonths: true //빈 공간에 현재월의 앞뒤월의 날짜를 표시
            ,showMonthAfterYear:true // 월- 년 순서가아닌 년도 - 월 순서
            ,changeYear: true //option값 년 선택 가능
            ,changeMonth: true //option값  월 선택 가능                
            //,showOn: "both" //button:버튼을 표시하고,버튼을 눌러야만 달력 표시 ^ both:버튼을 표시하고,버튼을 누르거나 input을 클릭하면 달력 표시  
            //,buttonImage: "http://jqueryui.com/resources/demos/datepicker/images/calendar.gif" //버튼 이미지 경로
            //,buttonImageOnly: true //버튼 이미지만 깔끔하게 보이게함
            //,buttonText: "선택" //버튼 호버 텍스트              
            ,yearSuffix: "년" //달력의 년도 부분 뒤 텍스트
            ,monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 텍스트
            ,monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 Tooltip
            ,dayNamesMin: ['일','월','화','수','목','금','토'] //달력의 요일 텍스트
            ,dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'] //달력의 요일 Tooltip
            ,minDate: "-5Y" //최소 선택일자(-1D:하루전, -1M:한달전, -1Y:일년전)
            ,maxDate: "+5y" //최대 선택일자(+1D:하루후, -1M:한달후, -1Y:일년후)  
        });                    

        //초기값을 오늘 날짜로 설정해줘야 합니다.
        $(element).datepicker('setDate', 'today'); //(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, -1M:한달후, -1Y:일년후) 
    }

    // $("li > .title").click(function(){
    //     if(!$(this).parent().hasClass('disable')){ // 비활성 li가 아닌경우 (인증번호 빌활성 케이스)
    //         $(this).parent().removeClass('error');
    //         $(this).parent().addClass('on'); // li에 on
    //         $(this).next().children(".contents_input")[0].focus();
    //         $(this).addClass('moved'); // title animation
    //     }
    // });

    // $(".contents_input").blur(function(){
    //     $(this).parent().parent().removeClass('on'); //li on 제거

    //     if($(this).val()){
    //         $(this).css('display', 'block');
    //         $(this).parent().children(".title").addClass("moved_fix"); // 애니메이션 없이 위로 고정된 title
    //     } else{
    //         $(this).parent().parent().children(".title").removeClass("moved");
    //         $(this).parent().parent().children(".title").removeClass("moved_fix");
    //     }
    // });

    let _putPvLog = function (params, always){
        if(!params){
            console.log("put log 실패");
            return;
        }

        $.ajax({
            url: "/api/v1/web-event-front/pv-log/save",
            data: JSON.stringify(params),
            method: "POST",
            contentType: "application/json;charset=UTF-8"

        }).done(function(res) {

            if (res.resultCode === 200) {
                console.log("put log : " + JSON.stringify(params));
            }
        }).fail(function (err) {
            console.log(err.resultMessage);
        }).always(always);
    };

    let _putPvLogPageView = function (num, pageId){
        _putPvLog(is.getPvLogParams(num, pageId));
    };

    let _getPvLogParams = function (num, pageId, order, code, type){
        const BR_CODE_OCB = "1",
            BR_CODE_SYRUP = "2",
            BR_CODE_WEB = "3",
            BR_CODE_QR = "4";

        const BROWSER_TYPE_ETC = "-1",
            BROWSER_TYPE_CHROME = "0",
            BROWSER_TYPE_SAFARI = "1",
            BROWSER_TYPE_SAMSUNG = "2",
            BROWSER_TYPE_NAVER = "3";

        const params = {};
        const qs = is.parseQuery();

        if (qs.eventId) {
            params.eventId = qs.eventId;
        } else {
            let href = location.href;
            if (href.indexOf("give-away.html") >= 0) {
                let parseEventWinningData = JSON.parse(sessionStorage.getItem("skWebArJson"));
                if (parseEventWinningData && parseEventWinningData.eventId) {
                    params.eventId = parseEventWinningData.eventId;
                } else {
                    return;
                }
            } else if (href.indexOf("nft-repository.html") >= 0 || href.indexOf("nft-detail.html") > 0) {
                let eventSessionData = JSON.parse(sessionStorage.getItem('eventSessionData'));
                if (eventSessionData && eventSessionData.eventId) {
                    params.eventId = eventSessionData.eventId;
                } else {
                    return;
                }
            }
            else {
                return;
            }
        }


        let pvLogType = "";

        let tempPageId = pageId.split("/");
        $.each(tempPageId, function (idex, item) {
            if(item) {
                if (pvLogType) {
                    pvLogType = pvLogType + "_";
                }
                pvLogType = pvLogType + item.toUpperCase();
            }
        });

        pvLogType = pvLogType + "_" + num;

        params.pvLogType = pvLogType;
        params.order = order;
        params.code = code;
        params.type = type;

        if(num === "0" && pageId === "/main"){

            if(qs.trCd){        // 진입 채널 기준 (trCd : QR)
                params.br = BR_CODE_QR;
            }
            else {
                params.br = BR_CODE_WEB;
            }

            console.log(navigator.sayswho); // outputs: `Chrome 62`

            let browserInfo = navigator.sayswho.split(' ');
            let browserType;
            if (browserInfo && browserInfo.length > 0) {
                browserType = browserInfo[0].toLowerCase();
            }

            if(browserInfo && browserInfo.length > 1){
                params.browserVersion = browserInfo[1];
            }

            // -1 = 기타, 0 = chrome, 1 = safari, 2 = samsung_internet, 3 = naver_br
            switch (browserType){
                case "chrome" :
                    params.type = BROWSER_TYPE_CHROME;
                    break;
                case "safari" :
                    params.type = BROWSER_TYPE_SAFARI;
                    break;
                case "samsumgbrowser" :
                    params.type = BROWSER_TYPE_SAMSUNG;
                    break;
                case "whale" :
                    params.type = BROWSER_TYPE_NAVER;
                    break;
                default :
                    params.type = BROWSER_TYPE_ETC;
                    break;
            }
        }

        return params;
    }

    navigator.sayswho = (function () {
        var ua = navigator.userAgent;
        var tem;
        // var M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        var M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?(\S*)/i) || [];
        if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            return 'IE ' + (tem[1] || '');
        }
        if (M[1] === 'Chrome') {
            // tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
            tem = ua.match(/\b(OPR|Edge|Edg|Whale|SamsumgBrowser)\/(\S*)/);
            if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
        }
        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];

        if (M[0] != 'Safari') {
            // if((tem= ua.match(/version\/(\S*)/i))!= null) M.splice(1, 1, tem[1]);
            if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
        }

        return M.join(' ');
    })();

    $(document).on("click", ".putPvLogBtn", function () {
        const $this = $(this);
        const params = _getPvLogParams($this.data("logNum"), $this.data("logPageId"), $this.data("logOrder"), $this.data("logCode"), $this.data("logType"));

        _putPvLog(params);
    });

    //SMS인증 팝업 닫기 버튼
    $(document).on("click", "#smsAuthPopupSection .pop_closed", function () {
        const $this = $(this);
        if (confirm("SMS인증을 그만하시겠습니까?")) {
            $this.parent().parent().parent().parent().hide();
        }
    });

    //SMS인증 > 전화번호 입력 할때 이벤트 
    $("#smsAuthPopupSection #mdn").on("propertychange change paste input", function(e) {
        const $this = $(this);
        //console.log($this.val().length);
        if ($this.val().length == 11) {
            $("#smsAuthPopupSection .btn_cert").addClass("active");
        } else {
            $("#smsAuthPopupSection .btn_cert").removeClass("active");
        }
    });

    //SMS인증 > 전화번호 인증 번호 입력 할때 이벤트 
    $("#smsAuthPopupSection #checkPhoneNumber").on("propertychange change paste input", function(e) {
        const $this = $(this);
        //console.log($this.val().length);
        if ($this.val().length == 6) {
            $("#confirmSmsCodeBtn").attr("disabled", false);
        } else {
            $("#confirmSmsCodeBtn").attr("disabled", true);
        }
    });
    
    

    //SMS 인증 시간 보여주기 ( ex : $.viewSmsAuthTimer($("#smsLimitMinute"), 180) )
    let timer = null;
    let isRunning = false;
    let _viewSmsAuthTimer = function(display, leftSec) {
        // 남은 시간
        // 이미 타이머가 작동중이면 중지
        if (isRunning){
            clearInterval(timer);
            display.html("");
            _startTimer(leftSec, display);
        } else {
            _startTimer(leftSec, display);
        }
    };

    let _startTimer = function (count, display) {
        var minutes, seconds;
        timer = setInterval(function () {
            minutes = parseInt(count / 60, 10);
            seconds = parseInt(count % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.html(minutes + ":" + seconds);

            // 타이머 끝
            if (--count < 0) {
                clearInterval(timer);
                console.log("시간초과");

                // $.innerHtmlById("smsAuthMent", "인증시간이 만료하였습니다.");
                // $('.btn_chk').attr("disabled","disabled");
                $("#smsAuthErroCountMent").removeClass("active");
                $("#smsAuthPopupSection .tip_txt_box").addClass("active");
                $("#smsAuthPopupSection .tip_txt_box p").html("입력 시간이 초과되었어요.<br>인증번호를 다시 요청해 주세요");
                isRunning = false;
            }
        }, 1000);
        isRunning = true;
    };

    /**
     * SMS 인증 팝업 기능
     * @param {*} eventId : 특정 이벤트 아이디
     * @param {*} phoneNumber : 받는 사람의 핸드폰 번호
     * @param {*} authMenuType : is.smsMenuType
     * @returns authCode : SMS 인증이 성공하면 서버에서 유니크한 코드 값을 reponse
     */
    let _sendSmsAuth = function (eventId, phoneNumber, authMenuType) {
        let authCode = "";

        if (phoneNumber) {
            if (isNaN(phoneNumber) || !_isPhoneNumber(phoneNumber)) {
                //_showCommonPopup(1, "validatePhoneNumber");
                alert("휴대폰 번호는 숫자만 입력해주세요.");
                return;
            }
        } else {
            alert("전화번호가 입력되지 않았습니다. 다시 입력해 주세요.");
            return;
        }
        
        //sms인증 팝업 시 초기화
        authCnt = 0;
        $.innerValueById("checkPhoneNumber", "");
        $("#smsAuthErroCountMent").removeClass("active").text("");


        if (eventId && phoneNumber && authMenuType) {
            const param = {
                eventId: eventId,
                authMenuType: authMenuType,
                phoneNumber: phoneNumber
            };

            $.ajax({
                url: "/api/v1/web-event-front/sms-auth/send",
                data: JSON.stringify(param),
                method: "POST",
                async: false,
                contentType: "application/json;charset=UTF-8"

            }).done(function(res, textStatus, xhr) {
                //통신 성공일때
                if (xhr.status === 200) {
                    //결과 코드 값이 정상일때
                    if (res.resultCode === 200) {
                        $("#sendSmsBtn").html("다시요청").removeClass("active");
                        $("#smsAuthPopupSection #smsAuthRow").removeClass("inactive");
                        //타이머 보여주기
                        is.viewSmsAuthTimer($("#smsLimitMinute"), 180);
                        
                        const result = res.result;
                        authCode = result.smsAuthCode;
                    }
                    //결과 코드 값이 정상이 아닐때
                    if (res.resultCode !== 200) {
                        //SMS 인증 발송 개수 초과 (3회)
                        if (res.resultCode === 858) {
                            $("#smsAuthErroCountMent").removeClass("active");
                            $("#smsAuthPopupSection .tip_txt_box").addClass("active");
                            $("#smsAuthPopupSection .tip_txt_box p").html("인증번호 요청은 하루 최대 3회 가능해요<br>내일 다시 시도해 주세요.");
                            $.innerHtmlById("confirmSmsCodeBtn", "확인");
                            $("#confirmSmsCodeBtn").attr("disabled", false);
                            return;
                        }
                    }
                }
            }).fail(function (err) {
                console.log(err.resultMessage);
                $.hideElement("#smsAuthPopupSection");
                _showCommonPopup(1, "commonError");
            });
        }
        return authCode;
    }

    //SMS 발송 코드 인증하기
    let authCnt = 0;
    let _authSmsCode = function (smsAuthCode, smsCode) {
        let isAuth = false;

        if (smsAuthCode && smsCode) {

            let param = {
                smsAuthCode: smsAuthCode,
                authCode: smsCode
            };

            $.ajax({
                url: "/api/v1/web-event-front/sms-code/auth",
                data: JSON.stringify(param),
                method: "POST",
                async: false,
                contentType: "application/json;charset=UTF-8"

            }).done(function(res, textStatus, xhr) {
                //통신이 정상일때
                if (xhr.status === 200) {
                    //결과값이 정상일때
                    if (res.resultCode === 200) {
                        //let result = res.result;
                        clearInterval(timer);
                        //isRunning = false;
                        
                        //true 값 return
                        isAuth = true;
                    }
                    //결과값이 정상이 아닐때
                    if (res.resultCode !== 200) {
                        //인증번호가 틀렸을때 3회제한
                        if (res.resultCode === 850) {
                            if (authCnt <= 5) {
                                if (authCnt === 4) {
                                    clearInterval(timer);

                                    _showCommonPopup(1, "failAuthSms5");
                                    $.hideElement("#smsAuthPopupSection");
                                    return;
                                }
                                authCnt++;
                                $("#smsAuthErroCountMent").addClass("active");
                                $.innerHtmlById("smsAuthErroCountMent", "인증번호가 일치하지 않아요 (" + authCnt + "/5)");
                                return false;
                            }
                            
                            
                        }
                        //인증시간 만료 (3분) 초과
                        if (res.resultCode === 851) {
                            clearInterval(timer);
                            //isRunning = false;
                            //$.innerHtmlById("smsAuthMent", "인증 번호 유효 시간 (3분)이 지났습니다.");
                            //alert("인증 번호 유효 시간 (3분)이 지났습니다.")
                            $("#smsAuthErroCountMent").removeClass("active");
                            $("#smsAuthPopupSection .tip_txt_box p").addClass("active").html("입력 시간이 초과되었어요.<br>인증번호를 다시 요청해 주세요");
                            //_showCommonPopup(1, "failAuthSmsMinutLimit");
                            return false;
                        }
                    }
                }
            }).fail(function (err) {
                console.log(err.resultMessage);
                $.hideElement("#smsAuthPopupSection");
                _showCommonPopup(1, "commonError");
            });
        }
        return isAuth;
    }

    let _isPhoneNumber = function(phoneNumber) {
        let regPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
        return regPhone.test(phoneNumber);
    }

    let _getEventBaseInfo = function(eventId) {
        let resultObj = null;

        const url = "/api/v1/web-event-front/base-info/" + eventId;

        $.get({
            url : url,
            contentType : "application/json; charset=utf-8",
            async: false
        })
        .done(function(res, text, xhr) {
            if (xhr.status === 200) {
                if (res.resultCode === 200) {
                    resultObj = res.result;
                }
            }
            //통신에러일떄
            if (xhr.status > 204) {
                console.log("xhr.status >>> " + textStatus);
                _showCommonPopup(1, "commonError");
                return false;
            }
        })
        .fail(function() {
            _showCommonPopup(1, "commonError");
        })
        return resultObj;
    }

    const _httpHeder = {};
    _httpHeder.APPLICATION_JSON_UTF8 = "application/json; charset=utf-8";


    //input type 이벤트
    // $("li > .title").click(function(){
    //     if(!$(this).parent().hasClass('disable')){ // 비활성 li가 아닌경우 (인증번호 빌활성 케이스)
    //         $(this).parent().removeClass('error');
    //         $(this).parent().addClass('on'); // li에 on
    //         $(this).next().children(".contents_input")[0].focus();
    //         $(this).addClass('moved'); // title animation
    //     }
    // });

    // $(".contents_input").blur(function(){
    //     $(this).parent().parent().removeClass('on'); //li on 제거

    //     if($(this).val()){
    //         $(this).css('display', 'block');
    //         $(this).parent().children(".title").addClass("moved_fix"); // 애니메이션 없이 위로 고정된 title
    //     } else{
    //         $(this).parent().parent().children(".title").removeClass("moved");
    //         $(this).parent().parent().children(".title").removeClass("moved_fix");
    //     }
    // });

    /**
     * 1. http get 통신 함수
     * 2. apiUrl : 통신할 url
     * 3. callback : 결과값을 콜백받는 함수
     * 4. return : {resultCode:resultCode, result:Object, message:messageText}
     **/
    const _getFetch = function(apiUrl, callback) {
        //console.log("get call =============> ", apiUrl);

        fetch(apiUrl)
            .then((response) => {
                if (response.ok) {
                    //console.log("success");
                    return response.json();
                } else {
                    console.log("error response >> " + response.status);
                    const resultCode = {resultCode:response.status};
                    return resultCode;
                }
            })
            .then(result => {
                //console.log(typeof callback);
                callback(result);
            })
            .catch(error => {
                console.log(error);
                _showCommonPopup(1, "commonError");
            })
    }

    /**
     * 1. http post 통신 함수
     * 2. apiUrl : 통신할 url
     * 3. callback : 결과값을 콜백받는 함수
     * 4. return : {resultCode:resultCode, result:Object, message:messageText}
     **/
    const _postFetch = function(apiUrl, params, callback) {
        //console.log("post call =============>", apiUrl);

        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-type":_httpHeder.APPLICATION_JSON_UTF8
            },
            body: JSON.stringify(params)
        })
        .then((response) => {
            if (response.ok) {
                //console.log("success");
                return response.json();
            } else {
                console.log("error response >> " + response);
                const resultCode = {resultCode:response.status};
                return resultCode;
            }
        })
        .then(result => {
            //console.log("isFunction? " + typeof callback );
            callback(result);
        })
        .catch(error => {
            console.log(error);
            _showCommonPopup(1, "commonError");
        })
    }

    const _postFetchLoading = function(apiUrl, params, $loading, callback) {
        //console.log("post loading call =============>", apiUrl);
        $loading.show();

        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-type":_httpHeder.APPLICATION_JSON_UTF8
            },
            body: JSON.stringify(params)
        })
        .then((response) => {
            $loading.hide();
            
            if (response.ok) {
                //console.log("success");
                return response.json();
            } else {
                console.log("error response >> " + response);
                const resultCode = {resultCode:response.status};
                return resultCode;
            }
        })
        .then(result => {
            //console.log("isFunction? " + typeof callback );
            callback(result);
        })
        .catch(error => {
            console.log(error);
            _showCommonPopup(1, "commonError");
        })
    }

    //이벤트 종류 정의 enum
    const _eventType = {
         AR      : "AR"
        ,SURVEY  : "SURVEY"
    };
    Object.freeze(_eventType);

    //sms 인증 메뉴 종류 정의 enum
    const _smsMenuType = {
         MAIN_ATTEND    : "MAIN_ATTEND"
        ,WINNING_SEARCH : "WINNING_SEARCH"
    }
    Object.freeze(_smsMenuType);

    //
    /**
     * 핸드폰 인증 팝업하기 view 함수 
     * @param {*} smsMenuType : _smsMenuType 함수에 값 정의
     * @param {*} eventType   : _eventType 함수에 값 정의
     * @returns 
     */
    const _smsPopup = function(smsMenuType, eventType) {
        console.log("SMS인증 팝업 시작");
        if (smsMenuType === _smsMenuType.MAIN_ATTEND) {
            if (eventType === _eventType.SURVEY) {
                $.innerHtmlById("l_smsPopupTitme", "<h1>설문 참여를 위해<br>휴대폰 본인인증이 필요해요.</h1>");
            }
            if (eventType === _eventType.AR) {
                $.innerHtmlById("l_smsPopupTitme", "<h1>AR 참여를 위해<br>휴대폰 본인인증이 필요해요.</h1>");
            }
        } else if (smsMenuType === _smsMenuType.WINNING_SEARCH) {
            $.innerHtmlById("l_smsPopupTitme", "<h1>당첨정보 조회를 위해<br>휴대폰 본인인증이 필요해요.</h1>");
        }
        
        $.innerValueById("mdn", "");
        $.innerValueById("checkPhoneNumber", "");
        $.innerHtmlById("smsLimitMinute", "");
        $.innerHtmlById("smsAuthErroCountMent", "");
        $("#smsAuthPopupSection .tip_txt_box p").html("");
        $("#sendSmsBtn").html("인증요청");
        
        const confirmSmsCodeBtnDisabled = $("#confirmSmsCodeBtn").attr("disabled");
        //confirmSmsCodeBtn 값이 disabled 가 되어있이 않으면 disabled 값으로 초기화
        if (!confirmSmsCodeBtnDisabled) {
            $("#confirmSmsCodeBtn").attr("disabled", true);
        }
        
        $("#confirmSmsCodeBtn").html("본인인증 완료");

        $("#smsAuthRow").addClass("inactive");
        $.showElement("#smsAuthPopupSection");

        return false;
    }

    const _closeSmsPopup = function() {
        $.hideElement("#smsAuthPopupSection");
    }

    const _isEqual = function(val1, val2) {
        if (typeof (val1) === 'Number') {
            return (Number(val1) === Number(val2))
        } 
        if (typeof (val1) === 'string') {
            return (val1 === val2);
        }
    }

    Handlebars.registerHelper({
        indexToOrderNo: function (index) {
            return _indexToOrderNo(index);
        }
    });

    Handlebars.registerHelper({
        indexToOrderNoId: function (index) {
            return _indexToOrderNoId(index);
        }
    });

    Handlebars.registerHelper("ifvalue", function (conditional, options) {
        if (options.hash.value === conditional) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    Handlebars.registerHelper("iflarger", function (conditional, options) {
        if (options.hash.value < conditional) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    Handlebars.registerHelper("eachRange", function(list, first, last, options) {
        var ret = "";

        for(var i = first; i < last; i++) {
            ret = ret + options.fn(list[i]);
        }

        return ret;
    });

    Handlebars.registerHelper("gte", function(a, b) {
        return (a >= b);
    });

    Handlebars.registerHelper("lte", function(a, b) {
        return (a <= b);
    });

    Handlebars.registerHelper("replaceDateType", function(date) {
        if (date) {
            return convertDate = date.replace(/-/gi, '.');
        }
        return "";
    });

    Handlebars.registerHelper("isNotNull", function(object) {
        if (object) {
            if (object.length > 0 || object) {
                return true;
            } else if (object.length === 0) {
                return false;
            }
        } else {
            return false;
        }
        return false;
    });

    is.indexToOrderNo = _indexToOrderNo;
    is.webEventGetTraceNo = _webEventGetTraceNo;
    is.webEventRequestParams = _webEventRequestParams;
    is.ment = _ment;
    is.getEventStatusDefine = _getEventStatusDefine;
    is.putPvLogPageView = _putPvLogPageView;
    is.putPvLog = _putPvLog;
    is.getPvLogParams = _getPvLogParams;
    is.viewSmsAuthTimer = _viewSmsAuthTimer;
    is.startTimer = _startTimer;
    is.sendSmsAuth = _sendSmsAuth;
    is.authSmsCode = _authSmsCode;
    is.isPhoneNumber = _isPhoneNumber;
    is.getEventBaseInfo = _getEventBaseInfo;
    is.indexToOrderNoId = _indexToOrderNoId;
    is.getHttpHeader = _httpHeder;
    is.getFetch = _getFetch;
    is.postFetch = _postFetch;
    is.postFetchLoading = _postFetchLoading
    is.eventType = _eventType;
    is.smsMenuType = _smsMenuType;
    is.postFetchLoading = _postFetchLoading;
    is.createCommonPopupBtnOpt = _createCommonPopupBtnOpt;
    is.showCommonPopup = _showCommonPopup;
    is.hideCommonPopup = _hideCommonPopup;
    is.historyBack = _historyBack;
    is.windowClose = _windowClose;
    is.reload = _reload;
    is.smsPopup = _smsPopup;
    is.closeSmsPopup = _closeSmsPopup;
    is.isEqual = _isEqual;
    is.timer = timer;
}( jQuery, window, document ));