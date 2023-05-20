// Rounded Rectangle Extension for Bar Charts and Horizontal Bar Charts
Chart.elements.Rectangle.prototype.draw = function() {
    
    var ctx = this._chart.ctx;
    var vm = this._view;
    var left, right, top, bottom, signX, signY, borderSkipped;
    var borderWidth = vm.borderWidth;
    // Set Radius Here
    // If radius is large enough to cause drawing errors a max radius is imposed
    var cornerRadius = 10;//20;
    //console.log(this._chart);
    //console.log(this._chart.options.cornerRadius);

    if (!vm.horizontal) {
        // bar
        left = vm.x - vm.width / 2;
        right = vm.x + vm.width / 2;
        top = vm.y;
        bottom = vm.base;
        signX = 1;
        signY = bottom > top? 1: -1;
        borderSkipped = vm.borderSkipped || 'bottom';
    } else {
        // horizontal bar
        cornerRadius = 10;
        left = vm.base;
        right = vm.x;
        top = vm.y - vm.height / 2;
        bottom = vm.y + vm.height / 2;
        signX = right > left? 1: -1;
        signY = 1;
        borderSkipped = vm.borderSkipped || 'left';
    }

    // Canvas doesn't allow us to stroke inside the width so we can
    // adjust the sizes to fit if we're setting a stroke on the line
    if (borderWidth) {
        // borderWidth shold be less than bar width and bar height.
        var barSize = Math.min(Math.abs(left - right), Math.abs(top - bottom));
        borderWidth = borderWidth > barSize? barSize: borderWidth;
        var halfStroke = borderWidth / 2;
        // Adjust borderWidth when bar top position is near vm.base(zero).
        var borderLeft = left + (borderSkipped !== 'left'? halfStroke * signX: 0);
        var borderRight = right + (borderSkipped !== 'right'? -halfStroke * signX: 0);
        var borderTop = top + (borderSkipped !== 'top'? halfStroke * signY: 0);
        var borderBottom = bottom + (borderSkipped !== 'bottom'? -halfStroke * signY: 0);
        // not become a vertical line?
        if (borderLeft !== borderRight) {
            top = borderTop;
            bottom = borderBottom;
        }
        // not become a horizontal line?
        if (borderTop !== borderBottom) {
            left = borderLeft;
            right = borderRight;
        }
    }

    ctx.beginPath();
    ctx.fillStyle = vm.backgroundColor;
    ctx.strokeStyle = vm.borderColor;
    ctx.lineWidth = borderWidth;

    // Corner points, from bottom-left to bottom-right clockwise
    // | 1 2 |
    // | 0 3 |
    var corners = [
        [left, bottom],
        [left, top],
        [right, top],
        [right, bottom]
    ];

    // Find first (starting) corner with fallback to 'bottom'
    var borders = ['bottom', 'left', 'top', 'right'];
    var startCorner = borders.indexOf(borderSkipped, 0);
    if (startCorner === -1) {
        startCorner = 0;
    }

    function cornerAt(index) {
        return corners[(startCorner + index) % 4];
    }

    // Draw rectangle from 'startCorner'
    var corner = cornerAt(0);
    ctx.moveTo(corner[0], corner[1]);

    for (var i = 1; i < 4; i++) {
        corner = cornerAt(i);
        nextCornerId = i+1;
        if(nextCornerId == 4){
            nextCornerId = 0
        }

        nextCorner = cornerAt(nextCornerId);

        width = corners[2][0] - corners[1][0];
        height = corners[0][1] - corners[1][1];
        x = corners[1][0];
        y = corners[1][1];
        
        var radius = cornerRadius;
        
        // Fix radius being too large
        if(radius > height/2){
            radius = height/2;
        }if(radius > width/2){
            radius = width/2;
        }

        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);

    }

    ctx.fill();
    if (borderWidth) {
        ctx.stroke();
    }
}; 


