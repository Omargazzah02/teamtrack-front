<template>
  <div
    class="bg-[var(--color-war-gray)] w-full rounded-2xl p-5 flex justify-between ">







   <span class="text-white "> {{ user?.name }}</span>

   



  <button class="rounded-full  font-semibold capitalize bg-red-600 text-white px-3 py-1" @click="handleDelete" >Delete</button>




  </div>
</template>



<script setup>
import { deleteCollaborator } from '../api/project';

 const props = defineProps({
  user: Object,
  projectId : Number
})



     const emit = defineEmits(['update-users'])


async function handleDelete() {
  if (confirm("Delete this user?")) {
    try {
      
      await deleteCollaborator(props.user._id , props.projectId)

           emit('update-users')   

  


    } catch (err) {
      console.error(err)
      alert("Error while deleting.")
    }
  }
}





</script>