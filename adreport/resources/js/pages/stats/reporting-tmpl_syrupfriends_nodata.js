(function ($, window, document, undefined) {
    var qs = is.parseQuery();
    var syrupFriendsNodataTemplate = Handlebars.compile($("#syrupFriendsNodataTemplate").html());

    var VAL_CHANNEL_TYPE_SYRUP_FRIENDS = 'SF';

    var viewTmplSyrupFriendsNodata = function ($viewTargetDiv) {
        $viewTargetDiv.hide();

        var data = {};
        data.advertiserMid = qs.advertiserMid;
        data.contPlcName = qs.contPlcName;
        data.applyDate = is.getToday();

        $viewTargetDiv.html(syrupFriendsNodataTemplate(data));
        $viewTargetDiv.show();
    };

    var flagApply = false;
    $(document.body).on("click", ".adApplySFNodataBtn", function (e) {
        e.preventDefault();

        if (flagApply) {
            return;
        }

        var $this = $(this);
        var params = {
            channelType: VAL_CHANNEL_TYPE_SYRUP_FRIENDS,
            contPlcName: qs.contPlcName,
            advertiserMid: qs.advertiserMid
        };
        flagApply = true;

        is.applyAdvertise(params,
            function (resultData) {
                $this.hide();
                $this.next().show();
                flagApply = false;
            },
            function (result) {
                //
                flagApply = false;
            }
        );
    });

    $(document).ready(function () {
        //
    });

    is.viewTmplSyrupFriendsNodata = viewTmplSyrupFriendsNodata;

}(jQuery, window, document));
