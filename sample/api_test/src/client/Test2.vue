<script setup lang="ts">
import { ref, reactive } from 'vue';

const objData = {
  count: 0,
  msg: "",
};
//
const count = ref(0);
let items = ref([]);
let countObj = reactive({
  count: 0,
  msg: "aaaa",
});
const resetErrors = function(){
  const keys = Object.keys(countObj);
  keys.forEach((key) => { countObj[key] = ""; });
}
function log() {
//  countObj.msg = new Date().toString();
console.log(countObj);
  resetErrors();
  const addArr = [
    {id: 1, title: 't1'},
    {id: 2, title: 't2'},
  ];
  items.value = addArr;
}
</script>

<template>
  <div class="container mx-auto my-2 px-8 bg-white">
    <h1 class="text-4xl text-gray-700 font-bold my-2">Test2.vue</h1>
    <hr class="my-2" />
    <div>count= {{ countObj.count }}</div>
    <div>msg= {{ countObj.msg }}</div>
    <hr />
    <button @click="log" class="btn">Log</button>
    <hr />
    {{JSON.stringify(items)}}
    <hr class="my-2" />
    <ul>
      <li v-for="item in items" :key="item.id">
        <h3 class="text-3xl font-bold">{{ item.title }}</h3>
        <span>ID: {{ item.id }}</span>
        <hr class="my-2" />
      </li>
    </ul>

  </div>
</template>
<!--
<div>{{ count }} / {{ countObj.count }}</div>
-->