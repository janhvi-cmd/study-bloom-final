const express = require("express");
const path = require("path");
const mysql = require("mysql2");
require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const app = express();

// ====================================
// MYSQL DATABASE CONNECTION
// ====================================

const db = mysql.createConnection({
    host: "localhost",
    user: "studyuser",
    password: "StudyBloom@123",
    database: "studybloom"
});

db.connect((err) => {
    if (err) {
        console.log("Database connection failed:", err);
    } else {
        console.log("Connected to StudyBloom Database!");
    }
});

// ====================================
// MIDDLEWARE
// ====================================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve StudyBloom files
app.use(express.static(__dirname, { index: false }));

// ====================================
// HOME PAGE
// ====================================

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "login.html"));
});

// ====================================
// SIGN UP ROUTE
// ====================================

app.post("/signup", (req, res) => {

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            message: "Please enter username, email and password."
        });
    }

    const sql =
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";

    db.query(sql, [username, email, password], (err, result) => {

        if (err) {
            console.log("Signup error:", err);

            return res.status(500).json({
                message: "Failed to create account."
            });
        }

        console.log("New user registered!");
        console.log("Username:", username);
        console.log("Email:", email);

        res.json({
            message: "🎉 Account created successfully!"
        });
    });
});

// ====================================
// GEMINI AI STUDY ASSISTANT
// ====================================

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

app.post("/ai-study", async (req, res) => {

    try {

        const { question } = req.body;

        if (!question) {
            return res.status(400).json({
                message: "Please enter a question."
            });
        }

        const response = await ai.models.generateContent({
            model: "gemini-3.6-flash",
            contents: `You are StudyBloom AI, a friendly and helpful study assistant.

Your job is to help students with studying and learning.

If the student says hello, hi, hey, or another greeting, respond with a friendly greeting and ask how you can help.

Answer study-related questions about subjects such as Python, Java, DBMS, SQL, Web Development, AI, and other computer science topics.

Explain difficult topics in simple, clear, student-friendly language.

You can also:
- Create study plans
- Give practice questions
- Summarize topics
- Explain concepts with simple examples
- Give revision tips
- Help students understand their mistakes

Keep your answers clear and reasonably concise.

Student's message:
${question}`
        });

        res.json({
            answer: response.text
        });

    } catch (error) {

        console.log("AI Error:", error);

        res.status(500).json({
            message: "AI could not answer right now."
        });
    }
});

// ====================================
// START SERVER
// ====================================

app.listen(3000, () => {
    console.log("StudyBloom Backend is running on port 3000");
});