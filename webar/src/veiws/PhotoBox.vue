<template>
    <iframe :src="`${baseUrl}/ar.html#/photo-box`" frameBorder="0"></iframe>
</template>
  
<script>

import { onMounted, toRefs, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default {
    name: "PhotoBox",
    setup() {
        const route = useRoute();
        const { eventId } = toRefs(route.query);
        const store = useStore();
        const { dispatch, getters } = store;

        const eventData = ref(null);

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
                console.log("params", params)

                await dispatch("eventData/getEventPhotoBox", params);

                eventData.value = getters["eventData/photoBoxData"];
                sessionStorage.setItem("skPhotoBoxJson", JSON.stringify(eventData.value));
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