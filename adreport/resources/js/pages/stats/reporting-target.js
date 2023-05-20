(function ($, window, document, undefined) {
    var qs = is.parseQuery();
    var targetTemplate = Handlebars.compile($("#targetTemplate").html());
    var gradient_visit, gradient_ad;

    var flagApply = false;
    $(document.body).on("click", ".adApplyTarget", function (e) {
        e.preventDefault();

        if (flagApply) {
            return;
        }

        var $this = $(this);
        var applyType = $this.data("applyType");
        var params = {
            channelType: applyType,
            contPlcName: qs.contPlcName,
            advertiserMid: qs.advertiserMid
        };
        flagApply = true;

        is.applyAdvertise(params,
            function (result) {
                flagApply = false;
                $this.hide();
                $this.next().show();
            },
            function (result) {
                //
                flagApply = false;
            }
        );
    });

    // 광고타겟 신청하기 클릭시 border space white 처리
    $(document.body).on("click", ".target .chart details summary", function (e) {
        $(this).parent().parent().next().addClass('white'); //border white 처리
    });

    var viewTargetReporting = function (targetReportDetailDto) {
        var $target = $(".target");

        if (!targetReportDetailDto) {
            return;
        }

        var liveAroundCustCnt = targetReportDetailDto.liveAroundCustCnt;
        var adClickCustCnt = targetReportDetailDto.adClickCustCnt;

        if ( (!liveAroundCustCnt || liveAroundCustCnt === "0") && (!adClickCustCnt || adClickCustCnt === "0")) {
            return;
        }

        targetReportDetailDto.advertiserMid = qs.advertiserMid;
        targetReportDetailDto.contPlcName = qs.contPlcName;
        targetReportDetailDto.applyDate = is.getToday();

        $target.html(targetTemplate(targetReportDetailDto));

        // 타겟
        // 방분 확률 높은 고객
        if (liveAroundCustCnt && liveAroundCustCnt !== "0") {
            var canvas_visit_doughnut = $("#canvas_visit_doughnut");
            var ctx_visit_doughnut = canvas_visit_doughnut.get(0).getContext("2d");

            gradient_visit = ctx_visit_doughnut.createLinearGradient(0, 0, doughnut_y2, 0);
            gradient_visit.addColorStop(0, start_gradation_visit); // 도넛 상단
            gradient_visit.addColorStop(0.7, mid_gradation_visit);
            gradient_visit.addColorStop(1, end_gradation_visit); // 도넛 하단

            //var chartvisitDoughnut = new Chart(ctx_visit_doughnut, get_config_visit_doughnut(liveAroundCustCnt));
            //$("#legend_visit_doughnut").html(chartvisitDoughnut.generateLegend());
            //$("#adreportTargetVisit").addClass("on");

            is.setChartName(canvas_visit_doughnut, "click_canvas_visit_doughnut");
            is.addChartData(is.getChartName(canvas_visit_doughnut), ctx_visit_doughnut, get_config_visit_doughnut(liveAroundCustCnt));

            $target.show();
        } else {
            $("#adreportTargetVisit").hide();
        }

        // 클릭 활률 높은 고객
        if (adClickCustCnt && adClickCustCnt !== "0") {
            var canvas_ad_doughnut = $("#canvas_ad_doughnut");
            var ctx_ad_doughnut = canvas_ad_doughnut.get(0).getContext("2d");

            gradient_ad = ctx_ad_doughnut.createLinearGradient(0, 0, doughnut_y2, 0);
            gradient_ad.addColorStop(0, start_gradation_ad); // 도넛 상단
            gradient_ad.addColorStop(0.7, mid_gradation_ad);
            gradient_ad.addColorStop(1, end_gradation_ad); // 도넛 하단

            //var chartadDoughnut = new Chart(ctx_ad_doughnut, get_config_ad_doughnut(adClickCustCnt));
            //$("#legend_ad_doughnut").html(chartadDoughnut.generateLegend());
            //$("#adreportTargetClick").addClass("on");

            is.setChartName(canvas_ad_doughnut, "click_canvas_ad_doughnut");
            is.addChartData(is.getChartName(canvas_ad_doughnut), ctx_ad_doughnut, get_config_ad_doughnut(adClickCustCnt));

            $target.show();
        } else {
            $("#adreportTargetClick").hide();
        }

        if (liveAroundCustCnt && liveAroundCustCnt !== "0" &&
            adClickCustCnt && adClickCustCnt !== "0"
        ) {
            $("#targetGubunSpace").show();
        }

    };

    var get_config_visit_doughnut = function(count) {
        // 광고 타겟고객 추출 방문 확률 높은 고객수
        var config_visit_doughnut = {
            type: 'doughnut',
            data: {
                labels: [count],
                datasets: [{
                    data: [count],
                    backgroundColor: [gradient_visit],
                    hoverBackgroundColor: [gradient_visit], //막대 터치시 컬러
                    borderWidth: 0//[0, 4, 4]
                }]
            },
            options: {
                showAllTooltips: true, // call plugin we created
                maintainAspectRatio: true,
                responsive: true,
                aspectRatio: Chart.defaults.global.defaultDoughnutaspectRatio, //도넛크기,
                cutoutPercentage: Chart.defaults.global.defaultDoughnutcutoutPercentage, //도넛안 화이트 서클 크기
                animation: {
                    animateRotate: true
                },
                tooltips: {
                    callbacks: {
                        title: function (tooltipItems, data) {
                            return "";
                        },
                        label: function (tooltipItem, data) {
                            return "";//차트위 노출 데이터
                        }
                    },
                    filter: function (tooltipItem, data) {
                        return true;
                    }
                },
                legend: {
                    display: false
                },
                legendCallback: function (chart) {
                    var div = document.createElement('div');
                    var fontColor = ad_font_color1;
                    chart.data.labels.forEach(function (label, index) {
                        label = label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                        div.innerHTML += `
							<span style="color:${fontColor}">
								${label}
							</span>
						`; // ^ ES6 Template String
                    });
                    return div.outerHTML;
                },
                plugins: {
                    datalabels: {
                        display: function (context) {
                            return false; // 비노출
                        }
                    }
                }
            }
        };
        return config_visit_doughnut;
    };

    var get_config_ad_doughnut = function(count) {
        // 광고 타겟고객 추출 광고 확인 확률 높은 고객수
        var config_ad_doughnut = {
            type: 'doughnut',
            data: {
                labels: [count],
                datasets: [{
                    data: [count],
                    backgroundColor: [gradient_ad],
                    hoverBackgroundColor: [gradient_ad], //막대 터치시 컬러
                    borderWidth: 0//[0, 4, 4]
                }]
            },
            options: {
                showAllTooltips: true, // call plugin we created
                maintainAspectRatio: true,
                responsive: true,
                aspectRatio: Chart.defaults.global.defaultDoughnutaspectRatio, //도넛크기,
                cutoutPercentage: Chart.defaults.global.defaultDoughnutcutoutPercentage, //도넛안 화이트 서클 크기
                animation: {
                    animateRotate: true
                },
                tooltips: {
                    callbacks: {
                        title: function (tooltipItems, data) {
                            return "";
                        },
                        label: function (tooltipItem, data) {
                            return "";//차트위 노출 데이터
                        }
                    },
                    filter: function (tooltipItem, data) {
                        return true;
                    }
                },
                legend: {
                    display: false
                },
                legendCallback: function (chart) {
                    var div = document.createElement('div');
                    var fontColor = ad_font_color2;
                    chart.data.labels.forEach(function (label, index) {
                        label = label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                        div.innerHTML += `
							<span style="color:${fontColor}">
								${label}
							</span>
						`; // ^ ES6 Template String
                    });
                    return div.outerHTML;
                },
                plugins: {
                    datalabels: {
                        display: function (context) {
                            return false; // 비노출
                        }
                    }
                }
            }
        };

        return config_ad_doughnut;
    };

    $(document).ready(function () {
    });

    is.viewTargetReporting = viewTargetReporting;

}(jQuery, window, document));