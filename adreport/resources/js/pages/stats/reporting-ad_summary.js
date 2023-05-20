/*
 * ADReport Mobile
 * common javascript file
 * License: SK planet wholly owned
 */
(function ($, window, document, undefined) {
    return;
    var qs = is.parseQuery();
    var listTemplate = Handlebars.compile($("#listTemplate").html());

    var searchAdSummary = function () {
        var params = qs;

        $.ajax({
            url: "/api/reporting/flickingList",
            data: JSON.stringify(params),
            method: "POST",
            contentType: "application/json"
        }).done(function (result) {
            if (result.resultCode === "200") {
                if (result.data.totalCnt === "0") {
                    $(".ad_summary").hide();
                    return;
                }

                $(".ad_summary_list").html(listTemplate(result.data));

                if (result.data.totalCnt > 1) {
                    // return;
                    var swiper = new Swiper('.ad_summary_wrap', {
                        pagination: {
                            el: '.pagination',
                            bulletActiveClass: 'current-position'
                        },
                        loop: true,
                        paginationClickable: true,
                        spaceBetween: 0,
                        initialSlide: 0,
                        followFinger: true,
                        autoplay: {
                            delay: 2500,
                            disableOnInteraction: false
                        }
                    });
                }

            } else {
                is.failNoti(result);
            }
        }).fail(is.failNoti);
    };

    $(document.body).on("click", ".goDetailBtn", function (e) {
        e.preventDefault();

        var $this = $(this);
        var $dataElm = $this.closest(".ad_summary_detail");

        var url = "./reporting.html";
        url += "?mdn=" + is.fixedEncodeURIComponent(qs.mdn);
        url += "&marketingId=" + $dataElm.data("marketingId");
        url += "&channelType=" + $dataElm.data("channelType");
        url += "&contPlcName=" + $dataElm.data("contPlcName");
        url += "&advertiserMid=" + $dataElm.data("advertiserMid");

        console.log(url);
        // return;
        location.href = url;
    });

    var initAdSummary = function () {
        searchAdSummary();
    };

    $(document).ready(function () {
        initAdSummary();
    });

}(jQuery, window, document));