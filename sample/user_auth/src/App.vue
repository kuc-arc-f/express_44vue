<script setup lang="ts">
import { RouterLink } from 'vue-router';
import Head from './components/Head.vue'
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
console.log("#App.vue");
//console.log(routes);
let items = routes;
</script>

<template>
  <Head />
  <div>
    <ul class="app_navi_wrap">
      <li v-for="item in items" :key="item.path">
        <router-link :to="'' + item.path">{{item.name}}</router-link>
      </li>
    </ul>
    <hr />
    <router-view></router-view>
  </div>
</template>

<style scoped>
</style>

<!--
<hr />
<Header />
<h1>hello, vue</h1>
<li v-for="item in items" :key="item.id">
  ">link={{ item.name }}</router-link>
</li>
-->