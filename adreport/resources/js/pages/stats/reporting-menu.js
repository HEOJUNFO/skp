/*
 * ADReport Mobile
 * common javascript file
 * License: SK planet wholly owned
 */
if (!window.is) { window.is = {}; }
(function ($, window, document, undefined) {
    var qs = is.parseQuery();

    var menuListTmpl = Handlebars.compile($("#menuListTemplate").html());
    var fixed_class_name = ".menu";
    var fixed_class_name_Position = 393;
    var scrollTimer;

    // 상단 메뉴 고정
    $(document).scroll(function (e) {
        return;
        e.preventDefault();
        menu_fix();

        if (scrollTimer) {
            clearTimeout(scrollTimer);
        }
        scrollTimer = setTimeout(function() {
            $(".menuRow").removeClass("on");

            var mobileView = $(".divmenu[data-channel-type='OP']");
            var locationView = $(".divmenu[data-channel-type='BLE']");
            var pushView = $(".divmenu[data-channel-type='SP']");
            var bannerView = $(".divmenu[data-channel-type='DFP']");
            var syrupFriendsView = $(".divmenu[data-channel-type='SF']");

            if (mobileView.length > 0 && checkVisible(mobileView)) {
                $(".menuRow").removeClass("on");
                $(".menuRow[data-channel-type='OP']").addClass("on");
            }
            else if (locationView.length > 0 && checkVisible(locationView)) {
                $(".menuRow").removeClass("on");
                $(".menuRow[data-channel-type='BLE']").addClass("on");
            }
            else if (pushView.length > 0 && checkVisible(pushView)) {
                console.log(pushView);
                $(".menuRow").removeClass("on");
                $(".menuRow[data-channel-type='SP']").addClass("on");
            }
            else if (bannerView.length > 0 && checkVisible(bannerView)) {
                $(".menuRow").removeClass("on");
                $(".menuRow[data-channel-type='DFP']").addClass("on");
            }
            else if (syrupFriendsView.length > 0 && checkVisible(syrupFriendsView)) {
                $(".menuRow").removeClass("on");
                $(".menuRow[data-channel-type='SF']").addClass("on");
            }
            // do something
        }, 30);

    });

    function checkVisible( $elm, eval ) {
        if (!$elm) {
            return false;
        }

        eval = eval || "object visible";
        var viewportHeight = $(window).height(), // Viewport Height
            scrolltop = $(window).scrollTop(), // Scroll Top
            yTop = $elm.offset().top,
            elementHeight = $($elm).height();

        // console.log("viewportHeight : " + viewportHeight + " / scrolltop : " + scrolltop + " / yTop : " + yTop + " / elementHeight : " + elementHeight + " / id : " + $(elm).attr("id"));

        // var prevElm = $(elm).prev();
        // var prevElementHeight
        if (yTop > 0) {
            yTop = yTop - (viewportHeight / 2);
        }

        if (eval == "object visible") return ((yTop < (viewportHeight + scrolltop)) && (yTop > (scrolltop - elementHeight)));
        if (eval == "above") return ((yTop < (viewportHeight + scrolltop)));
    }

    $(document.body).on("click", ".menu_wrap > div > div > a", function (e) {
        e.preventDefault();
        $(".menu_wrap > div > div > a").removeClass('on');
        $(this).addClass('on');
        fnMove($(this).attr('id'));
    });

    var resetMenuPosition = function () {
        fixed_class_name_Position = $(fixed_class_name).offset().top;
        fixed_class_name_Position = $("header").height() + $(".ad_summary").height();
    };

    var initMenuOrder = function () {
        // var orderDefault = ["OP", "BLE", "SP", "DFP", "SF"];
        var orderDefault = ["OP", "BLE", "DFP", "SF"];
        var mainChannelType = qs.channelType;
        var orderList = [];

        orderList.push(mainChannelType);

        for (var i = 0; i < orderDefault.length; i++) {
            if (orderDefault[i] !== mainChannelType) {
                orderList.push(orderDefault[i]);
            }
        }

        $("#menuDisplayArea").html(menuListTmpl(orderList));

        var menu_swiper = new Swiper('.menu_wrap', {
            spaceBetween: 0,
            slidesPerView: 'auto',
            freeMode: true
        });
    };

    var menu_fix = function() {
        resetMenuPosition();

        if (window.scrollY >= fixed_class_name_Position) {
            $(fixed_class_name).addClass("fixed");
            $(".leaflet:first").css("padding-top", $(fixed_class_name).height());
        }
        else {
            $(fixed_class_name).removeClass("fixed");
            $(".leaflet:first").css("padding-top", 0);
        }
    };

    var fnMove = function(id) {
        id = "#div" + id;

        var offset = $(id).offset();
        var num = 0;
        if (id === "#divmenu1") {
            num = 0;
        } else {
            num = 50;
        }
        $("html, body").animate({scrollTop: offset.top - num}, 350);
    };

    is.initMenuOrder = initMenuOrder;
}(jQuery, window, document));