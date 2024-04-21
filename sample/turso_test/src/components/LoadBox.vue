<script setup lang="ts">
</script>

<template>
  <div class="flex flex-row bg-blue-200">
    <div class="flex-1 text-end pt-0.5 px-2">
      <span class="text-xl text-blue-700">Loading...</span>
    </div>
    <div class="flex-1 text-center pt-1.5 pb-1">
      <div class="flex" aria-label="Loading now...">
        <div class="animate-spin h-6 w-6 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    </div>
  </div>  
</template>

<style scoped>
</style>
