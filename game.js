const quizData = [
    {
        image: "apple.jpg",
        correctAnswer: "Apple",
        options: ["Banana", "Apple", "Grape", "Orange"]
    },
    {
        image: "dog.jpg",
        correctAnswer: "Dog",
        options: ["Cat", "Mouse", "Dog", "Bird"]
    },
    {
        image: "car.jpg",
        correctAnswer: "Car",
        options: ["Bus", "Train", "Car", "Bike"]
    },
    {
        image: "book.jpg",
        correctAnswer: "Book",
        options: ["Pencil", "Book", "Pen", "Table"]
    }
];

let currentQuestionIndex = 0;
let score = 0;
let answered = false;

const questionImage = document.getElementById('question-image');
const answersContainer = document.getElementById('answers-container');
const feedbackElement = document.getElementById('feedback');
const nextButton = document.getElementById('next-button');
const scoreElement = document.getElementById('score');
const quizArea = document.getElementById('quiz-area');

function loadQuestion() {
    answered = false;
    const currentQuiz = quizData[currentQuestionIndex];
    
    questionImage.src = currentQuiz.image;
    answersContainer.innerHTML = '';
    feedbackElement.textContent = '';
    nextButton.style.display = 'none';

    // Создание кнопок ответов
    currentQuiz.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('answer-button');
        button.addEventListener('click', () => checkAnswer(option, button));
        answersContainer.appendChild(button);
    });
}

function checkAnswer(selectedOption, button) {
    if (answered) return;
    answered = true;

    const currentQuiz = quizData[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuiz.correctAnswer;

    // Стилизация кнопок
    const buttons = answersContainer.querySelectorAll('.answer-button');
    buttons.forEach(btn => {
        btn.disabled = true; // Отключаем все кнопки после ответа
        if (btn.textContent === currentQuiz.correctAnswer) {
            btn.classList.add('correct');
        } else if (btn === button) {
            btn.classList.add('incorrect');
        }
    });

    // Обновление счета и обратной связи
    if (isCorrect) {
        score++;
        feedbackElement.textContent = 'Правильно! 🎉';
        scoreElement.textContent = score;
    } else {
        feedbackElement.textContent = `Неправильно. Правильный ответ: ${currentQuiz.correctAnswer}.`;
    }

    nextButton.style.display = 'block';
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    quizArea.innerHTML = `
        <h2>Игра окончена!</h2>
        <p>Ваш финальный счет: ${score} из ${quizData.length}!</p>
        <button onclick="window.location.reload()" class="cta-button">Начать заново</button>
    `;
    scoreElement.textContent = score;
}

// Запуск игры
nextButton.addEventListener('click', nextQuestion);
window.onload = loadQuestion;
