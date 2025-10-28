const express = require("express");
const router = express.Router(); // ← эта строка была пропущена
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.sqlite");

// GET все заявки
router.get("/", (req, res) => {
  db.all("SELECT * FROM workorders", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// GET конкретная заявка по work_order
router.get("/:work_order", (req, res) => {
  const work_order = decodeURIComponent(req.params.work_order);
  db.get("SELECT * FROM workorders WHERE work_order = ?", [work_order], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Work Order not found" });
    res.json(row);
  });
});

// PUT для обновления заявки (редактирование полей)
router.put("/:work_order", (req, res) => {
  const work_order = decodeURIComponent(req.params.work_order);
  const {
    status,
    finish_date,
    equipment_status,
    repair_type,
    cause,
    proposed_description,
    reason_for_work
  } = req.body;

  const query = `
    UPDATE workorders
    SET status = ?, finish_date = ?, equipment_status = ?, repair_type = ?, cause = ?, proposed_description = ?, reason_for_work = ?
    WHERE work_order = ?
  `;

  db.run(
    query,
    [status, finish_date, equipment_status, repair_type, cause, proposed_description, reason_for_work, work_order],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Work Order updated successfully" });
    }
  );
});

module.exports = router;

