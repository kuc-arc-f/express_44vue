import { createRouter, createWebHistory } from 'vue-router'
//
const pages = import.meta.glob('./client/*.vue', { eager: true })
const routes = Object.keys(pages).map((path) => {
  const name = path.match(/\.\/client\/(.*)\.vue$/)[1]
  return {
    name,
    path: name === 'Home' ? '/' : `/${name.toLowerCase()}`,
    component: pages[path].default,
  }
})
//console.log(routes);
//
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router