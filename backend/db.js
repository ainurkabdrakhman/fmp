const Database = require("better-sqlite3");
const db = new Database("database.sqlite");

db.prepare(`
  CREATE TABLE IF NOT EXISTS answers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question TEXT,
    userAnswer TEXT,
    correctAnswer TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`).run();

module.exports = db;
