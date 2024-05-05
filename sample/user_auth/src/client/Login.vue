<script setup lang="ts">
import CrudIndex from './User/CrudIndex';
import Crud from './User/Crud';
import LibCrypto from './lib/LibCrypto'

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
//console.log("#loginProc.v=", v);
      const values = Crud.getInputValues();
      const resulte =  await CrudIndex.getItem(); 
console.log(values);
console.log(resulte);
      if(!resulte.password){
        console.error("error, password=nothing");
        alert("error. Login");
        return;
      }
      const decryptPassword = LibCrypto.decode(resulte.password);            
      //console.log(resulte.password);
      //console.log("decryptPassword=", decryptPassword);
      if(values.password && decryptPassword === values.password){
        alert("OK, password");
      }else{
        alert("error. Login password");
        return;
      }
      const name = import.meta.env.VITE_APP_NAME + "_auth";
      localStorage.setItem(name, values.email);
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
