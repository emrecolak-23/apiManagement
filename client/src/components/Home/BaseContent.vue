<template>
  <div id="layoutSidenav_content">
    <main class="container-fluid">
      <BreadCrumb :items="menuItems" />
      <slot> </slot>
    </main>
  </div>
</template>

<script>
import BreadCrumb from "@/components/Home/BreadCrumb.vue";

export default {
  props: {
    menuItems: {
      type: Array
    }
  },
  components: {
    BreadCrumb,
  },
};
</script>
