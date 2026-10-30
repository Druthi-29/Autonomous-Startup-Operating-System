const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Autonomous Startup OS Backend is running 🚀",
    status: "success",
  });
});

// Dashboard API
app.get("/api/dashboard", (req, res) => {
  res.json({
    revenue: "₹4.28 L",
    revenueGrowth: "+12.5%",
    activeProjects: 18,
    pendingTasks: 24,
    tasksDueToday: 8,
    customers: 1248,
    customerGrowth: "+18.2%",
  });
});
// ================= REGISTER =================

app.post("/api/register", async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      if (!name || !email || !password) {
        return res.status(400).json({
          message: "Name, email and password are required",
        });
      }
  
      const existingUser = db
        .prepare("SELECT * FROM users WHERE email = ?")
        .get(email);
  
      if (existingUser) {
        return res.status(400).json({
          message: "User already exists",
        });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const result = db
        .prepare(
          `INSERT INTO users (name, email, password)
           VALUES (?, ?, ?)`
        )
        .run(name, email, hashedPassword);
  
      res.status(201).json({
        message: "Registration successful",
        userId: result.lastInsertRowid,
      });
  
    } catch (error) {
      console.error(error);
  
      res.status(500).json({
        message: "Server error",
      });
    }
  });
  
  
  // ================= LOGIN =================
  
  app.post("/api/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({
          message: "Email and password are required",
        });
      }
  
      const user = db
        .prepare("SELECT * FROM users WHERE email = ?")
        .get(email);
  
      if (!user) {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }
  
      const passwordMatch = await bcrypt.compare(
        password,
        user.password
      );
  
      if (!passwordMatch) {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }
  
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        "autonomous-startup-secret",
        {
          expiresIn: "1d",
        }
      );
  
      res.json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
  
    } catch (error) {
      console.error(error);
  
      res.status(500).json({
        message: "Server error",
      });
    }
  });
// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
