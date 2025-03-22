<script setup>
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const score = Number(route.query.score) || 0;
const totalQuestions = Number(route.query.total) || 1;
const averageScore = ((score / totalQuestions) * 100).toFixed(2);

// Restart Quiz
const restartQuiz = () => {
    router.push('/');
};
</script>

<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-500 to-blue-600 p-4">
        <div class="bg-white p-6 rounded-2xl shadow-lg text-center max-w-md w-full">
            <h2 class="text-2xl font-bold text-blue-600">Quiz Completed! 🎉</h2>
            <p class="text-lg mt-2">Your Score: <span class="font-bold text-green-600">{{ score }} / {{ totalQuestions }}</span></p>
            <p class="text-lg mt-2">Your Average Score: <span class="font-bold text-blue-600">{{ averageScore }}%</span></p>

            <button 
                @click="restartQuiz"
                class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
                Play Again
            </button>
        </div>
    </div>
</template>
