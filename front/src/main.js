import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueCarousel from 'vue-carousel';
import VueSimpleAlert from 'vue-simple-alert';

import {router} from './routes'
import {store} from './store'

Vue.config.productionTip = false
Vue.use(VueCarousel);
Vue.use(VueSimpleAlert);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
