// ========================================
// STUDYBLOOM - COMPLETE JAVASCRIPT
// ========================================

// ========================================
// WELCOME USER
// ========================================

const loggedInUser = localStorage.getItem("loggedInUser");

if (loggedInUser) {

    const welcome = document.getElementById("welcomeUser");

    if (welcome) {

        welcome.innerHTML = "🌸 Welcome, " + loggedInUser + "!";

    }

}


// ========================================
// 1. STUDY TIMER
// ========================================

let time = 25 * 60;
let timerInterval = null;
let isBreak = false;
let completedSessions = 0;


// START TIMER
function startTimer() {

    if (timerInterval !== null) {
        return;
    }

    timerInterval = setInterval(function () {

        let minutes = Math.floor(time / 60);
        let seconds = time % 60;

        document.getElementById("timer").innerHTML =
            minutes + ":" + (seconds < 10 ? "0" : "") + seconds;

        time--;

        if (time < 0) {

            clearInterval(timerInterval);
            timerInterval = null;


            // BREAK FINISHED
            if (isBreak) {

                alert(
                    "Break is over! Time to study 📚🌸"
                );

                isBreak = false;

                time = 25 * 60;

                document.getElementById("timer").innerHTML =
                    "25:00";

            }


            // STUDY SESSION FINISHED
            else {

                alert(
                    "Study session complete! Time for a break! ☕✨"
                );

                completedSessions++;


                // UPDATE SESSION COUNT

                document.getElementById(
                    "sessionCount"
                ).innerHTML =
                    completedSessions;


                // CALCULATE PROGRESS

                let progress =
                    (completedSessions / 4) * 100;


                if (progress > 100) {

                    progress = 100;

                }


                // UPDATE PROGRESS BAR

                document.getElementById(
                    "progressBar"
                ).style.width =
                    progress + "%";


                // UPDATE PROGRESS TEXT

                document.getElementById(
                    "progressText"
                ).innerHTML =
                    Math.round(progress) +
                    "% Complete";


                // DAILY GOAL

                if (completedSessions >= 4) {

                    alert(
                        "🎉 Amazing! You completed your daily study goal! 🌸✨"
                    );

                }


                // START BREAK

                isBreak = true;

                time = 5 * 60;

                document.getElementById(
                    "timer"
                ).innerHTML =
                    "05:00";

            }

        }

    }, 1000);

}



// PAUSE TIMER

function pauseTimer() {

    clearInterval(timerInterval);

    timerInterval = null;

}



// RESET TIMER

function resetTimer() {

    clearInterval(timerInterval);

    timerInterval = null;

    isBreak = false;

    time = 25 * 60;

    document.getElementById(
        "timer"
    ).innerHTML =
        "25:00";

}



// START BREAK

function startBreak() {

    clearInterval(timerInterval);

    timerInterval = null;

    isBreak = true;

    time = 5 * 60;

    document.getElementById(
        "timer"
    ).innerHTML =
        "05:00";

    startTimer();

}



// ========================================
// 2. TASK SYSTEM
// ========================================


// ADD TASK

function addTask() {

    let taskInput =
        document.getElementById(
            "taskInput"
        );

    let taskText =
        taskInput.value.trim();


    if (taskText === "") {

        alert(
            "Please enter a task! 🌸"
        );

        return;

    }


    let tasks =
        JSON.parse(
            localStorage.getItem(
                "studyTasks"
            )
        ) || [];


    tasks.push({

        text: taskText,

        completed: false

    });


    localStorage.setItem(

        "studyTasks",

        JSON.stringify(tasks)

    );


    displayTasks();


    taskInput.value = "";

}



// DISPLAY TASKS

function displayTasks() {

    let taskList =
        document.getElementById(
            "taskList"
        );


    if (!taskList) {

        return;

    }


    taskList.innerHTML = "";


    let tasks =
        JSON.parse(
            localStorage.getItem(
                "studyTasks"
            )
        ) || [];


    tasks.forEach(
        function (task, index) {


            // SUPPORT OLD TASK FORMAT

            if (
                typeof task === "string"
            ) {

                task = {

                    text: task,

                    completed: false

                };

            }


            let li =
                document.createElement(
                    "li"
                );


            li.innerHTML = `

                <input
                    type="checkbox"
                    ${task.completed ? "checked" : ""}
                    onchange="completeTask(${index}, this)"
                >

                <span
                    class="task-text"
                    style="
                    text-decoration:
                    ${task.completed ? "line-through" : "none"};

                    opacity:
                    ${task.completed ? "0.5" : "1"};
                    "
                >
                    ${task.text}
                </span>

                <button
                    onclick="deleteSavedTask(${index})"
                >
                    🗑️
                </button>

            `;


            taskList.appendChild(li);

        }
    );

}



