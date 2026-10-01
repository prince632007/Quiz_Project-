
const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyperlinks Text Mark Language",
            "Home Tool Markup Language"
        ],
        answer: 0
    },
    {
        question: "Which language is used to style a web page?",
        options: [
            "HTML",
            "CSS",
            "JavaScript",
            "Python"
        ],
        answer: 1
    },
    {
        question: "Which language is mainly used to add interactivity to web pages?",
        options: [
            "HTML",
            "CSS",
            "JavaScript",
            "SQL"
        ],
        answer: 2
    },
    {
        question: "Which HTML tag is used to create a hyperlink?",
        options: [
            "<link>",
            "<a>",
            "<href>",
            "<url>"
        ],
        answer: 1
    },
    {
        question: "Which CSS property is used to change text color?",
        options: [
            "font-color",
            "text-color",
            "color",
            "background-color"
        ],
        answer: 2
    },
    {
        question: "Which symbol is used for an ID selector in CSS?",
        options: [
            ".",
            "#",
            "*",
            "@"
        ],
        answer: 1
    },
    {
        question: "Which method is used to store data in the browser?",
        options: [
            "LocalStorage",
            "BrowserStorage",
            "WebStorageOnly",
            "PageStorage"
        ],
        answer: 0
    },
    {
        question: "Which HTML tag is used to create a form?",
        options: [
            "<input>",
            "<form>",
            "<fieldset>",
            "<data>"
        ],
        answer: 1
    },
    {
        question: "Which JavaScript keyword is used to declare a constant?",
        options: [
            "var",
            "let",
            "const",
            "constant"
        ],
        answer: 2
    },
    {
        question: "Which HTML tag is used to display an image?",
        options: [
            "<picture>",
            "<image>",
            "<img>",
            "<src>"
        ],
        answer: 2
    }
];


let currentQuestion = 0;

let selectedAnswers =
    new Array(questions.length).fill(null);

let timeLeft = 10 * 60;

let timerInterval;


// Check login
const loggedIn =
    localStorage.getItem("loggedIn");

if (loggedIn !== "true") {

    alert("Please login first.");

    window.location.href =
        "login.html";
}


// Get current student
const studentName =
    localStorage.getItem("currentStudent");

const currentEnrollment =
    localStorage.getItem("currentEnrollment");


if (studentName) {

    document.getElementById("studentName").textContent =
        studentName;

}


// Display question
function displayQuestion() {

    const questionData =
        questions[currentQuestion];


    document.getElementById("question").textContent =
        questionData.question;


    document.getElementById("questionNumber").textContent =
        "Question " +
        (currentQuestion + 1) +
        " of " +
        questions.length;


    const optionsContainer =
        document.getElementById("options");


    optionsContainer.innerHTML = "";


    questionData.options.forEach(function(option, index) {

        const optionLabel =
            document.createElement("label");

        optionLabel.className =
            "option";


        const radio =
            document.createElement("input");

        radio.type =
            "radio";

        radio.name =
            "answer";

        radio.value =
            index;


        if (
            selectedAnswers[currentQuestion] === index
        ) {

            radio.checked = true;

        }


        radio.addEventListener(
            "change",
            function() {

                selectedAnswers[currentQuestion] =
                    index;

            }
        );


        const optionText =
            document.createElement("span");

        optionText.textContent =
            option;


        optionLabel.appendChild(radio);

        optionLabel.appendChild(optionText);

        optionsContainer.appendChild(optionLabel);

    });


    document.getElementById("previousBtn").disabled =
        currentQuestion === 0;


    if (
        currentQuestion ===
        questions.length - 1
    ) {

        document.getElementById("nextBtn").style.display =
            "none";

    } else {

        document.getElementById("nextBtn").style.display =
            "inline-block";

    }

}


// Next button
document.getElementById("nextBtn")
    .addEventListener(
        "click",
        function() {

            if (
                currentQuestion <
                questions.length - 1
            ) {

                currentQuestion++;

                displayQuestion();

            }

        }
    );


// Previous button
document.getElementById("previousBtn")
    .addEventListener(
        "click",
        function() {

            if (currentQuestion > 0) {

                currentQuestion--;

                displayQuestion();

            }

        }
    );


// Timer
function startTimer() {

    timerInterval =
        setInterval(
            function() {

                let minutes =
                    Math.floor(
                        timeLeft / 60
                    );


                let seconds =
                    timeLeft % 60;


                let formattedSeconds =
                    seconds < 10
                        ? "0" + seconds
                        : seconds;


                document.getElementById("timer").textContent =
                    minutes +
                    ":" +
                    formattedSeconds;


                if (timeLeft <= 0) {

                    clearInterval(
                        timerInterval
                    );

                    alert("Time is up!");

                    submitQuiz();

                }


                timeLeft--;

            },
            1000
        );

}


// Submit button
document.getElementById("submitBtn")
    .addEventListener(
        "click",
        function() {

            const confirmation =
                confirm(
                    "Are you sure you want to submit the quiz?"
                );


            if (confirmation) {

                submitQuiz();

            }

        }
    );


// Submit quiz
function submitQuiz() {

    clearInterval(
        timerInterval
    );


    let score = 0;


    questions.forEach(
        function(question, index) {

            if (
                selectedAnswers[index] ===
                question.answer
            ) {

                score++;

            }

        }
    );


    // Save score
    localStorage.setItem(
        "quizScore",
        score
    );


    localStorage.setItem(
        "totalQuestions",
        questions.length
    );


    // Create result
    const result = {

        name: studentName,

        enrollment: currentEnrollment,

        score: score,

        total: questions.length

    };


    // Save latest result
    localStorage.setItem(
        "latestResult",
        JSON.stringify(result)
    );


    // Get leaderboard
    let leaderboard =
        JSON.parse(
            localStorage.getItem("leaderboard")
        ) || [];


    // Add result
    leaderboard.push(result);


    // Save leaderboard
    localStorage.setItem(
        "leaderboard",
        JSON.stringify(leaderboard)
    );


    // Go to result page
    window.location.href =
        "result.html";

}


// Start quiz
displayQuestion();

startTimer();