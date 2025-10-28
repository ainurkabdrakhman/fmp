import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./Dashboard.css";

function Dashboard(){
   const [workOrders, setWorkOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/workorders")
      .then((res) => res.json())
      .then((data) => setWorkOrders(data))
      .catch((err) => console.error(err));
  }, []);
      
  const getStatusClass = (status) =>{
    switch(status){
      case "Open":
        return "status-open";
      case "Confirmed":
        return "status-confirmed";
      case "Completed":
        return "status-completed";
      default:
        return "";
    }
  };

    return(

    <div className="dashboard-page">
      
      <main className="dashboard-container">
        <div className="dashboard-content">
          <div className="card">
            <h3>Active Work Orders</h3>
            <table className="table-work">
              <thead>
                <tr>
                  <th>Work Order</th>
                  <th>Main Coordinator</th>
                  <th>Responsible Engineer</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Lead Craft</th>
                  <th>Start</th>
                  <th>Finish</th>
                  <th>Updated</th>
                </tr>
              </thead>
              
             <tbody>
          {workOrders.map((wo) => (
            <tr key={wo.id}>
              <td>
                  <Link to={`/workorder/${encodeURIComponent(wo.work_order)}`}>
                       {wo.work_order}
                  </Link>
              </td>
              <td>{wo.maint_coordinator || "-"}</td>
              <td>{wo.responsible_engineer || "-"}</td>
              <td>{wo.priority}</td>
              <td>{wo.status}</td>
              <td>{wo.lead_craft || "-"}</td>
              <td>{wo.start_date || "-"}</td>
              <td>{wo.finish_date || "-"}</td>
              <td>{wo.update_date || "-"}</td>
            </tr>
          ))}
        </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;

