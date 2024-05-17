<script setup lang="ts">
import Crud from './Zod/Crud';
import Validate from './Zod/Validate';
import DialogBox from '../components/DialogBox.vue'
import ErrorDialogBox from '../components/ErrorDialogBox.vue'
//
import { ref, reactive } from 'vue';
//
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
  //console.log(formErrors);
  if(formErrors.title){
    errors.title = formErrors.title;
  }
  if(formErrors.content){
    errors.content = formErrors.content;
  }
//console.log("errors.title=", errors.title);
console.log("len=", Object.keys(formErrors).length);
if (Object.keys(formErrors).length > 0) {
    const dlg = document.getElementById('errorModalDialog');
    if(dlg) {
      //@ts-ignore
      dlg.showModal();
    }
    return;
  }
  if (Object.keys(formErrors).length < 1) {
    const modalDialog = document.getElementById('modalDialog');
    if(modalDialog) {
      //@ts-ignore
      modalDialog.showModal();
    }
  }
}
</script>

<!-- template -->
<template>
  <div class="container mx-auto my-2 px-8 bg-white">
    <h1 class="text-4xl text-gray-700 font-bold my-2">Zod! </h1>
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
    <button @click="testProc" class="btn">Test</button>
    <!-- dialog -->
    <DialogBox message="OK, Check Complete!!" />
    <ErrorDialogBox message="NG, Check!" />
  </div>
</template>

<!-- style -->
<style scoped>
</style>

<!-- 
tit= {{errors.title}}
<span v-if="errorContent"><em class="error_message">{{errorContent}}</em>
</span>
-->