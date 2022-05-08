<template>
  <div class="sb-nav-fixed">
    <appHeader />
    <div id="layoutSidenav">
      <SideBar />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/Home/SideBar.vue";
import BaseContent from "@/components/Home/BaseContent.vue"
import {watch} from 'vue'
import {useRoute} from 'vue-router'
import {useStore} from 'vuex'
export default {
  components: {
    SideBar,
    BaseContent
  },
  setup() {
    const route = useRoute()
    const store = useStore()
    watch(route, () => {
      store.commit('resetAlert')
    })

  }
};
</script>
