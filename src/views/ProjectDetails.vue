<template>
  <div class="w-full px-4 sm:px-6 lg:px-8">
    <div class="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center p-6">
      <div v-if="project">
        <h2 class="title text-2xl sm:text-3xl font-bold">{{ project?.title }}</h2>
        <p>{{ project.description }}</p>
      </div>

      <div class="mt-4 sm:mt-0 flex flex-wrap gap-2">
        <button class="btn-submit" @click="$router.push(`/task/${project._id}/add`)">Add Task</button>
        <button v-if="project?.canModify" class="btn-edit" @click="editProject">Edit</button>
        <button v-if="project?.canDelete" class="btn-delete" @click="handleDelete">Delete</button>
        <button
          v-if="project?.canModifyCollaborators"
          class="btn-submit"
          @click="$router.push(`/collaborators/${project._id}`)"
        >
          Collaborators
        </button>
      </div>
    </div>

    <hr class="gray-line" />

    <div class="w-full p-4 sm:p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-9">
      <div class="bg-[var(--color-war-gray-dark)] p-4 rounded-2xl">
        <h3 class="gray-title mb-4">To Do</h3>
        <div class="space-y-4">
          <TaskCard
            v-for="task in tasksTodo"
            :key="task._id"
            :task="task"
            @update-task="refreshTasks"
          />
        </div>
      </div>

      <div class="bg-[var(--color-war-gray-dark)] p-4 rounded-2xl">
        <h3 class="gray-title mb-4">In Progress</h3>
        <div class="space-y-4">
          <TaskCard
            v-for="task in tasksInProgress"
            :key="task._id"
            :task="task"
            @update-task="refreshTasks"
          />
        </div>
      </div>

      <div class="bg-[var(--color-war-gray-dark)] p-4 rounded-2xl">
        <h3 class="gray-title mb-4">Done</h3>
        <div class="space-y-4">
          <TaskCard
            v-for="task in tasksDone"
            :key="task._id"
            :task="task"
            @update-task="refreshTasks"
          />
        </div>
      </div>
    </div>
  </div>
</template>





<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getProjectById , deleteProject } from '../api/project'
import { getTasksByProjectId } from '../api/tasks'
import TaskCard from '../components/TaskCard.vue'
const route = useRoute()
const router = useRouter()
const project = ref(null)


const tasksTodo = ref([])
const tasksInProgress = ref([])
const tasksDone = ref([])





onMounted(async () => {
  try {
   await getProject()
   await refreshTasks()




  



  } catch (err) {
    console.error(err)
  }
})



async function getProject () {
  const myproject =  await getProjectById(route.params.id) ; 
  project.value = myproject.data
}
async function  refreshTasks  ()  {
 
  const resTasks = await getTasksByProjectId(route.params.id)
  const allTasks = resTasks.data

  tasksTodo.value = allTasks.filter(t => t.state == "to do")
  tasksInProgress.value = allTasks.filter(t => t.state == "in progress")
  tasksDone.value = allTasks.filter(t => t.state == "done")

}
function editProject() {
  router.push(`/projects/${route.params.id}/edit`)
}




async function handleDelete() {
  if (confirm("Delete this project?")) {
    try {
      await deleteProject(route.params.id)
      alert("Project successfully deleted.")
      router.push('/projects')
    } catch (err) {
      console.error(err)
      alert("Error while deleting.")
    }
  }
}



</script>
