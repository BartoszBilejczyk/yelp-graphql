import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueApollo from 'vue-apollo';
import { apolloClient } from './config/apollo.config';
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.config.productionTip = false

Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  defaultOptions: {
    // apollo options applied to all queries in components
    $query: {
      loadingKey: 'loading',
      fetchPolicy: 'cache-and-network'
    }
  }
})

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_MAPS_KEY,
    libraries: 'places',
  },
  installComponents: true
})

new Vue({
  router,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
