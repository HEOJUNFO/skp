/*
 * ADReport Mobile
 * common javascript file
 * License: SK planet wholly owned
 */
(function ($, window, document, undefined) {

    const nftBannerTemplate = Handlebars.compile($("#nftBannerTemplate").html());
    const nftRepositoryTemplate = Handlebars.compile($("#nftRepositoryTemplate").html());
    const nftRepositoryCollectionTemplate = Handlebars.compile($("#nftRepositoryCollectionTemplate").html());
    const couponRepositoryTemplate = Handlebars.compile($("#couponRepositoryTemplate").html());
    const couponRepositoryCollectionTemplate = Handlebars.compile($("#couponRepositoryCollectionTemplate").html());

    let isNftWalletAddress = false;
    let eventSessionDataParser = "";
    let nftWalletId = 0;
    let diffServiceEndDateTodayCount = 0;
    let winningType = "";
    const qs = is.parseQuery();

    const isApp = is.isApp();

    //앱일때
    if (isApp) {
        if (qs.paramData) {
            eventSessionDataParser = JSON.parse(qs.paramData);
            winningType = eventSessionDataParser.winningType;
            console.log('eventSessionDataParser: ', eventSessionDataParser);
        }
    } else {
    //웹일때
        let eventSessionData = sessionStorage.getItem('eventSessionData');
        if (!eventSessionData) {
            is.showCommonPopup(1, "pageAbnormalConnectionError", is.createCommonPopupBtnOpt(undefined, is.historyBack));
            return;
        }
        eventSessionDataParser = JSON.parse(eventSessionData);
        winningType = qs.winningType;
    }
    
    //텍스트 분개처리
    if (winningType === 'NFT') {
        $.innerText("#titleName", "NFT 보관함");
        $.innerText("#winningTypeName", "NFT");
    } 
    if (winningType === 'NFTCP') {
        $.innerText("#titleName", "쿠폰 보관함");
        $.innerText("#winningTypeName", "쿠폰");
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
                    const result = res.result;
                    console.log(result);
                    
                    if (!is.isEmptyObj(result)) {
                        //이벤트 종료일60일 이후 접속 불가 예외처리
                        diffServiceEndDateTodayCount = result.diffServiceEndDateTodayCount;
                        if (result.diffServiceEndDateTodayCount > 60) {
                            is.showCommonPopup(1, "noConnectPage", is.createCommonPopupBtnOpt(undefined, is.historyBack));
                            return;
                        }
                        //배너정보
                        if (result.nftBannerInfo.length > 0) {
                            $.showElement(".event");
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
                                let walletAddress = result.nftWalletInfo.nftWalletAddress;

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
                    } else {
                        $.showElement(".empty");
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
        };

        $.post({
            url : '/api/v1/web-event-front/nft-wallet-address/save', 
            data : JSON.stringify(reqParam), 
            contentType : 'application/json; charset=utf-8'
        })
        .done(function(res, text, xhr) {
            if (xhr.status === 200) {
                if (res.resultCode === 200) {
                    location.reload();
                }
            }
        })
        .fail(function() {
            is.showCommonPopup(1, "commonError");
        })
    };

    const _updateNftAddress = function(res, $this) {
        //수정중일때
        if ($this.attr('class') == 'modify ing') {
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
    }

    const _goWalletRegSection = function() {
        $.hideElement('#walletRegSection');
        if (isApp) {
            const repositoryId = sessionStorage.getItem('nftRepositoryId', repositoryId);
            const paramData = {
                winningType : winningType,
                nftRepositoryId : repositoryId
            };
            const ocbTargetUrl = is.getDomain() + "/web-event/nft/nft-detail.html?paramData=" + encodeURIComponent(JSON.stringify(paramData));
            ocbApp.goLinkPage(ocbTargetUrl); 
        } else {
            location.href = 'nft-detail.html';
        }
    }

    const _clickBanner = function() {
        is.putPvLog(is.getPvLogParams("2", "/main/locker/list", $(this).data("bannerSort"), getLogCode()));
        const tartgetUrl = $(this).find('img').data('url');
        is.windowOpen(tartgetUrl);
    }

    const _clickKasWayBtn = function() {
        is.windowOpen('https://blog.naver.com/kekemu44/222533641909');
    }

    // ======================= 버튼 클릭 이벤트 바인딩 ===========================//

    //지갑 데이터 > 수정버튼 이벤트
    $(document).on("click", "#nftAddrText", function() {
        _updateNftAddress();
    });

    //NFT 지갑 생성 안내 팝업 > 확인 버튼 클릭 이벤트
    $(document).on("click", "#nftNoticeSection .win_info .close, #nftNoticeSectionConfirmBtn", function() {
        $.hideElement('#nftNoticeSection');
    });

    //NFT 지갑 생성 안내 팝업 > 지갑생성방법보기 클릭 이벤트
    //is.clickEvent("#kasWayBtn", );
    $(document).on("click", "#kasWayBtn", function() {
        _clickKasWayBtn();
    });

    //지갑정보등록 팝업 > 이전하지 않고 상세보기 버튼
    $(document).on("click", "#walletRegSection .btn .confirm", function() {
        _goWalletRegSection();
    });

    //지갑정보등록 팝업 > 확인 버튼 
    $(document).on("click", "#kasWayBtn", function() {
        _clickKasWayBtn();
    });

    //지갑 주소 저장하기 이벤트
    $(document).on("click", "#saveNftBtn", function() {
        _saveWalletAddress( $('.ntf_addr .contents_input').val() );
    });
    
    //배너 이미지 클릭 이벤트
    $(document).on("click", "#nftBannerTemplateDiv .swiper-slide", function() {
        _clickBanner();
    });

    //전체보기 클릭 이벤트
    $(document).on("click", ".my_collection .more, #couponMyCollection .more", function() {
        $(this).parent().hide();
        if (winningType === 'NFT') {
            $.showElement('#myCollectionList');
        } else {
            $.showElement('#couponMyCollectionList');
        }
    });
    
    //복사 버튼 이벤트
    $(document).on("click", "#nftCopyBtn", function() {
        _copyToClickBoard("nftWalletAddress");
    });
    
    //소유권 이전 결과 화면 닫기 버튼 
    $(document).on("click", "transfer_result .close", function() {
        $(this).parent().hide();
        location.reload();
    });

    // ======================= 버튼 클릭 이벤트 바인딩 ===========================//
    
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
                if (isApp) {
                    const paramData = {
                        winningType : winningType,
                        nftRepositoryId : repositoryId
                    };
                    const ocbTargetUrl = is.getDomain() + "/web-event/nft/nft-detail.html?paramData=" + encodeURIComponent(JSON.stringify(paramData));
                    ocbApp.goLinkPage(ocbTargetUrl); 
                } else {
                    location.href = 'nft-detail.html';
                }
            });
        } else {
            is.putPvLog(is.getPvLogParams("1", "/main/locker/list", logOrder, getLogCode()));
        }
    }
    _searchNftRepository(eventSessionDataParser.eventId, eventSessionDataParser.phoneNumber, eventSessionDataParser.attendCode);

    let getLogCode = function (){
        let logCode;

        if (winningType === "NFT") {
            logCode = "0";
        } else if (winningType === "NFTCP") {
            logCode = "1";
        }

        return logCode;
    }

    is.putPvLog(is.getPvLogParams("0", "/main/locker/list", undefined, getLogCode()));

}(jQuery, window, document));
