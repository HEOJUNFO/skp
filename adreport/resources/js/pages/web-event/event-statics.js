/*
 * ADReport Mobile
 * common javascript file
 * License: SK planet wholly owned
 */
(function ($, window, document, undefined) {
    
    var connectionStaticsTemplate = Handlebars.compile($("#connectionStaticsTemplate").html());
    var performanceStaticsTemplate = Handlebars.compile($("#performanceStaticsTemplate").html());
    var hourlyStaticsTemplate = Handlebars.compile($("#hourlyStaticsTemplate").html());
    var subscriptionPerformanceTemplate = Handlebars.compile($("#subscriptionPerformanceStaticsTemplate").html());
    var nftRepositoryTemplate = Handlebars.compile($("#nftRepositortyTemplate").html());
    var connectionSurveyStaticsTemplate = Handlebars.compile($("#connectionSurveyStaticsTemplate").html());
    var connectionStaticsTargetGenderTemplate = Handlebars.compile($("#connectionStaticsTargetGenderTemplate").html());
    var connectionStaticsTargetAgeTemplate = Handlebars.compile($("#connectionStaticsTargetAgeTemplate").html());

    const qs = is.parseQuery();

    let isNftEvent = false;
    let isSubscriptionEvent = false;
    let eventType = "";
    
    const eventId = qs.eventId;
    const $loading = $("#progrssSection");
    
    //이벤트아이디 출력
    if (eventId) {
        $.innerText("#eventIdEm", eventId);
    }
    //달력구현
    $.initDatePicker("#datepicker");

    //nft 이벤트인지 확인하는 함수
    const _checkSubscriptionNft = function(eventId) {
        const apiUrl = "/api/v1/web-event-front/check/subscription-nft/" + eventId;
        is.getFetch(apiUrl, _checkSubscriptionNftCallback);
    };

    //nft 이벤트인지 확인하는 함수 콜백
    const _checkSubscriptionNftCallback = function(resultObj) {
        if (resultObj) {
            const resultCode = resultObj.resultCode;
            //결과 코드가 정상이면
            if (resultCode === 200) {
                //결과값
                const result = resultObj.result;
                //응모형인지
                if (result.isSubscription) {
                    isSubscriptionEvent = result.isSubscription;
                }
                //NFT 이벤트인지
                if (result.isNft) {
                    isNftEvent = result.isNft;
                }
                //이벤트 종류 (AR, SURVEY, ...)
                eventType = result.eventType;
            } else {
                //결과 코드가 200 이 아니면 에러 팝업 
                $.commonError("alertPopup", "alertPopupTitle", "alertPopupContents");
            }
        }
    };

    //통계 API 함수
    const _allStatics = function(params) {
        const apiUrl = "/api/v1/web-event-front/statics/all";
        is.postFetchLoading(apiUrl, params, $loading, _allStaticsCallback);
    };

    //통계 API 콜백 함수
    const _allStaticsCallback = function(resultObj) {
        //console.log('resultObj: ', resultObj);
        const resultCode = resultObj.resultCode;
        
        if (resultCode === 200) {
            const result = resultObj.result;
            //접속통계
            let connectionStatics = result.connectionStatics;
            if (connectionStatics) {
                $.showElement("#connectionTitleDiv");
                //AR일때
                if (eventType === is.eventType.AR) {
                    $.removeElement("#connectionTable");

                    $.showElement("#connectionTableView");
                    $("#connectionTableView").html(connectionStaticsTemplate(connectionStatics.result));
                }
                //서베이고일때
                if (eventType === is.eventType.SURVEY) {
                    $.removeElement("#connectionSurveyTable");

                    $.showElement("#connectionSurveyTableView");
                    $("#connectionSurveyTableView").html(connectionSurveyStaticsTemplate(connectionStatics.result));
                }
            }

            if (eventType === is.eventType.SURVEY) {
                //접속통계(목표달성수 기준) - 성별
                let genderTargetStatics = result.surveyGenderConnectionStatics;
                if (genderTargetStatics) {
                    $.removeElement("#connectionTargetTable");

                    $.showElement("#connectionTargetDiv");
                    $.showElement("#connectionTargetTableView");
                    $("#connectionTargetTableView").html(connectionStaticsTargetGenderTemplate(genderTargetStatics.result));
                }
                //접속통계(목표달성수 기준) - 연령별
                let ageTargetStatics = result.surveyAgeConnectionStatics;
                if (ageTargetStatics) {
                    $.removeElement("#connectionTargetAgeTable");

                    $.showElement("#connectionTargetAgeDiv");
                    $.showElement("#connectionTargetAgeTableView");
                    $("#connectionTargetAgeTableView").html(connectionStaticsTargetAgeTemplate(ageTargetStatics.result));
                }
            }

            //실적통계(당첨)
            let performanceStatics = result.performanceStatics;
            if (performanceStatics) {
                $.removeElement("#performanceStaticsTable");
                $.showElement("#performanceTitleDiv");

                $("#performanceStaticsTableView").html(performanceStaticsTemplate(performanceStatics.result));
            }
            // //실적통계(응모)
            let performanceSubscriptionStatics = result.performanceSubscriptionStatics;
            if (performanceSubscriptionStatics) {
                if (isSubscriptionEvent) {
                    $.removeElement("#subscriptionPerformanceStaticsTable");
                    $.showElement("#subscriptionPerformanceStaticsTable");
                    $.showElement("#subscriptionPerformanceTitleDiv");
                    $("#subscriptionPerformanceTableView").html(subscriptionPerformanceTemplate(performanceSubscriptionStatics.result));
                }
            }
            // //NFT 보관함 통계
            let nftRepositoryStatics = result.nftRepositoryStatics;
            if (nftRepositoryStatics) {
                if (isNftEvent) {
                    $.removeElement("#nftRepositortyTable");
                    $.showElement("#nftRepositoryDiv");
                    $.showElement("#nftRepositortyTitleDiv");
                    $("#nftRepositortyTableView").html(nftRepositoryTemplate(nftRepositoryStatics.result));
                }
            }
            //시간별 통계
            let hourlyStatics = result.hourlyStatics;
            if (hourlyStatics) {
                $.removeElement("#hourlyStaticsTable");
                $.showElement("#hourlyTitleDiv");
                $("#hourlyStaticsTableView").html(hourlyStaticsTemplate(hourlyStatics.result));
            }
        } else {
            //결과 코드가 200 이 아니면 에러 팝업 
            $.commonError("alertPopup", "alertPopupTitle", "alertPopupContents");
        }
        
    };

    //검색버튼
    $(document).on("click", "#searchBtn", function() {
        const searchDay = $.getValueById("datepicker");
        const params = {
            eventId : eventId,
            searchDay : searchDay
        };
        _allStatics(params);
    });

    //nft 이벤트인지 확인
    _checkSubscriptionNft(eventId);

}(jQuery, window, document));
