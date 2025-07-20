<template>
  <div class="w-full flex flex-col sm:flex-row justify-between items-center px-4 sm:px-11 py-4 gap-4 sm:gap-0">
    <div>
      <img src="/logo.png" alt="Logo" width="100px" />
    </div>

    <div class="flex space-x-6 sm:space-x-9">
      <a href="/projects" class="text-white">Projects</a>
      <a href="/project/add" class="text-white">Add Project</a>
    </div>

    <div>
      <button class="btn-delete" @click="handleLogout">Log out</button>
    </div>
  </div>
</template>


<script setup>
import { logout } from '../api/auth';

const handleLogout = async () => {
  try {

    const response = await logout();
    console.log(response)

    if (response.status === 200) {
      console.log('Logout successful');
      window.location.href = '/login';
    } else {
      console.error('Logout failed:', response.data?.message || 'Unexpected error');
    }
  } catch (error) {
    console.error('Network or server error during logout:', error.message || error);
  }
};
</script>
