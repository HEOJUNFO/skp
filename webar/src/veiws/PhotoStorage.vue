<template>
    <iframe :src="`${baseUrl}/ar.html#/photo-storage`" frameBorder="0"></iframe>
</template>
  
<script>

import { onMounted, toRefs, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import cryptoUtil from "@/js/cryptoUtil";

export default {
    name: "PhotoStorage",
    setup() {
        const route = useRoute();
        const { eventId, arData } = toRefs(route.query);
        const store = useStore();
        const { dispatch, getters } = store;
        const { aes256Decode } = cryptoUtil();

        const eventData = ref(null);

        onMounted(async () => {
            console.log("PhotoStorage onMounted")
            const eventValidation = arData?.value;
            const isLocal = window.location.port !== "";

            if (!isLocal && !eventId?.value) {

                await dispatch("url/closeWindow");
                // return
            }

            if (!isLocal && !eventValidation) {
                await dispatch("url/redirectToMain");
            }

            try {
                let params = {
                    eventId: eventId.value,
                };
                console.log("params", params)

                await dispatch("eventData/getEventPhotoBox", params);

                eventData.value = getters["eventData/photoBoxData"];
                sessionStorage.setItem("skWebArJson", JSON.stringify(eventData.value));
                const eventValidationData = JSON.parse(aes256Decode(eventValidation));
                await dispatch("url/setActionType", eventValidationData.activeType);
            } catch (error) {
                console.log("error", error)
                // await dispatch("url/redirectToMain");
                // return
            }
        });



        return {
            baseUrl: process.env.VUE_APP_PAGE_PATH
        }
    }
}
</script>
  
<style scoped></style>