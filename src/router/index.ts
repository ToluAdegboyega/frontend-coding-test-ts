import type { App } from 'vue'
import {
  createRouter,
  createWebHistory,
  Router,
  RouteRecordRaw,
} from 'vue-router'
import Error from '../views/Error.vue'
import Characters from '../views/Characters.vue'
import CharacterDetails from '../components/character/CharacterDetails.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/error',
    alias: '/:pathMatch(.*)*',
    name: 'Error',
    props: true,
    component: Error,
  },
  {
    path: '/',
    name: 'Characters',
    props: true,
    component: Characters,
  },
  {
    path: '/character-details/:id',
    name: 'CharacterDetails',
    props: true,
    component: CharacterDetails,
  },
]

export default function initializeRouter(app: App): Router {
  const router: Router = createRouter({
    history: createWebHistory(),
    routes,
  })

  app.use(router)

  return router
}
