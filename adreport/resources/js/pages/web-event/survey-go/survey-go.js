(function ($, window, document, undefined) {

    const qs = is.parseQuery();
    let eventId = qs.eventId;
    let surveyLogAttendId = sessionStorage.getItem("surveyLogAttendId");

    const ERROR_CODE_NO_ATTEND_TARGET = 855,    // 성/연령별 참여조건이 아닙니다.
        ERROR_CODE_EXPIRED_SURVEY_LOG_ID = 856, // 이미 사용완료된 survey log id 입니다.
        ERROR_CODE_NOT_ISSUED_SURVEY_LOG_ID = 857;  // 발급되지 않은 survey log id 입니다.

    const TYPE_Y = "Y",
        TYPE_N = "N";

    const AR_LOGICAL_TYPE_SURVEY = "SURVEY",    // 서베이고 기본형
        AR_LOGICAL_TYPE_QUIZ = "QUIZ",          // 퀴즈형
        AR_LOGICAL_TYPE_ANALYSIS = "ANALYSIS",  // 분석형
        AR_LOGICAL_TYPE_TALK = "TALK";          // 대화형

    const SUBJECT_EXAMPLE_TYPE_CHOICE = "CHOICE",   // 객관식
        SUBJECT_EXAMPLE_TYPE_QUESTION = "QUESTION"; // 주관식

    const END_TYPE_RAFFLE = "RAFFLE",    // 경품추천
        END_TYPE_END = "END";            // 설문완료

    const PROCESS_STATUS_BEFORE = -1,
        PROCESS_STATUS_ING = 0,
        PROCESS_STATUS_AFTER = 1;

    const WINNING_BUTTON_ACTION_TYPE_CLOSE = "CLOSE",    // 계속하기(닫기)
        WINNING_BUTTON_ACTION_TYPE_DELIVERY = "DELIVERY", // 경품배송정보입력(당첨정보입력)
        WINNING_BUTTON_ACTION_TYPE_SUBSCRIPTION = "SUBSCRIPTION";   // 경품배송정보입력 (응모일때)

    const EXAMPLE_CHOICE_TYPE_WIDTH = "WIDTH",  // 가로형
        EXAMPLE_CHOICE_TYPE_HEIGHT = "HEIGHT",  // 세로형
        EXAMPLE_CHOICE_TYPE_IMG = "IMG",        // 이미지형
        EXAMPLE_CHOICE_TYPE_SCALE = "SCALE",    // 척도형
        EXAMPLE_CHOICE_TYPE_OX = "OX",          // OX 형
        EXAMPLE_CHOICE_TYPE_OPTIONAL = "OPTIONAL";  // 선택형

    const POPUP_TYPE_BTN_OK = 1,
        POPUP_TYPE_BTN_CANCEL_OK = 2,
        POPUP_TYPE_BTN_CANCEL_MIDDLE_OK = 3;

    const SUBJECT_END_ALERT_MAX_COUNT = 5,
        SUBJECT_END_ALERT_POINT_COUNT = 3;

    let subjectTmpl = Handlebars.compile($("#subjectTemplate").html());
    let footerTmpl = Handlebars.compile($("#footerTemplate").html());
    let subjectPopupImgTmpl = Handlebars.compile($("#subjectPopupImgTemplate").html());

    let viewSubjectIndex = -1;

    let subjectList, arEventInfo;

    let uploadSubjectList = [];

    let toastFadeoutTimer;
    let toastEndTimer;

    let winningProcessStatus = PROCESS_STATUS_BEFORE;

    let winningProcessData;


    let searchSurveyList = function () {
        $.ajax({
            url: "/api/v1/survey-go-mobile/detail",
            data: JSON.stringify(is.webEventRequestParams(getSurveyListParams())),
            method: "POST",
            contentType: "application/json;charset=UTF-8"
        }).done(function (res, text, xhr) {

            //console.log(">>> " +  JSON.stringify(res));

            if (xhr.status === 200) {
                let resultCode = res.resultCode;
                // 정상조회일때
                if (resultCode === 200) {
                    let result = res.result;
                    console.log("result >>" + JSON.stringify(result));

                    $.each(result.surveySubjectInfo, function (index, subject) {
                        const defaultK = "SURVEYANSWERAES1";
                        let k = subject.surveySubjectId + defaultK;
                        k = k.substring(0, 16);

                        if (subject.quizAnswerSort) {
                            // console.log("before quizAnswerSort : " + subject.quizAnswerSort);
                            // console.log("key : " + key);
                            subject.quizAnswerSort = answerChange(k, k, subject.quizAnswerSort);
                            subject.quizAnswerSort = subject.quizAnswerSort * 1;
                            // console.log("after quizAnswerSort : " + subject.quizAnswerSort);
                        }

                        $.each(subject.exampleQuestionAnswer, function (index, answerInfo) {
                            answerInfo.exampleQuestionAnswer = answerChange(k, k, answerInfo.exampleQuestionAnswer);
                        });
                    });


                    arEventInfo = result.arEventInfo;
                    subjectList = result.surveySubjectInfo;

                    subjectList[subjectList.length - 1].customIsLast = true;

                    if (arEventInfo.attendConditionTargetYn) {
                        $(".mainArea").show();
                        showOverlayPopup($(".attendTarget-area"));
                    } else {
                        startSubjectList(subjectList);
                    }
                }

                if (resultCode === ERROR_CODE_EXPIRED_SURVEY_LOG_ID) {   // 다른 에러 코드일때
                    showErrorPopup("surveyErrorAlert");
                    return;
                }

                if (resultCode === ERROR_CODE_NOT_ISSUED_SURVEY_LOG_ID) {
                    showErrorPopup("surveyErrorAlert");
                    return;
                }

            }
            // 에러 팝업
            if (xhr.status !== 200) {
                showErrorPopup("surveyErrorAlert");
                return;
            }

        }).fail(function (err) {
            console.log(err.resultMessage);
            showErrorPopup("surveyErrorAlert");
        });
    };

    let getSurveyListParams = function (){
        let params = {};
        params.eventId = eventId;
        params.surveyLogAttendId = surveyLogAttendId;

        return params;
    };

    let checkAttendTargetPossible = function (){
        $.ajax({
            url: "/api/v1/survey-go-mobile/survey-attend-target/possible",
            data: JSON.stringify(is.webEventRequestParams(getCheckAttendTargetPossibleParams())),
            method: "POST",
            contentType: "application/json;charset=UTF-8"
        }).done(function (res, text, xhr) {

            //console.log(">>> " +  JSON.stringify(res));

            if (xhr.status === 200) {
                let resultCode = res.resultCode;
                // 정상조회일때
                if (resultCode === 200) {
                    let result = res.result;
                    console.log("result >>" + JSON.stringify(result));

                    hideOverlayPopup();
                    startSubjectList(subjectList);
                }
                if (resultCode === 602) {   // 설문참여 참여 제한 에러(성별/연령대)
                    showErrorPopup("surveyAttentTargetAlert");
                    return;
                }
            }
            // 에러 팝업
            if (xhr.status !== 200) {
                showErrorPopup("surveyErrorAlert");
                return;
            }

        }).fail(function (err) {
            console.log(err.resultMessage);
            showErrorPopup("surveyErrorAlert");
        });
    };

    let getCheckAttendTargetPossibleParams = function (){
        let params = {};

        params.eventId = eventId;
        params.gender = $(".gender:checked").val();
        params.age = $(".attendAge:checked").val();
        params.surveyLogAttendId = surveyLogAttendId;

        return params;
    };

    let winningProcess = function (surveySubjectCategoryId){
        winningProcessStatus = PROCESS_STATUS_ING;
        $.ajax({
            url: "/api/v1/web-event-front/winning-process",
            data: JSON.stringify(is.webEventRequestParams(getWinningProcessParams(surveySubjectCategoryId))),
            method: "POST",
            contentType: "application/json;charset=UTF-8"
        }).done(function (res, text, xhr) {

            //console.log(">>> " +  JSON.stringify(res));

            if (xhr.status === 200) {
                let resultCode = res.resultCode;
                // 정상조회일때
                if (resultCode === 200) {
                    let result = res.result;
                    console.log("result >>" + JSON.stringify(result));

                    winningProcessData = res.result;
                    showPrizePopup();
                }
                if (resultCode === 810) {   // 다른 에러 코드일때
                    return;
                }
            }
            // 에러 팝업
            if (xhr.status !== 200) {
                $.commonError("alertPopup", "alertPopupTitle", "alertPopupContents");
                winningProcessStatus = PROCESS_STATUS_AFTER;
                return;
            }

            winningProcessStatus = PROCESS_STATUS_AFTER;

        }).fail(function (err) {
            console.log(err.resultMessage);
            $.commonError("alertPopup", "alertPopupTitle", "alertPopupContents");

            winningProcessStatus = PROCESS_STATUS_AFTER;
        });
    };

    let getWinningProcessParams = function (surveySubjectCategoryId) {
        let params = {};

        if (arEventInfo.arAttendConditionCodeYn === true) {
            params.attendCode = sessionStorage.getItem("attendCode");
        }

        params.eventId = eventId;
        params.surveyLogAttendId = surveyLogAttendId;

        if (arEventInfo.attendConditionMdnYn === true) {
            params.phoneNumber = sessionStorage.getItem("userMdn");
        }

        if (surveySubjectCategoryId) {
            params.surveySubjectCategoryId = surveySubjectCategoryId;
        }

        return params;
    };

    let showPrizePopup = function () {
        if (!winningProcessData) {
            return;
        }

        $(".winningImageUrl").prop("src", winningProcessData.winningInfo.winningImageUrl);
        $(".prizePopupBtn").text(winningProcessData.winningButtonInfo[0].buttonText);

        showModalPopup($(".prizePopup-area"));
    };

    let saveAnswer = function (){
        $.ajax({
            url: "/api/v1/survey-go-mobile/answerSave",
            data: JSON.stringify(is.webEventRequestParams(getSaveAnswerParams())),
            method: "POST",
            contentType: "application/json;charset=UTF-8"
        }).done(function (res, text, xhr) {

            //console.log(">>> " +  JSON.stringify(res));

            if (xhr.status === 200) {
                let resultCode = res.resultCode;
                // 정상조회일때
                if (resultCode === 200) {
                    let result = res.result;
                    console.log("result >>" + JSON.stringify(result));

                    if (arEventInfo.eventLogicalType === AR_LOGICAL_TYPE_SURVEY) {
                        if (arEventInfo.surveyEndButtonType === END_TYPE_END) {
                            if (result.surveyEndButtonText) {
                                $(".surveyComplete").text(result.surveyEndButtonText);
                            }
                            showOverlayPopup($(".surveyComplete-area"));
                        } else if (arEventInfo.surveyEndButtonType === END_TYPE_RAFFLE) {
                            if (result.surveyEndButtonText) {
                                $(".surveyPrize").text(result.surveyEndButtonText);
                            }
                            showOverlayPopup($(".surveyPrize-area"));
                        }
                    } else if (arEventInfo.eventLogicalType === AR_LOGICAL_TYPE_QUIZ) {
                        $(".quizText").html(getQuizResultText(result));
                        if (result.surveyEndButtonType === END_TYPE_END) {
                            if (result.surveyEndButtonText) {
                                $(".surveyComplete").text(result.surveyEndButtonText);
                            }
                            showOverlayPopup($(".surveyQuizComplete-area"));
                        } else if (result.surveyEndButtonType === END_TYPE_RAFFLE) {
                            if (result.surveyEndButtonText) {
                                $(".surveyPrize").text(result.surveyEndButtonText);
                            }
                            showOverlayPopup($(".surveyQuizPrize-area"));
                        }
                    } else if (arEventInfo.eventLogicalType === AR_LOGICAL_TYPE_ANALYSIS) {
                        // TODO 분석형 2차 개발
                    }

                    if (arEventInfo.eventLogicalType === AR_LOGICAL_TYPE_QUIZ || arEventInfo.eventLogicalType === AR_LOGICAL_TYPE_ANALYSIS) {
                        if (result.surveySubjectCategoryId !== -1) {
                            $(".surveyPrize").data("surveySubjectCategoryId", result.surveySubjectCategoryId);
                        }
                    }

                    goScrollTop();

                }
                if (resultCode === 810) {   // 다른 에러 코드일때
                    return;

                }
            }
            // 에러 팝업
            if (xhr.status !== 200) {
                $.commonError("alertPopup", "alertPopupTitle", "alertPopupContents");
                return;
            }

        }).fail(function (err) {
            console.log(err.resultMessage);
            $.commonError("alertPopup", "alertPopupTitle", "alertPopupContents");
        });
    };

    let getQuizResultText = function (result) {
        if (result.answerTotalCount === result.answerCount) {
            return result.answerTotalCount + "개 모두 맞췄어요!";
        } else {
            if (result.answerCount === 0) {
                return "아쉽지만 다음에<br>다시 도전해 보세요!";
            }
        }

        return result.answerTotalCount + "개 중 " + result.answerCount + "개 정답!";
    };

    let tempSaveAnswer = function () {
        let answer = {};
        let subjectInfo = subjectList[viewSubjectIndex];
        answer.surveySubjectId = subjectInfo.surveySubjectId;
        answer.subjectSort = subjectInfo.sort;

        if (subjectInfo.subjectExampleType === SUBJECT_EXAMPLE_TYPE_CHOICE) {
            answer.surveyExampleList = [];
            if (subjectInfo.multipleAnswerYn === TYPE_Y) {
                // 복수 정답
                $(".exampleInput:checked").each(function (){
                    let $this = $(this);
                    let selectSort = $this.val();
                    let exampleInfo = subjectInfo.exampleInfo[selectSort - 1];

                    let answerExample = {};
                    answerExample.exampleSort = exampleInfo.sort;
                    answerExample.surveyExampleId = exampleInfo.surveyExampleId;

                    answer.surveyExampleList.push(answerExample);
                });

            } else {
                // 단수 정답
                let selectSort = getSingleSelectExampleSort();
                let exampleInfo = subjectInfo.exampleInfo[selectSort - 1];

                let answerExample = {};
                answerExample.exampleSort = exampleInfo.sort;
                answerExample.surveyExampleId = exampleInfo.surveyExampleId;

                answer.surveyExampleList.push(answerExample);
            }

            if (subjectInfo.etcOpinionReceiveYn === TYPE_Y) {
                answer.questionAnswer = $(".etcOpinionReceive").val();
            }
        } else if (subjectInfo.subjectExampleType === SUBJECT_EXAMPLE_TYPE_QUESTION) {
            answer.questionAnswer = $(".questionAnswer").val();
        }

        uploadSubjectList.push(answer);
    };

    let getSaveAnswerParams = function (){
        let params = {};
        params.eventId = qs.eventId;
        params.surveyLogAttendId = surveyLogAttendId;
        params.answerList = uploadSubjectList;

        return params;
    };

    let checkAnswer = function (){
        let subjectInfo = subjectList[viewSubjectIndex];

        if (arEventInfo.eventLogicalType === AR_LOGICAL_TYPE_QUIZ && $(".subject-area").data("answerResult") === "N") {
            // 정답 체크 로직
            if (subjectInfo.subjectExampleType === SUBJECT_EXAMPLE_TYPE_CHOICE) {
                // 객관식
                if (subjectInfo.quizAnswerSort === getSingleSelectExampleSort()) {
                    // 정답
                    $(".subject-area").data("answerResult", "Y"); // 퀴즈 정답 처리 여부

                    if (subjectInfo.answerDescImgYn === true) {
                        showAnswerResultDetailModal(true, subjectInfo.answerDescImgUrl);
                    } else {
                        showAnswerResultToast(true);
                    }
                    return;
                } else {
                    // 오답
                    if (subjectInfo.wrongDescImgYn === true) {
                        showAnswerResultDetailModal(false, subjectInfo.wrongDescImgUrl);
                    } else {
                        showAnswerResultToast(false);
                    }
                    return;
                }
            } else if (subjectInfo.subjectExampleType === SUBJECT_EXAMPLE_TYPE_QUESTION) {
                // 주관식
                if (subjectInfo.exampleQuestionAnswer) {
                    let questionAnswerRight = false;
                    $.each(subjectInfo.exampleQuestionAnswer, function (index, answer) {
                        if (answer.exampleQuestionAnswer === $(".questionAnswer").val()) {
                            questionAnswerRight = true;
                            return;
                        }
                    });

                    if (questionAnswerRight === true) {
                        // 정답
                        $(".subject-area").data("answerResult", "Y"); // 퀴즈 정답 처리 여부
                        if (subjectInfo.answerDescImgYn === true) {
                            showAnswerResultDetailModal(true, subjectInfo.answerDescImgUrl);
                        } else {
                            showAnswerResultToast(true);
                        }
                        return;
                    } else {
                        // 오답
                        if (subjectInfo.wrongDescImgYn === true) {
                            showAnswerResultDetailModal(false, subjectInfo.wrongDescImgUrl);
                        } else {
                            showAnswerResultToast(false);
                        }
                        return;
                    }
                }
            }
        } else {
            nextLevel();
        }
    };

    let startSubjectList = function (subjectList){
        endLoading();
        $("#ing").prop("max", subjectList.length);

        nextLevel();
    };

    let nextLevel = function () {

        let subjectInfo = subjectList[viewSubjectIndex];

        if (viewSubjectIndex === -1) {
            viewSubjectIndex++;
            viewSubject(viewSubjectIndex);
            return;
        }

        tempSaveAnswer();

        if (subjectInfo.subjectExampleType === SUBJECT_EXAMPLE_TYPE_CHOICE && arEventInfo.subjectTargetMoveYn === TYPE_Y) {
            // 객관식 보기 지정이동
            let currentSubjectInfo = subjectList[viewSubjectIndex];
            let selectSort = getSingleSelectExampleSort();
            let exampleInfo = currentSubjectInfo.exampleInfo[selectSort - 1];
            if (exampleInfo.targetSubjectNumber) {
                // 문항 지정 이동
                viewSubjectIndex = exampleInfo.targetSubjectNumber - 1;
            } else {
                viewSubjectIndex++;
            }
        } else {
            viewSubjectIndex++;
        }

        if (subjectList.length > viewSubjectIndex) {
            viewSubject(viewSubjectIndex);
        } else {
            saveAnswer();
        }
    };

    let viewSubject = function (subjectIndex) {

        let subjectInfo = subjectList[subjectIndex];

        $("#ing").val(subjectIndex + 1);

        if (subjectInfo.customIsLast) {
            $(".nomalDecoIco").hide();
            $(".lastDecoIco").show();
        }

        subjectInfo.customEventLogicalType = arEventInfo.eventLogicalType;

        if (arEventInfo.eventLogicalType === AR_LOGICAL_TYPE_QUIZ && subjectInfo.hintImgYn) {
            // 퍼블리싱 요구사항 - hint 영역이 표시될 경우 skp_container 영역에 add_space 클래스 추가
            $("#skp_container").addClass("add_space");
        } else {
            $("#skp_container").removeClass("add_space");
        }

        $("#skp_container").html(subjectTmpl(subjectInfo));
        $("#foot_area").html(footerTmpl(subjectInfo));

        autosize($("textarea")); // 퍼블리싱. textarea 높이 자동조절
        goScrollTop();

        if (arEventInfo.eventLogicalType === AR_LOGICAL_TYPE_QUIZ || arEventInfo.subjectTargetMoveYn === TYPE_N) {
            // 문항 지정이동이 아닌 경우에만 3문항 남았습니다 출력 체크
            if (subjectList.length >= SUBJECT_END_ALERT_MAX_COUNT
                && viewSubjectIndex === (subjectList.length - SUBJECT_END_ALERT_POINT_COUNT)) {
                showEndAlertToast();
            }
        }
    };

    let getSingleSelectExampleSort = function () {
        let subjectInfo = subjectList[viewSubjectIndex];

        let sort;

        if (subjectInfo.exampleChoiceType === EXAMPLE_CHOICE_TYPE_OX) {
            sort = $(".ox_choose_box").find(".active").data("sort");
        } else if (subjectInfo.exampleChoiceType === EXAMPLE_CHOICE_TYPE_SCALE) {
            sort = $(".scaleRadio:checked").val() * 1;
        } else {
            sort = $(".exampleInput:checked").val() * 1;
        }

        return sort;
    };

    let showNormalToast = function (text) {
        showToast("customNormalToast", text);
    };

    let showEndAlertToast = function () {
        showToast("customAndAlertToast");
    };

    let showToast = function (className, text) {
        const toast = document.querySelector("." + className);

        clearTimeout(toastFadeoutTimer);
        clearTimeout(toastEndTimer);

        if (text) {
            $(".toast-text").text(text);
        }

        toast.classList.remove("inactive");
        toast.style.display = "";

        toastFadeoutTimer = setTimeout(function () {
            toast.classList.add("inactive");
        }, 3000);
        toastEndTimer = setTimeout(function () {
            toast.classList.remove("inactive");
            toast.style.display = "none";
            $("#toast-text").text("");
        }, 4000);
    };

    let showAnswerResultToast = function (isRight){
        const toast = document.querySelector(".comp_toast_wrap");

        $(".answerResultTrue").hide();
        $(".answerResultFalse").hide();

        if (isRight) {
            $(".answerResultTrue").show();
        } else {
            $(".answerResultFalse").show();
            if (arEventInfo.quizRetryYn === TYPE_N) {
                $(".answerRetryTxt").hide();
            }
        }

        toast.classList.remove("inactive");
        toast.style.display = "";

        setTimeout(function() {
            toast.classList.add("inactive");
        }, 1600);
        setTimeout(function() {
            toast.classList.remove("inactive");
            toast.style.display = "none";

            if (arEventInfo.quizRetryYn === TYPE_Y) {
                if ($(".subject-area").data("answerResult") === "Y") {
                    nextLevel();
                }
            } else {
                nextLevel();
            }
        }, 2200);   // 2600 -> 2200 으로 변경. 터치 영역 가림 문제
    };

    let showAnswerResultDetailModal = function (isRight, imgUrl){
        if(isRight === true){
            $(".answerYImage").prop("src", imgUrl);
            showModalPopup($(".quizAnswerYPopup-area"));
        }
        else{
            $(".answerNImage").prop("src", imgUrl);
            if (arEventInfo.quizRetryYn === TYPE_Y) {
                $(".customQuizRetryTitle").show();
            } else {
                $(".customQuizRetryTitle").hide();
            }

            showModalPopup($(".quizAnswerNPopup-area"));
        }
    };

    let showOverlayPopup = function (view){
        hideOverlayPopup();
        goScrollTop();
        // 퍼블리싱 요구사항 - overlay popup 노출시 body 영역에 scr_lock 클래스 추가
        $("body").addClass("scr_lock");
        view.show();
    };

    let hideOverlayPopup = function (){
        // 퍼블리싱 요구사항 - overlay popup 비노출시 body 영역에 scr_lock 클래스 제거
        $("body").removeClass("scr_lock");
        $(".full_overlay_page").hide();
    };

    let showModalPopup = function (view){
        hideModalPopup();
        // 퍼블리싱 요구사항 - modal popup 노출시 body 영역에 scr_lock 클래스 추가
        $("body").addClass("scr_lock");
        view.show();
    };

    let hideModalPopup = function (){
        // 퍼블리싱 요구사항 - modal popup 비노출시 body 영역에 scr_lock 클래스 제거
        $("body").removeClass("scr_lock");
        // view.closest(".skp_modal_popup").hide();
        $(".skp_modal_popup").hide();
    };

    let goScrollTop = function () {
        $("#scrollTop").focus();
        // $(window).scrollTop(0);
        var height = $("#scrollTop").offset();
        // console.log("scrollTop offset top : " + height.top);
        $("html, body").animate({scrollTop: height.top}, 400);
    };

    let endLoading = function (){
        $(".skp_loading").hide();
        $(".mainArea").show();
    };

    let answerChange = function (secretKey, Iv, data){
        // console.log("");
        // console.log("[aes128Decode] : [start]");
        // console.log("[secretKey] : " + secretKey);
        // console.log("[Iv] : " + Iv);
        // console.log("[data] : " + data);
        // console.log("");

        // [aes 디코딩 수행 실시 : cbc 모드]
        const cipher = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(secretKey), {
            iv: CryptoJS.enc.Utf8.parse(Iv), // [Enter IV (Optional) 지정 방식]
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC // [cbc 모드 선택]
        });

        // [인코딩 된 데이터 확인 실시]
        data = cipher.toString(CryptoJS.enc.Utf8);
        // console.log("");
        // console.log("[aes128Decode] : [decode]");
        // console.log("[data] : " + aes128DecodeData);
        // console.log("");

        return data;
    };

    let showErrorPopup = function (mentType) {
        if (!mentType) {
            mentType = "surveyErrorAlert";
        }

        let btnOpt = is.createCommonPopupBtnOpt(undefined, function () {
            goMain();
        });

        is.showCommonPopup(POPUP_TYPE_BTN_OK, mentType, btnOpt);
    };

    let goMain = function () {
        sessionStorage.clear();
        location.href = "/web-event/main.html" + "?eventId=" + eventId + "&isRedirect=true";
    };

    let init = function (){

        $(".skp_loading").show();
        $(".mainArea").hide();

        if (!surveyLogAttendId) {
            console.log("올바르지 않은 접근경로입니다.");
            showErrorPopup("surveyErrorAlert");
            return;
        }

        setTimeout(function () {
            searchSurveyList();
        }, 2000);
    };

    // back 처리 -- start
    history.pushState(null, document.title, location.href);  // push
    window.addEventListener("popstate", function(event) {    //  뒤로가기 이벤트 등록
        // 특정 페이지로 가고싶다면 location.href = '';
        let okCallback = function (){
            goMain();
        };

        let cancelCallback = function (){
            history.pushState(null, document.title, location.href);
        };

        let btnOkOpt = is.createCommonPopupBtnOpt("나가기", okCallback);
        let btnCancelOpt = is.createCommonPopupBtnOpt(undefined, cancelCallback);

        is.showCommonPopup(POPUP_TYPE_BTN_CANCEL_OK, "surveyBackAlert", btnOkOpt, btnCancelOpt);
    });
    // back 처리 -- end

    $(document).on("click", "#btn_ok_next", function () {
        if (arEventInfo.eventLogicalType === AR_LOGICAL_TYPE_QUIZ) {
            checkAnswer();
        } else {
            nextLevel();
        }
    });

    $(document).on("change", ".exampleInput", function (){
        let $this = $(this);
        let checkedExampleInputList = $(".exampleInput:checked");

        if(!checkedExampleInputList || checkedExampleInputList.length === 0){
            $("#btn_ok_next").prop("disabled", true);
        }
        else{
            $("#btn_ok_next").prop("disabled", false);
        }

        // let surveySubjectId = $this.closest(".subject-area").data("surveySubjectId");

        let subjectInfo = subjectList[viewSubjectIndex];

        if (arEventInfo.eventLogicalType !== AR_LOGICAL_TYPE_QUIZ && subjectInfo.multipleAnswerYn === TYPE_Y) {
            if(checkedExampleInputList.length > subjectInfo.multipleAnswerCount){
                //최대 2개만 선택 가능합니다
                showNormalToast("최대 " + subjectInfo.multipleAnswerCount + "개만 선택 가능합니다");
                $this.prop("checked", false);
            }
        }
    });

    $(document).on("click", ".subjectPopupImgList-show", function (){
        let popupImgList = subjectList[viewSubjectIndex].popupImageInfo;
        if(!popupImgList){
            return;
        }

        $(".subjectPopupImg-area").html(subjectPopupImgTmpl(popupImgList));

        new Swiper(".sw_img_gal", {
            pagination: {
                el: ".swiper-pagination",
            },
            resistanceRatio: 0,
        });

        showModalPopup($(".subjectPopupImgList-area"));
    });

    $(document).on("click", ".modalPopup-close", function () {
        hideModalPopup();

        if ($(this).hasClass("hintClose") || $(this).hasClass("popupImgClose")) {
            return;
        }

        if (arEventInfo.eventLogicalType === AR_LOGICAL_TYPE_QUIZ && arEventInfo.quizRetryYn === TYPE_Y) {
            if ($(".subject-area").data("answerResult") === "Y") {
                nextLevel();
            } else {
                return;
            }
        } else {
            nextLevel();
        }
    });

    $(document).on("click", ".surveyComplete", function () {
        goMain();
    });

    $(document).on("click", ".surveyPrize", function () {
        winningProcess($(".surveyPrize").data("surveySubjectCategoryId"));
        if (winningProcessStatus === PROCESS_STATUS_AFTER) {
            showPrizePopup();
        }
    });

    $(document).on("click", ".hintBtn", function(){
        $(".hintImg").prop("src", subjectList[viewSubjectIndex].hintImgUrl);
        showModalPopup($(".hintPopup-area"));
    });

    $(document).on("click", ".btn_ox", function (){
        let $this = $(this);

        $(".btn_o").removeClass("active");
        $(".btn_o").removeClass("dimmed");
        $(".btn_x").removeClass("active");
        $(".btn_x").removeClass("dimmed");

        if($this.hasClass("btn_o")){
            // O 선택
            $(".btn_o").addClass("active");
            $(".btn_x").addClass("dimmed");
        }
        else{
            // X 선택
            $(".btn_o").addClass("dimmed");
            $(".btn_x").addClass("active");
        }

        $("#btn_ok_next").prop("disabled", false);
    });

    $(document).on("change", ".scaleRadio", function () {
        $("#btn_ok_next").prop("disabled", false);
    });

    $(document).on("focus", ".customTextareaInput", function(){
        // 퍼블리싱 요청사항 : textarea에서 입력 완료 후에는 done 클래스 추가 (다시 해당 영역에 터치하여 native keyboard layout 노출 시 반대로 클래스 제거)
        // console.log("focus");

        let $this = $(this);
        $this.removeClass("done");

        // textarea 영역 focus 적용 - 퍼블리싱
        $this.closest(".customTextareaDiv").addClass("focus");
    });

    $(document).on("focusout", ".customTextareaInput", function(){
        // 퍼블리싱 요청사항 : textarea에서 입력 완료 후에는 done 클래스 추가 (다시 해당 영역에 터치하여 native keyboard layout 노출 시 반대로 클래스 제거)
        // console.log("focusout");

        let $this = $(this);
        $this.addClass("done");

        // textarea 영역 focus 적용 해제 - 퍼블리싱
        $this.closest(".customTextareaDiv").removeClass("focus");
    });

    $(document).on("keyup", ".customTextareaInput", function () {
        let $this = $(this);
        let value = $this.val();
        let length = value.length;

        if(!$this.closest(".customTextareaDiv").hasClass("no_count_type")) {
            $this.closest(".customTextareaDiv").find(".count").find("em").text(length);
        }

        if($this.hasClass("questionAnswer")) {
            if (length > 0) {
                $("#btn_ok_next").prop("disabled", false);
            } else {
                $("#btn_ok_next").prop("disabled", true);
            }
        }
    });

    $(document).on("click", ".prizePopupBtn", function () {
        hideModalPopup();
        showOverlayPopup($(".surveyComplete-area"));
        if (winningProcessData.winningInfo.autoWinningYn === TYPE_Y) {
            // 자동당첨 CASE
            return;
        }

        if (winningProcessData.winningButtonInfo[0].buttonActionType === WINNING_BUTTON_ACTION_TYPE_DELIVERY
            || winningProcessData.winningButtonInfo[0].buttonActionType === WINNING_BUTTON_ACTION_TYPE_SUBSCRIPTION) {
            const eventWinningData = {};
            eventWinningData.eventId = eventId;
            eventWinningData.arEventWinningId = winningProcessData.winningInfo.arEventWinningId;
            eventWinningData.arEventWinningButtonId = winningProcessData.winningButtonInfo[0].arEventWinningButtonId;
            eventWinningData.eventLogWinningId = winningProcessData.eventLogWinningId;

            console.log("eventWinningData : " + JSON.stringify(eventWinningData));
            sessionStorage.setItem("eventWinningData", JSON.stringify(eventWinningData));

            let url = "/web-event/give-away.html";
            parent.open(url, "_blank");
        }
    });

    $(document).on("click", ".attendTargetCheck", function () {
        checkAttendTargetPossible();
    });

    $(document).on("click", ".attendTargetClose", function (){
        goMain();
    });

    $(document).ready(function () {
        init();
    });

}(jQuery, window, document));
