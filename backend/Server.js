const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database(path.join(__dirname, "database.sqlite"), (err) => {
  if (err) console.error("Database error:", err.message);
  else console.log("Connected to database");
});

db.run(`CREATE TABLE IF NOT EXISTS workorders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  work_order TEXT,
  maint_coordinator TEXT,
  responsible_engineer TEXT,
  priority TEXT,
  status TEXT,
  lead_craft TEXT,
  start_date TEXT,
  finish_date TEXT,
  update_date TEXT,
  equipment_id TEXT,
  plant_id TEXT,
  equipment_number TEXT,
  equipment_name TEXT,
  equipment_type TEXT,
  equipment_status TEXT,
  problem_description TEXT,
  proposed_description TEXT,
  reason_for_work TEXT,
  repair_type TEXT,
  cause TEXT
)`);

db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE,
  password TEXT,
  role TEXT
)`);

db.get("SELECT COUNT(*) as count FROM users", (err, row) => {
  if (row.count === 0) {
    db.run(`INSERT INTO users(username, password, role) VALUES
      ('admin', '12345', 'admin'),
      ('tech', '67890', 'technician')`);
  }
});

app.delete("/workorders/:work_order", (req, res) => {
  const work_order = decodeURIComponent(req.params.work_order);
  const sql = "DELETE FROM workorders WHERE work_order = ?";

  db.run(sql, [work_order], function (err) {
    if (err) {
      console.error("Error deleting Work Order:", err.message);
      return res.status(500).json({ error: "Failed to delete Work Order" });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Work Order not found" });
    }
    res.json({ message: "Work Order deleted successfully" });
  });
});


const workOrdersRouter = require("./routes/workorders");
app.use("/workorders", workOrdersRouter);

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

const commentsRouter = require("./routes/comments");
app.use("/comments", commentsRouter);

const PORT = 5000;
app.listen(PORT, () => console.log(` Server running at http://localhost:${PORT}`));
