import { createApp } from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import App from './App.vue'
import './assets/css/index.css'

library.add(faGithub, faLocationDot)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app')