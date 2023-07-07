var tempUserKey = "cultureconTestKey";
var titleList = ["사진 출력 이벤트 안내", "사진 선택하기", "기기번호", "사진 출력하기"];
var kioskList = ["0000","0001","0044"];
var contentList = [];
var contentLength = 4;
var contentIdx = 0;
var titleTag = null;


function changeContent(stepIndex) {
    contentIdx = stepIndex;
    renderContent();
}

// 뒤로 가기 버튼을 눌렀을 때 이전 컨탠츠으로 돌아가는 기능을 구현합니다.
window.addEventListener('hashchange', function(ev){
    let hash = location.hash;
    let stepIndex = hash.replace('#', '');
    let prevHashSplit = ev.oldURL.split('#');   
    let prevDepth = null;


    if(prevHashSplit.length > 1)
        prevDepth = prevHashSplit[1].replace('#', '');

//    alert(prevDepth + ' / '+ stepIndex);
    if (prevDepth == '0' && stepIndex == '-1') {
        //\
        closePrint(false);
        return ;
    }

    changeContent(stepIndex);    
});


window.addEventListener('pagehide', function (event) { 
    this.alert('hide')
} );

window.addEventListener('beforeunload', function (event) { 
    this.alert('unload')
} );

window.onload = function() { 
    alertOs();
    const responsiveTag = document.querySelector('#content-1 .content');
    const intervalId = setInterval(() => {
        const height = responsiveTag.clientHeight;
        if (height) {
            
            responsiveTag.setAttribute('style', `max-height: ${height}px`);
            document.querySelector("#descImg").addEventListener('load', () => {
                console.log('이미지 로드 완료');
              });
            document.querySelector("#descImg").src = topPath + descFolderPath + descFileName;
            clearInterval(intervalId);
        }
    }, 100);

    titleTag = document.querySelector("#title");
    for(var i = 0; i < contentLength; i++) {
        var content = document.querySelector("#content-" + (i+1));
        contentList.push(content);
    }

    //event input max length
    document.querySelector("#kiosk-id").addEventListener("input", function() {
        if(this.value.length > 4) {
            this.value = this.value.slice(0, 4);
        }
    });

    var checkPathName = getOpenerPath();
    if( checkPathName == "/frame.html") {
        document.querySelector("#selectPhotoDesc").style.display = "none";
        document.querySelector("#previewImage").src = window.opener.getPreviewImage();
    }       
    else{
        document.querySelector("#previewImage").style.display = "none";
    }

    setContentIdx('0');    
    renderContent();
    
    document.querySelector("#btnGoSelectPhoto").addEventListener("click", function() {
        setContentIdx('1');
    });

    document.querySelector("#btnGoSelectPrint").addEventListener("click", function() {
        if(document.querySelector("#previewImage").style.display == "")
            setContentIdx('2');
        else
            alert("사진을 선택해주세요.");
    });

    document.querySelector("#btnStartPrint").addEventListener("click", function() {

        let kioskID = document.getElementById("kiosk-id").value;
        if( kioskID === '' ){
            alert("올바른 키오스크 번호를 입력해주세요.");
            return;
        }

        // 키오스크 리스트에 있는지 확인    
        let isExist = false;
        for(let i = 0; i < kioskList.length; i++){
            if(kioskList[i] == kioskID){
                isExist = true; 
                break;
            }
        }

        if(!isExist){
            alert("행사장에서 사용되지 않는 키오스크 번호입니다.");
            return;
        }

        setContentIdx(3);
        changeUploadStatus('loading');
        CheckKiosk();

        document.getElementById("kiosk-id").value = '';
    });

    document.querySelector("#btnRetryAr").addEventListener("click", function() {
        closePrint(true, true);
    });

    document.querySelector("#btnClose").addEventListener("click", function() {
        closePrint(false);
    });

    document.querySelector("#btnChangePhoto").addEventListener("click", function() {
        document.querySelector('#inputImage').click();
    });

    document.querySelector("#inputImage").addEventListener('change', function (event) {
        var file = event.target.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                document.querySelector("#previewImage").src = e.target.result;
            };
            reader.readAsDataURL(file);
            document.querySelector("#previewImage").style.display = "";
            document.querySelector("#selectPhotoDesc").style.display = "none";
        }
    });

    document.querySelector("#btnZoomIn").addEventListener("click", function() {
        window.open("./img/etc/map2.png");
    });
    
}

function alertOs(){
    let name = getBrowserName();
    if(name != 'safari') return;

    version = getIosDetailVersion()

    if(version >= 16.0 && version <= 16.2)
        alert("해당 버전에서는 좌측 아래에 있는 뒤로가기 버튼이 문제가 있을수있습니다. 위에 있는 뒤로가기 버튼을 사용해주세요.");

}

function getOpenerPath() {
    // 다른 경로 포함되도 뒷 경로만 남기기 위한 슬라이스
    if(window.opener == null) return null;

    var url = window.opener.location.pathname;
    var checkPathName = url.slice(url.lastIndexOf("/"));

    return checkPathName;

}

function closePrint(toggle,open = false){
    var checkPathName = getOpenerPath();

    if( checkPathName == "/frame.html") {
        if(toggle == true)
            window.opener.toggleArSkin(true);

        window.close();
        return ;
    }
    
    if( open == true ){
        var url     = window.location.href;
        var link    = url.slice(0,url.lastIndexOf("/")) + "/frame.html";
        window.open(link);
    }
}

