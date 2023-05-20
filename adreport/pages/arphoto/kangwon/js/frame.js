var hostPath            = "https://dt-static.syrup.co.kr/kangwon/";

/////////////////////////////////////////////////////////
var skinBasePath        = "/img/skin/"
var skinName            = "skin";
var skinThumbnailName   = "skin";

var skinList = [
]

var skinIdList = [
    '바다', '산', '숙소', '해변'
];

///////////////////////////////////////////////////////////

var modelBasePath       = "/img/model/";
var modelName           = "stiker";
var modelThumbnailName  = "stiker";
var modelWidth          = 600;
var modelHeight         = 600;
var modelScale          = 2;

var modelList = [
];

var modelInfoList = [
    '가자 강원도', '워케이션 가자', '선글라스', '아이디어', '워케이션위크', '밀짚모자', '아이스크림', '칵테일'
];
var modelIndexList = [
    8,7,6,3,4,5,1,2,
];

///////////////////////////////////////////////////////////
var cameraResolutionDict = {
    "4:6" : {
      width : 2304,
      height : 1536,
      w : 4,
      h : 6,
    }
};

var selectResolution = null;





//modelList = [modelList[0],modelList[1],modelList[2]];

var mainScene = null;
var arModule = null;
var loadModelCount = 0;
var loadSkinCount = 0;
var totalSkinCount = 0;
var initFirstModel = false;

var modelListTag = null;
var skinListTag = null;
var bkgEventTag = null;

var timer = null;
var isOpenningIosPopup = false;
var shareTime = 0;
var pressTimer = null;
var galaxyFold = false;
var loadingTime = 0;

// AR모듈로부터의 메시지 처리
window.addEventListener('message', function(e) {
    let data = e.data;
    if( data.type == 'init' ){
        arModule =  qs('iframe').contentWindow.AFRAME.scenes[0].components['main-scene'];
        arModule.setCameraResolution(cameraResolutionDict);
        changeRatio(selectResolution.w+":"+selectResolution.h);

        initSkin();
        initModel();

        if (timer == null)
            timer = setInterval(resCheck, 500);

    }
    else if( data.type == 'reset' ){
        arModule.resume();
        toggleArSkin(true);
    }
    else if( data.type == 'capture' ){
        
        document.getElementById('capture-img').src = data.value;
        document.getElementById('capture-img').alt = 'img_'+dateFormat(new Date())+'.png';

        toggleArSkin(false);
    }
    else if( data.type == 'addModel'){

        if(modelList[0]['id'] == data.value){
            arModule.changeModel(data.value);
            initFirstModel = true;
            loadingCheck();
        }

        loadModelCount +=1 ;
    }
});

/*
if ('virtualKeyboard' in navigator) {
    navigator.virtualKeyboard.overlaysContent = true;
    navigator.virtualKeyboard.addEventListener('geometrychange', (event) => {
      const { x, y, width, height } = event.target.boundingRect;
      if (height > 0) qs('.agree-popup').style.top = '-30%';
      else qs('.agree-popup').style.top = '0';
  });
}*/

function qs(tag){
    return document.querySelector(tag);
}


window.addEventListener('hashchange', function(ev){
    let prevDepth = -1;
    let nowDepth = -1;
    let prevHashSplit = ev.oldURL.split('#');
    let nowHashSplit = location.hash.split('#');
    

    prevDepth = prevHashSplit[1]
    nowDepth = nowHashSplit[1]

    if(nowDepth == 'exit' && prevDepth == 'main'){    
        exitPopUp(true);
    }
    else if(nowDepth == 'main' && prevDepth == 'menu'){
        changeMenuStatus('model',false);
        changeMenuStatus('skin',false);
    }
    else if(nowDepth == 'main' && prevDepth == 'capture'){
        resetViewPort();
        arModule.resume();
        toggleArSkin(true);
    }
    else if(nowDepth=='capture' && prevDepth == 'event') {
        qs('.agree-popup').style.display = 'none';
        qs('.print-popup').style.display = 'none';
    }
    else if(prevDepth == 'terms') {
        qs('.terms-popup').style.display = 'none';
    }
    else if(prevDepth == 'confirm') {
        backExit = true;
        qs("#confirmNo").click();
    }
})

