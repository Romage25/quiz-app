<template>
    <!-- Splash Screen -->
    <div v-if="showSplash" class="splash-screen">
        <div class="content">
            <div class="icon-wrapper">
                <img src="../assets/vue.svg" alt="App Logo" class="logo" />
            </div>
            <h1 class="app-name">Triviona App</h1>
            <p class="tagline">Test your knowledge and have fun!</p>
            <div class="loading-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const showSplash = ref(true);

onMounted(() => {
    setTimeout(() => {
        showSplash.value = false;
    }, 2000);
});
</script>

<style scoped>
/* Splash Screen Styling */
.splash-screen {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1e3a8a, #9333ea);
  color: white;
  text-align: center;
}

/* Logo Styling */
.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  padding: 25px;
  width: 140px;
  height: 140px;
  margin: 0 auto 20px;
  box-shadow: 0px 0px 15px rgba(255, 255, 255, 0.3);
}

.logo {
  width: 100px;
  height: 100px;
}

/* App Name and Tagline */
.app-name {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 5px;
}

.tagline {
  font-size: 1.2rem;
  opacity: 0.8;
}

/* Loading Dots Animation */
.loading-dots {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.loading-dots span {
  width: 14px;
  height: 14px;
  margin: 0 6px;
  background-color: white;
  border-radius: 50%;
  animation: blink 2s infinite;
}

.loading-dots span:nth-child(2) {
  animation-delay: 0.3s;
}

.loading-dots span:nth-child(3) {
  animation-delay: 0.6s;
}

@keyframes blink {
  0%, 100% {
    opacity: 0.2;
  }
  50% {
    opacity: 1;
  }
}
</style>