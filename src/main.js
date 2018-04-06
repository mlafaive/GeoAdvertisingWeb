import Vue from 'vue'
import Index from './routes/index.vue'
import About from './routes/about.vue'
import Contact from './routes/contact.vue'
import Login from './routes/login.vue'
import Signup from './routes/signup.vue'
import AccountDashboard from './routes/account-dashboard.vue'
import Logout from "./routes/logout.vue"
import NotFound from './routes/404.vue'

// vue-bootstrap: for bootstrap components
import BootstrapVue from 'bootstrap-vue'
import './bootconf.scss'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)

// vue-resource: for http request wrappers
import VueResource from 'vue-resource'
Vue.use(VueResource);

// VeeValidate: for form input validation
import VeeValidate from 'vee-validate'
Vue.use(VeeValidate)

// Vuex: for reactive state
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        email: null,
        access_token: null,
        refresh_token: null
    },
    mutations: {
        email(state, val) {
            state.email = val
        },
        access_token(state, val) {
            state.access_token = val
        },
        refresh_token(state, val) {
            state.refresh_token = val
        },
        logout(state) {
            state.email = null
            state.access_token = null
            state.refresh_token = null
        }
    },
    plugins: [createPersistedState()]
})

// Reigster Routes
const routes = {
  '': Index,
  '/about': About,
  '/contact': Contact,
  '/login': Login,
  '/logout': Logout,
  '/signup': Signup,
  '/account-dashboard': AccountDashboard
}

var vm = new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.pathname.replace(/\/$/, "")
  },
  store, // registers Vuex store globally
  computed: {
    ViewComponent () {
      return routes[this.currentRoute] || NotFound
    }
  },
  render (h) { return h(this.ViewComponent) }
})

// Set default $http options
Vue.http.options.root = 'http://localhost:3000/api/';
Vue.http.headers.common['Authorization'] = `Bearer ${vm.$store.state.access_token}`;
