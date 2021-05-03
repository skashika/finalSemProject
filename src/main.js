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
    data: {
        avatar: undefined,
        curLanguage: 'en',
    },
    watch: {
        $route: function (to, from) {
            if (to.path === '/') {
                //
            } else if (from.path === '/') {
                //
            }
            const that = this;
            this.$nextTick(() => {
                const newAvatarComp = that.findAvatarComponent(that);
                const newWidth = newAvatarComp.width - 1;
                that.$nextTick(() => {
                    newAvatarComp.$el.replaceChild(that.avatar.$el.children[0], newAvatarComp.$el.children[0]);
                    that.avatar = newAvatarComp;
                    that.avatar.width = newWidth;
                })
            });
        },
    },
    methods: {
        findAvatarComponent(parent) {
            let found = parent.$children.find(child => {
                return child.$options.name === "avatar";
            });
            console.log('Found', found)
            for (let i = 0; !found && i < parent.$children.length; i++) {
                found = this.findAvatarComponent(parent.$children[i]);
            }
            return found;
        },
    },
    mounted() {
        this.avatar = this.findAvatarComponent(this);
    }
}).$mount('#app')