// 화면 회전 처리
var mql = window.matchMedia("(orientation: portrait)");
mql.addListener(function(m) {
    rotateViewCheck();
});

window.addEventListener(`resize`, function() {
    rotateViewCheck();
    //resizeCanvas();    
});


var audio = null;
function checkIosChrome() {
    if(navigator.userAgent.toLowerCase().match('crios')) return true;

    return false;
}

function getCookie(cName) {
    cName = cName + '=';
    var cookieData = document.cookie;
    var start = cookieData.indexOf(cName);
    var cValue = '';
    if(start != -1){
      start += cName.length;
      var end = cookieData.indexOf(';', start);
      if(end == -1)end = cookieData.length;
      cValue = cookieData.substring(start, end);
    }
    return unescape(cValue);
}

function setCookie(name, value, days) {
    var date, expires;
    if (days) {
        date = new Date();
        date.setDate(date.getDate()+days);
        expires = "; expires="+date.toUTCString();
    } else {
        expires = "";
    }
    document.cookie = name+"="+value+expires+"; path=/";
}

function copyClipBoard(){

    let tagList = [
        "#2030세계박람회",
        "#AR소망포카",
    ];
    copy(tagList.join('\n'));
}

function copy(copyText) {                
    var tmpTextarea = document.createElement('textarea');
    tmpTextarea.value = copyText;
    
    document.body.appendChild(tmpTextarea);
    tmpTextarea.select();
    tmpTextarea.setSelectionRange(0, 9999);  // 셀렉트 범위 설정
    
    document.execCommand('copy');
    document.body.removeChild(tmpTextarea);                            
}


function pushSkinData(_id, _origin, _thumbnail)
{
    skinList.push({
        id : _id,
        origin : hostPath + skinBasePath + _origin,
        thumbnail : hostPath + skinBasePath + _thumbnail
    });
}

function InitSkinData()
{
    //상단에 있는 skinIdList 의 이름을 기준

    for (let i = 0; i < skinIdList.length; i++) {

        let number = ' (' + (i+1).toString() + ').png';

        pushSkinData(skinIdList[i], skinName + number, skinThumbnailName + number );

    }
}

function InitModelData()
{
    console.log("initModelData");

    let tempModelList = [];

    for (let i = 0; i < modelInfoList.length; i++) {

        let number = ' (' + (i+1).toString() + ').png';

        tempModelList.push({

            id          : modelInfoList[i],
            type        : 'image',
            src         : hostPath + modelBasePath + modelName + number,
            thumbnail   : hostPath + modelBasePath + modelThumbnailName + number,
            position    : "1 3 -10",
            rotation    : "0 0 0",
            width       : modelWidth,
            height      : modelHeight,
            scale       : modelScale,

        });
    }

    //인덱스 리스트 순서대로 넣기
    for(let i = 0; i < modelIndexList.length; i++)
    {
        modelList.push(tempModelList[modelIndexList[i] -1 ]);
    }
}

