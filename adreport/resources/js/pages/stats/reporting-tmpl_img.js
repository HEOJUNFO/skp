if (!window.is) { window.is = {}; }
( function( $, window, document, undefined ) {
    var imgTmpl = Handlebars.compile($("#imgTemplate").html());

    var viewImg4Main = function (view, adreportImgUrl, channelType) {

        var data = {
            imgUrl: adreportImgUrl,
            channelType: channelType
        };
        view.html(imgTmpl(data));
    };

    is.viewImg4Main = viewImg4Main;

}( jQuery, window, document ));
