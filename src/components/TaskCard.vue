<template>
  <div
    class="bg-[var(--color-war-gray)] w-full rounded-2xl p-5 shadow-md hover:shadow-xl transition duration-300 flex flex-col gap-4 relative"
  >
    <!-- Settings Button -->


    <div class="absolute top-3 right-3">
  <button          v-if="task?.canModify" class="rounded-full text-xs font-semibold capitalize bg-red-600 text-white px-3 py-1" @click="handleDelete" >Delete</button>
 
      <button
        v-if="task?.canModify"
        @click="showMenu = !showMenu"
        class="text-gray-400 hover:text-white transition cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5" fill="none"
          viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" 
            d="M12 6v.01M12 12v.01M12 18v.01" />
        </svg>
      </button>

     
      <!-- Dropdown menu -->
      <div
        v-if="showMenu"
        class="absolute right-0 mt-2 w-40 bg-gray-800 text-white rounded shadow-lg z-10"
      >
        <button
          v-for="option in stateOptions"
          :key="option"
          @click="changeState(option)"
          class="block w-full text-left px-4 py-2 hover:bg-gray-700"
        >
          {{ option }}
        </button>
      </div>
    </div>

    <!-- Title & Description -->
    <div class="space-y-1">
      <h3 class="text-xl font-bold text-white truncate">{{ task?.title }}</h3>
      <p class="text-sm text-gray-300 line-clamp-2">{{ task?.description }}</p>
    </div>

    <!-- State Badge -->
    <div class="flex items-center justify-between">
      <div
        :class="[ 
          'px-3 py-1 rounded-full text-xs font-semibold capitalize',
          task.state == 'to do' ? 'bg-green-600 text-white' :
          task.state == 'in progress' ? 'bg-yellow-500 text-black' :
          task.state == 'done' ? 'bg-red-600 text-white' :
          'bg-gray-500 text-white'
        ]"
      >
        {{ task.state.toString() }}
      </div>
      <div
        :class="[
          'h-2 w-1/3 rounded-full',
          task.state == 'to do' ? 'bg-green-400' :
          task.state == 'in progress' ? 'bg-yellow-400' :
          task.state == 'done' ? 'bg-red-400' :
          'bg-gray-400'
        ]"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { updateTask , deleteTask } from '../api/tasks' // assure-toi que ce fichier existe et contient la bonne fonction

 const props = defineProps({
  task: Object
})

const emit = defineEmits(['update-task'])
const showMenu = ref(false)

const stateOptions = ['to do', 'in progress', 'done']

const changeState = async (newState) => {
  showMenu.value = false

  try {

    const res = await updateTask(  newState  , props.task._id)
    if (res.status === 200 ) {
      emit('update-task')   
    } else {
      console.error('Server responded with status:', res.status)
    }
  } catch (err) {
    console.error('Failed to update task state:', err)
  }
}






async function handleDelete() {
  if (confirm("Delete this task?")) {
    try {
      await deleteTask(props.task._id)
      emit('update-task')   


    } catch (err) {
      console.error(err)
      alert("Error while deleting.")
    }
  }
}
</script>
