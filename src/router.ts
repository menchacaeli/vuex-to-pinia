import { createRouter, createWebHashHistory } from 'vue-router'
import PackageList from './views/PackageList.vue'
import PackageDetails from './views/PackageDetails.vue'
import ErrorDisplay from './views/ErrorDisplay.vue'

const routes = [
  {
    path: '/',
    name: 'PackageList',
    component: PackageList
  },
  {
    path: '/package/:id',
    name: 'PackageDetails',
    props: true,
    component: PackageDetails
  },
  {
    path: '/error/:error',
    name: 'ErrorDisplay',
    props: true,
    component: ErrorDisplay
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
