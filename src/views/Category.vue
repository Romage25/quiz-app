<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import SplashScreen from '../components/SplashScreen.vue';

const categories = ref([]);
const selectedCategory = ref(0);
const loading = ref(true);
const error = ref(null);

const showSplash = ref(true);

const fetchCategories = async () => {
    try {
        const response = await axios.get('https://opentdb.com/api_category.php');
        categories.value = [{ id: 1, name: "Any" } , ...response.data.trivia_categories];
        selectedCategory.value = categories.value[0]?.id || 1;
    } catch (err) {
        error.value = "Failed to load categories. Please try again.";
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchCategories();
    
    setTimeout(() => {
        showSplash.value = false;
    }, 1000);
});

</script>

<template>
    <!-- Splash Screen -->
    <SplashScreen v-if="showSplash" />

    <div v-else class="flex flex-col items-center justify-center h-full bg-gradient-to-br from-blue-500 to-purple-600 p-4">
        <div class="bg-white p-6 rounded-2xl shadow-lg text-center max-w-md w-full">
            <h1 class="text-2xl font-bold text-gray-800 mb-3">Select a Category</h1>

            <div v-if="error" class="text-red-500 text-lg font-medium">{{ error }}</div>

            <div v-if="loading" class="text-gray-600 text-lg font-medium">Loading categories...</div>
            <div v-else class="w-full text-left mb-4">
                <label class="text-gray-700 font-semibold">Category</label>
                <select v-model="selectedCategory" class="block w-full px-4 py-2 mt-1 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400">
                    <option v-for="category in categories" :key="category.id" :value="category.id">
                        {{ category.name }}
                    </option>
                </select>
            </div>

            <div class="mt-6 flex justify-between w-full">
                <router-link to="/" class="px-5 py-2 bg-gray-500 text-white rounded-full shadow-md hover:bg-gray-600 transition">
                    Back
                </router-link>

                <router-link 
                    :to="selectedCategory === 1 ? '/type-of-question' : `/type-of-question?category=${selectedCategory}`"
                    class="px-5 py-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition"
                >
                    Next
                </router-link>
            </div>
        </div>
    </div>
</template>
