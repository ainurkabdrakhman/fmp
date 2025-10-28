import React from "react";
import "./Reports.css";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const Reports = () => {
  const data = [
    { name: "Week 1", hours: 120 },
    { name: "Week 2", hours: 90 },
    { name: "Week 3", hours: 140 },
    { name: "Week 4", hours: 110 },
  ];

  const colors = [" #778899", "#000099", "#2196c4", "#a9a9a9"];

  return (
    <div className="reports-container">
      <h2 className="reports-title">Reports Overview</h2>

      <div className="reports-cards">
        <div className="report-card total">
          <h3>Total Reports</h3>
          <p>48</p>
        </div>
        <div className="report-card completed">
          <h3>Completed</h3>
          <p>42</p>
        </div>
        <div className="report-card pending">
          <h3>Pending</h3>
          <p>6</p>
        </div>
      </div>

      <div className="chart-section">
        <h3>Workload by Week</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="hours">
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="text-reports">
        <h3>Detailed Reports Summary</h3>

        <div className="text-report">
          <h4 className="blue-text">1. Mechanical Department Report</h4>
          <p>
            The mechanical team completed 95% of assigned tasks, focusing on
            preventive maintenance and safety-critical systems.
          </p>
        </div>

        <div className="text-report">
          <h4 className="green-text">2. Electrical Department Report</h4>
          <p>
            Electrical systems were calibrated and tested successfully, ensuring
            stable performance and reduced downtime.
          </p>
        </div>

        <div className="text-report">
          <h4 className="red-text">3. Instrumentation Department Report</h4>
          <p>
            Minor delays were reported due to inspection procedures. Additional
            tools are being introduced to increase efficiency.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reports;