<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import SplashScreen from '../components/SplashScreen.vue';
import Questions from '../components/Questions.vue';

const route = useRoute();
const router = useRouter();

const selectedCategory = ref(route.query.category || ""); 
const selectedDifficulty = ref(route.query.difficulty || ""); 
const selectedType = ref(route.query.type || ""); 
const selectedAmount = ref(route.query.amount || ""); 

const loading = ref(true);
const error = ref(null);
const questions = ref([]);
const currentIndex = ref(0);
const score = ref(0);
const showSplash = ref(true);

const fetchQuestions = async () => {
    try {
        const params = new URLSearchParams();

        if (selectedCategory.value) params.append("category", selectedCategory.value);
        if (selectedDifficulty.value) params.append("difficulty", selectedDifficulty.value);
        if (selectedType.value) params.append("type", selectedType.value);
        if (selectedAmount.value) params.append("amount", selectedAmount.value);

        const url = `https://opentdb.com/api.php?${params.toString()}`;

        const response = await axios.get(url);
        questions.value = response.data.results;
    } catch (err) {
        error.value = "Failed to load question count. Please try again.";
    } finally {
        loading.value = false;
    }
}

const nextQuestion = (isCorrect) => {
    if (isCorrect) {
        score.value++; 
    }

    if (currentIndex.value < questions.value.length - 1) {
        currentIndex.value++;
    } else {
        router.push({ path: "/results", query: { score: score.value, total: questions.value.length } });
    }
};

onMounted(() => {
    fetchQuestions();
    
    setTimeout(() => {
        showSplash.value = false;
    }, 1000);
});
</script>

<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4">
        <div class="bg-white p-6 rounded-2xl shadow-lg text-center max-w-md w-full">
            <!-- Splash Screen -->
            <SplashScreen v-if="showSplash" />

            <!-- Error Message -->
            <p v-if="error" class="text-red-600">{{ error }}</p>

            <!-- Loading Indicator -->
            <p v-if="loading">Loading Questions...</p>

            <!-- Quiz Questions -->
            <Questions 
                v-if="questions.length > 0 && currentIndex < questions.length" 
                :question="questions[currentIndex]" 
                :isLastQuestion="currentIndex === questions.length - 1"
                :onNext="nextQuestion" 
            />
        </div>
    </div>
</template>