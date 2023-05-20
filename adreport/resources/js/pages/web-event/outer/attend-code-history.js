/*
 * ADReport Mobile
 * common javascript file
 * License: SK planet wholly owned
 */
(function ($, window, document, undefined) {
    
    var attendCodeHistoryTemplate = Handlebars.compile($("#attendCodeHistoryTemplate").html());
    const qs = is.parseQuery();
    const eventId = qs.eventId;

    var _searchAttendCodeHistory = function () {
        const attendCode = $.getValueById('attendCode');
        if (!eventId) {
            alert('이벤트ID가 없습니다.');
            return;
        }
        if (!attendCode) {
            alert('검색할 참여코드를 입력하세요.');
            return;
        }
        //접속통계 시작
        var url = '/api/v1/web-event-history/attend-code/' + attendCode + '/event-id/' + eventId;

        $.ajax({
            url : url,
            // data: JSON.stringify(params),
            method : "GET",
            contentType: "application/json;charset=UTF-8"
        }).done(function(res, textStatus, xhr) {
            console.log(">> " , res);
            if (res.resultCode === 200) {
                $("#attendCodeHistoryTable").remove();

                var result = res.result;
                console.log('result: ', result);
                $("#attendCodeHistoryView").html(attendCodeHistoryTemplate(result));
            }
        }) .fail(function(error){
            console.log(">> " + error);
        });
        //접속통계 끝

    };

    $(document).on('click', '#searchBtn', function() {
        _searchAttendCodeHistory();
    });
}(jQuery, window, document));
