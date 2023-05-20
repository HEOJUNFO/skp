<template>
  <iframe :src="url" v-show="url" @load="loadComplete"></iframe>
</template>

<script>
import {computed, onMounted, ref} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import querystring from "querystring";

export default {
  name: "SampleLanding",
  setup() {
    const store = useStore();
    const {getters} = store;

    const router = useRouter();
    const baseUrl = process.env.VUE_APP_PAGE_PATH
    const urls = ref([
      `${baseUrl}/basic.html#/basic`,
      `${baseUrl}/basic.html#/basic`,
      `${baseUrl}/basic.html#/basic`,
      `${baseUrl}/ar.html#/mission`,
      `${baseUrl}/basic.html#/drag-n-drop`,
    ])

    const eventData = ref(null);

    const templateType = computed(() => eventData?.value?.eventLogicalType);

    const url = computed(() => {
      if (templateType.value) {
        const type = ['BASIC', 'MISSION', 'BRIDGE', 'SCANNING','DRAG_DROP']
        const query = `?` + querystring.stringify({
          type: 'sample-landing'
        });
        return urls.value[type.findIndex(item => item === templateType.value)] + query
      }
      return null
    })

    onMounted(() => {

      eventData.value = getters['jsonData/eventData'];

      // 데이터 없음
      if (!url.value) {
        alert('데이터 없음!')
        router.push({name: 'Home'})
        return;
      }

      // 스토리지에 json데이터 저장
      sessionStorage.setItem('skWebArJson', JSON.stringify(eventData.value));
    })

    const loadComplete = () => {
      // console.log('!!!!!!!!!!!!!!!   loadComplete')
    }

    return {
      url,

      loadComplete,
    };
  }
}
</script>

<style scoped>

</style>