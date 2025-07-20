<template>
    <div class="form-wrapper">
        <form @submit.prevent="handleAddTask" class="form-main">
        <h2 class="title-form">Add Task</h2>
        <input v-model="title" type="text" placeholder="Title" required class="form-input"/>
        <input v-model="description" type="text" placeholder="Description" required class="form-input"/>
        <button type="submit" class="btn-submit" >Submit</button>

         
     <p v-if="message" :style="{ color: messageError ? 'red' : 'green' }">{{ message }}</p>

        </form>
      

    </div>
</template>


<script setup>
import { ref} from 'vue'
import { addTask } from '../api/tasks';
import { useRouter  , useRoute} from 'vue-router';


const title = ref('')
const description = ref('')
const message = ref('')
const messageError = ref(false)
const route = useRoute()
const router = useRouter()



async function handleAddTask() {
  try {
    await addTask(title.value , description.value, route.params.id)
    message.value = 'You have successfully created a task!'
    messageError.value = false
    router.push(`/project/${route.params.id}`)


  } catch (err) {

    messageError.value = true
 
    message.value = err.response?.data?.message || 'Network error';
  

  }
}
</script>