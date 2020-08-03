import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import axios from 'axios'
import jQuery from 'jquery'
import firebase from 'firebase/app'

window.$ = window.jQuery = jQuery;
Vue.config.productionTip = false

/*--- FirebaseConfig ---*/
var firebaseConfig = {
  apiKey: "AIzaSyBwMaMrR6Of3YMupLKg1mbki5mBA_IIQhg",
  authDomain: "test-7da67.firebaseapp.com",
  databaseURL: "https://test-7da67.firebaseio.com",
  projectId: "test-7da67",
  storageBucket: "test-7da67.appspot.com",
  messagingSenderId: "1017444381148",
  appId: "1:1017444381148:web:2dd5f8e99e908363521f19"
};

firebase.initializeApp(firebaseConfig);


new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

Vue.webchat.$axios = axios