(function ($, window, document, undefined) {
    var qs = is.parseQuery();
    var imgPopupTemplate = Handlebars.compile($("#imgPopupTemplate").html());

    var initTmplImgPopup = function ($viewTargetDiv, marketingId, channelType) {
        // getImgList($viewTargetDiv, marketingId);
        $viewTargetDiv.data("marketingId", marketingId);
        $viewTargetDiv.data("channelType", channelType);
    };

    $(document.body).on("click", ".leaflet_img > .img_wrap > a", function (e) {
        e.preventDefault();
        var $this = $(this);

        var targetView = $this.closest(".reportArea").find(".imgPopup");
        var reportChannelType = $this.closest(".reportArea").data("reportChannelType");

        if (!targetView.find(".popup") || targetView.find(".popup").length <= 0) {
            getImgList(targetView, targetView.data("marketingId"), targetView.data("channelType"), qs.mdn);
        }
        else {
            viewImgList(targetView);
        }
    });

    $(document.body).on("click", "a.popup_close", function (e) {
        e.preventDefault();

        $("body").removeClass("dim");
        $(this).closest("div.popup").removeClass("on");
    });

    $(document).ready(function () {
    });

    var getImgList = function (targetView, marketingId, channelType, mdn) {
        var params = {};
        params.marketingId = marketingId;
        params.mdn = mdn;

        $.ajax({
            url: "/api/reporting/solutionImgList",
            data: JSON.stringify(params),
            method: "POST",
            contentType: "application/json"
        }).done(function (result) {
            if (result.resultCode === "200") {
                var listData = {
                    list: result.data,
                    channelType: channelType
                };
                targetView.html(imgPopupTemplate(listData));
                viewImgList(targetView);
            } else {
                is.failNoti(result);
            }
        }).fail(is.failNoti);
    };

    var viewImgList = function (targetView) {
        var $this = targetView;
        var $popup = $this.find(".popup");

        $("body").addClass("dim");
        $popup.addClass("on");

        var $slideView = $this.find(".swiper-slide");

        if ($slideView && $slideView.length > 1) {
            var popup_swiper = new Swiper('.popup_wrap', {
                slidesPerView: 'auto',
                spaceBetween: 0,
                pagination: {
                    el: '.popup_pagination',
                    bulletActiveClass: 'current-position'
                },
            });
        }
    };

    is.initTmplImgPopup = initTmplImgPopup;

}(jQuery, window, document));
