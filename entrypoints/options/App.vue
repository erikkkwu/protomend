<script setup lang="ts">
import ProfileEditor from '@/components/ProfileEditor.vue';
import '@/assets/tailwind.css';
</script>

<template>
  <ProfileEditor fullscreen />
</template>

<style>
html,
body {
  margin: 0;
  min-height: 100vh;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
body::-webkit-scrollbar {
  display: none;
}
</style>
