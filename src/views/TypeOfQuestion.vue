<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import SplashScreen from '../components/SplashScreen.vue';

const route = useRoute();
const selectedCategory = ref(route.query.category || "");
const loading = ref(true);
const error = ref(null);
const availableQuestions = ref([]);
const selectedNumber = ref(10);
const selectedDifficulty = ref("");
const selectedType = ref("");

const showSplash = ref(true);

const difficulties = ref([
    { value: "", label: "Any" },
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Medium" },
    { value: "hard", label: "Hard" }
]);

const questionTypes = ref([
    { value: "", label: "Any" },
    { value: "multiple", label: "Multiple Choice" },
    { value: "boolean", label: "True / False" }
]);

const fetchQuestionCount = async () => {
    if (!selectedCategory.value) return;
    try {
        const response = await axios.get(`https://opentdb.com/api_count.php?category=${selectedCategory.value}`);
        const totalQuestionsAvailable = response.data.category_question_count.total_question_count;
        const totalQuestions = totalQuestionsAvailable > 30 ? 30 : totalQuestionsAvailable;
        
        // Set available question numbers based on API response
        availableQuestions.value = Array.from({ length: totalQuestions / 5 }, (_, i) => (i + 1) * 5);
        selectedNumber.value = Math.min(10, totalQuestions); // Default to 10 if available
    } catch (err) {
        error.value = "Failed to load question count. Please try again.";
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    if (selectedCategory.value) {
        fetchQuestionCount();
    } else {
        const defaultMaximumQuestionAmount = 20
        availableQuestions.value = Array.from({ length: defaultMaximumQuestionAmount / 5 }, (_, i) => (i + 1) * 5);
        loading.value = false;
    }
    
    // Hide splash screen after 3 seconds
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
            <h1 class="text-2xl font-bold text-gray-800 mb-3">Customize Your Quiz</h1>

            <div v-if="loading" class="text-gray-600 text-lg font-medium">Loading question count...</div>
            <div v-if="error" class="text-red-500 text-lg font-medium">{{ error }}</div>

            <div v-if="!loading">
                <!-- Difficulty Dropdown -->
                <div class="w-full text-left mb-4">
                    <label class="text-gray-700 font-semibold">Difficulty</label>
                    <select v-model="selectedDifficulty" class="block w-full px-4 py-2 mt-1 border rounded-lg shadow-sm">
                        <option v-for="difficulty in difficulties" :key="difficulty.value" :value="difficulty.value">
                            {{ difficulty.label }}
                        </option>
                    </select>
                </div>

                <!-- Number of Questions Dropdown -->
                <div class="w-full text-left mb-4">
                    <label class="text-gray-700 font-semibold">Number of Questions</label>
                    <select v-model="selectedNumber" class="block w-full px-4 py-2 mt-1 border rounded-lg shadow-sm">
                        <option v-for="num in availableQuestions" :key="num" :value="num">
                            {{ num }}
                        </option>
                    </select>
                </div>

                <!-- Question Type Dropdown -->
                <div class="w-full text-left mb-4">
                    <label class="text-gray-700 font-semibold">Question Type</label>
                    <select v-model="selectedType" class="block w-full px-4 py-2 mt-1 border rounded-lg shadow-sm">
                        <option v-for="type in questionTypes" :key="type.value" :value="type.value">
                            {{ type.label }}
                        </option>
                    </select>
                </div>

                <!-- Navigation Buttons -->
                <div class="mt-6 flex justify-between w-full">
                    <router-link to="/category" class="px-5 py-2 bg-gray-500 text-white rounded-full shadow-md hover:bg-gray-600 transition">
                        Back
                    </router-link>

                    <router-link 
                        :to="`/start?category=${selectedCategory}&amount=${selectedNumber}&difficulty=${selectedDifficulty}&type=${selectedType}`"
                        class="px-5 py-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition"
                    >
                        Next
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>