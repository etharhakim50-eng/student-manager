
// Get HTML Elements

let studentForm = document.getElementById("studentForm");
let studentName = document.getElementById("studentName");
let studentEmail = document.getElementById("studentEmail");
let studentsList = document.getElementById("studentsList");

let loadUsersBtn = document.getElementById("loadUsers");
let apiUsersList = document.getElementById("apiUsersList");

let courseBtn = document.getElementById("courseBtn");
let refreshBtn = document.getElementById("refreshBtn");


// Get Students from Local Storage

let students = JSON.parse(localStorage.getItem("students")) || [];


// Display Students Function

function displayStudents() {

    studentsList.innerHTML = "";

    students.forEach(function(student, index) {

        let card = document.createElement("div");
        card.className = "student-card";

        let name = document.createElement("h3");
        name.textContent = student.name;

        let email = document.createElement("p");
        email.textContent = student.email;

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";

        deleteBtn.addEventListener("click", function() {
            deleteStudent(index);
        });

        card.appendChild(name);
        card.appendChild(email);
        card.appendChild(deleteBtn);

        studentsList.appendChild(card);

    });

}


// Save Students Function

function saveStudents() {

    let data = JSON.stringify(students);

    localStorage.setItem("students", data);

}


// Add Student Function

function addStudent(event) {

    event.preventDefault();

    let name = studentName.value.trim();
    let email = studentEmail.value.trim();

    if (name === "" || email === "") {
        alert("Please enter all information!");
        return;
    }

    let student = {
        name: name,
        email: email
    };

    students.push(student);

    saveStudents();

    displayStudents();

    alert("Student added successfully!");

    studentForm.reset();

}


// Delete Student Function

function deleteStudent(index) {

    let answer = confirm("Are you sure you want to delete this student?");

    if (answer) {

        students.splice(index, 1);

        saveStudents();

        displayStudents();

    }

}


// Load API Users Function


function loadAPIUsers() {

    apiUsersList.innerHTML = "";

    if (students.length === 0) {
        apiUsersList.textContent = "No students added yet!";
        return;
    }

    students.forEach(function(student) {

        let card = document.createElement("div");
        card.className = "api-card";

        let name = document.createElement("h3");
        name.textContent = student.name;

        let email = document.createElement("p");
        email.textContent = student.email;

        card.appendChild(name);
        card.appendChild(email);

        apiUsersList.appendChild(card);

    });

}



// Course Information Function

function getCourseInfo() {

    let courseName = prompt("Enter your course name:");

    if (courseName !== null && courseName.trim() !== "") {

        alert("Welcome to " + courseName + "!");

    } else if (courseName !== null) {

        alert("Please enter a course name.");

    }

}


// Refresh Function

function refreshPage() {

    window.location.reload();

}


// Event Listeners

studentForm.addEventListener("submit", addStudent);

loadUsersBtn.addEventListener("click", loadAPIUsers);

courseBtn.addEventListener("click", getCourseInfo);

refreshBtn.addEventListener("click", refreshPage);


// Display Saved Students

displayStudents();
