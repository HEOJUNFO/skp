<template>
  <div class="stamp-container" :class="[stampPanelDirection.toLowerCase(), stampType]">
    <ul>
      <li v-for="item in stampInfoObjectList" :key="`stamp_${item.itemID}`">
        <img :src="item.src" alt="">
      </li>
    </ul>
  </div>
</template>

<script>
import {computed, ref, toRefs} from "vue";

export default {
  name: "EventStamp",
  props:{
    stampInfo: {
      type: Object,
      default() {
        return {};
      }
    },
    templateType: {
      type: String,
      default: "MISSION"
    }
  },
  setup(props) {
    // stamp 정보
    const {stampInfo, templateType} = toRefs(props);
    // stamp 목록 정보 TODO arObject.js 로 함수 분리 (?)
    const stampInfoObjectList = ref(stampInfo.value.stampInfoObjectList.map(item=>{
      item.src = item.enableThumbnailUri;
      return item;
    }));
    // stamp type (class)
    const stampType = computed(() => {
      return templateType.value === 'MISSION' ? 'mission'
          : templateType.value === 'SCANNING' ? 'scanning'
          : ''
    })
    // stamp 위치
    const stampPanelDirection = computed(() =>
      stampInfo.value ? stampInfo.value.stampPanelDirection : 'BOTTOM'
    );

    const setStamp = (itemID) => {
      stampInfoObjectList.value = stampInfoObjectList.value.map(item=>{
        if(item.itemID === itemID) {
          item.src = item.disableThumbnailUri;
        }
        return item;
      })
    }

    return {
      stampInfoObjectList,
      stampPanelDirection,
      stampType,

      setStamp,
    }
  }
}
</script>

<style scoped>
  .stamp-container {
    position: absolute;
    box-sizing: border-box;
  }
  .stamp-container.top{
    /*top: 22vh;*/
    top: 35vw;
  }

  .stamp-container.right{
    right: 20px;
  }

  .stamp-container.bottom{
    /*bottom: 12vh;*/
    bottom: 19vw;
  }

  .stamp-container.left{
    left: 20px;
  }

  .stamp-container.bottom,
  .stamp-container.top {
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
  }

  .stamp-container.left,
  .stamp-container.right {
    /*top: 50%;*/
    /*transform: translateY(-50%);*/
    top: 35vw;
  }

  .stamp-container ul {
    display: flex;
    flex-direction: row;
  }

  .stamp-container.left ul,
  .stamp-container.right ul {
    flex-direction: column;
  }

  .stamp-container li {
    margin: 0 6px;
    width: 50px;
    height: 50px;
    box-sizing: border-box;
  }

  .stamp-container.left li,
  .stamp-container.right li {
    margin: 6px 0;
  }

  .stamp-container img{
    width: 100%;
    height: 100%;
  }

  .stamp-container.scanning li {
    border: 2px solid #fff;
    margin: 0 9px;
    width: 92px;
    height: 92px;
  }

  .stamp-container.scanning.left li,
  .stamp-container.scanning.right li {
    margin: 10px 0;
  }

</style>