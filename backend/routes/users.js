const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite3.Database(path.join(__dirname, "../database.sqlite"));

// Создаем таблицу users, если нет
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE,
  password TEXT,
  role TEXT
)`);

// Добавляем пользователей только один раз
db.run(`INSERT OR IGNORE INTO users(username, password, role) VALUES
 ('admin', '12345', 'admin'),
 ('tech', '67890', 'technician')`);

// GET-запрос для логина
router.get("/login", (req, res) => {
  const { username, password } = req.query;
  if (!username || !password) return res.status(400).json({ error: "Missing username or password" });

  db.get(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(401).json({ error: "Invalid credentials" });

      res.json({
        username: row.username,
        role: row.role
      });
    }
  );
});

module.exports = router;