// COMPLETE TASK

function completeTask(
    index,
    checkbox
) {

    let tasks =
        JSON.parse(
            localStorage.getItem(
                "studyTasks"
            )
        ) || [];


    // SUPPORT OLD TASKS

    if (
        typeof tasks[index] === "string"
    ) {

        tasks[index] = {

            text: tasks[index],

            completed: false

        };

    }


    tasks[index].completed =
        checkbox.checked;


    localStorage.setItem(

        "studyTasks",

        JSON.stringify(tasks)

    );


    displayTasks();

}



// DELETE SAVED TASK

function deleteSavedTask(
    index
) {

    let tasks =
        JSON.parse(
            localStorage.getItem(
                "studyTasks"
            )
        ) || [];


    tasks.splice(
        index,
        1
    );


    localStorage.setItem(

        "studyTasks",

        JSON.stringify(tasks)

    );


    displayTasks();

}



// CLEAR ALL TASKS

function clearAllTasks() {

    let confirmClear =
        confirm(
            "Are you sure you want to clear all tasks? 🌸"
        );


    if (confirmClear) {

        localStorage.removeItem(
            "studyTasks"
        );

        displayTasks();

    }

}



// ========================================
// 3. MOTIVATION
// ========================================

let motivations = [

    "You can do it! Keep going! 💪🌸",

    "Small steps every day lead to big results! 🌷",

    "Believe in yourself and keep studying! 📚✨",

    "Your future self will thank you! 🎀",

    "Stay focused, stay positive, and keep growing! 🌱",

    "One study session at a time! ⏱️💖"

];


let randomIndex =
    Math.floor(
        Math.random() *
        motivations.length
    );


document.getElementById(
    "motivation"
).innerHTML =
    motivations[randomIndex];



// ========================================
// 4. DARK MODE
// ========================================

function toggleDarkMode() {

    document.body.classList.toggle(
        "dark-mode"
    );


    if (
        document.body.classList.contains(
            "dark-mode"
        )
    ) {

        localStorage.setItem(
            "darkMode",
            "enabled"
        );

    }

    else {

        localStorage.setItem(
            "darkMode",
            "disabled"
        );

    }

}



// LOAD DARK MODE

if (
    localStorage.getItem(
        "darkMode"
    ) === "enabled"
) {

    document.body.classList.add(
        "dark-mode"
    );

}



// ========================================
// 5. SUBJECT TOPICS
// ========================================

