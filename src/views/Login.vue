<template>
    <div class="form-wrapper">
        <form @submit.prevent = "handleLogin" class="form-main">
             <h2 class="title-form">Login</h2>
        <input v-model="email" type="email" placeholder="Email" required class="form-input"/>
        <input v-model="password" type="password" placeholder="Password" required class="form-input"/>
        <button type="submit" class="btn-submit">Login</button>

          <p @click="$router.push('/register')" class="input-url">
            No account yet? Sign up!
        </p>
     <p v-if="message" :style="{ color: messageError ? 'red' : 'green' }">{{ message }}</p>

        </form>
      

    </div>
</template>


<script setup>
import { ref} from 'vue'
import { login } from '../api/auth';
import { useRouter } from 'vue-router';


const email = ref('')
const password = ref('')
const message = ref('')
const messageError = ref(false)
const router = useRouter()


async function handleLogin() {
  message.value = ''
  try {
    await login(email.value, password.value)
    message.value = 'You have logged in successfully!'
    messageError.value = false
    router.push('/projects')
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