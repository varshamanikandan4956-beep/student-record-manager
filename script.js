// Student data

const students = [
    {
        name: "Anu",
        course: "Computer Science",
        marks: 92
    },

    {
        name: "Rahul",
        course: "Cyber Security",
        marks: 85
    },

    {
        name: "Meera",
        course: "Data Science",
        marks: 78
    },

    {
        name: "Arjun",
        course: "Computer Science",
        marks: 88
    },

    {
        name: "Varsha",
        course: "Cyber Security",
        marks: 95
    },

    {
        name: "Neha",
        course: "Data Science",
        marks: 72
    }
];


// Get HTML elements

const studentList = document.getElementById("studentList");

const searchInput = document.getElementById("searchInput");

const courseFilter = document.getElementById("courseFilter");

const marksFilter = document.getElementById("marksFilter");

const sortOption = document.getElementById("sortOption");

const totalStudents = document.getElementById("totalStudents");

const averageMarks = document.getElementById("averageMarks");

const topper = document.getElementById("topper");


// Display students

function displayStudents(studentArray) {

    studentList.innerHTML = "";

    if (studentArray.length === 0) {

        studentList.innerHTML = "<p>No students found.</p>";

        updateStats([]);

        return;
    }


    studentArray.forEach(student => {

        const card = document.createElement("div");

        card.className = "student-card";

        card.innerHTML = `
            <h3>${student.name}</h3>
            <p><strong>Course:</strong> ${student.course}</p>
            <p><strong>Marks:</strong> ${student.marks}</p>
        `;

        studentList.appendChild(card);

    });


    updateStats(studentArray);
}


// Filter and search

function updateStudents() {

    let filteredStudents = students.filter(student => {

        const searchText = searchInput.value.toLowerCase();

        const matchesName =
            student.name.toLowerCase().includes(searchText);


        const matchesCourse =
            courseFilter.value === "all" ||
            student.course === courseFilter.value;


        const matchesMarks =
            marksFilter.value === "all" ||
            student.marks >= Number(marksFilter.value);


        return matchesName && matchesCourse && matchesMarks;

    });


    // Sorting

    const sortValue = sortOption.value;

    if (sortValue === "nameAsc") {

        filteredStudents.sort((a, b) =>
            a.name.localeCompare(b.name)
        );

    }

    else if (sortValue === "nameDesc") {

        filteredStudents.sort((a, b) =>
            b.name.localeCompare(a.name)
        );

    }

    else if (sortValue === "marksHigh") {

        filteredStudents.sort((a, b) =>
            b.marks - a.marks
        );

    }

    else if (sortValue === "marksLow") {

        filteredStudents.sort((a, b) =>
            a.marks - b.marks
        );

    }


    displayStudents(filteredStudents);
}


// Calculate statistics

function updateStats(studentArray) {

    totalStudents.textContent = studentArray.length;


    if (studentArray.length === 0) {

        averageMarks.textContent = "0";

        topper.textContent = "-";

        return;
    }


    // reduce() for total marks

    const totalMarks = studentArray.reduce(
        (total, student) => total + student.marks,
        0
    );


    // Calculate average

    const average = totalMarks / studentArray.length;

    averageMarks.textContent = average.toFixed(2);


    // Find topper

    const topStudent = studentArray.reduce(
        (top, student) =>
            student.marks > top.marks ? student : top
    );


    topper.textContent =
        `${topStudent.name} (${topStudent.marks})`;
}


// Event listeners

searchInput.addEventListener("input", updateStudents);

courseFilter.addEventListener("change", updateStudents);

marksFilter.addEventListener("change", updateStudents);

sortOption.addEventListener("change", updateStudents);


// Initial display

displayStudents(students);
