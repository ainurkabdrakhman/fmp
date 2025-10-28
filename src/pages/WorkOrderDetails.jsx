import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./WorkOrderDetails.css";

function WorkOrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  // Получаем роль пользователя из localStorage
  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    fetch(`http://localhost:5000/workorders/${encodeURIComponent(id)}`)
      .then((res) => {
        if (!res.ok) throw new Error("Work Order not found");
        return res.json();
      })
      .then((data) => setOrder(data))
      .catch((err) => setError(err.message));
  }, [id]);

  const handleSave = async () => {
    try {
      const res = await fetch(`http://localhost:5000/workorders/${encodeURIComponent(order.work_order)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order)
      });
      const data = await res.json();
      alert(data.message);
    } catch (e) {
      alert("Ошибка при сохранении");
    }
  };

  if (error) return <p style={{ padding: "20px", color: "red" }}>{error}</p>;
  if (!order) return <p style={{ padding: "20px" }}>Loading...</p>;

  return (
    <div className="details-container">
      <h2>Work Order Details: {order.work_order}</h2>

      <div className="section">
        <h3>Equipment</h3>
        <p><strong>Equipment ID:</strong> {order.equipment_id}</p>
        <p><strong>Plant ID:</strong> {order.plant_id}</p>
        <p><strong>Number:</strong> {order.equipment_number}</p>
        <p><strong>Name:</strong> {order.equipment_name}</p>
        <p><strong>Type:</strong> {order.equipment_type}</p>
        {userRole === "admin" && (
          <p><strong>Status:</strong>
            <input
              type="text"
              value={order.equipment_status || ""}
              onChange={(e) => setOrder({ ...order, equipment_status: e.target.value })}
            />
          </p>
        )}
        {userRole !== "admin" && <p><strong>Status:</strong> {order.equipment_status}</p>}
      </div>

      <div className="section">
        <h3>Work Description</h3>
        <p><strong>Problem Description:</strong> {order.problem_description}</p>

        {["admin", "technician"].includes(userRole) && (
          <>
            <p><strong>Proposed Description:</strong>
              <input
                type="text"
                value={order.proposed_description || ""}
                onChange={(e) => setOrder({ ...order, proposed_description: e.target.value })}
              />
            </p>
            <p><strong>Reason for Work:</strong>
              <input
                type="text"
                value={order.reason_for_work || ""}
                onChange={(e) => setOrder({ ...order, reason_for_work: e.target.value })}
              />
            </p>
            <p><strong>Repair Type:</strong>
              <input
                type="text"
                value={order.repair_type || ""}
                onChange={(e) => setOrder({ ...order, repair_type: e.target.value })}
              />
            </p>
            <p><strong>Cause:</strong>
              <input
                type="text"
                value={order.cause || ""}
                onChange={(e) => setOrder({ ...order, cause: e.target.value })}
              />
            </p>
            <p><strong>Status:</strong>
              <input
                type="text"
                value={order.status || ""}
                onChange={(e) => setOrder({ ...order, status: e.target.value })}
              />
            </p>
            <p><strong>Finish Date:</strong>
              <input
                type="date"
                value={order.finish_date || ""}
                onChange={(e) => setOrder({ ...order, finish_date: e.target.value })}
              />
            </p>
          </>
        )}
      </div>

      {["admin", "technician"].includes(userRole) && (
        <button className="btn-back" onClick={handleSave}>Save Changes</button>
      )}

      <div style={{ marginTop: "20px" }}>
        <Link to="/dashboard">← Back to Dashboard</Link>
      </div>
    </div>
  );
}

export default WorkOrderDetails;



