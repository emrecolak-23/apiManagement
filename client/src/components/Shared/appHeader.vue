<template>
  <nav class="sb-topnav navbar navbar-expand navbar-light bg-light">
    <!-- Navbar Brand-->
    <router-link class="navbar-brand ps-3" :to="{name: 'DashboardContent'}">Secure Key</router-link>
    <!-- Sidebar Toggle-->
    <button
      class="btn btn-link btn-sm order-1 order-lg-0 ms-auto"
      id="sidebarToggle"
      href="#!"
    >
      <i class="fas fa-bars"></i>
    </button>
    <!-- Navbar Search-->

    <!-- Navbar-->
    <ul class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
      <li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle"
          id="navbarDropdown"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          ><i class="fas fa-user fa-fw"></i
        ></a>
        <ul
          class="dropdown-menu dropdown-menu-end"
          aria-labelledby="navbarDropdown"
        >
          <li v-for="item in dropdownItems" :key="item">
            <router-link class="dropdown-item" :to="item.to">
              {{item.title}} 
            </router-link>
            </li>
          <li><hr class="dropdown-divider" /></li>
          <li><a class="dropdown-item" href="#" @click="logout" >Çıkış</a></li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script>
import {useRouter} from 'vue-router'
import {removeToken} from '@/utils'
export default {
  setup() {

    const router = useRouter()

    const dropdownItems =  [
      {
        title: 'Hesap Ayarları',
        to: 'account-settings'
      },
      {
        title: 'Hesap Aktiviteleri',
        to: 'account-activity'
      }
    ]

    async function logout() {
      await removeToken()
      router.push({name: 'LoginView'})
    }

    return {
      dropdownItems,
      logout
    }

  },
}
</script>

