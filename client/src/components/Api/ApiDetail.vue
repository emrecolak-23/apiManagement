<template>
  <base-content v-if="app" :menuItems="['Ana Sayfa', 'Uygulamalar', app.name]">
  <h1 class="mb-5">{{app.name}}</h1>
  <div class="alert alert-primary" v-if="app.time==10000 && app.limit==10">
    <i class="fa fa-info me-2"></i>Uygulamanızın limitleri varsayılan değerlerindedir.
  </div>
  <app-alert/>
  <div class="offset-2 col-md-8">
    <form @submit.prevent="updateApp">
      <h3>Uygulama Ayarları</h3>
      <div class="form-group row mb-2">
        <label class="col-sm-2 col-form-label" for="appName">Uygulama Adı</label>
         <div class="col-sm-10">
           <input
           v-model="apps.name"
           min="5"
           max="50" 
           type="text" 
           id="appName" 
           class="form-control"
           required
           >
         </div>
      </div>
      <div class="form-group row mb-2">
        <label class="col-sm-2 col-form-label" for="appApiKey">Api Key</label>
         <div class="col-sm-10">
           <input 
           v-model="apps.apiKey"
           max="200"
           type="text" 
           id="appApiKey" 
           class="form-control"
           required
           >
         </div>
      </div>
      <div class="form-group row mb-2">
        <label class="col-sm-2 col-form-label" for="appDescription">Açıklama</label>
        <div class="col-sm-10">
          <textarea
          v-model="apps.description" 
          style="resize:none;"
          maxlength="500"
          class="form-control" 
          id="appDescription" 
          rows="5"
          ></textarea>
        </div>
      </div>
      <h3>Uygulama Limitleri</h3>
      <div class="form-group row mb-2">
        <label class="col-sm-2 col-form-label" for="appLimit">İstek Limiti</label>
         <div class="col-sm-10">
           <input
           v-model="apps.limit"
           type="number" 
           id="appLimit" 
           class="form-control"
           required
           >
         </div>
      </div>
      <div class="form-group row mb-2">
        <label class="col-sm-2 col-form-label" for="appDuration">İstek Süresi (ms)</label>
         <div class="col-sm-10">
           <input
           v-model="apps.time"
           type="number" 
           id="appDuration" 
           class="form-control"
           required
           >
         </div>
      </div>
      <button class="btn btn-success">Güncelle</button>

    </form>
  </div>

  <div class="offset-2 col-md-8 mt-5">
    <h3>İzin Verilenler Listesi</h3>
        <form @submit.prevent="addAllowIp" class="mb-2">
          <div class="row">
            <div class="col">
              <input v-model="allowIp" type="text" class="form-control" placeholder="Ip adresini giriniz">
            </div>
            <div class="col">
              <button class="btn btn-success">+ Ekle</button>
            </div>
          </div>
        </form>
        <table class="table table-striped">
          <thead>
            <th>İp Adresi</th>
            <th>İşlem</th>
          </thead>
          <tbody v-if="app.allowList">
            <tr v-for="ip in app.allowList" :key="ip">
              <td>
                {{ip}}
              </td>
              <td>
                <div @click="deleteAllowedIp(ip)" class="btn btn-danger"><i class="fa fa-trash"></i></div>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="2"><p class="d-flex align-items-center" ><i class="fa fa-info-circle fa-2x ms-3 me-2"></i> İzin verilen ip adresi yok. <b class="ms-2"> Uygulamanıza heryerden erişim sağlanabilir</b></p>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
  </div>

  <div class="offset-2 col-md-8 mt-5">
    <h3>Yasaklı Listesi</h3>
      <form @submit.prevent="addBlockIp" class="mb-2">
          <div class="row">
            <div class="col">
              <input v-model="blockIp" type="text" class="form-control" placeholder="Ip adresini giriniz">
            </div>
            <div class="col">
              <button class="btn btn-success">+ Ekle</button>
            </div>
          </div>
        </form>
        <table class="table table-striped">
          <thead>
            <th>İp Adresi</th>
            <th>İşlem</th>
          </thead>
          <tbody v-if="app.blockList">
            <tr v-for="ip in app.blockList" :key="ip">
              <td>
                {{ip}}
              </td>
              <td>
                <div @click="deleteBlockedIp(ip)" class="btn btn-danger"><i class="fa fa-trash"></i></div>
              </td>
            </tr>
          </tbody>
           <tbody v-else>
            <tr>
               <td colspan="2">
                  <p class="d-flex align-items-center" ><i class="fa fa-info-circle fa-2x ms-3 me-2"></i> Yasaklanan ip adresi yok. <b class="ms-2">Uygulamanıza heryerden erişim sağlanabilir</b></p>
               </td>
               <td></td>
            </tr>
          </tbody>
        </table>
  </div>

    <div class="offset-2 col-md-8 mt-5">
    <h3>İstek Logları</h3>
        <table class="table table-striped">
          <thead>
            <th>İp Adresi</th>
            <th>Tarih</th>
            <th>Ülke</th>
          </thead>
          <tbody>
            <tr v-for="log in appLogs" :key="log">
              <td>
                {{log.ipAdress}}
              </td>
              <td>
                {{log.createdAt.slice(0,10)}} - {{log.createdAt.slice(11,19)}}
              </td>
              <td>
                {{log.ipLocation.country_name}}
              </td>
            </tr>
          </tbody>
        </table>
  </div>
  </base-content>
</template>

<script>

import {useStore} from 'vuex'
import {useRoute} from 'vue-router'
import { computed, ref} from 'vue';
export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    store.dispatch('app/getApp', route.params.slug)
    const app = computed(()=> store.getters['app/_app'])

    const allowIp = ref('')
    const blockIp = ref('')
    const apps = ref(app)
    store.dispatch('app/getAppLog', route.params.slug)

    const appLogs = computed(()=> store.getters['app/_appLogs'])

    async function updateApp(e) {
      const result = await store.dispatch("app/updateApp",{data: apps.value, slug:route.params.slug})
      store.commit('showAlert', {
        show: true,
        text: result[1],
        alertClass: result[0] ? 'alert-success' : 'alert-danger'
      })
    }

    function addAllowIp(e) {
      store.dispatch("app/addAllowList", {ipAdress: allowIp.value, slug: route.params.slug})
      allowIp.value = ""
    }
    
    function addBlockIp(e) {
      store.dispatch("app/addBlockList", {ipAdress: blockIp.value, slug: route.params.slug})
      blockIp.value = ""
    }

    function deleteAllowedIp(ip) {
      store.dispatch('app/removeAllowList', {ipAdress: ip, slug: route.params.slug})
    }

    function deleteBlockedIp(ip) {
      store.dispatch('app/removeBlockList', {ipAdress: ip, slug: route.params.slug})
    }

    return {
      app,
      appLogs,
      updateApp,
      apps,
      addAllowIp,
      allowIp,
      addBlockIp,
      blockIp,
      deleteAllowedIp,
      deleteBlockedIp
    }
  }
}
</script>