window.onload = function(){ 
    InitSkinData();
    InitModelData();

    initRatio();

    // 로딩 시간 측정
    loadingTime = new Date();

    // 메인 테그들 변수화
    modelListTag = qs("#model-list");
    skinListTag = qs("#skin-list");
    bkgEventTag = qs("#bkg-eventer");
    uiControllerTag = qs(".ui-container");

    galaxyFold = checkFold();
    let instarID = getCookie("instarID");
    //qs("#instagram-id").value = instarID;

    if(instarID != null && instarID.length > 0)
        qs("#check-agree").checked = true;

    // iframe 삽입 (메인 페이지 로드전 iframe 로딩 방지)
    let iframe = `
        <iframe allow="camera" src="ar.html" frameBorder="0" allowfullscreen="yes" scrolling="no">
            Your browser doesn't support iframes
        </iframe>`;
    
    qs('.aria').insertAdjacentHTML( 'beforeend', iframe );

    // 카메라 셔터음 로드
    audio = new Audio(hostPath + '/sfx/Camera_Shutter.wav');

    // 브라우저 체크
    checkBrower(true);
    setTimeout(()=>checkHeight(), 500);

    // ios 채크
    let iosVersion = getIosVersion();
    
    if( iosVersion > 0 && iosVersion < 15){
        // ios 전용 팝업 세팅
        isOpenningIosPopup = true;
        let popupTag = null;

        let checkChrome = checkIosChrome();
        if(checkChrome == true){
            // ui del
            qs('#btn-download').style.display = 'none';
            qs('#btn-share').style.display = 'none';
        }
        else {
            qs('#btn-share').style.display = 'none';
        }
    }

    zoomBlock();
    rotateViewCheck();
    
    // 튜토리얼 페이지 전환
    qs('body').addEventListener("click", function(){
        if(qs("#tutorial").style.display != 'none'){
            setDepth('exit');
            setDepth('main'); 
            let tutUiList = document.querySelectorAll(".tut");
            for(let i = 0; i<tutUiList.length; i++){
                let tutUi = tutUiList[i];
                tutUi.style.display = 'none';
            }
            qs(".ar-controller").style.backgroundColor = 'white';

            let tutorialList = document.querySelectorAll(".tutorial");

            for(let i = 0; i<tutorialList.length; i++){
                tutorialList[i].style.display = 'none';
            }
            
            initEvent();   
        }
    });
}

function exitFrame() {
    if(window.opener != null) {
        self.close()
    } 
    else {
        var url = window.location.href;
        var link = url.slice(0,url.lastIndexOf("/")) + "/index.html";
        window.open(link);
    }
}

function initRatio() {
    //let selector = qs(".ratio-select select");

    for (let ratio in cameraResolutionDict) {

        if(selectResolution == null){
            selectResolution = cameraResolutionDict[ratio];
            break;
        }
            
            
    }
}

function checkHeight() {
    let totalHeight = qs('body').offsetHeight;
    let totalWidth = qs('body').offsetWidth;

    let ariaHeight = (selectResolution.h*totalWidth)/selectResolution.w;
    let ariaWidth = totalWidth;

    let topHeight = qs('#top-ui').offsetHeight;
    let bottomHeight = totalHeight * 0.15;
    let aria = qs(".aria");

    if(totalHeight < bottomHeight + topHeight + ariaHeight){
        qs('#bottom-ui').style.height = bottomHeight;

        ariaHeight = totalHeight - bottomHeight - topHeight;
        ariaWidth = (selectResolution.w*ariaHeight)/selectResolution.h;
    }

    aria.style.minHeight = ariaHeight;
    aria.style.minWidth = ariaWidth;
}

function jsCopyLink(copyText) {
            
    var tmpTextarea = document.createElement('textarea');
    tmpTextarea.value = copyText;
 
    document.body.appendChild(tmpTextarea);
    tmpTextarea.select();
    tmpTextarea.setSelectionRange(0, 9999);  // 셀렉트 범위 설정
 
    document.execCommand('copy');
    document.body.removeChild(tmpTextarea);
    alert("URL 복사가 완료되었습니다."); 
              
}


