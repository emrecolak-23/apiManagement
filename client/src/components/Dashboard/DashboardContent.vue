<template>
  <base-content :menuItems="['Ana Sayfa']">
    <h1>Uygulama Grafikleri</h1>
    <div class="btn-group mb-5" role="group" aria-label="Basic example">
      <button v-for="a in app" :key="a" 
      @click="getLogsGroup(a._id, a.name)"
      type="button" 
      class="btn btn-secondary">{{a.name}}</button>
    </div>
    <div id="barChart"></div>
  </base-content>
</template>

<script>
import { onMounted } from '@vue/runtime-core'
import { computed } from '@vue/runtime-core'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import { watch } from '@vue/runtime-core'
export default {
  setup() {
   
    const store = useStore()
    store.dispatch('app/getAllApps')
    const router = useRouter()    

    const app = computed(()=> store.getters['app/_allApps']);
    const appLogGroup = computed(()=> store.getters['app/_appLogsGroup'])

    async function getLogsGroup(id, name) {
      const result = await store.dispatch('app/getLogsGroup', id)
      if (!result) {
        router.push({name: 'ApiError', params: {apiName: name} })
      }
    }
    let isAppLog = false
    var chart;
    watch(appLogGroup, (newValue, oldValue) => {
      const chartItems = ['Tarihe göre istek sayısı'];
      const x = ['x']
        newValue.forEach(item => {
          chartItems.push(item.total)
          x.push(item._id)  
        });
        chart.load({
          columns: [x,chartItems]
        })
    })

   onMounted(() => {
      chart = bb.generate({
        data: {
          "x": 'x',
          columns: [],
          type: "bar", // for ESM specify as: bar()
        },
        "axis": {
          "x": {
            "type": "timeseries",
            "tick": {
              "format": "%Y-%m-%d"
            }
          }
        },
        bar: {
          width: {
            ratio: 0.5
          }
        },
        bindto: "#barChart"
      });

    })
    return {
      app,
      getLogsGroup,
      appLogGroup,
    }
  }
}
</script>