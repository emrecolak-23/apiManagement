<template>
  <div id="layoutAuthentication">
    <div id="layoutAuthentication_content">
      <main>
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-5">
              <div class="card shadow-lg border-0 rounded-lg mt-5">
                <div class="card-header">
                  <h3 class="text-center font-weight-light my-4">Giriş Yap</h3>
                </div>
                <div class="card-body">
                  <form>
                    <div class="form-floating mb-3">
                      <input
                        class="form-control"
                        id="inputEmail"
                        type="email"
                        placeholder="name@example.com"
                      />
                      <label for="inputEmail">Email Adres</label>
                    </div>
                    <div class="form-floating mb-3">
                      <input
                        class="form-control"
                        id="inputPassword"
                        type="password"
                        placeholder="Password"
                      />
                      <label for="inputPassword">Şifre</label>
                    </div>
                    <div class="form-check mb-3">
                      <input
                        class="form-check-input"
                        id="inputRememberPassword"
                        type="checkbox"
                        value=""
                      />
                      <label
                        class="form-check-label"
                        for="inputRememberPassword"
                        >Şifremi Hatırla</label
                      >
                    </div>
                    <div
                      class="d-flex align-items-center justify-content-between mt-4 mb-0"
                    >
                      <a class="small" href="password.html">Şifreni Unuttunmu?</a>
                      <a class="btn btn-primary" href="index.html">Giriş</a>
                    </div>
                  </form>
                  <div class="d-flex align-items-center justify-content-center">
                    <button @click="login" class="btn btn-dark btn-sm p-2"><i class="fab fa-github"></i> Github İle Giriş Yap</button>
                  </div>
                </div>
                <div class="card-footer text-center py-3">
                  <div class="small">
                    <a href="register.html">Hesabın Yok Mu? Üye Ol!</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    <div id="layoutAuthentication_footer">
      <footer class="py-4 bg-light mt-auto">
        <div class="container-fluid px-4">
          <div class="d-flex align-items-center justify-content-between small">
            <div class="text-muted">Copyright &copy; Emre Çolak 2022</div>
            <div>
              <a href="#">Gizlilik Politikası</a>
              &middot;
              <a href="#">Şartlar &amp; Koşullar</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import {useStore} from 'vuex'
import {useRoute, useRouter} from 'vue-router'
export default {
  setup() {

    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    console.log(process.env.VUE_APP_JWTSECRET);

    isTokenExist()

    async function isTokenExist() {
      if(route.query.token) {
        const result = await store.dispatch('auth/authorize', route.query.token)
        if (result) {
          router.push({name: 'HomeView'})
        }
      }
    }

    function login() {
      window.location.href = 'https://github.com/login/oauth/authorize?client_id=2b397f6f247d9e44b0f7'
      // store.dispatch('auth/authorize');
    }

    return {
      login
    }
  }
}
</script>
