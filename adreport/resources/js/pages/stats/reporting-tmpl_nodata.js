(function ($, window, document, undefined) {
    var qs = is.parseQuery();
    var noDataTemplate = Handlebars.compile($("#noDataTemplate").html());

    var viewTmplNodata = function ($viewTargetDiv, targetChannelType) {
        // nodata 이전 DIV 를 숨김
        $viewTargetDiv.prev().hide();

        $viewTargetDiv.hide();

        var data = {};
        data.channelName = getChannelName(targetChannelType);
        data.channelType = targetChannelType;
        data.advertiserMid = qs.advertiserMid;
        data.contPlcName = qs.contPlcName;
        data.applyDate = is.getToday();

        if (targetChannelType === "OP") {
            data.channelTitle = "OK캐쉬백의 천만고객을 다양한 타겟조건으로 분류해서 광고를 발송해 보세요";
        } else if (targetChannelType === "BLE") {
            data.channelTitle = "위치광고 신청시 원하시는 지역에 현재 위치한 고객과, 해당 지역 거주, 많이 방문 고객을 타겟팅해 위치 광고를 발송할 수 있습니다";
        } else if (targetChannelType === "SP") {
            data.channelTitle = "푸시광고 신청시 원하시는 고객타겟을 설정 Syrup Wallet을 통해 원한는 시간에 Push를 발송할 수 있습니다";
        } else if (targetChannelType === "DFP") {
            data.channelTitle = "배너광고 신청시 원하시는 고객타겟을 설정 OK캐쉬백, Syrup Wallet을 통해 원하는 지면에 광고를 개제할 수 있습니다";
        } else {
            return "광고를 발송해 보세요";
        }

        $viewTargetDiv.html(noDataTemplate(data));
        $viewTargetDiv.show();
    };

    var flagApply = false;
    $(document.body).on("click", ".adApplyNodataBtn", function (e) {
        e.preventDefault();

        if (flagApply) {
            return;
        }

        var $this = $(this);
        var params = {
            channelType: $this.data("channeltype"),
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

    var getChannelName = function (channelType) {
        if (channelType === "OP") {
            return "모바일전단";
        } else if (channelType === "BLE") {
            return "위치광고";
        } else if (channelType === "SP") {
            return "푸시광고";
        } else if (channelType === "DFP") {
            return "배너광고";
        } else if (channelType === "SF") {
            return "시럽프렌즈";
        } else {
            return "광고";
        }
    };

    $(document).ready(function () {
        //
    });

    is.viewTmplNodata = viewTmplNodata;

}(jQuery, window, document));
