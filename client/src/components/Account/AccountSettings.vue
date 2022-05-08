<template>
  <base-content :menuItems="['Ana Sayfa', 'Hesap Ayarlarım']">
    <h1 class="mb-2">Hesap Ayarlarım</h1>
<app-alert/>
<!-- Button trigger modal -->
<button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
 <i class="fa fa-trash"></i> Bütün Uygulamalarımı Sil
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Silme İşlemi</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>Bütün uygulamalarınızı <b>silmek</b> üzeresiniz. Bütün uygulamaları silmek istediğinize emin misiniz?.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hayır</button>
        <button @click="deleteAllApp" type="button" class="btn btn-primary">Evet</button>
      </div>
    </div>
  </div>
</div>
  </base-content>
</template>

<script>
import {useStore} from 'vuex'
export default {
  setup() {

    const store = useStore()

    async function deleteAllApp() {
      const result = store.dispatch('app/deleteAllApps')
      store.commit('showAlert', {
        show: true,
        text: result[1],
        alertClass: result[0] ? 'alert-success' : 'alert-danger'
      })
    }
    return {
      deleteAllApp
    }
  }
}
</script>