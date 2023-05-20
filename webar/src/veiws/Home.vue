<template>
  <div class="wrapper" style="text-align: center;">
    <h1>{{ msg }}</h1>
    <ul>
      <li v-for="({path, name}, index) in routerList" :key="`menu_${index}`">
        <router-link :to="path">{{ name }}</router-link>
      </li>
    </ul>
<!--    <hr>
    <pre style="text-align: left; text-indent: -29px; white-space: pre-wrap; padding: 50px;">
      {{ deviceList }}
    </pre>-->
  </div>
</template>

<script>
import {routes} from "../router"
import {onMounted, ref} from "vue";
import {getDeviceList} from '@/js/device'

export default {
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      default: 'Web AR'
    }
  },
  setup() {

    const routerList = ref([]);
    let deviceList = getDeviceList();

    onMounted(() => {
      routerList.value = routes
          .filter(item => item.path !== '/')
          .filter(item => item.path !== '/landing')
          .filter(item => item.path !== '/sample-landing')
          .map(({name, path}) => ({name, path}))
    })

    return {
      routerList,
      deviceList,
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  padding: 20px;
}
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}

li {
  display: inline-block;
  margin: 0 10px;
  margin-top: 20px;
}

a {
  color: #42b983;
}

.device-list li {
  text-align: left;
  display: block;
}

.wrapper {
  padding: 50px;
}
</style>