function initEvent(){
    qs("#btn-flip").addEventListener("click", function(){
        arModule.filpCamera();
    });

    qs("#btn-camera").addEventListener("click", function(){
        //jsCopyLink('clip test');
        audio.play();
        arModule.pause();
        arModule.capture();
        skinListTag.style.display = 'none';
        modelListTag.style.display = 'none';
    });   
    
    qs("#btn-skin").addEventListener("click", function(){
        toggleMenu("skin");
        
    });   
    
    qs("#btn-model").addEventListener("click", function(){
        toggleMenu("model");
    });   


    qs("#btn-back").addEventListener("click", function(){
        resetViewPort();
        arModule.resume();
        toggleArSkin(true);
    });   

    qs("#btn-exit").addEventListener("click", function(){
        exitPopUp();
    });   
    
    qs(".del-cookie").addEventListener("click", function(){

        setCookie("agreePass","",7);
        setCookie("instarID","",7);

        qs("#instagram-id").value = "";
        qs("#check-agree").checked = false;

        alert("쿠키 초기화");
    });   

    qs("#btn-download").addEventListener("click", function(){
        reqLog('tap.btn_2');
        saveFile();
    });   

    qs("#btn-share").addEventListener("click", function(){
        reqLog('tap.btn_1');
        shareCanvas();
    });   

    


    qs("#btn-print").addEventListener("click", function(){

        var url     = window.location.href;
        var link    = url.slice(0,url.lastIndexOf("/")) + "/print/print_2.html";
        window.open(link);
    });


    async function sharePopUp(popupData) {
        const confirm = await ui.confirm('복사되었습니다. 공유 게시글을 업로드하면 이벤트 참여가 완료됩니다.',"닫기","");

        if(popupData == "download"){
            saveFile();
        }
        else if(popupData == "share"){
            shareCanvas();
        }
        else if(popupData == "block"){
            qs('.block-capture').style.display = "none";
            history.back();
        }

    }
    

    async function shareCanvas() {
        if(shareTime+1000 > Date.now()) return;
        shareTime = Date.now();

        const canvasElement = document.getElementById('capture-img');
        const blob = await (await fetch(canvasElement.src)).blob();
        
        const filesArray = [
          new File(
            [blob],
            'image.png',
            {
              type: blob.type
            }
          )
        ];

        const shareData = {
            files: filesArray
        };

        if (!(navigator.canShare(shareData))) {
            alert('공유를 지원하지 않는 브라우저 입니다.');
        };

        navigator.share(shareData);
    }

    
    bkgEventTag.addEventListener("click", function(){
        changeMenuStatus('skin',false);
        changeMenuStatus('model',false);
    });
}

function openPrintPopUp(){
    openEventPopUp('.print-popup');
    qs('#previewImage').src = qs('#capture-img').src;

    qs('.content-step1').style.display = "";
    qs('.content-step2').style.display = "none";
    qs('.content-step3').style.display = "none";
}


function openEventPopUp(popup){
    setDepth('event');
    let popUp = qs(popup);
    popUp.style.display = '';
}

function saveFile(){
    let name = '';

    if(navigator.userAgent.match(/iPhone|iPad/i)){
        name = 'image.png';
    }
    else{
        name = "image-"+dateFormat(new Date())+".png";
    }

    arModule.download(name);
}

function initModel(){

    console.log("initModel : " + modelList.length);

    for(let i = 0; i<modelList.length; i++){
        let modelInfo = modelList[i];
        arModule.addModel(modelInfo);

        let subTag = '';

        if(i == 0) subTag = 'select-item';

        let tag = `
            <div class="item-content `+subTag+`" name="`+modelInfo.id+`">
                <img src="` + modelInfo.thumbnail + `">
                <p>`+modelInfo.id+`</p>
                <div class="select-box">
                    <i class="fa-solid fa-check"></i>
                </div>
            </div> `;

        modelListTag.insertAdjacentHTML( 'beforeend', tag );
    }

    let btnModelContent = modelListTag.querySelectorAll(".item-content")

    for(let i = 0; i<btnModelContent.length; i++){
        btnModelContent[i].addEventListener("click", function(){
            arModule.changeModel(this.getAttribute("name"));    
            //qs("#model-list").style.display = 'none';    

            let prevselect = modelListTag.querySelector(".select-item");

            if(prevselect != null){
                prevselect.classList.remove('select-item');
            }

            this.classList.add('select-item');
        });  
    }
}