function showSubject(
    subject
) {

    let subjectInfo =
        document.getElementById(
            "subjectInfo"
        );


    // ====================================
    // PYTHON
    // ====================================

    if (
        subject === "Python"
    ) {

        subjectInfo.innerHTML = `

            <h3>🐍 Python Topics</h3>

            <p>
                Click any topic to learn more.
            </p>

            <ul>

                <li onclick="showTopic('Python Variables')">
                    Variables
                </li>

                <li onclick="showTopic('Python Data Types')">
                    Data Types
                </li>

                <li onclick="showTopic('Python Operators')">
                    Operators
                </li>

                <li onclick="showTopic('Python Input Output')">
                    Input & Output
                </li>

                <li onclick="showTopic('Python If Else')">
                    If / Else Statements
                </li>

                <li onclick="showTopic('Python Loops')">
                    Loops
                </li>

                <li onclick="showTopic('Python Strings')">
                    Strings
                </li>

                <li onclick="showTopic('Python Lists')">
                    Lists
                </li>

                <li onclick="showTopic('Python Tuples')">
                    Tuples
                </li>

                <li onclick="showTopic('Python Sets')">
                    Sets
                </li>

                <li onclick="showTopic('Python Dictionaries')">
                    Dictionaries
                </li>

                <li onclick="showTopic('Python Functions')">
                    Functions
                </li>

                <li onclick="showTopic('Python Modules')">
                    Modules
                </li>

                <li onclick="showTopic('Python File Handling')">
                    File Handling
                </li>

                <li onclick="showTopic('Python Exception Handling')">
                    Exception Handling
                </li>

                <li onclick="showTopic('Python OOP')">
                    Object-Oriented Programming
                </li>

            </ul>

        `;

    }



    // ====================================
    // DBMS
    // ====================================

    else if (
        subject === "DBMS"
    ) {

        subjectInfo.innerHTML = `

            <h3>🗄️ DBMS Topics</h3>

            <p>
                Click any topic to learn more.
            </p>

            <ul>

                <li onclick="showTopic('DBMS Introduction')">
                    Introduction to DBMS
                </li>

                <li onclick="showTopic('DBMS Database Models')">
                    Database Models
                </li>

                <li onclick="showTopic('DBMS ER Model')">
                    ER Model
                </li>

                <li onclick="showTopic('DBMS Relational Model')">
                    Relational Model
                </li>

                <li onclick="showTopic('DBMS Keys')">
                    Keys
                </li>

                <li onclick="showTopic('DBMS SQL Basics')">
                    SQL Basics
                </li>

                <li onclick="showTopic('DBMS DDL')">
                    DDL
                </li>

                <li onclick="showTopic('DBMS DML')">
                    DML
                </li>

                <li onclick="showTopic('DBMS DQL')">
                    DQL
                </li>

                <li onclick="showTopic('DBMS Joins')">
                    Joins
                </li>

                <li onclick="showTopic('DBMS Subqueries')">
                    Subqueries
                </li>

                <li onclick="showTopic('DBMS Normalization')">
                    Normalization
                </li>

                <li onclick="showTopic('DBMS Transactions')">
                    Transactions
                </li>

                <li onclick="showTopic('DBMS ACID')">
                    ACID Properties
                </li>

                <li onclick="showTopic('DBMS Indexing')">
                    Indexing
                </li>

                <li onclick="showTopic('DBMS Security')">
                    Database Security
                </li>

            </ul>

        `;

    }



    // ====================================
    // WEB DEVELOPMENT
    // ====================================

    else if (
        subject === "Web Development"
    ) {

        subjectInfo.innerHTML = `

            <h3>🌐 Web Development Topics</h3>

            <p>
                Click any topic to learn more.
            </p>

            <ul>

                <li onclick="showTopic('Web HTML Basics')">
                    HTML Basics
                </li>

                <li onclick="showTopic('Web HTML Forms')">
                    HTML Forms
                </li>

                <li onclick="showTopic('Web HTML Tables')">
                    HTML Tables
                </li>

                <li onclick="showTopic('Web CSS Basics')">
                    CSS Basics
                </li>

                <li onclick="showTopic('Web CSS Selectors')">
                    CSS Selectors
                </li>

                <li onclick="showTopic('Web Colors Fonts')">
                    Colors & Fonts
                </li>

                <li onclick="showTopic('Web CSS Box Model')">
                    CSS Box Model
                </li>

                <li onclick="showTopic('Web Flexbox')">
                    Flexbox
                </li>

                <li onclick="showTopic('Web CSS Grid')">
                    CSS Grid
                </li>

                <li onclick="showTopic('Web Responsive Design')">
                    Responsive Design
                </li>

                <li onclick="showTopic('Web JavaScript Basics')">
                    JavaScript Basics
                </li>

                <li onclick="showTopic('Web Variables Data Types')">
                    Variables & Data Types
                </li>

                <li onclick="showTopic('Web Functions')">
                    Functions
                </li>

                <li onclick="showTopic('Web Arrays Objects')">
                    Arrays & Objects
                </li>

                <li onclick="showTopic('Web DOM Manipulation')">
                    DOM Manipulation
                </li>

                <li onclick="showTopic('Web Events')">
                    Events
                </li>

                <li onclick="showTopic('Web Local Storage')">
                    Local Storage
                </li>

            </ul>

        `;

    }

        // ========================================
    // ARTIFICIAL INTELLIGENCE (AI)
    // ========================================

    else if (subject === "AI") {

        subjectInfo.innerHTML = `
            <h3>🤖 AI Topics</h3>

            <p>
                Click any topic to learn more.
            </p>

            <ul>

                <li onclick="showTopic('AI Introduction')">
                    Introduction to AI
                </li>

                <li onclick="showTopic('AI Machine Learning')">
                    Machine Learning
                </li>

                <li onclick="showTopic('AI Deep Learning')">
                    Deep Learning
                </li>

                <li onclick="showTopic('AI Neural Networks')">
                    Neural Networks
                </li>

                <li onclick="showTopic('AI Natural Language Processing')">
                    Natural Language Processing
                </li>

            </ul>
        `;

    }


    // ========================================
    // JAVA
    // ========================================

    else if (subject === "Java") {

        subjectInfo.innerHTML = `
            <h3>☕ Java Topics</h3>

            <p>
                Click any topic to learn more.
            </p>

            <ul>

                <li onclick="showTopic('Java Introduction')">
                    Introduction to Java
                </li>

                <li onclick="showTopic('Java Variables')">
                    Variables
                </li>

                <li onclick="showTopic('Java Data Types')">
                    Data Types
                </li>

                <li onclick="showTopic('Java If Else')">
                    If / Else
                </li>

                <li onclick="showTopic('Java Loops')">
                    Loops
                </li>

                <li onclick="showTopic('Java OOP')">
                    Object-Oriented Programming
                </li>

            </ul>
        `;

    }


    // ========================================
    // SQL
    // ========================================

    else if (subject === "SQL") {

        subjectInfo.innerHTML = `
            <h3>💻 SQL Topics</h3>

            <p>
                Click any topic to learn more.
            </p>

            <ul>

                <li onclick="showTopic('SQL Introduction')">
                    Introduction to SQL
                </li>

                <li onclick="showTopic('SQL SELECT')">
                    SELECT Command
                </li>

                <li onclick="showTopic('SQL INSERT')">
                    INSERT Command
                </li>

                <li onclick="showTopic('SQL UPDATE')">
                    UPDATE Command
                </li>

                <li onclick="showTopic('SQL DELETE')">
                    DELETE Command
                </li>

                <li onclick="showTopic('SQL Joins')">
                    SQL Joins
                </li>

                <li onclick="showTopic('SQL Constraints')">
                    SQL Constraints
                </li>

            </ul>
        `;

    }
}



