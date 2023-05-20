/*
 * ADReport Mobile
 * common javascript file
 * License: SK planet wholly owned
 */
(function ($, window, document, undefined) {
    var qs = is.parseQuery();
    var VAL_CHANNEL_TYPE_MOBILE = 'OP';


    var initMoblie = function () {
        var params = is.getSearchReportParams(qs.mdn, qs.marketingId, VAL_CHANNEL_TYPE_MOBILE);
        is.searchReport(params, mobileDataCallback, mobileDataErrorCallback);
    };

    var mobileDataCallback = function (data) {

        if (!data || !data.list || data.list.length == 0) {
            $("#mobileAllArea").hide();
            is.viewTmplNodata($("#mobileNoData"), VAL_CHANNEL_TYPE_MOBILE);
            return;
        }

        var mobileData = data.list[0];
        is.viewImg4Main($("#mobileImg"), mobileData.contractInfo.adreportImgUrl, VAL_CHANNEL_TYPE_MOBILE);
        is.initTmplImgPopup($("#mobilePopup"), mobileData.contractInfo.marketingId, VAL_CHANNEL_TYPE_MOBILE);

        is.setFirstSumStat($("#mobileSum"), mobileData);
        is.setFirstDaliyStat($("#mobileDaily"), mobileData);
        is.setFirstMonthStat($("#mobileMonth"), mobileData);
        is.viewTmplTrend($("#mobileTrend"), mobileData);


    };

    var mobileDataErrorCallback = function (data) {
        // 이곳에서 에러 처리
        if(data){

        }
        else{

        }
    };


    $(document).ready(function () {

    });

    is.initMobile = initMoblie;

}(jQuery, window, document));