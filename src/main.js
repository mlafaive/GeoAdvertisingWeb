import Vue from 'vue'
import App from './app.vue'
import Index from './routes/index.vue'
import About from './routes/about.vue'
import Contact from './routes/contact.vue'
import Login from './routes/login.vue'
import Signup from './routes/signup.vue'
import AccountDashboard from './routes/account-dashboard.vue'
import AccountSettings from './routes/account-settings.vue'
import Logout from "./routes/logout.vue"
import NotFound from './routes/404.vue'
import Sandbox from './routes/sandbox.vue'

// vue2-google-maps: for reactive google maps component
import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyBoGgGuV1YKv_lIquFYVXSfjIdKo2HHXto',
    }
})

// googlemaps: for static google maps objects (static, or street view)
var GoogleMapsAPI = require('googlemaps')
var googleMapsConfig = {
    key: 'AIzaSyA63AaNQeuLoZi5OjR4O2MFy2ReWo420kM',
    secure: true
}
var gmAPI = new GoogleMapsAPI(googleMapsConfig)

// vue-bootstrap: for bootstrap components
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)
import './bootconf.scss'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// vue-resource: for http request wrappers
import VueResource from 'vue-resource'
Vue.use(VueResource);
Vue.http.options.root = 'https://geo-advertising.herokuapp.com/api';

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
        refresh_token: null,
        businesses: null,
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
            Object.keys(state).forEach(key => state[key] = null)
        },
        businesses(state, val) {
            state.businesses = val
        }
    },
    actions: {
        getBusinesses({commit, state}) {
            var url = `users/${state.email}/businesses`;
			Vue.http.get(url)
			.then((data) => {
				let businesses = data.body.businesses

                console.log(businesses)

                // Get a static map for each business
                businesses.forEach((business) => {
                    let address = `${business.store_address}, ${business.city.city_name}, ${business.city.state_name}`
                    business.img = gmAPI.staticMap({
                        center: address,
                        zoom: 19,
                        size: '600x300',
                        maptype: 'roadmap',
                        markers: [
                            {
                                location: address
                            }
                        ]
                    })
                    console.log(business.img)
                })

                // Commit the changes to state
                commit('businesses', businesses)
			})
			.catch((err) => {
				console.error(err)
			})
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
  {path: '/account-settings', component: AccountSettings},
  {path: '/sandboxcomponent', component: Sandbox},
  {path: '*', component: NotFound}
]

const router = new VueRouter({routes})

new Vue({
  render: createEle => createEle(App),
  router, // register VueRouter globally
  store, // registers Vuex store globally
  beforeMount() {
    // Set default $http options
    Vue.http.interceptors.push(function(request) {
      console.log(request)

      // keep auth token up to date
      if(!request.headers.get("Authorization")) {
        request.headers.set('Authorization', `Bearer ${store.state.access_token}`);
      }

      return (response) => {
        if (response.status === 401) {
          return Vue.http.post('refresh', {}, {headers: {'Authorization': `Bearer ${store.state.refresh_token}`}})
          .then((data) => {
            store.commit("access_token", data.body.access_token)
            console.log("refreshed access token")
            // retry the original request
            return Vue.http[request.method.toLowerCase()](request.url, request.body)
          })
          .catch((err) => {
            console.log("could not refresh access token:")
            console.log(err)
          })
        }
      }
    })
  }
}).$mount("#app")
