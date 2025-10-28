const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("database.sqlite");

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS work_orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    work_order TEXT,
    priority INTEGER,
    status TEXT,
    equipment_name TEXT,
    equipment_type TEXT,
    problem_description TEXT,
    proposed_description TEXT,
    reason_for_work TEXT,
    repair_type TEXT,
    cause TEXT
  )`);

  const insert = db.prepare(`INSERT INTO work_orders (
    work_order, priority, status, equipment_name, equipment_type,
    problem_description, proposed_description, reason_for_work, repair_type, cause
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

  const data = [
    ["WO 477006", 3, "Open", "Incoming Fuel Gas from Okan PP", "Pipe",
      "External corrosion wrapped with 'Snap Wrap' at 30 locations",
      "Replace ~40m of corroded 3'' Fuel Gas piping",
      "Corrison Remedial Work", "Replace in Kind", "External Corrison"],

    ["WO 454170", 2, "Open", "26\" Outgoing Riser to Oil Pipeline", "Riser",
      "TLR (ClockSpring) installed in 2024",
      "Sectional replacement in kind (ASME B31.4)",
      "Repair Mechanical", "Clockspring Tem", "External Corrison"],

    ["WO 528278", 3, "Open", "Piping from INSTRUMENT AIR to SUPPLY HEADER", "Pipe",
      "Leak found on 2\" and 1/2\" section due to external corrosion",
      "Replace both sections in-kind and restore protection",
      "Leak Containment", "Replace in Kind", "External Corrison"],

    ["WO 517590", 3, "Open", "From Turret To Refrigerator Unit", "Pipe",
      "Severe external corrosion found on vents",
      "Replace vents and restore thickness",
      "Repair Mechanical", "Replace in Kind", "External Corrison"],

    ["WO 487759", 2, "Open", "22\" Seawater Header", "Pipe",
      "Leaks repaired using clockspring and composite wrap",
      "Sectional replacement per ASME B31.3",
      "Repair Mechanical", "Clockspring Tem", "Internal Corrison"]
  ];

  data.forEach(row => insert.run(row));
  insert.finalize();
});

db.close();
console.log(" Database initialized with sample data.");