// ========================================
// 6. TOPIC INFORMATION
// ========================================

function showTopic(
    topic
) {


    // ====================================
    // PYTHON
    // ====================================

    if (
        topic === "Python Variables"
    ) {

        alert(
            "🐍 Python Variables\n\n" +
            "Variables are used to store data in Python.\n\n" +
            "Example:\n" +
            "name = 'Janhvi'\n" +
            "age = 20"
        );

    }


    else if (
        topic === "Python Data Types"
    ) {

        alert(
            "📦 Python Data Types\n\n" +
            "Data types tell Python what kind of data a value contains.\n\n" +
            "int - whole numbers\n" +
            "float - decimal numbers\n" +
            "str - text\n" +
            "bool - True or False"
        );

    }


    else if (
        topic === "Python Operators"
    ) {

        alert(
            "➕ Python Operators\n\n" +
            "Operators perform operations on values.\n\n" +
            "+ Addition\n" +
            "- Subtraction\n" +
            "* Multiplication\n" +
            "/ Division"
        );

    }


    else if (
        topic === "Python Input Output"
    ) {

        alert(
            "⌨️ Python Input & Output\n\n" +
            "input() takes information from the user.\n\n" +
            "print() displays information."
        );

    }


    else if (
        topic === "Python If Else"
    ) {

        alert(
            "🔀 Python If / Else\n\n" +
            "if and else statements are used to make decisions in a program."
        );

    }


    else if (
        topic === "Python Loops"
    ) {

        alert(
            "🔄 Python Loops\n\n" +
            "Loops repeat a block of code.\n\n" +
            "Common loops:\n" +
            "1. for loop\n" +
            "2. while loop"
        );

    }


    else if (
        topic === "Python Strings"
    ) {

        alert(
            "🔤 Python Strings\n\n" +
            "A string is a sequence of characters or text."
        );

    }


    else if (
        topic === "Python Lists"
    ) {

        alert(
            "📋 Python Lists\n\n" +
            "A list stores multiple items in one variable.\n\n" +
            "Example:\n" +
            "fruits = ['Apple', 'Mango', 'Banana']"
        );

    }


    else if (
        topic === "Python Tuples"
    ) {

        alert(
            "📦 Python Tuples\n\n" +
            "A tuple is a collection of items that cannot be changed after creation."
        );

    }


    else if (
        topic === "Python Sets"
    ) {

        alert(
            "🔵 Python Sets\n\n" +
            "A set is a collection of unique items."
        );

    }


    else if (
        topic === "Python Dictionaries"
    ) {

        alert(
            "🗂️ Python Dictionaries\n\n" +
            "A dictionary stores data using key-value pairs."
        );

    }


    else if (
        topic === "Python Functions"
    ) {

        alert(
            "⚙️ Python Functions\n\n" +
            "A function is a reusable block of code that performs a specific task."
        );

    }


    else if (
        topic === "Python Modules"
    ) {

        alert(
            "📚 Python Modules\n\n" +
            "A module is a Python file containing reusable code."
        );

    }


    else if (
        topic === "Python File Handling"
    ) {

        alert(
            "📁 Python File Handling\n\n" +
            "File handling allows Python programs to read and write files."
        );

    }


    else if (
        topic === "Python Exception Handling"
    ) {

        alert(
            "⚠️ Python Exception Handling\n\n" +
            "Exception handling helps programs deal with errors."
        );

    }


    else if (
        topic === "Python OOP"
    ) {

        alert(
            "🏗️ Object-Oriented Programming\n\n" +
            "OOP is a programming approach based on objects and classes.\n\n" +
            "Important concepts:\n" +
            "Classes\n" +
            "Objects\n" +
            "Inheritance\n" +
            "Encapsulation"
        );

    }



    // ====================================
    // DBMS
    // ====================================

    else if (
        topic === "DBMS Introduction"
    ) {

        alert(
            "🗄️ Introduction to DBMS\n\n" +
            "DBMS stands for Database Management System.\n\n" +
            "It is software used to store, organize, manage and retrieve data."
        );

    }


    else if (
        topic === "DBMS Database Models"
    ) {

        alert(
            "🗂️ Database Models\n\n" +
            "A database model describes how data is organized and related."
        );

    }


    else if (
        topic === "DBMS ER Model"
    ) {

        alert(
            "🔗 ER Model\n\n" +
            "ER stands for Entity-Relationship.\n\n" +
            "It is used to design databases using entities, attributes and relationships."
        );

    }


    else if (
        topic === "DBMS Relational Model"
    ) {

        alert(
            "📊 Relational Model\n\n" +
            "The relational model stores data in tables containing rows and columns."
        );

    }


    else if (
        topic === "DBMS Keys"
    ) {

        alert(
            "🔑 Database Keys\n\n" +
            "Keys identify records and create relationships between tables.\n\n" +
            "Examples:\n" +
            "Primary Key\n" +
            "Foreign Key\n" +
            "Candidate Key"
        );

    }


    else if (
        topic === "DBMS SQL Basics"
    ) {

        alert(
            "💻 SQL Basics\n\n" +
            "SQL stands for Structured Query Language.\n\n" +
            "It is used to communicate with and manage databases."
        );

    }


    else if (
        topic === "DBMS DDL"
    ) {

        alert(
            "🏗️ DDL\n\n" +
            "DDL stands for Data Definition Language.\n\n" +
            "Examples:\n" +
            "CREATE\n" +
            "ALTER\n" +
            "DROP"
        );

    }


    else if (
        topic === "DBMS DML"
    ) {

        alert(
            "✏️ DML\n\n" +
            "DML stands for Data Manipulation Language.\n\n" +
            "Examples:\n" +
            "INSERT\n" +
            "UPDATE\n" +
            "DELETE"
        );

    }


    else if (
        topic === "DBMS DQL"
    ) {

        alert(
            "🔍 DQL\n\n" +
            "DQL stands for Data Query Language.\n\n" +
            "The main command is SELECT."
        );

    }


    else if (
        topic === "DBMS Joins"
    ) {

        alert(
            "🔗 SQL Joins\n\n" +
            "Joins combine data from two or more tables.\n\n" +
            "Examples:\n" +
            "INNER JOIN\n" +
            "LEFT JOIN\n" +
            "RIGHT JOIN"
        );

    }


    else if (
        topic === "DBMS Subqueries"
    ) {

        alert(
            "🔎 Subqueries\n\n" +
            "A subquery is a query written inside another SQL query."
        );

    }


    else if (
        topic === "DBMS Normalization"
    ) {

        alert(
            "📚 Normalization\n\n" +
            "Normalization organizes data and reduces duplicate data."
        );

    }


    else if (
        topic === "DBMS Transactions"
    ) {

        alert(
            "🔄 Transactions\n\n" +
            "A transaction is a group of database operations treated as one unit."
        );

    }


    else if (
        topic === "DBMS ACID"
    ) {

        alert(
            "🛡️ ACID Properties\n\n" +
            "A - Atomicity\n" +
            "C - Consistency\n" +
            "I - Isolation\n" +
            "D - Durability"
        );

    }


    else if (
        topic === "DBMS Indexing"
    ) {

        alert(
            "⚡ Indexing\n\n" +
            "An index helps a database find and retrieve data more quickly."
        );

    }


    else if (
        topic === "DBMS Security"
    ) {

        alert(
            "🔐 Database Security\n\n" +
            "Database security protects data from unauthorized access and misuse."
        );

    }



    // ====================================
    // WEB DEVELOPMENT
    // ====================================

    else if (
        topic === "Web HTML Basics"
    ) {

        alert(
            "🌐 HTML Basics\n\n" +
            "HTML stands for HyperText Markup Language.\n\n" +
            "It is used to create the structure of web pages."
        );

    }


    else if (
        topic === "Web HTML Forms"
    ) {

        alert(
            "📝 HTML Forms\n\n" +
            "HTML forms are used to collect information from users."
        );

    }


    else if (
        topic === "Web HTML Tables"
    ) {

        alert(
            "📊 HTML Tables\n\n" +
            "HTML tables display data in rows and columns."
        );

    }


    else if (
        topic === "Web CSS Basics"
    ) {

        alert(
            "🎨 CSS Basics\n\n" +
            "CSS stands for Cascading Style Sheets.\n\n" +
            "CSS is used to style and design web pages."
        );

    }


    else if (
        topic === "Web CSS Selectors"
    ) {

        alert(
            "🎯 CSS Selectors\n\n" +
            "CSS selectors are used to select HTML elements that you want to style."
        );

    }


    else if (
        topic === "Web Colors Fonts"
    ) {

        alert(
            "🌈 Colors & Fonts\n\n" +
            "CSS allows you to change colors, font sizes and font styles."
        );

    }


    else if (
        topic === "Web CSS Box Model"
    ) {

        alert(
            "📦 CSS Box Model\n\n" +
            "The CSS Box Model contains:\n\n" +
            "Content\n" +
            "Padding\n" +
            "Border\n" +
            "Margin"
        );

    }


    else if (
        topic === "Web Flexbox"
    ) {

        alert(
            "📐 CSS Flexbox\n\n" +
            "Flexbox is a CSS layout system used to arrange elements in rows or columns."
        );

    }


    else if (
        topic === "Web CSS Grid"
    ) {

        alert(
            "🔲 CSS Grid\n\n" +
            "CSS Grid arranges elements into rows and columns."
        );

    }


    else if (
        topic === "Web Responsive Design"
    ) {

        alert(
            "📱 Responsive Design\n\n" +
            "Responsive design makes websites work well on phones, tablets and computers."
        );

    }


    else if (
        topic === "Web JavaScript Basics"
    ) {

        alert(
            "⚡ JavaScript Basics\n\n" +
            "JavaScript makes web pages interactive and dynamic."
        );

    }


    else if (
        topic === "Web Variables Data Types"
    ) {

        alert(
            "📦 JavaScript Variables & Data Types\n\n" +
            "Variables store data in JavaScript programs.\n\n" +
            "Common types include:\n" +
            "String\n" +
            "Number\n" +
            "Boolean\n" +
            "Object"
        );

    }


    else if (
        topic === "Web Functions"
    ) {

        alert(
            "⚙️ JavaScript Functions\n\n" +
            "A function is a reusable block of code that performs a specific task."
        );

    }


    else if (
        topic === "Web Arrays Objects"
    ) {

        alert(
            "📋 JavaScript Arrays & Objects\n\n" +
            "Arrays store multiple values.\n\n" +
            "Objects store data using key-value pairs."
        );

    }


    else if (
        topic === "Web DOM Manipulation"
    ) {

        alert(
            "🌳 DOM Manipulation\n\n" +
            "DOM stands for Document Object Model.\n\n" +
            "JavaScript can use the DOM to change webpage content."
        );

    }


    else if (
        topic === "Web Events"
    ) {

        alert(
            "🖱️ JavaScript Events\n\n" +
            "Events happen when users interact with a webpage.\n\n" +
            "Examples:\n" +
            "Click\n" +
            "Keyboard input\n" +
            "Form submission"
        );

    }


    else if (
        topic === "Web Local Storage"
    ) {

        alert(
            "💾 Local Storage\n\n" +
            "Local Storage allows websites to save small amounts of data in the browser."
        );

    }

        // ====================================
    // ARTIFICIAL INTELLIGENCE (AI)
    // ====================================

    else if (topic === "AI Introduction") {

        alert(
            "🤖 Introduction to Artificial Intelligence\n\n" +
            "Artificial Intelligence (AI) is the ability of computers " +
            "or machines to perform tasks that normally require human intelligence.\n\n" +
            "Examples:\n" +
            "• Chatbots\n" +
            "• Voice assistants\n" +
            "• Recommendation systems\n" +
            "• Image recognition"
        );

    }


    else if (topic === "AI Machine Learning") {

        alert(
            "🧠 Machine Learning\n\n" +
            "Machine Learning is a branch of AI where computers learn " +
            "patterns from data and use those patterns to make predictions or decisions.\n\n" +
            "Examples:\n" +
            "• Spam detection\n" +
            "• Recommendation systems\n" +
            "• Image recognition"
        );

    }


    else if (topic === "AI Deep Learning") {

        alert(
            "🔬 Deep Learning\n\n" +
            "Deep Learning is a type of Machine Learning that uses " +
            "neural networks with multiple layers to learn complex patterns.\n\n" +
            "It is commonly used in image recognition, speech recognition, " +
            "and many modern AI applications."
        );

    }


    else if (topic === "AI Neural Networks") {

        alert(
            "🧠 Neural Networks\n\n" +
            "Neural Networks are computing systems inspired by the " +
            "way the human brain processes information.\n\n" +
            "They are commonly used for:\n" +
            "• Image recognition\n" +
            "• Speech recognition\n" +
            "• Prediction"
        );

    }


    else if (topic === "AI Natural Language Processing") {

        alert(
            "💬 Natural Language Processing (NLP)\n\n" +
            "NLP is a branch of AI that helps computers understand, " +
            "process, and work with human language.\n\n" +
            "Examples:\n" +
            "• Chatbots\n" +
            "• Language translation\n" +
            "• Sentiment analysis"
        );

    }


    // ====================================
    // JAVA
    // ====================================

    else if (topic === "Java Introduction") {

        alert(
            "☕ Introduction to Java\n\n" +
            "Java is a popular, object-oriented programming language " +
            "used to create applications for different platforms.\n\n" +
            "Java follows the idea of 'Write Once, Run Anywhere'."
        );

    }


    else if (topic === "Java Variables") {

        alert(
            "📦 Java Variables\n\n" +
            "Variables are used to store data in Java.\n\n" +
            "Example:\n" +
            "int age = 20;\n" +
            "String name = \"Janhvi\";"
        );

    }


    else if (topic === "Java Data Types") {

        alert(
            "📊 Java Data Types\n\n" +
            "Common Java data types include:\n\n" +
            "int - whole numbers\n" +
            "double - decimal numbers\n" +
            "char - single character\n" +
            "boolean - true or false\n" +
            "String - text"
        );

    }


    else if (topic === "Java If Else") {

        alert(
            "🔀 Java If / Else\n\n" +
            "If / Else statements are used to make decisions " +
            "based on conditions.\n\n" +
            "Example:\n" +
            "if (age >= 18) {\n" +
            "    System.out.println(\"Adult\");\n" +
            "} else {\n" +
            "    System.out.println(\"Minor\");\n" +
            "}"
        );

    }


    else if (topic === "Java Loops") {

        alert(
            "🔄 Java Loops\n\n" +
            "Loops are used to repeat a block of code multiple times.\n\n" +
            "Common Java loops:\n" +
            "• for loop\n" +
            "• while loop\n" +
            "• do-while loop"
        );

    }


    else if (topic === "Java OOP") {

        alert(
            "🏗️ Java Object-Oriented Programming\n\n" +
            "OOP is a programming approach based on classes and objects.\n\n" +
            "Important concepts:\n" +
            "• Classes\n" +
            "• Objects\n" +
            "• Inheritance\n" +
            "• Encapsulation\n" +
            "• Polymorphism"
        );

    }


    // ====================================
    // SQL
    // ====================================

    else if (topic === "SQL Introduction") {

        alert(
            "💻 Introduction to SQL\n\n" +
            "SQL stands for Structured Query Language.\n\n" +
            "It is used to communicate with and manage data " +
            "stored in relational databases."
        );

    }


    else if (topic === "SQL SELECT") {

        alert(
            "🔍 SQL SELECT\n\n" +
            "The SELECT command is used to retrieve data from a database table.\n\n" +
            "Example:\n" +
            "SELECT * FROM students;"
        );

    }


    else if (topic === "SQL INSERT") {

        alert(
            "➕ SQL INSERT\n\n" +
            "The INSERT command is used to add new records to a database table.\n\n" +
            "Example:\n" +
            "INSERT INTO students VALUES (1, 'Janhvi');"
        );

    }


    else if (topic === "SQL UPDATE") {

        alert(
            "✏️ SQL UPDATE\n\n" +
            "The UPDATE command is used to modify existing records in a database table.\n\n" +
            "Example:\n" +
            "UPDATE students SET name = 'Janhvi' WHERE id = 1;"
        );

    }


    else if (topic === "SQL DELETE") {

        alert(
            "🗑️ SQL DELETE\n\n" +
            "The DELETE command is used to remove records from a database table.\n\n" +
            "Example:\n" +
            "DELETE FROM students WHERE id = 1;"
        );

    }


    else if (topic === "SQL Joins") {

        alert(
            "🔗 SQL Joins\n\n" +
            "Joins are used to combine data from two or more database tables.\n\n" +
            "Common types:\n" +
            "• INNER JOIN\n" +
            "• LEFT JOIN\n" +
            "• RIGHT JOIN"
        );

    }


    else if (topic === "SQL Constraints") {

        alert(
            "🔐 SQL Constraints\n\n" +
            "Constraints are rules applied to columns in a database table.\n\n" +
            "Examples:\n" +
            "• PRIMARY KEY\n" +
            "• FOREIGN KEY\n" +
            "• NOT NULL\n" +
            "• UNIQUE"
        );

    }
}



// ========================================
// 7. LOAD TASKS WHEN PAGE OPENS
// ========================================

displayTasks();

// ========================================
// LOGOUT
// ========================================

function logout() {

    // Remove logged in user
    localStorage.removeItem("loggedInUser");

    alert("👋 You have been logged out!");

    // Go back to login page
    window.location.href = "login.html";

}

// ====================================
// STUDYBLOOM AI ASSISTANT
// ====================================

async function askStudyAI() {

    const question = document.getElementById("aiQuestion").value.trim();
    const answerBox = document.getElementById("aiAnswer");

    if (!question) {
        answerBox.innerHTML = "🌸 Please enter a question first!";
        return;
    }

    answerBox.innerHTML = "🤖 StudyBloom AI is thinking...";

    try {

        const response = await fetch("/ai-study", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                question: question
            })
        });

        const data = await response.json();

        if (response.ok) {
            answerBox.innerHTML = `
                <h3>🤖 StudyBloom AI</h3>
                <p>${data.answer}</p>
            `;
        } else {
            answerBox.innerHTML = "❌ " + data.message;
        }

    } catch (error) {

        console.log(error);

        answerBox.innerHTML =
            "❌ Unable to connect to StudyBloom AI.";
    }
}