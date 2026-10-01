
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const enrollment =
        document.getElementById("enrollment").value.trim();

    const password =
        document.getElementById("password").value;


    // Get all registered students
    const students =
        JSON.parse(localStorage.getItem("students")) || [];


    // Find student
    const student =
        students.find(function(user) {

            return (
                user.enrollment === enrollment &&
                user.password === password
            );

        });


    // Check login
    if (student) {

        // Save login status
        localStorage.setItem(
            "loggedIn",
            "true"
        );


        // Save currently logged-in student
        localStorage.setItem(
            "currentStudent",
            student.name
        );


        // Save current enrollment
        localStorage.setItem(
            "currentEnrollment",
            student.enrollment
        );


        alert("Login successful!");


        // Go to quiz
        window.location.href =
            "quiz.html";

    } else {

        alert(
            "Invalid enrollment number or password!"
        );

    }

});