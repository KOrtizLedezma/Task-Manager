const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./db");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const tasksRoute = require("./routes/tasks");


// Middleware
app.use(cors());
app.use(express.json());

// Root test route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.use("/api/tasks", tasksRoute);

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
