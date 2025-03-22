<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
    question: Object,
    onNext: Function,
    isLastQuestion: Boolean
});

const selectedAnswer = ref(null);
const isAnswered = ref(false);
const correctAnswer = computed(() => props.question.correct_answer);

const shuffledAnswers = ref([]);

const shuffleAnswers = () => {
    shuffledAnswers.value = [...props.question.incorrect_answers, correctAnswer.value].sort(() => Math.random() - 0.5);
};

watch(() => props.question, () => {
    selectedAnswer.value = null;
    isAnswered.value = false;
    shuffleAnswers();
}, { immediate: true });

const checkAnswer = (answer) => {
    if (isAnswered.value) return;
    selectedAnswer.value = answer;
    isAnswered.value = true;
};
</script>

<template>
    <div class="p-5 border rounded-lg shadow-lg bg-white/90 max-w-xl mx-auto">
        <h2 class="text-lg font-bold mb-4 text-gray-800 text-center" v-html="question.question"></h2>

        <ul class="space-y-3">
            <li 
                v-for="(answer, index) in shuffledAnswers"
                :key="index"
                @click="checkAnswer(answer)"
                class="px-4 py-3 border rounded-lg cursor-pointer transition-all text-center font-medium text-lg"
                :class="{
                    'bg-green-500 text-white border-green-600': isAnswered && answer === correctAnswer, 
                    'bg-red-500 text-white border-red-600': isAnswered && answer === selectedAnswer && selectedAnswer !== correctAnswer,
                    'bg-blue-100 text-blue-900 border-blue-400 hover:bg-blue-200': !isAnswered
                }"
                v-html="answer"
            ></li>
        </ul>

        <p v-if="isAnswered" class="mt-4 font-bold text-lg text-center" 
           :class="selectedAnswer === correctAnswer ? 'text-green-600' : 'text-red-600'">
            {{ selectedAnswer === correctAnswer ? '✅ Correct! 🎉' : `❌ Incorrect! The correct answer is: ${correctAnswer}` }}
        </p>

        <button 
            v-if="isAnswered"
            @click="() => props.onNext(selectedAnswer === correctAnswer)"
            class="mt-5 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-purple-600 hover:to-blue-500 transition-all w-full text-lg font-semibold shadow-md"
        >
            {{ isLastQuestion ? '🎯 Show Scores' : '➡️ Next Question' }}
        </button>
    </div>
</template>

<style scoped>
/* Smooth animations */
li {
    transition: background 0.3s, transform 0.2s;
}

li:hover {
    transform: scale(1.05);
}
</style>
