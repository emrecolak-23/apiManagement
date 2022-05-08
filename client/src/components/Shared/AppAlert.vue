<template>
  <div v-if="alertData.show" class="alert" :class="alertData.alertClass">{{alertData.text}}</div>
</template>

<script>
import {computed} from 'vue';
import {useStore} from 'vuex';
export default {
  setup() {

    const store = useStore();

    const alertData = computed(()=> store.getters['alertData'])

    return {
      alertData
    }

  }
}
</script>