if (!window.is) { window.is = {}; }
( function( $, window, document, undefined ) {
    var qs = is.parseQuery();

    var searchReport = function (inputData, callback, errorCallback) {
        $.ajax({
            url: "/api/reporting/reportList",
            data: JSON.stringify(inputData),
            method: "POST",
            contentType: "application/json"
        }).done(function (result) {
            if (result.resultCode === "200") {
                if (callback) {
                    callback(result.data);
                }
                if(qs.channelType && inputData.channelType){
                    if (inputData.channelType === qs.channelType) {
                        is.viewReportingMain(result.data);
                    }
                }

            } else {
                if (errorCallback) {
                    errorCallback(result);
                }
            }
        }).fail(function () {
            errorCallback(null);
        });
    };

    var getSearchReportParams = function (mdn, marketingId, channelType) {
        var params = {};
        params.mdn = mdn;
        params.marketingId = marketingId;
        params.channelType = channelType;
        params.realServiceEndDate = qs.realServiceEndDate;

        return params;
    };

    var applyAdvertise = function(inputData, callback, errorCallback) {

        $.ajax({
            url: "/api/reporting/apply",
            data: JSON.stringify(inputData),
            method: "POST",
            contentType: "application/json"
        }).done(function (result) {
            if (result.resultCode === "200") {
                if (callback) {
                    callback(result.data);
                }
            } else {
                if (errorCallback) {
                    errorCallback(result);
                } else {
                    alert(result.resultMessage);
                }
            }
        }).fail(function () {
            alert("광고가 신청되지 않았습니다. 잠시후 재신청 부탁드립니다.");
            if (errorCallback) {
                errorCallback();
            }
        });
    };

    var calcChartYNumber4Round = function (num) {
        return calcChartYNumber(num, false);
    };
    var calcChartYNumber4Ceil = function (num) {
        return calcChartYNumber(num, true);
    };

    var calcChartYNumber = function(num, isCeil) {

        var unitNum = (num + "").length - 2;
        if (unitNum <= 0) {
            //return num;
            unitNum = 1;
        }

        var powNum = Math.pow(10, unitNum);
        var tmp_num1 = num / powNum;
        var result = isCeil ? Math.ceil(tmp_num1) : Math.round(tmp_num1);
        result = result * (Math.pow(10, unitNum));

        return result;
    };

    window.chartData = {};
    var addChartData = function(chartName, chartContext, chartConfig) {
        setChartData(chartName, chartContext, chartConfig, false);
    };

    var setChartData = function(chartName, chartContext, chartConfig, isCreated) {
        if (chartName) {
            var chartInfo = {
                "chartName": chartName,
                "chartContext" : chartContext,
                "chartConfig" : chartConfig,
                "isCreated" : isCreated
            };
            chartData[chartName] = chartInfo;
        }
    };

    var getChartData = function(chartName) {
        return chartData[chartName];
    };

    var chartUpdate = function($chartDiv) {
        var $canvas = $chartDiv.find("canvas");
        var $legend = $chartDiv.find(".legend");
        var chartName = is.getChartName($canvas);
        var chartData = getChartData(chartName);

        if (chartData && chartData.isCreated === false) {
            setChartData(chartName, chartData.chartContext, chartData.chartConfig, true);

            var chartObj = new Chart(chartData.chartContext, chartData.chartConfig);
            //chartObj.update();

            $chartDiv.addClass("on");
            if ($legend) {
                $legend.html(chartObj.generateLegend());
            }
        }
    };

    var setChartName = function($canvas, chartName) {
        if (!$canvas) {
            return;
        }
        $canvas.closest("div.chart").data("chartname", chartName);
    };

    var getChartName = function($canvas) {
        if (!$canvas) {
            return "";
        }
        return $canvas.closest("div.chart").data("chartname");
    };

    var failNoti = function(result) {
        if (result && result.resultMessage) {
            alert(result.resultMessage);
        } else {
            alert("잠시후 다시 시도하세요.");
        }
    };

    is.calcChartYNumber4Round = calcChartYNumber4Round;
    is.calcChartYNumber4Ceil = calcChartYNumber4Ceil;
    is.searchReport = searchReport;
    is.getSearchReportParams = getSearchReportParams;

    is.applyAdvertise = applyAdvertise;

    is.addChartData = addChartData;
    is.chartUpdate = chartUpdate;
    is.setChartName = setChartName;
    is.getChartName = getChartName;
    is.failNoti = failNoti;

}( jQuery, window, document ));
