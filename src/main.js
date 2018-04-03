import Vue from 'vue'
import Index from './routes/index.vue'
import About from './routes/about.vue'
import Contact from './routes/contact.vue'
import Login from './routes/login.vue'
import Signup from './routes/signup.vue'
import AccountDashboard from './routes/account-dashboard.vue'
import Logout from "./routes/logout.vue"
import NotFound from './routes/404.vue'

// Vue Resource: for http request wrappers
import VueResource from 'vue-resource'
Vue.use(VueResource);
Vue.http.options.root = 'http://localhost:3000/api/';
Vue.http.headers.common['Authorization'] = `Bearer ${localStorage.getItem("access-token")}`;

const routes = {
  '': Index,
  '/about': About,
  '/contact': Contact,
  '/login': Login,
  '/logout': Logout,
  '/signup': Signup,
  '/account-dashboard': AccountDashboard
}

new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.pathname.replace(/\/$/, "")
  },
  computed: {
    ViewComponent () {
      return routes[this.currentRoute] || NotFound
    }
  },
  render (h) { return h(this.ViewComponent) }
})
