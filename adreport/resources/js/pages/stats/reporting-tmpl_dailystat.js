if (!window.is) { window.is = {}; }
( function( $, window, document, undefined ) {
    var qs = is.parseQuery();
    var dailyStatTmpl = Handlebars.compile($("#dailyStatTemplate").html());
    var dailyStatRowTmpl = Handlebars.compile($("#dailyStatRowTemplate").html());

    var setFirstDaliyStat = function (view, data) {
        if (!data.dayStats || data.dayStats.totalCnt === 0) {
            view.hide();
            return;
        }

        view.html(dailyStatTmpl(data));

        var statsData = data.dayStats;

        addDaliyStatView(view, statsData);
    };

    var addDaliyStatView = function (view, statsData) {
        var targetView;
        if (view.hasClass("dailyStatRowArea")) {
            targetView = view;
        }
        else {
            targetView = view.find(".dailyStatRowArea");
        }

        if(targetView){
            statsData.channelType = targetView.data("channelType");
            targetView.append(dailyStatRowTmpl(statsData));
            targetView.data("page", statsData.page);
            targetView.data("size", statsData.sidailyMoreze);
            targetView.data("totalCnt", statsData.totalCnt);

            var dailyStatRowList = targetView.find(".dailyStatRow");

            if (statsData.totalCnt <= dailyStatRowList.length) {
                targetView.find(".dailyMore").remove();
            }
        }
    };

    var addDaliyStat = function (view) {
        var targetView = view.closest(".dailyStatRowArea");
        var params = {};
        params.page = targetView.data("page") + 1;
        params.size = targetView.data("size");
        params.marketingId = targetView.data("marketingId");
        params.mdn = qs.mdn;

        $.ajax({
            url: "/api/reporting/dayStatsList",
            data: JSON.stringify(params),
            method: "POST",
            contentType: "application/json"
        }).done(function (result) {
            if (result.resultCode === "200") {
                view.closest(".dailyMore").remove();
                addDaliyStatView(targetView, result.data);
            } else {
                is.failNoti(result);
            }
        }).fail(is.failNoti);

    };

    $(document).on("click", ".dailyMoreClick", function (e) {
        e.preventDefault();

        var $this = $(this);
        addDaliyStat($this);
        return false;
    });

    is.setFirstDaliyStat = setFirstDaliyStat;


    /*
    var findChannelType = function (view) {
        var divmenu = view.closest("divmenu");
        return divmenu.data("channelType");
    };
    is.findChannelType = findChannelType;*/







}( jQuery, window, document ));
