<script setup lang="ts">
import CrudIndex from './Login/CrudIndex';
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
const loginProc = async function(){
  try {
    const v =  CrudIndex.login(); 
//console.log("#loginProc.v=", v);
    if(!v){
      alert("error, Login");
      return;
    }
    const name = import.meta.env.VITE_APP_NAME + "_auth";
    localStorage.setItem(name, '1');
    location.href = '/';
  } catch (e) {
    console.error(e);
  }
}
</script>

<template>
  <div class="container mx-auto my-2 px-8 bg-white">
    <h1 class="text-4xl text-gray-700 font-bold my-2">Login !
    </h1>
    <hr class="my-2" />
    <label class="text-2xl font-bold my-2">Email:</label>
    <input type="text" id="email" name="email"
    class="input_text" /> 
    <label class="text-2xl font-bold my-2">Password:</label>
    <input type="text" id="password" name="password"
    class="input_text" /> 
    <hr class="my-2" />
    <button class="btn-purple" @click="loginProc">Login
    </button>
  </div>
</template>

<style scoped>
</style>
