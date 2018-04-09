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
Vue.http.options.root = 'https://geo-advertising.herokuapp.com/api/';

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

// Register Routes
const routes = [
  {path: '/', component: Index},
  {path: '/about', component: About},
  {path: '/contact', component: Contact},
  {path: '/login', component: Login},
  {path: '/logout', component: Logout},
  {path: '/signup', component: Signup},
  {path: '/account-dashboard', component: AccountDashboard},
  {path: '/sandboxcomponent', component: Sandbox},
  {path: '*', component: NotFound}
]

const router = new VueRouter({routes})

// Import _http helper as a new plugin
//import _http from './_http.vue'
const plugin = {
  install(Vue) {
    Vue.mixin({
      methods: {
        request: function (type, endpoint, body) {
          type = type.toLowerCase()

          var promise
          switch (type) {
            case 'get':
              promise = Vue.http.get(endpoint)
              break;
            case 'post':
              func = Vue.http.post(endpoint, body)
              break;
            case 'delete':
              func = Vue.http.delete(endpoint)
              break;
            case 'patch':
              func = Vue.http.patch(endpoint, body)
              break;
            default:
              throw new Error('invalid request type')
          }

          if (promise) {
            console.log(promise)
            return promise.catch((err) => {
              console.error(err)

              // if the error is something other than an auth error, return the error
              if (err.status !== 401) {
                if (err.body.msg)
                  return err.body.msg
                else if (err.body.error)
                  return err.body.error
              }
              // if auth error and refresh token exists, get a new access token
              if (err.body.msg && store.state.refresh_token) {
                console.log(store.state.refresh_token)
                // Set access token
                Vue.http.post(
                  'refresh',
                  {},
                  {headers: {'Authorization': `Bearer ${store.state.refresh_token}`}}
                )
                .then((data) => {
                  store.commit('access_token', data.body.access_token)
                  console.log('refreshed access token!')
                })
                .then(() => {
                  // retry the original request
                  return promise
                })
                .catch((err) => {
                  console.log("could not refresh access_token:")
                  console.error(err)
                })
              }
            })
          }
        }
      }
    })
  }
}
Vue.use(plugin)

new Vue({
  render: createEle => createEle(App),
  router, // register VueRouter globally
  store, // registers Vuex store globally
  beforeMount() {
    // Set default $http options
    Vue.http.interceptors.push(function(request) {
      // keep auth token up to date
      if(!request.headers.get("Authorization")) {
        request.headers.set('Authorization', `Bearer ${store.state.access_token}`);
      }
    });
  }
}).$mount("#app")
