if (!window.is) { window.is = {}; }
( function( $, window, document, undefined ) {
    var sumStatTmpl = Handlebars.compile($("#sumStatTemplate").html());

    var setFirstSumStat = function (view, data) {

        if (!data.sumStats) {
            return;
        }

        view.html(sumStatTmpl(data));
    };

    is.setFirstSumStat = setFirstSumStat;

}( jQuery, window, document ));