function setContentIdx(idx) {
    contentIdx = idx;
    location.href = location.origin + location.pathname + "#"+contentIdx;
}

function renderContent() {
    
    titleTag.innerHTML = titleList[contentIdx];

    for(var i = 0; i < contentLength; i++) {
        if(i == contentIdx) {
            contentList[i].style.display = "";
        } 
        else {
            contentList[i].style.display = "none";
        }        
    }
}

function changeUploadStatus(status) {
    let statusList = ['loading', 'success', 'fail'];
    let footer = document.querySelector("#content-4 .footer");
    if(status == 'loading') 
        footer.style.display = "none";
    else
        footer.style.display = "";


    for(let i = 0; i < statusList.length; i++){
        if(statusList[i] == status){
            document.querySelector("#content-4 .content."+statusList[i]).style.display = "";
            continue;
        }

        document.querySelector("#content-4 .content."+statusList[i]).style.display = "none";
    }
}

function ImgUpload() {

    const previewImage          = document.querySelector("#previewImage");
    const canvas                = document.createElement("canvas");
    const ctx                   = canvas.getContext("2d");
    canvas.width                = previewImage.width;
    canvas.height               = previewImage.height;
    ctx.drawImage(previewImage, 0, 0);
    const base64ImageData       = canvas.toDataURL("image/jpeg");

    // Base64 형식의 데이터를 Blob 객체로 변환
    let byteString  = atob(base64ImageData.split(",")[1]);
    let arrayBuffer = new ArrayBuffer(byteString.length);
    let intArray    = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
        intArray[i] = byteString.charCodeAt(i);
    }
    let blob = new Blob([arrayBuffer], { type: "image/jpeg" });

    var url = "https://go.selpic.co.kr/skapi/upload";
    // 인화 업로드 
    var formData = new FormData();

    formData.append("robot_id", "H150"+$("#kiosk-id").val() );      //키오스크 아이디
    formData.append("user_id",  tempUserKey);                       //회원 키
    formData.append("file",  blob, "img.jpeg" );                    // 이미지 확장지 jpg 필수 

    console.log(formData.get("robot_id"));
    console.log(formData.get("user_id"));
    console.log(formData.get("file"));

    $.ajax({
        url:url,
        type: "POST",
        enctype:'multipart/form-data',            
        contentType: 'multipart/form-data',  
        dataType: 'json',     
        mimeType: 'multipart/form-data',
        processData	: false,
        contentType	: false,
        crossDomain: true,
        data		: formData, 
        url: url, 
        success:function(data)
        {     
            console.log(data);

            if ( data.upload != true){
                changeUploadStatus('fail');
            }
            else{
                GetUserHistory();
            }
        },
        error:function(error)
        { 
            alert("network error."); 
            changeUploadStatus('fail');
            return;
        }  
    });

}

function CheckKiosk() {
    let kioskID = $("#kiosk-id").val();

    if(kioskID == "0000") {
        setTimeout(function(){
            changeUploadStatus('fail');
        }, 3000);
        return ;
    }
    else if(kioskID == "0001") {
        setTimeout(function(){
            changeUploadStatus('success');
        }, 3000);
        return ;
    }

    //  키오스크 번호는 4자리 숫자인데 코드는 H150???? 이런식으로 붙음
    //  셀픽에서 H150없이도 출력 가능하도록 API 업데이트 해줌
    var url = "https://go.selpic.co.kr/skapi/kiosk/"+$("#kiosk-id").val(); 
    //키오스크 상태 확인 
    // GET https://go.selpic.co.kr/skapi/kiosk/{키오스크 코드}

    $.ajax({
        type: "GET", 
        url: url,
        dataType:"JSON",
        success:function(data)
        {     
            //  성공해서 이미지 업로드
            if ( data.status != 'normal'){
                changeUploadStatus('fail');
            }
            else{
                ImgUpload();
            }
        },
        error:function(error)
        {
            //  실패
            alert("network error."); 
            changeUploadStatus('fail');
            return;
        }  
    });

}

function GetUserHistory() {

    //  유저키는 각각 유니크키여야 하고 이걸 만드는 코드가 필요
    var url = "https://go.selpic.co.kr/skapi/order/"+ tempUserKey;
    // 인화 상태 확인 
    // GET https://go.selpic.co.kr/skapi/order/{회원 키}

    $.ajax({
        type: "GET", 
        url: url,
        dataType:"JSON",
        success:function(data)
        {     
            if(data.length <= 0){
                changeUploadStatus('fail');
                return ;
            }

            let info = data[0];

            let x = document.getElementsByClassName("loading-text")[0];
            x.innerText="";

            switch(info.status) {
                case 'S': //완료
                    changeUploadStatus('success');
                    break;
                case 'F': //실패
                    changeUploadStatus('fail');
                    break;
                case 'W': //업로드
                    changeUploadStatus('loading');
                    x.innerText="전송중";
                    break;
                case 'P': //인쇄중
                    changeUploadStatus('loading');
                    x.innerText="출력중";
                    break;
            }

            if(info.status == 'W' || info.status == 'P') {

                setTimeout(function(){
                    GetUserHistory();
                }, 2000);

            }
            

            // if (info.status == 'S'){
            //     changeUploadStatus('success');
            // }
            // else if (info.status == 'F'){
            //     changeUploadStatus('fail');
            // }
            // else{
            //     setTimeout(function(){
            //         GetUserHistory();
            //     }, 2000);
            // }
        },
        error:function(error)
        {
            alert("network error."); 
            return;
        }  
    });

}
