const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.sqlite", (err) => {
  if (err) {
    console.error("Ошибка подключения к базе:", err.message);
  } else {
    console.log("✅ Подключено к базе данных");
  }
});

const workOrders = [
  {
    work_order: "WO 477006",
    priority: "3",
    status: "Open",
    lead_craft: "",
    start_date: "",
    finish_date: "",
    update_date: "",
    equipment_id: "CNGR000000034PIS",
    plant_id: "Berth Operating Platform",
    equipment_number: "3-PL-B1-8007",
    equipment_name: "Incoming Fuel Gas from Okan PP (from 6'' Riser to 3'' Pipe)",
    equipment_type: "Pipe",
    equipment_status: "In Service",
    problem_description: "The following was observed during a close visual inspection by rope access: There are 30 locations where externally corroded areas were wrapped with 'Snap Wrap' in 2024. Approximately 10 areas of external corrosion were noted during close visual inspect.",
    proposed_description: "Replace approximately 40 meters of externally corroded and wrapped 3'' Fuel Gas piping. Paint failure and severe active corrosion was noted at many locations on the 3'' Fuel Gas line from BOP to IBP.",
    reason_for_work: "Corrosion Remedial Work",
    repair_type: "Replace in Kind",
    cause: "External Corrosion"
  },
  {
    work_order: "WO 454170",
    priority: "2",
    status: "Open",
    lead_craft: "",
    start_date: "",
    finish_date: "",
    update_date: "",
    equipment_id: "CNGR0000002T2BS",
    plant_id: "Berth Operating Platform",
    equipment_number: "26-OKA-BOP-01-2-O-1123-OR",
    equipment_name: "26\" Outgoing Riser to Oil Pipeline, 26-OKA-BOP-01-2-SBM-02-O-1123",
    equipment_type: "Riser",
    equipment_status: "In Service",
    problem_description: "TLR (ClockSpring) installed in 2024.",
    proposed_description: "Sectional replacement in kind, in accordance with the Regulatory Authorities, ASME B31.4, Specifications & CES. Equipment No: 26-OKA-BOP-01-2-O-1123-OR Line: 26-PL-B1-8005.",
    reason_for_work: "Repair Mechanical",
    repair_type: "Clockspring Tem",
    cause: "External Corrosion"
  },
  {
    work_order: "WO 528278",
    priority: "3",
    status: "Open",
    lead_craft: "",
    start_date: "",
    finish_date: "",
    update_date: "",
    equipment_id: "CNGR0000002P3CS",
    plant_id: "Dehydration Plant",
    equipment_number: "2-AI-A4-4026",
    equipment_name: "Piping from INSTRUMENT AIR (10-9604) to SUPPLY HEADER",
    equipment_type: "Pipe",
    equipment_status: "In Service",
    problem_description: "A leak was found on a 2\" and 1/2\" section of the line at an area where a previous Stop Gas Measure was applied. The cause for the leak on the 2\" section is due to external corrosion at soil-to-air interface. Wall thickness measurements on the remainder.",
    proposed_description: "1.Replace both 2\" and 1/2\" section of line in-kinds as indicated on attached ISO. 2.Restore the external protection after the new spools are installed. The line class is A4 which is galvanized pipe. However, it is evident that line class A1 was used.",
    reason_for_work: "Leak Containment",
    repair_type: "Replace in Kind",
    cause: "External Corrosion"
  },
  {
    work_order: "WO 517590",
    priority: "3",
    status: "Open",
    lead_craft: "",
    start_date: "",
    finish_date: "",
    update_date: "",
    equipment_id: "CNGR00000033VKS",
    plant_id: "LPG  FSO",
    equipment_number: "P100-YL01-01",
    equipment_name: "From Turret To Refrigerator Unit",
    equipment_type: "Pipe",
    equipment_status: "In Service",
    problem_description: "Severe external corrosion due to paint failure was found on three 3/4\" and one 1/2\" vent. The remaining wall thickness (0.047\") is less than the retirement thickness (0.125\").",
    proposed_description: "The remaining thickness of the vents is sufficient to hold the current maximum potential operating pressure, however the remaining thickness is below CNL Minimum Allowable Structural Thickness (MAST). The vents could be susceptible to mechanical damage.",
    reason_for_work: "Repair Mechanical",
    repair_type: "Replace in Kind",
    cause: "External Corrosion"
  },
  {
    work_order: "WO 487759",
    priority: "2",
    status: "Open",
    lead_craft: "",
    start_date: "",
    finish_date: "",
    update_date: "",
    equipment_id: "CNGR00000033G5S",
    plant_id: "LPG  FSO",
    equipment_number: "P550-01-29",
    equipment_name: "22\" Seawater Header",
    equipment_type: "Pipe",
    equipment_status: "In Service",
    problem_description: "Several leaks on Seawater Header repaired using clockspring and composite wrap TLRs.",
    proposed_description: "Sectional replacement in kind, in accordance with the Regulatory Authorities, ASME B31.3, Specifications & CES.",
    reason_for_work: "Repair Mechanical",
    repair_type: "Clockspring Tem",
    cause: "Internal Corrosion"
  },
  {
    work_order: "WO 527192",
    priority: "3",
    status: "Open",
    lead_craft: "",
    start_date: "",
    finish_date: "",
    update_date: "",
    equipment_id: "CNGR0000002OEMS",
    plant_id: "Tank Farm",
    equipment_number: "4-FW-A11-3138",
    equipment_name: "Piping from 12-FW-A11-3128/FOAM SYSTEM to OIL STORAGE TANK (400-07)",
    equipment_type: "Pipe",
    equipment_status: "In Service",
    problem_description: "Severe metal loss due to internal corrosion was found on 12 spool sections. Nominal Thickness: 0.216'' Minimum Measured Thickness: 0.040\" Minimum Required Thickness: 0.125\". The remaining thickness of the pipe is sufficient to hold the current maximum potential.",
    proposed_description: "Replace the 12 spool sections in-kind as marked on drawing. Coat the pipe after fabrication according to the correct colour coding (Firewater).",
    reason_for_work: "Repair Mechanical",
    repair_type: "Replace in Kind",
    cause: "Internal Corrosion"
  },
  {
    work_order: "WO 476984",
    priority: "2",
    status: "Open",
    lead_craft: "",
    start_date: "",
    finish_date: "",
    update_date: "",
    equipment_id: "CNGR00000000GNS",
    plant_id: "Tank Farm",
    equipment_number: "TKF-ABJ-802",
    equipment_name: "Oil Storage Tank #200-02",
    equipment_type: "Tank",
    equipment_status: "In Service",
    problem_description: "Holes in the crude tank roof Tank 2 has a history of numerous leaks in the fixed roof due to severe pitting on the internal/underside side of the roof - due to water precipitation and corrosion. A number of leaks have had cold patch epoxy repair.",
    proposed_description: "Perform major overhaul and repair of tank roof - maintain fixed roof configuration. Anticipated to commence no later than 4Q 2016 (after TK 1 is back in service). Plan to continue using the tank until time of repair.",
    reason_for_work: "Repair Mechanical",
    repair_type: "Replace in Kind",
    cause: "Internal Corrosion"
  },
  {
    work_order: "WO 509241",
    priority: "2",
    status: "Open",
    lead_craft: "",
    start_date: "",
    finish_date: "",
    update_date: "",
    equipment_id: "CNGR0000001QCNS",
    plant_id: "Ewan Production Type",
    equipment_number: "3-GL-D1-0052",
    equipment_name: "3\" Pipe GAS LIFT From 3-P-D1-0052 To WELL JACKET 8",
    equipment_type: "Pipe",
    equipment_status: "In Service",
    problem_description: "Coating breakdown and severe active corrosion were noted on Ewan PP, 3-GL-D1-0052, Profile RT was performed on three areas of external corrosion in accordance with IT-1908. The minimum remaining pipe wall thickness was found to be 0.165\".",
    proposed_description: "Permanent Repair by sectional replacement in kind, in accordance with the requirements of the Regulatory Authorities, ASME B31.3, Specifications & CES. WR for Temporary repair to arrest localized areas of active external corrosion by descaling and painting.",
    reason_for_work: "Repair Mechanical",
    repair_type: "Replace in Kind",
    cause: "External Corrosion"
  },
  {
    work_order: "WO 509243",
    priority: "2",
    status: "Open",
    lead_craft: "",
    start_date: "",
    finish_date: "",
    update_date: "",
    equipment_id: "CNGR0000001QG3S",
    plant_id: "Ewan Production Type",
    equipment_number: "3-P-D1-0052",
    equipment_name: "3'' Pipe PROCESS LIQUIDS From 8-P-D1-0053 To GAS-008",
    equipment_type: "Pipe",
    equipment_status: "In Service",
    problem_description: "Coating breakdown and severe active corrosion were noted on Ewan PP, 3-GL-D1-0052, Profile RT was performed on two areas of external corrosion in accordance with IT-1909. The minimum remaining pipe wall thickness was found to be 0.152\".",
    proposed_description: "Perform Permanent Repair by sectional replacement in kind, in accordance with the requirements of the Regulatory Authorities, ASME B31.3, Specifications & CES. WR for Temporary repair to arrest localized areas of active external corrosion by descaling.",
    reason_for_work: "Repair Mechanical",
    repair_type: "Replace in Kind",
    cause: "External Corrosion"
  }
];

workOrders.forEach((wo) => {
  db.run(
    `INSERT INTO workorders (
      work_order, priority, status, lead_craft, start_date, finish_date, update_date,
      equipment_id, plant_id, equipment_number, equipment_name, equipment_type, equipment_status,
      problem_description, proposed_description, reason_for_work, repair_type, cause
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      wo.work_order, wo.priority, wo.status, wo.lead_craft, wo.start_date, wo.finish_date, wo.update_date,
      wo.equipment_id, wo.plant_id, wo.equipment_number, wo.equipment_name, wo.equipment_type, wo.equipment_status,
      wo.problem_description, wo.proposed_description, wo.reason_for_work, wo.repair_type, wo.cause
    ],
    (err) => {
      if (err) console.error("Ошибка вставки:", err.message);
      else console.log(`✅ Work Order ${wo.work_order} добавлен`);
    }
  );
});

db.close();
