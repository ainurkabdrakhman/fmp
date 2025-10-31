const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite3.Database(path.join(__dirname, "../database.sqlite"));

db.run(`CREATE TABLE IF NOT EXISTS comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  work_order TEXT,
  author TEXT,
  text TEXT,
  created_at TEXT
)`);

router.get("/:work_order", (req, res) => {
  const work_order = decodeURIComponent(req.params.work_order);
  db.all(
    "SELECT * FROM comments WHERE work_order = ? ORDER BY created_at ASC",
    [work_order],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

router.post("/", (req, res) => {
  const { work_order, author, text } = req.body;
  if (!work_order || !author || !text)
    return res.status(400).json({ error: "Missing required fields" });

  const created_at = new Date().toISOString();

  db.run(
    "INSERT INTO comments (work_order, author, text, created_at) VALUES (?, ?, ?, ?)",
    [work_order, author, text, created_at],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, work_order, author, text, created_at });
    }
  );
});

module.exports = router;
