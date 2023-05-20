<template>
  <div class="editor-container">
    <h2>JSON EDITOR</h2>
    <div class="button-wrapper">
      <div class="select-wrapper">
        <label>
          샘플 :
          <select name="" id="" class="select" v-model="selectIndex" @change="setJson">
            <option v-for="{value, title} in list" :value="value" :key="`json_select_${value}`">{{title}}</option>
          </select>
        </label>
<!--        <button @click="setJson">설정</button>-->
        <button @click="resetJson">제설정</button>
      </div>
      <button @click="start">
        {{ selectIndex !==4 ? 'start' : '저장' }}
      </button>
    </div>
    <vue3-json-editor
        ref="editorEl"
        v-model="json"
        :show-btns="false"
        :expandedOnStart="true"
        @json-change="updateJson"
    />
  </div>
</template>

<script>
import '@/assets/css/editor.css'

import { Vue3JsonEditor } from 'vue3-json-editor'
import {computed, onMounted, reactive, ref, toRefs, watch} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import _ from 'lodash'

export default {
  name: "JsonEditor",
  components: {
    Vue3JsonEditor
  },
  setup() {
    const store = useStore();
    const {getters ,commit, dispatch} = store;
    const router = useRouter();

    const selectIndex = ref(0);
    const list = ref([
      {title: 'Action object basic', value: 0, json:''},
      {title: 'Action object mission', value: 1, json: ''},
      {title: 'Action object bridge', value: 2, json:''},
      {title: 'Image scanning info', value: 3, json:''},
      {title: 'Result pop up', value: 4, json:''},
    ])

    const storageNames = getters['jsonData/storageNames']
    const mutationNames = [
      'SET_ACTION_OBJECT_BASIC',
      'SET_ACTION_OBJECT_MISSION',
      'SET_ACTION_OBJECT_BRIDGE',
      'SET_ACTION_OBJECT_DRAGNDROP', // add drag and drop
      'SET_IMAGE_SCANNING_MISSION',
      'SET_RESULT_DATA',
    ]

    const getterNames = [
      'actionObjectBasic',
      'actionObjectMission',
      'actionObjectBridge',
      'actionObjectDragNDrop',    // add drag and drop
      'imageScanningMission',
      'resultData',
    ]

    const actionNames = [
      'resetActionObjectBasic',
      'resetActionObjectMission',
      'resetActionObjectBridge',
      'resetActionObjectDragNDrop',  // add drag and drop
      'resetImageScanningMission',
      'resetImageResultData',
    ]

    const state = reactive({json: {}})
    const title = computed(()=>list.value[selectIndex.value].title);

    const editorEl = ref(null);

    onMounted(() => {
      initData();
      // 로컬 스토리지에 저장된 데이터를 확인
      const storageData = getStoregeData();
      // 스토리지 데이터가 있을 시 스토리지 데이터로 설정
      try {
        if(storageData && storageData !== "") {
          state.json = JSON.parse(storageData);
          return
        }
      } catch (e) {
        console.log('!! storageData parse error')
      }
      // 없으면 기본 설정값을 가져온다.
      state.json = _.cloneDeep(getJson());
    })

    const initData = () => {
      // 데이터 초기화
      for(let i = 0; i<storageNames.length; i++) {
        const storageData = localStorage.getItem(storageNames[i]);
        if(storageData && storageData !== ""){
          // 스토리지 데이터
          commit(`jsonData/${mutationNames[i]}`, JSON.parse(storageData))
        } else {
          // 스토리지 데이터가 없을 시 store데이터로
          dispatch(`jsonData/${actionNames[i]}`)
        }
      }
    }

    const getStoregeData = () => localStorage.getItem(storageNames[selectIndex.value])
    // store에서 미리 설정된 값을 가져옴
    const getJson = () => getters[`jsonData/${getterNames[selectIndex.value]}`]

    // 에디터에 json설정
    const setJson = () => {
      state.json = _.cloneDeep(getJson());
    }
    const resetJson = () => {
      dispatch(`jsonData/${actionNames[selectIndex.value]}`)
      state.json = _.cloneDeep(getJson());
    }
    // json update
    const updateJson = (e) => {
      state.json = e
    }
    // 스토리지에 데이터 저장 및 랜딩 페이지로 이동
    const start = () => {
      // result data 변경 시
      if(selectIndex.value === 4) {
        commit('eventData/SET_EVENT_RESULT', state.json)
        alert('팝업 정보를 저장하였습니다.')
        return
      }
      // json result data를 event result data에 저장
      dispatch('jsonData/setImageResultData')

      // json data
      commit('jsonData/SET_EVENT_DATA', state.json)
      router.push({name:'SampleLanding'})
    }

    watch(state, (newVal) => {
      commit(`jsonData/${mutationNames[selectIndex.value]}`, newVal.json)
      localStorage.setItem(storageNames[selectIndex.value], JSON.stringify(newVal.json))
    })

    return {
      ...toRefs(state),
      selectIndex,
      // json,
      list,
      title,

      editorEl,

      start,
      setJson,
      updateJson,
      resetJson,
    }
  }
}
</script>

<style scoped>
  .button-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    line-height: 30px;
  }

  .select-wrapper {
    display: flex;
    align-items: center;
  }

  .select-wrapper button {
    margin-left: 10px;
  }

  button {
    background: #eee;
    border: 1px solid #000;
    height: 20px;
    line-height: 20px;
    text-indent: 0;
  }

  button:active {
    transform: scale(0.99);
  }

  .editor-container {
    padding: 30px;
    text-align: center;
  }

  .select {
    /*margin-bottom: 10px;*/
  }

</style>