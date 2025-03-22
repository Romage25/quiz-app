<template>
    <div class="h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-8">
        <div class="max-w-2xl text-center bg-white p-10 rounded-2xl shadow-lg">
            <h1 class="text-3xl font-bold text-gray-800 mb-4">
                Welcome to our Trivio App!
            </h1>
            <p class="text-lg text-gray-600 mb-6">
                Test your knowledge with fun and exciting trivia questions across various categories. Whether you're a trivia master or just looking for a challenge, we've got something for you!
            </p>
            <router-link 
                to="/category"
                class="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-full shadow-md hover:bg-blue-700 transition"
            >
                Get Started
            </router-link>
        </div>
    </div>
</template>
