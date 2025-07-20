<template>
  <div class="form-wrapper gap-10 p-4 sm:p-6 lg:p-10 max-w-5xl mx-auto">
    <h1 class="title-form text-2xl sm:text-3xl font-bold mb-6">Collaborators</h1>

    <!-- ADD COLLABORATOR SECTION -->
    <div class="add-collaborator-form flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-2 mb-8">
      <select
        v-model="selectedUserId"
        class="w-full sm:w-60 border-2 border-white h-12 px-3 rounded-md text-black"
      >
        <option disabled value="">Select a user</option>
        <option v-for="user in allUsers" :key="user._id" :value="user._id">
          {{ user.name }}
        </option>
      </select>
      <button @click="addCollaboratorToProject" class="btn-submit whitespace-nowrap">
        Add Collaborator
      </button>
    </div>

    <!-- COLLABORATORS LIST -->
    <div class="list-main grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <UserCard
        v-for="u in users"
        :key="u._id"
        :user="u"
        :project-id="route.params.id"
        @update-users="refreshUsers"
      />
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { getCollaborators, getUsers, addCollaborator } from '../api/project'
import UserCard from '../components/UserCard.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const users = ref([])
const allUsers = ref([])
const selectedUserId = ref('')

async function refreshUsers() {
  users.value = await getCollaborators(route.params.id)
}

async function loadAllUsers() {
  allUsers.value = await getUsers()
  console.log(allUsers.value)
}

async function addCollaboratorToProject() {
  if (!selectedUserId.value) {
    alert('Please select a user.')
    return
  }

  try {
    const response = await addCollaborator(selectedUserId.value, route.params.id)
    alert(response.message || 'Collaborator added successfully.')
    selectedUserId.value = ''
    await refreshUsers()
  } catch (err) {
    alert(err.response.data.message)
  }
}

 
onMounted(async () => {
  await refreshUsers()
  await loadAllUsers()
})
</script>

