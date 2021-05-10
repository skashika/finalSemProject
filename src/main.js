import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

window.newApp = new Vue({
    router,
    store,
    vuetify,
    render: h => h(App, {props: {}}),
}).$mount('#app')
