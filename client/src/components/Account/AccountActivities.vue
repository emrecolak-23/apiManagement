<template>
  <app-modal title="Silme İşlemini Onayla"> 
    <div class="modal-body">
          <p>Bütün geçmiş kayıtlarınızı silmek istediğinizden emin misiniz?</p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Hayır!
          </button>
          <button @click="deleteLogs" 
          type="button" 
          class="btn btn-danger"
          data-bs-dismiss="modal"
          aria-label="Close"
          >Evet Onaylıyorum
          </button>
     </div>
  </app-modal>
  <base-content :menuItems="['Ana Sayfa', 'Hesap Aktiviteleri']">
    <h1>Hesap Aktiviteleri</h1>
    <div @click="filterLogs('auth')" class="btn btn-primary me-2">Giriş Geçmişi</div>
    <div @click="filterLogs('app')" class="btn btn-warning me-2 text-white">Uygulama Geçmişi</div>
    <div @click="filterLogs('all')" class="btn btn-success me-2">Hepsini Göster</div>

    <div class="btn btn-danger float-end" data-bs-toggle="modal" data-bs-target="#exampleModal">Hepsini Sil</div>
   
    <app-alert class="mt-3"/>
   
    <select v-model="filterCount" class="form-control mt-3 mb-3">
      <option value="10">Son 10 Kayıt</option>
      <option value="20">Son 20 Kayıt</option>
      <option value="all">Hepsini Göster</option>
    </select>
    <table class="table table-striped">
      <thead>
        <th>
          İşlem
        </th>
        <th>
          Tipi
        </th>
        <th>
          Tarih
        </th>
      </thead>
      <tbody v-if="logs.value.length">
        <tr v-for="log in logs.value" :key="log._id">
          <td class="align-middle">{{log.description}}</td>
          <td class="align-middle"><h6 :class="log.type == 'auth' ? 'btn btn-primary': 'btn btn-success'" >
            <i :class="log.type == 'auth' ? 'fa fa-person' : 'fa fa-server' "></i>
            {{log.type}}
            </h6>
            </td>
          <td class="align-middle">{{formattedDate(log.createdAt)}}</td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="3"><p class="d-flex align-items-center" ><i class="fa fa-info-circle fa-2x ms-3 me-2"></i> Geçmiş kayıtlarınız burada görünür</p></td>
        </tr>
      </tbody>
    </table>

  </base-content>
</template>

<script>
import {useStore} from 'vuex'
import {computed, ref, watch} from 'vue'
export default {
  setup() {
    const store = useStore()

    let logs = ref([])
    const filterCount = ref(10)

    store.dispatch('log/getLogs',filterCount.value)

    watch(filterCount, (filterCount) => {
      store.dispatch('log/getLogs', filterCount)
    })

    logs.value = computed(() => store.getters['log/allLogs'])

    function formattedDate(date) {
      const dateByYear = date.slice(0,10)
      const dateByClock = date.slice(11,19)
      const showDate = `${dateByYear} - ${dateByClock}`
      return showDate
    }

    function filterLogs(type) {
      if(type =='auth') {
        logs.value = computed(() => store.getters['log/authLog'])
      } else if (type=='app') {
        logs.value = computed(() => store.getters['log/appLog'])
      } else {
        logs.value = computed(() => store.getters['log/allLogs'])
      }
    }

    async function deleteLogs() {
      const result = await store.dispatch('log/removeAllLogs');
      store.commit('showAlert', {
        show: true,
        text: result[1],
        alertClass: result[0] ? 'alert-success' : 'alert-danger'
      })
    }

    return {
      logs,
      formattedDate,
      filterLogs,
      filterCount,
      deleteLogs
    }
  }

}
</script>