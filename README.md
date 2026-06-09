# 📊 Triviona App

A simple web application that fetches and displays trivia questions using the Open Trivia Database API.

---

## 🌐 Live Demo

https://triviona-app.vercel.app/

---

## 📌 Overview

Triviona App is a lightweight trivia web application that retrieves questions and answers from the **Open Trivia Database (OpenTDB)** API.

Users can view trivia questions through a clean and simple interface designed for fast interaction.

The project focuses on:
- Fast API-based data retrieval
- Simple UI/UX
- Clean and responsive design
- Easy deployment and scalability

---

## ✨ Features

- 🧠 Fetches trivia questions from OpenTDB API  
- 💬 Simple and interactive interface  
- ⚡ Fast response loading  
- 📱 Responsive design (desktop & mobile)  
- 🌐 Deployed on Vercel  

---

## 🛠️ Tech Stack

- Frontend: Vue
- Styling: CSS / Tailwind CSS
- API Integration: Open Trivia Database (https://opentdb.com/)  
- Hosting: Vercel  

---

## 🧩 Architecture

User → UI → OpenTDB API → Response → UI Display  

Flow:
1. User opens the application
2. User chooses category, difficulty, no. of questions, and question type
3. App sends a request to OpenTDB API base on user's chosen options
4. API returns trivia questions and answers  
5. Response is displayed in the UI  

---

## ⚠️ Limitations

- The application relies on the **Open Trivia Database API**, which may have:
  - Rate limits depending on usage
  - Occasional downtime or latency
  - Fixed question structure controlled by the API
- No offline support
- No user authentication or saved progress
- No custom question generation (API-based only)

---

## 🚀 Running Locally

Clone the repository:

git clone https://github.com/your-username/triviona-app.git
cd triviona-app

Install dependencies:

npm install

Start development server:

npm run dev

Open in browser:

http://localhost:3000

---

## 🚀 Deployment

Deploy easily using Vercel:

1. Push project to GitHub  
2. Import repository in Vercel  
3. Add environment variables (if needed)  
4. Deploy
5. 
---

## 👨‍💻 Author

Built by a developer exploring API integration and modern web development.
