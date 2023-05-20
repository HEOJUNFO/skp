if (!window.is) { window.is = {}; }
is.unescape = function( str ) {
    var escapeElementDic = {
        "&nbsp;":"\xA0",
        "&lt;":"<",
        "&gt;":">",
        "&amp;":"&",
        "&quot;":"\"",
        "&apos;":"'"
    }, matches;
    $.each( escapeElementDic, function(k,v) {
        var regex = new RegExp( k, "g");
        str = str.replace( regex, v );
    });
    // &#x27과 같은 hex문자들 처리.
    matches = str.match( /&#x(2\d);/g );
    if (matches) {
        $.each( matches, function(k,v) {
            str = str.replace( new RegExp(v,"g"), String.fromCharCode("0x"+v.slice(3,5)) );
        });
    }
    return str;
};
is.parseQuery = function(qs) {
    qs = qs || location.search;
    var result = {},
        keyValuePairs = qs.slice(1).split("&");

    for (var i = 0, l = keyValuePairs.length; i < l; i++) {
        var keyValuePair = keyValuePairs[i].split("=");
        if (keyValuePair[0] !== "" && !!keyValuePair[1]) {
            result[keyValuePair[0]] = decodeURIComponent(keyValuePair[1]) || "";
        }
    }
    return result;
};
is.insertString = function ( origin, index, string) {
    if ( typeof origin !== "string" ) {
        return false;
    }
    if ( index > 0 ) {
        return origin.substring(0, index) + string + origin.substring(index, origin.length);
    } else {
        return string + origin;
    }
};
// array subtraction by array
is.subtractArray = function( firstArray, secondArray ) {
    var result = [];
    firstArray.map( function( element ) {
        if ( secondArray.indexOf( element ) === -1 ) {
            result.push( element );
        }
    });
    return result;
};
is.telAreaCode = [ "02", "031", "032", "033", "041", "042", "043", "044", "051", "052", "053", "054", "055", "061", "062", "063", "064", "0502", "0503", "0504", "0505", "0506", "0507", "0508", "030", "050", "060", "070", "080","010", "011", "016", "017", "018", "019"];
is.parseTelNo = function(tel) {
    var obj = {},
        i,
        tmpl,
        tel1 = is.telAreaCode;
    if(!tel) {
        return "";
    }
    tel = tel.replace(/-/g, ""); //-제거

    if (tel && tel.length >= 9) { //최소 9자 021111111
        for ( i = 0; i < tel1.length; i++) {
            if (tel.indexOf(tel1[i]) === 0) {
                obj.tel1 = tel.substr(0, tel1[i].length);
                tel = tel.substr(tel1[i].length);
                if (tel.length > 8) { //invalid but...
                    obj.tel2 = tel.substr(0, 4);
                    obj.tel3 = tel.substr(4);
                } else {
                    obj.tel2 = tel.substr(0, tel.length - 4);
                    obj.tel3 = tel.substr(tel.length - 4, 4);
                }
                break;
            }
        }
        if (obj.tel1) {
            tmpl = Handlebars.compile("{{tel1}}-{{tel2}}-{{tel3}}");
            return tmpl(obj);
        }
    } else if( tel && tel.length <= 8 &&  tel.length >= 5 ) { // 5~8자 사이(국번없을때)
        obj.tel3 = tel.substr( tel.length - 4, 4 );
        obj.tel2 = tel.substr( 0, tel.length - 4 );
        tmpl = Handlebars.compile("{{tel2}}-{{tel3}}");
        return tmpl(obj);
    }
    return "";
};

is.alert = function(msg) {
    // TODO: 노티페케이션을 보여주도록 수정해야 함
    alert(msg);
};

//input[type=file]의 value를 초기화함.
is.resetFileInput = function($input){
    $input = $($input);
    $input.val("");

    var $form = $("<form>"),
        $placeholder = $("<div>");

    $(document.body).append($form);
    $input.before($placeholder);
    $input.appendTo($form);
    $form.get(0).reset();
    $placeholder.after($input);
    $placeholder.remove();
    $form.remove();
};

// 1의 자리는 표시 안함.
// 0 : 없음
// 1~9 : 10명 미만
// 10~만 : 천의 자리에서 ,로 끊어주고 1의 자리 표시 안함.
// 만~백만 : 만,천 혼합사용
// 백만 이상 : 만단위만 사용
is.formatNumber = function(n, unit) {
    var maan, chon, res;
    var pattern = /(-?[0-9]+)([0-9]{3})/;
    if (!unit) {
        unit = "명";
    }

    if (isNaN(n * 1)) {
        return n;
    }
    if(unit !== "명") {
        n = n + "";

        while (pattern.test(n)) {
            n = n.replace(pattern,"$1,$2");
        }
        return n+unit;
    }

    if (n===0) {
        return "없음";
    }
    else if (n<10) {
        // 10 미만의 경우 처리.
        return "10"+unit+" 미만";
    }
    else if (n<10000) {
        // 10~만 : 천의 자리에서 ,로 끊어주고 1의 자리 표시 안함.
        n = Math.floor( n / 10 ) * 10 + "";

        while (pattern.test(n)) {
            n = n.replace(pattern,"$1,$2");
        }
        return n+"여"+unit;
    } else if (n<1000000) {
        // 만~백만 : 만,천 혼합사용
        chon = Math.floor( (n/1000) % 10 );
        maan = Math.floor( n/10000 );
        res = maan + "만";
        if (chon>0) {
            res += chon + "천";
        }
        return res+"여"+unit;
    } else {
        // 백만 이상 : 만단위만 사용
        maan = Math.floor( n/10000 );
        return maan+"만여"+unit;
    }

    return "Error";
};

/**
 * Sungwon Kim, 2014.05.29
 *
 * CALL
 * is.formatDate( token, date, format, hasZero );
 *
 * PARAM
 * 1. token : '.', '/', '-', '년월일', ' ', ETC..
 * 2. date : 20140102
 * 3. format : 'yyyymmdd', 'yyyymm', 'yymmdd', 'yymm', 'mmdd'
 * 4. hasZero : true, false (optional)
 *
 * EXAMPLE
 * is.formatDate( "-", "20141005", "yymmdd" );
 * 14-10-05
 **/
is.formatDate = function( token, date, format, hasZero ){
    var formatPool = ["yyyymmdd","yyyymm","yymmdd","yymm","mmdd"],
        regExp = /^((19|20)\d\d+)(0[1-9]|1[012]+)(0[1-9]|[12][0-9]|3[01])$/,
        _date = date,
        _format = _format || "yyyymmdd",
        _token_y,
        _token_m,
        _token_d;

    // format이 formatPool에 있을 경우 적용
    $.each( formatPool, function(i, e){
        if(e === format) {
            _format = format;
        }
    });

    // date validation
    if( !_date || !_date.match(regExp) ) {
        return date;
    }

    // token이 년월일 경우만 예외처리
    if( token === "년월일" ) {
        _token_y = "년 ";
        _token_m = "월 ";
        _token_d = "일";
    } else {
        _token_y = _token_m = _token_d = token;
    }

    var yyyy = hasZero ? _date.slice(0,4) : +_date.slice(0,4),
        yy = hasZero ? _date.slice(2,4) : +_date.slice(2,4),
        mm = hasZero ? _date.slice(4,6) : +_date.slice(4,6),
        dd = hasZero ? _date.slice(6,8) : +_date.slice(6,8);

    if( format === "yyyymmdd" ) {
        _date = yyyy + _token_y + mm + _token_m + dd + _token_d;
    } else if(format === "yyyymm") {
        _date = yyyy + _token_y + mm + _token_m;
    } else if(format === "yymmdd") {
        _date = yy + _token_y + mm + _token_m + dd + _token_d;
    } else if(format === "yymm") {
        _date = yy + _token_y + mm + _token_m;
    } else if(format === "mmdd") {
        _date = mm + _token_m + dd + _token_d;
    } else {
        return date;
    }

    // "년월일"이 아닌 경우는 일 뒤에 토큰이 붙지 않으므로 잘라냄
    if( token !== "년월일" ) {
        _date = _date.slice(0, _date.length - token.length);
    }

    return _date;
};

is.isLocationing = false;
is.cbFail = function(xhr) {
    var ERROR_CODE = {
        "UNCERTIFICATED": "401"
    };
    var ERROR_CODE_MESSAGE = "자동 로그아웃 되었습니다.\n다시 로그인해주세요. \n\n아래의 사유중 1개에 속한 경우 소다 자동 로그아웃 합니다. \n1. 로그인 후 30분 이상 사용하지 않은 경우 \n2. 다른 PC, 브라우저에서 로그인 한 경우 \n3. 운영자에 의해 로그아웃 처리 된 경우 \n";
    if (app) {
        if (app.name == "ia") {
            ERROR_CODE_MESSAGE = "자동 로그아웃 되었습니다.\n다시 로그인해주세요. \n\n아래의 사유중 1개에 속한 경우 소다 자동 로그아웃 합니다. \n1. 로그인 후 30분 이상 사용하지 않은 경우 \n2. 다른 PC, 브라우저에서 로그인 한 경우 \n3. SODAR IA 계정 사용기간이 만료된 경우 (IDMS에서 갱신 신청 필요)\n";
        }
    }
    if( xhr && xhr.responseJSON && xhr.responseJSON.error && xhr.responseJSON.error.id === ERROR_CODE.UNCERTIFICATED && !is.isLocationing ) {
        window.location.href = "/";
        is.isLocationing = true;
        is.alert( ERROR_CODE_MESSAGE );
    } else if (xhr && xhr.status === 0) {
        // SS-15883 : chrome에서 페이지 이동 시에는 status:0인 경우가 발생하므로 예외처리 추가함.
        console.log("error occurs but pass...");
        return;
    }
    // only if error.message is valid
    else if (xhr && xhr.responseJSON && xhr.responseJSON.error && xhr.responseJSON.error.message && !is.isLocationing && xhr.responseJSON.error.code!=="4011") {
        // 페이지 이동 중에는 알러트 메시지 띄우지 않음
        is.alert( xhr.responseJSON.error.message );
    }
    else if (xhr && xhr.responseJSON && xhr.responseJSON.responseMsg) {
        is.alert( xhr.responseJSON.responseMsg );
    }
    else if (xhr && xhr.responseJSON && xhr.responseJSON.responseMessage) {
        is.alert( xhr.responseJSON.responseMessage );
    }
};
is.onFileFail = function (msg) {
    is.alert(msg);
};

/**
 * file uploader
 * @param {Object} option
 * @example
 * is.fileUpload({
 *      target: $('input[type=file]'), // selector string | DOM element | jQuery object
 *      form: '#submit-form', // selector string | DOM element | jQuery object
 *      validation: {
 *          minwidth: '',
 *          minheight: '',
 *          minheight: '',
 *          maxheight: '',
 *          minsize: '',
 *          maxsize: '',
 *          validationMessage: ''
 *      }
 *      success: function () {},
 *      fail: function () {}
 * });
 */
is.fileUpload = function (option) {
    console.log(option);
    var _alertMessage = function( title, msg ){
        if ( popup && title && $("#certification-popup" ).length > 0  ) {
            is.customModal( title,  msg );
        } else {
            is.alert(msg);
        }
    };
    var $form,
        $inputbox,
        inputbox = option.target,
        isDOMElement = function (obj) {
            return ( typeof obj === "object" ) && ( obj.nodeType===1 ) &&
                ( typeof obj.style === "object" ) && ( typeof obj.ownerDocument ==="object" );
        },
        title = option.popupTitle,
        popup = option.popup,
        resetForm;

    if ( !option.form && !option.target) {
        return;
    }

    // in case inputbox == selector string || DOM element
    if ( typeof inputbox === "string" || isDOMElement(inputbox) ) {
        $inputbox = $(inputbox);
    } else if (inputbox instanceof jQuery) {
        $inputbox = inputbox;
    }
    inputbox = $inputbox && $inputbox[0];

    if ( option.form ) {
        if ( typeof option.form === "string" || isDOMElement(option.form) ) {
            $form = $(option.form);
        } else if (option.form instanceof jQuery) {
            $form = option.form;
        }
    } else {
        $form = $($inputbox[0].form);
    }

    resetForm = function () {
        $form.find("[name='responseTpl']").remove();
        $form.find("[name='errorTpl']").remove();
        $form.find("[name='valid']").remove();
        $form.find("[name='minheight']").remove();
        $form.find("[name='maxheight']").remove();
        $form.find("[name='minwidth']").remove();
        $form.find("[name='maxwidth']").remove();
        $form.find("[name='minsize']").remove();
        $form.find("[name='maxsize']").remove();
    };

    // Success/fail handlers
    is.onUploadSuccess = function (data) {
        if ( option.success ) {
            option.success.call(inputbox, data);
        }
        is.$iframe.detach();
        $form.find( ".file-upload-inputs" ).remove();
        is.opUploadSuccess = function () {};
        resetForm();
    };

    is.onUploadFail = function(msg) {
        if ( option.fail ) {
            option.fail.call(inputbox, msg);
        }
        is.$iframe.detach();
        $form.find( ".file-upload-inputs" ).remove();
        is.onUploadFail = function () {};
        resetForm();
    };

    // setup hidden iframe
    if ( !is.$iframe ) {
        is.$iframe = $("<iframe>").attr("name", "file_upload_target").hide();
    }
    $("body").append(is.$iframe);
    $form.attr("target", "file_upload_target");

    // set form attributes from option
    if ( option.url ) {
        $form.attr( "action", option.url );
    }

    if ( option.data ) {
        $.each( option.data, function ( name, data ) {
            $form.append("<input type='hidden' class='file-upload-inputs' value='" + data + "' name='" + name + "'>");
        } );
    }
    if( option.domain ){
        $form.append("<input type='hidden' class='file-upload-inputs hide'  value='<!DOCTYPE HTML><html><body>{ISS}document.domain=\"syrup.co.kr\";parent.is.onUploadSuccess({RESPONSE_JSON});{/ISS}<body></html>' name='responseTpl' class='responseTpl'/>");
        $form.append("<input type='hidden' class='file-upload-inputs hide'  value='<html><body>{ISS}document.domain=\"syrup.co.kr\";parent.is.onUploadFail(\"{ERROR_MESSAGE}\");{/ISS}</body></html>' name='errorTpl' class='errorTpl'/>");
        $form.append("<input type='hidden' class='file-upload-inputs hide'  value='1' name='tplType' />");
    } else {
        $form.append("<input type='hidden' class='file-upload-inputs'  value='<!DOCTYPE HTML><html><body>{ISS}parent.is.onUploadSuccess({RESPONSE_JSON});{/ISS}<body></html>' name='responseTpl' class='responseTpl'/>");
        $form.append("<input type='hidden' class='file-upload-inputs'  value='<html><body>{ISS}parent.is.onUploadFail(\"{ERROR_MESSAGE}\");{/ISS}</body></html>' name='errorTpl' class='errorTpl'/>");
        $form.append("<input type='hidden' class='file-upload-inputs hide'  value='2' name='tplType'/>");
    }

    // file size check
    if ( option.validation ) {
        // if Browser has HTML5 File API Spec
        if( $inputbox.length > 0 && $inputbox[0].files && $inputbox[0].files.length > 0 && $inputbox[0].files[0].size > 0) {
            var fileSize = $inputbox[0].files[0].size,
                img = new Image();

            if( option.validation.maxsize && option.validation.maxsize < fileSize ) {
                _alertMessage( "확인", "이미지 사이즈가 큽니다. " + option.validation.maxsize + "byte 이하의 이미지를 등록해 주세요" );
                return false;
            } else if ( option.validation.minsize && option.validation.minsize > fileSize ) {
                _alertMessage( "확인", "이미지 사이즈가 작습니다. " + option.validation.minsize + "byte 이상의 이미지를 등록해 주세요" );
            }


            img.onload = function(){
                var $uploadedImage = $(this);
                // Image File Width check
                if( +option.validation.minwidth && +option.validation.minwidth > $uploadedImage[0].width ||
                    +option.validation.minheight && +option.validation.minheight > $uploadedImage[0].height ||
                    +option.validation.maxwidth && +option.validation.maxwidth < $uploadedImage[0].width ||
                    +option.validation.maxheight && +option.validation.maxheight < $uploadedImage[0].height ) {
                    // form을 리셋시키는 버그 발견
                    // 일단 아래 코드는 deprecated by 한정현M. 2016.06.14
                    // JIRA : http://jira.skplanet.com/browse/SS-13510
                    //$form[0].reset();
                    if( option.validation.validationMessage ) {
                        _alertMessage( "확인", option.validation.validationMessage );
                    } else {
                        _alertMessage( "확인", "이미지 사이즈를 확인해 주세요." );
                    }
                } else {
                    $form[0].submit();
                }
            };
            img.src = window.URL.createObjectURL($inputbox[0].files[0]);

        } else {
            $form.append("<input type='hidden' name='valid' value='true'>");
            for( var checkProperty in option.validation ) {
                $form.append("<input type='hidden' name='" + checkProperty + "' value='" + option.validation[ checkProperty ] + "'>");
            }
            $form[0].submit();
        }
    } else {
        $form[0].submit();
        if ( option.triggerEvent ) {
            $form.trigger( "submit" );
        }
    }
};

/**
 * Image load Event Callback Function
 * @function
 * @param {Object} res | file upload event response object
 * @description 이미지 onload 될때 이벤트 callback 함수, 자동으로 crop이 실행되고 crop이 가능함
 * @dependency : cropper.js & ROL Image Server
 * @author : junghyun.han@sk.com
 * @example
 * 아래 위키 페이지 참조
 * http://wiki.skplanet.co.kr/display/wtdt/is.loadImage
 * 1) $.ajax( '/v1/image/marketing/upload' ). done( function( res ){
 *        is.loadImage( res );
 *    });
 * 2) $this.append( "<input type='hidden' value='<!DOCTYPE HTML><html><body><script type=text/javascript>parent.is.loadImage({RESPONSE_JSON});</script></body></html>' name='responseTpl' />");
 */
is.loadImage = function( res, name, width, height ) {
    var url = res.url,
        picsPath = res.picsPath,
    // img Element 는 공용으로 사용 가능
        $img = $( ".default>img" ),
    // rolPreUrl = "http://pics-dev.skplanet.com",
        $imgPopup = $( "#image-edit-popup" ),
    //기본값은 720
        limitWidth = +width || 720,
        limitHeight = +height || 720;
    var cropImage = function( url, w, h, x, y, rw, rh ){
        var info = "is/",
            data = {};
        var _makeString = function( key, value ){
            if ( value === 0 || value ){
                info += key + value;
            }
        };
        _makeString( "w", w );
        _makeString( "h", h );
        _makeString( "@x", x );
        _makeString( "y", y );
        _makeString( "w", rw );
        _makeString( "h", rh );
        info += "/marketing";
        data.picsPath = url.replace( /is\/-\/marketing/g, info );
        $.post( "/v1/image/brand/rol-upload", data ).done( function( res ){
            // 만약 각 crop 이미지를 선택했을때 이벤트를 변경 하고싶다면. 아래 영역에 추가 하면 된다.
            // 쿠폰 만들기 & 이벤트 만들기 에서 업로드한 이미지에 따라 화면변경
            $( ".cp_img_area" ).empty().html( $("<img>").attr( "src", res.url ) );
            $( ".cp_goods_info>p>img" ).attr( "src", res.url );
            $( "#file-upload" ).attr( "data-url", res.url );
            $( "#file-upload" ).parent().siblings("input").val( name );
            // 쿠폰 만들기 & 이벤트 만들기 에서 업로드한 이미지에 따라 화면변경
            // 가맹점정보수정에서활용하기위해다음과같이수정
            $( "." + name ).attr( "src", res.url );
            $( "#" + name ).attr( "data-url", res.url );
            //
            $imgPopup.modal( "hide" );
        }).fail( is.cbFail );
    };
    $( "#progress" ).modal( "hide" );
    $( ".cropper-container" ).remove();
    $img.attr( "src", "" );
    $img.removeClass( "cropper-hidden" )
        .removeData( "cropper" )
        .attr( "src", url );
    $imgPopup.modal("show");
    $.jStorage.set( "picsPath", picsPath );
    $img.off( "load" ).on( "load", function ( ) {
        if (  !( $img[0].width >= limitWidth && $img[0].height >= limitHeight ) ){
            $imgPopup.modal( "hide" );
            is.customModal( "오류", "가로 세로 "+ limitWidth + "px x " + limitHeight + "px 이상의 이미지를 업로드해주세요." );
            $img.removeAttr( "src" );
        }
        $img.cropper({
            done: function( data ) {
                var size = data,
                    picsPath = $.jStorage.get( "picsPath");
                $( "#select-image" ).off( "click" ).on( "click", function( ){
                    cropImage( picsPath, limitWidth, limitHeight, size.x1, size.y1, size.width, size.height );
                });
            }
        });
    });
};

/**
 * Sungwon Kim, 2014.11.13
 * CALL
 * is.getHtmlWithCors( url, selector );
 *
 * PARAM
 * 1. url : API url ( mandatory )
 * 2. cookieName : cookies name ( mandatory )
 * 3. id : selector of html wrapper ( optional )
 *
 * EXAMPLE
 * is.getHtmlWithCors( "http://targetstatdev2.syrup.co.kr/statistics/publish", "MASESSIONID", "#content" );
 * is.getHtmlWithCors( "http://targetstatdev2.syrup.co.kr/statistics/publish", "MASESSIONID", $("#content") );
 * is.getHtmlWithCors( "http://targetstatdev2.syrup.co.kr/statistics/publish", "MASESSIONID" );
 **/
is.getHtmlWithCors = function( url, cookieName, selector ){
    var $selector;
    if( selector instanceof jQuery ) {
        $selector = selector;
    } else if ( selector ){
        $selector = $( selector );
    } else {
        $selector = $( "#content" );
    }

    $.ajax({
        url: url,
        dataType: "html",
        type: "GET",
        data: {
            "maSessionId": encodeURIComponent( cookieName + "=" + $.cookie(cookieName) )
        },
        success: function( html ) {
            $selector.html( html );
        },
        error: is.cbFail
    });
};

/**
 * is.isDev()
 * 현재 location.hostname의 첫자리에 dev가 포함되었는지 아닌지를 체크하는 함수.
 * dev로 끝나고 dev 뒤에 숫자가 존재하는 경우에는 true를 반환.
 * 그 외의 경우에는 false를 반환함.
 *
 * 예제.
 * is.isDev() @storeadmindev2.syrup.co.kr === true
 * is.isDev() @storeadmin.syrup.co.kr === false
 * is.isDev() @storeadmindev.syrup.co.kr === true
 * is.isDev() @www.naver.com === false
 **/
is.isDev = function() {
    if (location && location.hostname && location.hostname.split(".") && location.hostname.split(".")[0])
    {
        var basename = location.hostname.split(".")[0];
        return !!basename.match(/.+dev(\d*)/);
    }
    return false;
};


/**
 * Sungwon Kim, 2014.11.17
 * CALL
 * is.getBytesOfString( text );
 *
 * PARAM
 * 1. text : String
 *
 * EXAMPLE
 * is.getBytesOfString( $("input[type='text']").val() ); // return 29
 **/
is.getBytesOfString = function( val ){
    var str = String( val ),
        bytes = 0;
    for (var i = 0; i < str.length; i++) {
        var charCode = str.charCodeAt(i);
        bytes += charCode < (1 <<  7) ? 1 :
                charCode < (1 << 11) ? 2 :
                charCode < (1 << 16) ? 3 :
                charCode < (1 << 21) ? 4 :
                charCode < (1 << 26) ? 5 :
                charCode < (1 << 31) ? 6 : Number.NaN;
    }
    return bytes;
};
// handlebars select 함수
is.handlebars = function ( elem, template ){
    var $el = $( elem ),
        $template = $( template ),
        tmpl = Handlebars.compile( $template.html() );
    if ( $el.length === 0 ) {
        alert( "Handlebars Elem 오류 " +  elem );
        return false;
    }
    if ( !template || $template.length === 0 ) {
        alert( "Handlebars template 오류 " +  template );
        return false;
    }
    return {
        "$el": $el,
        "tmpl": tmpl
    };
};

/**
 * Get Safe and Escaped HTML String from the DOM node contents
 * @function
 * @param {Object} node | DOM node reference to be read
 * @return {string} Safe and escaped HTML string of the given node
 * @description 입력받은 DOM node의 contents를 읽어 HTML Tag들을 제거하고, rendered DOM node와 비슷하게 보일 수 있도록 <br> Tag를 추가한다.
 * @author : sw.jeong@sk.com
 */
is.getSafeEscapedHtml = function( node ) {
    var stopperElements = [
        "CODE", "KBD", "SAMP", "VAR", "BDO", "IMG", "MAP", "OBJECT", "SCRIPT", "BUTTON", "INPUT", "SELECT", "TEXTAREA"
    ];
    var inlineElements = [
        "B", "BIG", "I", "SMALL", "TT", "ABBR", "ACRONYM", "CITE", "DFN", "EM", "STRONG", "A", "Q", "SPAN", "SUB", "SUP", "LABEL"
    ];
    var newlineElements = [
        "DIV", "P", "UL", "OL", "LI", "TABLE", "TR"
    ];

    var escapeElementDic = {
        "\xA0" : "&nbsp;",  // non-breaking space
        "<"    : "&lt;",
        ">"    : "&gt;",
        "&"    : "&amp;",
        "\""   : "&quot;"
    };

    function iterateChildNodes( node, textList ) {
        for ( var i = 0; i < node.childNodes.length; i++ ) {
            var child = node.childNodes[i];
            if ( child.nodeType === 1 ) {           // ELEMENT_NODE
                if ( stopperElements.indexOf( child.tagName ) !== -1 ) {
                    continue;
                }
                if ( newlineElements.indexOf( child.tagName ) !== -1 ) {
                    textList.push( "<br>" );
                }
                if ( child.tagName === "BR" && child.nextSibling ) {
                    textList.push( "<br>" );
                }
                if ( inlineElements.indexOf( child.tagName) !== -1 ) {
                    iterateInlineNodes( child, textList );
                } else {
                    iterateChildNodes( child, textList );
                }
            } else if ( child.nodeType === 3 ) {    // TEXT_NODE
                if ( child.nodeValue.trim().length > 0 ) {
                    for ( var textIndex = 0; textIndex < child.nodeValue.length; textIndex++ ) {
                        var text = child.nodeValue.charAt( textIndex );
                        var escapedText = escapeElementDic[ text ];
                        if ( escapedText ) {
                            textList.push( escapedText );
                        } else {
                            textList.push( text );
                        }
                    }
                }
            }
        }
    }

    function iterateInlineNodes( node, textList ) {
        for ( var i = 0; i < node.childNodes.length; i++ ) {
            var child = node.childNodes[i];
            if ( child.nodeType === 1 ) {           // ELEMENT_NODE
                if ( inlineElements.indexOf( child.tagName ) !== -1 ) {
                    iterateInlineNodes( child, textList );
                }
            } else if ( child.nodeType === 3 ) {    // TEXT_NODE
                var trimedNodeValue = child.nodeValue.trim();
                if ( trimedNodeValue.length > 0 ) {
                    textList.push( trimedNodeValue );
                }
            }
        }
    }

    var textList = [];
    iterateChildNodes( node, textList );

    while ( true ) {
        if ( textList[ textList.length - 1] === "<br>" ) {
            textList.pop();
        } else {
            break;
        }
    }

    return textList.join( "" );
};

is.getValueById = function ( id ) {
    if (id != "") {
        return $("#" + id).val();
    }
    return null;
};

is.contentType = function(type) {
    let contentType = '';
    if (type === 'APPLICATION_JSON_UTF8') {
        contentType = 'application/json; charset=utf-8';
    }
    return contentType;
};