// Register plugin to always show tooltip
// ref: https://github.com/chartjs/Chart.js/issues/4045
Chart.plugins.register({
    beforeRender: function (chart) {
        if (chart.config.options.showAllTooltips) {
            // create an array of tooltips
            // we can't use the chart tooltip because there is only one tooltip per chart
            chart.pluginTooltips = [];
            chart.config.data.datasets.forEach(function (dataset, i) {
                chart.getDatasetMeta(i).data.forEach(function (sector, j) {
                    chart.pluginTooltips.push(new Chart.Tooltip({
                        _chart: chart.chart,
                        _chartInstance: chart,
                        _data: chart.data,
                        _options: chart.options.tooltips,
                        _active: [sector] },
                        chart));
                    });
                });

            // turn off normal tooltips
            chart.options.tooltips.enabled = false;
        }
    },
    afterDraw: function (chart, easing) {
        if (chart.config.options.showAllTooltips) {
            // we don't want the permanent tooltips to animate, so don't do anything till the animation runs atleast once
            if (!chart.allTooltipsOnce) {
                if (easing !== 1) return;
                    chart.allTooltipsOnce = true;
                }

                // turn on tooltips
                setTimeout(function() { 
                    chart.options.tooltips.enabled = true
                    //setTimeout (function() { chart.options.tooltips.enabled = true; }, 2000);
                    Chart.helpers.each(chart.pluginTooltips, function (tooltip) {
                        try {
                            tooltip.initialize();
                            tooltip.update();
                            // we don't actually need this since we are not animating tooltips
                            tooltip.pivot();
                            tooltip.transition(easing).draw();
                        } catch (e) {
                            //
                        }
                    });
                    
                 }, 250);

                 chart.options.tooltips.enabled = false;

            }
        } 
    }
);

// 차트 해상도별 폰트 크기
var get_chartfontsize = function(){
    var yAxes_fontsize = 16;
    var window_width = $( window ).width();

    if((window_width >= 0) && (window_width < 300)){
        yAxes_fontsize = 11;
    } else if((window_width >= 300) && (window_width < 360)){
        yAxes_fontsize = 12;
    } else if((window_width >= 360) && (window_width < 411)) {
        yAxes_fontsize = 13;
    } else if((window_width >= 412) && (window_width < 587)) {
        yAxes_fontsize = 15;
    } else {
        yAxes_fontsize = 17;    
    }

    return yAxes_fontsize;
};

// defatul value
Chart.defaults.global.defaultFontFamily = "'droid sans','AppleSDGothicNeo',  Apple SD Gothic Neo, sans-serif"; //차트 폰트 설정
Chart.defaults.global.defaultFontSize = get_chartfontsize(); //해상도별 차트 기본 폰트 크기

Chart.defaults.global.defaultBackgroundColor = "#ffebd7";
Chart.defaults.global.defaultBackgroundColor2 = "#eedff9";
Chart.defaults.global.defaultBackgroundColorOn = "#007aff";

Chart.defaults.global.defaultDoughnutColor1 = '#d92be5';
Chart.defaults.global.defaultDoughnutColor2 = '#d093fd';
Chart.defaults.global.defaultDoughnutColor3 = '#dbacfe';
Chart.defaults.global.defaultDoughnutColor4 = '#f6f6f7';
Chart.defaults.global.defaultDoughnutaspectRatio = 1.87;
Chart.defaults.global.defaultDoughnutcutoutPercentage = 55;

Chart.defaults.global.defaultDoughnutColor_man = '#f8a43c';
Chart.defaults.global.defaultDoughnutColor_woman = '#ff0060';
Chart.defaults.global.defaultDoughnutColor_age = '#b200dd';

Chart.defaults.global.defaultLineborderWidth = 3;
Chart.defaults.global.defaultLinetention = 0.45;
Chart.defaults.global.defaultLinepointBackgroundColor = "#fff";
Chart.defaults.global.defaultLineborderColor = '#ff2a3b';
Chart.defaults.global.defaultLinebackgroundColor = 'transparent';
Chart.defaults.global.defaultLinepointBorderWidth = 3;
Chart.defaults.global.defaultLinepointRadius = 4;
Chart.defaults.global.defaultLinexfontSize = Chart.defaults.global.defaultFontSize - 1;
Chart.defaults.global.defaultLineyfontSize = Chart.defaults.global.defaultFontSize - 2;
Chart.defaults.global.defaultLinePadding = 30;


Chart.defaults.global.defaultBarcategoryPercentage = 0.5; 
Chart.defaults.global.defaultBarbarPercentage = 0.1;
Chart.defaults.global.defaultBarbarThickness = Chart.defaults.global.defaultFontSize + 2; //막대 width
Chart.defaults.global.defaultBarxfontSize = Chart.defaults.global.defaultFontSize - 3;
Chart.defaults.global.defaultBaryfontSize = Chart.defaults.global.defaultFontSize - 2;

Chart.defaults.scale.gridLines.color = "#f2f2f2";
Chart.defaults.scale.gridLines.color2 = "#fff";
Chart.defaults.scale.ticks.fontColor = '#222';
Chart.defaults.scale.ticks.fontColor2 = '#888';
Chart.defaults.scale.gridLines.color_line = "#e7e7e7";

