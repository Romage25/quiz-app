<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import SplashScreen from '../components/SplashScreen.vue';

const route = useRoute();
const categories = ref([]);
const selectedCategory = ref(route.query.category || '');
const selectedNumber = ref(route.query.amount || '');
const selectedDifficulty = ref(route.query.difficulty || '');
const selectedType = ref(route.query.type || '');
const loading = ref(true);
const error = ref(null);

const showSplash = ref(true);

// Fetch categories from OpenTDB API
const fetchCategories = async () => {
    try {
        const response = await axios.get('https://opentdb.com/api_category.php');
        categories.value = response.data.trivia_categories;
    } catch (err) {
        error.value = "Failed to load categories. Please try again.";
    } finally {
        loading.value = false;
    }
};

// Get category name dynamically
const categoryName = computed(() => {
    const category = categories.value.find(cat => cat.id == selectedCategory.value);
    return category ? category.name : "Any";
});

// Format difficulty
const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

// Format question type
const formatQuestionType = (type) => {
    if (type === "") return "Any";
    if (type === "multiple") return "Multiple Choice";
    if (type === "boolean") return "True / False";
    return "Unknown";
};

// Fetch categories on component mount
onMounted(() => {
    fetchCategories();
    
    // Hide splash screen after 3 seconds
    setTimeout(() => {
        showSplash.value = false;
    }, 1000);
});
</script>

<template>
    <SplashScreen v-if="showSplash" />
    
    <div v-else class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4">
        <div class="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl text-center max-w-md w-full border border-white/40">
            <h1 class="text-3xl font-extrabold text-gray-800 mb-4">🎯 Quiz Preview</h1>
            <p class="text-gray-700 text-lg mb-6">
                Get ready! Here's a summary of your quiz settings:
            </p>

            <!-- Loading and Error States -->
            <div v-if="loading" class="text-gray-600 text-lg font-medium">⏳ Loading type of quiz...</div>
            <div v-if="error" class="text-red-500 text-lg font-medium">⚠️ {{ error }}</div>

            <!-- Quiz Settings Overview -->
            <div v-if="!loading" class="text-left w-full border p-5 rounded-lg shadow-md bg-gray-100/80">
                <p class="text-lg flex items-center"><strong>📚 Category:</strong> <span class="ml-2">{{ categoryName }}</span></p>
                <p class="text-lg flex items-center"><strong>📈 Difficulty:</strong> <span class="ml-2">{{ capitalizeFirstLetter(selectedDifficulty) || 'Any' }}</span></p>
                <p class="text-lg flex items-center"><strong>❓ Number of Questions:</strong> <span class="ml-2">{{ selectedNumber }}</span></p>
                <p class="text-lg flex items-center"><strong>🔠 Question Type:</strong> <span class="ml-2">{{ formatQuestionType(selectedType) }}</span></p>
            </div>

            <p class="mt-6 text-gray-700 italic text-lg">
                "Believe in yourself! Good luck, and have fun answering the quiz! 🚀"
            </p>

            <!-- Navigation Buttons -->
            <div class="mt-6 flex justify-between w-full">
                <router-link 
                    :to="`/type-of-question?category=${selectedCategory}`" 
                    class="px-6 py-3 bg-gray-500 text-white rounded-full shadow-md hover:bg-gray-600 transition-all"
                >
                    Back
                </router-link>

                <router-link 
                    :to="`/quiz?category=${selectedCategory}&amount=${selectedNumber}&difficulty=${selectedDifficulty}&type=${selectedType}`"
                    class="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-md hover:from-purple-600 hover:to-blue-500 transition-all font-semibold"
                >
                    🚀 Start Quiz
                </router-link>
            </div>
        </div>
    </div>
</template>
