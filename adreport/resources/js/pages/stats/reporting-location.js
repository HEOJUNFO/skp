/*
 * ADReport Mobile
 * common javascript file
 * License: SK planet wholly owned
 */
(function ($, window, document, undefined) {
    var qs = is.parseQuery();
    var VAL_CHANNEL_TYPE_LOCATION = 'BLE';

    var initLocation = function () {
        var params = is.getSearchReportParams(qs.mdn, qs.marketingId, VAL_CHANNEL_TYPE_LOCATION);
        is.searchReport(params, locationDataCallback, locationDataErrorCallback);
    };

    var locationDataCallback = function (resultData) {
        console.log("data...................BLE", resultData);

        if (!resultData || !resultData.list || resultData.list.length <= 0) {
            $("#locationAllArea").hide();
            is.viewTmplNodata($("#locationNoData"), VAL_CHANNEL_TYPE_LOCATION);
            return;
        }

        var locationData = resultData.list[0];
        is.viewImg4Main($("#locationImg"), locationData.contractInfo.adreportImgUrl, VAL_CHANNEL_TYPE_LOCATION);
        is.initTmplImgPopup($("#locationPopup"), locationData.contractInfo.marketingId, VAL_CHANNEL_TYPE_LOCATION);

        is.setFirstSumStat($("#locationSum"), locationData);
        is.setFirstDaliyStat($("#locationDaily"), locationData);
        is.setFirstMonthStat($("#locationMonth"), locationData);
        is.viewTmplTrend($("#locationTrend"), locationData);

    };

    var locationDataErrorCallback = function (result) {
        // 이곳에서 에러 처리
        if(result){
            //
        }
        else{
            //
        }
    };


    $(document).ready(function () {

    });

    is.initLocation = initLocation;

}(jQuery, window, document));