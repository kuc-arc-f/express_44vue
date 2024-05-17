<script setup lang="ts">
import { ref, reactive } from 'vue';
let envValue = ref(process.env.NODE_ENV);
//console.log("page.App.env=", process.env.NODE_ENV)
console.log("envValue=", envValue.value)
</script>

<template>
  <html>
    <head>
        <title>welcome</title>
        <span v-if="envValue === 'develop'"><link href="/static/style.css" rel="stylesheet" />
        </span>
        <span v-else><link href="/public/static/style.css" rel="stylesheet" />
        </span>
    </head>
    <body>
        <div id="app"></div>
        <span v-if="envValue === 'develop'"> <script type="module" src="/static/main.js"></script>
        </span>
        <span v-else><script type="module" src="/public/static/main.js"></script>
        </span>
    </body>
  </html>
</template>

<style scoped>
</style>
<!--
            {(process.env.NODE_ENV === "develop") ? (
                <script type="module" src="/static/main.js"></script>
            ): (
                <script type="module" src="/public/static/main.js"></script> 
            )}             

-->