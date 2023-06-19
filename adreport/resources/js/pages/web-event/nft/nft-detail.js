/*
 * ADReport Mobile
 * common javascript file
 * License: SK planet wholly owned
 */
(function ($, window, document, undefined) {

    const nftRepositoryDetailTemplate = Handlebars.compile($("#nftRepositoryDetailTemplate").html());
    const couponRepositoryDetailTemplate = Handlebars.compile($("#couponRepositoryDetailTemplate").html());

    const qs = is.parseQuery();
    let winningType = "";
    let inactiveThumbnailUrl = "";
    let nftRepositoryId = 0;
    const isApp = is.isApp();

    if (isApp) {
        const paramData = JSON.parse(qs.paramData);
        if (paramData) {
            winningType = paramData.winningType;
            nftRepositoryId = paramData.nftRepositoryId;
        }
    } else {
        const eventSessionData = sessionStorage.getItem("eventSessionData");
        if (!eventSessionData) {
            is.showCommonPopup(1, "pageAbnormalConnectionError", is.createCommonPopupBtnOpt(undefined, is.historyBack));
            return;
        } else {
            winningType = JSON.parse(eventSessionData).winningType.toUpperCase();
            nftRepositoryId = sessionStorage.getItem('nftRepositoryId');
        }
    }

    //NFT, 쿠폰 상세정보 API
    const _searchDetailNftRepository = function(nftRepositoryId) {
        if (!nftRepositoryId) {
            is.showCommonPopup(1, "commonError");
            return;
        }

        let apiUrl = '';
        
        if (winningType === 'NFT')        apiUrl = '/api/v1/web-event-front/nft-repository/search/' + nftRepositoryId;
        else if (winningType === 'NFTCP') apiUrl = '/api/v1/web-event-front/coupon-repository/search/' + nftRepositoryId;

        is.getFetch(apiUrl, _searchDetailNftRepositoryCallback);
    }
    //NFT, 쿠폰 상세정보 API 콜백
    const _searchDetailNftRepositoryCallback = function(res) {
        if (res) {
            const resultCode = res.resultCode;
            if (resultCode === 200) {
                let resultData = res.result;
                //console.log('resultData: ', resultData);

                const arEventNftCouponInfo = resultData.couponInfo.arEventNftCouponInfoEntity;

                //NFT일떄
                if (winningType === "NFT") {
                    $.innerText("#title", "NFT 상세");
                    $.showElement('#nftRepositoryDetailTemplateDiv');
                    $("#nftRepositoryDetailTemplateDiv").html(nftRepositoryDetailTemplate(resultData));
                }
                //쿠폰일떄
                if (winningType === 'NFTCP') {
                    $.innerText("#title", "쿠폰 상세");
                    $.showElement('#couponRepositoryDetailTemplateDiv');
                    $("#couponRepositoryDetailTemplateDiv").html(couponRepositoryDetailTemplate(resultData));
                    
                    //비활성화 썸네일
                    inactiveThumbnailUrl = arEventNftCouponInfo.arEventWinningEntity.nftInactiveImgUrl;
                    
                    const isUse = resultData.couponInfo.isUse;
                    
                    //사용하지 않은 상태일때
                    if (!isUse) {
                        $.showElement('#couponUsePopupConfirmBtn');
                    }
                    //사용완료된 상태일때
                    if (isUse) {
                        $('.useCouponBtn').removeAttr('href');
                        $('.useCouponBtn').html('사용완료').css('background', '#BBB');
                    }

                    //바코드 출력 여부
                    const barcodeViewYn = arEventNftCouponInfo.arEventWinningEntity.repositoryBarcodeViewYn; 
                    
                    //랜덤 텍스트 출력 여부 
                    const barcodeRandomViewYn = arEventNftCouponInfo.arEventWinningEntity.repositoryRandomViewYn; 
                    
                    //사용버튼 표현 여부 
                    const buttonViewYn = arEventNftCouponInfo.arEventWinningEntity.repositoryButtonSettingYn; 
                    
                    //쿠폰코드
                    const counponCode = arEventNftCouponInfo.nftCouponId; 

                    //바코드 이미지 출력 - 바코드를 보여줄때만 표현 (서베이고 기능 고도화 관련 수정)
                    if (barcodeViewYn === "Y" && counponCode) {

                        let isShowHRI = false;
                        //랜덤 텍스트 출력이 "Y" 이면 바코드 아래 난수 표현
                        if (barcodeRandomViewYn === "Y") {
                            // 난수 표현 관련하여 별도의 영역이 있으므로 무조건 false 가 되도록 처리.
                            // isShowHRI = true;
                        }
                        $("#barcodeImg").barcode(counponCode, "code128", {barWidth: 1.8, barHeight: 80, bgColor: "#ffffff", showHRI:isShowHRI});
                        $(".barcode").show();
                    } else {
                        $(".barcode").hide();
                    }

                    if (barcodeRandomViewYn === "Y") {
                        $(".barcodeRandomViewArea").show();
                    } else {
                        $(".barcodeRandomViewArea").hide();
                    }

                    //사용버튼을 사용안할때 삭제처리
                    // if (!buttonViewYn || buttonViewYn === "N") {
                    //     $.hideElement(".useCouponBtn");
                    // }
                    //바코드 이미지 출력과 사용버튼 표현 여부가 전부 "N" 이면 바코드 출력 영역을 전체를 삭제처리
                    // if (barcodeViewYn === "N" && buttonViewYn === "N") {
                    //     $.hideElement(".win");
                    // }
                }

                // 기타 설명이미지 표시 처리
                if (arEventNftCouponInfo.arEventWinningEntity.etcDescImgSettingYn === "Y") {
                    $("#etcDescImgUrlArea").show();
                    $("#etcDescImgUrl").attr("src", arEventNftCouponInfo.arEventWinningEntity.etcDescImgUrl);
                }
            } else {
                //에러 알림창
                is.showCommonPopup(1, "commonError");
                return;
            }
        } else {
            //에러 알림창
            is.showCommonPopup(1, "commonError");
            return;
        }
    }

    //쿠폰 사용하기 API
    const _useCoupon = function() {
        const apiUrl = "/api/v1/web-event-front/coupon-repository/use";

        const params = {
            couponRepositoryId: nftRepositoryId
        }
        is.postFetch(apiUrl, params, _useCouponCallback);
    }

    //쿠폰 사용하기 API 결과 callback
    const _useCouponCallback = function(res) {
      
        if (res) {
            //통신 결과 코드
            const resultCode = res.resultCode;
            
            //정상 통신이면 
            if (resultCode <= 204) {
                const resultData = res.result;
                
                //통신 결과 값이 있으면
                if (resultData) {
                
                    //팝업창 닫기
                    $.hideElement('#couponUsePopup');
                
                    //used 클래스 변경
                    $('.useCouponBtn').html('사용완료').removeAttr('href').css('background', '#BBB');
                    $('.img_wrap img').attr('src', inactiveThumbnailUrl);

                } else {
                    $.hideElement("#couponUsePopup");
                    
                    //에러 알림창
                    is.showCommonPopup(1, "commonError");
                    return;  
                }
            } else {
                $.hideElement("#couponUsePopup");
                
                //에러 알림창
                is.showCommonPopup(1, "commonError");
                return;  
            }
        }
    };

    const copyToClipboard = function copyToClipBoard(text) {
        navigator.clipboard.writeText(text)
            .then(() => {
                is.showCommonPopup(1, "couponIdCopy", is.createCommonPopupBtnOpt("확인"));
            });
    };

    //사용하기 버튼
    $(document).on("click", ".useCouponBtn", function () {
        let attr = $(".useCouponBtn").attr("href");
        if (attr) {
            is.putPvLog(is.getPvLogParams("0", "/main/locker/list/detail/popup"));
            $.showElement('#couponUsePopup');
        }
    });

    // 복사하기 버튼
    $(document).on("click", ".copyBtn", function () {
        let couponId = $(".barcodeRandomViewArea").data("couponId");

        copyToClipboard(couponId);
    });

    //쿠폰 사용하기 팝업 > 취소 버튼
    $(document).on("click", "#couponUsePopup .layer_popup .btn .grey", function () {
        $.hideElement('#couponUsePopup');
    });

    //쿠폰 사용하기 팝업 > 쿠폰 사용 확인 버튼
    $(document).on("click", "#couponUsePopup .layer_popup .btn .confirm", function () {
        _useCoupon();
    });

    //쿠폰 사용하기 팝업 > 쿠폰 사용 확인 버튼
    $(document).on("click", "#couponUsePopup .layer_popup .btn .used", function () {
        //alert('이미 사용이 완료된 쿠폰입니다.');
        is.showCommonPopup(1, "usedCoupon");
    });

    // $(document).ready(function(){
    if (winningType) {
        _searchDetailNftRepository(nftRepositoryId);
    }
   
}(jQuery, window, document));
