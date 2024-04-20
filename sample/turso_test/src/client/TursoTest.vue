<script setup lang="ts">
import { ref, reactive } from 'vue';

import Crud from './Zod/Crud';
import Validate from './Zod/Validate';
import CrudIndex from './TursoTest/CrudIndex';
//
let items = ref([]);
const errors = reactive({
  title: "",
  content: "",
})
const resetErrors = function(){
  const keys = Object.keys(errors);
  keys.forEach((key) => { errors[key] = ""; });
}
//
const testProc = async function(){
  resetErrors();
  const input = Crud.getInputValues();
  const formErrors = Validate.formValidate(input);
console.log(formErrors);
  if(formErrors.title){
    errors.title = formErrors.title;
  }
  if(formErrors.content){
    errors.content = formErrors.content;
  }
console.log("errors.title=", errors.title);
console.log(errors);
  const keys = Object.keys(errors);
  if(!errors.title && !errors.content) {
    console.log("no, errors");
    await CrudIndex.addItem(); 
    location.reload();
  }
}
/**
 * getList
 * @param
 *
 * @return
 */
const getList = async function() {
  try{
console.log("#getList");
    const data = await CrudIndex.getList();
console.log(data);
    items.value = data;
  } catch (e) {
    console.error(e);
  } 
}
getList();

</script>

<!-- template -->
<template>
  <div class="container mx-auto my-2 px-8 bg-white">
    <h1 class="text-4xl text-gray-700 font-bold my-2">TursoTest.vue! </h1>
    <hr class="my-2" />
    <label>Title:
      <input type="text" id="title" 
      class="border border-gray-400 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
      />    
    </label>
    <span v-if="errors.title">
      <em class="error_message">{{errors.title}}</em>
    </span>
    <hr class="my-2" />
    <label>Content:
    <input type="text" id="content" 
    class="border border-gray-400 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
    />    
    </label>    
    <span v-if="errors.content">
      <em class="error_message">{{errors.content}}</em>
    </span>
    <hr class="my-2" />
    <button @click="testProc" class="btn-purple">Add</button>
    <hr class="my-2" />
    <ul>
      <li v-for="item in items" :key="item.id">
        <h3 class="text-3xl font-bold">{{ item.title }}</h3>
        <span>ID: {{ item.id }}, {{ item.createdAt }}</span>
        <router-link :to="'/tursotestshow?id=' + item.id" 
        class="btn-outline-purple ms-2">Show
        </router-link>
        <hr class="my-2" />
      </li>
    </ul>
  </div>
</template>

<!-- style -->
<style scoped>
</style>

<!-- 
-->
