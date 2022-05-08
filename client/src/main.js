import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import appHeader from '@/components/Shared/appHeader.vue'
import BaseContent from '@/components/Home/BaseContent.vue'
import AppModal from '@/components/Shared/AppModal.vue'
import AppAlert from '@/components/Shared/AppAlert.vue'

const app = createApp(App)

app.component('appHeader', appHeader)
app.component('baseContent', BaseContent)
app.component('appModal', AppModal)
app.component('appAlert', AppAlert)


app.use(store)
app.use(router)
app.mount('#app')
