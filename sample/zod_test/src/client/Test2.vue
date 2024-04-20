<script setup lang="ts">
import { ref, reactive } from 'vue';

const objData = {
  count: 0,
  msg: "",
};
//
const count = ref(0);
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
}
</script>

<template>
  <h1 class="text-4xl text-gray-700 font-bold my-2">Test2.vue</h1>
  <hr class="my-2" />
  <div>count= {{ countObj.count }}</div>
  <div>msg= {{ countObj.msg }}</div>
  <hr />
  <button @click="log" class="btn">Log</button>
  <hr />
</template>
<!--
<div>{{ count }} / {{ countObj.count }}</div>
-->