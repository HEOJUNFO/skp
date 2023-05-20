/*
 * ADReport Mobile
 * common javascript file
 * License: SK planet wholly owned
 */
if (!window.is) { window.is = {}; }
(function ($, window, document, undefined) {
    var qs = is.parseQuery();
    console.log("qs:", qs);
    var VAL_CHANNEL_TYPE_MOBILE = "OP",
        VAL_CHANNEL_TYPE_LOCATION = "BLE",
        VAL_CHANNEL_TYPE_PUSH = "SP",
        VAL_CHANNEL_TYPE_BANNER = "DFP",
        VAL_CHANNEL_TYPE_SYRUP_FRIENDS = "SF";

    var displayTemplate = Handlebars.compile($("#displayTemplate").html());

    $(document.body).on("click", "#goto_top", function (e) {
        e.preventDefault();
        goto_top();
    });

    $(document).scroll(function (e) {
        e.preventDefault();
        chartRedraw();
    });

    var goto_top = function () {
        $("html, body").stop().animate({scrollTop: 0}, 0);
    };

    //var CUR_CHARTNAME;
    var chartRedraw = function () {
        $(".chart").each(function () {
            var $this = $(this), $window = $(window);
            var winHeight = $window.height();
            var outerheight = ($this.outerHeight());
            var divTop = $this.offset().top;
            var nowTop = $window.scrollTop() + winHeight;

            if (divTop < winHeight) {
                if ($window.scrollTop() > 0) {
                    is.chartUpdate($this);
                }
            } else if (divTop <= nowTop - ($this.height() - (outerheight / 2))) {
                is.chartUpdate($this);
            } else {
                //console.log("...nothing");
            }
        });
    };

    var init = function () {
        initOrder();

        goto_top();

        $(".introduction").show();
    };

    var initOrder = function () {
        // var orderDefault = [VAL_CHANNEL_TYPE_MOBILE, VAL_CHANNEL_TYPE_LOCATION, VAL_CHANNEL_TYPE_PUSH, VAL_CHANNEL_TYPE_BANNER, VAL_CHANNEL_TYPE_SYRUP_FRIENDS];
        var orderDefault = [VAL_CHANNEL_TYPE_MOBILE, VAL_CHANNEL_TYPE_LOCATION, VAL_CHANNEL_TYPE_BANNER, VAL_CHANNEL_TYPE_SYRUP_FRIENDS];
        var orderList = [];
        var mainChannelType = qs.channelType;

        orderList.push(mainChannelType);

/*
        for (var i = 0; i < orderDefault.length; i++) {
            if (orderDefault[i] !== mainChannelType) {
                orderList.push(orderDefault[i]);
            }
        }
*/

        $("#display-area").html(displayTemplate(orderList));

        for (var i = 0; i < orderList.length; i++) {
            if (orderList[i] === VAL_CHANNEL_TYPE_MOBILE) {
                is.initMobile();
            }
            else if (orderList[i] === VAL_CHANNEL_TYPE_LOCATION) {
                is.initLocation();
            }
            else if (orderList[i] === VAL_CHANNEL_TYPE_PUSH) {
                is.initPush();
            }
            else if (orderList[i] === VAL_CHANNEL_TYPE_BANNER) {
                is.initBanner();
            }
            else if (orderList[i] === VAL_CHANNEL_TYPE_SYRUP_FRIENDS) {
                is.initSyrupFriends();
            }
        }

    };

    var viewReportingMain = function (data) {
        is.initMenuOrder();

        is.viewTargetReporting(data.targetInfo);
        $("#headerMarketingTitle").text(qs.contPlcName);
    };

    $(document).ready(function () {
        init();
    });

    is.viewReportingMain = viewReportingMain;

}(jQuery, window, document));