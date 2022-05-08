<template>
  <ol class="breadcrumb mb-4">
    <li v-for="(item,index) in items" :key="index" class="breadcrumb-item" :class="index == items.length -1 ? 'active':''">{{item}}</li>
  </ol>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>