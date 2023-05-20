if (!window.is) { window.is = {}; }
( function( $, window, document, undefined ) {

    $.ajaxSetup({
        timeout: 30000
    });

    $(document).ajaxStart(function () {
        $("body").addClass("dim4spinner");
        $(".spinner").show();
    })
    $(document).ajaxStop(function () {
        $("body").removeClass("dim4spinner");
        $(".spinner").hide();
    });

    Date.prototype.addDays = function( days ) {
        this.setDate( this.getDate() + parseInt( days ) );
        return this;
    };

    jQuery.fn.outerHTML = function(s) {
        return s ? this.before(s).remove()
            : jQuery("<p>").append(this.eq(0).clone()).html();
    };
    jQuery.fn.radioValue = function( data ) {
        var value;
        if ( data ) {
            this.each( function( i, el ) {
                var $el = $( el ),
                    value = $el.val();
                if ( value === data ) {
                    $el.prop( "checked", true );
                }
            } );
        } else {
            this.each( function( i, el ) {
                var $el = $( el );
                if ( $el.prop( "checked" ) ) {
                    value = $el.val();
                }
            } );
            return value;
        }
    };

    var fixedEncodeURIComponent = function(str) {
        return encodeURIComponent(str).replace(/[!'()]/g, escape).replace(/\*/g, "%2A");
    };

    var getSolutionName = function(solutionCode) {
        if (solutionCode === "0131") {
            return "모바일 전단";
        } else if (solutionCode === "0102") {
            return "위치광고";
        } else if (solutionCode === "0130") {
            return "푸시광고";
        } else if (solutionCode === "0129") {
            return "배너광고";
        } else {
            return "시럽프렌즈";
        }
    };

    // 채널타입 채널 타입 (OP : OCB전단PUSH(0131)-모바일전단 / BLE : BLE광고(0102)-위치광고 / SP : 시럽푸시(0130)-Push광고 / DFP : DFP광고(0129)-배너광고 / SF : Syrup 프렌즈 / AT : 광고 타겟 추출)
    var getChannelType = function(solutionCode) {
        if (solutionCode === "0131") {
            return "OP";
        } else if (solutionCode === "0102") {
            return "BLE";
        } else if (solutionCode === "0130") {
            return "SP";
        } else if (solutionCode === "0129") {
            return "DFP";
        } else if (solutionCode === "SF") {
            return "SF";
        } else {
            return "";
        }

    };

    var getChannelTypeName = function(channelType) {
        if (channelType === "OP") {
            return "모바일 전단";
        } else if (channelType === "BLE") {
            return "위치광고";
        } else if (channelType === "SP") {
            return "푸시광고";
        } else if (channelType === "DFP") {
            return "배너광고";
        } else if (channelType === "SF") {
            return "시럽프렌즈";
        } else {
            return "";
        }

    };

    var getToday = function () {
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;    //1월이 0으로 되기때문에 +1을 함.
        var date = now.getDate();

        month = month >=10 ? month : "0" + month;
        date  = date  >= 10 ? date : "0" + date;
        // ""을 빼면 year + month (숫자+숫자) 됨.. ex) 2018 + 12 = 2030이 리턴됨.

        return "" + year + month + date;
    };

    var getCurMonth = function () {
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var date = now.getDate();

        month = month >=10 ? month : "0" + month;
        date  = date  >= 10 ? date : "0" + date;

        return "" + year + month;
    };

    var getPre1Month = function () {
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth();
        var date = now.getDate();

        month = month >=10 ? month : "0" + month;
        date  = date  >= 10 ? date : "0" + date;

        return "" + year + month;
    };

    //Handlebars function
    Handlebars.registerHelper("getSolutionName", function(solutionCode) {
        return is.getSolutionName(solutionCode);
    });

    Handlebars.registerHelper("getChannelType", function(solutionCode) {
        return is.getChannelType(solutionCode);
    });

    Handlebars.registerHelper("dateformat", function (datetime, options) {
        var format = options.hash.format;
        if (!datetime) {return;}
        try {
            var date = datetime.substr(0, 8),
                time = datetime.substr(8),
                d = $.datepicker.parseDate("yymmdd", date),
                hours = time.substr(0, 2),
                minutes = time.substr(2, 2),
                seconds = time.substr(4);
            if (format === "human") {
                datetime = $.datepicker.formatDate("yy년 mm월 dd일 ", d) + hours +
                    "시 " + minutes + "분 " + seconds + "초";
            } else if (format === "dash") {
                datetime = $.datepicker.formatDate("yy-mm-dd", d);
            } else if (format === "dashtime") {
                datetime = $.datepicker.formatDate("yy-mm-dd", d) + " " + hours +
                    ":" + minutes + ":" + seconds;
            }
            return datetime;
        } catch(err) {
            return datetime;
        }
    });
    Handlebars.registerHelper("substr", function(passedString, options) {
        var start = options.hash.start || 0,
            len = options.hash.len;
        return passedString && passedString.substr ? passedString.substr(start, len) : passedString;
    });

    Handlebars.registerHelper("genIndex", function(index, size, page) {
        return (page - 1) * size + (index + 1);
    });
    Handlebars.registerHelper("genDescIndex", function(index, size, page, totalCnt) {
        return (Number(totalCnt)+1)-((page - 1) * size + (index + 1));
    });
    Handlebars.registerHelper( "useDay2", function( items ) {
        var start,
            end;
        if ( items && items.usableDays && items.usableDays !== "0" ){
            return items.usableDays +  "일";
        } else {
            if ( items && items.usableStartDate ){
                start = items.usableStartDate.replace( /\-/g, "." );
                end = items.usableEndDate.replace( /\-/g, "." );
                if ( items.usableStartDate.length > 8 || items.usableEndDate.length > 8 ||  !items.usableStartDate.match(/\-/g) ) {
                    return start.slice( 0, 8 ) + "~" + end.slice( 0, 8 );
                } else {
                    return start + "~" + end;
                }
            } else {
                return "30일";
            }
        }
    });
    Handlebars.registerHelper( "useDay", function() {
        var start,
            end;
        if ( this.usableDays && this.usableDays !== "0" ){
            return this.usableDays +  "일";
        } else {
            if ( this.usableStartDate ){
                start = this.usableStartDate.replace( /\-/g, "." );
                end = this.usableEndDate.replace( /\-/g, "." );
                if ( this.usableStartDate.length > 8 && !this.usableStartDate.match(/\-/g) ){
                    return start.slice( 0, 8 ) + "~" + end.slice( 0, 8 );
                }
                return start + "~" + end;
            } else {
                return "30일";
            }
        }
    });

    Handlebars.registerHelper("yymmddHan", function(date) {
        if(date) {
            if (date.length < 8) {
                return date;
            } else {
                date = date + "";
                return date.substr(2,2) + "년 " + date.substr(4,2) + "월 " + date.substr(6,2) + "일";
            }
        } else {
            return "";
        }
    });

    Handlebars.registerHelper("yyyymmddHan", function(date) {
        if(date) {
            if (date.length < 8) {
                return date;
            } else {
                date = date + "";
                return date.substr(0,4) + "년 " + date.substr(4,2) + "월 " + date.substr(6,2) + "일";
            }
        } else {
            return "";
        }
    });

    Handlebars.registerHelper("yymmHan", function(date) {
        if(date) {
            if (date.length !== 8 && date.length !== 6) {
                return date;
            } else {
                date = date + "";
                return date.substr(2,2) + "년 " + date.substr(4,2) + "월";
            }
        } else {
            return "";
        }
    });

    Handlebars.registerHelper("mmHan", function(date) {
        return is.mmHan(date);
    });

    var mmHan = function(date) {
        if(date) {
            if (date.length !== 8 && date.length !== 6) {
                return date;
            } else {
                date = date + "";
                return date.substr(4,2) + "월";
            }
        } else {
            return "";
        }
    };

    Handlebars.registerHelper("yyyymmdd", function(date) {
        if(date){
            date = date + "";
            return date.substr(0,4) + "." + date.substr(4,2) + "." + date.substr(6,2);
        } else {
            return "";
        }
    });

    Handlebars.registerHelper("yyyymmddhhmiss", function(date) {
        date = date + "";
        return date.substr(0,4) + "." + date.substr(4,2) + "." + date.substr(6,2) + " " + date.substr(8,2) + ":" + date.substr(10,2);
    });

    Handlebars.registerHelper("yyyy-mm-ddhhmiss", function(date) {
        date = date + "";
        return date.substr(0,4) + "-" + date.substr(4,2) + "-" + date.substr(6,2) + " " + date.substr(8,2) + ":" + date.substr(10,2);
    });

    Handlebars.registerHelper("ifvalue", function (conditional, options) {
        if (options.hash.value === conditional) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    Handlebars.registerHelper("iflarger", function (conditional, options) {
        if (options.hash.value < conditional) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    Handlebars.registerHelper("eachRange", function(list, first, last, options) {
        var ret = "";

        for(var i = first; i < last; i++) {
            ret = ret + options.fn(list[i]);
        }

        return ret;
    });

    Handlebars.registerHelper("phoneNumber", function(phoneNumber) {
        if( phoneNumber ) {
            phoneNumber = phoneNumber + "";

            if(phoneNumber.length === 11) {
                return phoneNumber.substr(0,3) + " " + phoneNumber.substr(3,4) + " " + phoneNumber.substr(7,4);
            } else if (phoneNumber.length === 10) {
                return phoneNumber.substr(0,3) + " " + phoneNumber.substr(3,3) + " " + phoneNumber.substr(6,4);
            } else {
                return phoneNumber;
            }
        }
    });

    var commaString = function(number) {
        if ( !number ) {
            return "";
        }
        number = number + "";
        var numberLength = number.length,
            commaCount;

        if( numberLength / 3 > Math.floor(numberLength / 3) ) {
            commaCount = Math.floor(numberLength / 3);
        } else {
            commaCount = Math.floor(numberLength / 3) - 1;
        }

        if(commaCount > 0) {
            var pointer = numberLength;
            for(var i=0; i<commaCount; i++) {
                pointer -= 3;
                number = number.substring(0, pointer) + "," + number.substring(pointer, numberLength);
                numberLength++;
            }
        }
        return number;
    };

    Handlebars.registerHelper("comma", function (number) {
        return is.commaString(number);
    });

    Handlebars.registerHelper("ymd", function( date ) {
        if( date ){
            date += "";
            return date.substr( 0, 4 ) + "년 " + date.substr( 4, 2 ) + "월 " + date.substr(6,2) + "일";
        } else {
            return "";
        }
    });

    Handlebars.registerHelper("yyyy-mm-dd", function( date ) {
        if( date && !isNaN( +date ) ){
            date += "";
            return date.substr( 0, 4 ) + "-" + date.substr( 4, 2 ) + "-" + date.substr( 6,2 );
        } else {
            return "";
        }
    });

    Handlebars.registerHelper({
        indexToOrderNo: function (index) {
            return _indexToOrderNo(index);
        },
        timeText2str: function (item, options) {
            return _syrupEventTextFormatDate(item, options.hash.format);
        },
        indexToPageNo: function (page, size, totalCnt, index) {
            if (isNaN(index * 1)) {
                return index;
            }

            var result = index + 1;

            result = (page - 1) * size + result;

            return result;
        }
    });

    Handlebars.registerHelper({
        indexToOrderNo: function (index) {
            return _indexToOrderNo(index);
        }
    });

    Handlebars.registerHelper("calcPercent", function (a, b) {
        try {
            var a1 = a * 1;
            var b1 = b * 1;

            if (a1 === 0 && b1 === 0) {
                return "0";
            }

            return Math.round(a1/b1 * 100);
        } catch (e) {
            return "0";
        }
    });

    var _indexToOrderNo = function (index) {
        if (isNaN(index * 1)) {
            return index;
        }
        index = index + 1 + "";
        return index;
    };

    // IE용 console.log 에러 방지 코드
    if( !window.console ) {
        window.console = {
            log: function(){} // noop
        };
    }

    var pastValue, pastSelectionStart, pastSelectionEnd;
    $(document.body).on("keydown",".only-number",function(e){
        pastValue          = this.value;
        pastSelectionStart = this.selectionStart;
        pastSelectionEnd   = this.selectionEnd;
    });
    $(document.body).on("propertychange change click keyup input paste", ".only-number", function( e ){
        var regex = /[^0-9]/g;
        var $this = $(this);

        if ($this.val().length > 0 && regex.test($this.val())) {
            $this.val(pastValue);
            $this.selectionStart = pastSelectionStart;
            $this.selectionEnd   = pastSelectionEnd;
        }
    });

    var failNoti = function(result) {
        if (result && result.resultMessage) {
            alert(result.resultMessage);
        } else {
            alert("잠시후 다시 시도하세요.");
        }
    };

    is.fixedEncodeURIComponent = fixedEncodeURIComponent;

    is.getSolutionName = getSolutionName;
    is.getChannelType = getChannelType;
    is.getChannelTypeName = getChannelTypeName;
    is.indexToOrderNo = _indexToOrderNo;
    is.commaString = commaString;
    is.getToday = getToday;
    is.getPre1Month = getPre1Month;
    is.getCurMonth = getCurMonth;
    is.failNoti = failNoti;
    is.mmHan = mmHan;

}( jQuery, window, document ));