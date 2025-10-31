import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NewWorkOrder.css";

function NewWorkOrder() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("duplicatedOrder");
    if (saved) {
      const order = JSON.parse(saved);
      const today = new Date().toISOString().split("T")[0];

      setForm({
        ...order,
        id: undefined, 
        work_order: `${order.work_order}_COPY`,
        start_date: today,
        finish_date: "",
        update_date: today,
        status: "Draft",
      });

      localStorage.removeItem("duplicatedOrder");
    }
  }, []);

  console.log("Data being sent:", form);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/workorders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to create new work order");

      alert(" Work order duplicated successfully!");
      navigate("/dashboard"); 
    } catch (err) {
      console.error("Error duplicating work order:", err);
      alert("Error duplicating order: " + err.message);
    }
  };

  return (
    <div className="new-workorder-container">
      <h2>Create New Work Order</h2>

      <form onSubmit={handleSubmit}>
        <label>Work Order:</label>
        <input
          value={form.work_order || ""}
          onChange={(e) => handleChange("work_order", e.target.value)}
        />

        <label>Equipment Name:</label>
        <input
          value={form.equipment_name || ""}
          onChange={(e) => handleChange("equipment_name", e.target.value)}
        />

        <label>Problem Description:</label>
        <textarea
          value={form.problem_description || ""}
          onChange={(e) => handleChange("problem_description", e.target.value)}
        />

        <label>Priority:</label>
        <select
          value={form.priority || ""}
          onChange={(e) => handleChange("priority", e.target.value)}
        >
          <option value="">Select...</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <div className="form-actions">
         <button type="submit">Save New Order</button>

        <div className="back-btn-container">
          <Link to="/dashboard" className="btn-back">
            ← Back to Dashboard
          </Link>
         </div>
</div>

      </form>
    </div>
  );
}

export default NewWorkOrder;


