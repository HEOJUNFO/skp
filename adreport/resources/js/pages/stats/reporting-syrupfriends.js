/*
 * ADReport Mobile
 * common javascript file
 * License: SK planet wholly owned
 */
(function ($, window, document, undefined) {
    var qs = is.parseQuery();
    var gradient_line;
    var CURPAGE = 0;
    var REPORTDATE;
    var syrupFriendsAllAreaTemplate = Handlebars.compile($("#syrupFriendsAllAreaTemplate").html());
    var syrupFriendsCounponStatListTemplate = Handlebars.compile($("#syrupFriendsCounponStatListTemplate").html());

    var initSyrupFriends = function () {
        var params = $.extend(qs, {
            mid : qs.advertiserMid,
            reportDate : qs.realServiceEndDate.substr(0, 6)
        });

        $.ajax({
            url: "/api/sf/report",
            data: JSON.stringify(params),
            method: "POST",
            contentType: "application/json"
        }).done(function (result) {
            if (result.resultCode === "200") {
                if (!result.data || !result.data.midInfo) {
                    is.viewTmplSyrupFriendsNodata($("#syrupFriendsNodata"));
                } else {
                    REPORTDATE = result.data.salesInfo.reportDate;
                    setDataSF(result.data);
                    displayChart(result.data);
                    searchCounponStatList();
                }
            } else {
                is.viewTmplSyrupFriendsNodata($("#syrupFriendsNodata"));
            }
        }).fail(function () {
            is.viewTmplSyrupFriendsNodata($("#syrupFriendsNodata"));
            return;
        });
    };

    $(document.body).on("click", ".SFCouponMoreBtn", function (e) {
        e.preventDefault();
        searchCounponStatList();
    });

    var searchCounponStatList = function () {
        CURPAGE++;
        var params = {
            mid: qs.advertiserMid,
            size: "3",
            reportDate: REPORTDATE,
            page: CURPAGE + ""
        };

        $.ajax({
            url: "/api/sf/couponMore",
            data: JSON.stringify(params),
            method: "POST",
            contentType: "application/json"
        }).done(function (result) {
            if (result.resultCode === "200") {
                if (params.page !== 1) {
                    if (!result.data.statInfo.statList || result.data.statInfo.statList.length <= 0) {
                        $("#SFCouponMoreView").hide();
                        return;
                    }
                }

                $("#SFCouponMoreView").show();

                var $couponInfoStatListView = $("#couponInfoStatListView");
                $couponInfoStatListView.append(syrupFriendsCounponStatListTemplate(result.data));

                var $rowViewList = $(".coupontStatRowView");
                if(result.data.statInfo.totalCount <= $rowViewList.length) {
                    $("#SFCouponMoreView").hide();
                }
            } else {
                is.failNoti(result);
            }
        }).fail(is.failNoti);
    };

    var setDataSF = function (data) {
        var $syrupFriendsAllArea = $("#syrupFriendsAllArea");
        $syrupFriendsAllArea.html(syrupFriendsAllAreaTemplate(data));
        $syrupFriendsAllArea.show();
    };

    var displayChart = function(data) {
        data.advertiserMid = qs.advertiserMid;
        data.contPlcName = qs.contPlcName;
        data.applyDate = is.getToday();

        // 시럽 프렌즈
        var canvas_savepoint_line = $("#canvas_savepoint_line");
        var canvas_saveclient_line = $("#canvas_saveclient_line");
        var ctx_savepoint_line = canvas_savepoint_line.get(0).getContext("2d");
        var ctx_saveclient_line = canvas_saveclient_line.get(0).getContext("2d");

        gradient_line = ctx_savepoint_line.createLinearGradient(line_x1, 0, line_y1, 0);
        gradient_line.addColorStop(0, start_gradation_line); // 도넛 상단
        gradient_line.addColorStop(0.7, mid_gradation_line);
        gradient_line.addColorStop(1, end_gradation_line); // 도넛 하단

        //var chartsavepointLine = new Chart(ctx_savepoint_line, get_config_savepoint_line());
        //$("#canvas_savepoint_line").closest("div.chart").addClass("on");

        is.setChartName(canvas_savepoint_line, "SF_canvas_savepoint_line");
        is.addChartData(is.getChartName(canvas_savepoint_line), ctx_savepoint_line, get_config_savepoint_line(data));


        //var chartsaveclientLine = new Chart(ctx_saveclient_line, get_config_saveclient_line()); //bar
        //$("#canvas_saveclient_line").closest("div.chart").addClass("on");

        is.setChartName(canvas_saveclient_line, "SF_canvas_saveclient_line");
        is.addChartData(is.getChartName(canvas_saveclient_line), ctx_saveclient_line, get_config_saveclient_line(data));
    };

    var get_config_savepoint_line = function(data) {
        // 시럽프렌즈 월간 신규고객

        var labels = [], countData = [];
        var max = 0, stepSize, total = 0, listSize = data.salesInfo.newCustomerInfo.statList.length;

        $.each(data.salesInfo.newCustomerInfo.statList, function (index, item) {
            labels.push(is.mmHan(item.reportDate));
            countData.push(item.count);
        });

        var maxTicksLimit = 4;
        max = is.calcChartYNumber4Ceil(max);
        stepSize = is.calcChartYNumber4Round(max / maxTicksLimit);
        max += stepSize;

        var config_savepoint_line = {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    data: countData,
                    pointRadius: [Chart.defaults.global.defaultLinepointRadius, Chart.defaults.global.defaultLinepointRadius, Chart.defaults.global.defaultLinepointRadius], //포인트서클
                    lineTension: 0, //곡률
                    borderColor: gradient_line,
                    backgroundColor: Chart.defaults.global.defaultLinebackgroundColor,
                    pointBorderColor: Chart.defaults.global.defaultLineborderColor,
                    pointBackgroundColor: Chart.defaults.global.defaultLinepointBackgroundColor,
                    borderWidth: Chart.defaults.global.defaultLineborderWidth, //그래프 라인 두께
                    pointBorderWidth: Chart.defaults.global.defaultLinepointBorderWidth
                }]
            },
            options: {
                showAllTooltips: true, // call plugin we created
                maintainAspectRatio: false,
                responsive: true,
                legend: false, //범례보기
                scales: {//축
                    yAxes: [{
                        ticks: {
                            beginAtZero: true, // 0값 부터 시작
                            fontColor: Chart.defaults.scale.ticks.fontColor2,
                            fontSize: Chart.defaults.global.defaultLineyfontSize,
/*
                            min: 400, // 그래프 최소값
                            max: 1000, // 그래프 최대값
*/
                            stepSize: stepSize, //척도의 간격 크기
                            maxTicksLimit: maxTicksLimit + 1, // 4개로 나눠서 보여짐  (0, 2000, 4000, 6000)
                            padding: Chart.defaults.global.defaultLinePadding, //축과 그래프 영역 사이 여백
                            callback:function(value, index) {
                                if (index === 0) {
                                    return value;
                                }
                                if (0 === value) {
                                    return "(명)";
                                }
                                if (0 === value % 1) {
                                    return value;
                                }
                                return "";
                            }
                        },
                        gridLines: {
                            display:true,
                            color: [Chart.defaults.scale.gridLines.color_line, Chart.defaults.scale.gridLines.color_line, Chart.defaults.scale.gridLines.color_line, Chart.defaults.scale.gridLines.color_line],
                            zeroLineColor: Chart.defaults.scale.gridLines.color_line,
                            drawBorder: false
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            categoryPercentage : Chart.defaults.global.defaultBarcategoryPercentage, // 0~1 사이 소수점
                            barPercentage: Chart.defaults.global.defaultBarbarPercentage, // 0~1 사이 소수점
                            fontSize: Chart.defaults.global.defaultLinexfontSize,
                            fontColor: Chart.defaults.scale.ticks.fontColor
                        },
                        gridLines: {
                            display:false,
                            color: Chart.defaults.scale.gridLines.color
                        },
                        barPercentage:0.5,
                        categoryPercentage:0.55,
                        barThickness:25
                    }]
                },
                tooltips: {
                    caretPadding: Chart.defaults.global.tooltips.caretPadding - 6,
                    callbacks: {
                        title: function(tooltipItems, data) {
                            return "";
                        },
                        label: function(tooltipItem, data) {
                            try {
                                var val = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                                val=val+'0000';
                                return val.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + '원';
                            } catch (e) {
                                return "";
                            }
                        }
                    },
                    filter: function (tooltipItem, data) {
                        return false;
                    }
                }
            }
        };

        return config_savepoint_line;
    };

    var get_config_saveclient_line = function(data) {
        // 시럽프렌즈 월간 적립고객수

        var labels = [], countData = [];
        var max = 0, stepSize, total = 0, listSize = data.salesInfo.newCustomerInfo.statList.length;

        $.each(data.salesInfo.issuedCustomerInfo.statList, function (index, item) {
            labels.push(is.mmHan(item.reportDate));
            countData.push(item.count);
        });

        var maxTicksLimit = 4;
        max = is.calcChartYNumber4Ceil(max);
        stepSize = is.calcChartYNumber4Round(max / maxTicksLimit);
        max += stepSize;

        var config_saveclient_line = {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    data: countData,
                    pointRadius: [Chart.defaults.global.defaultLinepointRadius, Chart.defaults.global.defaultLinepointRadius, Chart.defaults.global.defaultLinepointRadius], //포인트서클
                    lineTension: 0, //곡률
                    borderColor: gradient_line,
                    backgroundColor: Chart.defaults.global.defaultLinebackgroundColor,
                    pointBorderColor: Chart.defaults.global.defaultLineborderColor,
                    pointBackgroundColor: Chart.defaults.global.defaultLinepointBackgroundColor,
                    borderWidth: Chart.defaults.global.defaultLineborderWidth, //그래프 라인 두께
                    pointBorderWidth: Chart.defaults.global.defaultLinepointBorderWidth
                }]
            },
            options: {
                showAllTooltips: true, // call plugin we created
                maintainAspectRatio: false,
                responsive: true,
                legend: false, //범례보기
                scales: {//축
                    yAxes: [{
                        ticks: {
                            beginAtZero: true, // 0값 부터 시작
                            fontColor: Chart.defaults.scale.ticks.fontColor2,
                            fontSize: Chart.defaults.global.defaultLineyfontSize,
/*
                            min: 400, // 그래프 최소값
                            max: 1000, // 그래프 최대값
*/
                            stepSize: stepSize, //척도의 간격 크기
                            maxTicksLimit: maxTicksLimit + 1, // 4개로 나눠서 보여짐  (0, 2000, 4000, 6000)
                            padding: Chart.defaults.global.defaultLinePadding, //축과 그래프 영역 사이 여백
                            callback:function(value, index) {
                                if (index === 0) {
                                    return value;
                                }
                                if (0 === value) {
                                    return "(명)";
                                }
                                if (0 === value % 1) {
                                    return value;
                                }
                                return "";
                            }
                        },
                        gridLines: {
                            display:true,
                            color: [Chart.defaults.scale.gridLines.color_line, Chart.defaults.scale.gridLines.color_line, Chart.defaults.scale.gridLines.color_line, Chart.defaults.scale.gridLines.color_line],
                            zeroLineColor: Chart.defaults.scale.gridLines.color_line,
                            drawBorder: false
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            categoryPercentage : Chart.defaults.global.defaultBarcategoryPercentage, // 0~1 사이 소수점
                            barPercentage: Chart.defaults.global.defaultBarbarPercentage, // 0~1 사이 소수점
                            fontSize: Chart.defaults.global.defaultLinexfontSize,
                            fontColor: Chart.defaults.scale.ticks.fontColor
                        },
                        gridLines: {
                            display:false,
                            color: Chart.defaults.scale.gridLines.color
                        },
                        barPercentage:0.5,
                        categoryPercentage:0.55,
                        barThickness:25
                    }]
                },
                tooltips: {
                    caretPadding: Chart.defaults.global.tooltips.caretPadding - 6,
                    callbacks: {
                        title: function(tooltipItems, data) {
                            return "";
                        },
                        label: function(tooltipItem, data) {
                            try {
                                var val = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                                val=val+'0000';
                                return val.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + '원';
                            } catch (e) {
                                return "";
                            }
                        }
                    },
                    filter: function (tooltipItem, data) {
                        return false;
                    }
                }
            }
        };

        return config_saveclient_line;
    };

    $(document).ready(function () {
    });

    is.initSyrupFriends = initSyrupFriends;

}(jQuery, window, document));