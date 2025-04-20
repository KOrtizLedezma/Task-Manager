const express = require("express");
const router = express.Router();
const db = require("../db");
const dayjs = require("dayjs");

// POST /tasks - Add a new task
router.post("/", async (req, res) => {
  const { user_id, description, task_date } = req.body;

  if (!user_id || !description || !task_date) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  const isValidDate = dayjs(task_date, "YYYY-MM-DD", true).isValid();
  const isTodayOrFuture = dayjs(task_date).isSame(dayjs(), "day") || dayjs(task_date).isAfter(dayjs());

  if (!isValidDate) {
    return res.status(400).json({ success: false, message: "Invalid date format. Use YYYY-MM-DD." });
  }

  if (!isTodayOrFuture) {
    return res.status(400).json({ success: false, message: "Task date cannot be in the past." });
  }

  try {
    const [result] = await db.execute(
      "INSERT INTO tasks (user_id, description, task_date) VALUES (?, ?, ?)",
      [user_id, description, task_date]
    );

    res.status(201).json({
      success: true,
      task: {
        id: result.insertId,
        user_id,
        description,
        task_date,
        completed: false
      }
    });
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({ success: false, message: "Database insert failed" });
  }
});


// GET /tasks?user_id=UID&date=YYYY-MM-DD
router.get("/", async (req, res) => {
    const { user_id, date } = req.query;
  
    if (!user_id || !date) {
      return res.status(400).json({ success: false, message: "Missing user_id or date" });
    }
  
    try {
      const [rows] = await db.execute(
        "SELECT * FROM tasks WHERE user_id = ? AND task_date = ? ORDER BY created_at DESC",
        [user_id, date]
      );
      res.json({ success: true, tasks: rows });
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ success: false, message: "Database error" });
    }
});  

// PUT /tasks/:id - Toggle completed
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
  
    if (typeof completed !== "boolean") {
      return res.status(400).json({ success: false, message: "Completed must be true or false" });
    }
  
    try {
      await db.execute("UPDATE tasks SET completed = ? WHERE id = ?", [completed, id]);
      res.json({ success: true });
    } catch (error) {
      console.error("Error updating task:", error);
      res.status(500).json({ success: false, message: "Database update failed" });
    }
});


// DELETE /tasks/:id
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      await db.execute("DELETE FROM tasks WHERE id = ?", [id]);
      res.json({ success: true, message: "Task deleted successfully" });
    } catch (error) {
      console.error("Error deleting task:", error);
      res.status(500).json({ success: false, message: "Database delete failed" });
    }
  });
  
module.exports = router;
