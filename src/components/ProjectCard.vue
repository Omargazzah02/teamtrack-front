<template>
  <div class=' bg-[var(--color-war-gray-dark)] w-60  rounded-2xl p-9 space-y-2 flex flex-col  items-center'  >
    <h3 class='normal-title'> {{ project.title }}</h3>
    <p class='text-[var(--color-war-gray-light)]'>{{ project.description }}</p>
    <button type="submit" @click="$router.push(`/project/${project._id}`)" class="btn-submit">See more</button>
  </div>
</template>

<script setup>
defineProps({ project: Object })
</script>

