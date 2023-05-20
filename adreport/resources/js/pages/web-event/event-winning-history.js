/*
 * ADReport Mobile
 * common javascript file
 * License: SK planet wholly owned
 */
(function ($, window, document, undefined) {
    
    let searchResultTemplate = Handlebars.compile($("#searchResultTemplate").html());

    let qs = is.parseQuery();
    const eventId = qs.eventId;
    
    let isPhoneNumber = false   //당첨조회 검색 영역 '전화번호'인지 여부
        ,isAttendCode = false   //당첨조회 검색 영역 '참여코드'인지 여부
        ,isSmsSend = false;     // sms발송을 해야 하는지 여부

    let smsAuthCode = "";

    //당첨이력 확인 버튼
    $(document).on("click", ".event_btn", function () {
        $("#winningHistoryPopupSection").show();

    });

    $(document).on("click", "#cancelWinningPassword", function () {
        $("#winningPasswordSection").hide();
        $("#isPasswordInput").val("false");
    });

    //당첨내역보기 버튼
    $(document).on("click", "#searchWinningBtn", function () {
        let phoneNumber = $.getValueById("phoneNumber");
        let attendCode  = "";
        let isCloseBtn = $(this).attr("data-is-close");
        
        if (isCloseBtn === "true") {
            //TODO 닫기 버튼 이벤트
            alert("sms발송 팝업 닫기");
            return;
        }

        //전화번호 입력확인
        if (!phoneNumber && !isSmsSend && !isAttendCode) {
            is.showCommonPopup(1, "confirmPhoneNumber");
            return;
        }
        if (isAttendCode) {
            //참여코드 입력확인
            if (!phoneNumber) {
                is.showCommonPopup(1, "confirmAttendCode");
                return false;
            }
            if (isAttendCode) {
                phoneNumber = "";
                attendCode = $.getValueById("phoneNumber");
            }
        }
        
        
        //문자발송 해야 하는 이벤트
        if (isSmsSend) {
            is.smsPopup(is.smsMenuType.WINNING_SEARCH, null);
        }
        //문자발송을 하지 않는 이벤트
        if (!isSmsSend) {
            _searchWinning(eventId, phoneNumber, attendCode);
            return false;
        }
    });

    //SMS 인증 버튼
    $(document).on("click", "#sendSmsBtn", function () {
        const mdn = is.getValueById("mdn");
        //인증번호 발송
        smsAuthCode = is.sendSmsAuth(eventId, mdn, is.smsMenuType.WINNING_SEARCH);
    });

    //sms인증하기 버튼 클릭
    $("#confirmSmsCodeBtn").click(function() {
        const $this = $(this);
        const btnHtml = $this.html();
        if (btnHtml === "확인") {
            $.hideElement("#smsAuthPopupSection");
            return;
        }

        let smsCode = is.getValueById("checkPhoneNumber");
        if (!smsCode) {
            alert("인증번호를 입력하세요.");
            return false;
        }
        //sms인증하기 api 콜
        let isAuth = is.authSmsCode(smsAuthCode, smsCode);

        //api 결과가 true 일때
        if (isAuth) {
            const mdn = is.getValueById("mdn");
            //당첨결과 api
            _searchWinning(eventId, mdn, "");
            return false;
        }
    });

    let _searchWinning = function (eventId, phoneNumber, attendCode) {

        let param = {
            eventId : eventId,
            phoneNumber : phoneNumber,
            attendCode : attendCode
        };

        $.ajax({
            url: "/api/v1/web-event-front/winning/search",
            data: JSON.stringify(param),
            method: "POST",
            async: false,
            contentType: "application/json;charset=UTF-8"
        }).done(function(res, text, xhr) {
            if (isSmsSend) {
                is.closeSmsPopup();
            }

            if (xhr.status <= 204) {
                let resultCode = res.resultCode;
                //정상조회일때
                if (resultCode === 200) {
                    let result = res.result;
                    //console.log("result >>" + JSON.stringify(result));

                    $("#winningPasswordYn").val(result.winningPasswordYn);

                    $("#winningPasswordSection").hide();
                    //당첨이력이 없을때
                    if (!result.userWinningInfoResDtoList || result.userWinningInfoResDtoList.length == 0) {
                        //$("#isPasswordInput").val("false");
                        $("#noDataDiv").show();
                        $("#dataDiv").hide();

                        window.scrollTo(0,document.body.scrollHeight);
                        return;
                    }
                    //당첨이력이 있을때
                    if (result.userWinningInfoResDtoList) {
                        $("#noDataDiv").hide();
                        $("#dataUl").remove();

                        $("#dataDiv").show();
                        $("#dataDiv").append(searchResultTemplate(result.userWinningInfoResDtoList));

                        window.scrollTo(0,document.body.scrollHeight);
                    }

                    window.scrollTo(0,document.body.scrollHeight);

                }
                //비밀번호 에러일때
                // if (resultCode === 810) {
                //     $.showElement("#smsSendConfirmPopup");
                //     return;
                // }
                // else if (resultCode === 811) {
                //     //비밀번호가 존재할때
                //     $("#winningPasswordSection").show();
                //     $("#winningPasswod").val('');
                //     $("#isPasswordInput").val("true");
                // }
            }
            //에러 팝업
            if (xhr.status !== 200) {
                is.showCommonPopup(1, "commonError");
                return;
            }
        })
        .fail(function (err) {
            console.log(err.resultMessage);
            is.showCommonPopup(1, "commonError");
        });
    };

    //수령확인 버튼
    $(document).on("click", ".done2", function () {
        let $this = $(this);
        let giveAwayId = $this.data("giveAwayId");
        $this.attr("id", "give_id_" +giveAwayId);
        
        $("#giveAwayId").val(giveAwayId);
        //$("#confirmPopup").show();
        is.showCommonPopup(2, "confirmReceiveGiveAway", is.createCommonPopupBtnOpt(undefined, _saveGiveAway), is.createCommonPopupBtnOpt(undefined, undefined));

    });

    //임시비밀번호 전송 팝업창 > 확인버튼
    $(document).on('click', '#smsSendConfirmPopup .btn .confirm', function() {
        $.sendSmsTemporaryPassword(eventId, $.getValueById("phoneNumber"));
    });
    
    //임시비밀번호 전송 팝업창 > 취소버튼
    $(document).on('click', '#smsSendConfirmPopup .btn .grey', function() {
        $(this).parent().parent().parent().hide();
    });

    //임시비밀번호 전송완료 후 팝업 > 확인, 취소버튼
    $(document).on('click', '#smsSendSuccessPopup .btn .grey, .confirm', function() {
        $(this).parent().parent().parent().hide();
    });

    //NFT 보관함 확인하기 버튼 
    $(document).on('click', '#dataDiv #dataUl .win_btn a', function() {
        //당첨종류(NFT or COUPON)
        let thisId = $(this).attr('id');
        console.log('thisId: ', thisId);
        
        let eventSessionData = {
            eventId : eventId,
            phoneNumber: isSmsSend ? is.getValueById("mdn") : is.getValueById("phoneNumber"),   //sms인증이면 sms인증팝업 영역의 전화번호 영역의 값을 가져오고, sms인증이 아닌 기본 검색이면 기본영역의 전화번호 영역의 값을 가져온다.
            isPhoneNumber : isPhoneNumber,
            isAttendCode : isAttendCode,
            attendCode : isAttendCode ? is.getValueById("phoneNumber") : "",
            winningType: thisId
        };
        sessionStorage.setItem('eventSessionData', JSON.stringify(eventSessionData));
        location.href = '/web-event/nft/nft-repository.html';
    });

    //수령확인 컨펌 버튼
    // $("#confirmBtn").click(function() {
    //     let giveAwayId = $("#giveAwayId").val();
    //     _saveGiveAway(giveAwayId);
    // });

    // $("#confirmCancelBtn").click(function() {
    //     $("#confirmPopup").hide();
    // });
    
    //알림 팝업 확인 버튼
    // $("#alertPopupConfirmBtn").click(function() {
    //     $("#alertPopup").hide();
    // });

    // //에러팝업 닫기 버튼
    // $("#errorModalConfirm").click(function() {
    //     $("#errorAlertPopup").hide();
    // });

    //경품정보 저장하기
    let _saveGiveAway = function() {
        const giveAwayId = $.getValueById("giveAwayId");
        //수령하기 api
        let param = {
            giveAwayId : giveAwayId
        };

        $.ajax({
            url: "/api/v1/web-event-front/receipt/give-away",
            data: JSON.stringify(param),
            method: "POST",
            contentType: "application/json;charset=UTF-8"

        }).done(function(res) {
            
            if (res.resultCode === 200) {
                var result = res.result;

                //console.log("result >>" + JSON.stringify(result));

                $("#give_id_" + giveAwayId).attr('class', 'done').html('수령완료');                    
                $("#confirmPopup").hide();
                //window.location.reload();

            } 

            if (res.resultCode !== 200) {
                is.showCommonPopup(1, "commonError");
                return;
            }
        }).fail(function (err) {
            console.log(err.resultMessage);
            is.showCommonPopup(1, "commonError");
        });
    };

    $(document).ready(function() {
        is.putPvLogPageView("0", "/main/history");

        //이벤트 기본 정보 가져오기
        let eventBaseInfo = is.getEventBaseInfo(eventId);
        //console.log(eventBaseInfo);
        
        //이벤트 기본 정보가 있으면
        if (eventBaseInfo) {
            //====== 당첨조회 영역과 버튼이름의 참여코드, 전화번호인지 버튼이름 정의 로직 시작 ====== // 
            //당첨정보 조회 타입 > ATTEND : 참여코드, MDN : 전화번호
            let winningSearchType = eventBaseInfo.winningSearchType;
            //SMS발송 사용 여부
            let smsAuthUseYn  = eventBaseInfo.smsAuthUseYn;
            
            //참여코드
            if (winningSearchType === "ATTEND") {
                isAttendCode = true;
                $.showElement("#phoneNumberLi");
                $.innerText("#searchTypeMent", "참여코드");
                $.innerText("#searchWinningBtn", "조회하기");
            }
            //전화번호
            if (winningSearchType === "MDN" || !winningSearchType) {
                isPhoneNumber = true;
                $.innerText("#searchTypeMent", "전화번호");
                
                //sms 인증 사용함 일때
                if (smsAuthUseYn === "Y") {
                    isSmsSend = true;
                    //$.hideElement("#phoneNumberLi");
                    $.innerText("#searchWinningBtn", "인증하기");
                }
                //sms 인증 사용안할때
                if (smsAuthUseYn === "N" || !smsAuthUseYn) {
                    $.showElement("#phoneNumberLi");
                    $.innerText("#searchWinningBtn", "조회하기");
                }
            }
            //====== 당첨조회 영역과 버튼이름의 참여코드, 전화번호인지 버튼이름 정의 로직 끝 ====== //
        }
    });

     // let _checkPasswordEvent = function(eventId) {
    //     const url = "/api/v1/web-event-front/check/password-event/" + eventId;
    //
    //     $.get({
    //         url : url,
    //         contentType : "application/json; charset=utf-8"
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
    //     });
    // };

}(jQuery, window, document));
