<script setup lang="ts">
//import HelloWorld from './components/HelloWorld.vue'
import { RouterLink } from 'vue-router';
import Header from './components/Header.vue'
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
  <div>
    <li v-for="item in items" :key="item.path">
      <router-link :to="'' + item.path">{{item.name}}</router-link>
    </li>
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