/*
 * ADReport Mobile
 * common javascript file
 * License: SK planet wholly owned
 */
(function ($, window, document, undefined) {

    let qs = is.parseQuery();
    const eventId = qs.eventId;
    const winningType = qs.winningType;
    //비밀번호를 받는 이벤트인지 확인
    //let isPasswordEvent;
    let isPhoneNumber = false,
        isAttendCode = false,
        isSmsSend = false;

    let smsAuthCode = "";

    let logCode;

    //검색 버튼 이벤트
    $(document).on("click", "#nftHistorySearchBtn", function() {

        is.putPvLog(is.getPvLogParams("1", "/main/locker", undefined, logCode));

        let phoneNumber = is.getValueById("phoneNumber");
        let attendCode = "";
        
        //전화번호일때
        if (isPhoneNumber && !isSmsSend && !isAttendCode) {
            //전화번호 입력확인
            if (!phoneNumber) {
                is.showCommonPopup(1, "confirmPhoneNumber");
                return false;
            }    
        }
        //참여코드일때
        if (isAttendCode) {
            //참여코드 입력확인
            if (!phoneNumber) {
                is.showCommonPopup(1, "confirmAttendCode");
                return false;
            }
            if (isAttendCode) {
                attendCode = is.getValueById("phoneNumber");
                phoneNumber = "";
            }
        }
            
        //문자발송 해야 하는 이벤트
        if (isSmsSend) {
            is.smsPopup(is.smsMenuType.WINNING_SEARCH, null);
        }
        //문자발송을 하지 않는 이벤트
        if (!isSmsSend) {
            _searchNftHistory(eventId, phoneNumber, attendCode);  
            return false;
        }
    });

    $(document).on("click", "#alertPopupBtn", function() {
       $.hideElement("#alertPopup");
    });

    //SMS 인증 버튼
    $(document).on("click", "#sendSmsBtn", function () {
        const mdn = is.getValueById("mdn");
        //인증번호 발송
        smsAuthCode = is.sendSmsAuth(eventId, mdn, is.smsMenuType.WINNING_SEARCH);
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
            let mdn = is.getValueById("mdn");
            _searchNftHistory(eventId, mdn, "");
            return false;
        }
    });
    
    //임시비밀번호 전송 버튼
    // $(document).on("click", "#smsSendConfirmPopup .btn .confirm", function() {
    //     let phoneNumber = is.getValueById("phoneNumber");
    //     $.sendSmsTemporaryPassword(eventId, phoneNumber);
    // });

    //임시비밀번호 전송완료 후 팝업 > 확인, 취소버튼
    // $(document).on("click", "#smsSendSuccessPopup .btn .grey, .confirm, #smsSendConfirmPopup .btn .grey", function() {
    //     $(this).parent().parent().parent().hide();
    // });

    //sms인증하기 버튼 클릭
    $(document).on("click", "#authSmsBtn", function() {
        const smsCode = is.getValueById("smsCode");
        const mdn     = is.getValueById("mdn");

        if (!smsCode) {
            alert("SMS인증 에러입니다. 관리자에게 문의하세요.");
            return false;
        }
        //sms인증하기 api 콜
        const isAuth = is.authSmsCode(smsAuthCode, smsCode);

        //api 결과가 true 일때
        if (isAuth) {
            //당첨결과 api
            _searchNftHistory(eventId, mdn, "");
            return false;
        }
    });
    
    //검색 API
    let _searchNftHistory = function(eventId, phoneNumber, attendCode) {
        if (isPhoneNumber) {
            if (!phoneNumber) {
                is.showCommonPopup(1, "confirmPhoneNumber");
                return false;
            }
        }
        
        const url = "/api/v1/web-event-front/winning/search";
        const reqParam = {
            eventId : eventId,
            phoneNumber : phoneNumber,
            attendCode : attendCode
        };

        $.post({
            url : url, 
            data : JSON.stringify(reqParam), 
            contentType : "application/json; charset=utf-8"
        })
        .done(function(res, text, xhr) {
            if (isSmsSend) {
                is.closeSmsPopup();
            }
            if (xhr.status <= 204) {
                if (res.resultCode === 200) {
                    let result = res.result;
                    
                    if (result) {
                        const nftWinningIncludeYn = result.nftWinningIncludeYn;
                        const nftCouponWinningIncludeYn = result.nftCouponWinningIncludeYn;
                        //NFT 목록 화면으로 이동
                        if (is.isEqual(nftWinningIncludeYn, "Y") || is.isEqual(nftCouponWinningIncludeYn, "Y")) {
                            const eventSessionData = {
                                eventId: eventId,
                                phoneNumber : isSmsSend ? is.getValueById("mdn") : is.getValueById("phoneNumber"),   //sms인증이면 sms인증팝업 영역의 전화번호 영역의 값을 가져오고, sms인증이 아닌 기본 검색이면 기본영역의 전화번호 영역의 값을 가져온다.
                                isPhoneNumber : isPhoneNumber,
                                isAttendCode : isAttendCode,
                                attendCode : isAttendCode ? is.getValueById("phoneNumber") : "",
                                winningType : winningType
                            };
                            sessionStorage.setItem("eventSessionData", JSON.stringify(eventSessionData));

                            location.href = "nft-repository.html";
                        }

                        if (is.isEqual(winningType, "NFT")) {
                            if (is.isEqual(nftWinningIncludeYn, "N")) {
                                is.showCommonPopup(1, "noNftWinningHistory");
                            } 
                        }
                        if (is.isEqual(winningType, "NFTCP")) {
                            if (is.isEqual(nftCouponWinningIncludeYn, "N")) {
                                is.showCommonPopup(1, "noCouponWinningHistory");
                            } 
                        }
                        
                    }
                }
                //당첨목록이 없을때
                if (res.resultCode === 817) {
                    is.showCommonPopup(1, "noNftWinningHistory");
                }
                //비밀번호 SMS 발송 팝업
                // if (res.resultCode === 810) {
                //     $.showElement("#smsSendConfirmPopup");
                //     //$('#smsSendConfirmPopup').show();
                // }
            }
            //통신에러일떄
            if (xhr.status > 204) {
                is.showCommonPopup(1, "commonError");
                return false;
            }
        })
        .fail(function() {
            is.showCommonPopup(1, "commonError");
        });
    };

   
    // let _checkPasswordEvent = function(eventId) {
    //     const url = '/api/v1/web-event-front/check/password-event/' + eventId;
    //
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
    //                         isPasswordEvent = true;
    //                         $.showElement('#passwordLi');
    //
    //                     } else {
    //                         isPasswordEvent = false;
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

    $(document).ready(function() {
        if (is.isEqual(winningType, "NFT")) {
            logCode = "0";
        } else if (is.isEqual(winningType, "NFTCP")) {
            logCode = "1";
        }
        is.putPvLog(is.getPvLogParams("0", "/main/locker", undefined, logCode));

        const eventInfo = is.getEventBaseInfo(eventId);
        if (eventInfo) {
            //NFT, 쿠폰 종류에 따른 문구 변경 처리
            //NFT 일때
            if (is.isEqual(winningType, "NFT")) {
                let titleSub = "";
                if (is.isEqual(eventInfo.eventType, is.eventType.AR)) {
                    titleSub = "Play AR NFT";
                }
                if (is.isEqual(eventInfo.eventType, is.eventType.SURVEY)) {
                    titleSub = "서베이고 NFT";
                }

                $.innerText(".win_title_sub", titleSub);
                $.innerText("#productType", "NFT를");

            //쿠폰일때
            } else if (is.isEqual(winningType, "NFTCP")) {
                let titleSub = "";
                if ( is.isEqual(eventInfo.eventType, is.eventType.AR) ) {
                    titleSub = "Play AR 쿠폰";
                }
                if ( is.isEqual(eventInfo.eventType, is.eventType.SURVEY) ) {
                    titleSub = "서베이고 쿠폰";
                }

                $.innerText(".win_title_sub", titleSub);
                $.innerText("#productType", "쿠폰을");
            }

            let winningSearchType = eventInfo.winningSearchType;
            let smsAuthUseYn  = eventInfo.smsAuthUseYn;
            //참여코드
            if ( is.isEqual(winningSearchType, "ATTEND") ) {
                isAttendCode = true;
                
                $.showElement("#phoneNumberLi");
                $.innerText("#searchTypeMent", "참여코드");
                $.innerText("#nftHistorySearchBtn", "조회하기");
            }
            //전화번호
            if (is.isEqual(winningSearchType, "MDN") || !winningSearchType) {
                isPhoneNumber = true;
                $.innerText("#searchTypeMent", "전화번호");
                //sms 인증 사용함 일때
                if (is.isEqual(smsAuthUseYn, "Y")) {
                    isSmsSend = true;
                    $.innerText("#nftHistorySearchBtn", "인증하기");
                }
                //sms 인증 사용안할때
                if (is.isEqual(smsAuthUseYn, "N")) {
                    $.showElement("#phoneNumberLi");
                    $.innerText("#nftHistorySearchBtn", "조회하기");
                }
            }
        }


        //_checkPasswordEvent(eventId);
    });

    //input type 이벤트
    $("li > .title").click(function(){
        if(!$(this).parent().hasClass('disable')){ // 비활성 li가 아닌경우 (인증번호 빌활성 케이스)
            $(this).parent().removeClass('error');
            $(this).parent().addClass('on'); // li에 on
            $(this).next().children(".contents_input")[0].focus();
            $(this).addClass('moved'); // title animation
        }
    });

    $(".contents_input").blur(function(){
        $(this).parent().parent().removeClass('on'); //li on 제거

        if($(this).val()){
            $(this).css('display', 'block');
            $(this).parent().children(".title").addClass("moved_fix"); // 애니메이션 없이 위로 고정된 title
        } else{
            $(this).parent().parent().children(".title").removeClass("moved");
            $(this).parent().parent().children(".title").removeClass("moved_fix");
        }
    });
   
}(jQuery, window, document));
