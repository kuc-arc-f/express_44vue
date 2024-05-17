<script setup lang="ts">
defineProps(['message'])
//
const closeButton = function(){
  const dlg = document.getElementById('modalDialog');
  if(dlg) {
    //@ts-ignore
    dlg.close();
  }
}
</script>

<template>
  <dialog id="modalDialog" class="dialog">
    <div class="bg-white px-8 pt-3 pb-3 dialog_body_wrap">
      <p class="text-3xl font-bold text-gay-900">{{ message }}</p>
      <hr class="my-3" />
      <button 
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-8 rounded"
      type="submit" @click="closeButton">Ok</button>
    </div>
  </dialog>
</template>

<style scoped>
</style>
<!--
<h4>{{ message }}</h4>
-->
