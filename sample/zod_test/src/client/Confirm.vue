<script setup lang="ts">
import Crud from './Zod/Crud';
import Validate from './Zod/Validate';
import DialogBox from '../components/DialogBox.vue'
import ConfirmDialog from '../components/ConfirmDialog.vue'
//
import { ref, reactive } from 'vue';
//
const testProc = async function(){
  const dlg = document.getElementById('confirmDialog');
  if(dlg) {
    //@ts-ignore
    dlg.showModal();
  }
//console.log("errors.title=", errors.title);
}
//
const cbFunc = async function(){
  console.log("#parent.cbFunc");
  alert("parent.cbFunc");
}
</script>

<!-- template -->
<template>
  <div class="container mx-auto my-2 px-8 bg-white">
    <h1 class="text-4xl text-gray-700 font-bold my-2">Confirm.vue! </h1>
    <hr class="my-2" />
    <button @click="testProc" class="btn">Test</button>
    <!-- dialog -->
    <ConfirmDialog message="OK? next" @cbFunction="cbFunc" />
  </div>
</template>

<!-- style -->
<style scoped>
</style>

<!-- 
-->