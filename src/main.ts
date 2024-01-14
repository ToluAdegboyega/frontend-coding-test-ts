import { createApp, provide, h } from 'vue'
import Toast from 'vue-toastification'
import { DefaultApolloClient } from '@vue/apollo-composable'
import apolloClient from './apollo'

import App from './App.vue'
import initializeRouter from './router'

import './styles/main.css'
import 'vue-toastification/dist/index.css'

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },

  render: () => h(App),
})

app.use(Toast)
app.use(initializeRouter)

app.mount('#app')