function initSkin(){
    for(var i in skinList){
        totalSkinCount += 1;
        let subTag = '';
        let skinInfo = skinList[i];

        let originData = skinInfo.origin;
        let thumbnailData = skinInfo.thumbnail;

        if(i == 0) subTag = 'select-item';

        let tag = `
            <div class="item-content `+subTag+`" data-ratio="">
                <img src="`+thumbnailData+`" data-skin="`+originData+`" onload="loadSkin()">
                <p>`+skinInfo.id+`</p>
                <div class="select-box">
                    <i class="fa-solid fa-check"></i>
                </div>
            </div> `;

            skinListTag.insertAdjacentHTML( 'beforeend', tag );
    }
    

    let btnSkinContent = skinListTag.querySelectorAll(".item-content")

    for(let i = 0; i<btnSkinContent.length; i++){
        btnSkinContent[i].addEventListener("click", function(){
            //let ratio = this.getAttribute('data-ratio');
            //qs(".aria").style['aspect-ratio'] = ratio;

            let src = this.querySelector("img").getAttribute('data-skin');

            //changeRatio(ratio);
            //arModule.changeRatio(ratio);
            arModule.changeSkin(src);    
            
            //qs("#skin-list").style.display = 'none';

            let prevselect = skinListTag.querySelector(".select-item");

            if(prevselect != null){
                prevselect.classList.remove('select-item');
            }

            this.classList.add('select-item');

        });  
    }
}

function loadSkin(){
    loadSkinCount += 1;

    if(skinList.length == loadSkinCount){
        arModule.changeSkin(skinList[0].origin); 
        loadingCheck();
    }
}

function toggleArSkin(status)
{
    let iframe = qs('iframe');
    let image = qs('#capture-img');
    let imageBlock = qs('.block-capture');

    let arUI  = qs('#ar-ui');
    let flipBtn  = qs('#btn-flip');
    let closeBtn  = qs('.icon-exit');
    let capTureUI  = qs('#capture-ui');

    changeMenuStatus('skin',false);
    changeMenuStatus('model',false);

    if(status == true){
        iframe.style.display = '';
        image.style.display = 'none';
        imageBlock.style.display = 'none';

        arUI.style.display = '';
        capTureUI.style.display = 'none';
        flipBtn.style.display = '';
        setDepth('exit');
        setDepth('main');
        closeBtn.classList.remove('purple-font');
    }
    else{
        iframe.style.display = 'none';
        image.style.display = '';
        if(getCookie("agreePass") != "1"){
            imageBlock.style.display = '';
        }

        arUI.style.display = 'none';
        capTureUI.style.display = '';
        flipBtn.style.display = 'none';
        setDepth('capture');
        closeBtn.classList.add('purple-font');
        openIosPopUp();
    }
}


function changeRatio(ratio) {
    arModule.changeRatio(ratio);
    selectResolution = cameraResolutionDict[ratio];
    checkHeight()
}

function toggleMenu(type){
    let menu = qs("#"+type+"-list");  
    let active = menu.classList.contains('active');
    changeMenuStatus(type,!active);
}

function changeMenuStatus(type,flag) {
    let btn = qs("#btn-"+type);  
    let menu = qs("#"+type+"-list");  

    if( flag == true){
        let otherMenu = type == 'skin' ? 'model' : 'skin';   
        changeMenuStatus(otherMenu,false);

        menu.classList.add('active');
        uiControllerTag.classList.add('active');
        menu.style.display = '';

        bkgEventTag.style.display = '';
        btn.querySelector("i.content").classList.add('hide');
        btn.querySelector("i.check").classList.remove('hide');

        setDepth('menu');    
    }
    else{
        menu.classList.remove('active');
        uiControllerTag.classList.remove('active');
        uiControllerTag.style.top = "0%";

        bkgEventTag.style.display = 'none';
        btn.querySelector("i.content").classList.remove('hide');
        btn.querySelector("i.check").classList.add('hide');
        setDepth('exit');
        setDepth('main');
    }
}

function blockEvent(){
    if(tutorial == true) return false;

    return true;
}

// 로딩 대기시간을 3~4초로 요구하기 때문에 일괄 4초 적용
function loadingCheck(){
    if(skinList.length == loadSkinCount && initFirstModel == true){

        var endTime = new Date();
        var remainingTime = endTime - loadingTime;
        var timer = 4000 - remainingTime;

        if( timer > 0 )
        {
            setTimeout(() => {
                arModule.changeSkin(skinList[0].origin); 
                qs("#main").style.display = '';
                qs("#loading-page").style.display = 'none';
            }, timer);
        }
        else
        {
            arModule.changeSkin(skinList[0].origin); 
            qs("#main").style.display = '';
            qs("#loading-page").style.display = 'none';
        }
    }
}

