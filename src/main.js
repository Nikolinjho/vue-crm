import "$style/main.css";

import "@/js/materialize.min.js";
// Import Vue
import Vue from "vue";
// Import Vue App, routes, store
import Vuelidate from "vuelidate";
import App from "./App";
import store from "@/store/store";
import router from "@/router";

import VueMeta from "vue-meta";
import Paginate from "vuejs-paginate";

import dateFilter from "@/filters/date.filter";
import currencyFilter from "@/filters/currency.filter";
import localizeFilter from "@/filters/localize.filter";

import tooltipDirective from "@/directives/tooltip.directive";

import messagePlugin from "@/utils/message.plugin";

import Loader from "@comps/app/Loader";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

window.eventBus = new Vue();

Vue.use(messagePlugin);
Vue.use(Vuelidate);
Vue.use(VueMeta);
Vue.filter("date", dateFilter);
Vue.filter("currency", currencyFilter);
Vue.filter("localize", localizeFilter);
Vue.directive("tooltip", tooltipDirective);
Vue.component("Loader", Loader);
Vue.component("Paginate", Paginate);

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyA_3VOH3bxdnwO0ZloZa4kqSlrU4xO9vyc",
  authDomain: "vue-crm-5ef5a.firebaseapp.com",
  databaseURL: "https://vue-crm-5ef5a.firebaseio.com",
  projectId: "vue-crm-5ef5a",
  storageBucket: "vue-crm-5ef5a.appspot.com",
  messagingSenderId: "930995989871",
  appId: "1:930995989871:web:a8d9829419f3f976eb4c9a",
  measurementId: "G-WGNFGZCZ42"
};

firebase.initializeApp(firebaseConfig);

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router: router,
      store: store,
      el: "#app",
      render: h => h(App)
    });
  }
});
