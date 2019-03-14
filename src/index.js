
// JS - ./js/index.js
import './js/'
// SCSS
import './scss/main.scss'
// CSS (example)
import './css/main.css'

// Bootstrap (example)
// import Bootstrap from 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/css/bootstrap.min.css'

// import 'vue'
// import Vue from 'vue'
window.Vue = require('vue')
import store from './store'

Vue.component('example-component', require('./components/Example.vue').default)

// With vuex
const app = new Vue({
  data () {
    return {
      component: false,
    }
  },
  store,
  el: '#app'
})

//* Without vuex and store
// const app = new Vue({
//   el: '#app'
// })