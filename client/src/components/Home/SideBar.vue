<template>
  <div id="layoutSidenav_nav">
    <nav class="sb-sidenav accordion sb-sidenav-light" id="sidenavAccordion">
      <div class="sb-sidenav-menu">
        <div class="nav">
          <div class="sb-sidenav-menu-heading">Ana Sayfa</div>
          <router-link class="nav-link" :to="{name: 'DashboardContent'}">
            <div class="sb-nav-link-icon">
              <i class="fas fa-tachometer-alt"></i>
            </div>
            Ana Sayfa
          </router-link>
          <div v-for="menu in menus" :key="menu.categoryName">
            <div class="sb-sidenav-menu-heading">{{ menu.categoryName }}</div>
            <div v-for="list in menu.list" :key="list.title">
              <div v-if="list.submenus">
                <a
                  class="nav-link collapsed"
                  href="#"
                  data-bs-toggle="collapse"
                  :data-bs-target="`#${list.title}`"
                  aria-expanded="false"
                  aria-controls="collapseLayouts"
                >
                  <div class="sb-nav-link-icon">
                    <i class="fas fa-columns"></i>
                  </div>
                  {{list.title}}
                  <div class="sb-sidenav-collapse-arrow">
                    <i class="fas fa-angle-down"></i>
                  </div>
                </a>
                <div
                  class="collapse"
                  :id="list.title"
                  aria-labelledby="headingOne"
                  data-bs-parent="#sidenavAccordion"
                >
                  <nav class="sb-sidenav-menu-nested nav">
                    <div v-for="sub in list.submenus" :key="sub.title">
                      <router-link class="nav-link" :to="sub.to"
                      >{{sub.title}}
                      </router-link>
                    </div>
                  </nav>
                </div>
              </div>
              <router-link v-else class="nav-link" :to="list.to">
                <div class="sb-nav-link-icon">
                  <i :class="list.icon"></i>
                </div>
                {{list.title}}
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="sb-sidenav-footer">
        <div class="text-center">
           <img height="75" class="rounded-circle" :src="user.obj.avatar_url" :alt="user.obj.name">
        </div>
        <div class="small">
          <b>{{user.obj.name}}</b> olarak giriş yapıldı
        </div>
        Secure Key
      </div>
    </nav>
  </div>
</template>

<script>
import {computed} from 'vue'
import {useStore} from 'vuex'
export default {
  setup() {

    const store = useStore()

    const user = computed(()=> store.getters["auth/user"])

    const menus = [
      {
        categoryName: "Api Yönetimi",
        list: [
          {
            title: "Apiler",
            icon: "fa fa-columns",
            submenus: [
              {
                title: "Yeni Uygulama Oluştur",
                to: "api-create",
              },
              {
                title: "Api Uygulamalarını Yönet",
                to: "api-list",
              },
            ],
          },
        ],
      },
      {
        categoryName: "Hesap",
        list: [
          {
            title: "Hesap Ayarlarım",
            icon: "fa fa-person",
            to: "account-settings",
          },
          {
            title: "Hesap Aktivitelerim",
            icon: "fa fa-person",
            to: "account-activity",
          },
        ],
      },
    ];

    return {
      menus,
      user
    };
  },
};
</script>
