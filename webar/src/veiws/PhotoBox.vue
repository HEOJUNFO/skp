<template>
    <iframe :src="`${baseUrl}/ar.html#/photo-box`" frameBorder="0"></iframe>
</template>
  
<script>

import { onMounted, toRefs, ref } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

import cryptoUtil from "@/js/cryptoUtil";

export default {
    name: "PhotoBox",
    setup() {
        const route = useRoute();
        const router = useRouter();
        const { eventId } = toRefs(route.query);
        const store = useStore();
        const { dispatch, getters } = store;
        const { aes256Encode } = cryptoUtil();

        const eventData = ref(null);
        const eventARData = ref(null);

        window.goArPhoto = async function () {
            let arData = {};
            arData.event_validation = concatStr(eventId.value, "_", webEventGetTraceNo());
            arData.activeType = "WEB";
            arData.latitude = window.localStorage.getItem("latitude");
            arData.longitude = window.localStorage.getItem("longitude");
            eventARData.value = aes256Encode(JSON.stringify(arData));

            await router.push({ name: "Landing", query: { eventId: eventId.value, arData: eventARData.value } });
        };

        const concatStr = function () {
            let str = "";
            for (let i of arguments) {
                str += i;
            }
            return str;
        }

        const webEventGetTraceNo = function () {
            let timezoneOffset = new Date().getTimezoneOffset() * 60000;
            let timezoneDate = new Date(Date.now() - timezoneOffset);

            let traceNo = (timezoneDate).toISOString().slice(0, 19).replace(/[-T:]/g, "") + (Math.random() + "").slice(2, 5);
            return traceNo;
        };

        onMounted(async () => {
            const isLocal = window.location.port !== "";

            if (!isLocal && !eventId?.value) {

                await dispatch("url/closeWindow");
                // return
            }

            try {
                let params = {
                    eventId: eventId.value,
                };

                await dispatch("eventData/getEventPhotoBox", params);

                eventData.value = getters["eventData/photoBoxData"];
                sessionStorage.setItem("skPhotoBoxJson", JSON.stringify(eventData.value));
            } catch (error) {
                await dispatch("url/redirectToMain");
                return
            }
        });

        return {
            baseUrl: process.env.VUE_APP_PAGE_PATH
        }
    }
}
</script>
  
<style scoped></style>