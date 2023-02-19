import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from "./plugins/vuetify";
// import VueSession from 'vue-session'
// import axios from 'axios'
// import VueAxios from 'vue-axios'
// import VueCookies from 'vue-cookies'

import './assets/main.css'

const app = createApp(App)

// .use(VueSession)use(VueAxios).use(axios).use(VueCookies).

app.use(vuetify).use(router).mount("#app");