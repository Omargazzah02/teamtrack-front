<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <h1 class="title text-2xl sm:text-3xl font-bold mb-6">Liste des projets</h1>
    <div class="flex flex-wrap -mx-2 space-x-2">
      <ProjectCard
        v-for="p in projects"
        :key="p.id"
        :project="p"
        class="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4 "
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getProjects } from '../api/project'
import ProjectCard from '../components/ProjectCard.vue'

const projects = ref([])

onMounted(async () => {
  projects.value = await getProjects()
})
</script>
