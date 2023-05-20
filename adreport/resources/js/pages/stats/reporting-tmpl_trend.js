(function ($, window, document, undefined) {
    var trendTemplate = Handlebars.compile($("#trendTemplate").html());
    var gradient_gender, gradient_age, gradient_residence, gradient_product;

    var viewTmplTrend = function($viewTargetDiv, resultData) {
        if (!resultData) {
            return;
        }

        var reportDetail = resultData;
        if (!reportDetail.trendReportStatAll) {
            return;
        }

        var trendReportStatAllData = reportDetail.trendReportStatAll;
        var solutionCode = reportDetail.contractInfo ? reportDetail.contractInfo.solutionCode : "";
        var solutionName = is.getSolutionName(solutionCode);

        trendReportStatAllData.solutionName = solutionName;
        trendReportStatAllData.contPlcName = reportDetail.contractInfo.contPlcName;
        trendReportStatAllData.adreportContPlcName = reportDetail.contractInfo.adreportContPlcName;

        if (
            (!trendReportStatAllData.age || !trendReportStatAllData.age.stats || trendReportStatAllData.age.stats.length <= 0) &&
            (!trendReportStatAllData.gender || !trendReportStatAllData.gender.stats || trendReportStatAllData.gender.stats.length <= 0) &&
            (!trendReportStatAllData.live || !trendReportStatAllData.live.stats || trendReportStatAllData.live.stats.length <= 0) &&
            (!trendReportStatAllData.interest || !trendReportStatAllData.interest.stats || trendReportStatAllData.interest.stats.length <= 0)
        ) {
            return;
        }

        $viewTargetDiv.html(trendTemplate(trendReportStatAllData));

        // chart canvas
        var canvas_gender_doughnut = $viewTargetDiv.find(".canvas_gender_doughnut");
        var canvas_age_doughnut = $viewTargetDiv.find(".canvas_age_doughnut");
        var canvas_residence_bar = $viewTargetDiv.find(".canvas_residence_bar");
        var canvas_product_bar = $viewTargetDiv.find(".canvas_product_bar");

        // chart 구분을 위한 chartName data set
        is.setChartName(canvas_gender_doughnut, solutionCode + "canvas_gender_doughnut");
        is.setChartName(canvas_age_doughnut, solutionCode + "canvas_age_doughnut");
        is.setChartName(canvas_residence_bar, solutionCode + "canvas_residence_bar");
        is.setChartName(canvas_product_bar, solutionCode + "canvas_product_bar");

        // context 생성
        var ctx_gender_doughnut = canvas_gender_doughnut.get(0).getContext("2d");
        var ctx_age_doughnut = canvas_age_doughnut.get(0).getContext("2d");
        var ctx_residence_bar = canvas_residence_bar.get(0).getContext("2d");
        var ctx_product_bar = canvas_product_bar.get(0).getContext("2d");

        // 차트별 그라데이션 적용
        gradient_gender = ctx_gender_doughnut.createLinearGradient(0, 0, 0, doughnut_y);
        gradient_gender.addColorStop(0, start_gradation_age); // 도넛 상단
        gradient_gender.addColorStop(0.6, mid_gradation_age);
        gradient_gender.addColorStop(1, end_gradation_age); // 도넛 하단

        gradient_age = ctx_age_doughnut.createLinearGradient(0, 0, 0, doughnut_y);
        gradient_age.addColorStop(0, start_gradation_gender); // 도넛 상단
        gradient_age.addColorStop(0.6, mid_gradation_gender);
        gradient_age.addColorStop(1, end_gradation_gender); // 도넛 하단

        gradient_residence = ctx_residence_bar.createLinearGradient(0, 0, bar_y1, bar_y2);
        gradient_residence.addColorStop(0, start_gradation); // 세로막대 상단
        gradient_residence.addColorStop(0.8, mid_gradation);
        gradient_residence.addColorStop(1, end_gradation);

        gradient_product = ctx_product_bar.createLinearGradient(0, 0, bar_y1, bar_y2);
        gradient_product.addColorStop(0, start_gradation_product); // 세로막대 상단
        gradient_product.addColorStop(0.6, mid_gradation_product);
        gradient_product.addColorStop(1, end_gradation_product);

        var $divChart;
        var isShowPreChart = false;
        if (trendReportStatAllData.age && trendReportStatAllData.age.stats && trendReportStatAllData.age.stats.length > 0) {
            // var chartGenderdoughnut = new Chart(ctx_gender_doughnut, get_config_gender_doughnut(trendReportStatAllData.gender));
            //$viewTargetDiv.find(".legend_gender_doughnut").html(chartGenderdoughnut.generateLegend());
            //$viewTargetDiv.find(".canvas_gender_doughnut").closest("div.chart").addClass("on");
            is.addChartData(is.getChartName(canvas_gender_doughnut), ctx_gender_doughnut, get_config_gender_doughnut(trendReportStatAllData.gender));
            $divChart = canvas_gender_doughnut.closest("div.chart");
            $divChart.show();
            isShowPreChart = true;
        }

        if (trendReportStatAllData.gender && trendReportStatAllData.gender.stats && trendReportStatAllData.gender.stats.length > 0) {
            //var chartAgedoughnut = new Chart(ctx_age_doughnut, get_config_age_doughnut(trendReportStatAllData.age)); //doughnut
            //$viewTargetDiv.find(".legend_age_doughnut").html(chartAgedoughnut.generateLegend());
            //$viewTargetDiv.find(".canvas_age_doughnut").closest("div.chart").addClass("on");
            is.addChartData(is.getChartName(canvas_age_doughnut), ctx_age_doughnut, get_config_age_doughnut(trendReportStatAllData.age));
            $divChart = canvas_age_doughnut.closest("div.chart");
            $divChart.show();
            if (isShowPreChart) {
                $divChart.prev().show();
            }
            isShowPreChart = true;
        }

        if (trendReportStatAllData.live && trendReportStatAllData.live.stats && trendReportStatAllData.live.stats.length > 0) {
            //var chartresidenceBar = new Chart(ctx_residence_bar, get_config_residence_bar(trendReportStatAllData.live)); //bar
            //$viewTargetDiv.find(".canvas_residence_bar").closest("div.chart").addClass("on");
            is.addChartData(is.getChartName(canvas_residence_bar), ctx_residence_bar, get_config_residence_bar(trendReportStatAllData.live));
            $divChart = canvas_residence_bar.closest("div.chart");
            $divChart.show();
            if (isShowPreChart) {
                $divChart.prev().show();
            }
            isShowPreChart = true;
        }

        if (trendReportStatAllData.interest && trendReportStatAllData.interest.stats && trendReportStatAllData.interest.stats.length > 0) {
            //var chartproductBar = new Chart(ctx_product_bar, get_config_product_bar(trendReportStatAllData.interest)); //bar
            //$viewTargetDiv.find(".canvas_product_bar").closest("div.chart").addClass("on");
            is.addChartData(is.getChartName(canvas_product_bar), ctx_product_bar, get_config_product_bar(trendReportStatAllData.interest));
            $divChart = canvas_product_bar.closest("div.chart");
            $divChart.show();
            if (isShowPreChart) {
                $divChart.prev().show();
            }
        }
    };

    var get_config_gender_doughnut = function(genderData) {

        // labels: [['여자', '652', '65.2'], ['남자', '348', '34.8']], //성별, 인원, % 순
        // data: [652, 348]
        var labels = [], uvData = [];

        $.each(genderData.stats, function (index, item) {
            labels.push([item.reportTypeGrp, item.uv, item.uvPercent]);
            uvData.push(item.uv);
        });

        var config_gender_doughnut = {
            type: 'doughnut',
            data: {
                labels: labels, //성별, 인원, % 순
                datasets: [{
                    data: uvData,
                    backgroundColor: [gradient_gender, Chart.defaults.global.defaultDoughnutColor_man],
                    hoverBackgroundColor: [gradient_gender, Chart.defaults.global.defaultDoughnutColor_man], //막대 터치시 컬러
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
                    xAlign: "center",
                    xPadding: 0,
                    bodyFontSize: Chart.defaults.global.tooltips.bodyFontSize,
                    bodyFontFamily: 'Noto Bold',
                    callbacks: {
                        title: function (tooltipItems, data) {
                            return "";
                        },
                        label: function (tooltipItem, data) {
                            return data.labels[tooltipItem.index][2];//차트위 노출 데이터 %
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
                    var htmlLegend = `
						<div class="chart_title">
							<span>성별</span>
						</div>
						`; // ^ ES6 Template String

                    //var ul = document.createElement('ul');
                    htmlLegend += "<ul>";
                    var bgColor = chart.data.datasets[0].backgroundColor;
                    chart.data.labels.forEach(function (label, index) {

                        var val, legendbg = '';

                        if (label[1] === "") {
                            val = '';
                        } else {
                            val = is.commaString(label[1]) + '명';
                        }

                        if (typeof(bgColor[index]) === 'string') {
                            legendbg = bgColor[index];
                        }
                        else {
                            legendbg = Chart.defaults.global.defaultDoughnutColor_woman;
                        }

                        htmlLegend += `
							<li>
								<div>
									<span class="no" style="background-color: ${legendbg}"></span>
									<span class="info">
                                        ${label[0]}
                                    </span>
								</div>
                                <div class="info2">${val}</div>
							</li>
						`; // ^ ES6 Template String
                    });
                    htmlLegend += "</ul>";
                    return htmlLegend;
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

        return config_gender_doughnut;
    };

    var get_config_age_doughnut = function(ageData) {
        var labels = [], uvData = [];

        $.each(ageData.stats, function (index, item) {
            labels.push([item.reportTypeGrp, item.uv, item.uvPercent]);
            uvData.push(item.uv);
        });

        var config_age_doughnut = {
            type: 'doughnut',
            data: {
                labels: labels, //연령, 인원, %, 상위 4개 이외엔 기타 적용
                datasets: [{
                    data: uvData,
                    backgroundColor: [gradient_age, Chart.defaults.global.defaultDoughnutColor1, Chart.defaults.global.defaultDoughnutColor2, Chart.defaults.global.defaultDoughnutColor3, Chart.defaults.global.defaultDoughnutColor4],
                    hoverBackgroundColor: [gradient_age, Chart.defaults.global.defaultDoughnutColor1, Chart.defaults.global.defaultDoughnutColor2, Chart.defaults.global.defaultDoughnutColor3, Chart.defaults.global.defaultDoughnutColor4], //막대 터치시 컬러
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
                    xAlign: "center",
                    xPadding: 0,
                    bodyFontSize: Chart.defaults.global.tooltips.bodyFontSize,
                    bodyFontFamily: 'Noto Bold',
                    callbacks: {
                        title: function (tooltipItems, data) {
                            return "";
                        },
                        label: function (tooltipItem, data) {
                            return data.labels[tooltipItem.index][2];//차트위 노출 데이터 %
                        }
                    },
                    filter: function (tooltipItem, data) {
                        var label = data.labels[tooltipItem.index];
                        if (tooltipItem.index < 4) { // 상위 4개까지만 노출
                            return true;
                        }
                    }
                },
                legend: {
                    display: false
                },
                legendCallback: function (chart) {
                    var chart_title = `
						<div class="chart_title">
							<span>연령별</span>
						</div>
						`; // ^ ES6 Template String

                    var ul = document.createElement('ul');
                    var bgColor = chart.data.datasets[0].backgroundColor;
                    chart.data.labels.forEach(function (label, index) {
                        if (index < 4) { //상위 4개 까지만 노출

                            var val, legendbg = '';

                            if (label[1] == '') {
                                val = '';
                            } else {
                                val = is.commaString(label[1]) + '명';
                            }

                            if (typeof(bgColor[index]) == 'string') {
                                legendbg = bgColor[index];
                            }
                            else {
                                legendbg = Chart.defaults.global.defaultDoughnutColor_age;
                            }

                            ul.innerHTML += `
								<li>
									<div>
										<span class="no" style="background-color: ${legendbg}"></span>
										<span class="info">
                                            ${label[0]}
										</span>
									</div>
                                    <div class="info2">${val}</div>
								</li>
							`; // ^ ES6 Template String
                        }
                    });
                    return chart_title + ul.outerHTML;
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

        return config_age_doughnut;
    };

    var get_config_residence_bar = function(liveData) {
        var labels = [], uvData = [];
        var maxLabel;
        var max = 0, stepSize, total = 0, listSize = liveData.stats.length;
        var ylabels;
        var backgroundColor = [], hoverBackgroundColor = [];

        $.each(liveData.stats, function (index, item) {
            labels.push(item.reportTypeGrp);
            uvData.push(item.uv);

            var uv = item.uv * 1;
            total += uv;

            if (max <= uv) {
                max = uv;
                maxLabel = item.reportTypeGrp;
            }
        });

        var maxTicksLimit = 4;
        max = is.calcChartYNumber4Ceil(max);
        stepSize = is.calcChartYNumber4Round(max / maxTicksLimit);
        max += stepSize;

/*
        console.log("max, stepSize:", max, stepSize);
        ylabels = [" ", (max - stepSize) + "", (max - stepSize * 2) + "", " ", "(명)" ];
*/

        $.each(labels, function (index, label) {
            if (label === maxLabel) {
                backgroundColor.push(gradient_product);
                hoverBackgroundColor.push(gradient_product);
            } else {
                backgroundColor.push(Chart.defaults.global.defaultBackgroundColor);
                hoverBackgroundColor.push(Chart.defaults.global.defaultBackgroundColor);
            }
        });

        var config_residence_bar = {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    data: uvData,
                    backgroundColor: backgroundColor,
                    hoverBackgroundColor: hoverBackgroundColor
                }]
            },
            options: {
                layout: {
                    padding: {
                        top: 25
                    }
                },
                showAllTooltips: true, // call plugin we created
                maintainAspectRatio: false,
                responsive: true,
                legend: false, //범례보기
                scales: {//축
                    yAxes: [{
                        ticks: {
                            beginAtZero: true, // 0값 부터 시작
                            fontColor: Chart.defaults.scale.ticks.fontColor2,
                            fontSize: Chart.defaults.global.defaultBaryfontSize,
/*
                            min: min, // 그래프 최소값
                            max: max, // 그래프 최대값
*/
                            maxTicksLimit: maxTicksLimit + 1, // 5개로 나눠서 보여짐  (0, 100, 200, 300, 400)
                            stepSize: stepSize, //척도의 간격 크기
                            callback: function (value, index) {
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
                            display: true,
                            color: ['transparent', Chart.defaults.scale.gridLines.color, Chart.defaults.scale.gridLines.color, Chart.defaults.scale.gridLines.color, Chart.defaults.scale.gridLines.color, Chart.defaults.scale.gridLines.color], //맨 윗줄 부터
                            zeroLineColor: Chart.defaults.scale.gridLines.color,
                            drawBorder: false
                        }
                    }],
                    xAxes: [{
                        categoryPercentage: Chart.defaults.global.defaultBarcategoryPercentage, // 0~1 사이 소수점
                        barPercentage: Chart.defaults.global.defaultBarbarPercentage, // 0~1 사이 소수점
                        barThickness: Chart.defaults.global.defaultBarbarThickness, //bar width
                        ticks: {
                            fontSize: Chart.defaults.global.defaultBarxfontSize,
                            fontColor: Chart.defaults.scale.ticks.fontColor2,
                            major: {
                                fontColor: Chart.defaults.scale.ticks.fontColor // 아래 plugins에서 major로 설정된 것이면
                            }
                        },
                        gridLines: {
                            display: false,
                            color: Chart.defaults.scale.gridLines.color
                        }
                    }]
                },
                tooltips: {
                    yAlign: 'top',
                    xAlign: 'center',
                    yPadding: Chart.defaults.global.tooltips.yPadding_bar,
                    // titleMarginBottom: Chart.defaults.global.tooltips.titleMarginBottom_bar,
                    bodyFontColor: Chart.defaults.global.tooltips.bodyFontColor_bar,
                    bodyFontSize: Chart.defaults.global.tooltips.bodyFontSize_bar,
                    bodyFontFamily: 'Noto Bold',
                    callbacks: {
                        title: function (tooltipItems, data) {
                            return "";
                        },
                        label: function (tooltipItem, data) {
                            var val = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                            var arr = data.datasets[tooltipItem.datasetIndex].data;

                            var result = arr.reduce(function add(sum, currValue) {
                                sum *=1;
                                currValue *=1;
                                return sum + currValue;
                            }, 0);
                            return ((val / result) * 100).toFixed(2) + '%';
                        }
                    },
                    filter: function (tooltipItem, data) {
                        var label = data.labels[tooltipItem.index];
                        if (label === maxLabel) { // 가장 큰 값일 경우만 툴팁보임
                            return true;
                        } else {
                            return false;
                        }
                    },
                },
            },
            plugins: [{
                beforeDraw: function ({chart}, options) {
                    if (options >= 1) {
                        try {
                            chart.boxes
                                .find(box => box.id == "x-axis-0")
                                ._ticks
                                .find(tick => tick.label == maxLabel)
                                .major = true;
                        } catch (e) {
                            //
                        }
                    }
                }
            }]
        };

        return config_residence_bar;
    };

    var get_config_product_bar = function(interestData) {
        var labels = [], uvData = [];
        var maxLabel;
        var max = 0, stepSize, total = 0, listSize = interestData.stats.length;
        var ylabels;
        var backgroundColor = [], hoverBackgroundColor = [];

        $.each(interestData.stats, function (index, item) {
            labels.push(item.reportTypeGrp);
            uvData.push(item.uv);

            var uv = item.uv * 1;
            total += uv;

            if (max <= uv) {
                max = uv;
                maxLabel = item.reportTypeGrp;
            }
        });

        var maxTicksLimit = 4;
        max = is.calcChartYNumber4Ceil(max);
        stepSize = is.calcChartYNumber4Round(max / maxTicksLimit);
        max += stepSize;

/*
        console.log("max, stepSize:", max, stepSize);
        console.log("interestData:", interestData);
        ylabels = ["", (max - stepSize) + "", (max - stepSize * 2) + "", (max - stepSize * 3) + "", "(명)" ];
        ylabels = [" ", (max - stepSize) + "", (max - stepSize * 2) + "", " ", "(명)" ];
        ylabels = [(max) + "", (max - stepSize * 1) + "", (max - stepSize * 2) + "", (max - stepSize * 3) + "", "(명)" ];
*/

        $.each(labels, function (index, label) {
            if (label === maxLabel) {
                backgroundColor.push(gradient_product);
                hoverBackgroundColor.push(gradient_product);
            } else {
                backgroundColor.push(Chart.defaults.global.defaultBackgroundColor2);
                hoverBackgroundColor.push(Chart.defaults.global.defaultBackgroundColor2);
            }
        });

        var config_product_bar = {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    data: uvData,
                    backgroundColor: backgroundColor,
                    hoverBackgroundColor: hoverBackgroundColor //막대 터치시 컬러
                }]
            },
            options: {
                layout: {
                    padding: {
                        top: 20
                    }
                },
                transitions: {
                    resize: 200
                },
                showAllTooltips: true, // call plugin we created
                maintainAspectRatio: false,
                responsive: true,
                legend: false, //범례보기
                scales: {//축
                    yAxes: [{
                        ticks: {
                            beginAtZero: true, // 0값 부터 시작
                            fontColor: Chart.defaults.scale.ticks.fontColor2,
                            fontSize: Chart.defaults.global.defaultBaryfontSize,
/*
                            min: 0, // 그래프 최소값
                            max: max, // 그래프 최대값
*/
                            maxTicksLimit: maxTicksLimit + 1, // 5개로 나눠서 보여짐  (0, 100, 200, 300, 400)
                            stepSize: stepSize, //척도의 간격 크기
                            callback: function (value, index) {
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
                            display: true,
                            color: ['transparent', Chart.defaults.scale.gridLines.color, Chart.defaults.scale.gridLines.color, Chart.defaults.scale.gridLines.color, Chart.defaults.scale.gridLines.color, Chart.defaults.scale.gridLines.color], //맨 윗줄 부터
                            zeroLineColor: Chart.defaults.scale.gridLines.color,
                            drawBorder: false
                        }
                    }],
                    xAxes: [{
                        categoryPercentage: Chart.defaults.global.defaultBarcategoryPercentage, // 0~1 사이 소수점
                        barPercentage: Chart.defaults.global.defaultBarbarPercentage, // 0~1 사이 소수점
                        barThickness: Chart.defaults.global.defaultBarbarThickness, //bar width
                        ticks: {
                            fontSize: Chart.defaults.global.defaultBarxfontSize,
                            fontColor: Chart.defaults.scale.ticks.fontColor2,
                            lineHeight: 1,
                            major: {
                                fontColor: Chart.defaults.scale.ticks.fontColor // 아래 plugins에서 major로 설정된 것이면
                            }
                        },
                        gridLines: {
                            display: false,
                            color: Chart.defaults.scale.gridLines.color
                        }
                    }]
                },
                tooltips: {
                    yAlign: 'top',
                    xAlign: 'center',
                    yPadding: Chart.defaults.global.tooltips.yPadding_bar,
                    // titleMarginBottom: Chart.defaults.global.tooltips.titleMarginBottom_bar,
                    bodyFontColor: Chart.defaults.global.tooltips.bodyFontColor_bar_product,
                    bodyFontSize: Chart.defaults.global.tooltips.bodyFontSize_bar,
                    bodyFontFamily: 'Noto Bold',
                    callbacks: {
                        title: function (tooltipItems, data) {
                            return "";
                        },
                        label: function (tooltipItem, data) {
                            var val = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                            var arr = data.datasets[tooltipItem.datasetIndex].data;

                            //return val.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + '%';
                            var result = arr.reduce(function add(sum, currValue) {
                                sum *=1;
                                currValue *=1;
                                return sum + currValue;
                            }, 0);
                            return ((val / result) * 100).toFixed(2) + '%';//소수점 2자리까지
                        }
                    },
                    filter: function (tooltipItem, data) {
                        var label = data.labels[tooltipItem.index];
                        if (label === maxLabel) { //운중동 일때만 툴팁 보이기
                            return true;
                        } else {
                            return false;
                        }
                    },
                },
            },
            plugins: [{
                beforeDraw: function ({chart}, options) {
                    if (options >= 1) {
                        try {
                            chart.boxes
                                .find(box => box.id == "x-axis-0")
                                ._ticks
                                .find(tick => tick.label == maxLabel)
                                .major = true;
                        } catch (e) {
                            //
                        }
                    }
                }
            }]
        };

        return config_product_bar;
    };

    $(document).ready(function () {
        //
    });

    is.viewTmplTrend = viewTmplTrend;

}(jQuery, window, document));
