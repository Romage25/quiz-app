<script setup>
import Header from './components/layout/Header.vue'
</script>

<template> 
  <div class="flex flex-col h-screen">
    <Header />

    <div class="flex-1 flex flex-col overflow-hidden">
      <main class="flex-1 overflow-hidden">
        <router-view />
      </main>
    </div>

  </div>
</template>

<style scoped>

</style>
