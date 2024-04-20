<script setup lang="ts">
import { ref, reactive } from 'vue';

import Crud from './Zod/Crud';
import Validate from './Zod/Validate';
import CrudIndex from './TursoTest/CrudIndex';
import CrudShow from './TursoTest/CrudShow';
//
let items = ref([]);
let item = ref({});
let itemId = ref(0);
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
 *
 * @param
 *
 * @return
 */
const getItem = async function() {
  try{
console.log("#getItem");
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get('id') || "";
console.log("id=", id);
    itemId.value = Number(id);
    const data = await CrudShow.get(Number(id));
console.log(data);
    item.value = data;
  } catch (e) {
    console.error(e);
  } 
}
getItem();

/**
 *
 * @param
 *
 * @return
 */
const deleteProc = async function(){
  const resulte = await CrudShow.delete(Number(itemId.value));
  if(resulte) {
    location.href= "/tursotest";
  }
//    console.log("deleteProc");
}
</script>

<!-- template -->
<template>
  <div class="container mx-auto my-2 px-8 bg-white">
    <a href="/tursotest">
      <button class="btn-outline-purple">Back</button>
    </a>
    <h1 class="text-4xl text-gray-700 font-bold my-2">TursoTestShow.vue! </h1>
    <hr class="my-2" />
    <h1 class="text-4xl text-gray-700 font-bold my-2">{{item.title}}</h1>
    <hr class="my-2" />
    <span>ID: {{item.id}}, {{item.createdAt}}</span>
    <hr class="my-2" />
    {{item.content}}
    <hr class="my-2" />
    <button @click="deleteProc" class="btn-red">Delete</button>
    <hr class="my-2" />
  </div>
</template>

<!-- style -->
<style scoped>
</style>

<!-- 
<button @click="testProc" class="btn-purple">Add</button>
-->
