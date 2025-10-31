const express = require("express");
const router = express.Router(); 
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.sqlite");

router.get("/", (req, res) => {
  db.all("SELECT * FROM workorders", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.get("/:work_order", (req, res) => {
  const work_order = decodeURIComponent(req.params.work_order);
  db.get("SELECT * FROM workorders WHERE work_order = ?", [work_order], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Work Order not found" });
    res.json(row);
  });
});

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

router.post("/", (req, res) => {
  const {
    work_order,
    maint_coordinator,
    responsible_engineer,
    priority,
    status,
    lead_craft,
    start_date,
    finish_date,
    update_date,
    equipment_id,
    plant_id,
    equipment_number,
    equipment_name,
    equipment_type,
    equipment_status,
    problem_description,
    proposed_description,
    reason_for_work,
    repair_type,
    cause
  } = req.body;

  const safe = (v) => (v === undefined ? null : v); // 👈 чтобы undefined не ломал SQL

  const query = `
    INSERT INTO workorders (
      work_order, maint_coordinator, responsible_engineer, priority, status,
      lead_craft, start_date, finish_date, update_date, equipment_id, plant_id,
      equipment_number, equipment_name, equipment_type, equipment_status,
      problem_description, proposed_description, reason_for_work, repair_type, cause
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(
    query,
    [
      safe(work_order), safe(maint_coordinator), safe(responsible_engineer), safe(priority), safe(status),
      safe(lead_craft), safe(start_date), safe(finish_date), safe(update_date), safe(equipment_id),
      safe(plant_id), safe(equipment_number), safe(equipment_name), safe(equipment_type),
      safe(equipment_status), safe(problem_description), safe(proposed_description),
      safe(reason_for_work), safe(repair_type), safe(cause)
    ],
    function (err) {
      if (err) {
        console.error("SQL Error:", err.message);
        return res.status(500).json({ error: err.message }); 
      }
      console.log("New Work Order inserted:", work_order);
      res.json({ id: this.lastID, message: "Work order created successfully" });
    }
  );
});
module.exports = router;

