import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Category from '../views/Category.vue';
import TypeOfQuestions from '../views/TypeOfQuestion.vue';
import Start from '../views/Start.vue';
import Quiz from '../views/Quiz.vue';
import Results from '../views/Results.vue';

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/category",
        name: "Category",
        component: Category
    },
    {
        path: "/type-of-question",
        name: "Type of Question",
        component: TypeOfQuestions
    },
    {
        path: "/start",
        name: "Start",
        component: Start
    },
    {
        path: "/quiz",
        name: "Quiz",
        component: Quiz
    },
    {
        path: "/results",
        name: "Results",
        component: Results
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;