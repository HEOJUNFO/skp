/*
 * ADReport Mobile
 * common javascript file
 * License: SK planet wholly owned
 */
(function ($, window, document, undefined) {

    //https://localhost:8081/dist/adreport/web-event/give-away.html?eventId=00051&arEventWinningId=19&arEventWinningButtonId=17
    // var qs = is.parseQuery();
    // const eventId = qs.eventId;
    // const arEventWinningButtonId = qs.arEventWinningButtonId;
    // let arEventWinningId = qs.arEventWinningId;
    // const eventLogWinningId = qs.eventLogWinningId;

    // const eventId = sessionStorage.getItem("eventId");
    // const arEventWinningButtonId = sessionStorage.getItem("arEventWinningButtonId");
    // const arEventWinningId = sessionStorage.getItem("arEventWinningId");
    // const eventLogWinningId = sessionStorage.getItem("eventLogWinningId");
    let eventId = "";
    let arEventWinningButtonId = "";
    let arEventWinningId = "";
    let eventLogWinningId = "";
    let eventWinningData = sessionStorage.getItem("eventWinningData");
    //SS-20187
    let isSubscription = false;

    //SS-20145
    let webArData = sessionStorage.getItem("skWebArJson");
    let attendCode = "";
    let arAttendConditionCodeYn = false;
    //SS-20145

    //세션 스토리지 - eventBaseInfo 정보 가져오기
    const eventBaseInfo = sessionStorage.getItem("eventBaseInfo");

    //뒤로가기 버튼 이벤트 일때
    window.onpageshow = function(event) {
        if ( event.persisted || (window.performance && window.performance.navigation.type == 2)) {
            if (eventWinningData == undefined) {
                is.showCommonPopup(1, "giveAwayPageConnectionError", is.createCommonPopupBtnOpt(undefined, is.historyBack));
                return;
            }
            if (eventWinningData) {

                const parseEventWinningData = JSON.parse(eventWinningData);
                //SS-20145
                const parseWebArData = JSON.parse(webArData);

                if (!(parseEventWinningData.eventId && parseEventWinningData.arEventWinningId && parseEventWinningData.arEventWinningButtonId && parseEventWinningData.eventLogWinningId)) {
                    is.showCommonPopup(1, "giveAwayPageConnectionError", is.createCommonPopupBtnOpt(undefined, is.historyBack));
                    return;
                } else {
                    eventId = parseEventWinningData.eventId;
                    arEventWinningButtonId = parseEventWinningData.arEventWinningButtonId;
                    arEventWinningId = parseEventWinningData.arEventWinningId;
                    eventLogWinningId = parseEventWinningData.eventLogWinningId;
                    //SS-20145
                    if (parseWebArData) {
                        attendCode = parseWebArData.attendCode;
                    } 
                }
            }
        }
    }

    history.pushState(null, document.title, location.href);
    window.addEventListener("popstate", function(event) {    //  뒤로가기 이벤트 등록
        console.log("event", event);
        is.showCommonPopup(2, "closeGiveAwayPage", is.createCommonPopupBtnOpt("다시입력", undefined), is.createCommonPopupBtnOpt("당첨포기", is.windowClose));
    });
    
    if (eventWinningData == undefined) {
        is.showCommonPopup(1, "giveAwayPageConnectionError", is.createCommonPopupBtnOpt(undefined, is.historyBack));
        return;
    }
    if (eventWinningData != undefined) {

        let parseEventWinningData = JSON.parse(eventWinningData);
        //SS-20145
        let parseWebArData = JSON.parse(webArData);

        if (!(parseEventWinningData.eventId && parseEventWinningData.arEventWinningId && parseEventWinningData.arEventWinningButtonId && parseEventWinningData.eventLogWinningId)) {
            is.showCommonPopup(1, "giveAwayPageConnectionError", is.createCommonPopupBtnOpt(undefined, is.historyBack));
            return;
        } else {
            eventId = parseEventWinningData.eventId;
            arEventWinningButtonId = parseEventWinningData.arEventWinningButtonId;
            arEventWinningId = parseEventWinningData.arEventWinningId;
            eventLogWinningId = parseEventWinningData.eventLogWinningId;
            //SS-20145
            if (parseWebArData) {
                attendCode = parseWebArData.attendCode;
            } 
        }
    }

    //경품당첨정보 가져오기
    let _getWinningButtonDetail = function() {

        const url = "/api/v1/web-event-front/winning-button/detail/" + arEventWinningButtonId;

        $.ajax({

            url: url,
            method: "GET",
            contentType: "application/json"
            
        }).done(function(response, text, xhr) {
            console.log(response);
            
            if (xhr.status === 200) {

                if (response.resultCode === 200) {

                    $.showElement("#giveAwaySection");

                    const result = response.result;
                    //console.log("result >> " + JSON.stringify(result));
                    //SS-20145
                    if (result.arEventInfo.arAttendConditionCodeYn) {
                        arAttendConditionCodeYn = result.arEventInfo.arAttendConditionCodeYn;       
                    }
                    
                    let arEventWinningInfo = result.arEventWinningInfo;

                    let logType = "0";
                    if (arEventWinningInfo.subscriptionYn === "Y") {
                        logType = "1";
                    }
                    is.putPvLog(is.getPvLogParams("0", "/main/enterinfo", arEventWinningInfo.arEventWinningId, undefined, logType));

                    //제목영역 시작
                    if (arEventWinningInfo.subscriptionYn) {
                        //응모일때
                        if (arEventWinningInfo.subscriptionYn === 'Y') {
                            isSubscription = true;
                            $.innerText(".win_title", "경품 응모정보 입력");
                            $.innerText("#titleDesc", "경품 응모를 위해 다음 정보를 정확히 입력해 주세요.");
                            //$('.win_title').html('경품 응모정보 입력');
                            //$('#titleDesc').html('경품 응모를 위해 다음 정보를 정확히 입력해 주세요.');

                            let subscriptionRaffleDate = result.subscriptionRaffleDay;
                            let subscriptionRaffleTime = result.subscriptionRaffleTime;

                            let subscriptionRaffleMonth;
                            if (subscriptionRaffleDate) {
                                var subscriptionRaffleDateSplit = subscriptionRaffleDate.split('-');
                                subscriptionRaffleMonth = subscriptionRaffleDateSplit[1];
                                subscriptionRaffleDay = subscriptionRaffleDateSplit[2];
                            }
                            subscriptionRaffleAlertMent =  subscriptionRaffleMonth +'월 ' + subscriptionRaffleDay + '일 ' + subscriptionRaffleTime +'시';
                            //$('#subscriptionDesc').text('· '+ subscriptionRaffleAlertMent +' 후 당첨 이력 조회 페이지에서 당첨 결과를 확인해주세요.').show();
                            $.innerText("#subscriptionDesc", subscriptionRaffleAlertMent +' 후 당첨 이력 조회 페이지에서 당첨 결과를 확인해주세요.')
                            
                        }
                        //응모가 아닐때
                        if (arEventWinningInfo.subscriptionYn === 'N') {
                            $('.win_title').html('경품 수령정보 입력');
                            $('#titleDesc').html('경품배송을 위해 다음의 정보를 정확히 입력해 주세요.<br>(정보를 정확히 입력하지 않으면 경품수령이 불가능합니다)');
                        }
                    }

                    //SS-20219 : 제3자동의 화면 안나오는 에러 수정
                    if (result.arEventInfo) {
                        let arEventInfo = result.arEventInfo;
                        if (arEventInfo.informationProvisionAgreementTextSetting === 'Y') {
                            $.showElement('#personalInfoAgreement');
                            if (arEventInfo.informationProvisionRecipient) {
                                $.showElement('#receiverSpan');
                                $.innerHtmlById('receiverSpan', arEventInfo.informationProvisionRecipient);
                            }
                            if (arEventInfo.informationProvisionConsignor) {
                                $.showElement('#purposeSpan');
                                $.innerHtmlById('purposeSpan', arEventInfo.informationProvisionConsignor);
                            }
                            if (arEventInfo.informationProvisionPurposeUse) {
                                $.showElement('#itemSpan');
                                $.innerHtmlById('itemSpan', arEventInfo.informationProvisionPurposeUse);
                            }
                        }
                    }
                    //SS-20219 : 제3자동의 화면 안나오는 에러 수정

                    //응모가 아닐때
                    if (!arEventWinningInfo.subscriptionYn) {
                        $.innerText(".win_title", "경품 배송정보 입력");
                        //$('.win_title').html('경품 배송정보 입력');
                    }
                    //제목영역 끝
                    
                    //경품배송주소 사용여부
                    if (!result.buttonInfo.deliveryAddressYn) {
                        $.hideElement("#zipCodeLi");
                        $.hideElement("#addressLi");
                        $.hideElement("#addressDetailLi");
                        // $("#zipCodeLi").hide();
                        // $("#addressLi").hide();
                        // $("#addressDetailLi").hide();
                    }
                    //이름 사용여부
                    if (!result.buttonInfo.deliveryNameYn) {
                        $.hideElement("#userNameLi");
                        $.hideElement("#userBirthLi");
                        // $("#userNameLi").hide();
                        // $("#userBirthLi").hide();
                    }
                    //전화번호 사용여부
                    if (!result.buttonInfo.deliveryPhoneNumberYn) {
                        $.hideElement("#phoneNumberLi");
                        //$("#phoneNumberLi").hide();
                    }
                    //경품비밀번호 사용여부 - 2022-12-14 서베이고 개발건으로 주석 처리
                    // if (result.winningPasswordYn == "N") {
                    //     $("#givePasswordLi").hide();
                    // }
                }
            }

            //정상 통신이 아닐때 에러 팝업
            if (xhr.status !== 200) {
                 //에러 알림창
                is.showCommonPopup(1, "commonError");
                return;
            }
            
        }).fail(function(error) {
              //에러 알림창
              is.showCommonPopup(1, "commonError");
              return;
        });
    
    }

    //경품당첨정보 저장하기
    let _saveGiveAway = function() {
        
        const userName      = is.getValueById("userName");
        const phoneNumber   = is.getValueById("phoneNumber");
        const zipCode       = is.getValueById("zipCode");
        const address       = is.getValueById("address");
        const addressDetail = is.getValueById("addressDetail");
        const givePassword  = is.getValueById("givePassword");
        const memberBirth   = is.getValueById("userBirth");
        let surveyLogAttendId;
        
        //서베이고일때 > 참여인덱스 정보를 세션 스토리지에서 가져오기
        if (eventBaseInfo) {
            let eventType = JSON.parse(eventBaseInfo).eventType;
            if (eventType === is.eventType.SURVEY) {
                surveyLogAttendId = sessionStorage.getItem("surveyLogAttendId");
                
                //서베이고일때 예외처리
                if (arAttendConditionCodeYn) {
                    attendCode = sessionStorage.getItem("attendCode");
                }
                //서베이고일때 참여인덱스 값이 없으면 '비정상 접근' 처리
                if (!surveyLogAttendId) {
                    is.showCommonPopup(1, "giveAwayPageConnectionError", is.createCommonPopupBtnOpt(undefined, is.historyBack));
                    return;
                }
            }
        }

        //SS-20145
        if (arAttendConditionCodeYn) {
            if (!attendCode) {
                //세션정보 삭제
                sessionStorage.clear();
                //_confirmModalShow2("에러", "경품 저장에 대한 비정상 접근입니다. 운영자에게 문의하세요!");
                is.showCommonPopup(1, "abnormalGiveAwayPageConnection");
                return;
            }
        }
        //SS-20145
        
        //이름 사용 설정일때
        if ($("#userNameLi").attr("style") == undefined) {
            //이름 입력값 확인
            if (!userName) {
                is.showCommonPopup(1, "confirmMemberName");
                return false;
            }
            //생년월일 입력값 확인
            if (!memberBirth) {
                is.showCommonPopup(1, "confirmMemberBirth");
                return false;
            } else {
                if (!_isBirthday(memberBirth)) {
                    is.showCommonPopup(1, "birthDayPatternError");
                    return false;
                }
            }
            //생년원일 입력 자리수 확인
            if (memberBirth.length < 8 || memberBirth.length > 8) {
                is.showCommonPopup(1, "confirmMemberBirthLength");
                return false;
            }
            //만나이 14세 이하 검증 
            if (_calcAge(memberBirth) < 15) {
                is.showCommonPopup(1, "confirmFourteen");
                return false;
            }
        }

        //전화번호 사용 설정일떄
        if ($("#phoneNumberLi").attr("style") == undefined) {
            //전화번호 입력 값 확인
            if (!phoneNumber) {
                is.showCommonPopup(1, "confirmPhoneNumber");
                return false;
            } else {
                //전화번호 형식 확인
                if (!_isPhoneNumber) {
                    is.showCommonPopup(1, "confirmWrongPhoneNumber");
                    return false;
                }
            }
        }
        //주소입력 사용 일때 
        if ($("#zipCodeLi").attr("style") == undefined) {
            //우편번호 입력 값 확인    
            if (!zipCode) {
                is.showCommonPopup(1, "confirmZipcode");
                return false;
            }
            //주소 입력 값 확인
            if (!address) {
                is.showCommonPopup(1, "confirmAddress");
                return false;
            }
            //상세주소 입력 값 확인
            if (!addressDetail) {
                is.showCommonPopup(1, "confirmAddressDetail");
                return false;
            }
        }

        //경품비밀번호 검증 - 2022-12-14 서베이고 개발건으로 주석 처리
        // if ($("#givePasswordLi").attr("style") == undefined) {
        //     //경품비밀번호 4자리 검증
        //     if (givePassword.length < 4) {
        //         _confirmModalShow("confirmGiveAwayPassword");
        //         return false;
        //     }
        // }

        //당첨버튼 더블클릭 방지(SS-20192)
        $('#saveBtn').attr('disabled', true);

        //경품 내용 저장
        const url = "/api/v1/web-event-front/give-away-delivery/save";
        var params = {
            "address": address,
            "addressDetail": addressDetail,
            "arEventWinningId": Number(arEventWinningId),
            //"attendCode": attendCode == undefined ? "" : attendCode,
            "eventId": eventId,
            "giveAwayPassword": givePassword,
            "name": userName,
            "phoneNumber": phoneNumber,
            "zipCode": zipCode,
            "memberBirth": memberBirth,
            "eventLogWinningId": eventLogWinningId,
            "arEventWinningButtonId": arEventWinningButtonId,
            "surveyLogAttendId":surveyLogAttendId
        }
        
        $.ajax({
            url: url,
            data: JSON.stringify(params),
            method: "POST",
            contentType: "application/json"
        }).done(function (response, textStatus, xhr) {
            console.log(JSON.stringify(response));

            if (xhr.status === 200) {
                //정상통신일떄
                if (response.resultCode === 200) {
                    //세션정보 삭제
                    sessionStorage.clear();

                    is.showCommonPopup(1, "successGiveAwaySave", is.createCommonPopupBtnOpt(undefined, is.windowClose));
                    return;
                }
                //당첨버튼 더블클릭 방지(SS-20192)
                if (response.resultCod !== 200) {
                    $('#saveBtn').attr('disabled', false);
                }

                //이벤트 정보가 없을때
                if (response.resultCode === 801 || response.resultCode === 802) {
                    is.showCommonPopup(1, "noEventResult");
                    return;
                }
                //당첨정보가 없을때
                if (response.resultCode === 817) {
                    is.showCommonPopup(1, "notWinningResult");
                    return;
                }
                //경품수 제한 에러일때
                if (response.resultCode === 816) {
                    let limitCount = response.result.limitCount;
                    $.innerValueById("limitCount", limitCount);
                    $.innerValueById("isLimit", "true");

                    _confirmModalShow("limitGiveAway");
                    //is.showCommonPopup(1, "limitGiveAway");
                    return;
                }
                //기프티콘 발송 에러일때
                if (response.resultCode === 821) {
                    is.showCommonPopup(1, "gifticonSendError");
                    return;
                }

                if (Number(response.resultCode) == 825) {
                    is.showCommonPopup(1, "giveAwaySaveErrorByName");
                    return;
                }

                if (Number(response.resultCode) == 826) {
                   is.showCommonPopup(1, "giveAwaySaveErrorByPhoneNumber");
                    return;
                }

                if (Number(response.resultCode) == 827) {
                    is.showCommonPopup(1, "giveAwaySaveErrorByAddress");
                    return;
                }

                // if (Number(response.resultCode) == 828) {
                //     _confirmModalShow2("에러", "경품저장 시 비밀번호가 잘못됐습니다!");
                //     return;
                // }

                if (Number(response.resultCode) == 829) {
                    is.showCommonPopup(1, "giveAwaySaveErrorByAgeLimit");
                    return;
                }

                if (Number(response.resultCode) == 823) {
                    is.showCommonPopup(1, "giveAwaySaveErrorByBirthDay");
                    return;
                }

                if (Number(response.resultCode) == 832) {
                    is.showCommonPopup(1, "giveAwaySaveErrorByBirthDayInSpecialChar");
                    return;
                }

                //2022.7.7 - jira : SS-20070 
                if (Number(response.resultCode) == 831) {
                    is.showCommonPopup(1, "giveAwaySaveError");
                    return;
                }

                if (Number(response.resultCode) == 833) {
                    is.showCommonPopup(1, "giveAwaySaveErrorByButton");
                    return;
                }
                //2022.5.30 - 당첨로그를 url로 들어와 중복당첨정보가 저장되는 에러 처리 ( jira : SS-20023 )
                if (Number(response.resultCode) == 834) {
                    is.showCommonPopup(1, "abnormalGiveAwayPageConnection");
                    return;
                }
                //비밀번호 기능 수정 - NFT 기능 고도화 과련 추가 (SS-19998)
                // if (Number(response.resultCode) == 836) {
                //     let title = isSubscription ? "응모확인" : "당첨확인";
                //     _confirmModalShow2(title, "당첨조회 비밀번호는 알파벳,숫자,특수문자($@$!%*#?&) 조합 6자리 이상만 가능합니다.");
                //     return;
                // }
                if (Number(response.resultCode) == 841) {
                    is.showCommonPopup(1, "giveAwaySaveErrorByNftLimit");
                    return;
                }
                
                if (Number(response.resultCode) == 1201) {
                    is.showCommonPopup(1, "gifticonSendError");
                    return;
                }
            }
            //통신에러일떄
            if (xhr.status !== 200) {
                //당첨버튼 더블클릭 방지(SS-20192)
                $('#saveBtn').attr('disabled', false);
                
                is.showCommonPopup(1, "commonError");
                return;
            }
           
            
        }).fail(function(xhr, status, error) {
            var response = JSON.parse(xhr.responseText);
            if (xhr.status === 400) {
                //Valid 관련 에러 처리 
                if (Number(response.resultCode) > 2000) {
                    //세션정보 삭제
                    sessionStorage.clear();

                    is.showCommonPopup(1, "giveAwayPageConnectionError");

                    //당첨버튼 더블클릭 방지(SS-20192)
                    $('#saveBtn').attr('disabled', false);
                    return;
                }
            }
            //당첨버튼 더블클릭 방지(SS-20192)
            $('#saveBtn').attr('disabled', false);
            //에러 알림창
            is.showCommonPopup(1, "commonError");
        });
    }

    // 우편번호 찾기 화면을 넣을 element
    let element_layer = document.getElementById('layer');

    //다음 우편번호 검색 팝업
    let _openZipCodePopup = function() {
       
        new daum.Postcode({
            oncomplete: function(data) {
                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
                // 예제를 참고하여 다양한 활용법을 확인해 보세요.
                console.log(JSON.stringify(data));
                let roadAddr = data.roadAddress; // 도로명 주소 변수
                let extraRoadAddr = ''; // 참고 항목 변수

                //도로명주소가 없으면 'autoRoadAddress'인자값으로 대체
                if (roadAddr == "") {
                    roadAddr = data.autoRoadAddress;
                }
    
                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraRoadAddr += data.bname;
                }
    
                if(data.buildingName !== '' && data.apartment === 'Y'){
                    extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
    
                if(extraRoadAddr !== ''){
                    extraRoadAddr = ' (' + extraRoadAddr + ')';
                }
                //우편번호 값 입력
                $("#zipCode").val(data.zonecode);
                //기본 주소 입력
                $("#addressLi").addClass("on");
                $("#address").val(roadAddr);

                _closeDaumPostcode();
            },

            width : '100%',
            height : '100%',
            maxSuggestItems : 5
            
        }).embed(element_layer);
        //.open();

        // iframe을 넣은 element를 보이게 한다.
        element_layer.style.display = 'block';

        // iframe을 넣은 element의 위치를 화면의 가운데로 이동시킨다.
        _initLayerPosition();
    }

    // 브라우저의 크기 변경에 따라 레이어를 가운데로 이동시키고자 하실때에는
    // resize이벤트나, orientationchange이벤트를 이용하여 값이 변경될때마다 아래 함수를 실행 시켜 주시거나,
    // 직접 element_layer의 top,left값을 수정해 주시면 됩니다.
    let _initLayerPosition = function(){
        var width = 300; //우편번호서비스가 들어갈 element의 width
        var height = 400; //우편번호서비스가 들어갈 element의 height
        var borderWidth = 1; //샘플에서 사용하는 border의 두께

        // 위에서 선언한 값들을 실제 element에 넣는다.
        element_layer.style.width = width + 'px';
        element_layer.style.height = height + 'px';
        element_layer.style.border = borderWidth + 'px solid';
        // 실행되는 순간의 화면 너비와 높이 값을 가져와서 중앙에 뜰 수 있도록 위치를 계산한다.
        element_layer.style.left = (((window.innerWidth || document.documentElement.clientWidth) - width)/2 - borderWidth) + 'px';
        element_layer.style.top = (((window.innerHeight || document.documentElement.clientHeight) - height)/2 - borderWidth) + 'px';
    }

    //다음 주소팝업 element를 안보이게
    let _closeDaumPostcode = function () {
        // iframe을 넣은 element를 안보이게 한다.
        element_layer.style.display = 'none';
    }

    //만 나이 계산 함수
    let _calcAge = function(birth) {
        let date = new Date();
        let year = date.getFullYear();
        let month = (date.getMonth() + 1);
        let day = date.getDate();

        if (month < 10) month = '0' + month;
        if (day < 10) day = '0' + day;

        let monthDay = month + day;

        birth = birth.replace('-', '').replace('-', '');

        let birthdayy = birth.substr(0, 4);
        let birthdaymd = birth.substr(4, 4);
        let age = monthDay < birthdaymd ? year - birthdayy  : year - birthdayy;
        
        return age;
    }

    //모달 팝업 이벤트
    let _confirmModalShow = function(mentType) {
        $("#modal").show();
        if (mentType !== undefined) {
            
            //경품수령 횟수 제한에 걸렸을때 예외처리
            if (mentType === "limitGiveAway") {
                var limitCount = $("#limitCount").val();
                //let plusLimitCount = Number(limitCount) + 1;
                $("#modalTitle").html("경품 수령 알림");
                $("#modalContents").html("동일 참여자 기준 " + limitCount + "번 이상 당첨은 불가능합니다. 이용해 주셔서 감사합니다.");
                is.putPvLog(is.getPvLogParams("0", "/main/popup", undefined, undefined, "5"));
            }

            //응모형이 아닐때
            if (!isSubscription) {
                //경품수령 횟수 제한이 아날때
                if (mentType !== "limitGiveAway") {
                    let ment = is.ment(mentType);
                    let resultJsonObj = JSON.parse(ment);
                    let title = resultJsonObj.title;
                    let content = resultJsonObj.content;

                    $("#modalTitle").html(title);
                    $("#modalContents").html(content); 
                }
            } else {
                //응모형일때
                //경품수령 횟수 제한이 아날때
                if (mentType !== "limitGiveAway") {
                    let ment = is.ment(mentType);
                    let resultJsonObj = JSON.parse(ment);
                    //let title = resultJsonObj.title;
                    let content = resultJsonObj.content;

                    $("#modalTitle").html("응모 확인");
                    $("#modalContents").html(content); 
                }
                    
            }
        }
    }

    //저장버튼
    $(document).on("click", "#saveBtn", function () {
        _saveGiveAway();
        return false;
    });

    //다음 주소검색 팝업 클릭 이벤트
    $(document).on("click", "#searchZipCode, #zipCode", function() {
        _openZipCodePopup();
    });

    //다움 주소검색 닫기 클릭 이벤트
    $(document).on("click", "#btnCloseLayer", function() {
        _closeDaumPostcode();
    })

    //전화번호 입력 시 숫자만 입력되도록 처리
    $(document).on("keypress", "#phoneNumber", function(e) {
    //$("#phoneNumber").keypress(function(event) {
        if(e.key === '.' || e.key === '-') {
            return false;
        }
        const phoneNumber = is.getValueById("phoneNumber");
        if (phoneNumber.length > 10) {
            return false;
        }
    });

    //모달 확인버튼
    $(document).on("click", "#modalBtn", function() {
        //DTWS-92 
        $.hideElement("#modal"); 
        window.close();
    });

    // 상단 우측 X 버튼 이벤트
    $(document).on("click", "#giveAwayClose", function() {
        //DTWS-61
        is.showCommonPopup(2, "closeGiveAwayPage", is.createCommonPopupBtnOpt("다시입력", undefined), is.createCommonPopupBtnOpt("당첨포기", is.windowClose));
    });

    //[DTWS-115]당첨정보입력페이지 뒤로가기 클릭 시 안내 팝업 미노출
    $(document).on("click", ".contents_input", function() {
        history.pushState(null, document.title, location.href);
    });

    $(document).on("keyup", "#userBirth", function() {
    //$('#userBirth').keyup(function() {
        const inputValue = $(this).val();
        let RegExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi;	//정규식 구문
        if (inputValue.length > 8) {
            alert("생년월일은 8자리입니다.");
            $(this).val(inputValue.substring(0, inputValue.length - 1));
            return;
        }
        if (RegExp.test(inputValue)) {
            alert("특수문자는 입력하실 수 없습니다.");
            $(this).val(inputValue.replace(RegExp, ""));
            return;
        } 
        
    });

    //생년월일 형식 체크
    let _isBirthday = function(dateStr) { 
        let year = Number(dateStr.substr(0,4)); // 입력한 값의 0~4자리까지 (연) 
        let month = Number(dateStr.substr(4,2)); // 입력한 값의 4번째 자리부터 2자리 숫자 (월) 
        let day = Number(dateStr.substr(6,2)); // 입력한 값 6번째 자리부터 2자리 숫자 (일) 
        let today = new Date(); // 날짜 변수 선언 
        let yearNow = today.getFullYear(); // 올해 연도 가져옴 
        if (dateStr.length <=8) { 
            // 연도의 경우 1900 보다 작거나 yearNow 보다 크다면 false를 반환합니다. 
            if (1900 > year || year > yearNow){ 
                return false; 
            } else if (month < 1 || month > 12) { 
                return false; 
            } else if (day < 1 || day > 31) { 
                return false; 
            } else if ((month==4 || month==6 || month==9 || month==11) && day==31) { 
                return false; 
            } else if (month == 2) { 
                let isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)); 
                if (day>29 || (day==29 && !isleap)) { 
                    return false; 
                } else { 
                    return true; 
                } //end of if (day>29 || (day==29 && !isleap)) 
            } else { 
                return true; 
            }//end of if
        } else { 
            //1.입력된 생년월일이 8자 초과할때 : auth:false 
            return false; 
        } 
    }

    //핸드폰번호 형식 체크
    let _isPhoneNumber = function(phoneNumber) {
        let regPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
        return regPhone.test(phoneNumber);
    }

    $(document).ready(function () {
        _getWinningButtonDetail();
    });


}(jQuery, window, document));
