<template>
    <div class="form-wrapper">
        <form @submit.prevent = "handleCreateProject" class="form-main">
             <h2 class="title-form">Create Project</h2>
        <input v-model="title" type="text" placeholder="Title" required class="form-input"/>
        <input v-model="description" type="text" placeholder="Description" required class="form-input"/>
        <button type="submit" class="btn-submit">Submit</button>

         
     <p v-if="message" :style="{ color: messageError ? 'red' : 'green' }">{{ message }}</p>

        </form>
      

    </div>
</template>


<script setup>
import { ref} from 'vue'
import { createProject } from '../api/project';
import { useRouter } from 'vue-router';


const title = ref('')
const description = ref('')
const message = ref('')
const messageError = ref(false)


async function handleCreateProject() {
  message.value = ''
  try {
    await createProject(title.value , description.value)
    message.value = 'You have successfully created a project!'
    title.value  =""
    description.value =""
    messageError.value = false
   
  } catch (err) {
    messageError.value = true
   const errors = err.response?.data?.errors;

  if (errors && errors.length > 0) {
    message.value = errors[0].msg; 
  } else {
    message.value = err.response?.data?.message || 'Network error';
  }

  }
}
</script>