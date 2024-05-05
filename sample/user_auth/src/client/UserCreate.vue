<script setup lang="ts">
import { ref, reactive } from 'vue';
//
import CrudIndex from './User/CrudIndex'
import Crud from './User/Crud';
import Validate from './User/Validate';
//
let errors = ref({});

/**
 *
 * @param
 *
 * @return
*/     
const hiddenNavibar = function(){
  const elm = document.querySelector(`.app_navi_wrap`);
  if(elm) {elm.classList.remove('d-none');}
  if(elm) {elm.classList.add('d-none');}
}
hiddenNavibar();

/**
 *
 * @param
 *
 * @return
 */
const addProc = async function(){
  try {
    const input = Crud.getInputValues();
console.log(input);
    errors.value = Validate.formValidate(input);
console.log(errors.value);
    if (Object.keys(errors.value).length > 0) {
        alert("Error!");
        return;
    }
    const result = await CrudIndex.addItem(); 
    if(result){
      alert("OK, add User");
      location.href = '/login';
    } else{
      alert("Error, add User");
    }
  } catch (e) {
    console.error(e);
  }
}
</script>

<template>
  <div class="container mx-auto my-2 px-8 bg-white">
    <h1 class="text-4xl text-gray-700 font-bold my-2">UserCreate !
    </h1>
    <hr class="my-2" />
    <label class="text-2xl font-bold my-2">Name: 
      <input type="text" id="name" name="name" 
      class="border border-gray-400 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
      />    
    </label>
    <span v-if="errors.name">
      <em class="error_message">{{errors.name}}</em>
    </span>
    <!-- Email -->
    <hr class="my-2" />
    <label class="text-2xl font-bold my-2">Email:</label>
    <input type="text" id="email" name="email"
    class="input_text" />
    <span v-if="errors.email">
      <em class="error_message">{{errors.email}}</em>
    </span> 
    <!-- Password -->
    <label class="text-2xl font-bold my-2">Password:</label>
    <input type="text" id="password" name="password"
    class="input_text" />
    <span v-if="errors.password">
      <em class="error_message">{{errors.password}}</em>
    </span> 
    <hr class="my-2" />
    <button class="btn-purple" @click="addProc">Login
    </button>
  </div>
</template>

<style scoped>
</style>
