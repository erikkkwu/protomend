<script setup lang="ts">
import '@/assets/tailwind.css';
import ProfileEditor from '@/components/ProfileEditor.vue';
</script>

<template>
  <ProfileEditor />
</template>

<style>
html,
body {
  width: 640px;
  height: 540px;
  margin: 0;
  overflow-x: hidden;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
body::-webkit-scrollbar {
  display: none;
}
</style>
