import Vue from 'vue'
import App from './app.vue'
import Index from './routes/index.vue'
import About from './routes/about.vue'
import Contact from './routes/contact.vue'
import Login from './routes/login.vue'
import Signup from './routes/signup.vue'
import AccountDashboard from './routes/account-dashboard.vue'
import Logout from "./routes/logout.vue"
import NotFound from './routes/404.vue'
import Sandbox from './routes/sandbox.vue'

// vue-bootstrap: for bootstrap components
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)
import './bootconf.scss'
import 'bootstrap-vue/dist/bootstrap-vue.css'

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

// vue-router: for single-page routing
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// Reigster Routes
const routes = [
  {path: '/', component: Index},
  {path: '/about', component: About},
  {path: '/contact', component: Contact},
  {path: '/login', component: Login},
  {path: '/logout', component: Logout},
  {path: '/signup', component: Signup},
  {path: '/account-dashboard', component: AccountDashboard},
  {path: '/sandboxcomponent', component: Sandbox}
]

const router = new VueRouter({routes})

var vm = new Vue({
  render: createEle => createEle(App),
  router, // register VueRouter globally
  store // registers Vuex store globally
}).$mount("#app")

// Set default $http options
Vue.http.options.root = 'https://geo-advertising.herokuapp.com/api/';
Vue.http.interceptors.push(function(request) {
  // keep auth token up to date
  request.headers.set('Authorization', `Bearer ${vm.$store.state.access_token}`);
});
