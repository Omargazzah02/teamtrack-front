<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import DefaultLayout from './components/layouts/DefaultLayout.vue'
import DashbordLayout from './components/layouts/DashbordLayout.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    const layout = computed(() => {
      if (route.meta.layout === 'dashboard') return DashbordLayout
      return DefaultLayout
    })
    return { layout }
  }
}
</script>
