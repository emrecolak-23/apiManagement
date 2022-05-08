<template>
  <base-content :menuItems="['Ana Sayfa']">
      <p>{{apiName}} uygulamanıza herhangi bir istek yapılmamıştır</p>
  </base-content>
</template>

<script>
import {useRoute} from 'vue-router'
export default {
  setup() {
    const route = useRoute()
    let apiName = route.params.apiName

    return {
      apiName
    }
  }
}
</script>