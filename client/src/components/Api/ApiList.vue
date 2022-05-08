<template>
  <base-content :menuItems="['Ana Sayfa', 'Uygulama Listem']">
    <h1 class="mb-2">Uygulamalar</h1>

    <router-link :to="{ name: 'ApiCreate'}" >
      <button class="btn btn-success mb-2"><i class="fa fa-plus"></i>Yeni Oluştur</button>
    </router-link>

    <app-alert/>
    <table class="table table-striped">
      <thead>
        <th>Uygulama Adı</th>
        <th>Api Anahtarı</th>
        <th>Uygulama Slug</th>
        <th>İşlem</th>
      </thead>
      <tbody v-if="apps.length>0">
        <tr v-for="app in apps" :key="app._id">
          <td>{{app.name}}</td>
          <td>{{app.apiKey}}</td>
          <td>{{app.slug}}</td>
          <td>
            <router-link :to="{name: 'ApiDetail', params: {slug: app.slug}}">
              <button class="btn btn-warning btn-sm">Uygulamaya Git</button>
            </router-link>
              <button @click="deleteApp(app.slug)" class="btn btn-danger btn-sm ms-2">Uygulamayı Sil</button>
            </td>
        </tr>
      </tbody>
      <tbody v-else>
        <td colspan="4"><p class="d-flex align-items-center" ><i class="fa fa-info-circle fa-2x ms-3 me-2"></i> Uygulamanız burada görünür</p></td>
        <td></td>
        <td></td>
        <td></td>
      </tbody>
    </table>

  </base-content>
</template>

<script>
import { computed } from '@vue/runtime-core'

import {useStore} from 'vuex'

export default {
  setup() {

    const store = useStore()

    store.dispatch('app/getAllApps')

    const apps = computed(() => store.getters['app/_allApps'])

    async function deleteApp(slug) {
      let deleteApp = confirm("Bu uygulamayı silmek istediğine emin misin?");
      
      if(deleteApp) {  
        const result = await store.dispatch('app/deleteApp', slug)
        store.commit('showAlert', {
          show: true,
          text: result[1],
          alertClass: result[0] ? 'alert-success' : 'alert-danger'
        })
      } 
    }

    return {
      apps,
      deleteApp
    }

  }
}
</script>
