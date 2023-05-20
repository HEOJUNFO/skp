if (!window.is) { window.is = {}; }
( function( $, window, document, undefined ) {
    var qs = is.parseQuery();
    var monthStatTmpl = Handlebars.compile($("#monthStatTemplate").html());
    var monthStatRowTmpl = Handlebars.compile($("#monthStatRowTemplate").html());

    var setFirstMonthStat = function (view, data) {

        if (!data.monthStats || data.monthStats.totalCnt === 0) {
            view.hide();
            return;
        }

        view.html(monthStatTmpl(data));

        var statsData = data.monthStats;

        addMonthStatView(view, statsData);
    };

    var addMonthStatView = function (view, statsData) {
        var targetView;
        if (view.hasClass("monthStatRowArea")) {
            targetView = view;
        }
        else {
            targetView = view.find(".monthStatRowArea");
        }

        if(targetView){
            statsData.channelType = targetView.data("channelType");
            statsData.contPlcName = targetView.data("contPlcName");
            targetView.append(monthStatRowTmpl(statsData));
            targetView.data("page", statsData.page);
            targetView.data("size", statsData.size);
            targetView.data("totalCnt", statsData.totalCnt);

            var monthStatRowList = targetView.find(".monthStatRow");

            if (statsData.totalCnt <= monthStatRowList.length) {
                targetView.find(".monthMore").remove();
            }
        }
    };

    var addMonthStat = function (view) {
        var targetView = view.closest(".monthStatRowArea");
        var params = {};
        params.page = targetView.data("page") + 1;
        params.size = targetView.data("size");
        params.marketingId = targetView.data("marketingId");
        params.mdn = qs.mdn;

        $.ajax({
            url: "/api/reporting/monthStatsList",
            data: JSON.stringify(params),
            method: "POST",
            contentType: "application/json"
        }).done(function (result) {
            if (result.resultCode === "200") {
                view.closest(".monthMore").remove();
                addMonthStatView(targetView, result.data);
            } else {
                is.failNoti(result);
            }
        }).fail(is.failNoti);
    };

    $(document).on("click", ".monthMoreClick", function (e) {
        e.preventDefault();
        var $this = $(this);
        addMonthStat($this);
    });

    is.setFirstMonthStat = setFirstMonthStat;

}( jQuery, window, document ));
