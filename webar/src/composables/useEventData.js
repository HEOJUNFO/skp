/*
*
* 이벤트 데이터 관련
* 서버 : session storage에 있는 데이터를 사용 (landing.vue에서 api호출 후 저장)
* 로컬 : vuex에 있는 데이터를 사용
*
* */

import {useStore} from "vuex";
import {useRoute} from "vue-router";

export default function useEventData() {
    const {dispatch} = useStore();
    const {query} = useRoute();

    const getEventData = async () => {
        const {type} = query;
        if (type === "landing" || type === "sample-landing" || type === "open-browser" || type === "webview") {
            // 랜딩 페이지 일때 session storage에서 데이터 파싱
            await dispatch("eventData/getStroageEventData");
            await dispatch("jsonData/setPhotoBoxData");
        } else {
            // 샘플 페이지용 - jsonData store의 데이터를 사용
            if (parent.location.hash.indexOf("basic") > -1) {
                // basic object
                await dispatch("jsonData/setActionObjectBasic");
            }
            if (parent.location.hash.indexOf("mission") > -1) {
                // mission
                await dispatch("jsonData/setActionObjectMission");
            }
            if (parent.location.hash.indexOf("bridge") > -1) {
                // bridge
                await dispatch("jsonData/setActionObjectBridge");
            }
            if (parent.location.hash.indexOf("is-mission") > -1) {
                // image search mission
                await dispatch("jsonData/setImageScanningMission");
            }
            if (parent.location.hash.indexOf("drag-n-drop") > -1) {
                // nft
                await dispatch("jsonData/setActionObjectDragNDrop");
            }
            if (parent.location.hash.indexOf("open-browser") > -1) {
                // await dispatch("jsonData/setActionObjectFrame");
                await dispatch("jsonData/setPhotoBoxData");
            }
            if (parent.location.hash.indexOf("webview") > -1) {
                await dispatch("jsonData/setActionObjectFrame");
                await dispatch("jsonData/setPhotoBoxData");
            }
            if (parent.location.hash.indexOf("photo-box") > -1) {
                await dispatch("jsonData/setPhotoBoxData");
            }

        }
    };
    return {
        getEventData
    };
}