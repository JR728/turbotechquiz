//questions
var questions = [
  {
    title: 'Commonly used data types DO NOT include:',
    choices: ['strings', 'booleans', 'alerts', 'numbers'],
    answer: 'alerts',
  },
  {
    title: 'The condition in an if / else statement is enclosed within ____.',
    choices: ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
    answer: 'parentheses',
  },
  {
    title: 'Arrays in JavaScript can be used to store ____.',
    choices: [
      'numbers and strings',
      'other arrays',
      'booleans',
      'all of the above',
    ],
    answer: 'all of the above',
  },
  {
    title:
      'String values must be enclosed within ____ when being assigned to variables.',
    choices: ['commas', 'curly brackets', 'quotes', 'parentheses'],
    answer: 'quotes',
  },
  {
    title:
      'A very useful tool used during development and debugging for printing content to the debugger is:',
    choices: ['JavaScript', 'terminal / bash', 'for loops', 'console.log'],
    answer: 'console.log',
  },
];
// Elements
var startQuizBtn = document.getElementById("start-quiz-btn");
var timerElement = document.querySelector(".score-time h1");
var startQuizSection = document.querySelector(".start-quiz");
var questionSection = document.querySelector(".question-section");
var questionTitle = document.querySelector(".question-title");
var choicesList = document.querySelector(".choices-list");

// Variables
var questionIndex = 0;
var timeLeft = 60;
var timerInterval;

// Event listener for the start quiz button
startQuizBtn.addEventListener("click", startQuiz);

// Function to start the quiz
function startQuiz() {
  startQuizSection.style.display = "none";
  questionSection.style.display = "block";

  // Start the timer
  startTimer();

  // Display the first question
  displayQuestion();
}

// Function to start the timer
function startTimer() {
  timerInterval = setInterval(function () {
    timeLeft--;
    timerElement.textContent = "Time: " + timeLeft;

    if (timeLeft <= 0) {
      endQuiz();
    }
  }, 1000);
}

// Function to display a question
function displayQuestion() {
    var question = questions[questionIndex];
  
    questionTitle.textContent = question.title;
    choicesList.innerHTML = "";
  
    question.choices.forEach(function (choice) {
      var choiceItem = document.createElement("li");
      var choiceButton = document.createElement("button");
  
      choiceButton.textContent = choice;
      choiceButton.setAttribute("data-answer", choice);
  
      choiceItem.appendChild(choiceButton);
      choicesList.appendChild(choiceItem);
    });
  }
  
  // Event listener for the choices list
  choicesList.addEventListener("click", function (event) {
    var selectedAnswer = event.target.getAttribute("data-answer");
  
    if (selectedAnswer === questions[questionIndex].answer) {
      // Correct answer
      questionIndex++;
  
      if (questionIndex < questions.length) {
        displayQuestion();
      } else {
        endQuiz();
      }
    } else {
      // Incorrect answer
      timeLeft -= 10;
  
      if (timeLeft <= 0) {
        endQuiz();
      } else {
        // Display feedback for incorrect answer
        var incorrectMsg = document.querySelector(".incorrect-msg");
        incorrectMsg.style.display = "block";
        setTimeout(function () {
        incorrectMsg.style.display = "none";
      }, 1000);
    }
  }
});
  
  // Function to end the quiz
  function endQuiz() {
    clearInterval(timerInterval);
    questionSection.style.display = "none";
    // Add your logic to save initials and score here
  }
  