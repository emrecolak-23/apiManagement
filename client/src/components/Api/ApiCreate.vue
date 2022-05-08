<template>
  <base-content :menuItems="['Ana Sayfa', 'Uygulama Oluştur']">
    <h1 class="mb-5">Yeni bir uygulama oluştur</h1>
    <app-alert/>
    <form @submit.prevent="createApp">
      <div class="form-group row mb-2">
        <label class="col-sm-2 col-form-label" for="appName">Uygulama Adı<span class="text-danger">*</span></label>
         <div class="col-sm-10">
           <input
           v-model="appName"
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
        <label class="col-sm-2 col-form-label" for="appApiKey">Api Key<span class="text-danger">*</span></label>
         <div class="col-sm-10">
           <input 
           v-model="appApiKey"
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
          v-model="appDescription"
          maxlength="500"
          class="form-control" 
          id="appDescription" 
          rows="5"
          ></textarea>
        </div>
      </div>
      <button :disabled="appName.trim().length==0 || appApiKey.trim().length == 0" class="btn btn-success offset-2">Uygulama Oluştur</button>
    </form>
  </base-content>
</template>

<script>
import {ref} from 'vue'
import {useStore} from 'vuex'
export default ({
  setup() {

    const store = useStore()

    const appName = ref("");
    const appApiKey = ref("");
    const appDescription = ref("");

    async function createApp(e) {
      const result = await store.dispatch('app/createApp', 
      {
        appName: appName.value,
        appApiKey: appApiKey.value,
        appDescription: appDescription.value})
      store.commit('showAlert', {
        show: true,
        text: result[1],
        alertClass: result[0] ? 'alert-success' : 'alert-danger'
      })
      appName.value = "";
      appApiKey.value = "";
      appDescription.value = "";
    }

    return {
      appName,
      appApiKey,
      appDescription,
      createApp
    }
  },
})
</script>

