/*
 * ADReport Mobile
 * common javascript file
 * License: SK planet wholly owned
 */
(function ($, window, document, undefined) {
    var qs = is.parseQuery();
    var VAL_CHANNEL_TYPE_PUSH = 'SP';


    var initPush = function () {
        var params = is.getSearchReportParams(qs.mdn, qs.marketingId, VAL_CHANNEL_TYPE_PUSH);
        is.searchReport(params, pushDataCallback, pushDataErrorCallback);
    };

    var pushDataCallback = function (resultData) {

        console.log("data...................push", resultData);

        if (!resultData || !resultData.list || resultData.list.length <= 0) {
            $("#pushAllArea").hide();
            is.viewTmplNodata($("#pushNoData"), VAL_CHANNEL_TYPE_PUSH);
            return;
        }

        var pushData = resultData.list[0];
        is.viewImg4Main($("#pushImg"), pushData.contractInfo.adreportImgUrl, VAL_CHANNEL_TYPE_PUSH);
        is.initTmplImgPopup($("#pushPopup"), pushData.contractInfo.marketingId, VAL_CHANNEL_TYPE_PUSH);

        is.setFirstSumStat($("#pushSum"), pushData);
        is.setFirstDaliyStat($("#pushDaily"), pushData);
        is.setFirstMonthStat($("#pushMonth"), pushData);
        is.viewTmplTrend($("#pushTrend"), pushData);
    };

    var pushDataErrorCallback = function (result) {
        // 이곳에서 에러 처리
        if(result){

        }
        else{

        }
    };


    $(document).ready(function () {

    });

    is.initPush = initPush;

}(jQuery, window, document));