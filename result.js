// ==============================
// Get Quiz Result
// ==============================

const score =
    Number(localStorage.getItem("quizScore"));

const total =
    Number(localStorage.getItem("totalQuestions"));

const studentName =
    localStorage.getItem("currentStudent");


// ==============================
// Calculate Result
// ==============================

const correct = score;

const wrong = total - score;

const percentage =
    Math.round((score / total) * 100);


// ==============================
// Display Student Name
// ==============================

if (studentName) {

    document.getElementById("studentName").textContent =
        studentName;

}


// ==============================
// Display Result
// ==============================

document.getElementById("score").textContent =
    score;

document.getElementById("total").textContent =
    total;

document.getElementById("correct").textContent =
    correct;

document.getElementById("wrong").textContent =
    wrong;

document.getElementById("percentage").textContent =
    percentage + "%";