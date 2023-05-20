/*
 * ADReport Mobile
 * common javascript file
 * License: SK planet wholly owned
 */
(function ($, window, document, undefined) {

    $(".contents_input").focus(function () {
        $(this).val(""); //place holder 제거
        $(this).parent().parent().addClass("on");
    });

    var listItemTemplate = Handlebars.compile($("#listItemTemplate").html());

    var ENCMDN;
    var PAGE = 1;

    $(document.body).on("click", ".itemWrap", function (e) {
        e.preventDefault();

        var $this = $(this);
        var $dataDiv = $this.find(".ad_type");
        var channelType = is.getChannelType($dataDiv.data("solutioncode"));

        var url = "./reporting.html";
        url += "?mdn=" + is.fixedEncodeURIComponent(ENCMDN);
        url += "&marketingId=" + $dataDiv.data("marketingid");
        url += "&channelType=" + $dataDiv.data("channeltype");
        url += "&contPlcName=" + $dataDiv.data("contPlcName");
        url += "&advertiserMid=" + $dataDiv.data("advertiserMid");
        url += "&realServiceEndDate=" + $dataDiv.data("realServiceEndDate");

        location.href = url;
    });

    $(document.body).on("click", "#moreSearch", function (e) {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        PAGE++;
        searchGateList(PAGE, true);
    });

    $(document.body).on("click", "#adSearchBtn", function (e) {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        $(".ad_list_wrap").html("");

        PAGE = 1;
        searchGateList(PAGE, true);
    });

    var validate = function () {
        if (!$("#contents_input").val()) {
            alert("휴대폰번호를 입력하세요.");
            return false;
        } else {
            return true;
        }
    };

    var searchGateList = function (page, isAsync) {
        $.jStorage.set( "CURPAGE", page );

        var params = {
            mdn: $("#contents_input").val(),
            size: "5",
            page: page + ""
        };

        $.ajax({
            url: "/api/gate/gateList",
            data: JSON.stringify(params),
            method: "POST",
            async: isAsync,
            contentType: "application/json"
        }).done(function (result) {
            if (result.resultCode === "200") {
                if (page !== 1) {
                    if (!result.data.list || result.data.list.length <= 0) {
                        //alert("더보기 할 내용이 없습니다.");
                        $("#moreList").hide();
                        return;
                    }
                }

                $("#moreList").show();

                ENCMDN = result.data.encMdn;

                var nlist = [];
                $.each(result.data.list, function (idex, item) {
                    item.solutionName = is.getSolutionName(item.solutionCode);
                    nlist.push(item);
                });
                result.data.list = nlist;

                if (page === 1) {
                    var totalCnt = 0;

                    totalCnt = result.data.totalCnt ? result.data.totalCnt * 1 : 0;
                    totalCnt += result.data.list4SF ? result.data.list4SF.length : 0;

                    if (totalCnt === 0) {
                        $("#titleCount").html('<span class="title" id="titleCount">최근 3개월내 집행된 광고가 없습니다.</span>');
                        $("#moreList").hide();
                    } else {
                        $("#titleCount").html('<span class="title" id="titleCount">최근 3개월내 집행된 광고가 <em>' + totalCnt + '건</em> 있어요.</span>');
                    }
                }

                var $ad_list_wrap = $(".ad_list_wrap");
                $ad_list_wrap.append(listItemTemplate(result.data));

                if (page === 1) {
                    var offset = $ad_list_wrap.offset();
                    $('html, body').animate({scrollTop : offset.top}, 100);
                }

                var $rowViewList = $(".gateRowView");
                if(result.data.totalCnt <= $rowViewList.length){
                    $("#moreList").hide();
                }
            } else {
                is.failNoti(result);
            }
        }).fail(is.failNoti);
    };

    $(document).ready(function () {
        var CURPAGE = $.jStorage.get("CURPAGE");
        if ($("#contents_input").val() && CURPAGE) {
            var page = (CURPAGE * 1) || 1;
            for (var i = 0; i < page; i++) {
                searchGateList(i + 1, false);
            }
        }

    });
}(jQuery, window, document));