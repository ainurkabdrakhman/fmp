import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./WorkOrderDetails.css";

function WorkOrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [error, setError] = useState(null);

  const userRole = localStorage.getItem("userRole");
  const isAdmin = userRole === "admin";
  const isTechnician = userRole === "technician";

  useEffect(() => {
    fetch(`http://localhost:5000/workorders/${encodeURIComponent(id)}`)
      .then((res) => {
        if (!res.ok) throw new Error("Work Order not found");
        return res.json();
      })
      .then((data) => setOrder(data))
      .catch((err) => setError(err.message));
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:5000/comments/${encodeURIComponent(id)}`)
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (field, value) => {
    setOrder({ ...order, [field]: value });
  };

  const handleSave = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/workorders/${encodeURIComponent(id)}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(order),
        }
      );
      if (!res.ok) throw new Error("Failed to save changes");
      alert("Changes saved!");
    } catch (e) {
      alert("Error saving changes: " + e.message);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      const res = await fetch(`http://localhost:5000/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          work_order: id,
          author: userRole,
          text: commentText,
        }),
      });

      const newComment = await res.json();
      setComments([newComment, ...comments]);
      setCommentText("");
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  const canEditField = (field) => {
    const adminFields = [
      "maint_coordinator",
      "responsible_engineer",
      "priority",
      "lead_craft",
      "start_date",
      "equipment_id",
      "plant_id",
      "equipment_number",
      "equipment_name",
      "equipment_type",
      "problem_description",
    ];
    const techFields = [
      "status",
      "finish_date",
      "update_date",
      "equipment_status",
      "proposed_description",
      "reason_for_work",
      "repair_type",
      "cause",
    ];
    if (isAdmin) return adminFields.includes(field);
    if (isTechnician) return techFields.includes(field);
    return false;
  };

  if (error) return <p style={{ padding: "20px", color: "red" }}>{error}</p>;
  if (!order) return <p style={{ padding: "20px" }}>Loading...</p>;

  const handleDuplicate = () => {
    if (!order) return;

    const duplicatedOrder = {
      ...order,
      work_order: `${order.work_order}_COPY`,
      status: "Draft",
      finish_date: "",
      update_date: new Date().toISOString().split("T")[0],
    };

    localStorage.setItem("duplicatedOrder", JSON.stringify(duplicatedOrder));
    navigate("/new-workorder");
  };

const handleDelete = async () => {
  if (
    !window.confirm(
      `Are you sure you want to delete Work Order "${order.work_order}"?`
    )
  )
    return;

  try {
    const res = await fetch(
      `http://localhost:5000/workorders/${encodeURIComponent(order.work_order)}`,
      { method: "DELETE" }
    );

    if (!res.ok) throw new Error("Failed to delete Work Order");

    alert("Work Order deleted successfully!");
    navigate("/dashboard");
  } catch (err) {
    alert("Error deleting Work Order: " + err.message);
  }
};


  return (
    <div className="details-container">
      <div className="details-header">
        <h2>Work Order Details: {order.work_order}</h2>
        <span
          className={`status-badge ${order.priority?.toLowerCase() || "low"}`}
        >
          {order.priority}
        </span>
      </div>

      <div className="details-content">
        <div className="section">
          <h3>General Information</h3>

          <Field label="Maint Coordinator" field="maint_coordinator" value={order.maint_coordinator} editable={canEditField("maint_coordinator")} onChange={handleChange}/>
          <Field label="Responsible Engineer" field="responsible_engineer" value={order.responsible_engineer} editable={canEditField("responsible_engineer")} onChange={handleChange}/>
          <Field label="Priority" field="priority" value={order.priority} editable={canEditField("priority")} onChange={handleChange}/>
          <Field label="Lead Craft" field="lead_craft" value={order.lead_craft} editable={canEditField("lead_craft")} onChange={handleChange}/>
          <Field label="Start" field="start_date" type="date" value={order.start_date} editable={canEditField("start_date")} onChange={handleChange}/>
          <Field label="Equipment ID" field="equipment_id" value={order.equipment_id} editable={canEditField("equipment_id")} onChange={handleChange}/>
          <Field label="Plant ID" field="plant_id" value={order.plant_id} editable={canEditField("plant_id")} onChange={handleChange}/>
          <Field label="Equipment Number" field="equipment_number" value={order.equipment_number} editable={canEditField("equipment_number")} onChange={handleChange}/>
          <Field label="Equipment Name" field="equipment_name" value={order.equipment_name} editable={canEditField("equipment_name")} onChange={handleChange}/>
          <Field label="Equipment Type" field="equipment_type" value={order.equipment_type} editable={canEditField("equipment_type")} onChange={handleChange}/>
          <Field label="Problem Description" field="problem_description" textarea value={order.problem_description} editable={canEditField("problem_description")} onChange={handleChange}/>
          <Field label="Work Order Status" field="status" value={order.status} editable={canEditField("status")} onChange={handleChange}/>
          <Field label="Finish" field="finish_date" type="date" value={order.finish_date} editable={canEditField("finish_date")} onChange={handleChange}/>
          <Field label="Update" field="update_date" type="date" value={order.update_date} editable={canEditField("update_date")} onChange={handleChange}/>
          <Field label="Equipment Status" field="equipment_status" value={order.equipment_status} editable={canEditField("equipment_status")} onChange={handleChange}/>
          <Field label="Proposed Description" field="proposed_description" textarea value={order.proposed_description} editable={canEditField("proposed_description")} onChange={handleChange}/>
          <Field label="Reason for Work" field="reason_for_work" value={order.reason_for_work} editable={canEditField("reason_for_work")} onChange={handleChange}/>
          <Field label="Repair Type" field="repair_type" value={order.repair_type} editable={canEditField("repair_type")} onChange={handleChange}/>
          <Field label="Cause" field="cause" textarea value={order.cause} editable={canEditField("cause")} onChange={handleChange}/>

          {(isAdmin || isTechnician) && (
            <button className="save-change" onClick={handleSave}>
              Save Changes
            </button>
          )}

          <br />
          <br />

          <button className="btn-print" onClick={() => window.print()}>
            🖨 Print Work Order
          </button>
        </div>

        <div className="section">
          <h3>Comments</h3>
          {(isAdmin || isTechnician) && (
            <form onSubmit={handleAddComment}>
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment..."
              />
              <button type="submit">Add Comment</button>
            </form>
          )}
          {comments.map((c) => (
            <div
              key={c.id}
              style={{
                borderBottom: "1px solid #eee",
                margin: "5px 0",
                paddingBottom: "5px",
              }}
            >
              <strong>{c.author}</strong> (
              {new Date(c.created_at).toLocaleString()}):
              <p>{c.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="details-actions">
        <Link className="btn-back" to="/dashboard">
          ← Back to Dashboard
        </Link>

        {isAdmin && (
          <>
            <button className="btn-duplicate" onClick={handleDuplicate}>
              Duplicate Order
            </button>
            <button className="btn-delete" onClick={handleDelete}>
              🗑 Delete Work Order
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function Field({ label, field, value, onChange, editable, type = "text", textarea = false }) {
  return (
    <p className="field-row">
      <strong>{label}:</strong>{" "}
      {editable ? (
        textarea ? (
          <textarea
            value={value || ""}
            onChange={(e) => onChange(field, e.target.value)}
          />
        ) : (
          <input
            type={type}
            value={value || ""}
            onChange={(e) => onChange(field, e.target.value)}
          />
        )
      ) : (
        <span className="readonly-value">{value || "-"}</span>
      )}
    </p>
  );
}

export default WorkOrderDetails;