Chart.defaults.global.tooltips.backgroundColor = 'transparent'; //툴팁 bg
Chart.defaults.global.tooltips.displayColors = false;
Chart.defaults.global.tooltips.xPadding = 0; //안쪽 여백
Chart.defaults.global.tooltips.yPadding = 0; //안쪽 여백
Chart.defaults.global.tooltips.caretPadding = 0; //바깥 여백
Chart.defaults.global.tooltips.caretSize = 0; //툴팁 arrow
Chart.defaults.global.tooltips.bodyFontSize = Chart.defaults.global.defaultFontSize + 1;
Chart.defaults.global.tooltips.bodyFontColor = '#fff';
Chart.defaults.global.tooltips.cornerRadius = 0;
//Chart.defaults.global.tooltips.yPadding_bar = -35; //툴팁 위치, 안쪽 여백
Chart.defaults.global.tooltips.yPadding_bar = -27; //툴팁 위치, 안쪽 여백
Chart.defaults.global.tooltips.bodyFontColor_bar = '#ff0045';
Chart.defaults.global.tooltips.bodyFontColor_bar_product = '#c800e7';
Chart.defaults.global.tooltips.bodyFontSize_bar = Chart.defaults.global.defaultFontSize - 1;


Chart.defaults.global.defaultDoughnutCcaretPadding = -10;


//노트 & ipnohe+ 툴팁 사이즈
if (Chart.defaults.global.defaultFontSize === 15){
    Chart.defaults.global.tooltips.caretPadding = Chart.defaults.global.defaultFontSize - 2;
    Chart.defaults.global.tooltips.bodyFontSize = Chart.defaults.global.defaultFontSize - 2;
}

// 폴더블폰 툴팁 사이즈
if (Chart.defaults.global.defaultFontSize === 17){
    Chart.defaults.global.tooltips.xPadding = (Chart.defaults.global.defaultFontSize - 1) / 2; //안쪽 여백
    Chart.defaults.global.tooltips.yPadding = (Chart.defaults.global.defaultFontSize / 2); //안쪽 여백
    Chart.defaults.global.tooltips.caretPadding = Chart.defaults.global.defaultFontSize - 2 ; //바깥 여백
    Chart.defaults.global.tooltips.caretSize = Chart.defaults.global.defaultFontSize - 11; //툴팁 arrow
    Chart.defaults.global.tooltips.bodyFontSize = Chart.defaults.global.defaultFontSize - 4;
    Chart.defaults.global.tooltips.cornerRadius = Chart.defaults.global.defaultFontSize - 12;
}

Chart.defaults.global.animation.duration = 800;

// gradation 
var start_gradation = '#f92c2a';//'#f92c2a'; // bar 차트 그라데이션 위쪽 색
var mid_gradation = '#fd4316'; // bar 차트 그라데이션 중간색
var end_gradation = '#ff5a00'; // bar 차트 그라데이션 중간색

var start_gradation_product = '#c800e7';//bar 차트 그라데이션 위쪽 색
var mid_gradation_product = '#cd07a6'; // bar 차트 그라데이션 중간색
var end_gradation_product = '#ff008f'; // bar 차트 그라데이션 중간색

var start_gradation_gender = '#8e4be7'; // 위쪽 색
var mid_gradation_gender = '#a02ad5'; // 중간색
var end_gradation_gender = '#ab18cc'; // 아래쪽 색

var start_gradation_age = '#ed2834'; // 위쪽 색
var mid_gradation_age = '#f15042'; // 중간색
var end_gradation_age = '#f46216'; // 아래쪽 색

var start_gradation_visit = '#f46216'; // 왼쪽 색
var mid_gradation_visit = '#f15042'; // 중간색
var end_gradation_visit = '#ed2834'; // 오른쪽 색

var start_gradation_ad = '#a71fd0'; // 왼쪽 색
var mid_gradation_ad = '#ba31b7'; // 중간색
var end_gradation_ad = '#ed00ab'; // 오른쪽 색

var start_gradation_line = '#ff6800'; // 왼쪽 색
var mid_gradation_line = '#ff4b1e'; // 중간색
var end_gradation_line = '#ff2b3c'; // 오른쪽 색

var bar_y1 = 0; // 세로 막대 그라데이션 위치
var bar_y2 = 140; // 세로 막대 그라데이션 위치

var doughnut_y = 100; // 도넛 그라데이션 위치
var doughnut_y2 = 220; // 도넛 그라데이션 위치

var line_x1 = 200; // 라인그라데이션 위치
var line_y1 = 250; // 라인그라데이션 위치

var ad_font_color1 = '#ec2a32'; //광고 타겟 추출 도넛 차트 폰트 컬러
var ad_font_color2 = '#c800e7'; //광고 타겟 추출 도넛 차트 폰트 컬러