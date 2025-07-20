<template>
    <div class="form-wrapper">
        <form @submit.prevent = "handleRegister" class="form-main">
        <h2 class="title-form">Sign up</h2>
        <input v-model="name" type="text" placeholder="Username" required class="form-input"/>
        <input v-model="email" type="email" placeholder="Email" required class="form-input"/>
        <input v-model="password" type="password" placeholder="Password" required class="form-input"/>
        <button type="submit"  class="btn-submit">Sign up</button>

        <p @click="$router.push('/login')" class="input-url">
           Already have an account? Log in !
        </p>
     <p v-if="message" :style="{ color: messageError ? 'red' : 'green' }">{{ message }}</p>

        </form>
        
    </div>
</template>


<script setup>
import { ref} from 'vue'
import { register } from '../api/auth';
import { useRouter } from 'vue-router';


const email = ref('')
const password = ref('')
const name = ref('')
const message = ref('')
const messageError = ref(false)
const router = useRouter()


async function handleRegister() {
  message.value = ''
  try {

    await register(  email.value, password.value, name.value)
    message.value = 'You have signed up successfully!'
    messageError.value = false
    router.push('/login')
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