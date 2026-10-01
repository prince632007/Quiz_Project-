
const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name =
        document.getElementById("name").value.trim();

    const enrollment =
        document.getElementById("enrollment").value.trim();

    const password =
        document.getElementById("password").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;


    // Check password
    if (password !== confirmPassword) {

        alert("Passwords do not match!");

        return;
    }


    // Get existing students
    let students =
        JSON.parse(localStorage.getItem("students")) || [];


    // Check if enrollment already exists
    const existingStudent =
        students.find(function(student) {

            return student.enrollment === enrollment;

        });


    if (existingStudent) {

        alert(
            "This enrollment number is already registered!"
        );

        return;
    }


    // Create new student
    const student = {

        name: name,

        enrollment: enrollment,

        password: password

    };


    // Add student to students array
    students.push(student);


    // Save all students
    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );


    alert("Registration successful!");


    // Go to login
    window.location.href =
        "login.html";

});