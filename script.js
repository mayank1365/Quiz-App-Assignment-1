const questions = [
    {
        question : "Which is the largest animal in the world?" ,
        answers : [
            {text: "Blue Whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false},
            {text: "Dinosaur", correct: false}
        ]
    },
    {
        question : "Which is the largest country in the world?" ,
        answers : [
            {text: "Canada", correct: false},
            {text: "Russia", correct: true},
            {text: "China", correct: false},
            {text: "USA", correct: false}
        ]
    },
    {
        question : "Who was the first Indian to win an Oscar?" ,
        answers : [
            
            {text: "A.R. Rahman", correct: false},
            {text: "Satyajit Ray", correct: false},
            {text: "Gulzar", correct: false},
            {text: "Bhanu Athaiya", correct: true}
        ]
    },
    {
        question : "Which is the largest planet in our solar system?" ,
        answers : [
            {text: "Jupiter", correct: true},
            {text: "Saturn", correct: false},
            {text: "Neptune", correct: false},
            {text: "Earth", correct: false}
        ]
    },
    {
        question : "Which is the largest ocean in the world?" ,
        answers : [
            {text: "Pacific Ocean", correct: true},
            {text: "Atlantic Ocean", correct: false},
            {text: "Indian Ocean", correct: false},
            {text: "Arctic Ocean", correct: false}
        ]
    },
    {
        question : "Which is the largest desert in the world?" ,
        answers : [
            {text: "Antarctica", correct: true},
            {text: "Sahara", correct: false},
            {text: "Arabian Desert", correct: false},
            {text: "Gobi Desert", correct: false}
        ]
    },
    {
        question : "Who is the founder of Microsoft?" ,
        answers : [
            {text: "Bill Gates", correct: true},
            {text: "Steve Jobs", correct: false},
            {text: "Mark Zuckerberg", correct: false},
            {text: "Elon Musk", correct: false}
        ]
    },
    {
        question : "Which is the Tallest mountain in the world?" ,
        answers : [
            {text: "Mount Abu", correct: false},
            {text: "Mount Everest", correct: true},
            {text: "Mount Fuji", correct: false},
            {text: "Kangchenjunga", correct: false}
        ]
    },
    {
        question : "Who was the first president of the United States?" ,
        answers : [
            {text: "George Washington", correct: true},
            {text: "Thomas Jefferson", correct: false},
            {text: "Abraham Lincoln", correct: false},
            {text: "John Adams", correct: false}
        ]
    },
    {
        question : "Who was the first Indian Astronaut?" ,
        answers : [
            {text: "Rakesh Sharma", correct: true},
            {text: "Kalpana Chawla", correct: false},
            {text: "Sunita Williams", correct: false},
            {text: "Yuri Gagarin", correct: false}
        ]
    }
];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    shuffleQuestions();
    showQuestion();
}

function shuffleQuestions(){
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", (e) => selectAnswer(e));
    });
}

function resetState(){
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score += 10;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    setTimeout(handleNextQuestion, 1000);
}   

function handleNextQuestion(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else{
        showScore();
    }
}

function restartQuiz() {
    startQuiz();
    document.getElementById("restart-btn").style.display = "none";
    document.getElementById("home-btn").style.display = "none";
}

function goToHomePage() {
    window.location.href = "index.html";
}

function showScore(){
    resetState();
    questionElement.innerHTML = "You Scored " + score + " points out of " + "100 points!";
    document.getElementById("restart-btn").style.display = "block";
    document.getElementById("home-btn").style.display = "block";
}

const restartButton = document.getElementById("restart-btn");
const homeButton = document.getElementById("home-btn");

restartButton.addEventListener("click", restartQuiz);
homeButton.addEventListener("click", goToHomePage);


startQuiz();

