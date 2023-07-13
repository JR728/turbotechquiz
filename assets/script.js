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
var scoreboardSection = document.getElementById("scoreboard-section");
var questionTitle = document.querySelector(".question-title");
var choicesList = document.querySelector(".choices-list");

// Variables
var questionIndex = 0;
var timeLeft = 60;
var timerInterval;
var highScores = [];

// Check if high scores exist in localStorage
if (localStorage.getItem("highScores")) {
    highScores = JSON.parse(localStorage.getItem("highScores"));
}  

// Event listener for the start quiz button
startQuizBtn.addEventListener("click", startQuiz);

// Function to start the quiz
function startQuiz() {
  startQuizSection.style.display = "none";
  scoreboardSection.style.display = "none";
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

    // Prompt for initials
    var initials = prompt("Enter your initials:");

    // Create a new high score object
    var newScore = {
        initials: initials,
        time: timeLeft
    };

    // Add the new score to the high scores array
    highScores.push(newScore);

    // Save high scores to localStorage
    localStorage.setItem("highScores", JSON.stringify(highScores));

    // Show the scoreboard
    showHighScores();
}
//viewing highscore
var highScoreButton = document.getElementById("high-score");
highScoreButton.addEventListener("click", showHighScores);

function showHighScores() {
    // Hide other sections and show the scoreboard section
    startQuizSection.style.display = "none";
    questionSection.style.display = "none";
    scoreboardSection.style.display = "block";

    // Clear the existing scoreboard
    var scoreboardList = document.getElementById("scoreboard-list");
    scoreboardList.innerHTML = "";

    // Sort the high scores array in descending order
    highScores.sort(function (a, b) {
        return b.time - a.time;
    });

    // Display each high score in the scoreboard list
    highScores.forEach(function (score) {
        var scoreItem = document.createElement("li");
        scoreItem.textContent = score.initials + " - " + score.time;
        scoreboardList.appendChild(scoreItem);
    });

    // Update the localStorage with the latest high scores
    localStorage.setItem("highScores", JSON.stringify(highScores));
}