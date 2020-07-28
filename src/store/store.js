import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import common from './modules/common';
import auth from './modules/auth';
import info from './modules/info.js';
import category from './modules/category';
import record from './modules/record';

const store = new Vuex.Store({
  modules: {
      common,
      auth,
      info,
      category,
      record
  },
  actions: {
    async fetchCurrency(){
      const key = '365fe80956d068e672d75119ffe67832';
      const res = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,RUB,EUR`);
      return await res.json()
    }
  }
})


export default store