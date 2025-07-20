<template>
  <div>
    <Nav></Nav>
    <main>
      <slot ></slot>
    </main>
  </div>
</template>

<script>
import Nav from '../Nav.vue';

export default {
  name: "DashboardLayout",
  components: { Nav }
};
</script>

<style scoped>
main {
  padding: 20px;
}
</style>