function zoomBlock(){
    document.addEventListener('touchmove', function (event) {
        if (event.touches.length > 1) {
            event.preventDefault();
        }
      }, { passive: false });


      var lastTouchEnd = 0;
        document.addEventListener('touchend', function (event) {
        var now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
        }, false);
}

function resetViewPort(){
    //window.scrollTo(0,0);
    var meta = "width=device-width, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"
    const viewportmeta = qs('meta[name=viewport]');
    viewportmeta.setAttribute('content', "");
    viewportmeta.setAttribute('content', meta);
}

function rotateViewCheck(){
    if(galaxyFold == true){
        if(screen.width >= 500){
            resetViewPort();
            qs("#main").style.display = 'none';
            qs("#block-rot").style.display = '';
            return false;
        }
    }

    if(mql.matches) {  
        setTimeout(() => {
            resetViewPort();
            qs("#main").style.display = '';
            qs("#block-rot").style.display = 'none';
            //let aria = qs(".aria");
            checkHeight();
        }, 3000);
    } else {  
        resetViewPort();
        qs("#main").style.display = 'none';
        qs("#block-rot").style.display = '';
    }
}

function resCheck(){
    return;
    let canvas = window.frames[0].qs('canvas');
    qs('#canvasText').textContent = canvas.width + 'x' + canvas.height;

    let video = window.frames[0].qs('video');
    qs('#videoText').textContent = video.videoWidth + 'x' + video.videoHeight;
}

function dateFormat(date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    month = month >= 10 ? month : '0' + month;
    day = day >= 10 ? day : '0' + day;
    hour = hour >= 10 ? hour : '0' + hour;
    minute = minute >= 10 ? minute : '0' + minute;
    second = second >= 10 ? second : '0' + second;

    return date.getFullYear() + '-' + month + '-' + day + '_' + hour + '_' + minute + '_' + second;
}

function openIosPopUp(){
    if(isOpenningIosPopup == false) return ;

    isOpenningIosPopup = true;
    let checkChrome = checkIosChrome();
    if(checkChrome == true){
        alert("촬영된 이미지를 꾹 눌러서\n 저장하고 공유해보세요!");
    }
    else {
        alert("촬영된 이미지를 꾹 눌러서\n 공유해보세요!");
    }
}

async function exitPopUp (bBackExit) {
    const confirm = await ui.confirm('정말 종료하시겠습니까?',"확인","취소",bBackExit);

    if(confirm == true) {
        exitFrame();
    }

    if(bBackExit == true){
        setDepth('exit');
        setDepth('main');
    }
}

function setDepth(depth){
    location.href = location.origin + location.pathname + "#"+depth;
}

const ui = {
    confirm: async (message,yesBtn,noBtn,bBackExit) => createConfirm(message,yesBtn,noBtn,bBackExit)
}

const createConfirm = (message,yesBtn,noBtn,bBackExit) => {
    return new Promise((complete, failed)=>{
      qs('#confirmMessage').innerText = message;
  
      let yes = qs('#confirmYes');
      let no = qs('#confirmNo');
      let popup = qs('.confirm');

      yes.value = yesBtn;
      no.value = noBtn;
      no.classList.remove('hide');

      if(noBtn == ""){
        no.classList.add('hide');
      }
      setDepth('confirm');

      yes.addEventListener("click", function(){
        yes.removeEventListener('click', arguments.callee);
        no.removeEventListener('click', arguments.callee);
        popup.classList.add('hide');
        history.back();
        complete(true);
      });

      no.addEventListener("click", function(){
        yes.removeEventListener('click', arguments.callee);
        no.removeEventListener('click', arguments.callee);
        popup.classList.add('hide');
        if(bBackExit == false){
            history.back();
        }            
        complete(false);
      });
      
      popup.classList.remove('hide');
    });
}

function getPreviewImage(){
    return qs('#capture-img').src;
}