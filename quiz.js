// Storing quiz questions and answers in arrays
var question1 = ["Which variable type can be used to store words and sentences?", "Integer", "String", "Boolean", "2"];
var question2 = ["Which variable type can be used to store whole numbers?", "Integer", "String", "Boolean", "1"];
var question3 = ["Which variable type can be used to store true or false data?", "Integer", "String", "Boolean", "3"];
var question4 = ["Which delcaration will make a variable globally scoped or function scoped?", "var", "let", "const", "1"];
var question5 = ["Which declaration will make a variable block scoped and unable to be updated?", "var", "let", "const", "3"];
var question6 = ["Which declaration will make a variable block scoped and able to be updated?", "var", "let", "const", "2"];
var quiz = [question1, question2, question3, question4, question5, question6];

// Getting HTML Elements and storing them as variables and initializing other useful variables
var scoreButton = document.getElementById("high-score-button");
var timer = document.getElementById("timer");
var timerInt;
var second;
var instructions = document.getElementById("instructions");
var startButton = document.getElementById("start-button");
var questions = document.getElementById("questions");
var question = document.getElementById("question");
var answer1 = document.getElementById("answer-1");
var answer2 = document.getElementById("answer-2");
var answer3 = document.getElementById("answer-3");
var answers = [answer1, answer2, answer3];
var notification = document.getElementById("notification");
var correct;
var progress;
var fail = document.getElementById("fail");
var retryButton = document.getElementById("retry-button");
var success = document.getElementById("success");
var retrySuccess = document.getElementById("retry-button-success")
var scoreEntry = document.getElementById("score-entry");
var finalScore = document.getElementById("final-score");
var inputName = document.getElementById("input-name");
var submit = document.getElementById("submit");
var submitted = document.getElementById("submitted");

// Getting existing scores from local storage and creating a new array if one does not exist
var scores = JSON.parse(localStorage.getItem("scores"));
if (scores == null) {
    scores = [];
}

// Adding event listeners for buttons.
startButton.addEventListener("click", function() {
    instructions.style.display = "none";
    startQuiz();
});
retryButton.addEventListener("click", function() {
    fail.style.display = "none";
    startQuiz();
});
retrySuccess.addEventListener("click", function() {
    success.style.display = "none";
    scoreEntry.style.display = "none";
    submitted.style.display = "none";
    startQuiz();
});
submit.addEventListener("click", function() {
    enterScore(timerInt.toString(), inputName.value, scores.length);
});
answer1.addEventListener("click", function() {         
    nextQuestion(1);
});
answer2.addEventListener("click", function() {         
    nextQuestion(2);
});
answer3.addEventListener("click", function() {         
    nextQuestion(3);
});

function startQuiz() {
    // Hiding the score button, then showing the questions and timer
    scoreButton.style.visibility = "hidden";
    questions.style.display = "block";
    timer.style.display = "block";
    timer.textContent = "Seconds Remaining: 60";

    // Resetting timer, progress, and notification variables
    timerInt = 60;
    progress = 0;
    notification.textContent = "";

    // Shuffling the quiz array for a randomized question order
    quiz.sort(function (a, b) { return 0.5 - Math.random() });

    // Calling method to display the first question
    renderQuestion();

    // Starting the timer
    second = setInterval(function() {
        timerInt--;

        // Ending the quiz if time runs out
        if (timerInt < 0) {
            endQuiz();
        }

        timer.textContent = "Seconds Remaining: " + timerInt.toString();

    }, 1000);
}

function nextQuestion(guess) {
    // Checks if guess is correct, subtracts time if not
    if (guess == correct.toString()) {
        notification.textContent = "Correct";
    }
    else {
        notification.textContent = "Incorrect";
        timerInt = Math.max(timerInt - 20, 0);
        timer.textContent = "Seconds Remaining: " + timerInt.toString();
    }

    // Checks if there are questions left to render, ends quiz if not
    if (progress < 6) {
        renderQuestion();
    }
    else {
        endQuiz();
    }
}

function renderQuestion() {
    // Rendering the text for the question
    var currentQuestion = quiz[progress];
    question.textContent = currentQuestion[0];
    for (i = 0; i < 3; i++) {
        answers[i].textContent = currentQuestion[i + 1];
    }
    
    // Setting correct answer to call back later and incrementing the progress counter
    correct = currentQuestion[4];
    progress++;
}

function endQuiz() {
    // Clearing the questions and timer, then showing the score button
    clearInterval(second);
    questions.style.display = "none";
    timer.textContent = "Seconds Remaining: 30";
    timer.style.display = "none";
    scoreButton.style.visibility = "visible";

    // Showing failure message if user failed.
    if (timerInt < 1) {
        fail.style.display = "block";
    }
    // Showing score entry if user passed.
    else {
        success.style.display = "block";
        finalScore.value = timerInt.toString();
        scoreEntry.style.display = "block";
    }
}

function enterScore(score, name, oldLength) {
    // Sorting the score into the correct spot in the array
    for (i = 0; i * 2 < oldLength; i++) {
        if (parseInt(scores[i * 2]) < parseInt(score)) {
            scores.splice(i * 2, 0, score, name);
            break;
        }
    }
    // Still write to array even if score isn't higher than any existing scores
    if (scores.length == oldLength) {
    scores.push(score, name)
    }
    // Storing scores array in local storage
    localStorage.setItem("scores", JSON.stringify(scores));
    // Hiding score entry and letting the user know the score was entered
    scoreEntry.style.display = "none";
    submitted.style.display = "block";
}