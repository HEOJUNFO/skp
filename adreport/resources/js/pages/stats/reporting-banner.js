/*
 * ADReport Mobile
 * common javascript file
 * License: SK planet wholly owned
 */
(function ($, window, document, undefined) {
    var qs = is.parseQuery();
    var VAL_CHANNEL_TYPE_BANNER = 'DFP';


    var initBanner = function () {
        var params = is.getSearchReportParams(qs.mdn, qs.marketingId, VAL_CHANNEL_TYPE_BANNER);
        is.searchReport(params, bannerDataCallback, bannerDataErrorCallback);
    };

    var bannerDataCallback = function (resultData) {

        console.log("data...................DFP", resultData);

        if (!resultData || !resultData.list || resultData.list.length <= 0) {
            $("#bannerAllArea").hide();
            is.viewTmplNodata($("#bannerNoData"), VAL_CHANNEL_TYPE_BANNER);
            return;
        }

        var bannerData = resultData.list[0];
        is.viewImg4Main($("#bannerImg"), bannerData.contractInfo.adreportImgUrl, VAL_CHANNEL_TYPE_BANNER);
        is.initTmplImgPopup($("#bannerPopup"), bannerData.contractInfo.marketingId, VAL_CHANNEL_TYPE_BANNER);

        is.setFirstSumStat($("#bannerSum"), bannerData);
        is.setFirstDaliyStat($("#bannerDaily"), bannerData);
        is.setFirstMonthStat($("#bannerMonth"), bannerData);
    };

    var bannerDataErrorCallback = function (result) {
        // 이곳에서 에러 처리
        if(result){

        }
        else{

        }
    };


    $(document).ready(function () {

    });

    is.initBanner = initBanner;

}(jQuery, window, document));