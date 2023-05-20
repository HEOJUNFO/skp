/*
 * ADReport Mobile
 * common javascript file
 * License: SK planet wholly owned
 */
(function ($, window, document, undefined) {
    //if (!window.is) { window.is = {}; }

    const nftBannerTemplate = Handlebars.compile($("#nftBannerTemplate").html());
    const nftRepositoryTemplate = Handlebars.compile($("#nftRepositoryTemplate").html());
    const nftRepositoryCollectionTemplate = Handlebars.compile($("#nftRepositoryCollectionTemplate").html());
    const couponRepositoryTemplate = Handlebars.compile($("#couponRepositoryTemplate").html());
    const couponRepositoryCollectionTemplate = Handlebars.compile($("#couponRepositoryCollectionTemplate").html());

    let isNftWalletAddress = false;
    const eventSessionData = sessionStorage.getItem('eventSessionData');
    let eventSessionDataParser = "";
    //let globalNftWalletAddress = "";
    let nftWalletId = 0;
    let nftRepositoryId = 0;
    //let nftTransStatus = 0;
    let diffServiceEndDateTodayCount = 0;
    let winningType = "";

    if (!eventSessionData) {
        is.showCommonPopup(1, "pageAbnormalConnectionError", is.createCommonPopupBtnOpt(undefined, is.historyBack));
        return;
    }

    if (eventSessionData) { 
        eventSessionDataParser = JSON.parse(eventSessionData);
        winningType =  eventSessionDataParser.winningType.toUpperCase();
        
        if (winningType === 'NFT') {
            $.innerText("#titleName", "NFT 보관함");
            $.innerText("#winningTypeName", "NFT");
        } 
        if (winningType === 'NFTCP') {
            $.innerText("#titleName", "쿠폰 보관함");
            $.innerText("#winningTypeName", "쿠폰");
        }
    }

    //NFT, 쿠폰 보관함 목록 API
    const _searchNftRepository = function(eventId, phoneNumber, attendCode) {
        
        sessionStorage.removeItem('nftId');
        sessionStorage.removeItem('nftRepositoryId');

        if (!phoneNumber) {
            is.showCommonPopup(1, "confirmPhoneNumber");
            return;
        }

        const reqParam = {
            eventId : eventId,
            userPhoneNumber : eventSessionDataParser.isPhoneNumber == true ? phoneNumber : "",
            attendCode : eventSessionDataParser.isAttendCode == true ? attendCode : "",
            winningType : winningType
        }
        
        $.post({
            url : '/api/v1/web-event-front/nft-repository/search', 
            data : JSON.stringify(reqParam), 
            contentType : 'application/json; charset=utf-8'
        })
        .done(function(res, text, xhr) {
            if (xhr.status === 200) {

                if (res.resultCode === 200) {
                    let result = res.result;
                    console.log(result);

                    //이벤트 종료일60일 이후 접속 불가 예외처리
                    diffServiceEndDateTodayCount = result.diffServiceEndDateTodayCount;
                    if (result.diffServiceEndDateTodayCount > 60) {
                        is.showCommonPopup(1, "noConnectPage", is.createCommonPopupBtnOpt(undefined, is.historyBack));
                        return;
                    }
                    //배너정보
                    if (result.nftBannerInfo.length > 0) {
                        $("#nftBannerTemplateDiv").html(nftBannerTemplate(result.nftBannerInfo));
                        new Swiper('.event .swiper-container', {
                            watchOverflow : true,
                            resistance : true,
                            resistanceRatio : 0,
                            pagination: {
                                el: ".event .swiper-pagination",
                                //dynamicBullets: true,
                                clickable: true,
                                },
                            autoplay: {
                                delay : 2000,
                                disableOnInteraction: false
                            },
                            loof: true
                        });
                    }
                    
                    if (winningType === 'NFT') {
                        //지갑수소가 있을때
                        if (result.nftWalletInfo.nftWalletAddress) {
                            var walletAddress = result.nftWalletInfo.nftWalletAddress;

                            $('.ntf_addr .contents_input').attr('disabled', 'disabled').val(walletAddress);
                            $('.info_form ul li').addClass('on');
                            $('#nftAddrText').addClass('modify').html('수정');
                            isNftWalletAddress = true;
                            globalNftWalletAddress = walletAddress;
                            nftWalletId = result.nftWalletInfo.id;
                        }
                        //지갑수소가 없을때
                        if (!result.nftWalletInfo.nftWalletAddress) {
                            $.innerText("#nftAddrText", "지갑 생성 방법");
                            //$('#nftAddrText').html('지갑 생성 방법');
                            $('#saveNftBtn').parent().show();
                        }

                        //NFT 정보가 없을때
                        if (result.nftRepositoryInfo.length === 0) {
                            $.showElement('.empty');
                        }
                        
                        //NFT 정보가 있을때
                        if (result.nftRepositoryInfo.length > 0) {
                            $.showElement('.my_wallet');
                            $.showElement('#nftMyCollection');

                            $('#nftRepositoryTemplateDiv').html(nftRepositoryTemplate(result.nftRepositoryInfo));
                            new Swiper(".my_collection .swiper-container", {
                                slidesPerView: 'auto',
                                // spaceBetween: 0,
                                // freeMode: true,
                                resistance : false, // 슬라이드 터치에 대한 저항 여부 설정
                                slideToClickedSlide : true, // 해당 슬라이드 클릭시 슬라이드 위치로 이동
                            });

                            $('#nftRepositoryCollectionTemplateUl').html(nftRepositoryCollectionTemplate(result.nftRepositoryInfo));
                        }
                        //배너가 없으면 배너 영역 삭제처리
                        if (result.nftBannerInfo.length == 0) {
                            $.hideElement('.event');
                        }  
                    }

                    if (winningType === 'NFTCP') {
                        //쿠폰 정보가 없을때
                        if (result.couponRepositoryInfo.length === 0) {
                            $.showElement('.empty');
                        }

                        //쿠폰 정보가 있을때
                        if (result.couponRepositoryInfo.length > 0) {
                            $.showElement('#couponMyCollection');
                            
                            $('#couponRepositoryTemplateDiv').html(couponRepositoryTemplate(result.couponRepositoryInfo));
                            
                            new Swiper("#couponMyCollection .swiper-container", {
                                slidesPerView: 3.5,
                                spaceBetween: 0,
                                freeMode: true,
                            });

                            $('#couponRepositoryCollectionTemplateUl').html(couponRepositoryCollectionTemplate(result.couponRepositoryInfo));
                        }
                        //배너가 없으면 배너 영역 삭제처리
                        if (result.nftBannerInfo.length == 0) {
                            $.hideElement('.event');
                        } 

                    }
                }

                //AR_EVENT 정보 없음
                if (res.resultCode === 801) {
                    is.showCommonPopup(1, "noEventResult", is.createCommonPopupBtnOpt(undefined, is.historyBack));
                    return;
                }
                //핸드폰번호로 조회된 NFT 지갑 주소가 있을때 에러
                if (res.resultCode === 837) {
                    is.showCommonPopup(1, "duplicateNftWalletAddress");
                    return;
                }
            }
            //통신에러일때
            if (xhr.status > 204) {
                is.showCommonPopup(1, "commonError");
                return;
            }
        })
        .fail(function() {
            is.showCommonPopup(1, "commonError");
        })
    }

    //지갑 주소 저장 API
    const _saveWalletAddress = function(walletAddress) {
        //지갑 주소가 없을때
        if (!walletAddress) {
            is.showCommonPopup(1, "confirmNftWalletAddress");
            return;
        }

        //이벤트 종료 30일 ~ 60일 사이에는 지갑정보 저장 불가
        if ( (diffServiceEndDateTodayCount > 30) && (diffServiceEndDateTodayCount < 60) ) {
            is.showCommonPopup(1, "expiredDateNftWalletSave");
            return;
        }

        const reqParam = {
            nftWalletId: nftWalletId,
            eventId : eventSessionDataParser.eventId,
            userPhoneNumber : eventSessionDataParser.phoneNumber,
            walletAddress : walletAddress
        }
        $.post({
            url : '/api/v1/web-event-front/nft-wallet-address/save', 
            data : JSON.stringify(reqParam), 
            contentType : 'application/json; charset=utf-8'
        })
        .done(function(res, text, xhr) {
            if (xhr.status === 200) {
                if (res.resultCode === 200) {
                    //$.alertPopup('successNftWalletAddressSave');
                    location.reload();
                }
            }
        })
        .fail(function() {
            is.showCommonPopup(1, "commonError");
        })
    }

    //지갑 데이터 > 수정버튼 이벤트
    $(document).on('click', '#nftAddrText', function() { 
        //수정중일때
        if ($(this).attr('class') == 'modify ing') {
            $('#nftAddrText').removeClass('ing').html('수정');
            $('.ntf_addr .contents_input').attr('disabled', 'disabled');
            $('#saveNftBtn').parent().hide();
            return;
        }
        //지갑주소가 있으면
        if (isNftWalletAddress) {
            $('.ntf_addr .contents_input').removeAttr('disabled').focus();
            $.innerText("#saveNftBtn", "수정완료");
            $('#saveNftBtn').parent().show();
            $('#nftAddrText').addClass('ing').html('수정중');
        }
        //지갑주소가 없으면
        if (!isNftWalletAddress) {
            var isHasClass = $('#nftAddrText').hasClass('modify');
            if (!isHasClass) {
                $.showElement('#nftNoticeSection');
            }
        }
    });

    //NFT 지갑 생성 안내 팝업 > 확인 버튼 클릭 이벤트
    $(document).on('click', '#nftNoticeSection .win_info .close, #nftNoticeSectionConfirmBtn', function() {
        $.hideElement('#nftNoticeSection');
    });

    //NFT 지갑 생성 안내 팝업 > 지갑생성방법보기 클릭 이벤트
    $(document).on('click', '#kasWayBtn', function() {
        window.open('https://blog.naver.com/kekemu44/222533641909');
    });
    
    //NFT 컬렉션 이미지 클릭 이벤트 (, #myCollectionList ul li a div img)
    // $(document).on('click', '#nftMyCollection .collection_swiper .swiper-container #nftRepositoryTemplateDiv .swiper-slide a div img', function() {
    //     console.log('winningType > ', winningType);
    //     console.log('this: ', $(this));
    //     //nftRepositoryId = Number($(this).data('repository-id'));
    //     nftRepositoryId = $(this).data('repositoryid');
    //     console.log('nftRepositoryId: ', nftRepositoryId);
    //     console.log('nftid: ', $(this).data('nftid'));
    //     sessionStorage.setItem('nftRepositoryId', nftRepositoryId);

    //     //NFT 일떄
    //     if (winningType === 'NFT') {
    //         let nftWalletAddress = $.getValueById('nftWalletAddress');
        
    //         if (!nftWalletAddress) {
    //             $.showElement('#walletRegSection');
        
    //             nftTransStatus = $(this).data('trans-status');
    //             nftId = $(this).data('nftid');
                
    //         } else {
    //             location.href = 'nft-detail.html';
    //         }
            
    //         //이벤트 종료일 30일이 넘으면 소유권 이전불가 처리 (소유권 이전버튼 클릭 비활성화)
    //         // if (diffServiceEndDateTodayCount > 30) {
    //         //     $('#owerTransSection .layer_popup .btn .confirm').attr('disabled', 'disabled');
    //         // }
    //     }
    //     //NFT 쿠폰 일떄
    //     if (winningType === 'NFTCP') {
    //         location.href = 'nft-detail.html';
    //     }
    // });

    //쿠폰 이미지 클릭 이벤트
    // $(document).on('click', '#couponMyCollection .collection_swiper .swiper-container #couponRepositoryTemplateDiv .swiper-slide a img, #couponMyCollectionList ul li a img', function() {
    //     console.log('winningType > ', winningType);
    //     //nftRepositoryId = Number($(this).data('repository-id'));
    //     nftRepositoryId = $(this).data('repositoryid');
    //     console.log('nftRepositoryId: ', nftRepositoryId);
    //     console.log('nftid: ', $(this).data('nftid'));
    //     sessionStorage.setItem('nftRepositoryId', nftRepositoryId);

    //     location.href = 'nft-detail.html';

    // });

    //지갑정보등록 팝업 > 이전하지 않고 상세보기 버튼
    $(document).on('click', '#walletRegSection .btn .confirm', function(e) {
        $.hideElement('#walletRegSection');
        location.href = 'nft-detail.html';
    });

    //지갑정보등록 팝업 > 확인 버튼 
    $(document).on('click', '#walletRegSection .btn .grey', function(e) {
        $.hideElement('#walletRegSection');
    });

    //지갑 주소 저장하기 이벤트
    $(document).on('click', '#saveNftBtn', function(e) {
        const walletAddress = $('.ntf_addr .contents_input').val();
        _saveWalletAddress(walletAddress);
    });

    //배너 이미지 클릭 이벤트
    $(document).on('click', '#nftBannerTemplateDiv .swiper-slide', function() {
        const tartgetUrl = $(this).find('img').data('url');
        is.putPvLog(is.getPvLogParams("2", "/main/locker/list", $(this).data("bannerSort"), getLogCode()));
        window.open(tartgetUrl);
    });

    //전체보기 클릭 이벤트
    $(document).on('click', '.my_collection .more, #couponMyCollection .more', function(e) {
        $(this).parent().hide();
        if (winningType === 'NFT') {
            $.showElement('#myCollectionList');
        } else {
            $.showElement('#couponMyCollectionList');
        }
    });

    //복사 버튼 이벤트
    $(document).on('click', '#nftCopyBtn', function(e) {
        _copyToClickBoard('nftWalletAddress');
    });

    //소유권 이전 결과 화면 닫기 버튼 
    $(document).on('click', '.transfer_result .close', function() {
        $(this).parent().hide();
        location.reload();
    });

    //뒤로가기 버튼
    $(document).on('click', '.wrap .moweb_header a', function() {
        location.href = 'nft-history.html?eventId=' + eventSessionDataParser.eventId;
    })
    
    
    window.onload = function() {

        new Swiper(".my_collection .swiper-container", {
            slidesPerView: 3.5,
            spaceBetween: 0,
            freeMode: true,
        });

        $("li > .title").click(function(){
            if(!$(this).parent().hasClass('disable')){ // 비활성 li가 아닌경우 (인증번호 빌활성 케이스)
                $(this).parent().removeClass('error');
                $(this).parent().addClass('on'); // li에 on
                $(this).next().children(".contents_input")[0].focus();
                $(this).addClass('moved'); // title animation
            }
        });
    }

    //복사 버튼
    let _copyToClickBoard = function(tagId){
        var content = $.getValueById(tagId);
        if (!content) {
            is.showCommonPopup(1, "copyToClickBoardNftWalletAddressError");
            return;
        }
        navigator.clipboard.writeText(content)
            .then(() => {
            is.showCommonPopup(1, "copyToClickBoardNftWalletAddress");
        })
            .catch(err => {
            console.log('Something went wrong', err);
        })
    }

    jQuery.goDetail = function (repositoryId, logOrder) {
        let isGoDetail = false;
        sessionStorage.setItem('nftRepositoryId', repositoryId);

        //NFT 일떄
        if (winningType === 'NFT') {
            const nftWalletAddress = $.getValueById('nftWalletAddress');

            if (!nftWalletAddress) {
                $.showElement('#walletRegSection');

            } else {
                isGoDetail = true;
            }
        }
        //NFT 쿠폰 일떄
        if (winningType === 'NFTCP') {
            isGoDetail = true;
        }

        if (isGoDetail) {
            is.putPvLog(is.getPvLogParams("1", "/main/locker/list", logOrder, getLogCode()), function () {
                location.href = 'nft-detail.html';
            });
        } else {
            is.putPvLog(is.getPvLogParams("1", "/main/locker/list", logOrder, getLogCode()));
        }
    }

    jQuery.goEventMainPage = function() {
        location.href = '/web-event/main.html?eventId=' + eventSessionDataParser.eventId;
    }


    _searchNftRepository(eventSessionDataParser.eventId, eventSessionDataParser.phoneNumber, eventSessionDataParser.attendCode);

    $(document).ready(function() {
        is.putPvLog(is.getPvLogParams("0", "/main/locker/list", undefined, getLogCode()));

    });

    let getLogCode = function (){
        let logCode;

        if (winningType === "NFT") {
            logCode = "0";
        } else if (winningType === "NFTCP") {
            logCode = "1";
        }

        return logCode;
    }

    
}(jQuery, window, document));
